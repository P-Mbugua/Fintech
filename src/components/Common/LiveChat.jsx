import React, { useState, useEffect, useRef } from "react";
import { supabase } from "/src/supabaseClient.js";
import { FaCommentDots } from "react-icons/fa";

const LiveChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [isAgentOnline, setIsAgentOnline] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("timestamp", { ascending: true });
      if (!error) {
        setMessages(data);
      }
    };
    fetchMessages();

    const messagesSubscription = supabase
      .channel("messages")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, fetchMessages)
      .subscribe();

    return () => {
      supabase.removeChannel(messagesSubscription);
    };
  }, []);

  useEffect(() => {
    const checkAgentStatus = async () => {
      const { data, error } = await supabase.from("agents").select("isOnline").eq("isOnline", true);
      if (!error) {
        setIsAgentOnline(data.length > 0);
      }
    };
    checkAgentStatus();
  }, []);

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

  useEffect(() => {
    if (newMessage.length > 0) {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    }
  }, [newMessage]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;
    await supabase.from("messages").insert([{ text: newMessage, timestamp: new Date() }]);
    setNewMessage("");
    setIsTyping(false);
  };

  return (
    <div>
      <div className="fixed bottom-5 right-5 z-50">
        <button
          className="bg-green-600 text-white p-3 rounded-full shadow-lg flex items-center relative transition duration-300 hover:bg-green-700"
          onClick={() => setChatOpen(!chatOpen)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <FaCommentDots className="text-xl" />
        </button>
        {isHovered && (
          <div className="absolute bottom-12 right-1/2 translate-x-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded-md shadow-md transition-opacity duration-300 opacity-100">
            Need help? Chat with us!
          </div>
        )}
      </div>
      {chatOpen && (
        <div ref={chatRef} className="fixed bottom-16 right-5 w-80 bg-gray-400 border border-gray-300 shadow-lg rounded-lg transition-opacity duration-300 opacity-100">
          <div className="p-3 bg-green-600 text-white flex justify-between rounded-t-lg">
            <span>Live Chat</span>
            <button onClick={() => setChatOpen(false)} className="hover:text-gray-200">
              ✖
            </button>
          </div>
          <div className="p-3 h-60 overflow-y-auto">
            {!isAgentOnline ? (
              <div className="text-center text-red-500 font-medium animate-pulse">
                ⏳ Please wait, connecting you to the nearest available agent...
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="mb-2 p-2 bg-gray-100 rounded shadow-sm">
                  {msg.text}
                </div>
              ))
            )}
            {isTyping && <div className="text-sm text-gray-500 italic">Agent is typing...</div>}
          </div>
          <form onSubmit={sendMessage} className="p-3 border-t flex">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Type a message..."
              disabled={!isAgentOnline}
            />
            <button
              type="submit"
              className={`ml-2 px-3 py-2 rounded text-white ${
                isAgentOnline ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!isAgentOnline}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LiveChat;