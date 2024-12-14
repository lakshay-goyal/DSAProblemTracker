import React, { useState } from 'react';
import { 
  Code, 
  Copy, 
  Search,
  Layers,
  Clock,
  MemoryStick,
  XCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

import problemData from './dsa-problems.json'

const ProblemCard = ({ problem, selectedLanguage, onDetailView }) => {
  const [isCodeExpanded, setIsCodeExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg hover:scale-105 transition-transform">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-100">{problem.title}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium 
            ${problem.difficulty === 'Easy' ? 'bg-green-800 text-green-200' :
              problem.difficulty === 'Medium' ? 'bg-yellow-800 text-yellow-200' :
              'bg-red-800 text-red-200'}`}>
            {problem.difficulty}
          </span>
        </div>
        <p className="text-gray-400 mb-4">{problem.description}</p>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-300">
              Solution in {selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)}
            </span>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => handleCopy(problem.solutions[selectedLanguage])}
                className="text-gray-400 hover:text-blue-400 transition-colors relative"
                title="Copy Code"
              >
                <Copy size={16} />
                {copied && (
                  <span className="absolute top-full left-0 bg-green-600 text-white text-xs px-2 py-1 rounded mt-1">
                    Copied!
                  </span>
                )}
              </button>
              <button 
                onClick={() => setIsCodeExpanded(!isCodeExpanded)}
                className="text-gray-400 hover:text-blue-400 transition-colors"
                title="Expand/Collapse Code"
              >
                {isCodeExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
          </div>
          {isCodeExpanded && (
            <pre className="bg-gray-900 p-3 rounded-lg text-sm text-gray-200 overflow-x-auto">
              <code>{problem.solutions[selectedLanguage]}</code>
            </pre>
          )}
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => onDetailView(problem)}
            className="flex-grow bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

const ProblemDetailModal = ({ problem, selectedLanguage, onClose, onLanguageChange }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(problem.solutions[selectedLanguage]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 overflow-y-auto">
      <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors z-10"
        >
          <XCircle size={28} />
        </button>

        <div className="p-6 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-100 mb-2">
                {problem.title}
              </h2>
              <p className="text-gray-400">{problem.description}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium 
              ${problem.difficulty === 'Easy' ? 'bg-green-800 text-green-200' :
                problem.difficulty === 'Medium' ? 'bg-yellow-800 text-yellow-200' :
                'bg-red-800 text-red-200'}`}>
              {problem.difficulty}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex space-x-2 mb-4">
            {[
              { value: 'python', label: 'Python', icon: '🐍' },
              { value: 'javascript', label: 'JavaScript', icon: '✨' },
              { value: 'java', label: 'Java', icon: '☕' }
            ].map((lang) => (
              <button
                key={lang.value}
                onClick={() => onLanguageChange(lang.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedLanguage === lang.value 
                    ? 'bg-blue-700 text-white' 
                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                }`}
              >
                {lang.icon} {lang.label}
              </button>
            ))}
          </div>

          <div className="relative bg-gray-900 rounded-lg overflow-hidden">
            <div className="flex justify-between items-center bg-gray-950 px-4 py-2 border-b border-gray-800">
              <div className="flex items-center space-x-2 text-gray-300">
                <Code size={16} />
                <span className="text-sm font-medium uppercase">
                  {selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)}
                </span>
              </div>
              <button 
                onClick={handleCopy}
                className="text-gray-400 hover:text-blue-400 transition-colors relative"
                title="Copy Code"
              >
                <Copy size={16} />
                {copied && (
                  <span className="absolute top-full left-0 bg-green-600 text-white text-xs px-2 py-1 rounded mt-1">
                    Copied!
                  </span>
                )}
              </button>
            </div>
            <pre className="p-4 overflow-x-auto text-sm text-gray-200 scrollbar-thin scrollbar-thumb-gray-600">
              <code>{problem.solutions[selectedLanguage]}</code>
            </pre>
          </div>
        </div>

        <div className="p-6 bg-gray-700 rounded-b-xl">
          <h3 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
            <Layers size={20} className="mr-2" /> Problem Analysis
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Clock size={20} className="text-blue-400" />
              <div>
                <span className="block text-xs text-gray-400">Time Complexity</span>
                <strong className="text-gray-200">
                  {problem.analysis.timeComplexity}
                </strong>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MemoryStick size={20} className="text-green-400" />
              <div>
                <span className="block text-xs text-gray-400">Space Complexity</span>
                <strong className="text-gray-200">
                  {problem.analysis.spaceComplexity}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DSAProblemTracker = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState(null);



  // Filtering logic
  const filteredProblems = problemData.problems.filter(problem => 
    problem.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedDifficulty ? problem.difficulty === selectedDifficulty : true) &&
    (selectedCategory ? problem.category === selectedCategory : true)
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-100 mb-4">
            DSA Problem Tracker
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore and master data structures and algorithms through curated coding challenges
          </p>
        </div>

        <div className="mb-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-500" />
            </div>
            <input 
              type="text" 
              placeholder="Search problems..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100 focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            />
          </div>

          <div className="flex space-x-2">
            {problemData.languages.map((lang) => (
              <button
                key={lang.value}
                onClick={() => setSelectedLanguage(lang.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedLanguage === lang.value 
                    ? 'bg-blue-700 text-white' 
                    : 'bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700'
                }`}
              >
                {lang.icon} {lang.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex space-x-4 mb-8">

          <div className="flex space-x-2">
            {problemData.categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(
                  selectedCategory === cat ? null : cat
                )}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedCategory === cat 
                    ? 'bg-blue-700 text-white' 
                    : 'bg-gray-800 text-gray-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProblems.map(problem => (
            <ProblemCard 
              key={problem.id} 
              problem={problem}
              selectedLanguage={selectedLanguage}
              onDetailView={setSelectedProblem}
            />
          ))}
        </div>
  
        {/* No Results State */}
        {filteredProblems.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-400 mb-4">
              No Problems Found
            </h2>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        )}
  
        {/* Problem Detail Modal */}
        {selectedProblem && (
          <ProblemDetailModal 
            problem={selectedProblem}
            selectedLanguage={selectedLanguage}
            onClose={() => setSelectedProblem(null)}
            onLanguageChange={setSelectedLanguage}
          />
        )}
      </div>
    </div>
  );
};
  
export default DSAProblemTracker;