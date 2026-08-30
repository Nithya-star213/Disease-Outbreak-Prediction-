"""
PulseWatch India - Disease Outbreak Intelligence Platform
Main Flask Application with API Routes
Developed by: Department of Artificial Intelligence & Data Science, S.A. Engineering College
"""

from flask import Flask, request, jsonify, session, redirect
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from flask_bcrypt import Bcrypt
from datetime import datetime, timedelta
from pathlib import Path
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

PROJECT_ROOT = Path(__file__).resolve().parent
FRONTEND_DIR = PROJECT_ROOT / 'frontend' / 'web'

# Initialize Flask app
app = Flask(__name__, static_folder=str(FRONTEND_DIR), static_url_path='')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'pulsewatch-secret-key-2026')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///pulsewatch.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SESSION_PERMANENT'] = False

# Initialize extensions
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

# Enable CORS
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Import models and routes
from models import User, DiseaseSignal, Patient, Prediction

try:
    from routes import (
        auth_routes,
        prediction_routes,
        signal_routes,
        patient_routes,
        forecast_routes
    )

    # Register blueprints
    app.register_blueprint(auth_routes.bp)
    app.register_blueprint(prediction_routes.bp)
    app.register_blueprint(signal_routes.bp)
    app.register_blueprint(patient_routes.bp)
    app.register_blueprint(forecast_routes.bp)
except ImportError:
    # The external disease-outbreak frontend is being served directly from the
    # cloned repository while the API route package is not present in this workspace.
    pass

# User loader for Flask-Login
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Health check endpoint
@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat(),
        'service': 'PulseWatch India API'
    }), 200

# Root endpoint
@app.route('/', methods=['GET'])
def root():
    return redirect('/login.html')


@app.route('/api/', methods=['GET'])
def api_root():
    """Root API endpoint"""
    return jsonify({
        'name': 'PulseWatch India - Disease Outbreak Intelligence Platform',
        'version': '1.0.0',
        'endpoints': {
            'auth': '/api/auth',
            'predictions': '/api/predictions',
            'signals': '/api/signals',
            'patients': '/api/patients',
            'forecasts': '/api/forecasts'
        }
    }), 200

# Error handlers
@app.errorhandler(400)
def bad_request(error):
    return jsonify({'error': 'Bad Request', 'message': str(error)}), 400

@app.errorhandler(401)
def unauthorized(error):
    return jsonify({'error': 'Unauthorized', 'message': 'Authentication required'}), 401

@app.errorhandler(403)
def forbidden(error):
    return jsonify({'error': 'Forbidden', 'message': 'Access denied'}), 403

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not Found', 'message': 'Resource not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return jsonify({'error': 'Internal Server Error', 'message': str(error)}), 500

# Create database tables
def create_tables():
    """Create all database tables"""
    with app.app_context():
        db.create_all()
        print("✓ Database tables created successfully")

if __name__ == '__main__':
    create_tables()
    app.run(
        host=os.getenv('FLASK_HOST', '0.0.0.0'),
        port=int(os.getenv('FLASK_PORT', 5000)),
        debug=os.getenv('FLASK_DEBUG', True)
    )
