import "@/styles/globals.css";
import Navbar from "@/components/Navbar";

export default function App({ Component, pageProps }) {
  const useLayout = Component.useLayout ?? true;
  return (
    <>
      {useLayout && <Navbar />}
      <Component {...pageProps} />
    </>
  );
}
