import { useEffect, useState, useRef } from "react";

// id, size, x, y, opacity, animationDuration, speed
// id, size, x, y, delay, animationDuration

export const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    generateStars();
    generateMeteors();

    const handleResize = () => {
      generateStars();
    };

    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      // Calculate mouse offset from center
      // Dividing by a factor (e.g., 25) controls the "sensitivity" or max movement range
      const x = (e.clientX - window.innerWidth / 2) / 25;
      const y = (e.clientY - window.innerHeight / 2) / 25;

      // Update CSS variables on the container
      containerRef.current.style.setProperty("--mouse-x", `${x}px`);
      containerRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const generateStars = () => {
    const numberOfStars = Math.floor(
      (window.innerWidth * window.innerHeight) / 8500
    );

    const newStars = [];

    for (let i = 0; i < numberOfStars; i++) {
      const isSmall = Math.random() < 0.8;
      const size = isSmall ? Math.random() * 1.5 + 0.5 : Math.random() * 2 + 2;
      
      let x, y;
      let validPosition = false;
      let attempts = 0;

      // Simple collision detection for large stars to prevent clustering
      if (!isSmall) {
        while (!validPosition && attempts < 50) {
          x = Math.random() * 100;
          y = Math.random() * 100;
          validPosition = true;

          // Check distance against existing large stars
          for (const star of newStars) {
            if (star.size >= 2.0) { // Only check against other large stars
              const dx = star.x - x;
              const dy = star.y - y;
              // Distance squared threshold (e.g., 5%^2 = 25)
              if (dx * dx + dy * dy < 25) { 
                validPosition = false;
                break;
              }
            }
          }
          attempts++;
        }
      } 
      
      // Fallback or small star placement
      if (!validPosition || isSmall) {
        x = Math.random() * 100;
        y = Math.random() * 100;
      }

      newStars.push({
        id: i,
        size: size,
        x: x,
        y: y,
        opacity: isSmall ? Math.random() * 0.5 + 0.2 : Math.random() * 0.5 + 0.5,
        animationDuration: Math.random() * 4 + 2,
        // Larger stars (closer) move faster than small stars (further)
        speed: isSmall ? 0.2 : 0.5, 
      });
    }

    setStars(newStars);
  };

  const generateMeteors = () => {
    const numberOfMeteors = 8;
    const newMeteors = [];

    for (let i = 0; i < numberOfMeteors; i++) {
      let x, y, delay;
      let validPosition = false;
      let attempts = 0;

      while (!validPosition && attempts < 50) {
        x = Math.random() * 100;
        y = Math.random() * 20 + 2; // Keep meteors in upper region
        delay = Math.random() * 15;
        validPosition = true;

        // Check distance/timing against existing meteors to prevent "clumping"
        for (const meteor of newMeteors) {
          const dx = meteor.x - x;
          const dy = meteor.y - y;
          const dDelay = Math.abs(meteor.delay - delay);
          
          // Avoid spatial clustering (distance < 10%) AND temporal clustering (delay < 2s)
          if ((dx * dx + dy * dy < 100) || dDelay < 1.5) { 
            validPosition = false;
            break;
          }
        }
        attempts++;
      }

      // Fallback if no valid position found
      if (!validPosition) {
        x = Math.random() * 100;
        y = Math.random() * 20 + 2;
        delay = Math.random() * 15;
      }

      newMeteors.push({
        id: i,
        size: Math.random() * 2 + 2,
        x: x,
        y: y,
        delay: delay,
        animationDuration: Math.random() * 3 + 5,
      });
    }

    setMeteors(newMeteors);
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="star animate-pulse-subtle"
          style={{
            width: star.size + "px",
            height: star.size + "px",
            left: star.x + "%",
            top: star.y + "%",
            opacity: star.opacity,
            animationDuration: star.animationDuration + "s",
            // Apply parallax translation based on mouse position and star speed
            transform: `translate(calc(var(--mouse-x, 0px) * ${star.speed}), calc(var(--mouse-y, 0px) * ${star.speed}))`,
            transition: "transform 0.1s ease-out", // Smooth out the movement slightly
          }}
        />
      ))}

      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor animate-meteor"
          style={{
            width: meteor.size * 2 + "px",
            height: meteor.size * 2 + "px",
            left: meteor.x + "%",
            top: meteor.y + "%",
            animationDelay: meteor.delay,
            animationDuration: meteor.animationDuration + "s",
          }}
        />
      ))}
    </div>
  );
};