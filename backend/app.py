from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import random
import os

app = Flask(__name__)
# Enable CORS for all routes
CORS(app)

# Dummy API Key for OpenWeatherMap
WEATHER_API_KEY = os.environ.get("OPENWEATHER_API_KEY", "dummy_key")

@app.route('/', methods=['GET'])
def index():
    return jsonify({
        "message": "AgroVision AI API is running! 🚀", 
        "frontend": "Please access the web app at http://localhost:5173"
    }), 200

@app.route('/api/weather', methods=['GET'])
def get_weather():
    city = request.args.get('location')
    if not city:
        return jsonify({"error": "Location is required"}), 400
    
    # Mock response if dummy key is used
    if WEATHER_API_KEY == "dummy_key":
        mock_data = {
            "temperature": random.randint(20, 35),
            "humidity": random.randint(40, 80),
            "rainfall": random.randint(0, 20),
            "description": "Scattered Clouds"
        }
        return jsonify(mock_data)

    # Real call logic placeholder
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={WEATHER_API_KEY}&units=metric"
    try:
        response = requests.get(url)
        data = response.json()
        if response.status_code == 200:
            result = {
                "temperature": data['main']['temp'],
                "humidity": data['main']['humidity'],
                "rainfall": data.get('rain', {}).get('1h', 0),
                "description": data['weather'][0]['description'].title()
            }
            return jsonify(result)
        else:
            return jsonify({"error": "City not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/recommend', methods=['POST'])
def recommend_crop():
    data = request.json
    soil_type = data.get('soil_type', '').lower()
    season = data.get('season', '').lower()
    
    # Mock ML Logic based on if/else
    recommendations = []
    if "clay" in soil_type:
        recommendations = [
            {"crop": "Rice", "reason": "Thrives in water-retentive clay soil."},
            {"crop": "Wheat", "reason": "Grows well in heavy clay soil during rabi season."}
        ]
    elif "sandy" in soil_type:
        recommendations = [
            {"crop": "Groundnut", "reason": "Requires well-drained sandy soil."},
            {"crop": "Millets", "reason": "Highly drought resistant."}
        ]
    elif "loamy" in soil_type:
        recommendations = [
            {"crop": "Cotton", "reason": "Perfect for nutrient-rich loamy soil."},
            {"crop": "Sugarcane", "reason": "Grows optimally in loamy soil with high moisture."}
        ]
    else:
        recommendations = [
            {"crop": "Maize", "reason": "Adaptable to various soil types."},
            {"crop": "Soybean", "reason": "Good nitrogen fixer for general soils."}
        ]
        
    return jsonify({"recommendations": recommendations})

CROP_THRESHOLDS = {
    "Wheat": 40,
    "Rice": 70,
    "Tomato": 55,
    "Maize": 50,
    "Cotton": 45
}

@app.route('/api/irrigation', methods=['POST'])
def irrigation_advice():
    data = request.json
    rainfall = float(data.get('rainfall', 0))
    temp = float(data.get('temperature', 25))
    crop_type = data.get('crop_type', 'Wheat')
    current_moisture = float(data.get('current_moisture', 50))
    
    threshold = float(CROP_THRESHOLDS.get(crop_type, 50))
    
    if current_moisture < threshold:
        advice = f"Water your crop. Current moisture ({int(current_moisture)}%) is below the {crop_type} threshold ({int(threshold)}%)."
    elif rainfall > 10:
        advice = f"No irrigation needed. Sufficient rainfall expected, and moisture ({int(current_moisture)}%) is good."
    else:
        advice = f"No irrigation needed. Moisture ({int(current_moisture)}%) is sufficient for {crop_type}."
        
    return jsonify({
        "advice": advice,
        "crop": crop_type,
        "threshold": int(threshold),
        "current_moisture": int(current_moisture)
    })

@app.route('/api/detect-crop', methods=['POST'])
def detect_crop():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400
    
    # Mock image detection
    crops = ["Healthy Wheat", "Rice Blast (Disease Detected)", "Healthy Maize", "Cotton Leaf Curl (Disease Detected)"]
    selected = random.choice(crops)
    confidence = round(random.uniform(0.85, 0.99), 2)
    
    return jsonify({
        "detected_crop": selected,
        "confidence": confidence
    })

@app.route('/api/detect-soil', methods=['POST'])
def detect_soil():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400
    
    # Mock image detection
    soils = ["Red Soil", "Black Soil", "Alluvial Soil", "Laterite Soil"]
    selected = random.choice(soils)
    confidence = round(random.uniform(0.80, 0.98), 2)
    
    return jsonify({
        "detected_soil": selected,
        "confidence": confidence
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
