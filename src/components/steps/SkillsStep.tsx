import React from 'react';
import { TagInput } from '../TagInput';
import { FormInput } from '../FormInput';
import { PortfolioData } from '../../types';

interface SkillsStepProps {
  data: PortfolioData;
  onChange: (data: Partial<PortfolioData>) => void;
  errors: Record<string, string>;
}

export const SkillsStep: React.FC<SkillsStepProps> = ({ data, onChange, errors }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-black mb-2">Skills & Achievements</h2>
        <p className="text-cinereous">Highlight your expertise and accomplishments</p>
      </div>

      <TagInput
        label="Skills & Technologies"
        values={data.skills}
        onChange={(values) => onChange({ skills: values })}
        placeholder="React, TypeScript, Design, etc."
        required
        error={errors.skills}
      />

      <TagInput
        label="Awards & Certifications"
        values={data.awards || []}
        onChange={(values) => onChange({ awards: values })}
        placeholder="Best Design Award, AWS Certified, etc."
      />

      <div className="bg-almond/20 p-6 rounded-lg border border-cinereous/20">
        <h3 className="text-lg font-semibold text-bistre mb-4">💡 Tips for Skills</h3>
        <ul className="text-sm text-bistre space-y-2">
          <li>• Include both technical skills (React, Python) and soft skills (Leadership, Communication)</li>
          <li>• Add specific technologies, frameworks, and tools you're proficient in</li>
          <li>• Consider including certifications, awards, or notable achievements</li>
          <li>• Keep it relevant to your target audience and career goals</li>
        </ul>
      </div>
    </div>
  );
};