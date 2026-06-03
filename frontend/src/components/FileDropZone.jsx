import { useRef, useState } from "react";


// const API_URL = import.meta.env.BACKEND_API_URL;
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

export default function FileDropZone({ onImported }) {
  const [dragging, setDragging] = useState(false);
  const [status, setStatus]     = useState(null);
  const inputRef = useRef();

  async function handleFile(file) {
    if (!file.name.match(/\.(txt|md)$/i)) {
      setStatus({ type: "error", text: "only .txt and .md files are supported" });
      return;
    }

    const content = await file.text();
    setStatus({ type: "loading", text: `generating title for ${file.name}...` });

    try {
      const res = await fetch(`${API_URL}/api/notes/import`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ filename: file.name, content }),
      });

      if (res.status === 409) {
        setStatus({ type: "warn", text: "already imported — skipped" });
        return;
      }
      if (!res.ok) throw new Error("server error");

      const note = await res.json();
      setStatus({ type: "success", text: `imported "${note.title}"` });
      onImported?.(note);
    } catch {
      setStatus({ type: "error", text: "import failed" });
    }
  }

  function onDrop(e) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  const colors = {
    error:   "text-red-500",
    warn:    "text-yellow-500",
    success: "text-green-600",
    loading: "text-gray-400",
  };

  return (
    <div
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      onClick={() => inputRef.current.click()}
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
        ${dragging ? "border-purple-400 bg-purple-50" : "border-gray-300 hover:border-gray-400"}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".txt,.md"
        className="hidden"
        onChange={e => { if (e.target.files[0]) handleFile(e.target.files[0]); }}
      />
      <p className="text-sm text-gray-500">
        drop a .txt or .md file, or click to browse
      </p>
      {status && (
        <p className={`text-sm mt-2 ${colors[status.type]}`}>{status.text}</p>
      )}
    </div>
  );
}