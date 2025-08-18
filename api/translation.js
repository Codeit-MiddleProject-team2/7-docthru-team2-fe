import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export const getAllTranslations = async (challengeId, page = 1) => {
  try {
    const res = await axios.get(`${API_URL}/translation/temporary`, {
      params: { challengeId, page },
    });
    return res.data;
  } catch (e) {
    console.error(e);
  }
};
