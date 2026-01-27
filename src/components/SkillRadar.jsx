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
      };
    });
  }, [skills]);

  // Radar Chart Configuration
  const size = 360; // Was 300
  const center = size / 2;
  const radius = 144; // Was 120
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
    <motion.div 
      layout 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="flex flex-col lg:flex-row items-center justify-center gap-12 my-12 w-full min-h-[500px]"
    >
      {/* Radar Chart Area */}
      <motion.div layout className="relative w-[360px] h-[360px] md:w-[480px] md:h-[480px] flex-shrink-0 z-10">
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
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            points={points}
            fill="hsl(var(--primary))"
            fillOpacity="0.3"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            className="drop-shadow-[0_0_20px_hsl(var(--primary)/0.5)]"
          />

          {/* Data Points & Labels */}
          {radarData.map((d, i) => {
            const coords = getCoordinates(d.value, i);
            const labelCoords = getCoordinates(130, i); // Pulled in closer to vertices (was 135)

            return (
              <motion.g 
                key={i} 
                onClick={() => setActiveCategory(activeCategory === d.category ? null : d.category)} 
                className="cursor-pointer group"
                whileHover={{ scale: 1.05 }}
              >
                {/* Pulsing Halo for interactivity hint */}
                {!activeCategory && (
                  <motion.circle
                    cx={coords.x}
                    cy={coords.y}
                    r="8"
                    fill="hsl(var(--primary))"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: [0, 0.15, 0], scale: [0.8, 1.8, 0.8] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
                  />
                )}

                {/* Point */}
                <circle
                  cx={coords.x}
                  cy={coords.y}
                  r="4"
                  fill={activeCategory === d.category ? "white" : "hsl(var(--primary))"}
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  className="transition-all duration-300 group-hover:r-5 drop-shadow-[0_0_8px_hsl(var(--primary)/0.8)]"
                />
                
                {/* Label */}
                <text
                  x={labelCoords.x}
                  y={labelCoords.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={cn(
                      "text-[10px] md:text-[11px] uppercase tracking-tighter font-bold transition-all duration-300",
                      activeCategory === d.category ? "fill-primary opacity-100" : "fill-foreground opacity-60 group-hover:opacity-100 group-hover:fill-primary"
                  )}
                >
                  {d.category}
                </text>
              </motion.g>
            );
          })}
        </svg>
        
        {/* Subtle Instructional Hint */}
        <AnimatePresence>
          {!activeCategory && (
            <motion.div 
              key="instructional-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.15, 0.4, 0.15] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.2em] font-medium text-muted-foreground italic pointer-events-none"
            >
              Click vào danh mục để xem chi tiết
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Details Panel */}
      <AnimatePresence mode="popLayout">
        {activeCategory && (
          <motion.div 
            layout
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
            className="w-full max-w-md bg-card/50 backdrop-blur-sm border rounded-xl p-6 shadow-sm min-h-[300px] flex flex-col"
          >
              <div className="mb-6 flex items-center justify-between border-b pb-4">
                  <h3 className="text-xl font-bold text-primary">{activeCategory}</h3>
              </div>

              <div className="space-y-4 flex-1">
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
              </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
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