import React, { useEffect, useState } from "react";
import {
  Client,
  Account,
  Databases,
  Storage,
  ID,
  Query,
  Permission,
  Role,
} from "appwrite";
import {
  Pencil,
  CheckCircle,
  XCircle,
  UploadCloud,
  Eye,
  EyeOff,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Initialize Appwrite client
const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("67e83a4b001b39dcc0dc");

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

function Profile() {
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [currentLogin, setCurrentLogin] = useState("");
  const [uploading, setUploading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(null);

  // New states for preview + file-to-upload
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // ✅ Password management states
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatingPassword, setUpdatingPassword] = useState(false);

  // ✅ Appwrite IDs
  const databaseId = "67e83c7d003109ed269c";
  const collectionId = "67e84557002bec656b65";
  const bucketId = "68fca3370014735e1eb3";
  const projectId = "67e83a4b001b39dcc0dc";

  // ✅ Fetch user profile
  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await account.get();
        const res = await databases.listDocuments(databaseId, collectionId, [
          Query.equal("email", user.email),
        ]);

        const now = new Date().toISOString();
        setCurrentLogin(now);

        if (res.documents.length > 0) {
          const doc = res.documents[0];
          setUserData(doc);
          setFormData({
            ...doc,
            email_verified: user.emailVerification ? "true" : "false",
            last_login: doc.last_login || user.accessedAt || now,
          });

          if (doc.photo) {
            const publicUrl = `https://fra.cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${doc.photo}/view?project=${projectId}`;
            setPhotoUrl(publicUrl + "&v=" + new Date().getTime());
          }
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    }
    fetchUser();

    // cleanup preview URL on unmount
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ Update user details
  const updateUserDetails = async () => {
    try {
      // If user selected a new file, upload it first
      let uploadedFileId = null;
      if (selectedFile) {
        uploadedFileId = await uploadSelectedPhoto(selectedFile);
      }

      const sanitizedData = {
        ...formData,
        email_verified: formData.email_verified === "true" ? "true" : "false",
        last_login: currentLogin,
      };

      // If we uploaded a photo, attach it to sanitizedData
      if (uploadedFileId) {
        sanitizedData.photo = uploadedFileId;
      }

      const updatedDoc = await databases.updateDocument(
        databaseId,
        collectionId,
        userData.$id,
        sanitizedData
      );

      setUserData(updatedDoc);
      setFormData(updatedDoc);

      // clear local selected file + preview after successful save
      if (previewUrl) {
        try {
          URL.revokeObjectURL(previewUrl);
        } catch (e) {}
      }
      setSelectedFile(null);
      setPreviewUrl(null);

      setEditing(false);
      toast.success("Profile details updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Failed to update profile details.");
    }
  };

  // Upload helper — uploads the selected file and returns uploaded file id
  const uploadSelectedPhoto = async (file) => {
    setUploading(true);
    try {
      const currentUser = await account.get();

      // Upload file to Appwrite storage
      const uploadedFile = await storage.createFile(bucketId, ID.unique(), file, [
        Permission.read(Role.any()),
        Permission.update(Role.user(currentUser.$id)),
        Permission.delete(Role.user(currentUser.$id)),
      ]);

      // Build public url and update the local displayed photoUrl immediately
      const publicUrl = `https://fra.cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${uploadedFile.$id}/view?project=${projectId}`;
      setPhotoUrl(publicUrl + "&v=" + new Date().getTime());

      toast.success("Profile photo uploaded successfully!");
      return uploadedFile.$id;
    } catch (err) {
      console.error("Photo upload failed:", err);
      toast.error("Failed to upload photo.");
      return null;
    } finally {
      setUploading(false);
    }
  };

  // ✅ Handle photo selection — preview immediately, but don't upload until Save Changes
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // clean previous preview URL if exists
    if (previewUrl) {
      try {
        URL.revokeObjectURL(previewUrl);
      } catch (e) {}
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setSelectedFile(file);

    // Also update formData to reflect the preview locally (so other UI shows changes)
    setFormData((prev) => ({
      ...prev,
      // don't set photo as id — leave photo field to be set on actual upload
    }));
  };

  // ✅ Update Password Section
  const updatePassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      toast.warning("New password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.warning("Passwords do not match.");
      return;
    }

    try {
      setUpdatingPassword(true);
      const user = await account.get();

      if (!user.emailVerification) {
        toast.error("Your email is not verified. Please verify before updating password.");
        return;
      }

      await account.updatePassword(newPassword, password);

      // ✅ Send email with the requested subject for recovery
      await account.createRecovery(
        user.email,
        `${window.location.origin}/?subject=Update%20Password%20Reset%20for%20Fintech`
      );
      toast.success("Password updated successfully! A confirmation email has been sent.");

      setPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error("Error updating password:", err);
      toast.error("Failed to update password. Check your current password.");
    } finally {
      setUpdatingPassword(false);
    }
  };

  // ✅ Reusable field
  const renderField = (label, key, placeholder = "N/A") => (
    <>
      <label htmlFor={key} className="font-medium text-gray-800">
        {label}:
      </label>
      {editing ? (
        <input
          id={key}
          name={key}
          type="text"
          value={formData[key] || ""}
          onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
          className="border border-gray-300 rounded-md px-3 py-1 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      ) : (
        <span>{formData[key] || placeholder}</span>
      )}
    </>
  );

  // ✅ Loading
  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 text-gray-600">
        Loading profile...
      </div>
    );
  }

  // Determine which image to show: preview (if selected) else photoUrl else placeholder
  const displayedImage = previewUrl || photoUrl || "https://via.placeholder.com/120";

  // ✅ UI
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4 font-[Inter]">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
        <ToastContainer position="top-center" autoClose={4000} />

        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-10 px-6 text-center">
          <div className="relative w-28 h-28 mx-auto">
            {/* image container */}
            <div className="relative w-28 h-28">
              <img
                src={displayedImage}
                alt="Profile"
                className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-lg hover:scale-105 transition-transform"
              />

              {/* Rotating circular loader while uploading (no percentage, no text) */}
              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-28 h-28 animate-spin" viewBox="0 0 50 50">
                    <circle
                      cx="25"
                      cy="25"
                      r="20"
                      stroke="white"
                      strokeWidth="4"
                      strokeLinecap="round"
                      fill="none"
                      strokeDasharray="31.4 31.4"
                    />
                  </svg>
                </div>
              )}
            </div>

            {editing && (
              <label
                htmlFor="photo"
                className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md cursor-pointer hover:bg-gray-100"
              >
                <input
                  id="photo"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
                <UploadCloud size={18} className="text-green-600" />
              </label>
            )}
          </div>
          <h2 className="text-3xl font-semibold mt-3">{formData.name}</h2>
          <p className="text-gray-100 text-sm">{formData.email}</p>
        </div>

        {/* Profile Info */}
        <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10 bg-gray-50">
          {/* Personal Info */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-green-600 mb-4 border-b pb-2">
              Personal Info
            </h3>
            <div className="grid grid-cols-[180px_1fr] gap-y-3 text-gray-700 text-[15px] leading-relaxed">
              {renderField("Name", "name")}
              {renderField("Phone", "phone")}
              {renderField("City", "city")}
              {renderField("Country", "country")}
            </div>
          </div>

          {/* Professional Info */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-green-600 mb-4 border-b pb-2">
              Professional & System Info
            </h3>
            <div className="grid grid-cols-[180px_1fr] gap-y-3 text-gray-700 text-[15px] leading-relaxed">
              {renderField("Occupation", "occupation")}
              {renderField("Company", "company")}
              {renderField("Business", "business_name")}

              <label className="font-medium text-gray-800">
                Account Status:
              </label>
              {editing ? (
                <select
                  value={formData.account_status || "Active"}
                  onChange={(e) =>
                    setFormData({ ...formData, account_status: e.target.value })
                  }
                  className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              ) : (
                <span
                  className={`px-3 py-1 rounded-md text-white text-sm ${
                    formData.account_status === "Active"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {formData.account_status || "Inactive"}
                </span>
              )}

              <span className="font-medium text-gray-800">Email Verified:</span>
              <span>
                {formData.email_verified === "true" ? (
                  <span className="text-green-600 font-medium flex items-center gap-1">
                    Yes <CheckCircle size={16} />
                  </span>
                ) : (
                  <span className="text-red-500 font-medium flex items-center gap-1">
                    No <XCircle size={16} />
                  </span>
                )}
              </span>

              <span className="font-medium text-gray-800">Previous Login:</span>
              <span>
                {formData.last_login
                  ? new Date(formData.last_login).toLocaleString()
                  : "N/A"}
              </span>

              <span className="font-medium text-gray-800">Current Login:</span>
              <span>{new Date(currentLogin).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* ✅ Password Management (only visible when editing) */}
        {editing && (
          <div className="p-10">
            <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100 hover:shadow-lg transition-shadow max-w-2xl mx-auto">
              <h3 className="text-2xl font-semibold text-green-600 mb-5 border-b pb-2 flex items-center gap-2">
                <Eye size={22} /> Update Password
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="font-medium text-gray-800">
                    Current Password:
                  </label>
                  <div className="relative mt-1">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your current password"
                      className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      type="button"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
                    >
                      {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="font-medium text-gray-800">
                    New Password:
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="font-medium text-gray-800">
                    Confirm New Password:
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <button
                  onClick={updatePassword}
                  disabled={updatingPassword}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg flex items-center justify-center gap-2 font-medium transition-all shadow-md hover:shadow-lg w-full mt-4"
                >
                  {updatingPassword ? "Updating..." : "Update Password"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-8 flex justify-center gap-4 bg-gray-100 border-t border-gray-200">
          {editing ? (
            <>
              <button
                onClick={updateUserDetails}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-all shadow-md hover:shadow-lg"
                disabled={uploading}
              >
                <CheckCircle size={18} />
                {/* Keep text static: always show "Save Changes" even during upload */}
                Save Changes
              </button>
              <button
                onClick={() => {
                  // cancel edit: discard preview + selectedFile
                  if (previewUrl) {
                    try {
                      URL.revokeObjectURL(previewUrl);
                    } catch (e) {}
                  }
                  setSelectedFile(null);
                  setPreviewUrl(null);

                  setEditing(false);
                  setFormData(userData);
                }}
                className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-all shadow-md hover:shadow-lg"
              >
                <XCircle size={18} /> Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-all shadow-md hover:shadow-lg"
            >
              <Pencil size={18} /> Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
