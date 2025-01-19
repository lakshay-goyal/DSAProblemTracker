import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Github, 
  Linkedin, 
  Moon, 
  Sun, 
  Code2, 
  BookOpen,
  Target,
  Sparkles
} from 'lucide-react';
import data from '../data/problems.json';

// Category mappings object
const categoryMappings = {
  'loop-pattern': {
    icon: '📊',
    description: 'Master Loops Patterns'
  },
  functions:{
    icon: "📚",
    description: "Perform some functions Questions",
  },
  array:{
    icon: "📚",
    description: "Solve interesting problems",
  },
  strings: {
    icon: '🔤',
    description: 'Explore string manipulation techniques'
  },
  'linked-lists': {
    icon: '🔗',
    description: 'Understand linear data structures'
  },
  trees: {
    icon: '🌳',
    description: 'Solve hierarchical data structure problems'
  },
  graphs: {
    icon: '🕸️',
    description: 'Tackle network and connectivity challenges'
  },
  'dynamic-programming': {
    icon: '🧠',
    description: 'Master optimization techniques'
  }
};

const HomePage = ({ darkMode, toggleDarkMode }) => {
  const [problemStats, setProblemStats] = useState({
    leetcode: { total: 0, Easy: 0, Medium: 0, Hard: 0 },
    geeksforgeeks: { total: 0, School: 0, Basic: 0, Easy: 0, Medium: 0, Hard: 0 }
  });
  
  const [categoryStats, setCategoryStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const processData = () => {
      try {
        // Process platform statistics
        const platformStats = {
          leetcode: { total: 0, Easy: 0, Medium: 0, Hard: 0 },
          geeksforgeeks: { total: 0, School: 0, Basic: 0, Easy: 0, Medium: 0, Hard: 0 }
        };

        // Process category statistics
        const categories = new Map();

        data.forEach(category => {
          const categoryKey = category.name.toLowerCase().replace(/\s+/g, '-');
          const mappingInfo = categoryMappings[categoryKey] || {
            icon: '📚',
            description: 'Solve interesting problems'
          };

          const categoryInfo = {
            name: category.name,
            key: categoryKey,
            total: category.problems.length,
            icon: mappingInfo.icon,
            description: mappingInfo.description
          };

          categories.set(categoryKey, categoryInfo);

          // Update platform statistics
          category.problems.forEach(problem => {
            const platform = problem.source.toLowerCase();
            if (platform === 'leetcode') {
              platformStats.leetcode.total++;
              platformStats.leetcode[problem.difficulty]++;
            } else if (platform === 'geeksforgeeks') {
              platformStats.geeksforgeeks.total++;
              platformStats.geeksforgeeks[problem.difficulty]++;
            }
          });
        });

        setProblemStats(platformStats);
        setCategoryStats(Array.from(categories.values()));
      } catch (error) {
        console.error('Error processing data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    processData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-bounce">
          <Code2 className="w-12 h-12 text-blue-500" />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100'}`}>
      {/* Header Section */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white py-24">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-20"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-12 h-12 text-yellow-300 animate-pulse" />
            </div>
            <h1 className="text-6xl font-bold mb-6">
              My DSA Progress Tracker
            </h1>
            <p className="text-2xl mb-12 text-blue-100">
              Monitoring my journey through Data Structures and Algorithms
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a 
                href="https://leetcode.com/u/O8DoTmlJQa/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-white px-8 py-4 rounded-xl transition-all transform hover:scale-105 hover:shadow-xl"
              >
                <Code2 className="w-6 h-6" />
                <span className="font-semibold">LeetCode Profile</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a 
                href="https://www.geeksforgeeks.org/user/lakshaygnsrg/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center gap-3 bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-xl transition-all transform hover:scale-105 hover:shadow-xl"
              >
                <BookOpen className="w-6 h-6" />
                <span className="font-semibold">GeeksforGeeks Profile</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center mb-12">
            <Target className="w-8 h-8 text-blue-500 mr-3" />
            <h2 className="text-4xl font-bold">Progress Overview</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LeetCode Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transform transition-all hover:scale-105 hover:shadow-2xl">
              <h3 className="text-2xl font-semibold mb-6 flex items-center text-yellow-500">
                <Code2 className="w-8 h-8 mr-3" />
                LeetCode Progress
              </h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg text-gray-600 dark:text-gray-300">Total Problems</span>
                  <span className="text-2xl font-bold">{problemStats.leetcode.total}</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-xl">
                    <div className="text-green-600 dark:text-green-400 text-lg mb-1">Easy</div>
                    <div className="text-2xl font-bold">{problemStats.leetcode.Easy}</div>
                  </div>
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-xl">
                    <div className="text-yellow-600 dark:text-yellow-400 text-lg mb-1">Medium</div>
                    <div className="text-2xl font-bold">{problemStats.leetcode.Medium}</div>
                  </div>
                  <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-xl">
                    <div className="text-red-600 dark:text-red-400 text-lg mb-1">Hard</div>
                    <div className="text-2xl font-bold">{problemStats.leetcode.Hard}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* GeeksforGeeks Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transform transition-all hover:scale-105 hover:shadow-2xl">
              <h3 className="text-2xl font-semibold mb-6 flex items-center text-green-500">
                <BookOpen className="w-8 h-8 mr-3" />
                GeeksforGeeks Progress
              </h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg text-gray-600 dark:text-gray-300">Total Problems</span>
                  <span className="text-2xl font-bold">{problemStats.geeksforgeeks.total}</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-xl">
                    <div className="text-blue-600 dark:text-blue-400 text-lg mb-1">Basic</div>
                    <div className="text-2xl font-bold">{problemStats.geeksforgeeks.Basic}</div>
                  </div>
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-xl">
                    <div className="text-purple-600 dark:text-purple-400 text-lg mb-1">Medium</div>
                    <div className="text-2xl font-bold">{problemStats.geeksforgeeks.Medium}</div>
                  </div>
                  <div className="bg-pink-100 dark:bg-pink-900/30 p-4 rounded-xl">
                    <div className="text-pink-600 dark:text-pink-400 text-lg mb-1">Hard</div>
                    <div className="text-2xl font-bold">{problemStats.geeksforgeeks.Hard}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center mb-12">
            <BookOpen className="w-8 h-8 text-blue-500 mr-3" />
            <h2 className="text-4xl font-bold">Problem Categories</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryStats.map((category) => (
              <Link
                key={category.key}
                to={`/questions/${category.key}`}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transform transition-all hover:scale-105 hover:shadow-2xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl group-hover:scale-110 transition-transform">{category.icon}</span>
                  <h3 className="text-2xl font-semibold">{category.name}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">{category.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">
                    {category.total} Problems
                  </span>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transform transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Code2 className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-semibold text-white">DSA Tracker</span>
          </div>
          <p className="mb-8">© 2024 My DSA Progress Tracker. All rights reserved.</p>
          <div className="flex justify-center space-x-6">
            <a 
              href="https://github.com/lakshay-goyal/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github size={28} />
            </a>
            <a 
              href="https://www.linkedin.com/in/lakshay-goyal-9778a6246/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin size={28} />
            </a>
          </div>
        </div>
      </footer>
      
      {/* Dark Mode Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className="fixed bottom-6 right-6 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
      >
        {darkMode ? 
          <Sun className="w-6 h-6 text-yellow-500" /> : 
          <Moon className="w-6 h-6 text-gray-700" />
        }
      </button>
    </div>

  );
};

export default HomePage;