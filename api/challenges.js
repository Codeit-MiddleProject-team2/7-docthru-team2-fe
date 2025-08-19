import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export async function getChallenges(params = {}) {
  const url = new URL("/challenge", API_URL);
  Object.entries(params).forEach(([k, v]) => {
    if (Array.isArray(v)) v.forEach((vv) => url.searchParams.append(k, vv));
    else if (v !== undefined && v !== null && v !== "")
      url.searchParams.set(k, v);
  });

  const res = await fetch(url.toString(), {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`GET ${url.pathname} ${res.status}`);
  const data = await res.json();
  return data?.data ?? data; // 컨트롤러가 { data: ... }로 감싸는 경우
}

export async function getCategorys(keyword) {
  const res = await axios.get(`${API_URL}/challenge/categorys`, {
    params: { keyword },
  });

  return res.data;
}
