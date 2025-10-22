#PerfectYou-AI

PerfectYou AI is a web application that analyzes user photos and personal information to provide personalized recommendations for hairstyles, skin care, fitness, diet, clothing, and confidence-building tips using AI.

## Features

- Hairstyle Advisor: Suggests hairstyles based on facial structure.
- Pimple & Skin Analysis: Detects skin issues like pimples and provides remedies.
- Moustache Advisor: Evaluates moustache style and recommends suitable options.
- Spectacles Advisor: Suggests glasses that suit your face shape.
- Hair Quality Advisor: Tips for maintaining different hair types.
- Clothing Advisor: Recommends outfits based on body fat distribution.
- Fitness Coach: Provides home exercises and BMI-based fitness guidance.
- Diet Planner: Generates personalized diet plans for your goals.
- Disease & Wellness Advisor: Offers lifestyle suggestions for common conditions.
- Confidence Coach: Provides actionable tips to improve confidence.

## Technologies Used

- Frontend: React, Tailwind CSS
- Backend: Python Flask
- AI Integration: Gemini API (via OpenAI Python SDK)
- Image Processing: MediaPipe, OpenCV
- Others: Axios for HTTP requests, Flask-CORS for cross-origin requests

## Project Structure

```

perfectyou-ai/
├── backend/
│   ├── app.py
│   ├── uploads/
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
└── README.md

```

## Installation

### Backend Setup

1. Create a Python virtual environment:

```

python -m venv venv

```

2. Activate the virtual environment:
- Windows:

```

.\venv\Scripts\activate

```

- Linux/Mac:

```

source venv/bin/activate

```

3. Install dependencies:

```

pip install -r requirements.txt

```

4. Run the backend server:

```

python app.py

```

### Frontend Setup

1. Navigate to the frontend folder:

```

cd frontend

```

2. Install Node.js dependencies:

```

npm install

```

3. Start the development server:

```

npm start

```

4. Open your browser at `http://localhost:3000`.

## Usage

1. Ensure the Flask backend is running on `http://127.0.0.1:5000`.
2. Open the React frontend.
3. Navigate to different sections (Hairstyle, Pimples, Hair, etc.) and upload your photo or enter details.
4. Get AI-powered personalized recommendations instantly.
