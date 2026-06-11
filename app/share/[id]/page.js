"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSharedResult } from "@/lib/supabase";

function ResultCard({ match }) {
  const data = match.destination.data;
  const narrative = data.match_narratives?.high_match || "";

  return (
    <div className="relative h-[520px] rounded-[32px] overflow-hidden shadow-2xl bg-transparent">
      <img
        src={data.image}
        alt={data.city}
        className="absolute -inset-[1px] w-[calc(100%+2px)] h-[calc(100%+2px)] object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/10" />

      <div className="absolute top-6 left-6">
        <div className="w-20 h-20 rounded-full border-4 border-[#6d5dfc] bg-black/30 backdrop-blur-md flex items-center justify-center text-xl font-bold text-white">
          {match.percentage}%
        </div>
        <div className="mt-2 text-xs tracking-widest text-white/70 text-center">
          MATCH
        </div>
      </div>

      <div className="absolute bottom-6 left-6 right-6 text-white">
        <h2 className="text-4xl font-bold mb-2">{data.city}</h2>
        <p className="text-white/70 mb-4">{data.country}</p>
        <p className="text-sm text-white/80 leading-relaxed">{narrative}</p>
      </div>
    </div>
  );
}

export default function SharedResultPage() {
  const { id } = useParams();
  const [matches, setMatches] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await getSharedResult(id);
      setMatches(data?.results || []);
    }

    if (id) load();
  }, [id]);

  if (!matches) {
    return (
      <main className="min-h-screen bg-[#070b16] text-white flex items-center justify-center">
        Loading results...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#070b16] text-white relative px-6 py-10 overflow-x-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none"
        style={{ backgroundImage: "url('/background.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#070b16] via-[#070b16]/90 to-blue-950/70 pointer-events-none" />

      <a
        href="/"
        className="absolute top-6 right-8 z-50 px-5 py-3 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md text-white font-semibold hover:bg-white/15 transition"
      >
        Main Page
      </a>

      <div className="relative z-10 max-w-7xl mx-auto pt-16">
        <h1 className="text-5xl font-bold text-center mb-4">
          Shared Travel Matches
        </h1>

        <p className="text-center text-white/60 mb-10">
          Someone discovered these destinations with Zulario.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {matches.map((match) => (
            <ResultCard
              key={match.destination.data.city}
              match={match}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-white/60 mb-4">
            Want to discover your own matches?
          </p>

          <a
            href="/quiz"
            className="inline-block px-6 py-4 rounded-xl text-white font-semibold bg-gradient-to-br from-[#4f7cff] to-[#6d5dfc] shadow-[0_10px_30px_rgba(79,124,255,0.3)] hover:scale-105 transition"
          >
            Take the Quiz
          </a>
        </div>
      </div>
    </main>
  );
}