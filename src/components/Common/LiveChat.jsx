import React, { useState, useEffect, useRef } from "react";
import { db } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  where,
  getDocs,
} from "firebase/firestore";
import { FaCommentDots } from "react-icons/fa";

const LiveChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [isAgentOnline, setIsAgentOnline] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // Track hover state
  const chatRef = useRef(null); // Reference for detecting outside clicks

  useEffect(() => {
    // Listen for messages
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    // Check if any support agent is online
    const checkAgentStatus = async () => {
      const agentsRef = collection(db, "agents");
      const q = query(agentsRef, where("isOnline", "==", true));
      const querySnapshot = await getDocs(q);
      setIsAgentOnline(!querySnapshot.empty); // If agents are found, set to true
    };

    checkAgentStatus();
    return () => unsubscribe();
  }, []);

  // Detect clicks outside the chat box and close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setChatOpen(false);
      }
    };

    if (chatOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [chatOpen]);

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
          className="bg-green-500 text-white p-3 rounded-full shadow-lg flex items-center relative"
          onClick={() => setChatOpen(!chatOpen)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <FaCommentDots className="text-xl" />
        </button>

        {/* Tooltip */}
        {isHovered && (
          <div className="absolute bottom-12 right-1/2 translate-x-1/2 bg-black text-white text-sm px-2 py-1 rounded-md shadow-md">
            Chat with us!
          </div>
        )}
      </div>

      {/* Chat Box */}
      {chatOpen && (
        <div ref={chatRef} className="fixed bottom-16 right-5 w-80 bg-white border border-gray-300 shadow-lg rounded-lg">
          <div className="p-3 bg-green-500 text-white flex justify-between">
            <span>Live Chat</span>
            <button onClick={() => setChatOpen(false)}>✖</button>
          </div>

          <div className="p-3 h-60 overflow-y-auto">
            {!isAgentOnline ? (
              <div className="text-center text-red-500">
                ⏳ Keep waiting, we are looking for the next available support agent...
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="mb-2 p-2 bg-gray-100 rounded">
                  {msg.text}
                </div>
              ))
            )}
          </div>

          <form onSubmit={sendMessage} className="p-3 border-t">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Type a message..."
              disabled={!isAgentOnline}
            />
            <button
              type="submit"
              className="mt-2 w-full bg-green-500 text-white p-2 rounded"
              disabled={!isAgentOnline}
            >
              {isAgentOnline ? "Send" : "Waiting for Support..."}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LiveChat;
