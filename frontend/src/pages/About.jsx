export default function About() {
  return (
    <div className="max-w-3xl mx-auto py-12 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mt-8">
      <h1 className="text-4xl font-bold text-agro-green mb-6 border-b pb-4">About AgroVision AI</h1>
      
      <div className="prose prose-lg text-gray-700">
        <p className="mb-6">
          <strong>AgroVision AI</strong> is a Smart Crop Recommendation and Irrigation Advisory System 
          designed to empower farmers with data-driven insights. By combining local environmental data, 
          weather forecasts, and computer vision, we help farmers make informed decisions about what to 
          plant and when to water.
        </p>

        <h2 className="text-2xl font-bold text-agro-brown mt-8 mb-4">Our Impact</h2>
        <p className="mb-6 text-gray-600 italic border-l-4 border-agro-lightGreen pl-4 bg-gray-50 p-4 rounded-r-lg">
          "Empowering every farmer, regardless of literacy or language, to harness the power of AI for sustainable agriculture."
        </p>

        <h2 className="text-2xl font-bold text-agro-brown mt-8 mb-4">Technology Stack</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>Frontend:</strong> React, Vite, Tailwind CSS</li>
          <li><strong>Backend:</strong> Python, Flask</li>
          <li><strong>APIs:</strong> OpenWeatherMap, Web Speech API (Voice & TTS)</li>
          <li><strong>Machine Learning:</strong> Scikit-learn, TensorFlow/Keras (Mocked for MVP)</li>
        </ul>
        
        <div className="mt-12 text-center text-sm text-gray-400">
          <p>Built for the Open Innovation Challenge.</p>
        </div>
      </div>
    </div>
  );
}
