const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getMyChallengesApply = async ({
  status,
  keyword,
  page,
  limit,
}) => {
  try {
    const response = await fetch(`${API_URL}/mychallenge/apply`);
    if (!response.ok) {
      throw new Error("Failed to fetch myChallenges");
    }
    return await response.json();
  } catch (error) {
    console.error("getMyChallengesApply 에러:", error);
    return [];
  }
};
