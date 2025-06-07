import React from 'react';

// type HeaderProps = Record<string, never>;
// Or, if no props are truly expected and `children` is the only implicit prop from React.FC:
// const Header: React.FC = () => { ... }
// For now, to be explicit and allow future props easily while satisfying the linter:
type HeaderProps = object;

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="w-full bg-slate-900/80 backdrop-blur-lg shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-start">
        <div className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity">
          <img src="/square-chart-gantt.svg" alt="ProjGen Logo" className="h-6 w-6 invert" />
          <h1 className="text-xl font-semibold bg-gradient-to-r from-yellow-300 to-orange-500 bg-clip-text text-transparent">
            ProjGen
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header; 