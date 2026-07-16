export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="max-w-3xl text-center px-6">
        <h1 className="text-6xl font-bold mb-6">
          BeatScribe
        </h1>

        <p className="text-xl text-slate-300 mb-10">
          AI-powered drum transcription and practice analysis.
        </p>

        <button className="rounded-xl bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg font-semibold transition">
          Upload Recording
        </button>
      </div>
    </main>
  );
}
