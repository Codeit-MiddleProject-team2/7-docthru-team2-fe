export const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    // 토큰이 없으면 로그인 페이지로 리디렉션
    window.location.href = "/login";
    return {};
  }
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};
