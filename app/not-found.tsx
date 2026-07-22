import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 | Zulario",
  description: "The page you're looking for could not be found.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#070b1c] text-white flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">

<Image
  src="/zulario.png"
  alt="Zulario"
  width={220}
  height={106}
  className="mx-auto mb-10"
  priority
/>

        <p className="text-[#8ea7ff] font-semibold tracking-[0.2em] uppercase mb-3">
          ERROR 404
        </p>

        <h1 className="text-5xl md:text-5xl font-bold mb-6">
          Oops! This Destination Doesn't Exist
        </h1>

        <p className="text-white/70 text-lg leading-relaxed max-w-xl mx-auto mb-10">
          Looks like you've wandered off the map.
          <br />
          The page you're looking for doesn't exist,
          but your next adventure is just one click away.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/"
            className="px-7 py-4 rounded-xl bg-gradient-to-br from-[#4f7cff] to-[#6d5dfc] text-white font-semibold hover:scale-105 transition-transform"
          >
            Back to Home
          </Link>

          <Link
            href="/quiz"
            className="px-7 py-4 rounded-xl border border-white/15 bg-white/5 text-white font-semibold hover:bg-white/10 transition"
          >
            Take the Quiz
          </Link>
        </div>
      </div>
    </main>
  );
}