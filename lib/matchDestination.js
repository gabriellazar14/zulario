export function matchDestination(userScores = {}, destinations = []) {
  const safe = (value) => (typeof value === "number" ? value : 0);

  const getData = (destination) => destination.data || destination;

  const normalize = (value) =>
    String(value || "")
      .toLowerCase()
      .replace(/_/g, " ")
      .trim();

  const normalizeCategory = (value) => {
    const v = normalize(value);

    if (v.includes("city") || v.includes("urban")) return "city";

    if (
      v.includes("beach") ||
      v.includes("coast") ||
      v.includes("coastal") ||
      v.includes("island") ||
      v.includes("ocean") ||
      v.includes("sea")
    ) {
      return "beach";
    }

    if (
      v.includes("mountain") ||
      v.includes("mountains") ||
      v.includes("alps") ||
      v.includes("hiking") ||
      v.includes("alpine")
    ) {
      return "mountains";
    }

    if (
      v.includes("adventure") ||
      v.includes("national park") ||
      v.includes("nature") ||
      v.includes("wilderness") ||
      v.includes("exploration") ||
      v.includes("outdoor")
    ) {
      return "adventure";
    }

    return "";
  };

  const getDestinationRegion = (country = "") => {
    const c = normalize(country);

    const europe = [
      "europe",
      "france",
      "italy",
      "spain",
      "greece",
      "portugal",
      "germany",
      "belgium",
      "netherlands",
      "austria",
      "switzerland",
      "czech republic",
      "czechia",
      "hungary",
      "poland",
      "croatia",
      "slovenia",
      "iceland",
      "norway",
      "sweden",
      "finland",
      "united kingdom",
      "uk",
      "england",
      "scotland",
      "ireland",
      "romania",
      "bulgaria",
      "serbia",
      "montenegro",
      "bosnia and herzegovina",
      "malta",
      "luxembourg",
      "denmark",
      "slovakia",
      "estonia",
      "latvia",
      "lithuania",
      "ukraine",
      "russia",
      "russian federation",
      "turkiye",
      "turkey",
      "monaco",
      "gibraltar",
    ];

    const northAmerica = [
      "united states",
      "united states of america",
      "usa",
      "canada",
      "mexico",
      "bahamas",
      "bermuda",
      "cuba",
      "dominican republic",
      "jamaica",
      "puerto rico",
      "barbados",
      "aruba",
      "antigua",
      "anguilla",
      "grenada",
      "saint martin",
      "st martin",
      "turks and caicos",
      "british virgin islands",
      "u s virgin islands",
      "us virgin islands",
      "haiti",
      "belize",
      "costa rica",
      "nicaragua",
      "honduras",
      "panama",
    ];

    const southAmerica = [
      "brazil",
      "argentina",
      "peru",
      "venezuela",
      "colombia",
      "ecuador",
      "chile",
      "bolivia",
      "uruguay",
      "paraguay",
    ];

    const asia = [
      "china",
      "japan",
      "thailand",
      "indonesia",
      "malaysia",
      "cambodia",
      "viet nam",
      "vietnam",
      "india",
      "philippines",
      "korea south",
      "south korea",
      "taiwan",
      "singapore",
      "hong kong",
      "macao",
      "macau",
      "united arab emirates",
      "qatar",
      "israel",
      "georgia",
      "maldives",
      "sri lanka",
    ];

    const africa = [
      "tanzania",
      "morocco",
      "egypt",
      "south africa",
      "kenya",
      "madagascar",
      "seychelles",
      "mauritius",
      "mozambique",
      "malawi",
    ];

    const oceania = [
      "australia",
      "new zealand",
      "fiji",
      "vanuatu",
      "cook islands",
      "tahiti",
      "french polynesia",
    ];

    if (europe.includes(c)) return "europe";
    if (northAmerica.includes(c)) return "north_america";
    if (southAmerica.includes(c)) return "south_america";
    if (asia.includes(c)) return "asia";
    if (africa.includes(c)) return "africa";
    if (oceania.includes(c)) return "oceania";

    return "unknown";
  };

  const mainCategories = ["city", "beach", "mountains", "adventure"];

  const selectedCategory = normalizeCategory(userScores.primary_category);

  const fallbackCategory = mainCategories
    .map((key) => ({
      key,
      value: safe(userScores[key]),
    }))
    .sort((a, b) => b.value - a.value)[0]?.key;

  const activeCategory = selectedCategory || fallbackCategory;

  let finalDestinations = activeCategory
    ? destinations.filter((destination) => {
        const data = getData(destination);

        const categorySources = [
          data.primary_category,
          ...(data.destination_types || []),
          ...(data.tags || []),
        ];

        return categorySources.some(
          (item) => normalizeCategory(item) === activeCategory
        );
      })
    : destinations;

  if (finalDestinations.length < 10) {
    finalDestinations = destinations;
  }

  const typeMap = {
    city: ["city", "urban", "metropolis", "walkable", "capital", "neighborhood"],
    beach: [
      "beach",
      "beaches",
      "coast",
      "coastal",
      "island",
      "tropical",
      "ocean",
      "sea",
      "sun destination",
      "sun",
    ],
    mountains: [
      "mountains",
      "mountain",
      "alps",
      "hiking",
      "ski",
      "lakes",
      "national park",
      "highland",
      "alpine",
    ],
    nature: [
      "nature",
      "wildlife",
      "forest",
      "jungle",
      "lake",
      "landscape",
      "national park",
      "nature reserve",
      "outdoors",
    ],
    culture: [
      "culture",
      "cultural",
      "historical",
      "historic",
      "history",
      "literary",
      "ancient",
      "museum",
      "heritage",
      "architecture",
    ],
    adventure: [
      "adventure",
      "wilderness",
      "road trip",
      "road trips",
      "hiking",
      "outdoor",
      "exploration",
      "national park",
      "nature reserve",
      "wild",
    ],
    romantic: ["romantic", "romanticism", "couple", "couples"],
    slow_travel: [
      "relaxation",
      "wellness",
      "slow travel",
      "slow",
      "retreat",
      "calm",
      "peaceful",
      "quiet",
    ],
    isolation: [
      "wilderness",
      "remote",
      "nature",
      "quiet",
      "silence",
      "peaceful",
      "national park",
    ],
    exploration: [
      "adventure",
      "cultural",
      "urban",
      "nature",
      "wandering",
      "discovery",
      "exploration",
      "scenic",
    ],
  };

  const intentKeys = Object.keys(typeMap);

  const emotionalKeys = [
    "energy",
    "calmness",
    "mystery",
    "freedom",
    "emotional_warmth",
    "nature_connection",
    "social_openness",
    "romanticism",
    "spontaneity",
    "sensory_intensity",
    "reflectiveness",
    "cultural_depth",
    "comfort_zone_expansion",
  ];

  const results = finalDestinations.map((destination) => {
    const data = getData(destination);

    const searchable = [
      data.city,
      data.country,
      ...(data.destination_types || []),
      ...(data.tags || []),
      ...(data.archetypes || []),
      ...(data.experience_styles || []),
      ...(data.match_narratives?.ideal_for || []),
      data.primary_category,
      data.destination_dna?.pace,
      data.destination_dna?.emotional_style,
      data.destination_dna?.social_style,
      data.destination_dna?.beauty_type,
      data.destination_dna?.primary_energy,
    ].map(normalize);

    const hasKeyword = (keywords) =>
      keywords.some((keyword) => {
        const k = normalize(keyword);
        return searchable.some((item) => item.includes(k) || k.includes(item));
      });

    const profile = data.emotional_signature || {};
    const contextual = data.contextual_attributes || {};

    let score = 0;

    if (activeCategory) {
      score += safe(userScores[activeCategory]) * 90;
    }

    intentKeys.forEach((intent) => {
      const userValue = safe(userScores[intent]);
      if (userValue <= 0) return;

      if (hasKeyword(typeMap[intent])) {
        score += userValue * 35;
      }
    });

    emotionalKeys.forEach((key) => {
      const userValue = safe(userScores[key]);
      const destinationValue = safe(profile[key]);

      if (userValue > 0 && destinationValue > 0) {
        score += userValue * destinationValue * 0.8;
      }
    });

    score += safe(contextual.nature_access) * safe(userScores.nature_connection) * 0.8;
    score += safe(contextual.walkability) * safe(userScores.city) * 0.5;
    score += safe(contextual.nightlife) * safe(userScores.social_openness) * 0.35;
    score += safe(contextual.public_transport) * safe(userScores.city) * 0.35;

    if (safe(userScores.culture) >= 3 && hasKeyword(typeMap.culture)) {
      score += 55;
    }

    if (safe(userScores.adventure) >= 3 && hasKeyword(typeMap.adventure)) {
      score += 70;
    }

    if (safe(userScores.romantic) >= 3 && hasKeyword(typeMap.romantic)) {
      score += 55;
    }

    if (safe(userScores.slow_travel) >= 3 && hasKeyword(typeMap.slow_travel)) {
      score += 55;
    }

    const richness =
      (data.destination_types?.length || 0) +
      (data.tags?.length || 0) +
      (data.archetypes?.length || 0) +
      (data.experience_styles?.length || 0);

    score += Math.min(richness, 25);

    const accessibility = data.travel_accessibility || {};
    const originRegion = userScores.origin_region || "europe";
    const travelScope = userScores.travel_scope || "anywhere";
    const destinationRegion = getDestinationRegion(data.country);

    let originAffinity =
      accessibility.origin_affinity?.[originRegion] ?? 3;

    if (travelScope === "nearby") {
      originAffinity = destinationRegion === originRegion ? 1 : 5;

      if (destinationRegion !== originRegion) {
        score -= 10000;
      }

      score -= originAffinity * 120;
    }

    if (travelScope === "anywhere") {
      score -= originAffinity * 20;
    }

    score *= 0.97 + Math.random() * 0.06;

    return {
      destination,
      score,
    };
  });

  const sorted = results.sort((a, b) => b.score - a.score);

if (sorted.length === 0) return [];

const topThree = sorted.slice(0, 3);
const percentages = [99, 94, 89];

return topThree.map((result, index) => ({
  ...result,
  percentage: percentages[index],
}));
}