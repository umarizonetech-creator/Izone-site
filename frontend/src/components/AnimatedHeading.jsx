// src/components/AnimatedText/AnimatedText.jsx
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const AnimatedText = ({
  text,
  as: Tag = "h1",
  className = "",
  start = "top 60%",
  end = "top 30%",
  stagger = 0.035,
  yPercent = 100,
  ease = "power3.out",
}) => {
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const split = new SplitType(el, { types: "chars" });

    const tween = gsap.from(split.chars, {
      scrollTrigger: {
        trigger: el,
        start,
        end,
      },
      duration: 0.45,
      opacity: 0,
      yPercent,
      stagger,
      ease,
      force3D: true,
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      split.revert(); // Cleanup to prevent memory leaks
    };
  }, [start, end, stagger, yPercent, ease]);

  return (
    <Tag ref={textRef} className={className}>
      {text}
    </Tag>
  );
};

export default AnimatedText;
