import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

const authHeaders = () => {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * 목록: GET {API_URL}/feedback?translationId=&offset=&limit=
 */
export const listFeedbacks = async (translationId, offset = 0, limit = 3) => {
  const res = await axios.get(`${API_URL}/feedback`, {
    params: { translationId, offset, limit },
  });
  return res.data; // { items, total, hasMore, nextOffset }
};

/**
 * 생성: POST {API_URL}/feedback
 * body: { data: { translationId, userId, content } }
 */
export const createFeedback = async ({ translationId, userId, content }) => {
  const res = await axios.post(
    `${API_URL}/feedback`,
    { data: { translationId, userId, content } },
    { headers: { "Content-Type": "application/json", ...authHeaders() } }
  );
  return res.data;
};

/**
 * 수정: PATCH {API_URL}/feedback/:id
 */
export const updateFeedback = async (id, content) => {
  const res = await axios.patch(
    `${API_URL}/feedback/${id}`,
    { content },
    { headers: { "Content-Type": "application/json", ...authHeaders() } }
  );
  return res.data;
};

/**
 * 삭제: DELETE {API_URL}/feedback/:id  (관리자는 reason 필요)
 */
export const deleteFeedback = async (id, reason = "") => {
  const res = await axios.delete(`${API_URL}/feedback/${id}`, {
    data: { reason },
    headers: { "Content-Type": "application/json", ...authHeaders() },
  });
  return res.data;
};
