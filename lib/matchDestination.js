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

    if (v === "unique experience" || v === "unique_experience") {
      return "unique_experience";
    }

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
      v.includes("unique") ||
      v.includes("adventure") ||
      v.includes("national park") ||
      v.includes("wilderness")
    ) {
      return "unique_experience";
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
      "jordan",
      "saudi arabia",
      "armenia",
      "myanmar",
      "yemen",
      "turkey",
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
      "namibia",
      "botswana",
      "uganda",
      "zimbabwe",
      "zambia",
      "zimbabwe / zambia",
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

  const mainCategories = ["city", "beach", "mountains", "unique_experience"];

  const selectedCategory = normalizeCategory(userScores.primary_category);

  const fallbackCategory = mainCategories
    .map((key) => ({
      key,
      value: safe(userScores[key]),
    }))
    .sort((a, b) => b.value - a.value)[0];

  const activeCategory =
    selectedCategory ||
    (fallbackCategory?.value > 0 ? fallbackCategory.key : "");

  const originRegion = userScores.origin_region || "europe";
  const travelScope = userScores.travel_scope || "anywhere";
  const selectedSeason = userScores.selected_season || "flexible";

 let finalDestinations = destinations.filter((destination) => {
    const data = getData(destination);
    const destinationCategory = normalizeCategory(data.primary_category);

    // Primary category is authoritative.
    // Tags/destination_types can influence score later, but must not override category.
    if (activeCategory && destinationCategory !== activeCategory) {
      return false;
    }

    // Nearby means same broad region only.
    if (travelScope === "nearby") {
      return getDestinationRegion(data.country) === originRegion;
    }

    return true;
  });
console.log("Filtered destinations:", finalDestinations.length);

console.table(
  finalDestinations.map((d) => {
    const data = getData(d);
    return {
      city: data.city,
      country: data.country,
      category: data.primary_category,
    };
  })
);
  if (finalDestinations.length === 0) {
    return [];
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

const getCityPower = (data) => {
  if (normalizeCategory(data.primary_category) !== "city") return 0;

  return (
    data.destination_significance?.global_iconicity ??
    4
  );
};

  const results = finalDestinations.map((destination) => {
    const data = getData(destination);
    const destinationCategory = normalizeCategory(data.primary_category);

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
    const accessibility = data.travel_accessibility || {};

    let score = 0;
const categoryBonus =
  activeCategory && destinationCategory === activeCategory ? 120 : 0;

const cityPowerBonus =
  activeCategory === "city"
    ? getCityPower(data) * safe(userScores.city) * 0.35
    : 0;

   const debug = {};
// Season suitability
if (selectedSeason !== "flexible") {
  const seasonalIntensity =
    data.seasonal_intensity?.[selectedSeason];

  if (typeof seasonalIntensity === "number") {
    // 1.0 is neutral.
    // 1.5 gives +30 points.
    // 0.7 gives -18 points.
    score += (seasonalIntensity - 1) * 120;
  }

  const seasonalShift =
    data.seasonal_profiles?.[selectedSeason]?.emotional_shift || {};

  Object.entries(seasonalShift).forEach(([key, value]) => {
    if (typeof value !== "number") return;

    const userValue = safe(userScores[key]);

    if (userValue > 0) {
      score += userValue * value * 2;
    }
  });
}
    // Strong category fit.
    if (activeCategory && destinationCategory === activeCategory) {
      score += 120;
    }

    // City scale/importance boost only when user wants cities.
    if (activeCategory === "city") {
      score += getCityPower(data) * safe(userScores.city) * 0.35;
    }

    // Intent keyword scoring.
    // Do not let generic "adventure/exploration" tags boost cities when unique_experience is selected.
    intentKeys.forEach((intent) => {
      const userValue = safe(userScores[intent]);
      if (userValue <= 0) return;

      if (
        intent === "adventure" &&
        activeCategory === "unique_experience" &&
        destinationCategory !== "unique_experience"
      ) {
        return;
      }

      if (hasKeyword(typeMap[intent])) {
        score += userValue * 15;
      }
    });

let emotionalScore = 0;
let emotionalMatches = 0;

emotionalKeys.forEach((key) => {
  const userValue = safe(userScores[key]);

  let destinationValue = safe(profile[key]);

  // If calmness isn't defined, infer it from energy.
  if (key === "calmness" && destinationValue === 0) {
    destinationValue = Math.max(0, 10 - safe(profile.energy));
  }

  if (userValue <= 0 || destinationValue <= 0) return;

  const difference = Math.abs(userValue - destinationValue);

  // 1 = perfect match, 0 = complete mismatch
  const similarity = Math.max(0, 1 - difference / 10);

  emotionalScore +=
    userValue *
    destinationValue *
    similarity;

  emotionalMatches++;
});

if (emotionalMatches > 0) {
  score += (emotionalScore / emotionalMatches) * 0.75;
}

    // Contextual attributes should support the match, not dominate it.
    score +=
      safe(contextual.nature_access) *
      safe(userScores.nature_connection) *
      0.6;

    score += safe(contextual.walkability) * safe(userScores.city) * 0.25;
    score +=
      safe(contextual.nightlife) *
      safe(userScores.social_openness) *
      0.2;

    score +=
      safe(contextual.public_transport) *
      safe(userScores.city) *
      0.2;

    if (safe(userScores.culture) >= 3 && hasKeyword(typeMap.culture)) {
      score += 45;
    }

    if (activeCategory === "unique_experience") {
      score += 75;

      if (hasKeyword(typeMap.adventure) || hasKeyword(typeMap.nature)) {
        score += 35;
      }
    } else if (
      safe(userScores.adventure) >= 3 &&
      destinationCategory === "unique_experience"
    ) {
      score += 55;
    }

    if (safe(userScores.romantic) >= 3 && hasKeyword(typeMap.romantic)) {
      score += 45;
    }

    if (safe(userScores.slow_travel) >= 3 && hasKeyword(typeMap.slow_travel)) {
      score += 45;
    }

    const richness =
  (data.destination_types?.length || 0) +
  (data.tags?.length || 0) +
  (data.archetypes?.length || 0) +
  (data.experience_styles?.length || 0);

score += Math.min(richness, 10);

const destinationRegion = getDestinationRegion(data.country);
const originAffinity =
  accessibility.origin_affinity?.[originRegion] ?? 3;

if (travelScope === "anywhere") {
  score -= originAffinity * 8;
}

if (destinationRegion === originRegion) {
  score += 5;
}

// ----------------------------
// CALM TRAVEL PENALTY
// ----------------------------
const calmPreference = safe(userScores.calmness);

if (calmPreference > 0) {
  score -=
    Math.max(0, safe(profile.energy) - 5) *
    calmPreference *
    0.8;

  score -=
    Math.max(0, safe(contextual.nightlife) - 5) *
    calmPreference *
    0.6;

  score -=
    Math.max(0, safe(contextual.urban_intensity) - 5) *
    calmPreference *
    0.6;
}

return {
  destination,
  score,
};
});

const sorted = results.sort((a, b) => b.score - a.score);

console.table(
  sorted.slice(0, 15).map((r) => ({
    city: getData(r.destination).city,
    country: getData(r.destination).country,
    score: r.score,
  }))
);


  if (sorted.length === 0) return [];

  const seen = new Set();
  const uniqueSorted = sorted.filter((item) => {
    const data = getData(item.destination);
    const key = data.id || `${data.city}-${data.country}`;

    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });

const topTen = uniqueSorted.slice(0, 10);

  const getCountry = (item) =>
    normalize(getData(item.destination).country);

  if (topTen.length >= 4) {
    // #1 and #2 are from the same country.
    if (getCountry(topTen[0]) === getCountry(topTen[1])) {
      const duplicate = topTen.splice(1, 1)[0];
      topTen.splice(3, 0, duplicate);
    }

    // Recheck the modified array: #2 and #3.
    if (getCountry(topTen[1]) === getCountry(topTen[2])) {
      const duplicate = topTen.splice(2, 1)[0];
      topTen.splice(3, 0, duplicate);
    }

    // Recheck the modified array: #1 and #3.
    if (getCountry(topTen[0]) === getCountry(topTen[2])) {
      const duplicate = topTen.splice(2, 1)[0];
      topTen.splice(3, 0, duplicate);
    }
  }

  if (topTen.length === 0) return [];

  const maxScore = topTen[0].score;
  const minScore = topTen[topTen.length - 1].score;
  const spread = maxScore - minScore;

  const maxPercent = spread < 25 ? 94 : spread < 50 ? 96 : 97;
  const minPercent = spread < 25 ? 82 : spread < 50 ? 78 : 75;

  const finalResults = topTen.map((result, index) => {
const normalized =
  (result.score - minScore) / (maxScore - minScore || 1);

const percentage = Math.round(
  minPercent +
  Math.pow(normalized, 0.75) *
  (maxPercent - minPercent)
);


    return {
      ...result,
      percentage: Math.max(minPercent, Math.min(97, percentage)),
    };
  });

  // The destination moved to position 4 must not display a
  // higher percentage than the destination in position 3.
  if (
    finalResults.length >= 4 &&
    finalResults[3].percentage >= finalResults[2].percentage
  ) {
    finalResults[3].percentage =
      finalResults[2].percentage - 1;
  }

  return finalResults;
}
