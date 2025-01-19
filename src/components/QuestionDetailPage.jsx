import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, Copy, Check, Moon, Sun } from 'lucide-react';
import problemsData from '../data/problems.json';

const QuestionDetailPage = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [copied, setCopied] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    for (const category of problemsData) {
      const foundProblem = category.problems.find(p => p.id === parseInt(id));
      if (foundProblem) {
        setProblem(foundProblem);
        setSelectedLanguage(Object.keys(foundProblem.solutions)[0]);
        break;
      }
    }
  }, [id]);

  const handleCopy = () => {
    if (problem && selectedLanguage) {
      navigator.clipboard.writeText(problem.solutions[selectedLanguage]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!problem) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  const [descriptionText, exampleText] = problem.description.split('Example:').map(text => text.trim());

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100'}`}>
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link 
            to={`/questions/${problem.category}`} 
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 dark:text-indigo-300 dark:hover:text-indigo-100"
          >
            <ChevronLeft size={20} />
            <span className="ml-1">Back to Problems</span>
          </Link>
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {problem.title}
            </h1>
            <div className="flex items-center space-x-4 mb-4">
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-100 text-sm font-medium rounded-full">
                {problem.category}
              </span>
              <span className={`px-2 py-1 text-sm font-medium rounded-full ${
                problem.difficulty === 'Easy' ? 'bg-green-100 dark:bg-green-700 text-green-800 dark:text-green-100' :
                problem.difficulty === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-100' :
                'bg-red-100 dark:bg-red-700 text-red-800 dark:text-red-100'
              }`}>
                {problem.difficulty}
              </span>
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm font-medium rounded-full">
                {problem.source}
              </span>
            </div>
            
            <div className="prose dark:prose-invert max-w-none mb-6">
              <p className="mb-4">{descriptionText}</p>
              {exampleText && (
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4">
                  <h3 className="text-lg font-semibold mb-2">Example:</h3>
                  <pre className="font-mono text-sm whitespace-pre overflow-x-auto">
                    {exampleText}
                  </pre>
                </div>
              )}
            </div>
            
            {selectedLanguage && (
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Solution
                </h2>
                <div className="flex space-x-2 mb-2">
                  {Object.keys(problem.solutions).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`px-3 py-1 rounded-md text-sm font-medium ${
                        selectedLanguage === lang
                          ? 'bg-indigo-600 dark:bg-indigo-400 text-white dark:text-gray-800'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <pre className="bg-gray-800 dark:bg-gray-600 text-white dark:text-gray-200 p-4 rounded-lg overflow-x-auto">
                    <code>{problem.solutions[selectedLanguage]}</code>
                  </pre>
                  <button
                    onClick={handleCopy}
                    className="absolute top-2 right-2 p-2 bg-gray-700 dark:bg-gray-400 text-gray-300 dark:text-gray-100 rounded-md hover:bg-gray-600 dark:hover:bg-gray-500"
                  >
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                  </button>
                </div>
              </div>
            )}

            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Time Complexity
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {problem.timeComplexity}
              </p>
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Space Complexity
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {problem.spaceComplexity}
              </p>
            </div>

            {problem.notes && (
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Notes
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {problem.notes}
                </p>
              </div>
            )}
          </div>
        </div>
        
        <button
          onClick={toggleDarkMode}
          className="fixed bottom-4 right-4 p-2 bg-gray-200 dark:bg-gray-700 rounded-full shadow-lg"
        >
          {darkMode ? <Sun className="text-yellow-500" /> : <Moon className="text-gray-700 dark:text-gray-300" />}
        </button>
      </div>
    </div>
  );
};

export default QuestionDetailPage;