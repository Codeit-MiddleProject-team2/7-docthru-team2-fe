import Image from "next/image";
import styles from "./header.module.css";
import { useRouter } from 'next/navigation'; 

function Header() {
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
      </div>
    </div>
  );
}

export default Header
