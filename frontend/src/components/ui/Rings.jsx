// src/components/CursorRings.jsx
import React, { useEffect, useRef } from "react";

const CursorRings = () => {
  const ringRefs = useRef([]);
  const positions = useRef([
    { x: 0, y: 0 }, // outer ring
    { x: 0, y: 0 }, // inner/tail ring
  ]);

  // SPEED CONTROL
  const speeds = [0.03, 0.02]; // outer and inner ring speeds

  // SPACING CONTROL
  const spacing = 160;

  const ringSizes = [30, 6];

  const cursor = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const isMoving = useRef(false);
  const idleTimeout = useRef();

  const colorPalette = [
    "rgba(47, 107, 255, 0.7)",
    "rgba(95, 168, 255, 0.7)",
    "rgba(0, 212, 255, 0.7)",
    "rgba(106, 123, 255, 0.7)",
    "rgba(201, 216, 255, 0.7)",
    "rgba(234, 242, 255, 0.7)",
  ];

  const colorChangeInterval = 6000;

  // Automatic color change
  useEffect(() => {
    let colorIndex = 0;

    const changeColors = () => {
      colorIndex = (colorIndex + 1) % colorPalette.length;
      ringRefs.current.forEach((ring, i) => {
        if (!ring) return;
        const alpha = i === 0 ? 0.7 : 0.4;
        const color = colorPalette[colorIndex].replace(/0\.7/, alpha);
        ring.style.borderColor = color;
      });
    };

    const timer = setInterval(changeColors, colorChangeInterval);
    return () => clearInterval(timer);
  }, []);

  // Mouse movement + animation (desktop by behavior)
  useEffect(() => {
    const handleMouseMove = (e) => {
      cursor.current.x = e.clientX;
      cursor.current.y = e.clientY;
      isMoving.current = true;

      clearTimeout(idleTimeout.current);
      idleTimeout.current = setTimeout(() => {
        isMoving.current = false;
      }, 100);
    };

    const animate = () => {
      // Outer ring follows cursor
      const dx0 = cursor.current.x - positions.current[0].x;
      const dy0 = cursor.current.y - positions.current[0].y;
      positions.current[0].x += dx0 * speeds[0];
      positions.current[0].y += dy0 * speeds[0];

      // Inner ring trails outer ring
      const dx = positions.current[0].x - positions.current[1].x;
      const dy = positions.current[0].y - positions.current[1].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > spacing) {
        const angle = Math.atan2(dy, dx);
        positions.current[1].x +=
          (positions.current[0].x -
            Math.cos(angle) * spacing -
            positions.current[1].x) *
          speeds[1];
        positions.current[1].y +=
          (positions.current[0].y -
            Math.sin(angle) * spacing -
            positions.current[1].y) *
          speeds[1];
      } else {
        positions.current[1].x +=
          (cursor.current.x - positions.current[1].x) * speeds[1];
        positions.current[1].y +=
          (cursor.current.y - positions.current[1].y) * speeds[1];
      }

      // Slower return when cursor stops
      if (!isMoving.current) {
        positions.current.forEach((pos, i) => {
          const returnSpeed = speeds[i] * 0.6;
          pos.x += (cursor.current.x - pos.x) * returnSpeed;
          pos.y += (cursor.current.y - pos.y) * returnSpeed;
        });
      }

      ringRefs.current.forEach((ring, i) => {
        if (!ring) return;
        ring.style.transform = `translate3d(${
          positions.current[i].x - ring.offsetWidth / 2
        }px, ${positions.current[i].y - ring.offsetHeight / 2}px, 0)`;
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {ringSizes.map((size, i) => (
        <div
          key={i}
          ref={(el) => (ringRefs.current[i] = el)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: `${size}px`,
            height: `${size}px`,
            border: `2px solid ${colorPalette[i]}`,
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 9999,
            background: "transparent",
            transform: "translate3d(0,0,0)",
          }}
        />
      ))}
    </>
  );
};

export default CursorRings;
