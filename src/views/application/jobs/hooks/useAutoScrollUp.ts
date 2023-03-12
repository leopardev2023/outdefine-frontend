import { useEffect } from "react";

export default function useAutoScrollUp() {
  useEffect(() => {
    console.log("autoscroll", window.scrollY);
    window.scrollTo({ top: -1000 });
  }, []);
}
