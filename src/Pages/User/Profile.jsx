// src/pages/Profile.js
import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { Client, Databases } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your Appwrite endpoint
  .setProject("67e83a4b001b39dcc0dc");

const databases = new Databases(client);

function Profile() {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      if (!user) return;
      
      // Update user details in the database
      await databases.updateDocument(
        "67e83c7d003109ed269c", // Database ID
        "67e84557002bec656b65", // Collection ID
        user.$id,
        { name, phone }
      );
      
      setUser({ ...user, name, phone });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      {user ? (
        <div>
          <label>
            <strong>Name:</strong>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <br />
          <label>
            <strong>Email:</strong> {user.email}
          </label>
          <br />
          <label>
            <strong>Phone:</strong>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
          <br />
          <button onClick={handleUpdate} disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
}

export default Profile;