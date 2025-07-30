import React, { useEffect, useState } from "react";
import { connectSocket } from "./socket";

function Editor({ docId }) {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [documents, setDocuments] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    fetchDocuments();

    const s = connectSocket(docId);
    setSocket(s);

    s.onopen = () => console.log("WebSocket connected");
    s.onmessage = (event) => setText(event.data);
    s.onclose = () => console.log("WebSocket disconnected");

    return () => s.close();
  }, [docId]);

  const fetchDocuments = async () => {
    const res = await fetch("http://localhost:8000/api/documents/");
    const data = await res.json();
    setDocuments(data);
  };

  const handleLoad = async (id) => {
    const res = await fetch(`http://localhost:8000/api/documents/${id}/`);
    const data = await res.json();
    setText(data.content);
    setTitle(data.title);
  };

  const handleDelete = async (title) => {
    try {
      await fetch("http://localhost:8000/delete-document/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      fetchDocuments();
    } catch (err) {
      console.error("Error deleting document", err);
    }
  };

  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(newText);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/save-document/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ doc_id: docId, title, content: text }),
      });
      const data = await res.json();
      alert("Saved: " + data.message);
      fetchDocuments();
    } catch (err) {
      console.error("Error saving to DB", err);
    }
  };

  return (
    <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600">Collaborative Editor</h2>

      <input
        type="text"
        placeholder="Enter Document Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <textarea
        value={text}
        onChange={handleChange}
        rows="15"
        className="w-full p-3 border border-gray-300 rounded-md mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Start typing collaboratively..."
      />

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
        >
          💾 Save Document
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-2 text-gray-700">📄 Saved Documents</h3>
      <ul className="space-y-2">
        {documents.map((doc) => (
          <li key={doc.doc_id} className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-md">
            <span className="font-medium">{doc.title}</span>
            <div className="space-x-2">
              <button
                onClick={() => handleLoad(doc.doc_id)}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Load
              </button>
              <button
                onClick={() => handleDelete(doc.title)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                🗑 Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Editor;
