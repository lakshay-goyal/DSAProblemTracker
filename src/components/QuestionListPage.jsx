import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, Moon, Sun } from "lucide-react";
import problemsData from "../data/problems.json";

const QuestionListPage = ({ darkMode, toggleDarkMode }) => {
  const { category } = useParams();
  const [problems, setProblems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [stats, setStats] = useState({ total: 0, solved: 0 });

  useEffect(() => {
    const loadData = async () => {
      try {
        const categoryData = problemsData.find(
          (cat) => cat.name.toLowerCase() === category.toLowerCase()
        );

        if (categoryData) {
          const categoryProblems = categoryData.problems.filter(
            (problem) =>
              problem.category.toLowerCase() === category.toLowerCase()
          );
          setProblems(categoryProblems);
          updateStats(categoryProblems, filter);
        } else {
          console.error("Category not found");
          setProblems([]);
        }
      } catch (error) {
        console.error("Error loading problems:", error);
        setProblems([]);
      }
    };

    loadData();
  }, [category, filter]);

  const updateStats = (problemList, currentFilter) => {
    const filteredProblems = problemList.filter((problem) => {
      if (currentFilter === "all") return true;
      return problem.source.toLowerCase() === currentFilter.toLowerCase();
    });

    setStats({
      total: filteredProblems.length,
      solved: filteredProblems.filter((problem) => problem.solved).length,
    });
  };

  const getFilteredProblems = () => {
    return problems.filter((problem) => {
      if (filter === "all") return true;
      return problem.source.toLowerCase() === filter.toLowerCase();
    });
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const hasProblemsFromSource = (source) => {
    return problems.some(problem => 
      problem.source.toLowerCase() === source.toLowerCase()
    );
  };

  const getDifficultyStyle = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const filteredProblems = getFilteredProblems();

  const filterButtons = [
    {
      id: 'all',
      label: 'All',
      color: 'blue',
      alwaysShow: true
    },
    {
      id: 'leetcode',
      label: 'LeetCode',
      color: 'yellow',
      checkSource: true
    },
    {
      id: 'geeksforgeeks',
      label: 'GeeksforGeeks',
      color: 'green',
      checkSource: true
    },
    {
      id: 'practice',
      label: 'Practice',
      color: 'purple',
      checkSource: true
    }
  ];

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white min-h-screen" : "bg-gray-100 min-h-screen"}>
      {/* Navigation */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Categories
        </Link>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white text-center mb-6">
            {category.charAt(0).toUpperCase() + category.slice(1)} Problems
          </h1>
          <div className="flex justify-center space-x-8">
            <div className="bg-white/20 rounded-lg px-6 py-3 text-white">
              <span className="text-2xl font-bold">{stats.total}</span>
              <span className="ml-2">Total</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center space-x-4 mb-8">
          {filterButtons.map(button => (
            (button.alwaysShow || (button.checkSource && hasProblemsFromSource(button.id))) && (
              <button
                key={button.id}
                onClick={() => handleFilterChange(button.id)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  filter === button.id
                    ? `bg-${button.color}-500 text-white`
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {button.label}
              </button>
            )
          ))}
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProblems.map((problem) => (
            <Link
              key={problem.id}
              to={`/question/${category}/${problem.id}`}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {problem.title}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyStyle(
                    problem.difficulty
                  )}`}
                >
                  {problem.difficulty}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                {problem.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {problem.source}
                </span>
                {problem.solved && (
                  <span className="text-green-500 dark:text-green-400 text-sm font-medium">
                    Solved ✓
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="fixed bottom-6 right-6 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-shadow"
      >
        {darkMode ? (
          <Sun className="h-6 w-6 text-yellow-500" />
        ) : (
          <Moon className="h-6 w-6 text-gray-700" />
        )}
      </button>
    </div>
  );
};

export default QuestionListPage;