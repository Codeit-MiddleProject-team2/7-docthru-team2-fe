export function formatDoctype(type) {
  switch (type) {
    case "공식 문서":
      return "official";
    case "블로그":
      return "article";
    case "기타":
      return "others";
    case "official":
      return "공식 문서";
    case "article":
      return "블로그";
    case "others":
      return "기타";
    default:
      console.log("문서 타입을 확인해주세요");
      return false;
  }
}
