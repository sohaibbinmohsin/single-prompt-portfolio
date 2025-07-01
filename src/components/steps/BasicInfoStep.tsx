import React from 'react';
import { FormInput } from '../FormInput';
import { FormSelect } from '../FormSelect';
import { TagInput } from '../TagInput';
import { PortfolioData } from '../../types';
import { Palette } from 'lucide-react';

interface BasicInfoStepProps {
  data: PortfolioData;
  onChange: (data: Partial<PortfolioData>) => void;
  errors: Record<string, string>;
}

export const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ data, onChange, errors }) => {
  const portfolioTypes = [
    { value: 'Personal', label: 'Personal Portfolio' },
    { value: 'Freelancer', label: 'Freelancer Portfolio' },
    { value: 'Startup', label: 'Startup Portfolio' },
    { value: 'Resume', label: 'Resume/CV Style' },
    { value: 'Case Study', label: 'Case Study Portfolio' }
  ];

  const designStyles = [
    { value: 'Minimal', label: 'Minimal & Clean' },
    { value: 'Dark', label: 'Dark & Modern' },
    { value: 'Professional', label: 'Professional & Corporate' },
    { value: 'Playful', label: 'Playful & Creative' },
    { value: 'Surprise', label: 'Surprise Me!' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-black mb-2">Let's start with the basics</h2>
        <p className="text-cinereous">Tell us about yourself and your portfolio preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Full Name"
          value={data.name}
          onChange={(value) => onChange({ name: value })}
          placeholder="John Doe"
          required
          error={errors.name}
        />

        <FormInput
          label="Professional Title"
          value={data.title}
          onChange={(value) => onChange({ title: value })}
          placeholder="Frontend Developer"
          required
          error={errors.title}
        />
      </div>

      <FormInput
        label="Bio"
        value={data.bio}
        onChange={(value) => onChange({ bio: value })}
        placeholder="Tell us about yourself in 2-3 sentences..."
        multiline
        rows={4}
        required
        error={errors.bio}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Location"
          value={data.location || ''}
          onChange={(value) => onChange({ location: value })}
          placeholder="San Francisco, CA"
        />

        <FormInput
          label="Profile Picture URL"
          value={data.profilePicture || ''}
          onChange={(value) => onChange({ profilePicture: value })}
          placeholder="https://example.com/profile.jpg"
          type="url"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormSelect
          label="Portfolio Type"
          value={data.portfolioType}
          onChange={(value) => onChange({ portfolioType: value as any })}
          options={portfolioTypes}
          required
          error={errors.portfolioType}
        />

        <FormSelect
          label="Design Style"
          value={data.designStyle}
          onChange={(value) => onChange({ designStyle: value as any })}
          options={designStyles}
          required
          error={errors.designStyle}
        />
      </div>

      {/* Color Theme Section */}
      <div className="bg-almond/20 p-6 rounded-lg border border-cinereous/20">
        <div className="flex items-center gap-2 mb-4">
          <Palette className="w-5 h-5 text-black" />
          <h3 className="text-lg font-semibold text-black">Brand Colors (Optional)</h3>
        </div>
        <p className="text-sm text-bistre mb-4">
          Add your brand colors to make your portfolio unique. We recommend using{' '}
          <a 
            href="https://coolors.co" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-black hover:text-bistre font-medium underline"
          >
            Coolors.co
          </a>
          {' '}to generate beautiful color palettes.
        </p>
        <TagInput
          label="Theme Colors"
          values={data.themeColors}
          onChange={(values) => onChange({ themeColors: values })}
          placeholder="#3B82F6, Blue, rgb(59, 130, 246)"
        />
        <p className="text-xs text-cinereous mt-2">
          You can use hex codes (#3B82F6), color names (Blue), or RGB values
        </p>
      </div>
    </div>
  );
};