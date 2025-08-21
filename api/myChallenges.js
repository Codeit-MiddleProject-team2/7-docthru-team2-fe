import axios from "axios";
import { getAuthHeaders } from "../utils/authHeaders";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export const getMyChallengesApply = async ({
  status,
  keyword,
  page,
  limit,
  orderBy = "latest",
  isAdmin = false,
}) => {
  const endpoint = isAdmin
    ? "/mychallenge/applyWidthAdmin"
    : "/mychallenge/apply";
  const query = new URLSearchParams({
    ...(status && { status }),
    ...(keyword && { keyword }),
    ...(page && { page }),
    ...(limit && { limit }),
    ...(orderBy && { orderBy }),
  });
  try {
    const response = await fetch(`${API_URL}${endpoint}?${query}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      console.error(
        `Error: HTTP Status ${response.status} - ${response.statusText}`
      );
      throw new Error("Failed to fetch myChallenges");
    }
    return await response.json();
  } catch (error) {
    console.error("getMyChallengesApply 에러:", error);
    return { page: 1, limit: 10, total: 0, challenges: [] };
  }
};

export async function getMyChallenges(params, token) {
  const res = await axios.get(`http://localhost:5000/myChallenge`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });

  return res;
}
