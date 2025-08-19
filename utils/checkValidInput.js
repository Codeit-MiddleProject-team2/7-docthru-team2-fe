// 유효한 값이 입력되었는지 검사하는 함수
// 일단은 "postArticle" 페이지에서 "제목"과 "내용"이 정상적으로 입력되었는지 확인 => 빈칸인지, 아닌지
// 유효한 값이면(빈칸이 아니다. 이메일 형식이 올바르다. 등등) true 반환, 아니라면 false 반환

export default function checkValidInput(value, type = "blank") {
  switch (type) {
    case "blank":
      return !checkBlank(value);
      break;
    case "email":
      return checkEmail(value);
      break;
    case "password":
      return checkLength(value);
      break;
    default:
      break;
  }
}

// 빈칸인지 체크 (빈칸이면 true)
export function checkBlank(value) {
  return value.trim() === "";
}

//맞는 이메일 형식인지 체크 (제대로 된 형식이면 true)
export function checkEmail(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value.trim());
}

// n글자 이상인지 확인 (n글자 이상이면 true. n은 기본값 6.)
export function checkLength(value, n = 6) {
  return value.trim().length >= n;
}

//두 값이 일치하는지 확인 (일치하면 true)
export function checkMismatch(value, standard) {
  return value === standard;
}

// 숫자만 입력된 건지 확인. 문자가 없는가? 그리고 정수인가? 1 이상인가?
export function checkNumber(value) {
  return Number(value) > 0 && Number.isInteger(Number(value));
}

// 유효한 날짜인지 확인 (게시물을 작성하는 시점보다 미래의 날짜를 선택했는지 확인)
export function checkDate(value) {
  const selectedDate = new Date(value);
  const now = new Date();

  return now < selectedDate;
}
