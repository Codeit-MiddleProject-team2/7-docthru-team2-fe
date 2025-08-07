// 유저 인증, 인가용 커스텀 훅

// 임의의 로그인, 로그아웃 버튼 navbar에 추가
// 로그인 버튼을 클릭하면 다음과 같은 유저로 로그인 한 것과 같은 기능을 한다. 액세스 토큰과 리프레쉬 토큰은 (지금은) 없음.
// id: test123, nickname: yewon, userLevel: "일반", isAdmin: false

// 로컬스토리지에 유저 데이터, 토큰 저장하는 함수
export function userLogin(data) {
  console.log(data);
  console.log("실행됨");
  window.localStorage.setItem("accessToken", data.accessToken);
  window.localStorage.setItem("refreshToken", data.refreshToken);
  window.localStorage.setItem("user", JSON.stringify(data.user));
}

// 로컬스토리지의 유저 데이터, 토큰 삭제하는 함수
export function userLogout() {
  window.localStorage.removeItem("accessToken");
  window.localStorage.removeItem("refreshToken");
  window.localStorage.removeItem("user");
}

// 로컬스토리지에 있는 유저 데이터, 토큰을 가져오는 함수
export function userSetting() {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const accessToken = window.localStorage.getItem("accessToken");

  return { user, accessToken };
}
