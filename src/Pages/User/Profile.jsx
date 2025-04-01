import React, { useEffect, useState } from "react";
import { Client, Account, Databases, Query } from "appwrite";
import { CheckCircle, XCircle, Pencil, Loader2 } from "lucide-react";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67e83a4b001b39dcc0dc");

const account = new Account(client);
const databases = new Databases(client);

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });

  const databaseId = "67e83c7d003109ed269c";
  const collectionId = "67e84557002bec656b65";

  useEffect(() => {
    async function fetchUserData() {
      try {
        const user = await account.get();
        const response = await databases.listDocuments(databaseId, collectionId, [
          Query.equal("email", user.email),
        ]);

        if (response.documents.length > 0) {
          setUserData(response.documents[0]);
          setFormData({
            name: response.documents[0].name,
            phone: response.documents[0].phone,
            email: response.documents[0].email,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  async function updateUserDetails() {
    if (!userData) return;
    try {
      const updatedDoc = await databases.updateDocument(
        databaseId,
        collectionId,
        userData.$id,
        {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
        }
      );
      setUserData(updatedDoc);
      setEditing(false);
      setOpenDialog(false);
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">User Profile</h2>

        {loading ? (
          <div className="flex justify-center mt-4">
            <Loader2 className="animate-spin text-gray-500" size={24} />
          </div>
        ) : userData ? (
          <div className="mt-4">
            {editing ? (
              <>
                <div className="mb-3">
                  <label className="block text-gray-600">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-gray-600">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={() => setOpenDialog(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
                  >
                    <CheckCircle size={18} /> Save
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 flex items-center gap-2"
                  >
                    <XCircle size={18} /> Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-700"><strong>Name:</strong> {userData.name}</p>
                <p className="text-gray-700"><strong>Phone:</strong> {userData.phone}</p>
                <p className="text-gray-700"><strong>Email:</strong> {userData.email}</p>
                <button
                  onClick={() => setEditing(true)}
                  className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"
                >
                  <Pencil size={18} /> Edit
                </button>
              </>
            )}
          </div>
        ) : (
          <p className="text-center text-red-500 mt-4">No user data found.</p>
        )}
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Update</DialogTitle>
        <DialogContent>
          Are you sure you want to update your profile details?
        </DialogContent>
        <DialogActions>
          <button
            onClick={updateUserDetails}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Confirm
          </button>
          <button
            onClick={() => setOpenDialog(false)}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
          >
            Cancel
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Profile;
