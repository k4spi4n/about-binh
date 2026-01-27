import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

// Move categories outside so it's constant and doesn't trigger hook deps warnings
const categories = [
  "Backend",
  "AI",
  "Ngôn ngữ lập trình",
  "Công cụ",
  "Frontend",
];

export const SkillRadar = ({ skills }) => {
  const [activeCategory, setActiveCategory] = useState("Ngôn ngữ lập trình");

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
      };
    });
  }, [skills]);

  // Radar Chart Configuration
  const size = 300;
  const center = size / 2;
  const radius = 120;
  const angleStep = (Math.PI * 2) / 5;

  const getCoordinates = (value, index) => {
    const angle = index * angleStep - Math.PI / 2; // Start from top
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // Generate polygon points
  const points = radarData
    .map((d, i) => {
      const coords = getCoordinates(d.value, i);
      return `${coords.x},${coords.y}`;
    })
    .join(" ");

  // Generate grid levels (20%, 40%, 60%, 80%, 100%)
  const levels = [20, 40, 60, 80, 100];
  
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 my-12 w-full">
      {/* Radar Chart Area */}
      <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] flex-shrink-0">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full drop-shadow-xl"
          style={{ overflow: "visible" }}
        >
          {/* Grid Lines */}
          {levels.map((level) => {
             const levelPoints = categories.map((_, i) => {
                 const coords = getCoordinates(level, i);
                 return `${coords.x},${coords.y}`;
             }).join(" ");
             
             return (
                 <polygon
                    key={level}
                    points={levelPoints}
                    fill="none"
                    stroke="currentColor"
                    strokeOpacity={0.1}
                    strokeWidth="1"
                 />
             );
          })}

          {/* Axes */}
          {categories.map((_, i) => {
            const end = getCoordinates(100, i);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={end.x}
                y2={end.y}
                stroke="currentColor"
                strokeOpacity={0.1}
                strokeWidth="1"
              />
            );
          })}

          {/* Data Polygon */}
          <motion.polygon
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            points={points}
            fill="hsl(var(--primary))"
            fillOpacity="0.4"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
          />

          {/* Data Points & Labels */}
          {radarData.map((d, i) => {
            const coords = getCoordinates(d.value, i);
            const labelCoords = getCoordinates(120, i); // Set to 120 as requested

            return (
              <g key={i} onClick={() => setActiveCategory(d.category)} className="cursor-pointer group">
                {/* Point */}
                <circle
                  cx={coords.x}
                  cy={coords.y}
                  r="4"
                  fill={activeCategory === d.category ? "white" : "hsl(var(--primary))"}
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  className="transition-all duration-300 group-hover:r-6"
                />
                
                {/* Label */}
                <text
                  x={labelCoords.x}
                  y={labelCoords.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={cn(
                      "text-[10px] md:text-[11px] uppercase tracking-tighter font-bold transition-all duration-300",
                      activeCategory === d.category ? "fill-primary opacity-100" : "fill-foreground opacity-60"
                  )}
                >
                  {d.category}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Details Panel */}
      <div className="w-full max-w-md bg-card/50 backdrop-blur-sm border rounded-xl p-6 shadow-sm min-h-[300px] flex flex-col">
          <div className="mb-6 flex items-center justify-between border-b pb-4">
              <h3 className="text-xl font-bold text-primary">{activeCategory}</h3>
              <span className="text-sm text-muted-foreground font-mono">
                  Avg: {Math.round(radarData.find(d => d.category === activeCategory)?.value || 0)}/100
              </span>
          </div>

          <div className="space-y-4 flex-1">
             <AnimatePresence mode="wait">
                 <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                 >
                     {radarData.find(d => d.category === activeCategory)?.skills.map((skill, idx) => (
                         <div key={idx} className="mb-4 last:mb-0 group">
                             <div className="flex justify-between mb-1">
                                 <span className="font-medium group-hover:text-primary transition-colors">{skill.name}</span>
                                 <span className="text-xs text-muted-foreground">{skill.level}%</span>
                             </div>
                             <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                 <motion.div 
                                    className="h-full bg-primary"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${skill.level}%` }}
                                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                                 />
                             </div>
                         </div>
                     ))}
                 </motion.div>
             </AnimatePresence>
          </div>
      </div>
    </div>
  );
};

SkillRadar.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      level: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};