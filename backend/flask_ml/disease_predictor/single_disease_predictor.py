import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier, VotingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score
import joblib
from flask import jsonify

# Define global variables
data_file_path = pd.read_csv('data/Training.csv')
model_directory = 'flask_ml'
model_path = os.path.join(model_directory, 'single_disease_predictor_model.joblib')
best_feature_subset = [0, 1, 2, 3, 4, 6, 7, 8, 11, 14, 19, 20, 21, 24, 25, 26, 27, 
                       28, 29, 30, 31, 32, 39, 49, 51]

# Ensure the model directory exists
if not os.path.exists(model_directory):
    os.makedirs(model_directory)

def train_model(data_file_path):
    """Train the disease prediction model."""
    df = pd.read_csv(data_file_path)
    X = df.iloc[:, :-1].values
    y = df.iloc[:, -1].values
    X_best = X[:, best_feature_subset]
    X_train, X_test, y_train, y_test = train_test_split(X_best, y, test_size=0.2, random_state=42)
    
    voting_clf = VotingClassifier(
        estimators=[
            ("Logistic Regression", LogisticRegression(max_iter=1000)),
            ("Random Forest", RandomForestClassifier()),
            ("Decision Tree", DecisionTreeClassifier()),
            ("SVM", SVC(probability=True)),
            ("KNN", KNeighborsClassifier()),
            ("Naive Bayes", GaussianNB()),
            ("Gradient Boosting", GradientBoostingClassifier())
        ],
        voting='soft'
    )
    voting_clf.fit(X_train, y_train)
    joblib.dump(voting_clf, model_path)
    print("Model trained and saved at", model_path)

def load_model():
    """Load the trained disease prediction model."""
    if not os.path.exists(model_path):
        raise FileNotFoundError("Model file not found. Train the model first.")
    return joblib.load(model_path)

def predict_disease(input_data):
    """Predict disease based on input symptoms."""
    if len(input_data) != len(best_feature_subset):
        raise ValueError("Invalid input length. Provide inputs for all required symptoms.")
    model = load_model()
    input_data = [input_data]
    return model.predict(input_data)[0]

def upload_training_data(request, data_file_path):
    """Upload new training data."""
    try:
        # Check if a file is included in the request
        if 'file' not in request.files:
            return jsonify({"error": "No file provided"}), 400
        
        # Get the file from the request
        file = request.files['file']
        
        # Check if the file is a CSV
        if not file.filename.endswith('.csv'):
            return jsonify({"error": "Invalid file format. Please upload a CSV file."}), 400
        
        # Load existing dataset or initialize
        df = pd.read_csv(data_file_path) if os.path.exists(data_file_path) else pd.DataFrame()
        uploaded_data = pd.read_csv(file)
        
        # Validate columns match
        if not df.empty and list(uploaded_data.columns) != list(df.columns):
            return jsonify({"error": "Column mismatch. Uploaded file must match the existing dataset structure."}), 400
        
        # Append and save updated data
        df = pd.concat([df, uploaded_data], ignore_index=True)
        df.to_csv(data_file_path, index=False)
        
        # Re-train the model
        train_model(data_file_path)
        return jsonify({"message": "Data uploaded, saved, and model re-trained successfully."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
