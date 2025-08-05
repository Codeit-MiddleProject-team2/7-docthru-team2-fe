import { useState } from "react";
import {
  checkBlank,
  checkDate,
  checkLength,
  checkNumber,
} from "@/utils/checkValidInput";

// title, url, duedate, maximum 등을 모은 커스텀 훅
// 각각 useTitle() 등은 객체를 리턴한다
// 객체는 element(스테이터스), 스테이터스 설정 함수, 한국어 문자열, placeholderText, 유효성 검사 함수, 유효성 검사 문구, 감춤 여부로 구성된다

// 용도는 페이지에서 한꺼번에 입력되는 값들을 관리하고.. 암튼 input에 필요한 것 모아둠

export function useTitle() {
  const [title, setTitle] = useState("");

  return {
    element: title,
    setElement: setTitle,
    korText: "제목",
    placeholderText: "제목을 입력해주세요",
    checkValid: () => {
      return !checkBlank(title);
    },
    invalidText: "제목을 입력해주세요",
    secret: false,
  };
}

export function useUrl() {
  const [url, setUrl] = useState("");

  return {
    element: url,
    setElement: setUrl,
    korText: "원문 링크",
    placeholderText: "원문 링크를 입력해주세요",
    checkValid: () => {
      return !checkBlank(url);
    },
    invalidText: "원문 링크를 입력해주세요",
    secret: false,
  };
}

export function useDueDate() {
  const [dueDate, setDueDate] = useState("");

  return {
    element: dueDate,
    setElement: setDueDate,
    korText: "마감일",
    placeholderText: "YYYY/MM/DD",
    checkValid: () => {
      return checkDate(dueDate);
    },
    invalidText: "유효한 날짜를 입력해주세요",
    secret: false,
    type: "date",
  };
}

export function useMaximum() {
  const [maximum, setMaximum] = useState("");

  return {
    element: maximum,
    setElement: setMaximum,
    korText: "최대 인원",
    placeholderText: "인원을 입력해주세요",
    checkValid: () => {
      return checkNumber(maximum);
    },
    invalidText: "1 이상의 숫자를 입력해주세요",
    secret: false,
  };
}

export function useDescription() {
  const [description, setDescription] = useState("");

  return {
    element: description,
    setElement: setDescription,
    korText: "내용",
    placeholderText: "내용을 입력해주세요",
    checkValid: () => {
      return !checkBlank(description) && !checkLength(description, 301);
    },
    invalidText: "내용은 최대 300자까지 입력 가능합니다",
    secret: false,
    long: true,
  };
}
