"use client";

import { useState } from "react";
import { questions } from "../data/questions";

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [profile, setProfile] = useState({});
  const [finished, setFinished] = useState(false);

  const handleAnswer = (answer) => {
    const newProfile = { ...profile };

    // add scores
    if (answer.scores) {
      Object.entries(answer.scores).forEach(([key, value]) => {
        newProfile[key] = (newProfile[key] || 0) + value;
      });
    }

    setProfile(newProfile);

    // next question or finish
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
      console.log("FINAL PROFILE:", newProfile);
    }
  };

  if (finished) {
    return (
      <main style={{ padding: "40px" }}>
        <h1>Your Travel Personality</h1>

        <pre>{JSON.stringify(profile, null, 2)}</pre>
      </main>
    );
  }

  const q = questions[current];

  return (
    <main style={{ padding: "40px" }}>
      <h1>Travel Quiz</h1>

      <h2>{q.question}</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {q.answers.map((a, i) => {
          const isObject = typeof a === "object";

          return (
            <button
              key={i}
              onClick={() => handleAnswer(isObject ? a : { text: a })}
              style={{
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              {isObject ? a.text : a}
            </button>
          );
        })}
      </div>
    </main>
  );
}