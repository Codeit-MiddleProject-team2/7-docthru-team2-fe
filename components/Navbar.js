import Image from "next/image";
import styles from "./Navbar.module.css";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  return (
    <div className={styles.background}>
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
        <div className={styles.user}>
          <Image
            src={"/icons/ic_bell.svg"}
            width={24}
            height={24}
            alt="알림 아이콘"
          />
          <Image
            src={"/icons/ic_profile.svg"}
            width={32}
            height={32}
            alt="프로필 아이콘"
          />
        </div>
      </div>
    </div>
  );
}
