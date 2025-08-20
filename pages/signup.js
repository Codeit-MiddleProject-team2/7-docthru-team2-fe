import { useState, useEffect } from "react";
import styles from "@/styles/signup.module.css";
import Image from "next/image";
import CustomInput from "@/components/login/CustomInput";

import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import useAuth, { userLogin } from "@/lib/useAuth";
import {
  useEmail,
  useNickname,
  usePassword,
  usePasswordConfirmation,
} from "@/lib/useEmailPassword";
import CustomBtnLong from "@/components/CustomBtnLong";
import BigLogo from "@/components/login/BigLogo";
import { postSignup } from "@/api/login";

function SignupPage() {
  const emailObject = useEmail();
  const passwordObject = usePassword();
  const nicknameObject = useNickname();
  const passwordConfirmationObject = usePasswordConfirmation();

  const router = useRouter();

  // 회원가입 함수
  const onSignup = async () => {
    const data = await postSignup({
      email: emailObject.element,
      password: passwordObject.element,
      nickname: nicknameObject.element,
      userLevel: "basic",
    });
    userLogin(data);
    router.push("/challenges");
  };

  return (
    <div className={styles.signup}>
      <div className={styles.main}>
        <BigLogo />
        <div className={styles.content}>
          <CustomInput object={emailObject} />
          <CustomInput object={nicknameObject} />
          <CustomInput object={passwordObject} />
          <CustomInput
            object={passwordConfirmationObject}
            password={passwordObject.element}
          />
          <CustomBtnLong
            text="회원가입"
            onClick={onSignup}
            valid={
              emailObject.checkValid() &&
              nicknameObject.checkValid() &&
              passwordObject.checkValid() &&
              passwordConfirmationObject.checkValid(passwordObject.element)
            }
          />
          <div className={styles.toLogin}>
            회원이신가요?
            <Link href="/login" className={styles.link}>
              <span>로그인하기</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

SignupPage.useLayout = false;

export default SignupPage;
