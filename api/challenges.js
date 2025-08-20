import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export async function getChallenges(params) {
  const res = await axios.get(`http://localhost:5000/challenge`, {
    params,
  });

  return res;
}

export async function getCategorys(keyword) {
  const res = await axios.get(`${API_URL}/challenge/categorys`, {
    params: { keyword },
  });

  return res.data;
}

export async function postChallenge(data) {
  const res = await axios.post(`${API_URL}/challenge`, { data });

  return res.data;
}
