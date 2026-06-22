"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import {
  FaWhatsapp,
  FaTelegramPlane,
  FaEnvelope,
  FaCopy,
} from "react-icons/fa";

import {
  FaInstagram,
  FaTiktok,
  FaXTwitter,
  FaFacebookF,
} from "react-icons/fa6";

import { matchDestination } from "@/lib/matchDestination";

import {
  getDestinations,
  saveGroupResponse,
  saveUserResult,
  saveResultFeedback,
  saveSharedResult,
} from "@/lib/supabase";

const questions = [
  {
    id: 1,
    question: "When do you imagine taking this trip?",
    answers: [
      { text: "Winter", scores: { calmness: 2, nature_connection: 2 } },
      { text: "Spring", scores: { nature_connection: 2 } },
      { text: "Summer", scores: { energy: 2 } },
      { text: "Autumn", scores: { calmness: 1 } },
      { text: "I’m flexible", scores: { adaptability: 2 } },
    ],
  },

 {
  id: 2,
  question: "Where do you plan to travel from?",
  answers: [
    {
      text: "Europe",
      scores: { origin_region: "europe" },
    },
    {
      text: "North America",
      scores: { origin_region: "north_america" },
    },
    {
      text: "South America",
      scores: { origin_region: "south_america" },
    },
    {
      text: "Asia",
      scores: { origin_region: "asia" },
    },
    {
      text: "Africa",
      scores: { origin_region: "africa" },
    },
    {
      text: "Oceania",
      scores: { origin_region: "oceania" },
    },
  ],
},
{
  id: 3,
  question: "How far are you open to traveling?",
  answers: [
    {
      text: "Only destinations near my area",
      scores: { travel_scope: "nearby" },
    },
    {
      text: "Anywhere, if it matches me",
      scores: { travel_scope: "anywhere" },
    },
  ],
},

  {
  id: 4,
  question: "What kind of experience are you looking for most right now?",
  answers: [
    {
      text: "A vibrant city atmosphere",
      scores: {
        primary_category: "city",
        city: 10,
        energy: 6,
        beach: 0,
        mountains: 0,
        nature: 2,
      },
    },
    {
      text: "Nature and mountains",
      scores: {
        primary_category: "mountains",
        mountains: 10,
        nature_connection: 8,
        nature: 6,
        beach: 0,
        city: 0,
      },
    },
    {
      text: "A beach escape",
      scores: {
        primary_category: "beach",
        beach: 10,
        calmness: 6,
        nature_connection: 4,
        city: 0,
        mountains: 0,
      },
          },
          {
  text: "A once-in-a-lifetime adventure",
  scores: {
    primary_category: "adventure",
    adventure: 10,
    transformation: 8,
    exploration: 8,
    city: 0,
    beach: 0,
  },
}
          
  ],
},
  {
    id: 5,
    question:
      "You arrive somewhere completely unfamiliar at sunset. What attracts you first?",
    answers: [
      { text: "A lively street full of movement and music", scores: { energy: 2 } },
      { text: "A quiet café with people talking softly", scores: { calmness: 2 } },
      { text: "A beautiful viewpoint or landscape", scores: { nature_connection: 2 } },
      {
        text: "A local gathering or event you unexpectedly find",
        scores: { social_openness: 2 },
      },
    ],
  },
  {
    id: 6,
    question: "Which type of atmosphere affects you most?",
    answers: [
      {
        text: "Places that feel elegant and beautifully organized",
        scores: { calmness: 1 },
      },
      {
        text: "Places that feel authentic, alive, and imperfect",
        scores: { energy: 2 },
      },
      {
        text: "Places surrounded by nature and silence",
        scores: { nature_connection: 3 },
      },
      {
        text: "Places filled with history and timeless character",
        scores: { mystery: 2 },
      },
    ],
  },
  {
    id: 7,
    question: "What kind of moments do you enjoy most while traveling?",
    answers: [
      {
        text: "Deep conversations and meaningful connections",
        scores: { emotional_warmth: 3 },
      },
      {
        text: "Discovering different cultures and perspectives",
        scores: { mystery: 2 },
      },
      {
        text: "Unexpected experiences and spontaneity",
        scores: { energy: 2 },
      },
      {
        text: "Quiet observation and taking everything in slowly",
        scores: { calmness: 2 },
      },
    ],
  },
  {
    id: 8,
    question: "What kind of atmosphere stays in your memory the longest?",
    answers: [
      {
        text: "Romantic and cinematic moments",
        scores: { emotional_warmth: 3 },
      },
      { text: "Places that felt energetic and alive", scores: { energy: 2 } },
      {
        text: "Peaceful moments and quiet reflection",
        scores: { calmness: 2 },
      },
      {
        text: "Intense experiences and unpredictability",
        scores: { mystery: 2 },
      },
    ],
  },
  {
    id: 9,
    question: "Which environment feels closest to your ideal rhythm?",
    answers: [
      { text: "Elegant and refined", scores: { calmness: 1 } },
      { text: "Creative and slightly chaotic", scores: { energy: 2 } },
      { text: "Calm, simple, and peaceful", scores: { calmness: 3 } },
      {
        text: "Warm, emotional, and welcoming",
        scores: { emotional_warmth: 3 },
      },
    ],
  },
  {
    id: 10,
    question: "What are you hoping this trip gives you emotionally?",
    answers: [
      {
        text: "Connection, warmth, and comfort",
        scores: { emotional_warmth: 3 },
      },
      { text: "New perspectives and stimulation", scores: { mystery: 2 } },
      { text: "Freedom, escape, and wonder", scores: { freedom: 3 } },
      {
        text: "Calmness, clarity, and space to breathe",
        scores: { calmness: 3 },
      },
    ],
  },
  {
    id: 11,
    question: "What kind of travel experience changes you the most?",
    answers: [
      { text: "Nature and isolation", scores: { nature_connection: 3 } },
      {
        text: "Discovering completely new environments",
        scores: { mystery: 3 },
      },
      {
        text: "Romance and emotional connection",
        scores: { emotional_warmth: 3 },
      },
      {
        text: "Adventure and physical intensity",
        scores: { energy: 3 },
      },
    ],
  },
  {
    id: 12,
    question: "Which feeling are you chasing most right now?",
    answers: [
      {
        text: "Healing and emotional balance",
        scores: { calmness: 3 },
      },
      { text: "Reinvention and fresh energy", scores: { energy: 3 } },
      {
        text: "Nostalgia and beautiful memories",
        scores: { emotional_warmth: 2 },
      },
      { text: "Stability and simplicity", scores: { calmness: 2 } },
    ],
  },
  {
    id: 13,
    question:
      "During a long day exploring a destination, what matters most to you?",
    answers: [
      {
        text: "Beautiful architecture and aesthetics",
        scores: { calmness: 1 },
      },
      {
        text: "Discovering places with different personalities",
        scores: { mystery: 2 },
      },
      {
        text: "Peace, slowness, and quiet moments",
        scores: { calmness: 3 },
      },
      {
        text: "Social energy, nightlife, and interaction",
        scores: { energy: 3 },
      },
    ],
  },
  {
    id: 14,
    question: "Which imperfection bothers you the least in a destination?",
    answers: [
      {
        text: "A place feeling emotionally distant",
        scores: { mystery: 1 },
      },
      { text: "A bit of chaos and disorder", scores: { energy: 2 } },
      { text: "Tourist crowds", scores: { calmness: 1 } },
      { text: "Slower pace and quietness", scores: { calmness: 2 } },
    ],
  },
  {
    id: 15,
    question: "What kind of evening atmosphere attracts you most?",
    answers: [
      {
        text: "Elegant bars and intimate spaces",
        scores: { calmness: 2 },
      },
      {
        text: "Lively streets and spontaneous social energy",
        scores: { energy: 3 },
      },
      {
        text: "Artistic and alternative places",
        scores: { mystery: 2 },
      },
      {
        text: "Quiet walks and peaceful evenings",
        scores: { calmness: 3 },
      },
    ],
  },
  {
    id: 16,
    question:
      "If a destination were a person, who would attract you most?",
    answers: [
      {
        text: "Calm and emotionally safe",
        scores: { emotional_warmth: 2 },
      },
      {
        text: "Intelligent and unpredictable",
        scores: { mystery: 3 },
      },
      {
        text: "Passionate and expressive",
        scores: { energy: 2 },
      },
      { text: "Elegant and composed", scores: { calmness: 2 } },
    ],
  },
  {
    id: 17,
    question: "What kind of change are you secretly looking for?",
    answers: [
      { text: "Inner peace", scores: { calmness: 3 } },
      { text: "New energy", scores: { energy: 3 } },
      { text: "Emotional depth", scores: { emotional_warmth: 3 } },
      { text: "Freedom from routine", scores: { freedom: 3 } },
    ],
  },
];
function MatchCircle({ percentage }) {
  const size = 82;
  const stroke = 4;

  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = Math.max(0, Math.min(100, percentage));

  const offset =
    circumference - (progress / 100) * circumference;

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
          stroke="rgba(255,255,255,0.2)"
          strokeWidth={stroke}
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#6d5dfc"
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
function ResultCard({ match, onSeeDetails }) {
  const data = match.destination?.data || match.destination || {};
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
    MATCH
  </div>
</div>

      <div className="absolute bottom-6 left-6 right-6 text-white">
        <h2 className="text-4xl font-bold mb-2">{data.city}</h2>
        <p className="text-white/70 mb-4">{data.country}</p>

        <p className="text-sm text-white/80 leading-relaxed">
          {narrative}
        </p>

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

function QuizContent() {
  const searchParams = useSearchParams();
  const groupId = searchParams.get("groupId");

  const [current, setCurrent] = useState(0);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
const [selectedDestination, setSelectedDestination] = useState(null);
const [shareOpen, setShareOpen] = useState(false);
const [shareLink, setShareLink] = useState("");
const [email, setEmail] = useState("");
const [savedEmailResult, setSavedEmailResult] = useState(false);
const [feedbackRating, setFeedbackRating] = useState(0);
const [feedbackComment, setFeedbackComment] = useState("");
const [feedbackSent, setFeedbackSent] = useState(false);

const sendFeedback = async () => {
  if (!feedbackRating || !result?.length) return;

  const saved = await saveResultFeedback(
    feedbackRating,
    feedbackComment.trim(),
    result.slice(0, 3),
    groupId ? "group_quiz_result" : "single_quiz_result"
  );

  if (saved) {
    setFeedbackSent(true);
  }
};

const createShareLink = async () => {
  if (!result || result.length === 0) return;

  const saved = await saveSharedResult(result.slice(0, 3));

  if (!saved) return;

  const link = `${window.location.origin}/share/${saved.id}`;

  setShareLink(link);
  setShareOpen(true);
};

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
  const [name, setName] = useState("");
  const [savedGroupResult, setSavedGroupResult] = useState(false);

  const buildScores = (answersMap) => {
    const finalScores = {};

    Object.values(answersMap).forEach((answer) => {
      if (!answer?.scores) return;

      Object.entries(answer.scores).forEach(([key, value]) => {
        if (typeof value === "string") {
          finalScores[key] = value;
        } else {
          finalScores[key] = (finalScores[key] || 0) + value;
        }
      });
    });

    return finalScores;
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);

    setSelectedAnswers((prev) => ({
      ...prev,
      [current]: answer,
    }));
  };

  const goPrevious = () => {
    if (current === 0) return;

    const previousIndex = current - 1;
    setCurrent(previousIndex);
    setSelectedAnswer(selectedAnswers[previousIndex] || null);
  };

  const goNext = async () => {
    if (!selectedAnswer) return;
    if (groupId && !name.trim()) return;

    const updatedAnswers = {
      ...selectedAnswers,
      [current]: selectedAnswer,
    };

    setSelectedAnswers(updatedAnswers);

    const isLast = current === questions.length - 1;

    if (!isLast) {
      const nextIndex = current + 1;
      setCurrent(nextIndex);
      setSelectedAnswer(updatedAnswers[nextIndex] || null);
      return;
    }

    setLoading(true);

    try {
    const finalScores = buildScores(updatedAnswers);
const destinations = await getDestinations();
const matches = matchDestination(finalScores, destinations);

setTimeout(() => {
  setResult(matches);
}, 3500);

if (groupId) {
  await saveGroupResponse(
    groupId,
    name,
    finalScores,
    matches.slice(0, 3)
  );

  localStorage.setItem(
    `group_quiz_${groupId}_my_scores`,
    JSON.stringify({
      name: name.trim(),
      scores: finalScores,
    })
  );

  setSavedGroupResult(true);
}

    } catch (err) {
      console.error("Quiz error:", err);
    } finally {
  setTimeout(() => {
    setLoading(false);
  }, 3500);
}
};
  const resetQuiz = () => {
    setResult(null);
    setCurrent(0);
    setSelectedAnswer(null);
    setSelectedAnswers({});
    setSavedGroupResult(false);
    setSelectedDestination(null);
    setEmail("");
    setSavedEmailResult(false);
    setFeedbackRating(0);
    setFeedbackComment("");
    setFeedbackSent(false);
    setShareLink("");
    setShareOpen(false);
  };
const shareText = `I discovered my Zulario travel matches.

See my results here:
${shareLink}`;
const saveMyResults = async () => {
  console.log("Button clicked");

  if (!email.trim()) {
    alert("Please enter an email address");
    return;
  }

  if (!result?.length) {
    alert("No results found");
    return;
  }

  console.log("Saving results for:", email);

  const cleanResults = result.slice(0, 3).map((match) => {
    const data = match.destination?.data || match.destination || {};

    return {
      percentage: match.percentage,
      city: data.city,
      country: data.country,
      image: data.image,
      emotional_hook: data.match_narratives?.emotional_hook,
    };
  });

  console.log("Results payload:", cleanResults);

  const saved = await saveUserResult(email.trim(), cleanResults);

  console.log("Supabase response:", saved);

  if (!saved) {
    alert("Could not save your results.");
    return;
  }

  const response = await fetch("/api/send-results", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.trim(),
      results: cleanResults,
    }),
  });

  const emailResponse = await response.json();
  console.log("Email API response:", emailResponse);

  if (!response.ok) {
    alert(emailResponse.error || "Results saved, but email failed.");
    return;
  }

  setSavedEmailResult(true);
  setEmail("");
};
const copyResults = async () => {
  await navigator.clipboard.writeText(shareText);
  alert("Results copied!");
};

if (loading) {
  return (
    <main className="min-h-screen bg-[#070b16] text-white relative flex items-center justify-center px-6 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('/background.jpg')" }}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-[#070b16] via-[#070b16]/90 to-blue-950/70" />

      <div className="relative z-10 w-full max-w-xl rounded-3xl border border-white/15 bg-white/10 backdrop-blur-2xl p-10 text-center shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full border-4 border-white/15 border-t-[#6d5dfc] animate-spin" />

        <h1 className="text-3xl font-bold mb-4">
          Analyzing your travel personality...
        </h1>

        <div className="space-y-3 text-left max-w-sm mx-auto text-white/75 mb-6">
   <p>✓ Personality Profile</p>
  <p>✓ Emotional Preferences</p>
  <p>✓ Travel Style</p>
  <p>✓ Cultural Interests</p>
  <p>✓ Destination Atmosphere</p>
        </div>

        <p className="text-white/60">
          Finding your perfect destinations...
        </p>
      </div>
    </main>
  );
}

  if (result && result.length > 0) {
    return (
      <main className="min-h-screen bg-[#070b16] text-white overflow-hidden relative px-6 py-10">
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
          <h1 className="text-5xl font-bold text-center mb-4">
            Your Travel Matches
          </h1>

          <p className="text-center text-white/60 mb-10">
            These destinations best match your travel personality.
          </p>

          {savedGroupResult && (
            <div className="text-center mb-8">
              <p className="text-purple-400 mb-4">
                Your result was saved for the group quiz.
              </p>

              <a
                href={`/group/${groupId}/results`}
                className="inline-block px-6 py-4 rounded-xl text-white font-semibold bg-gradient-to-br from-[#4f7cff] to-[#6d5dfc] shadow-[0_10px_30px_rgba(79,124,255,0.3)] hover:scale-105 transition"
              >
                See Group Results
              </a>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {result.slice(0, 3).map((match) => (
              <ResultCard
                key={match.destination.data.city}
                match={match}
                onSeeDetails={() =>
                  setSelectedDestination(match.destination.data)
                }
              />
            ))}
          </div>
{/* More destinations */}
{result.length > 3 && (
  <div className="mt-14 max-w-3xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-3 text-white">
       More destinations you may love
    </h2>

    <p className="text-center text-white/60 mb-8">
      Other places that also fit your travel personality.
    </p>

    <div className="space-y-4">
      {result.slice(3, 10).map((match) => {
        const data = match.destination?.data || match.destination || {};
        const emotionalHook =
          data.match_narratives?.emotional_hook ||
          data.destination_dna?.travel_feeling ||
          data.sensory_profile?.dominant_mood ||
          "A destination that matches your travel personality.";

        return (
          <div
            key={data.id || `${data.city}-${data.country}`}
            className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition"
          >
            <img
              src={data.image}
              alt={data.city}
              className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
            />

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-white truncate">
                    {data.city}, {data.country}
                  </h3>

                  <p className="mt-1 text-sm text-white/60 italic leading-relaxed">
                    {emotionalHook}
                  </p>
                </div>

                <div className="shrink-0 text-xl font-bold text-[#8f84ff]">
                  {match.percentage}%
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
)}

       <div className="mt-14 max-w-3xl mx-auto">

  {/* SHARE */}
  <div className="text-center mb-10">

    <p className="text-white/60 mb-5">
      Share your results with friends and compare your travel personalities.
    </p>

    <div className="flex justify-center gap-4 flex-wrap">

      <button
        onClick={createShareLink}
        className="px-6 py-4 rounded-xl text-white font-semibold bg-white/10 border border-white/15 hover:bg-white/15 transition"
      >
        Share Your Results
      </button>

      <button
        onClick={resetQuiz}
        className="px-6 py-4 rounded-xl text-white font-semibold bg-gradient-to-br from-[#4f7cff] to-[#6d5dfc] shadow-[0_10px_30px_rgba(79,124,255,0.3)] hover:scale-105 transition"
      >
        Take Quiz Again
      </button>

    </div>

  </div>

  {/* SAVE RESULTS */}

  <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">

    <h2 className="text-2xl font-bold text-center mb-2">
      Save your travel matches
    </h2>

    <p className="text-white/60 text-center mb-5">
      Save your travel personality for future trips.
    </p>

    <div className="flex flex-col sm:flex-row gap-3">
  <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Your email"
    className="flex-1 px-5 py-4 rounded-xl bg-black/25 border border-white/15 text-white outline-none placeholder:text-white/40"
  />

  <button
    onClick={saveMyResults}
    className="px-6 py-4 rounded-xl text-white font-semibold bg-gradient-to-br from-[#4f7cff] to-[#6d5dfc] hover:scale-105 transition"
  >
    Email My Travel Matches
  </button>
</div>

<p className="mt-3 text-center text-sm text-white/45">
  By saving your results, you consent to storing your email and travel matches.
  View our{" "}
  <Link
    href="/privacy"
    className="text-[#9ea8ff] hover:text-white underline transition"
  >
    Privacy Policy
  </Link>
  .
</p>

    {savedEmailResult && (
      <p className="mt-4 text-center text-purple-400">
        ✓ Results saved successfully.
      </p>
    )}

  </div>

</div>
   
        </div>
<div className="relative z-10 mt-8 max-w-3xl mx-auto pb-24">
  <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 md:p-6">

    <h2 className="text-2xl font-bold text-center mb-2">
      How accurate were your matches?
    </h2>

    <p className="text-white/60 text-center mb-4">
      Help us improve Zulario by rating your travel matches.
    </p>

    {feedbackSent ? (
      <p className="text-center text-[#9ea8ff] font-semibold py-6">
        ✓ Thank you! Your feedback helps Zulario improve future matches.
      </p>
    ) : (
      <>
        <div className="flex justify-center gap-2 mb-5">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setFeedbackRating(star)}
              className={`text-4xl transition hover:scale-110 hover:text-[#8b7cff] ${
                star <= feedbackRating
                  ? "text-[#6d5dfc]"
                  : "text-white/25"
              }`}
            >
              ★
            </button>
          ))}
        </div>

        <textarea
          value={feedbackComment}
          onChange={(e) => setFeedbackComment(e.target.value)}
          placeholder="Leave a comment (optional)..."
          rows={3}
          className="w-full rounded-2xl bg-black/25 border border-white/10 px-5 py-4 text-white outline-none placeholder:text-white/35 resize-none"
        />

        <button
          onClick={sendFeedback}
          disabled={!feedbackRating}
          className={`mt-4 w-full px-6 py-4 rounded-xl text-white font-semibold transition ${
            feedbackRating
              ? "bg-gradient-to-br from-[#4f7cff] to-[#6d5dfc] hover:scale-[1.02]"
              : "bg-white/10 text-white/30 cursor-not-allowed"
          }`}
        >
          Send Feedback
        </button>
      </>
    )}
  </div>
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


{/* EMOTIONAL HOOK */}
{selectedDestination.match_narratives?.emotional_hook && (
  <p className="text-xl text-white/90 italic mb-6">
    "{selectedDestination.match_narratives.emotional_hook}"
  </p>
)}

   <p className="text-xl font-semibold mb-3">
  Personality Match
</p>

{/* ARCHETYPE BADGES */}
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
"  >
        {type}
      </span>
    ))}
  </div>
)}
      <div className="space-y-8">
        {/* WHY MATCH */}
        <section>
          <h3 className="text-xl font-semibold mb-3">
            Why it matches you
          </h3>
          <p className="text-white/75 leading-relaxed">
            {selectedDestination.match_narratives?.high_match}
          </p>
        </section>

        {/* IDEAL FOR */}
        {selectedDestination.match_narratives?.ideal_for?.length > 0 && (
          <section>
            <h3 className="text-xl font-semibold mb-3">
              Ideal for
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedDestination.match_narratives.ideal_for.map((item, i) => (
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
"                >
                  {item}
                </span>
              ))}
            </div>
          </section>

          
        )}

         {/* ENERGY PROFILE */}
        {selectedDestination.emotional_signature && (
          <section>
            <h3 className="text-xl font-semibold mb-4">
              Destination DNA
            </h3>

            {[
  ["Activity Level", selectedDestination.emotional_signature.energy],
  ["Sense of Discovery", selectedDestination.emotional_signature.freedom],
  ["Cultural Experience", selectedDestination.emotional_signature.cultural_depth],
  ["Connection to Nature", selectedDestination.emotional_signature.nature_connection],
  ["Romantic Atmosphere", selectedDestination.emotional_signature.romanticism],
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

     
 
        {/* TRAVEL STYLE */}
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

   {/* BEST TIME TO VISIT */}
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

          {/* TOP ACTIVITIES */}
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
                     
{/* THINGS TO CONSIDER */}
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
        <span>Travel Personality</span>
      </div>

      <h1 className="text-4xl font-bold mb-4">
        Share Your Results
      </h1>

      <p className="text-white/70 mb-8">
        Share your travel matches with friends and compare your travel personalities.
      </p>

      <div className="w-full px-5 py-4 rounded-xl bg-black/25 border border-white/15 text-center text-white/80 outline-none mb-6 whitespace-pre-line">
        {shareText}
      </div>

      <div className="flex justify-center flex-wrap gap-3 mb-10">
        <button
          onClick={copyResults}
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
            typeof window !== "undefined" ? window.location.origin : ""
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
            "My Zulario Travel Matches"
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
      <footer className="relative z-10 border-t border-white/10 mt-20">
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

  return (
    <main className="min-h-screen bg-[#070b16] text-white overflow-hidden relative flex items-center justify-center px-6">      <div
        className="absolute inset-0 bg-cover bg-center opacity-35"
        style={{ backgroundImage: "url('/background.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#070b16] via-[#070b16]/85 to-blue-950/70" />

      <div className="relative z-10 w-full max-w-3xl rounded-3xl border border-white/15 bg-white/10 backdrop-blur-2xl p-10 shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Travel Quiz
        </h1>

        {groupId && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full px-5 py-4 mb-6 rounded-xl bg-black/25 border border-white/15 text-white outline-none placeholder:text-white/50"
          />
        )}

        <h2 className="text-xl font-semibold mb-8 leading-relaxed">
          {questions[current].question}
        </h2>

        <div className="flex flex-col gap-4">
          {questions[current].answers.map((a, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(a)}
              className={`p-5 rounded-xl border text-left text-base transition ${
                selectedAnswer === a
                  ? "border-[#6d5dfc] bg-[#6d5dfc]/25 text-white"
                  : "border-white/15 bg-white/5 text-white/80 hover:bg-white/10"
              }`}
            >
              {a.text}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center mt-10">
          <button
            onClick={goPrevious}
            disabled={current === 0}
            className={`px-6 py-4 rounded-xl font-semibold transition ${
              current === 0
                ? "bg-white/10 text-white/30 cursor-not-allowed"
                : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
            }`}
          >
            Previous
          </button>

       <button
  onClick={goNext}
  disabled={!selectedAnswer || (groupId && !name.trim())}
  className="px-6 py-4 rounded-xl text-white font-semibold bg-gradient-to-br from-[#4f7cff] to-[#6d5dfc] shadow-lg hover:scale-105 transition disabled:opacity-40 disabled:cursor-not-allowed"
>
  {current === questions.length - 1 ? "Finish" : "Next"}
</button>

        </div>

        <p className="mt-8 text-center text-white/50">
          Question {current + 1} / {questions.length}
        </p>
      </div>
     <style jsx global>{`
  .custom-scroll::-webkit-scrollbar {
    width: 8px;
  }

  .custom-scroll::-webkit-scrollbar-track {
    background: transparent;
  }

  .custom-scroll::-webkit-scrollbar-thumb {
    background: #6d5dfc;
    border-radius: 999px;
  }

  .custom-scroll::-webkit-scrollbar-thumb:hover {
    background: #8b7cff;
  }
`}</style>


    </main>
  );
}

 
   export default function QuizPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#070b16] text-white flex items-center justify-center">
          Loading quiz...
        </main>
      }
    >
      <QuizContent />
    </Suspense>
  );
}