import React from 'react';
import { ExternalLink, User, Briefcase, Code, Award, Mail, Edit, AlertCircle } from 'lucide-react';
import { PortfolioData } from '../../types';

interface ReviewStepProps {
  data: PortfolioData;
  onEditStep: (step: number) => void;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({ data, onEditStep }) => {
  const getRecommendations = () => {
    const recommendations = [];
    
    if (!data.location) {
      recommendations.push("Add your location to help potential clients/employers know where you're based");
    }
    
    if (!data.profilePicture) {
      recommendations.push("Add a professional profile picture to make your portfolio more personal");
    }
    
    if (data.themeColors.length === 0) {
      recommendations.push("Add brand colors to make your portfolio visually unique and memorable");
    }
    
    if (!data.awards || data.awards.length === 0) {
      recommendations.push("Add awards or certifications to showcase your achievements");
    }
    
    if (!data.resume) {
      recommendations.push("Add a resume/CV link to make it easy for employers to learn more about you");
    }
    
    const socialCount = Object.values(data.socials).filter(url => url).length;
    if (socialCount < 2) {
      recommendations.push("Add more social links (LinkedIn, GitHub, etc.) to increase your online presence");
    }
    
    if (data.projects.length < 2) {
      recommendations.push("Add more projects (2-3 recommended) to better showcase your skills");
    }

    return recommendations;
  };

  const recommendations = getRecommendations();

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-black mb-2">Review Your Information</h2>
        <p className="text-cinereous">Make sure everything looks good before generating your portfolio</p>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="bg-almond/30 border-2 border-almond rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-bistre" />
            <h3 className="text-lg font-semibold text-black">Recommendations for Better Results</h3>
          </div>
          <ul className="space-y-2">
            {recommendations.map((rec, index) => (
              <li key={index} className="text-sm text-bistre flex items-start gap-2">
                <span className="text-almond-600 mt-1">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-snow border-2 border-cinereous/20 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <User className="w-6 h-6 text-black" />
            <h3 className="text-lg font-semibold text-black">Basic Information</h3>
          </div>
          <button
            onClick={() => onEditStep(0)}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm text-cinereous hover:text-black hover:bg-almond rounded-lg transition-all duration-200"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-bistre">Name:</span>
            <span className="ml-2 text-black">{data.name}</span>
          </div>
          <div>
            <span className="font-medium text-bistre">Title:</span>
            <span className="ml-2 text-black">{data.title}</span>
          </div>
          <div>
            <span className="font-medium text-bistre">Portfolio Type:</span>
            <span className="ml-2 text-black">{data.portfolioType}</span>
          </div>
          <div>
            <span className="font-medium text-bistre">Design Style:</span>
            <span className="ml-2 text-black">{data.designStyle}</span>
          </div>
          {data.location && (
            <div>
              <span className="font-medium text-bistre">Location:</span>
              <span className="ml-2 text-black">{data.location}</span>
            </div>
          )}
          {data.themeColors.length > 0 && (
            <div>
              <span className="font-medium text-bistre">Theme Colors:</span>
              <span className="ml-2 text-black">{data.themeColors.join(', ')}</span>
            </div>
          )}
        </div>
        
        <div className="mt-4">
          <span className="font-medium text-bistre">Bio:</span>
          <p className="mt-1 text-black text-sm">{data.bio}</p>
        </div>
      </div>

      <div className="bg-snow border-2 border-cinereous/20 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Briefcase className="w-6 h-6 text-black" />
            <h3 className="text-lg font-semibold text-black">Projects ({data.projects.length})</h3>
          </div>
          <button
            onClick={() => onEditStep(1)}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm text-cinereous hover:text-black hover:bg-almond rounded-lg transition-all duration-200"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
        </div>
        
        <div className="space-y-4">
          {data.projects.map((project, index) => (
            <div key={project.id} className="bg-almond/20 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-black">{project.title}</h4>
                {project.link && (
                  <ExternalLink className="w-4 h-4 text-cinereous" />
                )}
              </div>
              <p className="text-sm text-bistre mb-2">{project.summary}</p>
              <div className="flex flex-wrap gap-1">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="px-2 py-1 bg-almond text-bistre text-xs rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-snow border-2 border-cinereous/20 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Code className="w-6 h-6 text-black" />
            <h3 className="text-lg font-semibold text-black">Skills ({data.skills.length})</h3>
          </div>
          <button
            onClick={() => onEditStep(2)}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm text-cinereous hover:text-black hover:bg-almond rounded-lg transition-all duration-200"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, index) => (
            <span key={index} className="px-3 py-1 bg-almond text-bistre text-sm rounded-full">
              {skill}
            </span>
          ))}
        </div>

        {data.awards && data.awards.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium text-bistre mb-2">Awards & Certifications:</h4>
            <div className="flex flex-wrap gap-2">
              {data.awards.map((award, index) => (
                <span key={index} className="px-3 py-1 bg-almond/50 text-bistre text-sm rounded-full">
                  {award}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-snow border-2 border-cinereous/20 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Mail className="w-6 h-6 text-black" />
            <h3 className="text-lg font-semibold text-black">Contact & Social</h3>
          </div>
          <button
            onClick={() => onEditStep(3)}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm text-cinereous hover:text-black hover:bg-almond rounded-lg transition-all duration-200"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
        </div>
        
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium text-bistre">Contact:</span>
            <span className="ml-2 text-black">{data.contactMethod}</span>
          </div>
          {data.resume && (
            <div>
              <span className="font-medium text-bistre">Resume:</span>
              <span className="ml-2 text-black">{data.resume}</span>
            </div>
          )}
          {Object.entries(data.socials).filter(([, url]) => url).map(([platform, url]) => (
            <div key={platform}>
              <span className="font-medium text-bistre capitalize">{platform}:</span>
              <span className="ml-2 text-black">{url}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};