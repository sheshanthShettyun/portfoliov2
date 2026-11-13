import Link from "next/link";

const projects = {
  flavorinsight: { title: "FlavorInsight", meta: "AI RAG · Shipped", description: "A local AI review analyzer that turns 4,318 Yelp reviews into useful, grounded restaurant insight without sending data to the cloud." },
  intutgpt: { title: "INTutGPT", meta: "AI RAG · In Progress", description: "A RAG-powered textbook platform designed to help students retrieve, understand, and reason through complex course material." },
} as const;

export function generateStaticParams() { return Object.keys(projects).map((slug) => ({ slug })); }

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects[slug as keyof typeof projects] ?? projects.flavorinsight;
  return <main className="dm-case-study"><Link href="/#work">← Back to work</Link><p className="dm-case-meta">{project.meta}</p><h1>{project.title}</h1><p className="dm-case-description">{project.description}</p><Link className="dm-ink-button" href="/#contact">Let’s build together <span>→</span></Link></main>;
}
