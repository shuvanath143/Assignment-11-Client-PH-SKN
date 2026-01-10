import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useLenisGsap = ({
  enabled = true,
  smoothTouch = false,
} = {}) => {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      smoothTouch,
    });

    // 🔗 Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    //   gsap.ticker.remove(lenis.raf);
    };
  }, [enabled, smoothTouch]);
};

export default useLenisGsap;
