"""
Database initialization and utilities
Includes seeding with sample data
"""

from datetime import datetime, timedelta
from models import db, User, DiseaseSignal, Symptom, Patient, Prediction, Forecast
from flask_bcrypt import Bcrypt
import random

bcrypt = Bcrypt()

def init_database(app):
    """Initialize database with Flask app context"""
    with app.app_context():
        db.create_all()
        print("✓ Database initialized successfully")


def seed_database(app):
    """Seed database with sample data for testing"""
    with app.app_context():
        # Check if already seeded
        if User.query.first():
            print("Database already seeded. Skipping...")
            return
        
        print("🌱 Seeding database with sample data...")
        
        # Create sample users
        users = [
            User(
                email='doctor@pulsewatch.io',
                password_hash=bcrypt.generate_password_hash('12345').decode('utf-8'),
                full_name='Dr. Rajesh Kumar',
                role='doctor',
                hospital_affiliation='Apollo Hospital, Chennai',
                specialization='Internal Medicine'
            ),
            User(
                email='admin@pulsewatch.io',
                password_hash=bcrypt.generate_password_hash('12345').decode('utf-8'),
                full_name='Admin User',
                role='admin',
                hospital_affiliation='Government Medical College'
            ),
            User(
                email='user@pulsewatch.io',
                password_hash=bcrypt.generate_password_hash('12345').decode('utf-8'),
                full_name='Priya Singh',
                role='user'
            )
        ]
        
        db.session.add_all(users)
        db.session.commit()
        print(f"✓ Created {len(users)} users")
        
        # Create symptoms
        symptoms_data = [
            Symptom(name='fever', description='Body temperature above 98.6°F'),
            Symptom(name='cough', description='Persistent cough'),
            Symptom(name='sore_throat', description='Pain or itching in throat'),
            Symptom(name='fatigue', description='Extreme tiredness'),
            Symptom(name='body_aches', description='General body pain'),
            Symptom(name='headache', description='Head pain'),
            Symptom(name='loss_of_taste', description='Inability to taste food'),
            Symptom(name='loss_of_smell', description='Inability to smell'),
            Symptom(name='difficulty_breathing', description='Shortness of breath'),
            Symptom(name='chills', description='Sudden cold sensation'),
            Symptom(name='sweats', description='Excessive sweating'),
            Symptom(name='rash', description='Skin rashes or eruptions'),
            Symptom(name='vomiting', description='Throwing up'),
            Symptom(name='diarrhea', description='Loose motions'),
            Symptom(name='nausea', description='Feeling of sickness')
        ]
        
        db.session.add_all(symptoms_data)
        db.session.commit()
        print(f"✓ Created {len(symptoms_data)} symptoms")
        
        # Create disease signals
        locations = [
            ('Chennai, Tamil Nadu', 13.0827, 80.2707),
            ('Bangalore, Karnataka', 12.9716, 77.5946),
            ('Delhi, Delhi', 28.7041, 77.1025),
            ('Mumbai, Maharashtra', 19.0760, 72.8777),
            ('Kolkata, West Bengal', 22.5726, 88.3639)
        ]
        
        diseases = ['COVID-19', 'Influenza', 'Malaria', 'Dengue', 'Typhoid']
        
        signals = []
        for disease in diseases:
            for location, lat, lon in locations[:3]:  # Create signals for first 3 locations
                signal = DiseaseSignal(
                    disease_name=disease,
                    location=location,
                    latitude=lat,
                    longitude=lon,
                    reported_cases=random.randint(10, 500),
                    severity_level=random.choice(['low', 'medium', 'high']),
                    signal_strength=round(random.uniform(0.3, 0.95), 2),
                    data_source=random.choice(['hospital', 'news', 'WHO']),
                    description=f'{disease} outbreak detected in {location}',
                    confirmed=random.choice([True, False, False]),
                    timestamp=datetime.utcnow() - timedelta(days=random.randint(0, 30))
                )
                signals.append(signal)
        
        db.session.add_all(signals)
        db.session.commit()
        print(f"✓ Created {len(signals)} disease signals")
        
        # Create sample patients
        doctor = users[0]  # First doctor
        patients = []
        
        for i in range(5):
            patient = Patient(
                patient_id=f'PW{i:08d}',
                age=random.randint(18, 80),
                gender=random.choice(['M', 'F']),
                location=locations[i][0],
                latitude=locations[i][1],
                longitude=locations[i][2],
                medical_history=['asthma', 'hypertension'] if i % 2 == 0 else [],
                current_symptoms=['fever', 'cough'] if i % 2 == 0 else ['cough', 'sore_throat'],
                assigned_doctor_id=doctor.id,
                status=random.choice(['active', 'recovered', 'active']),
                last_checkup=datetime.utcnow() - timedelta(days=random.randint(0, 7))
            )
            patients.append(patient)
        
        db.session.add_all(patients)
        db.session.commit()
        print(f"✓ Created {len(patients)} patients")
        
        # Create sample predictions
        predictions = []
        for patient in patients:
            prediction = Prediction(
                user_id=doctor.id,
                patient_id=patient.id,
                symptoms=['fever', 'cough', 'fatigue'],
                vital_signs={
                    'temperature': 38.5,
                    'heart_rate': 95,
                    'blood_pressure': '120/80',
                    'respiratory_rate': 20
                },
                medical_history=patient.medical_history,
                predicted_diseases=[
                    {'disease': 'Influenza', 'score': 0.85},
                    {'disease': 'COVID-19', 'score': 0.72},
                    {'disease': 'Common Cold', 'score': 0.45}
                ],
                confidence_score=0.85,
                diagnosis='Influenza',
                recommendations='Rest, fluids, antipyretics. Follow-up in 3 days if symptoms persist.',
                model_version='1.0',
                execution_time_ms=random.randint(50, 200)
            )
            predictions.append(prediction)
        
        db.session.add_all(predictions)
        db.session.commit()
        print(f"✓ Created {len(predictions)} predictions")
        
        # Create sample forecasts
        forecasts = []
        for disease in diseases[:3]:
            for location, lat, lon in locations[:2]:
                # Create 7-day forecast
                forecast_data = {}
                for day in range(1, 8):
                    forecast_data[f'day_{day}'] = {
                        'cases': random.randint(50, 300),
                        'confidence': 0.95 - (day * 0.05)
                    }
                
                forecast = Forecast(
                    disease_name=disease,
                    location=location,
                    latitude=lat,
                    longitude=lon,
                    forecast_data=forecast_data,
                    model_type='Ensemble',
                    confidence_interval=0.95,
                    trend=random.choice(['increasing', 'decreasing', 'stable']),
                    growth_rate=round(random.uniform(-0.2, 0.3), 2),
                    valid_until=datetime.utcnow() + timedelta(days=7)
                )
                forecasts.append(forecast)
        
        db.session.add_all(forecasts)
        db.session.commit()
        print(f"✓ Created {len(forecasts)} forecasts")
        
        print("\n✅ Database seeding completed successfully!")
        print("\nSample Credentials:")
        print("  Doctor    - Email: doctor@pulsewatch.io      | Password: 12345")
        print("  Admin     - Email: admin@pulsewatch.io       | Password: 12345")
        print("  User      - Email: user@pulsewatch.io        | Password: 12345")


def clear_database(app):
    """Clear all data from database"""
    with app.app_context():
        print("⚠️  Clearing database...")
        db.drop_all()
        print("✓ Database cleared successfully")


def reset_database(app):
    """Reset database (drop all tables and recreate)"""
    clear_database(app)
    init_database(app)
    seed_database(app)
