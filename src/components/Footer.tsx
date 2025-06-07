import React from 'react';
import { FaGithub, FaLink } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-4 px-4 sm:px-6 lg:px-8 text-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-center sm:text-left">
          <p className="text-gray-400">
            &copy; {currentYear} JezzWTF. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-x-4">
          <a
            href="https://jezz.wtf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Jezz.wtf Main Site"
            title="Jezz.wtf Main Site"
            className="text-gray-300 hover:text-white transition-colors duration-200"
          >
            <FaLink size={20} className="text-sky-400" />
          </a>
          <a
            href="https://github.com/JezzWTF"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="JezzWTF GitHub Organization"
            title="JezzWTF (Organization GitHub)"
            className="text-gray-300 hover:text-white transition-colors duration-200"
          >
            <FaGithub size={20} className="text-teal-400" />
          </a>
          <a
            href="https://github.com/lyahn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="lyahn Personal GitHub"
            title="lyahn (Personal GitHub)"
            className="text-gray-300 hover:text-white transition-colors duration-200"
          >
            <FaGithub size={20} className="text-indigo-400" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 