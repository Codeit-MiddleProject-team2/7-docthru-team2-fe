export function formatDate(dateString) {
  if (!dateString) return "";
  const d = new Date(dateString);
  // 이거 미국시간으로 표시됨 확인 필요
  let datePart = new Intl.DateTimeFormat("ko-KR", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    // timeZone: "Asia/Seoul",
  })
    .format(d)
    .replace(/\./g, "/")
    .replace(/ /g, "");

  if (datePart.endsWith("/")) {
    datePart = datePart.slice(0, -1);
  }

  const hour = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${datePart} ${hour}:${min}`;
}

export function formatDateDeadline(dateString) {
  if (!dateString) return "";
  const d = new Date(dateString);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 마감`;
}
