import { postChallenge } from "@/api/challenges";
import Category from "@/components/challengeApply/category";
import DropOption from "@/components/challengeApply/dropOption";
import CustomBtnLong from "@/components/CustomBtnLong";
import CustomInput from "@/components/login/CustomInput";
import {
  useDescription,
  useDueDate,
  useMaximum,
  useTitle,
  useUrl,
} from "@/lib/useNewChallengeInput";
import styles from "@/styles/challengeApply.module.css";
import { useEffect, useState } from "react";
import { userSetting } from "@/lib/useAuth";
import { useRouter } from "next/router";
import { formatDoctype } from "@/utils/formatDoctype";
import { formatDate } from "@/utils/formatDate";

export default function ChallengesApplyPage() {
  const titleObject = useTitle();
  const urlObject = useUrl();
  const [type, setType] = useState("카테고리");
  const [category, setCategory] = useState("");
  const maximumObject = useMaximum();
  const dueDateObject = useDueDate();
  const descriptionObject = useDescription();
  const objectList = [
    titleObject,
    urlObject,
    maximumObject,
    dueDateObject,
    descriptionObject,
  ];
  const [isValid, setIsValid] = useState(false);
  const [user, setUser] = useState([]);
  const [access, setAccess] = useState("");
  const router = useRouter();

  const postNewChallenge = async () => {
    const result = await postChallenge({
      title: titleObject.element,
      url: urlObject.element,
      maximum: maximumObject.element,
      dueDate: dueDateObject.element + `T23:59:59.000Z`,
      description: descriptionObject.element,
      category,
      type: formatDoctype(type),
      userId: user.id,
    });
    if (result) {
      router.push(`/challenges/${result.id}`);
    }
  };

  useEffect(() => {
    // 액세스토큰 검사
    const { user, accessToken } = userSetting();

    if (!accessToken) {
      router.push("/");
    }

    setUser(user);
    setAccess(accessToken);

    // 수정하기를 통해서 들어온 경우, 초기값 세팅
    const origin = JSON.parse(window.sessionStorage.getItem("challenge"));
    if (origin) {
      titleObject.setElement(origin.title);
      urlObject.setElement(origin.url);
      setCategory(origin.category);
      setType(formatDoctype(origin.type));
      dueDateObject.setElement(origin.dueDate.split("T")[0]);
      maximumObject.setElement(origin.maximum);
      descriptionObject.setElement(origin.description);
    }

    if (
      objectList.every((obj) => obj.checkValid()) &&
      formatDoctype(type) &&
      Boolean(category)
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [...objectList.map((obj) => obj.element), type, category]);

  return (
    <div className={styles.background}>
      <div className={styles.main}>
        <div className={styles.title}>신규 챌린지 신청</div>
        <CustomInput object={titleObject} />
        <CustomInput object={urlObject} />
        <Category category={category} setCategory={setCategory} />
        <DropOption value={type} setValue={setType} />
        <CustomInput object={dueDateObject} />
        <CustomInput object={maximumObject} />
        <CustomInput object={descriptionObject} />
        <CustomBtnLong
          text="신청하기"
          onClick={postNewChallenge}
          valid={isValid}
        />
      </div>
    </div>
  );
}
