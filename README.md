# 🌾 AgroVision AI — Smart Farming Starts Here

> Helping farmers grow the right crops, at the right time, with the right amount of water.

---

## 🌱 What Problem Does This Solve?

Farming in India is hard. Every season, farmers face the same difficult questions:

- **"Which crop should I grow this season?"** — Choosing the wrong crop for the soil or weather leads to poor yield and financial loss.
- **"How much water does my field need today?"** — Over-watering wastes precious water. Under-watering damages crops. Both hurt the farmer.
- **"Where do I get reliable advice?"** — Most farmers don't have easy access to agricultural experts, especially in rural areas.

These problems are made worse by unpredictable weather, varying soil conditions, and the lack of affordable, easy-to-use tools built specifically for farmers.

**AgroVision AI solves all of this — for free, from any phone or computer.**

---

## 💡 What Is AgroVision AI?

**AgroVision AI** is a smart farming web application that gives farmers personalized crop and irrigation advice based on their local conditions — instantly, in their own language.

A farmer simply provides:
- Their **location** (or it detects automatically)
- Their **soil type** (Sandy, Clay, Loamy, Red, or Black)
- The current **season** (Kharif, Rabi, or Summer)
- Optionally, a **photo** of their crop or soil

And within seconds, the app tells them:
- ✅ **Which 2–3 crops are best** to grow right now
- 💧 **Whether to water today** — or not
- 🌤️ **Current weather** at their location
- 🗣️ Results in **English, Hindi, Kannada**
- 🔊 Option to **listen** to the advice aloud (for low-literacy users)

---

## 🔍 How Does It Work?

Here's the simple step-by-step flow:

```
1. Farmer opens the app on their phone or computer
        ↓
2. Enters location, soil type, and season
   (or speaks it using the voice button 🎙️)
        ↓
3. Optionally uploads a photo of their crop or soil
        ↓
4. App fetches live weather data for their location 🌤️
        ↓
5. AI analyses all inputs together
        ↓
6. App shows:
   → Best crops to grow
   → Whether to irrigate today
   → Reasoning behind each suggestion
        ↓
7. Farmer can listen to the results in their language 🔊
```

No agriculture degree needed. No expert required. Just open and ask.

---

## 🛠️ Tech Stack

- **Frontend**: React + Vite (Modern, fast UI)
- **Backend**: Python Flask (Robust API)
- **Styling**: Vanilla CSS (Premium design tokens)
- **Data**: OpenWeatherMap API (Real-time weather)
- **Accessibility**: Web Speech API (Voice input and Read-aloud)

---

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 18+

### Setup and Running

#### 1. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

#### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173/`.

---

## 🗣️ Language Support

AgroVision AI speaks your language. Results can be viewed and heard in:
- 🇮🇳 Hindi
- 🌿 Kannada
- 🌐 English (default)

---

## 📬 Contact & Contributions

Have feedback or want to contribute? Open an issue or reach out — this project is built for the farming community and every improvement helps a real farmer.

---

> Built with ❤️ for the farmers of India.
