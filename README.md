# AgroVision AI 🚀

AgroVision AI is an intelligent agricultural assistant designed to empower farmers with data-driven insights. It provides crop recommendations based on soil and weather conditions, smart irrigation advice, and crop/soil health detection using AI.

## Project Structure

- **`frontend/`**: A modern React + Vite application providing a premium user interface.
- **`backend/`**: A Flask-based REST API that handles weather data integration, recommendation logic, and mock AI processing.

## Features

- **Crop Recommendation**: Suggests the best crops based on soil type and seasonal data.
- **Smart Irrigation**: Provides real-time irrigation advice by analyzing moisture thresholds, temperature, and rainfall.
- **Weather Insights**: Real-time weather monitoring for precise agricultural planning.
- **AI Detection (Mock)**: Visual recognition placeholders for crop diseases and soil types.

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 18+

### Setup and Running

#### Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the server:
   ```bash
   python app.py
   ```

#### Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## License

MIT
