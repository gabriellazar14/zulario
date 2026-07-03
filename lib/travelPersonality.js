export function getTravelPersonality(data = {}) {
  if (data.travel_personality?.label && data.travel_personality?.icon) {
    return data.travel_personality;
  }

  return {
    icon: "✨",
    label: "Curious Explorer",
  };
}