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

  const postNewChallenge = () => {
    console.log("post 버튼 클릭됨");
  };

  useEffect(
    () => {
      if (objectList.every((obj) => obj.checkValid())) {
        setIsValid(true);
      }
    },
    objectList.map((obj) => obj.element)
  );

  return (
    <div className={styles.background}>
      <div className={styles.main}>
        <div>신규 챌린지 신청</div>
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
