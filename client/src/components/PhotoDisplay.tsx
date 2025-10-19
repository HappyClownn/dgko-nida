import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface PhotoDisplayProps {
  imageUrl: string;
  currentZoomLevel: number;
  maxZoomLevel: number;
  points: number[];
}

const zoomScales = [1, 1, 1, 1, 1];
const blurLevels = [0, 4, 4, 2, 0];

export default function PhotoDisplay({
  imageUrl,
  currentZoomLevel,
  maxZoomLevel,
  points,
}: PhotoDisplayProps) {
  const scale = zoomScales[currentZoomLevel - 1] || 1;
  const blur = blurLevels[currentZoomLevel - 1] || 0;
  const currentPoints = points[currentZoomLevel - 1] || 0;

  const getZoomLevelColor = (level: number) => {
    if (level === 1) return "bg-zoom-max text-white";
    if (level <= 2) return "bg-zoom-mid text-white";
    return "bg-zoom-min text-white";
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* Zoom Level Indicator */}
      <div className="flex items-center gap-3">
        {Array.from({ length: maxZoomLevel }).map((_, idx) => {
          const level = idx + 1;
          const isActive = level === currentZoomLevel;
          const isPassed = level < currentZoomLevel;

          return (
            <div key={level} className="flex flex-col items-center gap-2">
              <div
                className={`relative w-12 h-12 rounded-md border-2 flex items-center justify-center font-display text-lg transition-all ${
                  isActive
                    ? `${getZoomLevelColor(level)} border-white scale-110`
                    : isPassed
                    ? "bg-muted border-border opacity-50"
                    : "bg-card border-border"
                }`}
              >
                {level}
              </div>
              <Badge
                variant={isActive ? "default" : "outline"}
                className={`text-xs font-bold ${isActive ? getZoomLevelColor(level) : ""}`}
              >
                {points[idx]}pt
              </Badge>
            </div>
          );
        })}
      </div>

      {/* Photo Display */}
      <div className="relative w-full max-w-4xl aspect-video bg-white rounded-lg overflow-hidden shadow-xl">
        <motion.div
          key={currentZoomLevel}
          className="w-full h-full"
          initial={{ scale: scale * 1.1, filter: `blur(${blur + 0}px)` }}
          animate={{ scale, filter: `blur(${blur}px)` }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <img
            src={imageUrl}
            alt="Mystery photo"
            className="w-full h-full object-cover"
            style={{ transformOrigin: "center center" }}
          />
        </motion.div>

        {/* Current Points Overlay */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 right-4"
        >
          <Badge className={`${getZoomLevelColor(currentZoomLevel)} text-2xl px-6 py-3 font-display shadow-lg`}>
            {currentPoints} Puan
          </Badge>
        </motion.div>
      </div>
    </div>
  );
}
