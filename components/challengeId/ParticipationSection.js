import ParticipationList from "./ParticipationList";
import userImg from "@/public/icons/ic_profile.svg";
import styles from "./ParticipationSection.module.css";
import { useEffect, useState } from "react";
import { getAllTranslations } from "@/api/translation.js";
import { useRouter } from "next/router";

export default function ParticipationSection({ challengeId }) {
  const [translations, setTranslations] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getAllTranslations(challengeId);
        setTranslations(res);
      } catch (e) {
        console.error(e);
      }
    };

    getData();
  }, []);

  return (
    <div className={styles.box}>
      <div className={styles.current}>참여 현황</div>
      <ParticipationList data={translations} />
    </div>
  );
}
