import React, { useState, useEffect } from "react";
import { SITE_CONTENT } from "../content";
import type { Project } from "../types";
import CloseIcon from "./icons/CloseIcon";

const ProjectCard: React.FC<{ project: Project; onSelect: () => void }> = ({
  project,
  onSelect,
}) => {
  return (
    <button
      onClick={onSelect}
      className="group relative overflow-hidden rounded-lg shadow-lg text-left w-full block fade-in focus-visible"
    >
      <img
        src={project.image.src}
        srcSet={project.image.srcSet}
        sizes={project.image.sizes}
        alt={project.title}
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-6">
        <p className="text-blue-400 font-semibold text-sm mb-1">
          {project.category}
        </p>
        <h3 className="text-2xl font-bold text-white">{project.title}</h3>
      </div>
    </button>
  );
};

const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({
  project,
  onClose,
}) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 modal-fade"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative modal-fade"
        onClick={handleContentClick}
        style={{ animationDuration: "0.5s" }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-500 hover:text-slate-800 transition-colors z-10 p-1 bg-white/50 rounded-full focus-visible"
          aria-label={SITE_CONTENT.projects.modal.closeButtonLabel}
        >
          <CloseIcon className="w-6 h-6" />
        </button>
        <img
          src={project.image.src}
          srcSet={project.image.srcSet}
          sizes={project.image.sizes}
          alt={project.title}
          className="w-full h-full md:h-full object-cover rounded-t-lg"
        />
        <div className="p-6 md:p-8">
          <p className="text-blue-500 font-semibold mb-2">{project.category}</p>
          <h2
            id="project-modal-title"
            className="text-3xl font-bold text-slate-900 mb-4"
          >
            {project.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-600 mb-6 border-b border-t border-slate-200 py-4">
            <div>
              <strong className="block text-slate-800">
                {SITE_CONTENT.projects.modal.clientLabel}
              </strong>
              <span>{project.client}</span>
            </div>
            <div>
              <strong className="block text-slate-800">
                {SITE_CONTENT.projects.modal.locationLabel}
              </strong>
              <span>{project.location}</span>
            </div>
          </div>
          <p className="text-slate-600 leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    "All",
    ...Array.from(new Set(SITE_CONTENT.projects.items.map((p) => p.category))),
  ];

  const filteredProjects =
    activeFilter === "All"
      ? SITE_CONTENT.projects.items
      : SITE_CONTENT.projects.items.filter(
          (project) => project.category === activeFilter
        );

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "auto";
  }, [selectedProject]);

  return (
    <>
      <section id="projects" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-slate-900">
              {SITE_CONTENT.projects.title}
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              {SITE_CONTENT.projects.subtitle}
            </p>
            <div className="mt-4 mx-auto w-24 h-1 bg-blue-500 rounded"></div>
          </div>

          <div className="flex justify-center flex-wrap gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2 font-semibold rounded-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 ${
                  activeFilter === category
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-blue-100 hover:text-blue-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={`${project.title}-${index}`}
                project={project}
                onSelect={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      </section>
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};

export default Projects;
