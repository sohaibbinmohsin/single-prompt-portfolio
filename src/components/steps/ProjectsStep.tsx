import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { PortfolioData, Project } from '../../types';
import { ProjectCard } from '../ProjectCard';
import { ProjectForm } from '../ProjectForm';

interface ProjectsStepProps {
  data: PortfolioData;
  onChange: (data: Partial<PortfolioData>) => void;
  errors: Record<string, string>;
}

export const ProjectsStep: React.FC<ProjectsStepProps> = ({ data, onChange, errors }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();

  const handleSaveProject = (project: Project) => {
    if (editingProject) {
      const updatedProjects = data.projects.map(p => 
        p.id === project.id ? project : p
      );
      onChange({ projects: updatedProjects });
    } else {
      onChange({ projects: [...data.projects, project] });
    }
    setShowForm(false);
    setEditingProject(undefined);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDeleteProject = (projectId: string) => {
    onChange({ 
      projects: data.projects.filter(p => p.id !== projectId) 
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-black mb-2">Showcase your projects</h2>
        <p className="text-cinereous">Add 1-3 of your best projects to highlight your skills</p>
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-bistre">
          Projects ({data.projects.length}/3)
        </h3>
        <button
          onClick={() => setShowForm(true)}
          disabled={data.projects.length >= 3}
          className="inline-flex items-center gap-2 px-4 py-2 bg-black text-snow rounded-lg font-semibold hover:bg-bistre transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {errors.projects && (
        <p className="text-red-500 text-sm">{errors.projects}</p>
      )}

      {data.projects.length === 0 ? (
        <div className="text-center py-12 bg-almond/20 rounded-lg border-2 border-dashed border-cinereous/30">
          <p className="text-cinereous mb-4">No projects added yet</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-black text-snow px-6 py-2 rounded-lg font-semibold hover:bg-bistre transition-colors duration-200"
          >
            Add Your First Project
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {data.projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={() => handleEditProject(project)}
              onDelete={() => handleDeleteProject(project.id)}
            />
          ))}
        </div>
      )}

      {showForm && (
        <ProjectForm
          project={editingProject}
          onSave={handleSaveProject}
          onCancel={() => {
            setShowForm(false);
            setEditingProject(undefined);
          }}
        />
      )}
    </div>
  );
};