
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-eco-primary text-white py-4 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="flex items-center justify-center">
          made by 404-Logic Found
        </p>
        <p className="text-sm mt-2">
          © {new Date().getFullYear()} EcoTrack - Track your carbon footprint
        </p>
      </div>
    </footer>
  );
};

export default Footer;
