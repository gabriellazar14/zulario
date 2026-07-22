import { Suspense } from "react";
import QuizContent from "./QuizContent";

export const metadata = {
  title: "Travel Personality Quiz",
  description:
    "Answer 17 carefully designed questions and discover the destinations that truly match your travel personality.",
  alternates: {
    canonical: "/quiz",
  },
  openGraph: {
    title: "Travel Personality Quiz | Zulario",
    description:
      "Discover destinations that match your personality with Zulario's travel quiz.",
    url: "https://zulario.com/quiz",
  },
};

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