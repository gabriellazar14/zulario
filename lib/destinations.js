export function matchDestination(userScores, destinations) {
  let best = null;
  let bestScore = -Infinity;

  destinations.forEach((d) => {
    const s = d.scores || {};
    let score = 0;

    for (const key in userScores) {
      score += (userScores[key] || 0) * (s[key] || 0);
    }

    if (score > bestScore) {
      bestScore = score;
      best = d;
    }
  });

  return best;
}