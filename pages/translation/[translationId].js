import { useRouter } from "next/router";
import TranslationDetail from "@/components/translation/TranslationDetail";

export default function TranslationDetailPage() {
  const router = useRouter();
  const { translationId } = router.query;

  if (!router.isReady) return null;
  return <TranslationDetail translationId={String(translationId)} />;
}
