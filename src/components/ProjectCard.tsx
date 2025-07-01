import React from 'react';
import { Edit, Trash2, ExternalLink } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onEdit: () => void;
  onDelete: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  onEdit, 
  onDelete 
}) => {
  return (
    <div className="bg-snow border-2 border-cinereous/20 rounded-lg p-6 hover:border-cinereous/40 transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-black mb-2">{project.title}</h3>
          <p className="text-sm text-bistre font-medium mb-2">{project.role}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="p-2 text-cinereous hover:text-black hover:bg-almond rounded-lg transition-all duration-200"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-cinereous hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-sm text-bistre mb-4 line-clamp-3">{project.summary}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech, index) => (
          <span 
            key={index}
            className="px-2 py-1 bg-almond/50 text-bistre text-xs font-medium rounded"
          >
            {tech}
          </span>
        ))}
      </div>

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-black hover:text-bistre font-medium"
        >
          <ExternalLink className="w-4 h-4" />
          View Project
        </a>
      )}
    </div>
  );
};