import React, { useEffect, useState } from "react";
import { Client, Account, Databases, Query } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67e83a4b001b39dcc0dc");

const account = new Account(client);
const databases = new Databases(client);

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });

  const databaseId = "67e83c7d003109ed269c";
  const collectionId = "67e84557002bec656b65";

  useEffect(() => {
    async function fetchUserData() {
      try {
        const user = await account.get();
        console.log("Logged-in User:", user);

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
        } else {
          console.log("No user document found.");
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
      console.log("Updating user:", userData.$id);

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

      console.log("User updated successfully:", updatedDoc);
      setUserData(updatedDoc);
      setEditing(false);
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">User Profile</h2>

        {loading ? (
          <p className="text-center text-gray-500 mt-4">Loading...</p>
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
                    onClick={updateUserDetails}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                  >
                    Cancel
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
                  className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  Edit
                </button>
              </>
            )}
          </div>
        ) : (
          <p className="text-center text-red-500 mt-4">No user data found.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
