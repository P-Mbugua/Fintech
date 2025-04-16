import React from "react";
import { useNavigate } from "react-router-dom";
import { Client, Account, Databases } from "appwrite";
import { useAuth } from "../../Context/AuthContext";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67e83a4b001b39dcc0dc");

const account = new Account(client);
const databases = new Databases(client);

const databaseId = "67e83c7d003109ed269c";
const collectionId = "67e84557002bec656b65";

function Settings() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const deleteMyAccount = async () => {
    try {
      if (!user) {
        alert("User not found.");
        return;
      }

      // Delete user's document in database
      const docs = await databases.listDocuments(databaseId, collectionId);
      const userDoc = docs.documents.find((doc) => doc.email === user.email);

      if (userDoc) {
        await databases.deleteDocument(databaseId, collectionId, userDoc.$id);
        console.log("User document deleted.");
      }

      // Delete user from Appwrite Auth
      await account.delete(); // deletes the current user account
      console.log("User account deleted.");

      alert("Your account has been deleted.");
      navigate("/");
    } catch (error) {
      console.error("Failed to delete account:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full">
        <h2 className="text-xl font-semibold text-red-600 text-center mb-4">
          Delete Your Account
        </h2>
        <p className="text-gray-700 text-center mb-6">
          Are you sure you want to delete your account? This action cannot be undone.
        </p>
        <div className="flex justify-between">
          <button
            onClick={deleteMyAccount}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 w-full mr-2"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 w-full ml-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
