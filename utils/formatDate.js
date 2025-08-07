export function formatDate(dateString) {
  if (!dateString) return "";
  const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!match) return dateString;
  const [, year, month, day, hour, min] = match;
  return `${year.slice(2)}/${month}/${day} ${hour}:${min}`;
}

export function formatDateDeadline(dateString) {
  if (!dateString) return "";
  const d = new Date(dateString);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 마감`;
}
