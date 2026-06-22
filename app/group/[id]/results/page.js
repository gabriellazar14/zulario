"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  getGroupResponses,
  getDestinations,
  saveUserResult,
} from "@/lib/supabase";
import { matchDestination } from "@/lib/matchDestination";
import {
  FaWhatsapp,
  FaTelegramPlane,
  FaEnvelope,
  FaCopy,
} from "react-icons/fa";
import Link from "next/link";
import {
  FaInstagram,
  FaTiktok,
  FaXTwitter,
  FaFacebookF,
} from "react-icons/fa6";

function averageScores(responses) {
  const total = {};
  const count = responses.length || 1;

  responses.forEach((response) => {
    Object.entries(response.scores || {}).forEach(([key, value]) => {
      if (typeof value !== "number") return;
      total[key] = (total[key] || 0) + value;
    });
  });

  Object.keys(total).forEach((key) => {
    total[key] = total[key] / count;
  });

  return total;
}
function MatchCircle({ percentage }) {
  const size = 82;
  const stroke = 4;

  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference - (percentage / 100) * circumference;

  let color = "#ef4444"; // red

  if (percentage >= 90) color = "#6d5dfc";
  else if (percentage >= 80) color = "#4f7cff";
  else if (percentage >= 70) color = "#38bdf8";

  return (
    <div className="relative w-20 h-20">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="rgba(0,0,0,0.35)"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={stroke}
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white">
        {percentage}%
      </div>
    </div>
  );
}
function ResultCard({ match, labelText = "MATCH", onSeeDetails }) {
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
  <MatchCircle percentage={match.percentage} />

  <div className="mt-2 text-xs tracking-widest text-white/70 text-center">
    {labelText}
  </div>
</div>

      <div className="absolute bottom-6 left-6 right-6 text-white">
        <h2 className="text-4xl font-bold mb-2">{data.city}</h2>

        <p className="text-white/70 mb-2">{data.country}</p>

        <p className="text-sm text-white/80 leading-relaxed">{narrative}</p>

        <button
          onClick={onSeeDetails}
          className="mt-3 text-sm text-white/80 underline underline-offset-4 hover:text-white transition"
        >
          See details
        </button>
      </div>
    </div>
  );
}

export default function GroupResultsPage() {
  const { id } = useParams();

  const [matches, setMatches] = useState([]);
  const [responses, setResponses] = useState([]);
  const [myMatches, setMyMatches] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [myName, setMyName] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [savedEmailResult, setSavedEmailResult] = useState(false);

  useEffect(() => {
    if (selectedDestination) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedDestination]);

  useEffect(() => {
    async function load() {
      const groupResponses = await getGroupResponses(id);
      setResponses(groupResponses);

      const destinations = await getDestinations();

      if (
        groupResponses.length === 1 &&
        groupResponses[0]?.matches?.length > 0
      ) {
        setMatches(groupResponses[0].matches);
      } else {
        const groupScores = averageScores(groupResponses);
        const topMatches = matchDestination(groupScores, destinations);
        setMatches(topMatches);
      }

      const stored = localStorage.getItem(`group_quiz_${id}_my_scores`);

      let parsed = null;
      let myResponse = null;

      if (stored) {
        parsed = JSON.parse(stored);
        setMyName(parsed.name || "");

        myResponse = groupResponses.find(
          (response) =>
            response.name?.trim().toLowerCase() ===
            parsed.name?.trim().toLowerCase()
        );
      }

      if (!myResponse && groupResponses.length > 0) {
        myResponse = groupResponses[groupResponses.length - 1];
        setMyName(myResponse.name);
      }

      if (myResponse?.matches?.length > 0) {
        setMyMatches(myResponse.matches);
        return;
      }

      if (parsed?.scores) {
        const personalMatches = matchDestination(parsed.scores, destinations);
        setMyMatches(personalMatches);
        return;
      }

      setMyMatches([]);
    }

    if (id) {
      load();
    }
  }, [id]);

  const groupResultsLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/group/${id}/results`
      : "";

  const shareText = `Check our Zulario group travel matches:

${matches
    .slice(0, 3)
    .map(
      (match, index) =>
        `${index + 1}. ${match.destination.data.city} (${match.percentage}%)`
    )
    .join("\n")}

See the group results here:
${groupResultsLink}`;

  const copyGroupResults = async () => {
    await navigator.clipboard.writeText(shareText);
    alert("Group results copied!");
  };

  const saveGroupResults = async () => {
    if (!email.trim() || matches.length === 0) return;

    const saved = await saveUserResult(email.trim(), {
      type: "group_results",
      group_id: id,
      responses_count: responses.length,
      group_matches: matches.slice(0, 3),
      personal_name: myName || null,
      personal_matches: myMatches.slice(0, 3),
    });

    if (saved) {
      setSavedEmailResult(true);
      setEmail("");
    }
  };

  return (
    <main className="min-h-screen bg-[#070b16] text-white relative px-6 py-10">
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

      <a
        href={`/group/${id}`}
        className="absolute top-6 right-40 z-50 px-5 py-3 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md text-white font-semibold hover:bg-white/15 transition"
      >
        Group Quiz
      </a>

      <header className="relative -top-10 z-20 mb-1">
        <a href="/" className="inline-flex items-center">
        <img
    src="/zulario.png"
    alt="Zulario Logo"
    className="h-20 w-auto"
  />

        </a>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto -mt-12">
        <h1 className="text-5xl font-bold text-center mb-4 flex items-center justify-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-white"
          >
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
          </svg>

          <span>Group Travel Matches</span>
        </h1>

        <p className="text-center text-white/60 mb-10">
          {responses.length} people completed the quiz.
        </p>

        {responses.length === 0 ? (
          <div className="max-w-2xl mx-auto rounded-3xl border border-white/15 bg-white/10 backdrop-blur-2xl p-10 text-center shadow-2xl">
            <h2 className="text-2xl font-bold mb-3">No quiz responses yet</h2>

            <p className="text-white/70 mb-6">
              Share the group link and ask your friends to complete the quiz.
            </p>

            <a
              href={`/group/${id}`}
              className="inline-block px-6 py-4 rounded-xl text-white font-semibold bg-gradient-to-br from-[#4f7cff] to-[#6d5dfc] shadow-[0_10px_30px_rgba(79,124,255,0.3)] hover:scale-105 transition"
            >
              Return to Group Quiz
            </a>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {matches.slice(0, 3).map((match, index) => (
                <ResultCard
                  key={`${match.destination.data.city}-${index}`}
                  match={match}
                  labelText="GROUP MATCH"
                  onSeeDetails={() =>
                    setSelectedDestination(match.destination.data)
                  }
                />
              ))}
            </div>

            <div className="mt-14 max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <p className="text-white/60 mb-5">
                  Share your group travel matches with friends.
                </p>

                <div className="flex justify-center gap-4 flex-wrap">
                  <button
                    onClick={() => setShareOpen(true)}
                    className="px-6 py-4 rounded-xl text-white font-semibold bg-white/10 border border-white/15 hover:bg-white/15 transition cursor-pointer"
                  >
                    Share Group Results
                  </button>

                  <a
                    href={`/group/${id}`}
                    className="px-6 py-4 rounded-xl text-white font-semibold bg-gradient-to-br from-[#4f7cff] to-[#6d5dfc] shadow-[0_10px_30px_rgba(79,124,255,0.3)] hover:scale-105 transition"
                  >
                    Group Quiz
                  </a>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
                <h2 className="text-2xl font-bold text-center mb-2">
                  Save your group's travel matches for future trips
                </h2>

               

                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="flex-1 px-5 py-4 rounded-xl bg-black/25 border border-white/15 text-white outline-none placeholder:text-white/40"
                  />

                  <button
                    onClick={saveGroupResults}
                    className="px-6 py-4 rounded-xl text-white font-semibold bg-gradient-to-br from-[#4f7cff] to-[#6d5dfc] hover:scale-105 transition cursor-pointer"
                  >
                    Save Results
                  </button>
                </div>

                {savedEmailResult && (
                  <p className="mt-4 text-center text-green-400">
                    ✓ Results saved successfully.
                  </p>
                )}
              </div>
            </div>

            {myMatches.length > 0 && (
              <div className="mt-24 pb-24">
                <h1 className="text-4xl font-bold text-center mb-3">
                  Your Travel Match
                </h1>

                <p className="text-center text-white/60 mb-10">
                  Results for {myName}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {myMatches.slice(0, 3).map((match, index) => (
                    <ResultCard
                      key={`${match.destination.data.city}-${index}`}
                      match={match}
                      labelText="YOUR MATCH"
                      onSeeDetails={() =>
                        setSelectedDestination(match.destination.data)
                      }
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {selectedDestination && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-6 overflow-hidden"
          onClick={() => setSelectedDestination(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full max-h-[85vh] rounded-3xl bg-[#0b1220] border border-white/15 text-white shadow-2xl overflow-hidden"
          >
            <div
              className="max-h-[85vh] overflow-y-auto p-8"
              style={{
                scrollbarColor: "#6d5dfc transparent",
                scrollbarWidth: "thin",
              }}
            >
              <div className="sticky top-1 z-50 flex justify-end h-0 -mr-9 pointer-events-none">
                <button
                  onClick={() => setSelectedDestination(null)}
                  className="
                    pointer-events-auto
                    flex
                    items-center
                    justify-center
                    w-10
                    h-10
                    -mt-4
                    bg-transparent
                    text-white/70
                    text-3xl
                    hover:text-white
                  "
                >
                  ×
                </button>
              </div>

              <img
                src={selectedDestination.image}
                alt={selectedDestination.city}
                className="w-full h-72 object-cover rounded-2xl mb-6"
              />

              <h2 className="text-4xl font-bold mb-1">
                {selectedDestination.city}
              </h2>

              <p className="text-white/60 mb-4">
                {selectedDestination.country}
              </p>

              {selectedDestination.match_narratives?.emotional_hook && (
                <p className="text-xl text-white/90 italic mb-6">
                  "{selectedDestination.match_narratives.emotional_hook}"
                </p>
              )}

              <p className="text-xl font-semibold mb-3">Personality Match</p>

              {selectedDestination.archetypes?.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {selectedDestination.archetypes.slice(0, 3).map((type) => (
                    <span
                      key={type}
                      className="
                        px-3
                        py-2
                        rounded-full
                        bg-[#6d5dfc]/15
                        border
                        border-[#6d5dfc]/30
                        text-[#b8b0ff]
                        text-sm
                        font-medium
                      "
                    >
                      {type}
                    </span>
                  ))}
                </div>
              )}

              <div className="space-y-8">
                <section>
                  <h3 className="text-xl font-semibold mb-3">
                    Why it matches you
                  </h3>
                  <p className="text-white/75 leading-relaxed">
                    {selectedDestination.match_narratives?.high_match}
                  </p>
                </section>

                {selectedDestination.match_narratives?.ideal_for?.length >
                  0 && (
                  <section>
                    <h3 className="text-xl font-semibold mb-3">Ideal for</h3>

                    <div className="flex flex-wrap gap-2">
                      {selectedDestination.match_narratives.ideal_for.map(
                        (item, i) => (
                          <span
                            key={i}
                            className="
                              px-3
                              py-2
                              rounded-full
                              bg-[#4f7cff]/15
                              border
                              border-[#4f7cff]/30
                              text-[#9eb8ff]
                              text-sm
                              font-medium
                            "
                          >
                            {item}
                          </span>
                        )
                      )}
                    </div>
                  </section>
                )}

                {selectedDestination.emotional_signature && (
                  <section>
                    <h3 className="text-xl font-semibold mb-4">
                      Destination DNA
                    </h3>

                    {[
                      [
                        "Activity Level",
                        selectedDestination.emotional_signature.energy,
                      ],
                      [
                        "Sense of Discovery",
                        selectedDestination.emotional_signature.freedom,
                      ],
                      [
                        "Cultural Experience",
                        selectedDestination.emotional_signature.cultural_depth,
                      ],
                      [
                        "Connection to Nature",
                        selectedDestination.emotional_signature
                          .nature_connection,
                      ],
                      [
                        "Romantic Atmosphere",
                        selectedDestination.emotional_signature.romanticism,
                      ],
                    ]
                      .filter(([, value]) => typeof value === "number")
                      .map(([label, value]) => (
                        <div key={label} className="mb-3">
                          <div className="flex justify-between text-sm text-white/70 mb-1">
                            <span>{label}</span>
                            <span>{value}/10</span>
                          </div>

                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#4f7cff] to-[#6d5dfc]"
                              style={{ width: `${value * 10}%` }}
                            />
                          </div>
                        </div>
                      ))}
                  </section>
                )}

                {selectedDestination.trip_contexts && (
                  <section>
                    <h3 className="text-xl font-semibold mb-4">
                      Travel style fit
                    </h3>

                    <div className="grid sm:grid-cols-2 gap-3">
                      {Object.entries(selectedDestination.trip_contexts)
                        .filter(([, value]) => value?.score)
                        .map(([key, value]) => (
                          <div
                            key={key}
                            className="rounded-2xl bg-white/5 border border-white/10 p-4"
                          >
                            <div className="flex justify-between mb-2">
                              <span className="capitalize text-white/80">
                                {key.replaceAll("_", " ")}
                              </span>
                              <span className="text-white/60">
                                {value.score}/10
                              </span>
                            </div>

                            <p className="text-sm text-white/60 leading-relaxed">
                              {value.description}
                            </p>
                          </div>
                        ))}
                    </div>
                  </section>
                )}

                {selectedDestination.seasonality?.best_months?.length > 0 && (
                  <section>
                    <h3 className="text-xl font-semibold mb-3">
                      Best time to visit
                    </h3>
                    <p className="text-white/75 capitalize">
                      {selectedDestination.seasonality.best_months.join(" • ")}
                    </p>
                  </section>
                )}

                {selectedDestination.top_activities?.length > 0 && (
                  <section>
                    <h3 className="text-xl font-semibold mb-3">
                      Top activities
                    </h3>

                    <ul className="text-white/75 space-y-2">
                      {selectedDestination.top_activities.map((activity, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#4f7cff]">❯</span>
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {selectedDestination.possible_downsides?.length > 0 && (
                  <section>
                    <h3 className="text-xl font-semibold mb-3">
                      Things to Consider
                    </h3>

                    <ul className="text-white/70 space-y-2">
                      {selectedDestination.possible_downsides.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-white/60">◆</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {shareOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-6"
          onClick={() => setShareOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-3xl rounded-3xl border border-white/15 bg-white/10 backdrop-blur-2xl p-10 text-center shadow-[0_30px_100px_rgba(0,0,0,0.45)]"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/70">
              <span>Group Travel Matching</span>
            </div>

            <h1 className="text-4xl font-bold mb-4">Share Group Results</h1>

            <p className="text-white/70 mb-8">
              Share your group travel matches with friends.
            </p>

            <div className="w-full px-5 py-4 rounded-xl bg-black/25 border border-white/15 text-center text-white/80 outline-none mb-6 whitespace-pre-line">
              {shareText}
            </div>

            <div className="flex justify-center flex-wrap gap-3 mb-10">
              <button
                onClick={copyGroupResults}
                className="px-4 py-2 rounded-xl border border-white/15 bg-white/5 text-white font-semibold text-sm hover:bg-white/10 transition inline-flex items-center gap-2"
              >
                <FaCopy size={14} />
                Copy Results
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
                  groupResultsLink
                )}&text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl border border-white/15 bg-white/5 text-white font-semibold text-sm hover:bg-white/10 transition inline-flex items-center gap-2"
              >
                <FaTelegramPlane size={14} color="#229ED9" />
                Telegram
              </a>

              <a
                href={`mailto:?subject=${encodeURIComponent(
                  "Zulario Group Travel Results"
                )}&body=${encodeURIComponent(shareText)}`}
                className="px-4 py-2 rounded-xl border border-white/15 bg-white/5 text-white font-semibold text-sm hover:bg-white/10 transition inline-flex items-center gap-2"
              >
                <FaEnvelope size={14} color="#ef4444" />
                Email
              </a>
            </div>

            <button
              onClick={() => setShareOpen(false)}
              className="px-6 py-4 rounded-xl border-none text-white font-semibold bg-gradient-to-br from-[#4f7cff] to-[#6d5dfc] shadow-[0_10px_30px_rgba(79,124,255,0.3)] hover:scale-105 transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
  {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <h3 className="text-2xl font-light tracking-wider text-white mb-3">
                zulario
              </h3>
              <p className="text-white/60 leading-relaxed max-w-sm">
                Discover destinations that match your personality, travel style,
                and the experiences you're looking for.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-white/90">Explore</h4>
              <div className="flex flex-col gap-1 text-white/60">
                <Link href="/quiz">Take the Quiz</Link>
                <Link href="/destinations">Destinations</Link>
                <Link href="/about">About</Link>
                <Link href="/faq">FAQ</Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-white/90">
                Travel Matching
              </h4>
              <ul className="space-y-2 text-white/60">
                <li>✓ Personality-based recommendations</li>
                <li>✓ Emotional destination matching</li>
                <li>✓ Solo & group travel compatibility</li>
                <li>✓ Beyond popularity rankings</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              © 2026 Zulario. All rights reserved.
            </p>

            <div className="flex items-center gap-4 text-sm text-white/50">
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>

              <a href="https://instagram.com/myzulario/" target="_blank" rel="noreferrer">
                <FaInstagram size={20} />
              </a>
              <a href="https://tiktok.com/@myzulario" target="_blank" rel="noreferrer">
                <FaTiktok size={20} />
              </a>
              <a href="https://x.com/myzulario" target="_blank" rel="noreferrer">
                <FaXTwitter size={20} />
              </a>
              <a href="https://facebook.com/myzulario/" target="_blank" rel="noreferrer">
                <FaFacebookF size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}