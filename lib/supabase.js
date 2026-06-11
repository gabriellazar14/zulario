import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default supabase;

/* =========================
   DESTINATIONS
========================= */

export async function getDestinations() {
  const { data, error } = await supabase
    .from("destinations")
    .select("*");

  if (error) {
    console.error("Supabase error:", error);
    return [];
  }

  console.log("SUPABASE DATA:", data);

  return data;
}

/* =========================
   GROUP QUIZ
========================= */

// CREATE GROUP
export async function createQuizGroup() {
  const { data, error } = await supabase
    .from("quiz_groups")
    .insert({})
    .select()
    .single();

  if (error) {
    console.error("Create group error:", error);
    return null;
  }

  return data;
}

// SAVE USER RESPONSE
export async function saveGroupResponse(
  groupId,
  name,
  scores,
  matches
) {
  const { data, error } = await supabase
    .from("quiz_group_responses")
    .insert({
      group_id: groupId,
      name,
      scores,
      matches,
    })
    .select()
    .single();

  if (error) {
    console.error("Save response error:", error);
    return null;
  }

  return data;
}

// GET ALL GROUP RESPONSES
export async function getGroupResponses(groupId) {
  const { data, error } = await supabase
    .from("quiz_group_responses")
    .select("*")
    .eq("group_id", groupId);

  if (error) {
    console.error(
  "Get responses error:",
  JSON.stringify(error, null, 2)
);
    return [];
  }

  return data;
}
export async function saveSharedResult(results) {
  const { data, error } = await supabase
    .from("shared_results")
    .insert({
      results,
    })
    .select()
    .single();

  if (error) {
    console.error("Save shared result error:", error.message, error.details);
    return null;
  }

  return data;
}
export async function saveUserResult(email, results) {
  const { data, error } = await supabase
    .from("saved_results")
    .insert({
      email,
      results,
    })
    .select()
    .single();

  if (error) {
    console.error("Save user result error:", error);
    return null;
  }

  return data;
}
export async function saveResultFeedback(
  rating,
  comment,
  results,
  page = "quiz"
) {
  const { error } = await supabase
    .from("result_feedback")
    .insert({
      rating,
      comment,
      results,
      page,
    });

  if (error) {
    console.error("Save feedback error:", error);
    return false;
  }

  return true;
}
export async function getSharedResult(id) {
  const { data, error } = await supabase
    .from("shared_results")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Get shared result error:", error);
    return null;
  }

  return data;
}