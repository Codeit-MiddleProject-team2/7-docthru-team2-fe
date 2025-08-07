import Image from "next/image";
import styles from "./Navbar.module.css";
import { useRouter } from "next/router";
import { userLogin, userLogout, userSetting } from "@/lib/useAuth";
import { useState, useEffect } from "react";
import CustomBtnMini from "./CustomBtnMini";

// 임의의 로그인, 로그아웃 버튼 navbar에 추가
// 로그인 버튼을 클릭하면 다음과 같은 유저로 로그인 한 것과 같은 기능을 한다
// id: test123, nickname: yewon, userLevel: "일반", isAdmin: false

const exampleUser = {
  user: { id: "test123", nickname: "yewon", userLevel: "일반", isAdmin: false },
};

export default function Navbar() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});

  // 로그인 된 상태라면,
  useEffect(() => {
    try {
      const { user: userData } = userSetting();
      if (userData) {
        setIsLogin(true);
        setUser(userData);
      }
    } catch (e) {}
  }, []);

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
        {!isLogin && (
          <CustomBtnMini
            text={"로그인"}
            onClick={() => {
              userLogin(exampleUser);
              setIsLogin(true);
              router.push("/challenges");
            }}
          />
        )}
        {isLogin && (
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
            <CustomBtnMini
              text="로그아웃"
              onClick={() => {
                userLogout();
                setIsLogin(false);
                router.push("/");
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
