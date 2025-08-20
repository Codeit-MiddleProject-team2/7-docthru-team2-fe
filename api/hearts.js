import { api } from "./client";

/** 초기 상태 조회 */
export async function getHeartCount(translationId) {
  const res = await api.get("/hearts/count", { params: { translationId } });
  return Number(res?.data?.count ?? 0);
}

export async function getMyHeartStatus(translationId, userId) {
  const res = await api.get("/hearts/status", {
    params: { translationId, userId },
  });
  return !!res?.data?.liked;
}

/** 좋아요 추가(POST /hearts) */
export async function addHeart(translationId, userId) {
  const res = await api.post("/hearts", { translationId, userId });
  // 백엔드가 주는 키 그대로 사용 (liked, count)
  return {
    liked: !!res?.data?.liked,
    count: Number(res?.data?.count ?? 0),
  };
}

/** 좋아요 취소(DELETE /hearts + body) */
export async function removeHeart(translationId, userId) {
  const res = await api.delete("/hearts", { data: { translationId, userId } });
  return {
    liked: !!res?.data?.liked,
    count: Number(res?.data?.count ?? 0),
  };
}
