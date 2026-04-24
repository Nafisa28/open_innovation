import React, { createContext, useState, useContext } from 'react';

const DICTIONARY = {
  English: {
    // Navbar
    navHome: "Home", navDashboard: "Dashboard", navHow: "How It Works", navAbout: "About",
    // Home Page
    heroTitle: "Smart Farming Starts Here", heroSub: "AI-powered crop recommendation and irrigation advice for every farmer.", getStarted: "Get Started",
    feat1Title: "Crop Recommendation", feat1Desc: "Get AI-suggested crops tailored to your soil and local climate.",
    feat2Title: "Smart Irrigation", feat2Desc: "Weather-integrated watering advice to save water and boost yield.",
    feat3Title: "Voice Assistant", feat3Desc: "Speak to the app in your local language to get instant results.",
    feat4Title: "Multilingual", feat4Desc: "Read and listen to recommendations in Hindi, Kannada, and more.",
    // Dashboard Common
    langLabel: "Language", locLabel: "Location", locationPlaceholder: "e.g. Pune, India", analyze: "Analyze", listen: "Listen to Results",
    // Crop Tab
    cropTab: "Crop Recommendations", soilLabel: "Soil Type", seasonLabel: "Season", uploadCrop: "Upload Crop Image", uploadSoil: "Upload Soil Image",
    cropNoInput: "Enter inputs and click Analyze to see crop recommendations",
    weather: "Weather Summary", crop: "Detected Crop", soil: "Detected Soil", recs: "Recommendations",
    // Irrigation Tab
    irrTab: "Smart Irrigation", cropTypeLabel: "Current Crop",
    irrNoInput: "Enter inputs and click Analyze to get irrigation advice",
    irr: "Irrigation Advice",
    // Backend String Matches
    "Scattered Clouds": "Scattered Clouds", "Clear Sky": "Clear Sky",
    "Water your crop today. High temperatures detected.": "Water your crop today. High temperatures detected.",
    "Light watering recommended.": "Light watering recommended.",
    "No irrigation needed. Sufficient rainfall expected.": "No irrigation needed. Sufficient rainfall expected.",
    "Healthy Wheat": "Healthy Wheat", "Rice Blast (Disease Detected)": "Rice Blast (Disease Detected)", "Healthy Maize": "Healthy Maize", "Cotton Leaf Curl (Disease Detected)": "Cotton Leaf Curl (Disease Detected)",
    "Red Soil": "Red Soil", "Black Soil": "Black Soil", "Alluvial Soil": "Alluvial Soil", "Laterite Soil": "Laterite Soil",
    "Maize": "Maize", "Adaptable to various soil types.": "Adaptable to various soil types.",
    "Soybean": "Soybean", "Good nitrogen fixer for general soils.": "Good nitrogen fixer for general soils.",
    "Rice": "Rice", "Thrives in water-retentive clay soil.": "Thrives in water-retentive clay soil.",
    "Wheat": "Wheat", "Grows well in heavy clay soil during rabi season.": "Grows well in heavy clay soil during rabi season.",
    "Groundnut": "Groundnut", "Requires well-drained sandy soil.": "Requires well-drained sandy soil.",
    "Millets": "Millets", "Highly drought resistant.": "Highly drought resistant.",
    "Cotton": "Cotton", "Perfect for nutrient-rich loamy soil.": "Perfect for nutrient-rich loamy soil.",
    "Sugarcane": "Sugarcane", "Grows optimally in loamy soil with high moisture.": "Grows optimally in loamy soil with high moisture.",
    // Soil types dropdown
    "Sandy": "Sandy", "Clay": "Clay", "Loamy": "Loamy", "Red": "Red", "Black": "Black",
    // Seasons dropdown
    "Kharif": "Kharif", "Rabi": "Rabi", "Summer": "Summer"
  },
  Hindi: {
    // Navbar
    navHome: "मुख्य पृष्ठ", navDashboard: "डैशबोर्ड", navHow: "यह कैसे काम करता है", navAbout: "हमारे बारे में",
    // Home Page
    heroTitle: "स्मार्ट खेती यहाँ से शुरू होती है", heroSub: "प्रत्येक किसान के लिए एआई-संचालित फसल की सिफारिश और सिंचाई सलाह।", getStarted: "शुरू करें",
    feat1Title: "फसल की सिफारिश", feat1Desc: "अपनी मिट्टी और स्थानीय जलवायु के अनुरूप एआई-सुझाई गई फसलें प्राप्त करें।",
    feat2Title: "स्मार्ट सिंचाई", feat2Desc: "पानी बचाने और उपज बढ़ाने के लिए मौसम-एकीकृत पानी देने की सलाह।",
    feat3Title: "वॉयस असिस्टेंट", feat3Desc: "त्वरित परिणाम प्राप्त करने के लिए अपनी स्थानीय भाषा में ऐप से बात करें।",
    feat4Title: "बहुभाषी", feat4Desc: "हिंदी, कन्नड़ और अन्य भाषाओं में सिफारिशें पढ़ें और सुनें।",
    // Dashboard Common
    langLabel: "भाषा", locLabel: "स्थान", locationPlaceholder: "उदा. पुणे, भारत", analyze: "विश्लेषण करें", listen: "परिणाम सुनें",
    // Crop Tab
    cropTab: "फसल की सिफारिशें", soilLabel: "मिट्टी का प्रकार", seasonLabel: "मौसम", uploadCrop: "फसल की छवि अपलोड करें", uploadSoil: "मिट्टी की छवि अपलोड करें",
    cropNoInput: "फसल की सिफारिशें देखने के लिए इनपुट दर्ज करें और विश्लेषण पर क्लिक करें",
    weather: "मौसम सारांश", crop: "पहचानी गई फसल", soil: "पहचानी गई मिट्टी", recs: "सिफारिशें",
    // Irrigation Tab
    irrTab: "स्मार्ट सिंचाई", cropTypeLabel: "वर्तमान फसल",
    irrNoInput: "सिंचाई सलाह प्राप्त करने के लिए इनपुट दर्ज करें और विश्लेषण पर क्लिक करें",
    irr: "सिंचाई सलाह",
    // Backend String Matches
    "Scattered Clouds": "छितरे हुए बादल", "Clear Sky": "साफ आसमान",
    "Water your crop today. High temperatures detected.": "आज अपनी फसल को पानी दें। उच्च तापमान का पता चला है।",
    "Light watering recommended.": "हल्की सिंचाई की सलाह दी जाती है।",
    "No irrigation needed. Sufficient rainfall expected.": "सिंचाई की आवश्यकता नहीं है। पर्याप्त वर्षा की उम्मीद है।",
    "Healthy Wheat": "स्वस्थ गेहूं", "Rice Blast (Disease Detected)": "राइस ब्लास्ट (बीमारी का पता चला)", "Healthy Maize": "स्वस्थ मक्का", "Cotton Leaf Curl (Disease Detected)": "कपास लीफ कर्ल (बीमारी का पता चला)",
    "Red Soil": "लाल मिट्टी", "Black Soil": "काली मिट्टी", "Alluvial Soil": "जलोढ़ मिट्टी", "Laterite Soil": "लेटराइट मिट्टी",
    "Maize": "मक्का", "Adaptable to various soil types.": "विभिन्न प्रकार की मिट्टी के अनुकूल।",
    "Soybean": "सोयाबीन", "Good nitrogen fixer for general soils.": "सामान्य मिट्टी के लिए अच्छा नाइट्रोजन फिक्सर।",
    "Rice": "चावल", "Thrives in water-retentive clay soil.": "जल-धारण करने वाली चिकनी मिट्टी में पनपता है।",
    "Wheat": "गेहूं", "Grows well in heavy clay soil during rabi season.": "रबी के मौसम में भारी चिकनी मिट्टी में अच्छी तरह से बढ़ता है।",
    "Groundnut": "मूंगफली", "Requires well-drained sandy soil.": "अच्छी तरह से सूखी रेतीली मिट्टी की आवश्यकता है।",
    "Millets": "बाजरा", "Highly drought resistant.": "अत्यधिक सूखा प्रतिरोधी।",
    "Cotton": "कपास", "Perfect for nutrient-rich loamy soil.": "पोषक तत्वों से भरपूर दोमट मिट्टी के लिए बिल्कुल सही।",
    "Sugarcane": "गन्ना", "Grows optimally in loamy soil with high moisture.": "उच्च नमी के साथ दोमट मिट्टी में बेहतर ढंग से बढ़ता है।",
    "Sandy": "रेतीली", "Clay": "चिकनी", "Loamy": "दोमट", "Red": "लाल", "Black": "काली",
    "Kharif": "खरीफ", "Rabi": "रबी", "Summer": "गर्मी"
  },
  Kannada: {
    // Navbar
    navHome: "ಮುಖಪುಟ", navDashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", navHow: "ಕಾರ್ಯವಿಧಾನ", navAbout: "ನಮ್ಮ ಬಗ್ಗೆ",
    // Home Page
    heroTitle: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಇಲ್ಲಿಂದ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ", heroSub: "ಪ್ರತಿಯೊಬ್ಬ ರೈತರಿಗೆ AI-ಆಧಾರಿತ ಬೆಳೆ ಶಿಫಾರಸು ಮತ್ತು ನೀರಾವರಿ ಸಲಹೆ.", getStarted: "ಪ್ರಾರಂಭಿಸಿ",
    feat1Title: "ಬೆಳೆ ಶಿಫಾರಸು", feat1Desc: "ನಿಮ್ಮ ಮಣ್ಣು ಮತ್ತು ಸ್ಥಳೀಯ ಹವಾಮಾನಕ್ಕೆ ತಕ್ಕಂತೆ AI-ಸೂಚಿತ ಬೆಳೆಗಳನ್ನು ಪಡೆಯಿರಿ.",
    feat2Title: "ಸ್ಮಾರ್ಟ್ ನೀರಾವರಿ", feat2Desc: "ನೀರನ್ನು ಉಳಿಸಲು ಮತ್ತು ಇಳುವರಿಯನ್ನು ಹೆಚ್ಚಿಸಲು ಹವಾಮಾನ-ಸಂಯೋಜಿತ ನೀರಾವರಿ ಸಲಹೆ.",
    feat3Title: "ಧ್ವನಿ ಸಹಾಯಕ", feat3Desc: "ತ್ವರಿತ ಫಲಿತಾಂಶಗಳನ್ನು ಪಡೆಯಲು ನಿಮ್ಮ ಸ್ಥಳೀಯ ಭಾಷೆಯಲ್ಲಿ ಆ್ಯಪ್‌ನೊಂದಿಗೆ ಮಾತನಾಡಿ.",
    feat4Title: "ಬಹುಭಾಷಾ", feat4Desc: "ಹಿಂದಿ, ಕನ್ನಡ ಮತ್ತು ಹೆಚ್ಚಿನ ಭಾಷೆಗಳಲ್ಲಿ ಶಿಫಾರಸುಗಳನ್ನು ಓದಿ ಮತ್ತು ಆಲಿಸಿ.",
    // Dashboard Common
    langLabel: "ಭಾಷೆ", locLabel: "ಸ್ಥಳ", locationPlaceholder: "ಉದಾ. ಪುಣೆ, ಭಾರತ", analyze: "ವಿಶ್ಲೇಷಿಸಿ", listen: "ಫಲಿತಾಂಶಗಳನ್ನು ಆಲಿಸಿ",
    // Crop Tab
    cropTab: "ಬೆಳೆ ಶಿಫಾರಸುಗಳು", soilLabel: "ಮಣ್ಣಿನ ಪ್ರಕಾರ", seasonLabel: "ಋತು", uploadCrop: "ಬೆಳೆಯ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ", uploadSoil: "ಮಣ್ಣಿನ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    cropNoInput: "ಬೆಳೆ ಶಿಫಾರಸುಗಳನ್ನು ನೋಡಲು ಇನ್‌ಪುಟ್‌ಗಳನ್ನು ನಮೂದಿಸಿ ಮತ್ತು ವಿಶ್ಲೇಷಿಸಿ ಕ್ಲಿಕ್ ಮಾಡಿ",
    weather: "ಹವಾಮಾನ ಸಾರಾಂಶ", crop: "ಪತ್ತೆಯಾದ ಬೆಳೆ", soil: "ಪತ್ತೆಯಾದ ಮಣ್ಣು", recs: "ಶಿಫಾರಸುಗಳು",
    // Irrigation Tab
    irrTab: "ಸ್ಮಾರ್ಟ್ ನೀರಾವರಿ", cropTypeLabel: "ಪ್ರಸ್ತುತ ಬೆಳೆ",
    irrNoInput: "ನೀರಾವರಿ ಸಲಹೆ ಪಡೆಯಲು ಇನ್‌ಪುಟ್‌ಗಳನ್ನು ನಮೂದಿಸಿ ಮತ್ತು ವಿಶ್ಲೇಷಿಸಿ ಕ್ಲಿಕ್ ಮಾಡಿ",
    irr: "ನೀರಾವರಿ ಸಲಹೆ",
    // Backend String Matches
    "Scattered Clouds": "ಚದುರಿದ ಮೋಡಗಳು", "Clear Sky": "ಶುಭ್ರ ಆಕಾಶ",
    "Water your crop today. High temperatures detected.": "ಇಂದು ನಿಮ್ಮ ಬೆಳೆಗೆ ನೀರು ಹಾಕಿ. ಹೆಚ್ಚಿನ ತಾಪಮಾನ ಪತ್ತೆಯಾಗಿದೆ.",
    "Light watering recommended.": "ಲಘು ನೀರಾವರಿ ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ.",
    "No irrigation needed. Sufficient rainfall expected.": "ನೀರಾವರಿ ಅಗತ್ಯವಿಲ್ಲ. ಸಾಕಷ್ಟು ಮಳೆಯ ನಿರೀಕ್ಷೆಯಿದೆ.",
    "Healthy Wheat": "ಆರೋಗ್ಯಕರ ಗೋಧಿ", "Rice Blast (Disease Detected)": "ರೈಸ್ ಬ್ಲಾಸ್ಟ್ (ರೋಗ ಪತ್ತೆಯಾಗಿದೆ)", "Healthy Maize": "ಆರೋಗ್ಯಕರ ಮೆಕ್ಕೆಜೋಳ", "Cotton Leaf Curl (Disease Detected)": "ಹತ್ತಿ ಎಲೆ ಸುರುಳಿ (ರೋಗ ಪತ್ತೆಯಾಗಿದೆ)",
    "Red Soil": "ಕೆಂಪು ಮಣ್ಣು", "Black Soil": "ಕಪ್ಪು ಮಣ್ಣು", "Alluvial Soil": "ಮೆಕ್ಕಲು ಮಣ್ಣು", "Laterite Soil": "ಲ್ಯಾಟರೈಟ್ ಮಣ್ಣು",
    "Maize": "ಮೆಕ್ಕೆಜೋಳ", "Adaptable to various soil types.": "ವಿವಿಧ ಮಣ್ಣಿನ ಪ್ರಕಾರಗಳಿಗೆ ಹೊಂದಿಕೊಳ್ಳಬಲ್ಲದು.",
    "Soybean": "ಸೋಯಾಬೀನ್", "Good nitrogen fixer for general soils.": "ಸಾಮಾನ್ಯ ಮಣ್ಣಿಗೆ ಉತ್ತಮ ಸಾರಜನಕ ಫಿಕ್ಸರ್.",
    "Rice": "ಭತ್ತ", "Thrives in water-retentive clay soil.": "ನೀರನ್ನು ಹಿಡಿದಿಟ್ಟುಕೊಳ್ಳುವ ಜೇಡಿಮಣ್ಣಿನಲ್ಲಿ ಬೆಳೆಯುತ್ತದೆ.",
    "Wheat": "ಗೋಧಿ", "Grows well in heavy clay soil during rabi season.": "ರಬಿ ಋತುವಿನಲ್ಲಿ ಭಾರೀ ಜೇಡಿಮಣ್ಣಿನಲ್ಲಿ ಚೆನ್ನಾಗಿ ಬೆಳೆಯುತ್ತದೆ.",
    "Groundnut": "ಕಡಲೆಕಾಯಿ", "Requires well-drained sandy soil.": "ಚೆನ್ನಾಗಿ ಬರಿದಾದ ಮರಳು ಮಣ್ಣು ಅಗತ್ಯವಿದೆ.",
    "Millets": "ಸಿರಿಧಾನ್ಯಗಳು", "Highly drought resistant.": "ಹೆಚ್ಚು ಬರ ನಿರೋಧಕ.",
    "Cotton": "ಹತ್ತಿ", "Perfect for nutrient-rich loamy soil.": "ಪೋಷಕಾಂಶ ಭರಿತ ಲೋಮಿ ಮಣ್ಣಿಗೆ ಸೂಕ್ತವಾಗಿದೆ.",
    "Sugarcane": "ಕಬ್ಬು", "Grows optimally in loamy soil with high moisture.": "ಹೆಚ್ಚಿನ ತೇವಾಂಶವಿರುವ ಲೋಮಿ ಮಣ್ಣಿನಲ್ಲಿ ಉತ್ತಮವಾಗಿ ಬೆಳೆಯುತ್ತದೆ.",
    "Sandy": "ಮರಳು", "Clay": "ಜೇಡಿ", "Loamy": "ಲೋಮಿ", "Red": "ಕೆಂಪು", "Black": "ಕಪ್ಪು",
    "Kharif": "ಖಾರಿಫ್", "Rabi": "ರಬಿ", "Summer": "ಬೇಸಿಗೆ"
  }
};

const LanguageContext = createContext({
  language: 'English',
  setLanguage: () => {},
  t: DICTIONARY.English,
  translateExact: (str) => str,
  langs: ['English', 'Hindi', 'Kannada']
});

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('English');
  const t = DICTIONARY[language] || DICTIONARY.English;
  
  const translateExact = (str) => {
    if (!str) return str;
    return t[str] || str;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translateExact, langs: Object.keys(DICTIONARY) }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
