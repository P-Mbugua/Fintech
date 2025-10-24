import React, { useEffect, useState } from "react";
import { Client, Account, Databases, Query } from "appwrite";
import { Pencil, CheckCircle, XCircle } from "lucide-react";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67e83a4b001b39dcc0dc");

const account = new Account(client);
const databases = new Databases(client);

function Profile() {
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [currentLogin, setCurrentLogin] = useState("");

  const databaseId = "67e83c7d003109ed269c";
  const collectionId = "67e84557002bec656b65";

  useEffect(() => {
    async function fetchUserData() {
      try {
        const user = await account.get();
        const response = await databases.listDocuments(databaseId, collectionId, [
          Query.equal("email", user.email),
        ]);
        const now = new Date().toISOString();
        setCurrentLogin(now);

        if (response.documents.length > 0) {
          const doc = response.documents[0];
          setUserData(doc);
          setFormData({
            ...doc,
            email_verified: doc.email_verified === "true" ? "true" : "false",
            last_login: doc.last_login || user.accessedAt || now,
          });
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    }
    fetchUserData();
  }, []);

  async function updateUserDetails() {
    try {
      const sanitizedData = {
        ...formData,
        email_verified:
          formData.email_verified === "true" || formData.email_verified === true
            ? "true"
            : "false",
        last_login: currentLogin,
      };
      await databases.updateDocument(
        databaseId,
        collectionId,
        userData.$id,
        sanitizedData
      );
      setUserData(sanitizedData);
      setEditing(false);
    } catch (err) {
      console.error("Error updating user:", err);
    }
  }

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 text-gray-600 font-sans">
        Loading profile...
      </div>
    );
  }

  const renderField = (label, key, placeholder = "N/A") => (
    <>
      <span className="font-medium text-gray-800">{label}:</span>
      {editing ? (
        <input
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

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4 font-[Inter]">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-10 px-6 text-center">
          <img
            src={formData.photo || "https://via.placeholder.com/120"}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-lg hover:scale-105 transition-transform mx-auto"
          />
          <h2 className="text-3xl font-semibold mt-3">{formData.name}</h2>
          <p className="text-gray-100 text-sm">{formData.email}</p>
        </div>

        {/* Profile Details */}
        <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10 bg-gray-50">
          {/* Personal Info */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-green-600 mb-4 border-b pb-2">
              Personal Information
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

              <span className="font-medium text-gray-800">Account Status:</span>
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

        {/* Footer */}
        <div className="p-8 flex justify-center gap-4 bg-gray-100 border-t border-gray-200">
          {editing ? (
            <>
              <button
                onClick={updateUserDetails}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-all shadow-md hover:shadow-lg"
              >
                <CheckCircle size={18} /> Save Changes
              </button>
              <button
                onClick={() => setEditing(false)}
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
