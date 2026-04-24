import { Link } from 'react-router-dom';
import { Sprout, CloudRain, Mic, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <div className="text-center py-20 px-4 w-full max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-bold text-agro-green mb-6">
          {t.heroTitle}
        </h1>
        <p className="text-xl text-gray-600 mb-10">
          {t.heroSub}
        </p>
        <Link 
          to="/dashboard" 
          className="bg-agro-green hover:bg-green-800 text-white font-bold py-3 px-8 rounded-full text-lg transition shadow-lg inline-block transform hover:-translate-y-1"
        >
          {t.getStarted}
        </Link>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl mt-12">
        <FeatureCard 
          icon={<Sprout size={40} className="text-agro-green" />}
          title={t.feat1Title}
          desc={t.feat1Desc}
        />
        <FeatureCard 
          icon={<CloudRain size={40} className="text-agro-sky" />}
          title={t.feat2Title}
          desc={t.feat2Desc}
        />
        <FeatureCard 
          icon={<Mic size={40} className="text-agro-brown" />}
          title={t.feat3Title}
          desc={t.feat3Desc}
        />
        <FeatureCard 
          icon={<Globe size={40} className="text-agro-lightGreen" />}
          title={t.feat4Title}
          desc={t.feat4Desc}
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-agro-lightGreen hover:shadow-lg transition">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}
