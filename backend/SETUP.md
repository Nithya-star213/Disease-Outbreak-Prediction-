# PulseWatch India - Backend Setup Guide

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- pip (Python package manager)
- Git
- SQLite3 (included with Python)

### Installation Steps

#### 1. Clone the Repository
```bash
git clone https://github.com/Nithya-star213/Disease-Outbreak-Prediction-.git
cd Disease-Outbreak-Prediction
```

#### 2. Create Virtual Environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

#### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

#### 4. Configure Environment Variables
```bash
# Copy example env file
cp .env.example .env

# Edit .env with your settings
# At minimum, set:
# SECRET_KEY=your-secret-key
# DATABASE_URL=sqlite:///pulsewatch.db
```

#### 5. Initialize Database
```bash
python -c "from app import app; from database import init_database, seed_database; init_database(app); seed_database(app)"
```

#### 6. Run the Application
```bash
python app.py
```

The API server will start at: **http://localhost:5000**

---

## 📁 Project Structure

```
backend/
├── app.py                          # Main Flask application
├── models.py                       # Database models
├── database.py                     # Database initialization
├── requirements.txt                # Python dependencies
├── .env.example                    # Environment template
├── routes/
│   ├── __init__.py
│   ├── auth_routes.py             # Authentication endpoints
│   ├── prediction_routes.py        # Diagnosis prediction endpoints
│   ├── signal_routes.py            # Disease signal endpoints
│   ├── patient_routes.py           # Patient management endpoints
│   └── forecast_routes.py          # Forecast endpoints
├── ml_models/
│   ├── __init__.py
│   └── differential_diagnosis.py   # ML diagnosis engine
├── utils/
│   ├── __init__.py
│   ├── validators.py               # Input validation
│   ├── decorators.py               # Custom decorators
│   └── helpers.py                  # Utility functions
└── logs/                           # Application logs
```

---

## 🔌 API Endpoints

### Authentication

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "doctor@pulsewatch.io",
  "password": "12345",
  "full_name": "Dr. John Doe",
  "role": "doctor",
  "hospital_affiliation": "City Hospital"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "doctor@pulsewatch.io",
  "password": "12345"
}
```

#### Get Profile
```
GET /api/auth/profile
Authorization: Bearer <token>
```

### Predictions

#### Differential Diagnosis
```
POST /api/predictions/differential-diagnosis
Authorization: Bearer <token>
Content-Type: application/json

{
  "symptoms": ["fever", "cough", "sore_throat"],
  "vital_signs": {
    "temperature": 38.5,
    "heart_rate": 95,
    "blood_pressure": "120/80"
  },
  "patient_id": 1
}
```

#### Quick Check (No Auth)
```
POST /api/predictions/quick-check
Content-Type: application/json

{
  "symptoms": ["fever", "cough"]
}
```

### Disease Signals

#### Get All Signals
```
GET /api/signals?disease=COVID-19&severity=high
```

#### Create Signal
```
POST /api/signals
Authorization: Bearer <token>
Content-Type: application/json

{
  "disease_name": "COVID-19",
  "location": "Chennai, Tamil Nadu",
  "latitude": 13.0827,
  "longitude": 80.2707,
  "reported_cases": 150,
  "severity_level": "medium"
}
```

#### Get Hotspots
```
GET /api/signals/hotspots?disease=COVID-19
```

### Patients

#### Get Patients
```
GET /api/patients?status=active&page=1&limit=10
Authorization: Bearer <token>
```

#### Create Patient
```
POST /api/patients
Authorization: Bearer <token>
Content-Type: application/json

{
  "age": 35,
  "gender": "M",
  "location": "Chennai",
  "medical_history": ["asthma", "diabetes"],
  "current_symptoms": ["fever", "cough"]
}
```

### Forecasts

#### Generate Forecast
```
POST /api/forecasts/generate
Authorization: Bearer <token>
Content-Type: application/json

{
  "disease_name": "COVID-19",
  "location": "Chennai, Tamil Nadu",
  "latitude": 13.0827,
  "longitude": 80.2707,
  "forecast_days": 7
}
```

#### Get 7-Day Forecast
```
GET /api/forecasts/7day?location=Chennai
```

#### Get Risk Assessment
```
POST /api/forecasts/risk-assessment
Content-Type: application/json

{
  "location": "Chennai, Tamil Nadu"
}
```

---

## 🔐 Authentication

### Credentials Format
- **Email**: Must end with `@pulsewatch.io`
- **Password**: 5-8 numeric digits (e.g., `12345`)

### Sample Credentials
After seeding, use:
```
Email: doctor@pulsewatch.io
Password: 12345

Email: admin@pulsewatch.io
Password: 12345

Email: user@pulsewatch.io
Password: 12345
```

---

## 🧪 Testing

### Run Unit Tests
```bash
pytest tests/ -v
```

### Run with Coverage
```bash
pytest tests/ --cov=. --cov-report=html
```

### Load Testing
```bash
# Using locust
pip install locust
locust -f tests/locustfile.py --host=http://localhost:5000
```

---

## 📊 Database

### Using SQLite (Default)
```bash
# Database file: pulsewatch.db
# Query using:
sqlite3 pulsewatch.db
```

### Switch to PostgreSQL

1. Install PostgreSQL:
```bash
pip install psycopg2-binary
```

2. Update `.env`:
```
DATABASE_URL=postgresql://user:password@localhost/pulsewatch
```

3. Create database:
```bash
createdb pulsewatch
```

---

## 🐳 Docker Deployment

### Build Docker Image
```bash
docker build -t pulsewatch-api .
```

### Run Docker Container
```bash
docker run -p 5000:5000 \
  -e SECRET_KEY=your-secret \
  -e DATABASE_URL=sqlite:///pulsewatch.db \
  pulsewatch-api
```

### Docker Compose
```bash
docker-compose up -d
```

---

## 🌐 CORS Configuration

Default CORS settings allow requests from:
- `http://localhost:8000` (Frontend)
- `http://localhost:3000` (React Dev)

Update in `.env`:
```
CORS_ORIGINS=http://localhost:8000,http://your-domain.com
```

---

## 📝 Logging

Logs are written to: `logs/pulsewatch.log`

Configure in `.env`:
```
LOG_LEVEL=INFO  # DEBUG, INFO, WARNING, ERROR
LOG_FILE=logs/pulsewatch.log
```

---

## 🚨 Production Deployment

### Prerequisites
- Gunicorn or uWSGI
- Nginx reverse proxy
- PostgreSQL database
- Redis cache (optional)

### Deploy with Gunicorn
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name api.pulsewatch.io;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Environment Variables for Production
```bash
FLASK_ENV=production
FLASK_DEBUG=False
SECRET_KEY=your-very-secure-key
DATABASE_URL=postgresql://user:password@host/pulsewatch
```

---

## 🆘 Troubleshooting

### Import Errors
```bash
# Ensure virtual environment is activated
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

### Database Errors
```bash
# Reset database
python -c "from app import app; from database import reset_database; reset_database(app)"
```

### Port Already in Use
```bash
# Change port in .env
FLASK_PORT=5001
```

### CORS Issues
```bash
# Update CORS_ORIGINS in .env
CORS_ORIGINS=http://localhost:8000,http://localhost:3000
```

---

## 📚 Documentation

- [Flask Documentation](https://flask.palletsprojects.com/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [Flask-Login Documentation](https://flask-login.readthedocs.io/)

---

## 📧 Support

For issues or questions:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Include error logs and steps to reproduce

---

## 📄 License

This project is developed by Department of Artificial Intelligence & Data Science, S.A. Engineering College.

---

**Last Updated**: 2026
