export function getDestinationBadge(destination) {
  const archetypes = destination.archetypes || [];
  const types = destination.destination_types || [];
  const styles = destination.experience_styles || [];
  const tags = destination.tags || [];

  const has = (...values) =>
    values.some(
      (v) =>
        archetypes.includes(v) ||
        types.includes(v) ||
        styles.some((s) => s.includes(v)) ||
        tags.includes(v)
    );

  if (has("bucket list", "bucket-list"))
    return { icon: "⭐", label: "Bucket List" };

  if (has("adventure", "adventure seeker"))
    return { icon: "🎒", label: "Adventure" };

  if (has("history", "history seeker", "unesco"))
    return { icon: "🏛", label: "Cultural Heritage" };

  if (has("nature", "nature lover"))
    return { icon: "🏔", label: "Nature Escape" };

  if (has("beach", "coast", "island"))
    return { icon: "🌊", label: "Coastal Calm" };

  if (has("photography", "photography traveler"))
    return { icon: "📷", label: "Photographer's Dream" };

  if (has("slow traveler"))
    return { icon: "🌿", label: "Slow Travel" };

  if (has("thermal", "thermal_springs"))
    return { icon: "♨️", label: "Wellness Escape" };

  if (has("winter", "snow", "ski"))
    return { icon: "❄️", label: "Winter Wonder" };

  if (has("romantic"))
    return { icon: "❤️", label: "Romantic Escape" };

  return {
    icon: "✨",
    label: "Hidden Gem",
  };
}