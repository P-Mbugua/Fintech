import React, { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { FaCommentDots } from "react-icons/fa";

const LiveChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    await addDoc(collection(db, "messages"), {
      text: newMessage,
      timestamp: serverTimestamp(),
    });

    setNewMessage("");
  };

  return (
    <div>
      {/* Floating Chat Icon */}
      <div className="fixed bottom-5 right-5 z-50">
        <button
          className="bg-green-500 text-white p-3 rounded-full shadow-lg flex items-center"
          onClick={() => setChatOpen(!chatOpen)}
        >
          <FaCommentDots className="text-xl" />
        </button>
      </div>

      {/* Chat Box */}
      {chatOpen && (
        <div className="fixed bottom-16 right-5 w-80 bg-white border border-gray-300 shadow-lg rounded-lg">
          <div className="p-3 bg-green-500 text-white flex justify-between">
            <span>Live Chat</span>
            <button onClick={() => setChatOpen(false)}>✖</button>
          </div>

          <div className="p-3 h-60 overflow-y-auto">
            {messages.map((msg) => (
              <div key={msg.id} className="mb-2 p-2 bg-gray-100 rounded">
                {msg.text}
              </div>
            ))}
          </div>

          <form onSubmit={sendMessage} className="p-3 border-t">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Type a message..."
            />
            <button type="submit" className="mt-2 w-full bg-green-500 text-white p-2 rounded">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LiveChat;
