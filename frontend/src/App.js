import React, { useEffect, useState } from "react";
import Editor from "./Editor";

function App() {
  const [docId, setDocId] = useState(null);
  const [title, setTitle] = useState("");

  const handleNew = () => {
    const newTitle = prompt("Enter new title:");
    if (newTitle) {
      const newDocId = Date.now().toString();
      setDocId(newDocId);
      setTitle(newTitle);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-indigo-200 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-700">📝 Collaborative Editor</h1>
          <button
            onClick={handleNew}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            + New Document(unique id for db)
          </button>
        </div>

        {docId && <Editor docId={docId} />}
      </div>
    </div>
  );
}

export default App;
