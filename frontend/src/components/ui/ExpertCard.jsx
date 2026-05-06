

const ExpertCard = ({ name, role, avatar, bio }) => {
  return (
    <div
      className="glass-card w-full p-6 group flex flex-col relative overflow-hidden cursor-pointer shadow-lg transition-all duration-300"
    >
      {/* Sliding Fill Background Animation */}
      <div className="absolute inset-0 w-full h-full bg-primary -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></div>

      {/* Card Content */}
      <div className="flex items-center gap-4 mb-4 relative z-10 transition-all duration-300">
        <div
          className="w-16 h-16 rounded-full bg-primary/20 flex flex-shrink-0 items-center justify-center text-primary font-display font-bold text-xl group-hover:bg-background group-hover:text-primary transition-all duration-300"
        >
          {avatar}
        </div>

        <div>
          <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary-foreground transition-all duration-300 delay-100">{name}</h3>
          <span className="text-primary text-sm font-medium group-hover:text-primary-foreground/90 transition-all duration-300 delay-100">{role}</span>
        </div>
      </div>

      <p className="text-muted-foreground text-sm group-hover:text-primary-foreground/90 transition-all duration-300 delay-150 relative z-10 leading-relaxed">{bio}</p>
    </div>
  );
};

export default ExpertCard;
