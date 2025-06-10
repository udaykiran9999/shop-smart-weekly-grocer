
import React from 'react';
import { Heart, Github, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* App Info */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-3">Smart Shopping Lists</h3>
            <p className="text-white/90 text-sm">
              Organize your shopping by store and never forget an item again. 
              Make your grocery shopping more efficient and enjoyable.
            </p>
          </div>

          {/* Features */}
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-3">Features</h4>
            <ul className="space-y-2 text-sm text-white/90">
              <li>Store-based organization</li>
              <li>Item quantity & notes</li>
              <li>Purchase tracking</li>
              <li>Next week planning</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-3">Connect</h4>
            <div className="flex justify-center md:justify-end space-x-4">
              <a 
                href="#" 
                className="text-white/90 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-white/90 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <p className="text-sm text-white/80 flex items-center justify-center gap-1">
            Made with <Heart className="h-4 w-4 text-red-300" /> for better shopping experiences
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
