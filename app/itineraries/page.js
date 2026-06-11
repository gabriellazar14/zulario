"use client";

import { useSearchParams } from "next/navigation";
import BackButton from "../../components/BackButton";

export default function ItineraryPage() {
  const searchParams = useSearchParams();

  const destination =
    searchParams.get("destination");

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: 40,
        background:
          "linear-gradient(to bottom, #dbeafe, #f0f9ff, #ffffff)",
      }}
    >
      <BackButton />

      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          background: "white",
          borderRadius: 24,
          padding: 40,
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            fontSize: 42,
            marginBottom: 20,
          }}
        >
          {destination} Itinerary
        </h1>

        <p
          style={{
            fontSize: 20,
            color: "#555",
            lineHeight: 1.8,
          }}
        >
          Here you will build personalized itineraries
          for {destination}.
        </p>

        <div
          style={{
            marginTop: 40,
            padding: 30,
            borderRadius: 16,
            background: "#f9fafb",
          }}
        >
          Future features:
          <ul
            style={{
              marginTop: 20,
              lineHeight: 2,
            }}
          >
            <li>Day-by-day itinerary</li>
            <li>Hotels</li>
            <li>Restaurants</li>
            <li>Activities</li>
            <li>Maps</li>
            <li>AI-generated trip plans</li>
          </ul>
        </div>
      </div>
    </main>
  );
}   