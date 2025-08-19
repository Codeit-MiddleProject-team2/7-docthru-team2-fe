// basic을 일반으로 pro를 전문가로 변환

export function userLevelKor(text) {
  switch (text) {
    case "basic":
      return "일반";

    case "pro":
      return "전문가";

    default:
      console.log("유저 레벨을 확인하세요. 혹은 어드민 유저입니다.");
      return "관리자";
  }
}
