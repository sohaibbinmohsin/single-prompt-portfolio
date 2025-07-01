import React, { useState } from 'react';
import { Project } from '../types';
import { FormInput } from './FormInput';
import { TagInput } from './TagInput';
import { X } from 'lucide-react';

interface ProjectFormProps {
  project?: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  project,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState<Project>(
    project || {
      id: Date.now().toString(),
      title: '',
      summary: '',
      role: '',
      technologies: [],
      link: '',
      image: ''
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.summary && formData.role && formData.technologies.length > 0) {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-snow rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-black">
            {project ? 'Edit Project' : 'Add New Project'}
          </h3>
          <button
            onClick={onCancel}
            className="p-2 text-cinereous hover:text-black hover:bg-almond rounded-lg transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <FormInput
            label="Project Title"
            value={formData.title}
            onChange={(value) => setFormData({ ...formData, title: value })}
            placeholder="My Amazing Project"
            required
          />

          <FormInput
            label="Summary"
            value={formData.summary}
            onChange={(value) => setFormData({ ...formData, summary: value })}
            placeholder="Brief description of what this project does..."
            multiline
            rows={4}
            required
          />

          <FormInput
            label="Your Role"
            value={formData.role}
            onChange={(value) => setFormData({ ...formData, role: value })}
            placeholder="Frontend Developer, Designer, etc."
            required
          />

          <TagInput
            label="Technologies Used"
            values={formData.technologies}
            onChange={(values) => setFormData({ ...formData, technologies: values })}
            placeholder="React, TypeScript, etc."
            required
          />

          <FormInput
            label="Project Link"
            value={formData.link || ''}
            onChange={(value) => setFormData({ ...formData, link: value })}
            placeholder="https://myproject.com"
            type="url"
          />

          <FormInput
            label="Project Image URL"
            value={formData.image || ''}
            onChange={(value) => setFormData({ ...formData, image: value })}
            placeholder="https://example.com/image.jpg"
            type="url"
          />

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-black text-snow py-3 rounded-lg font-semibold hover:bg-bistre transition-colors duration-200"
            >
              {project ? 'Update Project' : 'Add Project'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-cinereous/20 text-bistre py-3 rounded-lg font-semibold hover:bg-cinereous/30 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};