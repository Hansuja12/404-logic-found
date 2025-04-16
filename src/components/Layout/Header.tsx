
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Leaf, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-green-500 font-semibold' : 'text-gray-600 hover:text-green-500';
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center">
              <Leaf className="h-8 w-8 text-green-500 mr-2" />
              <span className="font-bold text-xl text-green-600">EcoTrack</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/dashboard" className={`${isActive('/dashboard')} transition-colors`}>
              Dashboard
            </Link>
            <Link to="/input" className={`${isActive('/input')} transition-colors`}>
              Add Activity
            </Link>
            <Link to="/about" className={`${isActive('/about')} transition-colors`}>
              About
            </Link>
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              Sign In
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-green-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
            <Link
              to="/dashboard"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/dashboard')}`}
              onClick={toggleMenu}
            >
              Dashboard
            </Link>
            <Link
              to="/input"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/input')}`}
              onClick={toggleMenu}
            >
              Add Activity
            </Link>
            <Link
              to="/about"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/about')}`}
              onClick={toggleMenu}
            >
              About
            </Link>
            <div className="px-3 py-2">
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
