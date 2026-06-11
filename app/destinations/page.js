"use client";

import { useEffect, useMemo, useState } from "react";
import { getDestinations } from "@/lib/supabase";

const filters = [
  { label: "All", value: "all" },
  { label: "Beach", value: "beach" },
  { label: "Mountains", value: "mountains" },
  { label: "City", value: "city" },
  { label: "Nature", value: "nature" },
  { label: "Culture", value: "culture" },
  { label: "Adventure", value: "adventure" },
  { label: "Romantic", value: "romantic" },
  { label: "Slow Travel", value: "slow" },
];

const tagIcons = {
  beach: "🏖",
  mountains: "⛰",
  mountain: "⛰",
  city: "🏙",
  urban: "🏙",
  nature: "🌿",
  culture: "🏛",
  adventure: "🧭",
  romantic: "❤️",
  slow: "🌙",
  relaxation: "🌙",
};

function cleanTag(tag) {
  return String(tag || "")
    .toLowerCase()
    .replaceAll("_", " ")
    .trim();
}

function getTagIcon(tag) {
  const normalized = cleanTag(tag);

  if (normalized.includes("beach")) return "🏖";
  if (normalized.includes("mountain")) return "⛰";
  if (normalized.includes("city") || normalized.includes("urban")) return "🏙";
  if (normalized.includes("nature")) return "🌿";
  if (normalized.includes("culture")) return "🏛";
  if (normalized.includes("adventure")) return "🧭";
  if (normalized.includes("romantic")) return "❤️";
  if (normalized.includes("slow") || normalized.includes("relax")) return "🌙";

  return tagIcons[normalized] || "✨";
}

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    async function loadDestinations() {
      const data = await getDestinations();

      const formatted = data
        .map((d, index) => {
          const info = d.data || d;

          const rawTags = [
            info.primary_category,
            ...(info.destination_types || []),
            ...(info.tags || []),
            ...(info.archetypes || []),
            ...(info.experience_styles || []),
          ];

          const tags = [
  ...new Set(
    rawTags
      .filter(Boolean)
      .map(cleanTag)
      .filter((tag) => tag && tag !== "unknown")
  ),
];

          return {
            id:
              d.id ||
              `${info.city || "destination"}-${info.country || ""}-${index}`,
            name: info.city || "Unknown destination",
            country: info.country || "",
            image: info.image || "/images/default.jpg",
            tags,
          };
        })
        .sort((a, b) => a.name.localeCompare(b.name));

      setDestinations(formatted);
      setLoading(false);
    }

    loadDestinations();
  }, []);

  const filteredDestinations = useMemo(() => {
    return destinations.filter((d) => {
      const searchText = `${d.name} ${d.country} ${d.tags.join(" ")}`.toLowerCase();

      const matchesSearch = searchText.includes(search.toLowerCase());

      const matchesFilter =
        activeFilter === "all" ||
        d.tags.some((tag) => tag.includes(activeFilter));

      return matchesSearch && matchesFilter;
    });
  }, [destinations, search, activeFilter]);

  return (
    <main className="min-h-screen bg-[#070b16] text-white relative px-6 py-12 overflow-x-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none"
        style={{ backgroundImage: "url('/background.jpg')" }}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-[#070b16] via-[#070b16]/95 to-blue-950/70 pointer-events-none" />

      <div className="absolute top-40 right-20 w-[450px] h-[450px] bg-blue-500/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[50%] left-[-120px] w-[420px] h-[420px] bg-indigo-500/15 rounded-full blur-[140px] pointer-events-none" />

      <a
        href="/"
        className="absolute top-6 right-8 z-50 px-5 py-3 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md text-white font-semibold hover:bg-white/15 transition"
      >
        Main Page
      </a>

      <div className="relative z-10 max-w-7xl mx-auto pt-16">
        <div className="text-center mb-10">
          <div className="inline-flex mb-6 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/70">
            Explore Destinations
          </div>

          <h1 className="text-5xl md:text-5xl font-bold mb-4 tracking-[-0.04em]">
            Explore places with personality
          </h1>

          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Browse travel inspiration by mood, atmosphere, and style — then take
            the quiz to discover which destinations truly match you.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href="/quiz"
              className="px-7 py-4 rounded-xl text-white font-semibold bg-gradient-to-br from-[#4f7cff] to-[#6d5dfc] shadow-[0_10px_30px_rgba(79,124,255,0.3)] hover:scale-105 transition"
            >
              Take the Quiz to See Your Match
            </a>
          </div>
        </div>

        <div className="mb-10 rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-xl p-5">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search destinations, countries, moods..."
            className="w-full mb-5 px-5 py-4 rounded-2xl bg-black/25 border border-white/10 text-white outline-none placeholder:text-white/40 focus:border-[#6d5dfc]"
          />

          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-4 py-2 rounded-full text-sm border transition ${
                  activeFilter === filter.value
                    ? "bg-[#6d5dfc] border-[#6d5dfc] text-white"
                    : "bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {!loading && (
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
   <p className="text-white/50 text-sm">
  {filteredDestinations.length} destinations waiting to be explored.
</p>

   
          </div>
        )}

        {loading ? (
          <p className="text-center text-white/60">Loading destinations...</p>
        ) : filteredDestinations.length === 0 ? (
          <div className="text-center py-24 rounded-3xl border border-white/10 bg-white/5">
            <h2 className="text-3xl font-bold mb-3">No destinations found</h2>
            <p className="text-white/60 mb-6">
              Try another search or clear your filters.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveFilter("all");
              }}
              className="px-6 py-3 rounded-xl bg-white/10 border border-white/15 hover:bg-white/15 transition"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-20">
          {filteredDestinations.map((d) => {
  const visibleTags = d.tags.slice(0, 2);

  return (
    <a
      href="/quiz"
      key={d.id}
      className="group relative block h-[340px] rounded-[30px] overflow-hidden shadow-2xl hover:scale-[1.02] transition duration-300"
      aria-label={`Explore ${d.name}`}
    >
      <img
        src={d.image}
        alt={d.name}
        className="absolute -inset-[1px] w-[calc(100%+2px)] h-[calc(100%+2px)] object-cover brightness-110 contrast-105 saturate-110 transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/5" />

      <div className="absolute top-5 left-5 right-16 flex flex-wrap gap-2">
        {visibleTags.map((tag, index) => (
          <span
            key={`${d.id}-${tag}-${index}`}
            className="px-3 py-1 rounded-full bg-black/35 border border-white/15 backdrop-blur-md text-xs text-white/85 capitalize"
          >
            {getTagIcon(tag)} {tag.replaceAll("_", " ")}
          </span>
        ))}
      </div>

      <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/80 group-hover:bg-[#6d5dfc] transition">
        →
      </div>

      <div className="absolute bottom-5 left-5 right-5">
        <h2 className="text-2xl font-bold text-white line-clamp-2">
          {d.name}
        </h2>

        <p className="mt-1 text-sm text-white/65">
          {d.country || "Destination profile"}
        </p>

       
      </div>
    </a>
  );
})}
          </div>
        )}
      </div>
    </main>
  );
}