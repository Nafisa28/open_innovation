import { Outlet, Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Layout() {
  const { language, setLanguage, langs, t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-agro-green text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
            <Leaf size={28} className="text-agro-lightGreen" />
            <span>AgroVision AI</span>
          </Link>
          <div className="flex items-center space-x-6">
            <div className="space-x-6 hidden md:flex font-medium">
              <Link to="/" className="hover:text-agro-lightGreen transition">{t.navHome}</Link>
              <Link to="/dashboard" className="hover:text-agro-lightGreen transition">{t.navDashboard}</Link>
              <Link to="/how-it-works" className="hover:text-agro-lightGreen transition">{t.navHow}</Link>
              <Link to="/about" className="hover:text-agro-lightGreen transition">{t.navAbout}</Link>
            </div>
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white text-agro-green rounded px-2 py-1 text-sm font-bold shadow-sm focus:outline-none cursor-pointer"
            >
              {langs.map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
        </div>
      </nav>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      
      <footer className="bg-agro-brown text-agro-lightBrown py-6 text-center">
        <p>&copy; {new Date().getFullYear()} AgroVision AI.</p>
      </footer>
    </div>
  );
}
