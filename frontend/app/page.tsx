"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [backendStatus, setBackendStatus] = useState("Checking...");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = useState("");

  useEffect(() => {
    async function checkBackend() {
      try {
        const response = await fetch("http://localhost:8000/health");
        const data = await response.json();

        if (data.status === "healthy") {
          setBackendStatus("🟢 Connected");
        } else {
          setBackendStatus("🟡 Unexpected Response");
        }
      } catch {
        setBackendStatus("🔴 Offline");
      }
    }

    checkBackend();
  }, []);

  async function uploadFile() {
    if (!selectedFile) {
      setUploadMessage("Please choose a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      setUploadMessage(`✅ ${data.message}: ${data.filename}`);
    } catch {
      setUploadMessage("❌ Upload failed.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="max-w-xl w-full px-6">
        <h1 className="text-5xl font-bold text-center mb-4">
          BeatScribe
        </h1>

        <p className="text-center text-slate-300 mb-8">
          AI-powered drum transcription and practice analysis.
        </p>

        <div className="bg-slate-900 rounded-xl p-6 shadow-lg">
          <p className="mb-4">
            <strong>Backend:</strong> {backendStatus}
          </p>

          <input
            type="file"
            accept=".mp3,.wav"
            onChange={(e) =>
              setSelectedFile(e.target.files?.[0] ?? null)
            }
            className="mb-4 block w-full"
          />

          <button
            onClick={uploadFile}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold hover:bg-blue-700 transition"
          >
            Upload Recording
          </button>

          {uploadMessage && (
            <p className="mt-4">{uploadMessage}</p>
          )}
        </div>
      </div>
    </main>
  );
}
