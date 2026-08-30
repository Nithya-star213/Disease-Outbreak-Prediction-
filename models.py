"""
Database Models for PulseWatch India Platform
Includes: User, DiseaseSignal, Patient, Prediction, Symptom
"""

from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from datetime import datetime
import json

db = SQLAlchemy()

class User(UserMixin, db.Model):
    """User model for authentication"""
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    full_name = db.Column(db.String(120))
    role = db.Column(db.String(20), default='user')  # 'user', 'doctor', 'admin'
    hospital_affiliation = db.Column(db.String(255))
    specialization = db.Column(db.String(120))
    phone_number = db.Column(db.String(15))
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    patients = db.relationship('Patient', backref='assigned_doctor', lazy=True)
    predictions = db.relationship('Prediction', backref='user', lazy=True)
    
    def __repr__(self):
        return f'<User {self.email}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'full_name': self.full_name,
            'role': self.role,
            'hospital_affiliation': self.hospital_affiliation,
            'created_at': self.created_at.isoformat()
        }


class DiseaseSignal(db.Model):
    """Real-time disease signals and outbreak data"""
    __tablename__ = 'disease_signals'
    
    id = db.Column(db.Integer, primary_key=True)
    disease_name = db.Column(db.String(120), nullable=False, index=True)
    location = db.Column(db.String(255), nullable=False)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    reported_cases = db.Column(db.Integer, default=0)
    severity_level = db.Column(db.String(20))  # 'low', 'medium', 'high', 'critical'
    signal_strength = db.Column(db.Float)  # 0-1 probability score
    data_source = db.Column(db.String(120))  # 'hospital', 'news', 'social_media', 'WHO'
    description = db.Column(db.Text)
    confirmed = db.Column(db.Boolean, default=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f'<DiseaseSignal {self.disease_name} at {self.location}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'disease_name': self.disease_name,
            'location': self.location,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'reported_cases': self.reported_cases,
            'severity_level': self.severity_level,
            'signal_strength': self.signal_strength,
            'data_source': self.data_source,
            'description': self.description,
            'confirmed': self.confirmed,
            'timestamp': self.timestamp.isoformat()
        }


class Symptom(db.Model):
    """Symptom database for differential diagnosis"""
    __tablename__ = 'symptoms'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.Text)
    severity_scale = db.Column(db.String(50))  # 'mild', 'moderate', 'severe'
    duration_days = db.Column(db.Integer)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<Symptom {self.name}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'severity_scale': self.severity_scale
        }


class Patient(db.Model):
    """Patient records and medical history"""
    __tablename__ = 'patients'
    
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.String(50), unique=True, nullable=False)
    age = db.Column(db.Integer)
    gender = db.Column(db.String(10))  # 'M', 'F', 'Other'
    location = db.Column(db.String(255))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    medical_history = db.Column(db.JSON)  # Previous diseases/conditions
    current_symptoms = db.Column(db.JSON)  # Array of symptom IDs
    assigned_doctor_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    status = db.Column(db.String(20), default='active')  # 'active', 'recovered', 'deceased'
    last_checkup = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    predictions = db.relationship('Prediction', backref='patient', lazy=True)
    
    def __repr__(self):
        return f'<Patient {self.patient_id}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'patient_id': self.patient_id,
            'age': self.age,
            'gender': self.gender,
            'location': self.location,
            'status': self.status,
            'created_at': self.created_at.isoformat()
        }


class Prediction(db.Model):
    """Disease predictions and diagnoses"""
    __tablename__ = 'predictions'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'))
    
    # Input data
    symptoms = db.Column(db.JSON, nullable=False)  # Array of symptoms
    vital_signs = db.Column(db.JSON)  # Heart rate, BP, temp, etc.
    medical_history = db.Column(db.JSON)
    
    # Prediction results
    predicted_diseases = db.Column(db.JSON, nullable=False)  # Array with scores
    confidence_score = db.Column(db.Float)
    diagnosis = db.Column(db.String(255))
    recommendations = db.Column(db.Text)
    
    # Metadata
    model_version = db.Column(db.String(20), default='1.0')
    execution_time_ms = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<Prediction {self.id} - {self.diagnosis}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'symptoms': self.symptoms,
            'predicted_diseases': self.predicted_diseases,
            'confidence_score': self.confidence_score,
            'diagnosis': self.diagnosis,
            'recommendations': self.recommendations,
            'created_at': self.created_at.isoformat()
        }


class Forecast(db.Model):
    """Disease outbreak forecasts"""
    __tablename__ = 'forecasts'
    
    id = db.Column(db.Integer, primary_key=True)
    disease_name = db.Column(db.String(120), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    
    # Forecast data
    forecast_data = db.Column(db.JSON)  # 7-day forecast with LSTM/XGBoost predictions
    model_type = db.Column(db.String(20))  # 'LSTM', 'XGBoost', 'Ensemble'
    confidence_interval = db.Column(db.Float)  # 95%, 90%, 80%
    
    # Trend analysis
    trend = db.Column(db.String(20))  # 'increasing', 'decreasing', 'stable'
    growth_rate = db.Column(db.Float)
    
    forecast_date = db.Column(db.DateTime, default=datetime.utcnow)
    valid_until = db.Column(db.DateTime)  # When forecast expires
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<Forecast {self.disease_name} at {self.location}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'disease_name': self.disease_name,
            'location': self.location,
            'forecast_data': self.forecast_data,
            'model_type': self.model_type,
            'trend': self.trend,
            'growth_rate': self.growth_rate,
            'forecast_date': self.forecast_date.isoformat()
        }
