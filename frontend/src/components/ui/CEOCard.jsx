import { motion } from "framer-motion";

const CEOCard = ({ name, role, description, image }) => {
  const imageUrl = image || "https://www.izonetech.in/img/kesavan.jpg";

  const stats = [
    { value: "15+", label: "Years Experience" },
    { value: "200+", label: "Projects Led" },
    { value: "200+", label: "Team Members" },
  ];

  return (
    <div className="w-full max-w-[860px] mx-auto mb-10 relative px-0 sm:px-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative w-full rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden bg-[#121b18] shadow-xl flex flex-col md:flex-row min-h-[380px] md:min-h-[440px]"
      >
        {/* The top/left beige layer */}
        <div className="absolute top-0 left-0 right-0 h-[86%] md:h-[82%] bg-[#ecfdf5] rounded-bl-[2.5rem] rounded-br-[2.5rem] md:rounded-bl-[4rem] md:rounded-br-[4rem] z-0"></div>

        {/* Content Layer */}
        <div className="relative z-10 w-full flex flex-col md:flex-row">
          
          {/* Left content area */}
          <div className="order-2 md:order-1 flex-1 p-6 sm:p-7 md:p-10 flex flex-col items-center md:items-start justify-between text-center md:text-left z-20">
            {/* Top text block */}
            <div className="mt-0 md:mt-2">
              <h2 className="text-[#1a1a1a] text-[clamp(1.35rem,6.4vw,1.7rem)] sm:text-[2rem] md:text-[2.2rem] font-black uppercase leading-[1.08] tracking-tight mb-3 max-w-full whitespace-nowrap mx-auto md:mx-0">
                {name}
              </h2>
              <h3 className="text-[#3b3b3b] text-[0.72rem] sm:text-sm md:text-[1.02rem] tracking-[0.2em] uppercase mb-4 font-medium whitespace-nowrap">
                {role}
              </h3>
              <p className="text-[#4a4a4a] text-[0.78rem] sm:text-[0.80rem] md:text-sm max-w-md leading-relaxed font-medium mb-5 md:mb-6">
                {description}
              </p>
            </div>

            {/* Bottom area - sits inside the dark section on desktop */}
            <div className="mt-4 md:mt-[-44px] grid grid-cols-3 gap-2 md:gap-3 text-primary w-full relative z-30">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-primary text-white px-3 md:px-5 py-2.5 md:py-3 rounded-full font-bold flex flex-col items-center justify-center gap-1 min-h-[72px] md:min-h-[78px] w-full overflow-hidden"
                >
                  <span className="text-[0.92rem] md:text-[1rem] shrink-0 leading-none">
                    {stat.value}
                  </span>
                  <span className="text-[0.58rem] sm:text-[0.68rem] md:text-xs font-medium leading-tight max-w-[72px] sm:max-w-[84px] md:max-w-[96px] text-center">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right image area (Abstract Shapes only) */}
          <div className="order-1 md:order-2 flex-1 relative flex items-end justify-center md:justify-end pt-2 sm:pt-4 md:pt-7 pr-0 md:pr-8 lg:pr-12 z-10 min-h-[300px] md:min-h-[240px] overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              whileInView={{ opacity: 1, y: -14, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-[-8px] right-[6%] z-20 w-[74%] max-w-[680px] h-[96%] overflow-hidden rounded-[2rem] bg-transparent md:right-[12%] md:w-[78%] md:h-[132%] lg:w-[76%] lg:h-[124%]"
            >
              <img
                src={imageUrl}
                alt={name}
                className="h-full w-full object-contain object-bottom drop-shadow-none"
              />
            </motion.div>

            {/* Dark Circle */}
            <div className="absolute left-[8%] top-[6%] md:left-auto md:right-[20%] md:top-[0%] w-[74%] h-[74%] md:w-56 md:h-56 rounded-full bg-[#1a2e26] z-0 shadow-lg"></div>
            
            {/* Yellow Blob / Pill */}
            <div className="absolute right-[8%] md:right-[0%] bottom-[10%] md:bottom-[18%] w-[62%] md:w-[17rem] h-24 sm:h-32 md:h-48 rounded-full bg-primary -z-10"></div>
            
            {/* Small top right icon */}
            <div className="absolute right-8 md:right-10 top-6 md:top-12 w-8 h-8 md:w-11 md:h-11 border-4 border-primary/80 rounded-[10px] opacity-80 -rotate-12 rounded-tl-sm z-10"></div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default CEOCard;
