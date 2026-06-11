"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { FaWhatsapp, FaTelegramPlane, FaEnvelope } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";

export default function GroupPage() {
  const { id } = useParams();

  const groupLink = `http://localhost:3000/group/${id}`;

  const shareText =
    `Join my Zuralio group travel quiz: ${groupLink}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(groupLink);
      alert("Link copied!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
  <main className="min-h-screen bg-[#070b16] text-white overflow-hidden relative flex items-center justify-center px-6">
    {/* BACKGROUND */}
    <div
      className="absolute inset-0 bg-cover bg-center opacity-35"
      style={{ backgroundImage: "url('/background.jpg')" }}
    />
    <div className="absolute inset-0 bg-gradient-to-br from-[#070b16] via-[#070b16]/85 to-blue-950/70" />

    {/* MAIN PAGE BUTTON */}
    <a
      href="/"
      className="absolute top-6 right-8 z-20 px-5 py-3 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md text-white font-semibold hover:bg-white/15 transition"
    >
      Main Page
    </a>

    {/* CARD */}
    <div className="relative z-10 w-full max-w-3xl rounded-3xl border border-white/15 bg-white/10 backdrop-blur-2xl p-10 text-center shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
     <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/70">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-white"
  >
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
  </svg>

  <span>Group Travel Matching</span>
</div>

      <h1 className="text-4xl font-bold mb-4">
        Group Quiz
      </h1>

      <p className="text-white/70 mb-8">
        Share this link with friends to discover your common travel destination matches.
      </p>

      <input
        readOnly
        value={groupLink}
        className="w-full px-5 py-4 rounded-xl bg-black/25 border border-white/15 text-center text-white/80 outline-none mb-6"
      />

      {/* SHARE BUTTONS */}
      <div className="flex justify-center flex-wrap gap-3 mb-10">
        <button
          onClick={copyLink}
          className="px-4 py-2 rounded-xl border border-white/15 bg-white/5 text-white font-semibold text-sm hover:bg-white/10 transition inline-flex items-center gap-2"
        >
          <FaCopy size={14} />
          Copy Link
        </button>

        <a
          href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-xl border border-white/15 bg-white/5 text-white font-semibold text-sm hover:bg-white/10 transition inline-flex items-center gap-2"
        >
          <FaWhatsapp size={14} color="#25D366" />
          WhatsApp
        </a>

        <a
          href={`https://t.me/share/url?url=${encodeURIComponent(
            groupLink
          )}&text=${encodeURIComponent("Join my Zuralio group travel quiz:")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-xl border border-white/15 bg-white/5 text-white font-semibold text-sm hover:bg-white/10 transition inline-flex items-center gap-2"
        >
          <FaTelegramPlane size={14} color="#229ED9" />
          Telegram
        </a>

        <a
          href={`mailto:?subject=${encodeURIComponent(
            "Zuralio Group Quiz"
          )}&body=${encodeURIComponent(shareText)}`}
          className="px-4 py-2 rounded-xl border border-white/15 bg-white/5 text-white font-semibold text-sm hover:bg-white/10 transition inline-flex items-center gap-2"
        >
          <FaEnvelope size={14} color="#ef4444" />
          Email
        </a>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link href={`/quiz?groupId=${id}`}>
          <button className="px-6 py-4 rounded-xl border-none text-white font-semibold bg-gradient-to-br from-[#4f7cff] to-[#6d5dfc] shadow-[0_10px_30px_rgba(79,124,255,0.3)] hover:scale-105 transition cursor-pointer">
            Take the Quiz
          </button>
        </Link>

        <Link href={`/group/${id}/results`}>
          <button className="px-6 py-4 rounded-xl border border-white/15 bg-white/5 text-white font-semibold hover:bg-white/10 transition cursor-pointer">
            View Group Results
          </button>
        </Link>
      </div>
    </div>
  </main>
  );
}