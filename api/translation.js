import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

// 인증 헤더를 반환하는 헬퍼 함수
const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// 특정 챌린지의 모든 작업물 가져오기
export const getAllTranslations = async (challengeId, page = 1) => {
  try {
    const res = await axios.get(`${API_URL}/translation/temporary`, {
      params: { challengeId, page },
    });
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

/**
 * 상세: GET {API_URL}/translation/:id
 */
export const getTranslationDetail = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/translation/${id}`);
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// 특정 챌린지의 최다 추천작 가져오기
export const getBestTranslations = async (challengeId) => {
  try {
    const res = await axios.get(`${API_URL}/translation/best`, {
      params: { challengeId },
    });
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const creatOrUpdateTranslation = async (data, id = null) => {
  let url;
  let method;

  if (id) {
    // ID가 있으면 수정 (PUT)
    url = `${API_URL}/translation/${id}`;
    method = "PUT";
  } else {
    // ID가 없으면 생성 (POST)
    url = `${API_URL}/translation`;
    method = "POST";
  }

  try {
    const response = await fetch(url, {
      method,
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      const action = id ? "수정" : "생성";
      throw new Error(errorText || `번역물 ${action}에 실패했습니다.`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API 호출 오류:`, error);
    throw error;
  }
};
export const getTranslationByChallengeId = async (challengeId) => {
  try {
    const response = await fetch(`${API_URL}/translation/${challengeId}/edit`, {
      method: "GET",
      // ⭐️ 인증 헤더 추가
      headers: getAuthHeaders(),
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "번역물 조회에 실패했습니다.");
    }

    return await response.json();
  } catch (error) {
    console.error("API 호출 오류:", error);
    throw error;
  }
};
