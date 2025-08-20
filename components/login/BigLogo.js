import { useRouter } from "next/router";
import styles from "./BigLogo.module.css";
import Image from "next/image";

export default function BigLogo() {
  const router = useRouter();

  return (
    <div
      className={styles.title}
      onClick={() => {
        router.push("/");
      }}
    >
      <Image
        src={"/icons/docthru.svg"}
        width={46.8}
        height={54}
        alt="메인 로고"
        priority={true}
      />
      <h1 className={styles.titleText}>Docthru</h1>
    </div>
  );
}
