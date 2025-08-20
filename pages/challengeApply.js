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
      type: "official",
      userId: user.id,
    });
    if (result) {
      router.push(`/challenges/${result.id}`);
    }
  };

  useEffect(
    () => {
      const { user, accessToken } = userSetting();

      if (!accessToken) {
        router.push("/");
      }

      setUser(user);
      setAccess(accessToken);
      if (objectList.every((obj) => obj.checkValid())) {
        setIsValid(true);
      }
      console.log(category);
    },
    objectList.map((obj) => obj.element)
  );

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
