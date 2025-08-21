const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export const getChallengeView = async (challengeId) => {
  try {
    const res = await fetch(`${API_URL}/challenge/${challengeId}`);
    return await res.json();
  } catch (e) {
    console.error(e);
  }
};

export const createChallengeStatus = async (
  challengeId,
  state,
  reason = null
) => {
  const body = state === "REJECTED" ? { state, reason } : { state };

  try {
    const response = await fetch(`${API_URL}/challenge/${challengeId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "새로운 상태 요청에 실패했습니다.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API 요청 오류:", error);
    throw error;
  }
};
