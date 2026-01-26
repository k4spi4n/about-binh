import { useEffect, useState } from "react";
import PropTypes from "prop-types"; // 1. Import PropTypes
import { cn } from "@/lib/utils";

export const LoadingScreen = ({ onComplete, duration = 1000 }) => {
  // 2. Sửa lỗi 1: Bỏ setLoadingText vì không dùng đến
  const [loadingText] = useState("Travelling to star");

  const [dots, setDots] = useState("");
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    // Progress bar animation
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (elapsed >= duration) {
        clearInterval(progressInterval);
      }
    }, 16); // ~60fps

    // Completion timer
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        onComplete && onComplete();
      }, 800); // Wait for exit animation
    }, duration);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [onComplete, duration]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030014] transition-opacity duration-700",
        isExiting ? "opacity-0 pointer-events-none" : "opacity-100",
      )}
    >
      {/* Background Grid Effect */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>

      <div className="relative w-64 h-64 flex items-center justify-center scale-75 md:scale-100">
        {/* Outer Orbit */}
        <div className="absolute w-full h-full rounded-full border border-primary/20 animate-[spin_10s_linear_infinite]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full shadow-[0_0_15px_#8b5cf6]"></div>
        </div>

        {/* Middle Orbit */}
        <div className="absolute w-48 h-48 rounded-full border border-fuchsia-500/20 animate-[spin_7s_linear_infinite_reverse]">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-fuchsia-500 rounded-full shadow-[0_0_15px_#d946ef]"></div>
        </div>

        {/* Inner Orbit */}
        <div className="absolute w-32 h-32 rounded-full border border-cyan-500/20 animate-[spin_4s_linear_infinite]">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_15px_#06b6d4]"></div>
        </div>

        {/* Central Core */}
        <div className="relative w-16 h-16 bg-black rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(139,92,246,0.5)]">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary to-fuchsia-600 rounded-full animate-pulse opacity-80 blur-sm"></div>
          <div className="relative w-12 h-12 bg-[#030014] rounded-full z-10 flex items-center justify-center overflow-hidden">
            {/* Core inner rotation */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-primary/30 to-transparent animate-[spin_2s_linear_infinite]"></div>
          </div>
        </div>
      </div>

      {/* Loading Text */}
      <div className="mt-12 space-y-2 text-center z-10">
        <h2 className="text-xl md:text-2xl font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-primary via-fuchsia-400 to-cyan-400 animate-pulse">
          {loadingText}
          {dots}
        </h2>
        <div className="h-1 w-64 mx-auto bg-secondary/30 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-500 transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 blur-[2px]"></div>
          </div>
        </div>
        <div className="flex justify-between w-64 mx-auto text-[10px] text-muted-foreground font-mono mt-1">
          <span>SYSTEM_CHECK</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
};

// 3. Sửa lỗi 2: Thêm PropTypes validation
LoadingScreen.propTypes = {
  onComplete: PropTypes.func,
  duration: PropTypes.number,
};
