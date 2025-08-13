import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  BookOpen, 
  Play, 
  Tv, 
  ArrowRight, 
  ArrowLeft,
  Send,
  Utensils,
  Dumbbell,
  Briefcase,
  Camera,
  Music,
  Heart,
  CheckCircle,
  Mail,
  Sparkles
} from 'lucide-react';

interface Step {
  id: string;
  question: string;
  type: 'destination' | 'story-type' | 'story-title' | 'preferences' | 'email';
  completed: boolean;
  answer?: string;
}

interface Preference {
  id: string;
  label: string;
  icon: React.ReactNode;
  selected: boolean;
}

const KultripWidget: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [steps, setSteps] = useState<Step[]>([
    {
      id: 'destination',
      question: "Hi there! 👋 I'm excited to help you create your story-inspired adventure! First, where would you like to travel?",
      type: 'destination',
      completed: false
    },
    {
      id: 'story-type',
      question: "Perfect! Now, what type of story inspires your wanderlust?",
      type: 'story-type',
      completed: false
    },
    {
      id: 'story-title',
      question: "Wonderful choice! What's the name of the book/movie/TV show that's calling to you?",
      type: 'story-title',
      completed: false
    },
    {
      id: 'preferences',
      question: "Almost there! What experiences make your heart sing? Select all that appeal to you:",
      type: 'preferences',
      completed: false
    },
    {
      id: 'email',
      question: "Amazing! Your personalized itinerary is ready. Where should I send it?",
      type: 'email',
      completed: false
    }
  ]);

  const [preferences, setPreferences] = useState<Preference[]>([
    { id: 'gastronomy', label: 'Culinary Adventures', icon: <Utensils className="h-5 w-5" />, selected: false },
    { id: 'sports', label: 'Active Experiences', icon: <Dumbbell className="h-5 w-5" />, selected: false },
    { id: 'business', label: 'Professional Networking', icon: <Briefcase className="h-5 w-5" />, selected: false },
    { id: 'photography', label: 'Photography Tours', icon: <Camera className="h-5 w-5" />, selected: false },
    { id: 'music', label: 'Music & Arts', icon: <Music className="h-5 w-5" />, selected: false },
    { id: 'romance', label: 'Romantic Getaways', icon: <Heart className="h-5 w-5" />, selected: false }
  ]);

  const storyTypes = [
    { id: 'book', label: 'Book', icon: <BookOpen className="h-6 w-6" />, color: 'bg-blue-500' },
    { id: 'movie', label: 'Movie', icon: <Play className="h-6 w-6" />, color: 'bg-red-500' },
    { id: 'tv-show', label: 'TV Show', icon: <Tv className="h-6 w-6" />, color: 'bg-purple-500' }
  ];

  useEffect(() => {
    if (currentStep < steps.length) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, steps.length]);

  const handleInputSubmit = () => {
    if (!inputValue.trim()) return;

    const updatedSteps = [...steps];
    updatedSteps[currentStep] = {
      ...updatedSteps[currentStep],
      completed: true,
      answer: inputValue
    };
    setSteps(updatedSteps);
    setInputValue('');
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStoryTypeSelect = (type: string) => {
    const updatedSteps = [...steps];
    updatedSteps[currentStep] = {
      ...updatedSteps[currentStep],
      completed: true,
      answer: type
    };
    setSteps(updatedSteps);
    setCurrentStep(currentStep + 1);
  };

  const handlePreferenceToggle = (prefId: string) => {
    setPreferences(prev => 
      prev.map(pref => 
        pref.id === prefId ? { ...pref, selected: !pref.selected } : pref
      )
    );
  };

  const handlePreferencesSubmit = () => {
    const selectedPrefs = preferences.filter(p => p.selected).map(p => p.label).join(', ');
    const updatedSteps = [...steps];
    updatedSteps[currentStep] = {
      ...updatedSteps[currentStep],
      completed: true,
      answer: selectedPrefs || 'No specific preferences'
    };
    setSteps(updatedSteps);
    setCurrentStep(currentStep + 1);
  };

  const handleEmailSubmit = async () => {
    if (!inputValue.trim() || !inputValue.includes('@')) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const updatedSteps = [...steps];
    updatedSteps[currentStep] = {
      ...updatedSteps[currentStep],
      completed: true,
      answer: inputValue
    };
    setSteps(updatedSteps);
    setInputValue('');
    setIsSubmitting(false);
    setIsCompleted(true);
  };

  const goBack = () => {
    if (currentStep > 0) {
      const updatedSteps = [...steps];
      updatedSteps[currentStep].completed = false;
      updatedSteps[currentStep].answer = undefined;
      setSteps(updatedSteps);
      setCurrentStep(currentStep - 1);
    }
  };

  const resetWidget = () => {
    setCurrentStep(0);
    setIsCompleted(false);
    setInputValue('');
    setSteps(steps.map(step => ({ ...step, completed: false, answer: undefined })));
    setPreferences(preferences.map(pref => ({ ...pref, selected: false })));
  };

  if (isCompleted) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-xl max-w-2xl mx-auto">
        <div className="text-center">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Your Story Adventure Awaits! ✨
          </h3>
          <p className="text-gray-600 mb-6">
            We've crafted a personalized itinerary inspired by your favorite story. 
            Check your email for the complete adventure guide!
          </p>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Your Adventure Summary:</h4>
            <div className="space-y-2 text-sm text-left">
              <div><strong>Destination:</strong> {steps[0]?.answer}</div>
              <div><strong>Story Type:</strong> {steps[1]?.answer}</div>
              <div><strong>Inspiration:</strong> {steps[2]?.answer}</div>
              <div><strong>Preferences:</strong> {steps[3]?.answer}</div>
              <div><strong>Email:</strong> {steps[4]?.answer}</div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={resetWidget}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              Plan Another Adventure
            </button>
            <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-all duration-300">
              Contact Agent
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Chat Messages */}
      <div className="space-y-4 mb-6 min-h-[200px]">
        {/* Previous completed steps */}
        {steps.slice(0, currentStep).map((step, index) => (
          <div key={step.id} className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4 max-w-md">
                <p className="text-gray-800">{step.question}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-blue-600 text-white rounded-2xl rounded-tr-none p-4 max-w-md">
                <p>{step.answer}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Current step */}
        {currentStep < steps.length && (
          <div className="flex items-start space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4 max-w-md">
              {isTyping ? (
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              ) : (
                <p className="text-gray-800">{steps[currentStep]?.question}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      {!isTyping && currentStep < steps.length && (
        <div className="space-y-4">
          {/* Story Type Selection */}
          {steps[currentStep]?.type === 'story-type' && (
            <div className="grid grid-cols-3 gap-3">
              {storyTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleStoryTypeSelect(type.label)}
                  className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 group"
                >
                  <div className={`${type.color} w-12 h-12 rounded-full flex items-center justify-center mb-2 text-white group-hover:scale-110 transition-transform duration-300`}>
                    {type.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{type.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Preferences Selection */}
          {steps[currentStep]?.type === 'preferences' && (
            <div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {preferences.map((pref) => (
                  <button
                    key={pref.id}
                    onClick={() => handlePreferenceToggle(pref.id)}
                    className={`flex items-center p-3 border-2 rounded-xl transition-all duration-300 ${
                      pref.selected 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      pref.selected ? 'bg-blue-500 text-white' : 'bg-gray-100'
                    }`}>
                      {pref.icon}
                    </div>
                    <span className="text-sm font-medium">{pref.label}</span>
                  </button>
                ))}
              </div>
              <button
                onClick={handlePreferencesSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          )}

          {/* Text Input for other steps */}
          {!['story-type', 'preferences'].includes(steps[currentStep]?.type) && (
            <div className="flex space-x-3">
              <div className="flex-1">
                <input
                  type={steps[currentStep]?.type === 'email' ? 'email' : 'text'}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={
                    steps[currentStep]?.type === 'destination' ? 'e.g., Paris, Tokyo, New York...' :
                    steps[currentStep]?.type === 'story-title' ? 'e.g., Harry Potter, Lord of the Rings...' :
                    steps[currentStep]?.type === 'email' ? 'your.email@example.com' : 'Type your answer...'
                  }
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      if (steps[currentStep]?.type === 'email') {
                        handleEmailSubmit();
                      } else {
                        handleInputSubmit();
                      }
                    }
                  }}
                />
              </div>
              <button
                onClick={steps[currentStep]?.type === 'email' ? handleEmailSubmit : handleInputSubmit}
                disabled={!inputValue.trim() || isSubmitting}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[60px]"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : steps[currentStep]?.type === 'email' ? (
                  <Mail className="h-5 w-5" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </button>
            </div>
          )}

          {/* Back Button */}
          {currentStep > 0 && (
            <button
              onClick={goBack}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-300"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Go back
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default KultripWidget;