import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ExternalLink,
  ArrowRight,
  FileText,
  Copy,
  Zap,
  Globe,
  Users,
  TrendingUp,
  Play,
  X,
  CheckCircle,
} from 'lucide-react';
import { PortfolioData } from './types';
import { ProgressBar } from './components/ProgressBar';
import { BasicInfoStep } from './components/steps/BasicInfoStep';
import { ProjectsStep } from './components/steps/ProjectsStep';
import { SkillsStep } from './components/steps/SkillsStep';
import { ContactStep } from './components/steps/ContactStep';
import { ReviewStep } from './components/steps/ReviewStep';
import { CompletionModal } from './components/CompletionModal';
import { useFormValidation } from './hooks/useFormValidation';

const initialData: PortfolioData = {
  name: '',
  title: '',
  bio: '',
  location: '',
  profilePicture: '',
  portfolioType: 'Personal',
  designStyle: 'Minimal',
  themeColors: [],
  projects: [],
  skills: [],
  awards: [],
  socials: {},
  contactMethod: '',
  resume: '',
  testimonials: [],
};

const stepTitles = ['Basic Info', 'Projects', 'Skills', 'Contact', 'Review'];

const steps = [
  BasicInfoStep,
  ProjectsStep,
  SkillsStep,
  ContactStep,
  ReviewStep,
];

function App() {
  const [showForm, setShowForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<PortfolioData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const { validateStep, isStepValid } = useFormValidation();

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('portfolioFormData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }

    // Check if we should show the form based on URL
    if (
      window.location.pathname === '/form' ||
      window.location.hash === '#form'
    ) {
      setShowForm(true);
    }
  }, []);

  // Save data to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem('portfolioFormData', JSON.stringify(formData));
  }, [formData]);

  const updateFormData = (newData: Partial<PortfolioData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
    // Clear errors when user starts typing
    setErrors({});
  };

  const handleNext = () => {
    const stepErrors = validateStep(currentStep, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setErrors({});
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleComplete = () => {
    const stepErrors = validateStep(currentStep, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setShowCompletionModal(true);
  };

  const handleEditStep = (step: number) => {
    setCurrentStep(step);
    setErrors({});
  };

  const startBuilding = () => {
    setShowForm(true);
    window.history.pushState({}, '', '/form');
  };

  const backToLanding = () => {
    setShowForm(false);
    window.history.pushState({}, '', '/');
  };

  const CurrentStepComponent = steps[currentStep];

  if (showForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-almond/30 to-snow">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            {/* <button
              onClick={backToLanding}
              className="inline-flex items-center gap-2 text-cinereous hover:text-black transition-colors mb-4 justify-start"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to home
            </button> */}
            <div className="inline-flex items-center gap-2 bg-black text-snow px-4 py-2 rounded-full mb-4 cursor-pointer" onClick={backToLanding}>
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Single Prompt Portfolio</span>
            </div>
            <h1 className="text-4xl font-bold text-black mb-2">
              Create Your Perfect Portfolio
            </h1>
            <p className="text-cinereous text-lg">
              Generate a beautiful portfolio with AI in just a few steps
            </p>
          </div>

          {/* Progress Bar */}
          <ProgressBar
            currentStep={currentStep}
            totalSteps={steps.length}
            stepTitles={stepTitles}
          />

          {/* Form Content */}
          <div className="bg-snow rounded-2xl shadow-xl p-8 mb-8">
            {currentStep === steps.length - 1 ? (
              <ReviewStep data={formData} onEditStep={handleEditStep} />
            ) : (
              <CurrentStepComponent
                data={formData}
                onChange={updateFormData}
                errors={errors}
              />
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="inline-flex items-center gap-2 px-6 py-3 text-cinereous hover:text-black transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <div className="text-sm text-cinereous">
              Step {currentStep + 1} of {steps.length}
            </div>

            <button
              onClick={
                currentStep === steps.length - 1 ? handleComplete : handleNext
              }
              className="inline-flex items-center gap-2 px-8 py-3 bg-black text-snow rounded-lg font-semibold hover:bg-bistre transition-colors duration-200"
            >
              {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 space-y-4">
            {/* Built with Bolt.new Badge */}
            <div className="flex justify-center">
              <a
                href="https://bolt.new"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-black to-almond-600 text-white rounded-full text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" />
                </svg>
                Built on Bolt
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Creator Credits */}
            <div className="text-sm text-cinereous">
              <p>
                Built with ❤️ by{' '}
                <a
                  href="https://sohaibbinmohsin.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-bistre font-medium transition-colors"
                >
                  Sohaib Bin Mohsin
                </a>{' '}
                • Need custom development?{' '}
                <a
                  href="https://www.upwork.com/freelancers/~01a30022b789bde8cc?mp_source=share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-bistre font-medium transition-colors"
                >
                  Hire me on Upwork
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Completion Modal */}
        {showCompletionModal && (
          <CompletionModal
            data={formData}
            onClose={() => setShowCompletionModal(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-snow via-almond/20 to-snow">
      {/* Hero Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-black text-snow px-4 py-2 rounded-full mb-8 animate-pulse">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">
              Single Prompt Portfolio
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-black mb-6 leading-tight">
            Build your portfolio with{' '}
            <span className="bg-gradient-to-r from-bistre to-black bg-clip-text text-transparent">
              just one prompt
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-cinereous mb-12 max-w-3xl mx-auto leading-relaxed">
            We turn your story into a ready-to-use prompt for Bolt.New. Just
            fill one form, and get your personal site instantly.
          </p>

          <button
            onClick={startBuilding}
            className="inline-flex items-center gap-3 bg-black text-snow px-8 py-4 rounded-xl text-lg font-semibold hover:bg-bistre transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Start Building
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-sm text-cinereous mt-4">
            No coding required • Takes 5 minutes • Free to use
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-16 bg-almond/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-16">
            How it works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-almond rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-8 h-8 text-bistre" />
              </div>
              <div className="w-8 h-8 bg-black text-snow rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-black mb-3">
                Fill the form
              </h3>
              <p className="text-cinereous">
                Tell us about yourself, your projects, and your skills in our
                simple guided form.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-almond rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Copy className="w-8 h-8 text-bistre" />
              </div>
              <div className="w-8 h-8 bg-black text-snow rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-black mb-3">
                Get your prompt
              </h3>
              <p className="text-cinereous">
                We generate a perfect prompt that captures your unique story and
                requirements.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-almond rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-bistre" />
              </div>
              <div className="w-8 h-8 bg-black text-snow rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-black mb-3">
                Paste in Bolt.New
              </h3>
              <p className="text-cinereous">
                Copy the prompt to Bolt.New and watch your beautiful portfolio
                come to life instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Not Resume Section - Redesigned */}
      <section className="px-4 py-20 bg-gradient-to-b from-snow/50 to-almond/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-black text-center mb-4">
            Why settle for a static resume?
          </h2>
          <p className="text-xl text-cinereous text-center mb-16 max-w-3xl mx-auto">
            Stand out from the crowd with a portfolio that tells your story
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Traditional Resume Card */}
            <div className="bg-gradient-to-br from-white-100 to-white-200 p-8 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="absolute top-4 right-4 opacity-20">
                <FileText className="w-16 h-16 text-gray-500" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-almond rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold text-black">
                    Traditional Resume
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-black">
                    <X className="w-5 h-5 text-black flex-shrink-0" />
                    <span>Static PDF document</span>
                  </li>
                  <li className="flex items-center gap-3 text-black">
                    <X className="w-5 h-5 text-black flex-shrink-0" />
                    <span>Low visual appeal</span>
                  </li>
                  <li className="flex items-center gap-3 text-black">
                    <X className="w-5 h-5 text-black flex-shrink-0" />
                    <span>Hard to showcase projects</span>
                  </li>
                  <li className="flex items-center gap-3 text-black">
                    <X className="w-5 h-5 text-black flex-shrink-0" />
                    <span>Gets lost in email</span>
                  </li>
                  <li className="flex items-center gap-3 text-black">
                    <X className="w-5 h-5 text-black flex-shrink-0" />
                    <span>No interactivity</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Online Portfolio Card */}
            <div className="bg-almond p-8 rounded-2xl shadow-xl relative overflow-hidden transform hover:scale-105 transition-transform duration-300 border-2 border-black">
              <div className="absolute top-4 right-4 opacity-20">
                <Sparkles className="w-16 h-16 text-black-500" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-almond-400 to-black-500 rounded-xl flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-black">
                    Online Portfolio
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-black">
                    <CheckCircle className="w-5 h-5 text-black flex-shrink-0" />
                    <span className="font-medium">Interactive & engaging</span>
                  </li>
                  <li className="flex items-center gap-3 text-black">
                    <CheckCircle className="w-5 h-5 text-black flex-shrink-0" />
                    <span className="font-medium">Visual project showcase</span>
                  </li>
                  <li className="flex items-center gap-3 text-black">
                    <CheckCircle className="w-5 h-5 text-black flex-shrink-0" />
                    <span className="font-medium">Easy to share</span>
                  </li>
                  <li className="flex items-center gap-3 text-black">
                    <CheckCircle className="w-5 h-5 text-black flex-shrink-0" />
                    <span className="font-medium">
                      Reflects your personality
                    </span>
                  </li>
                  <li className="flex items-center gap-3 text-black">
                    <CheckCircle className="w-5 h-5 text-black flex-shrink-0" />
                    <span className="font-medium">Always up-to-date</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quote/Stat */}
          {/* <div className="text-center mt-8">
            <div className="bg-almond-700 text-black px-8 py-6 rounded-2xl inline-block shadow-xl">
              <p className="text-xl md:text-2xl font-bold mb-2">
                "Recruiters spend 3x more time on interactive portfolios than
                resumes."
              </p>
              <p className="text-sm text-black/80">— Industry Research Study</p>
            </div>
          </div> */}
        </div>
      </section>

      {/* Video Section */}
      <section className="px-4 py-20 bg-snow/80">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Watch how it works in 60 seconds
          </h2>
          <p className="text-cinereous text-lg mb-12">
            See the entire process from form to finished portfolio
          </p>

          <div className="relative w-full max-w-3xl mx-auto">
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-2xl shadow-2xl bg-black">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/1Jv3CzqvNwA"
                title="Portfolio Generator Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-4 py-20 bg-gradient-to-r from-black to-bistre">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-snow mb-6">
            Ready to build your portfolio?
          </h2>
          <p className="text-xl text-snow/80 mb-12 max-w-2xl mx-auto">
            Join thousands of professionals who've created stunning portfolios
            with our tool
          </p>

          <button
            onClick={startBuilding}
            className="inline-flex items-center gap-3 bg-snow text-black px-8 py-4 rounded-xl text-lg font-semibold hover:bg-almond transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Start Building
            <ArrowRight className="w-6 h-6" />
          </button>

          <p className="text-sm text-snow/60 mt-6">
            No credit card required • Takes 5 minutes • Free forever
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 bg-snow border-t border-cinereous/20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Built with Bolt.new Badge */}
          <div className="flex justify-center">
            <a
              href="https://bolt.new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-black to-almond-600 text-white rounded-full text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" />
              </svg>
              Built on Bolt
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Creator Credits */}
          <div className="text-sm text-cinereous space-y-2">
            <p>
              Built with ❤️ by{' '}
              <a
                href="https://sohaibbinmohsin.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-bistre font-medium transition-colors"
              >
                Sohaib Bin Mohsin
              </a>
            </p>
            <p>
              Need custom development?{' '}
              <a
                href="https://www.upwork.com/freelancers/~01a30022b789bde8cc?mp_source=share"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-bistre font-medium transition-colors"
              >
                Hire me on Upwork
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Elements for Visual Interest */}
      <div className="fixed top-20 left-10 w-20 h-20 bg-almond/30 rounded-full blur-xl animate-pulse"></div>
      <div className="fixed bottom-20 right-10 w-32 h-32 bg-cinereous/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="fixed top-1/2 right-20 w-16 h-16 bg-bistre/20 rounded-full blur-xl animate-pulse delay-500"></div>
    </div>
  );
}

export default App;
