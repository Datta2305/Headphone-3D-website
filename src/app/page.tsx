import Navbar from "@/components/Navbar";
import CanvasSequence from "@/components/CanvasSequence";
import StoryOverlays from "@/components/StoryOverlays";

export default function Home() {
  return (
    <main className="bg-brand-dark min-h-screen selection:bg-brand-blue/30 selection:text-white overflow-x-hidden">
      <Navbar />

      {/* 
        This is the main scrollable container. 
        It provides the physical scroll height for the 5-part storytelling experience.
      */}
      <div className="h-[500vh]">
        {/* The sticky background canvas that plays the image sequence */}
        <CanvasSequence />

        {/* The text overlays that fade in and out based on scroll progress */}
        <StoryOverlays />
      </div>
    </main>
  );
}
