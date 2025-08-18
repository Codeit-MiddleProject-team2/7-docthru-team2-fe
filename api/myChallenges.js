const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export const getMyChallengesApply = async ({
  status,
  keyword,
  page,
  limit,
}) => {
  const query = new URLSearchParams({
    ...(status && { status }),
    ...(keyword && { keyword }),
    ...(page && { page }),
    ...(limit && { limit }),
  });
  try {
    console.log(`Final API URL: ${API_URL}/mychallenge/apply?${query}`);
    const response = await fetch(`${API_URL}/mychallenge/apply?${query}`);
    if (!response.ok) {
      throw new Error("Failed to fetch myChallenges");
    }
    return await response.json();
  } catch (error) {
    console.error("getMyChallengesApply 에러:", error);
    return { page: 1, limit: 10, total: 0, challenges: [] };
  }
};
