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

export default function ChallengesApplyPage() {
  const titleObject = useTitle();
  const urlObject = useUrl();
  const maximumObject = useMaximum();
  const dueDateObject = useDueDate();
  const descriptionObject = useDescription();

  return (
    <div className={styles.background}>
      <div className={styles.main}>
        <div>신규 챌린지 신청</div>
        <CustomInput object={titleObject} />
        <CustomInput object={urlObject} />
        <Category />
        <DropOption />
        <CustomInput object={dueDateObject} />
        <CustomInput object={maximumObject} />
        <CustomInput object={descriptionObject} />
        <CustomBtnLong text="신청하기" />
      </div>
    </div>
  );
}
