const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export const getChallengeView = async (challengeId) => {
  try {
    const res = await fetch(`${API_URL}/challenge/${challengeId}/view`);
    return await res.json();
  } catch (e) {
    console.error(e);
  }
};
