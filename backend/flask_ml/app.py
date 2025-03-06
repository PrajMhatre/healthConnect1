from flask import Flask, request, jsonify
from flask_cors import CORS
from disease_predictor.single_disease_predictor import (
    train_model as train_single_model,
    load_model as load_single_model,
    predict_disease as predict_single_disease,
    upload_training_data as upload_single_training_data
)
# from disease_predictor.multiple_diseases_predictor import (
#     train_model as train_multiple_model,
#     load_model as load_multiple_model,
#     predict_diseases as predict_multiple_diseases,
#     upload_training_data as upload_multiple_training_data
# )
import os
import logging
# Initialize the Flask application
app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

logging.basicConfig(level=logging.DEBUG)
# Set the data file paths
SINGLE_DISEASE_DATA_FILE_PATH = 'data/Training25.csv'
# MULTIPLE_DISEASE_DATA_FILE_PATH = 'data/Training.csv'

# Ensure the dataset directory exists
if not os.path.exists('data'):
    os.makedirs('data')

# Train and save the models if datasets exist
if os.path.exists(SINGLE_DISEASE_DATA_FILE_PATH):
    train_single_model(SINGLE_DISEASE_DATA_FILE_PATH)

# if os.path.exists(MULTIPLE_DISEASE_DATA_FILE_PATH):
#     train_multiple_model(MULTIPLE_DISEASE_DATA_FILE_PATH)

# Routes for single disease prediction
@app.route('/single/upload', methods=['POST'])
def upload_single_data():
    return upload_single_training_data(request, SINGLE_DISEASE_DATA_FILE_PATH)

@app.route('/single/predict', methods=['POST'])
def predict_single():
    try:
        logging.debug(f"Request data: {request.data}")
        logging.debug(f"Request JSON: {request.json}")
        input_data = request.json.get('symptoms')
        logging.info(f"Received symptoms for prediction: {input_data}")
        
        if not input_data:
            return jsonify({"error": "No symptoms provided"}), 400
        
        prediction = predict_single_disease(input_data)
        logging.info(f"Prediction result: {prediction}")
        return jsonify({"disease": prediction}), 200
    except Exception as e:
        logging.error(f"Error during prediction: {str(e)}")
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500

# Routes for multiple disease prediction
# @app.route('/multiple/upload', methods=['POST'])
# def upload_multiple_data():
#     return upload_multiple_training_data(request, MULTIPLE_DISEASE_DATA_FILE_PATH)

# @app.route('/multiple/predict', methods=['POST'])
# def predict_multiple():
#     try:
#         # Get input data
#         input_data = request.json.get('symptoms')

#         # Call the prediction function
#         prediction = predict_multiple_diseases(input_data)
        
#         # Return prediction as JSON (auto-handled by jsonify)
#         return jsonify({"diseases": prediction}), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)
