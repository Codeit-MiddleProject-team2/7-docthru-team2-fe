import Image from "next/image";
import styles from "@/styles/login.module.css";
import CustomInput from "@/components/login/CustomInput";
import { useEffect, useState } from "react";
import CustomBtnLong from "@/components/CustomBtnLong";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import useAuth from "@/lib/useAuth";
import { useEmail, usePassword } from "@/lib/useEmailPassword";
import BigLogo from "@/components/login/BigLogo";

function LoginPage() {
  const emailObject = useEmail();
  const passwordObject = usePassword();
  // const { userLogin, userSetting } = useAuth();
  const router = useRouter();

  //로그인 post 함수

  const onLogin = async () => {
    alert("로그인 버튼 클릭됨");
  };

  return (
    <div className={styles.login}>
      <div className={styles.main}>
        <BigLogo />
        <div className={styles.content}>
          <CustomInput object={emailObject} />
          <CustomInput object={passwordObject} />
          <CustomBtnLong
            text="로그인"
            onClick={onLogin}
            valid={emailObject.checkValid() && passwordObject.checkValid()}
          />
          <div className={styles.toSignup}>
            회원이 아니신가요?
            <Link href="/signup" className={styles.link}>
              <span>회원가입 하기</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// LoginPage.useLayout = false;

export default LoginPage;
