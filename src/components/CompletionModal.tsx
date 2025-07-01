import React from 'react';
import { X, ExternalLink, Copy, CheckCircle } from 'lucide-react';
import { PortfolioData } from '../types';

interface CompletionModalProps {
  data: PortfolioData;
  onClose: () => void;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({ data, onClose }) => {
  const generatePrompt = () => {
    const prompt = `Generate a ${data.portfolioType} portfolio website for ${data.name}, a ${data.title}${data.location ? ` based in ${data.location}` : ''}.

Use a ${data.designStyle} theme. ${data.themeColors.length > 0 ? `Highlight brand colors like ${data.themeColors.join(" and ")}.` : ''}
Include a short personal bio: "${data.bio}".

Showcase the following ${data.projects.length} project${data.projects.length !== 1 ? 's' : ''}:
${data.projects.map((p, i) => `${i + 1}. "${p.title}" – ${p.summary}. Role: ${p.role}. Technologies: ${p.technologies.join(", ")}.${p.link ? ` Link: ${p.link}` : ""}`).join("\n")}

Display a skills section with: ${data.skills.join(", ")}.
${data.awards && data.awards.length > 0 ? `Add an awards/certifications section: ${data.awards.join(", ")}.\n` : ""}
Add these social links:
${Object.entries(data.socials).filter(([, url]) => url).map(([platform, url]) => `- ${platform}: ${url}`).join("\n")}

Preferred contact method: ${data.contactMethod}.
${data.resume ? `Include a resume download link: ${data.resume}.\n` : ""}
${data.testimonials && data.testimonials.length > 0 ? `Include testimonials: ${data.testimonials.map(t => `"${t.quote}" – ${t.name}, ${t.company}`).join("; ")}.` : ""}

Ensure the site feels clean, engaging, and well-structured.`;

    return prompt;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatePrompt());
  };

  const steps = [
    {
      title: "Copy the Prompt",
      description: "Copy the generated prompt above to your clipboard"
    },
    {
      title: "Open Bolt.new",
      description: "Visit bolt.new and paste the prompt",
      link: "https://bolt.new"
    },
    {
      title: "Generate Your Portfolio",
      description: "Let Bolt.new create your beautiful portfolio website"
    },
    {
      title: "Deploy to Netlify",
      description: "Deploy your portfolio for free using Netlify",
      link: "https://www.netlify.com/"
    },
    {
      title: "Connect Custom Domain",
      description: "Connect your own domain to make it professional",
      link: "https://docs.netlify.com/domains-https/custom-domains/"
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-snow rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-black mb-2">🎉 Your Portfolio is Ready!</h2>
            <p className="text-cinereous">Follow these steps to bring your portfolio to life</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-cinereous hover:text-black hover:bg-almond rounded-lg transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Generated Prompt */}
        <div className="bg-almond/30 border-2 border-almond rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-black mb-4">Generated Bolt.new Prompt</h3>
          <div className="bg-snow rounded-lg p-4 mb-4 max-h-64 overflow-y-auto">
            <pre className="text-sm text-bistre whitespace-pre-wrap font-mono">
              {generatePrompt()}
            </pre>
          </div>
          <button
            onClick={copyToClipboard}
            className="w-full bg-black text-snow py-3 rounded-lg font-semibold hover:bg-bistre transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Copy className="w-4 h-4" />
            Copy Prompt to Clipboard
          </button>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-black">Next Steps</h3>
          {steps.map((step, index) => (
            <div key={index} className="flex gap-4 p-4 bg-snow border-2 border-cinereous/20 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-black text-snow rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-black mb-1">{step.title}</h4>
                <p className="text-sm text-bistre mb-2">{step.description}</p>
                {step.link && (
                  <a
                    href={step.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-black hover:text-bistre font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit {step.link}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Publishing Guide */}
        <div className="mt-8 p-6 bg-almond/20 rounded-lg border border-cinereous/20">
          <h3 className="text-lg font-semibold text-black mb-4">📚 Publishing Guide</h3>
          <div className="space-y-3 text-sm text-bistre">
            <div>
              <strong>Free Hosting:</strong> Use Netlify, Vercel, or GitHub Pages for free hosting
            </div>
            <div>
              <strong>Custom Domain:</strong> Purchase a domain from Namecheap, GoDaddy, or Google Domains
            </div>
            <div>
              <strong>SSL Certificate:</strong> Most hosting providers include free SSL certificates
            </div>
            <div>
              <strong>Analytics:</strong> Add Google Analytics to track your portfolio visitors
            </div>
          </div>
        </div>

        {/* Credits */}
        <div className="mt-8 pt-6 border-t border-cinereous/20 text-center">
          <p className="text-sm text-cinereous mb-2">
            Portfolio Generator created by{' '}
            <a 
              href="https://sohaibbinmohsin.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-black hover:text-bistre font-medium"
            >
              Sohaib Bin Mohsin
            </a>
          </p>
          <p className="text-xs text-cinereous">
            Need custom website development?{' '}
            <a 
              href="https://www.upwork.com/freelancers/~01a30022b789bde8cc?mp_source=share" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-black hover:text-bistre"
            >
              Hire me on Upwork
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};