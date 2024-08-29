import { ChevronRight } from "lucide-react";

import { cn } from "../../../utils/classes";
import AnimatedGradientText from "./AnimatedGradient";

export function AnimatedText() {
  return (
    <div className="z-10 flex  items-center justify-center">
      <AnimatedGradientText className={cn("text-2xl font-bold")}>
        
        <span
          className={cn(
            `inline animate-gradient bg-gradient-to-r from-[#c640ff] via-[#6408c6] to-[#4089ff] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
          )}
        >
          ArticleElevator
        </span>
        
        </AnimatedGradientText>
    </div>
  );
}
