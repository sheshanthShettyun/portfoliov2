import CloneHeader from "@/components/davemiye/CloneHeader";
import IntroSection from "@/components/davemiye/IntroSection";
import ProjectRail from "@/components/davemiye/ProjectRail";
import ExperienceSection from "@/components/davemiye/ExperienceSection";
import ContactFooter from "@/components/davemiye/ContactFooter";
import SmoothCursor from "@/components/davemiye/SmoothCursor";

export default function Home() {
  return <div className="dm-site-frame"><CloneHeader /><main><IntroSection /><ProjectRail /><ExperienceSection /></main><ContactFooter /><SmoothCursor /></div>;
}
