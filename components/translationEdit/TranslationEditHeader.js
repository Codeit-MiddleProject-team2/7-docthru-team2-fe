import Image from "next/image";
import styles from "./TranslationEditHeader.module.css";
import { useRouter } from "next/navigation";

function TranslationEditHeader({ onSaveOrSubmit, onGiveUp, submitText }) {
  const router = useRouter();
  return (
    <div className={styles.header}>
      <div className={styles.navbar}>
        <div
          className={styles.logo}
          onClick={() => {
            router.push("/challenges");
          }}
        >
          <Image
            src={"/icons/docthru.svg"}
            width={17.55}
            height={20.25}
            alt="독스루 아이콘"
          />
          <div className={styles.title}>Docthru</div>
        </div>
        <div className={styles.utils}>
          <button type="button" className={styles.btnCancel} onClick={onGiveUp}>
            포기
            <Image
              src={"/icons/ic_cancel.svg"}
              width={24}
              height={24}
              alt="아이콘"
            />
          </button>
          <button
            type="button"
            className={styles.btnStorage}
            onClick={() => onSaveOrSubmit(false)}
          >
            임시저장
          </button>
          <button
            type="button"
            className={styles.btnSubmit}
            onClick={() => onSaveOrSubmit(true)}
          >
            {submitText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TranslationEditHeader;
