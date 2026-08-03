import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

// Move categories outside so it's constant and doesn't trigger hook deps warnings
const categories = [
  "Backend",
  "Frontend",
  "Công cụ",
  "Ngôn ngữ lập trình",
  "AI",
];

// One accent per axis, drawn from the site's neon palette. The colour ties
// a vertex to its label, its axis and its panel so the selection is
// readable at a glance. All five are picked to hold contrast on the light
// theme as well as the dark one.
const categoryColors = {
  Backend: "#8b5cf6",
  Frontend: "#06b6d4",
  "Công cụ": "#d946ef",
  "Ngôn ngữ lập trình": "#0ea5e9",
  AI: "#ec4899",
};

const skillLabels = [
  "Novice",
  "Familiar",
  "Intermediate",
  "Proficient",
  "Expert",
];

const withAlpha = (hex, alpha) =>
  hex +
  Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0");

export const SkillRadar = ({ skills }) => {
  const [activeCategory, setActiveCategory] = useState(null);

  // Group and calculate averages
  const radarData = useMemo(() => {
    return categories.map((cat) => {
      const catSkills = skills.filter((s) => s.category === cat);
      const avg =
        catSkills.length > 0
          ? catSkills.reduce((acc, curr) => acc + curr.level, 0) /
            catSkills.length
          : 0;
      return {
        category: cat,
        value: avg,
        skills: catSkills,
        color: categoryColors[cat],
      };
    });
  }, [skills]);

  const activeData = radarData.find((d) => d.category === activeCategory);

  // Radar Chart Configuration
  const size = 360;
  const center = size / 2;
  const radius = 144;
  const angleStep = (Math.PI * 2) / 5;

  const getCoordinates = (value, index) => {
    const angle = index * angleStep - Math.PI / 2; // Start from top
    const r = (value / 5) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const polygonFor = (valueAt) =>
    categories
      .map((_, i) => {
        const coords = getCoordinates(valueAt(i), i);
        return `${coords.x},${coords.y}`;
      })
      .join(" ");

  const points = polygonFor((i) => radarData[i].value);
  const outerPoints = polygonFor(() => 5);

  // Generate grid levels (1 to 5)
  const levels = [1, 2, 3, 4, 5];

  // Sweep wedge: a 70deg slice of the dish, brightest at its leading edge
  const sweepStart = -Math.PI / 2;
  const sweepEnd = sweepStart + (70 * Math.PI) / 180;
  const sweepP0 = {
    x: center + radius * Math.cos(sweepStart),
    y: center + radius * Math.sin(sweepStart),
  };
  const sweepP1 = {
    x: center + radius * Math.cos(sweepEnd),
    y: center + radius * Math.sin(sweepEnd),
  };

  const selectCategory = (cat) =>
    setActiveCategory((prev) => (prev === cat ? null : cat));

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 my-12 w-full min-h-[500px]"
    >
      {/* Radar Chart Area */}
      <motion.div
        layout
        className="relative w-[340px] h-[340px] md:w-[460px] md:h-[460px] flex-shrink-0 z-10"
      >
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full"
          style={{ overflow: "visible" }}
        >
          <defs>
            {/* Dish depth */}
            <radialGradient id="radar-dish" cx="50%" cy="50%" r="50%">
              <stop
                offset="0%"
                stopColor="hsl(var(--primary))"
                stopOpacity="0.14"
              />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.02" />
            </radialGradient>

            {/* Data shape: violet core bleeding into fuchsia / cyan */}
            <radialGradient id="radar-fill" cx="50%" cy="50%" r="55%">
              <stop
                offset="0%"
                stopColor="hsl(var(--primary))"
                stopOpacity="0.3"
              />
              <stop offset="60%" stopColor="#d946ef" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.1" />
            </radialGradient>

            <linearGradient id="radar-stroke" x1="0%" y1="0%" x2="100%" y2="90%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="50%" stopColor="#d946ef" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>

            {/* Sweep tail: bright at the leading edge, gone at the trailing one */}
            <linearGradient
              id="radar-sweep-grad"
              gradientUnits="userSpaceOnUse"
              x1={sweepP1.x}
              y1={sweepP1.y}
              x2={sweepP0.x}
              y2={sweepP0.y}
            >
              <stop
                offset="0%"
                stopColor="hsl(var(--primary))"
                stopOpacity="0.35"
              />
              <stop
                offset="100%"
                stopColor="hsl(var(--primary))"
                stopOpacity="0"
              />
            </linearGradient>

            <filter id="radar-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <clipPath id="radar-clip">
              <polygon points={outerPoints} />
            </clipPath>
          </defs>

          {/* Dish backdrop */}
          <polygon points={outerPoints} fill="url(#radar-dish)" />

          {/* Rotating radar sweep */}
          <g clipPath="url(#radar-clip)">
            <g
              className="radar-sweep"
              style={{ transformOrigin: `${center}px ${center}px` }}
            >
              <path
                d={`M ${center} ${center} L ${sweepP0.x} ${sweepP0.y} A ${radius} ${radius} 0 0 1 ${sweepP1.x} ${sweepP1.y} Z`}
                fill="url(#radar-sweep-grad)"
              />
              <line
                x1={center}
                y1={center}
                x2={sweepP1.x}
                y2={sweepP1.y}
                stroke="hsl(var(--primary))"
                strokeOpacity="0.45"
                strokeWidth="1"
              />
            </g>
          </g>

          {/* Grid Lines */}
          {levels.map((level) => (
            <polygon
              key={level}
              points={polygonFor(() => level)}
              fill="none"
              stroke="currentColor"
              strokeOpacity={level === 5 ? 0.22 : 0.09}
              strokeWidth="1"
            />
          ))}

          {/* Axes */}
          {radarData.map((d, i) => {
            const end = getCoordinates(5, i);
            const isActive = activeCategory === d.category;
            return (
              <line
                key={d.category}
                x1={center}
                y1={center}
                x2={end.x}
                y2={end.y}
                stroke={isActive ? d.color : "currentColor"}
                strokeOpacity={isActive ? 0.55 : 0.1}
                strokeWidth={isActive ? 1.5 : 1}
                className="transition-all duration-300"
              />
            );
          })}

          {/* Data polygon — fill and outline are separate so the bloom filter
              only blooms the outline instead of smearing the whole shape */}
          <motion.g
            initial={{ opacity: 0, scale: 0.2 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            style={{ transformOrigin: `${center}px ${center}px` }}
          >
            <polygon points={points} fill="url(#radar-fill)" />
            <polygon
              points={points}
              fill="none"
              stroke="url(#radar-stroke)"
              strokeWidth="2"
              strokeLinejoin="round"
              filter="url(#radar-glow)"
            />
          </motion.g>

          {/* Core — tidies up where the axes converge and echoes the
              selected category */}
          <circle
            cx={center}
            cy={center}
            r="4"
            fill={activeData ? activeData.color : "hsl(var(--primary))"}
            className="transition-all duration-300"
            style={{
              filter: `drop-shadow(0 0 6px ${
                activeData ? activeData.color : "#8b5cf6"
              })`,
            }}
          />

          {/* Data Points & Labels */}
          {radarData.map((d, i) => {
            const coords = getCoordinates(d.value, i);
            const labelCoords = getCoordinates(6.2, i);
            const isActive = activeCategory === d.category;
            const dimmed = activeCategory && !isActive;

            return (
              <motion.g
                key={d.category}
                onClick={() => selectCategory(d.category)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    selectCategory(d.category);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                aria-label={`Xem chi tiết ${d.category}`}
                className="cursor-pointer group focus:outline-none"
                whileHover={{ scale: 1.06 }}
                style={{ transformOrigin: `${center}px ${center}px` }}
                animate={{ opacity: dimmed ? 0.35 : 1 }}
                transition={{ duration: 0.3 }}
              >
                {/* Larger invisible hit area for better mobile/desktop clicking */}
                <circle
                  cx={coords.x}
                  cy={coords.y}
                  r="20"
                  fill="transparent"
                  className="pointer-events-auto"
                />

                {/* Pulsing halo hints that the vertices are clickable */}
                {!activeCategory && (
                  <motion.circle
                    cx={coords.x}
                    cy={coords.y}
                    r="8"
                    fill={d.color}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: [0, 0.25, 0], scale: [0.8, 2, 0.8] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                    style={{ transformOrigin: `${coords.x}px ${coords.y}px` }}
                  />
                )}

                {/* Selection ring */}
                {isActive && (
                  <motion.circle
                    cx={coords.x}
                    cy={coords.y}
                    r="11"
                    fill="none"
                    stroke={d.color}
                    strokeWidth="1.5"
                    strokeOpacity="0.7"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{ transformOrigin: `${coords.x}px ${coords.y}px` }}
                  />
                )}

                {/* Point */}
                <circle
                  cx={coords.x}
                  cy={coords.y}
                  r={isActive ? 6 : 4.5}
                  fill={isActive ? "white" : d.color}
                  stroke={d.color}
                  strokeWidth="2"
                  className="transition-all duration-300"
                  style={{ filter: `drop-shadow(0 0 6px ${d.color})` }}
                />

                {/* Label */}
                <text
                  x={labelCoords.x}
                  y={labelCoords.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={cn(
                    "text-[10px] md:text-[11px] uppercase tracking-tighter font-bold transition-all duration-300",
                    isActive
                      ? "opacity-100"
                      : "fill-foreground opacity-60 group-hover:opacity-100",
                  )}
                  style={isActive ? { fill: d.color } : undefined}
                >
                  {d.category}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </motion.div>

      {/* Details Panel */}
      <div className="w-full max-w-md lg:min-h-[380px]">
        <AnimatePresence mode="wait">
          {activeData ? (
            <motion.div
              key={activeData.category}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-card/50 backdrop-blur-sm border rounded-xl p-6 shadow-sm flex flex-col relative overflow-hidden"
              style={{ borderColor: withAlpha(activeData.color, 0.35) }}
            >
              {/* Accent wash in the category colour */}
              <div
                className="absolute inset-x-0 top-0 h-24 pointer-events-none"
                style={{
                  background: `radial-gradient(120% 100% at 0% 0%, ${withAlpha(
                    activeData.color,
                    0.18,
                  )}, transparent 70%)`,
                }}
              />

              <div className="mb-6 flex items-end justify-between border-b pb-4 relative">
                <div className="text-left">
                  <h3
                    className="text-xl font-bold"
                    style={{
                      color: activeData.color,
                      textShadow: `0 0 18px ${withAlpha(activeData.color, 0.5)}`,
                    }}
                  >
                    {activeData.category}
                  </h3>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/55 mt-1">
                    {activeData.skills.length} kỹ năng
                  </p>
                </div>
                <button
                  onClick={() => setActiveCategory(null)}
                  className="text-[10px] uppercase tracking-[0.15em] text-foreground/55 hover:text-foreground transition-colors"
                >
                  Đóng
                </button>
              </div>

              <div className="space-y-4 flex-1 relative">
                {activeData.skills.map((skill, idx) => (
                  <div key={skill.name} className="group/skill">
                    <div className="flex justify-between items-baseline mb-1.5">
                      <span className="font-medium text-sm text-left transition-colors group-hover/skill:text-foreground">
                        {skill.name}
                      </span>
                      <span
                        className="text-[10px] uppercase font-bold tracking-widest ml-3 flex-shrink-0"
                        style={{ color: withAlpha(activeData.color, 0.75) }}
                      >
                        {skillLabels[Math.min(skill.level - 1, 4)]}
                      </span>
                    </div>
                    {/* Five discrete cells — the level is countable, not estimated */}
                    <div className="flex gap-1 h-1.5">
                      {[1, 2, 3, 4, 5].map((cell) => {
                        const filled = cell <= skill.level;
                        return (
                          <motion.span
                            key={cell}
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            transition={{
                              duration: 0.35,
                              delay: idx * 0.06 + cell * 0.05,
                            }}
                            className="flex-1 rounded-full origin-left"
                            style={
                              filled
                                ? {
                                    background: withAlpha(
                                      activeData.color,
                                      0.45 + 0.55 * (cell / skill.level),
                                    ),
                                    boxShadow: `0 0 8px ${withAlpha(
                                      activeData.color,
                                      0.4,
                                    )}`,
                                  }
                                : { background: "hsl(var(--foreground) / 0.08)" }
                            }
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* Default state — a legend that doubles as a second way in */
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-card/30 backdrop-blur-sm border rounded-xl p-6 shadow-sm"
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/55 mb-5 text-left">
                Chọn một danh mục để xem chi tiết
              </p>
              <div className="space-y-3">
                {radarData.map((d) => (
                  <button
                    key={d.category}
                    onClick={() => selectCategory(d.category)}
                    className="w-full group/row text-left"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="flex items-center gap-2.5 text-sm font-medium transition-colors group-hover/row:text-foreground text-foreground/55">
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{
                            background: d.color,
                            boxShadow: `0 0 8px ${d.color}`,
                          }}
                        />
                        {d.category}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-foreground/40">
                        {d.skills.length} kỹ năng
                      </span>
                    </div>
                    <div className="h-1 rounded-full bg-foreground/8 overflow-hidden ml-[18px]">
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(d.value / 5) * 100}%` }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        style={{
                          background: `linear-gradient(90deg, ${withAlpha(
                            d.color,
                            0.35,
                          )}, ${d.color})`,
                        }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

SkillRadar.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      level: PropTypes.number,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
