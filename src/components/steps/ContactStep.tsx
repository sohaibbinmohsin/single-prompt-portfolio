import React from 'react';
import { FormInput } from '../FormInput';
import { PortfolioData } from '../../types';

interface ContactStepProps {
  data: PortfolioData;
  onChange: (data: Partial<PortfolioData>) => void;
  errors: Record<string, string>;
}

export const ContactStep: React.FC<ContactStepProps> = ({ data, onChange, errors }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-black mb-2">Connect & Contact</h2>
        <p className="text-cinereous">Add your social links and contact information</p>
      </div>

      <FormInput
        label="Primary Contact Method"
        value={data.contactMethod}
        onChange={(value) => onChange({ contactMethod: value })}
        placeholder="john@example.com or https://calendly.com/john"
        required
        error={errors.contactMethod}
      />

      <FormInput
        label="Resume/CV URL"
        value={data.resume || ''}
        onChange={(value) => onChange({ resume: value })}
        placeholder="https://drive.google.com/file/d/..."
        type="url"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="LinkedIn"
          value={data.socials.linkedin || ''}
          onChange={(value) => onChange({ 
            socials: { ...data.socials, linkedin: value } 
          })}
          placeholder="https://linkedin.com/in/johndoe"
          type="url"
        />

        <FormInput
          label="GitHub"
          value={data.socials.github || ''}
          onChange={(value) => onChange({ 
            socials: { ...data.socials, github: value } 
          })}
          placeholder="https://github.com/johndoe"
          type="url"
        />

        <FormInput
          label="Twitter"
          value={data.socials.twitter || ''}
          onChange={(value) => onChange({ 
            socials: { ...data.socials, twitter: value } 
          })}
          placeholder="https://twitter.com/johndoe"
          type="url"
        />

        <FormInput
          label="Personal Website"
          value={data.socials.portfolio || ''}
          onChange={(value) => onChange({ 
            socials: { ...data.socials, portfolio: value } 
          })}
          placeholder="https://johndoe.com"
          type="url"
        />
      </div>
    </div>
  );
};