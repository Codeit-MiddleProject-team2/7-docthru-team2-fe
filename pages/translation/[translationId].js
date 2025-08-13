// pages/translation/[translationId].js
import TranslationDetail from "@/components/translation/TranslationDetail";

export default function TranslationDetailPage() {
  // 추후에 translationId로 데이터 fetch를 이 페이지에서 하고 싶다면
  // TranslationDetail을 props 받는 형태로 리팩터링한 뒤에 붙이면 됩니다.
  return <TranslationDetail />;
}
