const experience = [
  ["Edufyi Tech Solutions", "DevOps Trainee", "Sep 2026 – Present"],
  ["Teachnook", "Data Science Intern Training", "2024"],
] as const;

export default function ExperienceSection() {
  return (
    <section id="experience" className="dm-section" aria-labelledby="experience-title">
      <div className="dm-narrow-column">
        <h2 id="experience-title">Experience</h2>
        <ol className="dm-jobs">
          {experience.map(([company, role, time]) => (
            <li className="dm-job" key={company}>
              <span className="dm-job-company">{company}</span>
              <span className="dm-job-role">{role}</span>
              <time className="dm-job-time">{time}</time>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
