import React, { useEffect, useRef, useState } from "react";

const CursorRings = () => {
  const numRings = 8;
  const ringRefs = useRef([]);
  const positions = useRef(Array(numRings).fill(null).map(() => ({ x: 0, y: 0 })));
  const velocities = useRef(Array(numRings).fill(null).map(() => ({ x: 0, y: 0 })));
  const [mouseDown, setMouseDown] = useState(false);
  const [trails, setTrails] = useState([]);
  
  const cursor = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const lastCursor = useRef({ x: 0, y: 0 });
  const cursorVelocity = useRef({ x: 0, y: 0 });

  // Advanced physics parameters
  const baseSpring = 0.08;
  const baseFriction = 0.85;
  const magneticStrength = 0.02;
  const turbulence = 0.3;

  // Ring configuration with varying properties
  const getRingConfig = (index) => {
    const progress = index / (numRings - 1);
    return {
      size: 40 - progress * 35,
      thickness: 3 - progress * 1.8,
      spring: baseSpring * (1 + progress * 0.5),
      friction: baseFriction - progress * 0.05,
      mass: 1 + progress * 2,
      opacity: 0.9 - progress * 0.4,
      blur: progress * 2,
    };
  };

  // Perlin-like noise for organic movement
  const noise = useRef(Math.random() * 1000);

  const perlin = (x) => {
    const X = Math.floor(x) & 255;
    x -= Math.floor(x);
    const u = x * x * x * (x * (x * 6 - 15) + 10);
    return Math.sin(X * 12.9898 + 78.233) * u;
  };

  // Trail particles
  const addTrail = () => {
    const speed = Math.sqrt(cursorVelocity.current.x ** 2 + cursorVelocity.current.y ** 2);
    if (speed > 2 && Math.random() > 0.7) {
      const id = Date.now() + Math.random();
      setTrails(prev => [...prev.slice(-20), {
        id,
        x: cursor.current.x + (Math.random() - 0.5) * 10,
        y: cursor.current.y + (Math.random() - 0.5) * 10,
        size: Math.random() * 4 + 2,
        life: 1,
      }]);
    }
  };

  useEffect(() => {
    const trailTimer = setInterval(() => {
      setTrails(prev => prev.map(t => ({
        ...t,
        life: t.life - 0.05,
      })).filter(t => t.life > 0));
    }, 50);
    return () => clearInterval(trailTimer);
  }, []);

  useEffect(() => {
    const handleMouseDown = () => setMouseDown(true);
    const handleMouseUp = () => setMouseDown(false);

    const handleMouseMove = (e) => {
      lastCursor.current = { ...cursor.current };
      cursor.current.x = e.clientX;
      cursor.current.y = e.clientY;
      
      cursorVelocity.current.x = cursor.current.x - lastCursor.current.x;
      cursorVelocity.current.y = cursor.current.y - lastCursor.current.y;
      
      addTrail();
    };

    const animate = () => {
      noise.current += 0.005;

      positions.current.forEach((pos, i) => {
        const config = getRingConfig(i);
        let targetX, targetY;

        if (i === 0) {
          // Lead ring - follows cursor with some noise
          const noiseX = perlin(noise.current + i) * turbulence;
          const noiseY = perlin(noise.current + i + 100) * turbulence;
          targetX = cursor.current.x + noiseX;
          targetY = cursor.current.y + noiseY;
        } else {
          // Following rings - organic chain behavior
          const prev = positions.current[i - 1];
          const dx = prev.x - pos.x;
          const dy = prev.y - pos.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const idealDistance = 15 + i * 8;

          if (distance > idealDistance) {
            const angle = Math.atan2(dy, dx);
            targetX = prev.x - Math.cos(angle) * idealDistance;
            targetY = prev.y - Math.sin(angle) * idealDistance;
          } else {
            targetX = prev.x;
            targetY = prev.y;
          }

          // Magnetic pull towards cursor
          const cursorDx = cursor.current.x - pos.x;
          const cursorDy = cursor.current.y - pos.y;
          targetX += cursorDx * magneticStrength;
          targetY += cursorDy * magneticStrength;

          // Organic noise
          targetX += perlin(noise.current + i * 10) * turbulence * (i * 0.5);
          targetY += perlin(noise.current + i * 10 + 50) * turbulence * (i * 0.5);
        }

        // Advanced spring physics
        const dx = targetX - pos.x;
        const dy = targetY - pos.y;
        
        velocities.current[i].x += dx * config.spring / config.mass;
        velocities.current[i].y += dy * config.spring / config.mass;
        
        // Add cursor velocity influence for first few rings
        if (i < 3) {
          const influence = (3 - i) / 3 * 0.2;
          velocities.current[i].x += cursorVelocity.current.x * influence;
          velocities.current[i].y += cursorVelocity.current.y * influence;
        }
        
        velocities.current[i].x *= config.friction;
        velocities.current[i].y *= config.friction;
        
        pos.x += velocities.current[i].x;
        pos.y += velocities.current[i].y;
      });

      // Render rings
      ringRefs.current.forEach((ring, i) => {
        if (!ring) return;
        
        const config = getRingConfig(i);
        const pos = positions.current[i];
        const velocity = Math.sqrt(velocities.current[i].x ** 2 + velocities.current[i].y ** 2);
        
        // Dynamic effects based on movement
        const stretch = 1 + Math.min(velocity * 0.02, 0.3);
        const angle = Math.atan2(velocities.current[i].y, velocities.current[i].x);
        const rotation = angle * (180 / Math.PI);
        
        const pressScale = mouseDown && i < 3 ? 0.8 : 1;
        
        ring.style.transform = `
          translate3d(${pos.x - config.size / 2}px, ${pos.y - config.size / 2}px, 0)
          rotate(${rotation}deg)
          scale(${pressScale}, ${pressScale / stretch})
        `;
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    
    // Initialize positions
    positions.current.forEach(pos => {
      pos.x = cursor.current.x;
      pos.y = cursor.current.y;
    });
    
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      background: 'radial-gradient(circle at 50% 50%, #1a1a2e 0%, #0a0a15 100%)', 
      cursor: 'none',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Trail particles */}
      {trails.map(trail => (
        <div
          key={trail.id}
          style={{
            position: 'fixed',
            left: trail.x,
            top: trail.y,
            width: `${trail.size}px`,
            height: `${trail.size}px`,
            background: `hsl(${180 + Math.sin(noise.current) * 60}, 80%, 60%)`,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9997,
            transform: 'translate(-50%, -50%)',
            opacity: trail.life * 0.6,
            filter: 'blur(1px)',
            boxShadow: `0 0 ${trail.size * 2}px hsl(${180 + Math.sin(noise.current) * 60}, 80%, 60%)`,
          }}
        />
      ))}

      {/* Cursor rings */}
      {Array(numRings).fill(null).map((_, i) => {
        const config = getRingConfig(i);
        const hue = 180 + Math.sin(noise.current + i * 0.5) * 80;
        
        return (
          <div
            key={i}
            ref={(el) => (ringRefs.current[i] = el)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: `${config.size}px`,
              height: `${config.size}px`,
              border: `${config.thickness}px solid hsla(${hue}, 70%, ${50 + i * 5}%, ${config.opacity})`,
              borderRadius: "50%",
              pointerEvents: "none",
              zIndex: 9999 - i,
              background: i === 0 ? `radial-gradient(circle, hsla(${hue}, 70%, 60%, 0.2), transparent)` : "transparent",
              transform: "translate3d(0,0,0)",
              boxShadow: `
                0 0 ${10 - i}px hsla(${hue}, 80%, 60%, ${config.opacity * 0.8}),
                inset 0 0 ${8 - i}px hsla(${hue}, 80%, 60%, ${config.opacity * 0.4})
              `,
              filter: `blur(${config.blur}px)`,
              mixBlendMode: 'screen',
              willChange: 'transform',
            }}
          />
        );
      })}

      {/* Center dot */}
      <div
        style={{
          position: 'fixed',
          left: cursor.current.x,
          top: cursor.current.y,
          width: mouseDown ? '8px' : '5px',
          height: mouseDown ? '8px' : '5px',
          background: `hsl(${180 + Math.sin(noise.current) * 60}, 90%, 70%)`,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10001,
          transform: 'translate(-50%, -50%)',
          boxShadow: `0 0 15px hsl(${180 + Math.sin(noise.current) * 60}, 90%, 70%)`,
          transition: 'width 0.2s, height 0.2s',
        }}
      />
    </div>
  );
};

export default CursorRings;