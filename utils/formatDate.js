//UTC -> KST 변환 완료
export function formatDate(dateString) {
  if (!dateString) return "";
  const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!match) return dateString;
  let [, year, month, day, hour, min] = match;
  hour = String((parseInt(hour, 10) + 9) % 24).padStart(2, "0");
  return `${year.slice(2)}/${month}/${day} ${hour}:${min}`;
}

export function formatDateDeadline(dateString) {
  if (!dateString) return "";
  const d = new Date(dateString);
  const kstDate = new Date(d.getTime() + 9 * 60 * 60 * 1000);
  return `${kstDate.getFullYear()}년 ${kstDate.getMonth() + 1}월 ${kstDate.getDate()}일 마감`;
}
