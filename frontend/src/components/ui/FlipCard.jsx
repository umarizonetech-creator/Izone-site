import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

export function FlipCard({
  title,
  summary,
  fullContent,
  icon,
  features = [],
  delay = 0,
  serviceLayout = false,
  desktopComfort = false,
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const ref = useRef(null);
  const pointerStartRef = useRef(null);
  const didDragRef = useRef(false);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handlePointerDown = (event) => {
    pointerStartRef.current = { x: event.clientX, y: event.clientY };
    didDragRef.current = false;
  };

  const handlePointerMove = (event) => {
    if (!pointerStartRef.current) return;

    const deltaX = Math.abs(event.clientX - pointerStartRef.current.x);
    const deltaY = Math.abs(event.clientY - pointerStartRef.current.y);

    if (deltaX > 10 || deltaY > 10) {
      didDragRef.current = true;
    }
  };

  const handlePointerCancel = () => {
    pointerStartRef.current = null;
    didDragRef.current = false;
  };

  const handleCardClick = () => {
    if (didDragRef.current) {
      didDragRef.current = false;
      return;
    }

    setIsFlipped((current) => !current);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
      className="perspective-1000 w-full"
    >
      <motion.div
        className={`relative w-full min-h-[310px] sm:min-h-[330px] cursor-pointer touch-pan-y ${
          desktopComfort ? "md:min-h-[360px] lg:min-h-[380px]" : ""
        } ${
          serviceLayout ? "min-h-[380px] sm:h-[380px]" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerCancel={handlePointerCancel}
        onClick={handleCardClick}
      >
        <div
          className="absolute inset-0 glass-card glow-border hover-glow backface-hidden flex flex-col overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex-1 p-5 sm:p-6 pb-2">
            <div className="flex items-start gap-3 sm:gap-4 mb-4">
              {icon && (
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  {icon}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-lg sm:text-xl font-bold leading-tight text-foreground mb-2">
                  {title}
                </h3>
              </div>
            </div>

            <p className={`text-muted-foreground text-[0.92rem] sm:text-sm leading-relaxed ${
              serviceLayout
                ? "min-h-[60px] line-clamp-3"
                : desktopComfort
                  ? "min-h-[3.75rem] sm:min-h-[4.5rem] md:min-h-[5.5rem] line-clamp-3 md:line-clamp-4 mb-4"
                  : "min-h-[2.5rem] sm:min-h-[3rem] line-clamp-2 mb-4"
            }`}>
              {summary}
            </p>

            {features.length > 0 && (
              <ul className="space-y-2 mt-4">
                {features.slice(0, 3).map((f, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-right text-primary text-xs font-medium">
            Click to flip
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 glass-card glow-border backface-hidden flex flex-col"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div
            className="flex-1 overflow-y-auto hide-scrollbar touch-pan-y p-6 pb-2"
            style={{ WebkitOverflowScrolling: "touch", overscrollBehaviorY: "auto" }}
          >
            <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-4">
              {title}
            </h3>
            <p
              className={`text-muted-foreground text-sm leading-relaxed ${
                serviceLayout ? "line-clamp-5 min-h-[120px]" : "mb-4"
              }`}
            >
              {fullContent}
            </p>
            {features.length > 0 && (
              <div className={serviceLayout ? "mt-4" : ""}>
                <h4 className="font-semibold text-foreground text-sm mb-2">
                  All Features:
                </h4>
                <ul className="space-y-1">
                  {features.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-xs text-muted-foreground"
                    >
                      <span className="w-1 h-1 rounded-full bg-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="px-6 pb-6 text-right text-primary text-xs font-medium">
            Click to flip back
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default FlipCard;
