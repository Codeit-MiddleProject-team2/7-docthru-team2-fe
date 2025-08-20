import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./myChallengeTabs.module.css";

const tabs = [
  { href: "/myChallenges", label: "참여중인 챌린지" },
  { href: "/myChallenges/completed", label: "완료한 챌린지" },
  { href: "/myChallenges/apply", label: "개설한 챌린지" },
];

export default function MyChallengeTabs() {
  const router = useRouter();

  return (
    <ul className={styles.tabMenuEl}>
      {tabs.map((tab) => (
        <li
          key={tab.href}
          className={router.pathname === tab.href ? styles.active : ""}
        >
          <Link href={tab.href}>{tab.label}</Link>
        </li>
      ))}
    </ul>
  );
}
