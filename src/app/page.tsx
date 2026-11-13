import CloneHeader from "@/components/davemiye/CloneHeader";
import IntroSection from "@/components/davemiye/IntroSection";
import ProjectRail from "@/components/davemiye/ProjectRail";
import ExperienceSection from "@/components/davemiye/ExperienceSection";
import ContactFooter from "@/components/davemiye/ContactFooter";

export default function Home() {
  return <><CloneHeader /><main><IntroSection /><ProjectRail /><ExperienceSection /></main><ContactFooter /><aside className="dm-section-nav" aria-label="Sections"><a href="#intro">01<br /><span>About me</span></a><a href="#work">02<br /><span>Featured projects</span></a><a href="#experience">03<br /><span>Experience</span></a><a href="#contact">04<br /><span>Say hello</span></a></aside></>;
}
