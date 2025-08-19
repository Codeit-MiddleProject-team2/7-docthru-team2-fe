import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

// 로그인
export const postLogin = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/user`, {
      email: email,
      password: password,
    });
    return res.data;
  } catch (e) {
    console.error(e);
    if (e.status === 500) {
      alert("입력된 정보와 일치하는 사용자가 존재하지 않습니다.");
    }
  }
};

// 회원가입
export const postSignup = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/user/signup`, {
      data,
    });
    return res.data;
  } catch (e) {
    console.error(e);
    if (e.status === 500) {
      alert("이미 존재하는 이메일입니다.");
    }
  }
};
