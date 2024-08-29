import { NeonGradientCard } from "./NeonGradientCard";

export function FullNeonCard() {
  return (
    <NeonGradientCard className="max-w-xl mt-2 mx-auto items-center justify-center text-center">
      <span className="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#c640ff] from-35% to-[#4089ff] bg-clip-text text-center text-xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
        Create and Store all of your Articles.
      </span>
    </NeonGradientCard>
  );
}
