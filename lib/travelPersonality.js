export function getTravelPersonality(scores = {}) {
  const personalities = [
    {
      icon: "🌿",
      label: "Slow Traveler",
      score:
        (scores.calmness || 0) * 2 +
        (scores.reflectiveness || 0) * 2 +
        (scores.nature_connection || 0),
    },
    {
      icon: "❤️",
      label: "Romantic Wanderer",
      score:
        (scores.emotional_warmth || 0) * 2 +
        (scores.romanticism || 0) * 3 +
        (scores.calmness || 0),
    },
    {
      icon: "🧭",
      label: "Adventure Seeker",
      score:
        (scores.freedom || 0) * 2 +
        (scores.energy || 0) * 2 +
        (scores.adventure || 0) * 2,
    },
    {
      icon: "🏛️",
      label: "Cultural Explorer",
      score:
        (scores.cultural_depth || 0) * 2 +
        (scores.mystery || 0) +
        (scores.social_openness || 0),
    },
    {
      icon: "✨",
      label: "Curious Mind",
      score:
        (scores.mystery || 0) * 2 +
        (scores.cultural_depth || 0) +
        (scores.freedom || 0),
    },
    {
      icon: "🎉",
      label: "City Adventurer",
      score:
        (scores.social_openness || 0) * 3 +
        (scores.energy || 0) * 2 +
        (scores.emotional_warmth || 0),
    },
    {
      icon: "🏔️",
      label: "Nature Enthusiast",
      score:
        (scores.nature_connection || 0) * 3 +
        (scores.reflectiveness || 0) +
        (scores.freedom || 0),
    },
  ];

  return personalities.reduce((best, current) =>
    current.score > best.score ? current : best
  );
}