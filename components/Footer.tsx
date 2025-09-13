import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900/50 border-t border-purple-900/30">
      <div className="container mx-auto px-6 py-6 text-center text-slate-400">
        <p>&copy; {new Date().getFullYear()} Abishek S. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;