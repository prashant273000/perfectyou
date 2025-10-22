from flask import Flask, request, jsonify
from flask_cors import CORS
import mediapipe as mp
import cv2
import numpy as np
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(static_image_mode=True)

# ---- HAIRSTYLE endpoint (existing) ----
def classify_face_shape(landmarks, image_shape):
    h, w = image_shape[:2]
    points = np.array([(int(lm.x * w), int(lm.y * h)) for lm in landmarks])
    chin = points[152]
    forehead = points[10]
    left_cheek = points[234]
    right_cheek = points[454]
    left_jaw = points[234]
    right_jaw = points[454]
    face_height = np.linalg.norm(forehead - chin)
    face_width = np.linalg.norm(left_cheek - right_cheek)
    jaw_width = np.linalg.norm(left_jaw - right_jaw)
    ratio_w_h = face_width / face_height
    ratio_jaw_face = jaw_width / face_width
    if ratio_w_h < 0.7:
        shape = "Oblong"
        suggestions = ["Long layers", "Curtain bangs", "Soft curls"]
    elif 0.7 <= ratio_w_h < 0.85 and ratio_jaw_face < 0.85:
        shape = "Oval"
        suggestions = ["Layered waves", "Side-swept bangs", "Soft curls"]
    elif 0.85 <= ratio_w_h < 1.0 and ratio_jaw_face > 0.9:
        shape = "Round"
        suggestions = ["Long layers", "High ponytail", "Side part"]
    elif ratio_w_h >= 1.0 and ratio_jaw_face > 0.95:
        shape = "Square"
        suggestions = ["Textured crop", "Soft waves", "Layered bob"]
    else:
        shape = "Heart"
        suggestions = ["Side fringe", "Chin-length bob", "Curly bangs"]
    return shape, suggestions

@app.route("/hairstyle", methods=["POST"])
def hairstyle():
    if 'photo' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    file = request.files['photo']
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)
    img = cv2.imread(filepath)
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    results = face_mesh.process(img_rgb)
    if not results.multi_face_landmarks:
        return jsonify({"error": "No face detected"}), 400
    landmarks = results.multi_face_landmarks[0].landmark
    face_shape, suggestions = classify_face_shape(landmarks, img.shape)
    return jsonify({
        "face_shape": face_shape,
        "hairstyle_suggestions": suggestions
    })


# ---- MOUSTACHE endpoint ----
@app.route("/moustache", methods=["POST"])
def moustache():
    return jsonify({
        "style": "Your moustache is average.",
        "tip": "Try keeping it trimmed and neat for a better look."
    })


# ---- PIMPLES endpoint ----
@app.route("/pimples", methods=["POST"])
def pimples():
    return jsonify({
        "pimple_status": "Mild acne detected",
        "tip": "Use gentle face wash and apply aloe vera daily."
    })


# ---- SPECTACLES endpoint ----
@app.route("/spectacles", methods=["POST"])
def spectacles():
    return jsonify({
        "suitability": "Round frames suit your face shape",
        "tip": "Try thin metallic frames for a stylish look."
    })


# ---- HAIR endpoint ----
@app.route("/hair", methods=["POST"])
def hair():
    data = request.get_json()
    hair_type = data.get("hair_type", "").lower()
    tips = {
        "dry": "Use hydrating shampoo and conditioner, avoid hot water.",
        "oily": "Wash hair regularly, avoid heavy oils.",
        "hard": "Use softening hair masks weekly.",
        "soft": "Use volumizing shampoo and gentle care."
    }
    tip = tips.get(hair_type, "Maintain a healthy hair care routine.")
    return jsonify({"hair_health": hair_type, "tip": tip})


# ---- DIET endpoint ----
@app.route("/diet", methods=["POST"])
def diet():
    data = request.get_json()
    goal = data.get("goal", "").lower()
    plans = {
        "lose": "7-day calorie deficit plan: Eat more protein and vegetables.",
        "gain": "7-day muscle gain plan: Eat protein-rich meals and carbs.",
        "maintain": "7-day maintenance plan: Balanced diet with protein, carbs, and fats."
    }
    tip = plans.get(goal, "Follow a balanced diet according to your needs.")
    return jsonify({"goal": goal, "plan": tip})


# ---- FITNESS endpoint ----
@app.route("/fitness", methods=["POST"])
def fitness():
    data = request.get_json()
    height = data.get("height")
    weight = data.get("weight")
    bmi = None
    if height and weight:
        try:
            height_m = float(height) / 100
            weight_kg = float(weight)
            bmi = round(weight_kg / (height_m**2), 1)
        except:
            bmi = None
    return jsonify({
        "bmi": bmi,
        "tip": "Do home workouts, pushups, squats, and light cardio."
    })


# ---- CONFIDENCE endpoint ----
@app.route("/confidence", methods=["POST"])
def confidence():
    data = request.get_json()
    problem = data.get("problem", "")
    return jsonify({
        "problem": problem,
        "tip": "Face your fear gradually and practice positive self-talk daily."
    })


# ---- DISEASE endpoint ----
@app.route("/disease", methods=["POST"])
def disease():
    data = request.get_json()
    disease_name = data.get("disease", "").lower()
    tips = {
        "diabetes": "Monitor sugar intake and exercise daily.",
        "hair fall": "Use mild shampoo and protein-rich diet.",
        "acne": "Keep skin clean, avoid oily foods."
    }
    tip = tips.get(disease_name, "Maintain healthy lifestyle and consult a doctor if necessary.")
    return jsonify({"disease": disease_name, "tip": tip})


# ---- CLOTHING endpoint ----
@app.route("/clothing", methods=["POST"])
def clothing():
    data = request.get_json()
    fat_dist = data.get("fat_distribution", "").lower()
    tips = {
        "upper": "Wear V-neck shirts to balance upper body.",
        "lower": "Wear straight pants to balance lower body.",
        "both": "Opt for structured outfits to enhance overall look."
    }
    tip = tips.get(fat_dist, "Choose clothes that fit you comfortably.")
    return jsonify({"fat_distribution": fat_dist, "tip": tip})


if __name__ == "__main__":
    app.run(debug=True)
