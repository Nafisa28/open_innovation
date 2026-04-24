import { useState, useRef } from 'react';
import { Mic, MapPin, Loader2, Volume2, UploadCloud, Sprout, Droplets, Droplet } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Dashboard() {
  const { language, t, translateExact } = useLanguage();

  const [activeTab, setActiveTab] = useState('crop'); // 'crop' or 'irrigation'

  // Shared Input State
  const [location, setLocation] = useState('');
  const [soilType, setSoilType] = useState('Loamy');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Crop Tab State
  const [season, setSeason] = useState('Kharif');
  const [cropResults, setCropResults] = useState(null);

  // Irrigation Tab State
  const [currentCrop, setCurrentCrop] = useState('Wheat');
  const [currentMoisture, setCurrentMoisture] = useState(50);
  const [cropImage, setCropImage] = useState(null);
  const [soilImage, setSoilImage] = useState(null);
  const [irrResults, setIrrResults] = useState(null);

  const handleLocationDetect = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const langCode = language === 'English' ? 'en' : language === 'Hindi' ? 'hi' : 'kn';
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=${langCode}`);
          const data = await res.json();
          setLocation(data.address.city || data.address.town || data.address.village || 'Unknown Location');
        } catch (e) {
          setLocation(`${latitude}, ${longitude}`);
        }
      });
    } else {
      alert("Geolocation not supported");
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.lang = language === 'English' ? 'en-US' : language === 'Hindi' ? 'hi-IN' : 'kn-IN';
    recognition.onresult = (event) => setLocation(event.results[0][0].transcript);
    recognition.start();
  };

  const handleAnalyzeCrop = async () => {
    setLoading(true); setError(null); setCropResults(null);
    try {
      const BASE_URL = 'https://agrovision-backend-g2gg.onrender.com/api';
      const weatherRes = await fetch(`${BASE_URL}/weather?location=${location || 'Delhi'}`);
      const weatherData = await weatherRes.json();
      if (weatherData.error) throw new Error(weatherData.error);

      const recsRes = await fetch(`${BASE_URL}/recommend`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ soil_type: soilType, season })
      });
      const recsData = await recsRes.json();

      setCropResults({ weather: weatherData, recommendations: recsData.recommendations });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeIrrigation = async () => {
    setLoading(true); setError(null); setIrrResults(null);
    try {
      const BASE_URL = 'https://agrovision-backend-g2gg.onrender.com/api';
      const weatherRes = await fetch(`${BASE_URL}/weather?location=${location || 'Delhi'}`);
      const weatherData = await weatherRes.json();
      if (weatherData.error) throw new Error(weatherData.error);

      let detectedCrop = null;
      let finalCropType = currentCrop;
      if (cropImage) {
        const fd = new FormData(); fd.append('image', cropImage);
        detectedCrop = await (await fetch(`${BASE_URL}/detect-crop`, { method: 'POST', body: fd })).json();
        // If the mock detection returns "Healthy Wheat", we extract "Wheat"
        const detectedName = detectedCrop.detected_crop;
        if (detectedName.includes("Wheat")) finalCropType = "Wheat";
        else if (detectedName.includes("Maize")) finalCropType = "Maize";
        else if (detectedName.includes("Rice")) finalCropType = "Rice";
        else if (detectedName.includes("Cotton")) finalCropType = "Cotton";
      }

      let detectedSoil = null;
      if (soilImage) {
        const fd = new FormData(); fd.append('image', soilImage);
        detectedSoil = await (await fetch(`${BASE_URL}/detect-soil`, { method: 'POST', body: fd })).json();
      }

      const irrRes = await fetch(`${BASE_URL}/irrigation`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rainfall: weatherData.rainfall,
          temperature: weatherData.temperature,
          crop_type: finalCropType,
          current_moisture: currentMoisture
        })
      });
      const irrData = await irrRes.json();

      setIrrResults({
        weather: weatherData,
        crop: detectedCrop,
        soil: detectedSoil,
        irrigation: irrData.advice,
        thresholdData: irrData
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const speakText = (resultsObj, type) => {
    if (!resultsObj || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    let textToSpeak = "";
    if (type === 'crop') {
      if (language === 'Hindi') {
        textToSpeak = `मौसम है ${resultsObj.weather.temperature} डिग्री। शीर्ष सिफारिश है ${translateExact(resultsObj.recommendations[0]?.crop)}।`;
      } else if (language === 'Kannada') {
        textToSpeak = `ಹವಾಮಾನ ${resultsObj.weather.temperature} ಡಿಗ್ರಿ. ಉನ್ನತ ಶಿಫಾರಸು ${translateExact(resultsObj.recommendations[0]?.crop)}.`;
      } else {
        textToSpeak = `Weather is ${resultsObj.weather.temperature} degrees. Top recommendation is ${translateExact(resultsObj.recommendations[0]?.crop)}.`;
      }
    } else {
      if (language === 'Hindi') {
        textToSpeak = `सिंचाई सलाह: ${translateExact(resultsObj.irrigation)}`;
      } else if (language === 'Kannada') {
        textToSpeak = `ನೀರಾವರಿ ಸಲಹೆ: ${translateExact(resultsObj.irrigation)}`;
      } else {
        textToSpeak = `Irrigation advice: ${translateExact(resultsObj.irrigation)}`;
      }
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = language === 'English' ? 'en-US' : language === 'Hindi' ? 'hi-IN' : 'kn-IN';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* TABS */}
      <div className="flex space-x-4 mb-8 justify-center">
        <button
          onClick={() => setActiveTab('crop')}
          className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition text-lg shadow-sm
            ${activeTab === 'crop' ? 'bg-agro-green text-white scale-105' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
        >
          <Sprout size={24} /> {t.cropTab || "Crop Recommendations"}
        </button>
        <button
          onClick={() => setActiveTab('irrigation')}
          className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition text-lg shadow-sm
            ${activeTab === 'irrigation' ? 'bg-agro-sky text-white scale-105' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
        >
          <Droplets size={24} /> {t.irrTab || "Smart Irrigation"}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* INPUT PANEL */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-fit">
          <h2 className="text-2xl font-bold text-agro-green mb-6">Input Parameters</h2>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">{t.locLabel || "Location"}</label>
            <div className="flex gap-2">
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder={t.locationPlaceholder || "e.g. Pune"} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-agro-lightGreen focus:outline-none" />
              <button onClick={handleLocationDetect} className="p-3 bg-agro-sky text-white rounded-lg hover:bg-blue-400"><MapPin size={20} /></button>
              <button onClick={handleVoiceInput} className="p-3 bg-agro-brown text-white rounded-lg hover:bg-amber-800"><Mic size={20} /></button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">{t.soilLabel || "Soil Type"}</label>
            <select value={soilType} onChange={(e) => setSoilType(e.target.value)} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none">
              {['Sandy', 'Clay', 'Loamy', 'Red', 'Black'].map(s => <option key={s}>{translateExact(s)}</option>)}
            </select>
          </div>

          {activeTab === 'crop' && (
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">{t.seasonLabel || "Season"}</label>
              <select value={season} onChange={(e) => setSeason(e.target.value)} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none">
                {['Kharif', 'Rabi', 'Summer'].map(s => <option key={s}>{translateExact(s)}</option>)}
              </select>
            </div>
          )}

          {activeTab === 'irrigation' && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">{t.cropTypeLabel || "Current Crop"}</label>
                <select value={currentCrop} onChange={(e) => setCurrentCrop(e.target.value)} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-agro-sky focus:outline-none">
                  {['Wheat', 'Rice', 'Tomato', 'Maize', 'Cotton'].map(c => <option key={c}>{translateExact(c)}</option>)}
                </select>
                <p className="text-xs text-gray-400 mt-1">Select crop to set moisture threshold.</p>
              </div>

              <div className="mb-6 bg-blue-50 p-4 rounded-xl border border-blue-100">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-blue-800 text-sm font-bold flex items-center gap-1">
                    <Droplet size={16} /> Moisture Sensor Reading
                  </label>
                  <span className="font-bold text-blue-600">{currentMoisture}%</span>
                </div>
                <input
                  type="range" min="0" max="100" value={currentMoisture}
                  onChange={(e) => setCurrentMoisture(e.target.value)}
                  className="w-full accent-blue-500"
                />
              </div>

              <div className="mb-6 space-y-4">
                <p className="text-sm font-bold text-gray-700">Optional: Detect from Image</p>
                <label className="block border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:bg-gray-50 transition">
                  <UploadCloud className="mx-auto text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">{cropImage ? cropImage.name : t.uploadCrop || "Upload Crop Image"}</span>
                  <input type="file" className="hidden" onChange={(e) => setCropImage(e.target.files[0])} />
                </label>
                <label className="block border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:bg-gray-50 transition">
                  <UploadCloud className="mx-auto text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">{soilImage ? soilImage.name : t.uploadSoil || "Upload Soil Image"}</span>
                  <input type="file" className="hidden" onChange={(e) => setSoilImage(e.target.files[0])} />
                </label>
              </div>
            </>
          )}

          <button
            onClick={activeTab === 'crop' ? handleAnalyzeCrop : handleAnalyzeIrrigation}
            disabled={loading}
            className={`w-full text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2 ${activeTab === 'crop' ? 'bg-agro-green hover:bg-green-800' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {loading ? <Loader2 className="animate-spin" /> : null}
            {loading ? '...' : (t.analyze || "Analyze")}
          </button>
        </div>

        {/* OUTPUT PANEL */}
        <div className="w-full lg:w-2/3">
          {error && <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-6">{error}</div>}

          {/* CROP RESULTS */}
          {activeTab === 'crop' && (
            cropResults ? (
              <div className="space-y-6">
                <div className="flex justify-end">
                  <button onClick={() => speakText(cropResults, 'crop')} className="flex items-center gap-2 bg-agro-lightGreen text-white px-4 py-2 rounded-lg hover:bg-green-500 transition shadow-sm">
                    <Volume2 size={20} /> {t.listen || "Listen"}
                  </button>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-agro-sky">
                  <h3 className="font-bold text-gray-500 mb-2">{t.weather || "Weather"}</h3>
                  <p className="text-3xl font-bold text-gray-800">{cropResults.weather.temperature}°C</p>
                  <p className="text-gray-600 capitalize">{translateExact(cropResults.weather.description)}</p>
                  <p className="text-sm text-gray-500 mt-2">Rainfall: {cropResults.weather.rainfall} mm</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-agro-green">
                  <h3 className="font-bold text-gray-800 text-xl mb-4">{t.recs || "Recommendations"}</h3>
                  <div className="space-y-4">
                    {cropResults.recommendations.map((rec, idx) => (
                      <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                        <h4 className="font-bold text-agro-green text-lg">{translateExact(rec.crop)}</h4>
                        <p className="text-gray-600 mt-1">{translateExact(rec.reason)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center min-h-[400px]">
                <div className="text-center text-gray-400">
                  <Sprout size={48} className="mx-auto mb-4 opacity-50" />
                  <p>{t.cropNoInput || "Enter inputs"}</p>
                </div>
              </div>
            )
          )}

          {/* IRRIGATION RESULTS */}
          {activeTab === 'irrigation' && (
            irrResults ? (
              <div className="space-y-6">
                <div className="flex justify-end">
                  <button onClick={() => speakText(irrResults, 'irrigation')} className="flex items-center gap-2 bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition shadow-sm">
                    <Volume2 size={20} /> {t.listen || "Listen"}
                  </button>
                </div>

                {/* Threshold Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center">
                    <p className="text-gray-500 text-sm">Analyzed Crop</p>
                    <p className="font-bold text-xl text-gray-800">{translateExact(irrResults.thresholdData.crop)}</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center">
                    <p className="text-gray-500 text-sm">Target Threshold</p>
                    <p className="font-bold text-xl text-blue-600">{irrResults.thresholdData.threshold}%</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center">
                    <p className="text-gray-500 text-sm">Current Moisture</p>
                    <p className="font-bold text-xl text-blue-800">{irrResults.thresholdData.current_moisture}%</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-500">
                  <h3 className="font-bold text-gray-500 mb-2">{t.irr || "Advice"}</h3>
                  <p className="text-xl font-bold text-gray-800">{translateExact(irrResults.irrigation)}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-500 mb-2">{t.weather || "Weather"}</h3>
                    <p className="text-3xl font-bold text-gray-800">{irrResults.weather.temperature}°C</p>
                    <p className="text-gray-600 capitalize">{translateExact(irrResults.weather.description)}</p>
                    <p className="text-sm text-gray-500 mt-2">Rainfall: {irrResults.weather.rainfall} mm</p>
                  </div>

                  {(irrResults.crop || irrResults.soil) && (
                    <div className="space-y-6">
                      {irrResults.crop && (
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                          <h3 className="font-bold text-gray-500 mb-1">{t.crop || "Detected"}</h3>
                          <p className="font-bold text-gray-800">{translateExact(irrResults.crop.detected_crop)}</p>
                        </div>
                      )}
                      {irrResults.soil && (
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                          <h3 className="font-bold text-gray-500 mb-1">{t.soil || "Detected"}</h3>
                          <p className="font-bold text-gray-800">{translateExact(irrResults.soil.detected_soil)}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center min-h-[400px]">
                <div className="text-center text-gray-400">
                  <Droplets size={48} className="mx-auto mb-4 opacity-50 text-blue-300" />
                  <p>{t.irrNoInput || "Enter inputs"}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
