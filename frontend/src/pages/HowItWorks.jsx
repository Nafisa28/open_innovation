import { CheckCircle } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    { title: "User Provides Input", desc: "Enter your location, soil type, and season manually, via voice, or let the app detect it." },
    { title: "Image Upload", desc: "Upload an image of your crop or soil. Our computer vision models analyze the visual data." },
    { title: "Weather Integration", desc: "Real-time weather data (temperature, rainfall) is fetched using OpenWeatherMap based on your location." },
    { title: "AI Analysis", desc: "Machine learning models process your inputs to recommend the best crops for your exact conditions." },
    { title: "Smart Irrigation", desc: "Based on expected rainfall and heat, the system calculates whether you need to water your crops today." },
    { title: "Accessible Results", desc: "Read the results in your local language or use the Text-to-Speech feature to listen to them." }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-bold text-agro-green text-center mb-12">How It Works</h1>
      
      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
        {steps.map((step, idx) => (
          <div key={idx} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}>
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-agro-lightGreen text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              <CheckCircle size={20} />
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
              <h3 className="font-bold text-lg text-gray-800 mb-1">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
