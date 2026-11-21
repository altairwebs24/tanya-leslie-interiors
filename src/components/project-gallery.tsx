import { publicStorageUrl, useStudioContent } from "@/lib/studio-content";

export function ProjectGallery({ limit }: { limit?: number }) {
  const { projects } = useStudioContent();
  const visibleProjects = typeof limit === "number" ? projects.slice(0, limit) : projects;

  return (
    <div className={`project-grid${typeof limit === "number" ? " project-grid-featured" : ""}`}>
      {visibleProjects.map((project, index) => (
        <figure className="project-item" key={`${project.title}-${project.image}`}>
          <div className="project-image-wrap">
            <img
              src={publicStorageUrl(project.image)}
              alt={`${project.title}: ${project.description}`}
              className={`project-image project-image-${index % 4}`}
              loading={index < 3 ? "eager" : "lazy"}
            />
            <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
          </div>
          <figcaption className="project-caption">
            <div>
              <p className="project-category">{project.category}</p>
              <h3>{project.title}</h3>
            </div>
            <p className="project-description">{project.description}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}