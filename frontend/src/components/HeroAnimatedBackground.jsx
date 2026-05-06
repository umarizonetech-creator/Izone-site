// src/components/HeroAnimatedBackground.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const HeroAnimatedBackground = () => {
  const bgRef = useRef(null);

  useEffect(() => {
    // GSAP: subtle up/down movement
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(bgRef.current, {
      y: 7, // move down
      rotation: 2,  // rotate slightly clockwise
      duration: 7, // slow movement
      ease: "power1.inOut",
    }).to(bgRef.current, {
      y: -10, // move up
      rotation: -0, // rotate slightly counter-clockwise
      duration: 7,
      ease: "power1.inOut",
    });

    return () => tl.kill();
  }, []);

  return (
    
    <div
      ref={bgRef}
      className="absolute inset-0 pointer-events-none z-0 bg-no-repeat"
      style={{
        backgroundImage: "url(/hero/heroimg2.svg)", // from public folder
        backgroundSize: "130%",
        backgroundPosition: "60% 15%",
        opacity: 0.85,
        transform: "translateX(140px)", // 👈 move 100px to the right
        transformOrigin: "center",
      }}
    />
  );
};

export default HeroAnimatedBackground;
