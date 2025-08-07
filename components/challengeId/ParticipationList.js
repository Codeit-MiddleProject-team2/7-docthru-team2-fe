import Image from "next/image";
import { useRouter } from "next/router";

function ParticipationListItem({ participation, rank }) {
  const router = useRouter();
  return (
    <div>
      <div>순위: {rank} </div>
      <div>
        <Image
          src={participation.user.img}
          width={24}
          height={24}
          alt="유저 이미지"
        />
        <div>
          <div>{participation.user.nickname} </div>
          <div>{participation.user.userLevel} </div>
        </div>
      </div>
      <div>{participation._count.hearts}</div>
      <div
        onClick={() => {
          router.push(`/translation/${participation.id}`);
        }}
      >
        작업물 보기
      </div>
    </div>
  );
}

// 순위는 이후 백엔드까지 api를 작성해야 완성 가능
// 우선 생각해둔 바는 백엔드에서 5개씩 끊어서 좋아요가 많은 순서로 정렬하여 전달해 준다.
// 그러면 프론트에서는 (현재 페이지 - 1) * 5 + 현재 순서(1~5 사이)로 rank값을 계산
// 당장은 임시로 id를 표기 중. 이후 수정 예정.

export default function ParticipationList({ data }) {
  return data.map((participation) => {
    return (
      <ParticipationListItem
        key={`${participation.id}participation`}
        participation={participation}
        rank={participation.id}
      />
    );
  });
}
