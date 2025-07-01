import { PortfolioData } from '../types';

export const useFormValidation = () => {
  const validateStep = (step: number, data: PortfolioData) => {
    const errors: Record<string, string> = {};

    switch (step) {
      case 0: // Basic Info
        if (!data.name.trim()) errors.name = 'Name is required';
        if (!data.title.trim()) errors.title = 'Professional title is required';
        if (!data.bio.trim()) errors.bio = 'Bio is required';
        if (!data.portfolioType) errors.portfolioType = 'Portfolio type is required';
        if (!data.designStyle) errors.designStyle = 'Design style is required';
        break;

      case 1: // Projects
        if (data.projects.length === 0) {
          errors.projects = 'At least one project is required';
        }
        break;

      case 2: // Skills
        if (data.skills.length === 0) {
          errors.skills = 'At least one skill is required';
        }
        break;

      case 3: // Contact
        if (!data.contactMethod.trim()) {
          errors.contactMethod = 'Contact method is required';
        }
        break;
    }

    return errors;
  };

  const isStepValid = (step: number, data: PortfolioData) => {
    const errors = validateStep(step, data);
    return Object.keys(errors).length === 0;
  };

  return { validateStep, isStepValid };
};