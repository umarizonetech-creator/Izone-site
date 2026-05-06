import { Link } from "react-router-dom";

export function ScrollWorksSection({
  works,
  title = "Our Work",
  subtitle = "Case Studies",
  className = "",
}) {
  return (
    <section className={`relative pt-32 sm:pt-36 md:pt-40 pb-12 overflow-hidden flex flex-col items-center ${className}`}>
      <div className="container-custom w-full relative z-10 px-4 md:px-8">
        <div className="text-center mb-14 md:mb-24">
          <span className="text-primary font-medium">{title}</span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold mt-2">
            {subtitle}
          </h2>
        </div>

        <div className="md:hidden grid gap-4 w-full">
          {works.slice(0, 3).map((work, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-[0_18px_45px_rgba(0,0,0,0.12)]"
            >
              <div
                className="h-[220px] w-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${work.image})`,
                }}
              >
                <div className="h-full w-full bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
              </div>
              <div className="p-5">
                <div className="text-[11px] uppercase tracking-[0.28em] text-primary/90 mb-2">
                  {work.category}
                </div>
                <h3 className="text-lg font-semibold text-foreground leading-tight">
                  {work.title}
                </h3>
                <div className="mt-4">
                  <Link
                    to="/portfolio"
                    className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                  >
                    View Project
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="portfolio-cards-shell hidden md:flex justify-center items-center h-[380px] w-full">
          <div className="portfolio-cards">
            {works.slice(0, 3).map((work, index) => {
              const positions = ["one", "two", "three"];
              const posClass = positions[index] || "one";
              return (
                <div 
                  key={index}
                  className={`portfolio-card ${posClass}`}
                  style={{
                    backgroundImage: `url(${work.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="portfolio-cardDetails">
                    <div className="portfolio-cardDetailsHeader text-[#16a34a]">
                      <div className="text-[12px] uppercase tracking-wider mb-2 opacity-90 text-[#16a34a] leading-tight">{work.category}</div>
                      <div className="text-lg leading-snug">{work.title}</div>
                    </div>
                    <Link
                      to="/portfolio"
                      className="portfolio-cardDetailsButton text-[13px] px-5 py-2 inline-flex items-center justify-center"
                    >
                      View Project
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ScrollWorksSection;
