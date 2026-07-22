"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#070b1c] text-white flex items-center justify-center px-6">
      <div className="max-w-3xl text-center">
<Image
  src="/zulario.png"
  alt="Zulario"
  width={220}
  height={105}
  className="mx-auto mb-10"
  priority
/>
        <p className="text-[#8ea7ff] font-semibold tracking-[0.2em] uppercase mb-3">
          SOMETHING WENT WRONG
        </p>

        <h1 className="text-5xl md:text-5xl font-bold mb-6">
          We Couldn't Load This Page
        </h1>

        <p className="text-white/70 text-lg leading-relaxed max-w-xl mx-auto mb-10">
          Something unexpected happened while loading this page.
          <br />
          Please try again, or return to the homepage and continue your journey.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <button
            onClick={reset}
            className="px-7 py-4 rounded-xl bg-gradient-to-br from-[#4f7cff] to-[#6d5dfc] text-white font-semibold hover:scale-105 transition-transform"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="px-7 py-4 rounded-xl border border-white/15 bg-white/5 text-white font-semibold hover:bg-white/10 transition"
          >
            Back to Home
          </Link>
        </div>

        {process.env.NODE_ENV === "development" && (
          <pre className="mt-10 text-left text-xs text-red-300 bg-red-950/30 border border-red-500/20 rounded-xl p-4 overflow-auto whitespace-pre-wrap">
            {error.message}
          </pre>
        )}
      </div>
    </main>
  );
}