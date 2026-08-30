# PulseWatch India - API Documentation

**Base URL**: `http://localhost:5000/api`

---

## 📋 Table of Contents
1. [Authentication](#authentication)
2. [Predictions](#predictions)
3. [Disease Signals](#disease-signals)
4. [Patients](#patients)
5. [Forecasts](#forecasts)
6. [Response Formats](#response-formats)
7. [Error Handling](#error-handling)

---

## 🔐 Authentication

All protected endpoints require authentication via Bearer token in the Authorization header.

### Register User

**POST** `/auth/register`

Creates a new user account.

**Request Body:**
```json
{
  "email": "doctor@pulsewatch.io",
  "password": "12345",
  "full_name": "Dr. Rajesh Kumar",
  "role": "doctor",
  "hospital_affiliation": "Apollo Hospital",
  "specialization": "Internal Medicine",
  "phone_number": "+91-XXXXXXXXXX"
}
```

**Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "doctor@pulsewatch.io",
    "full_name": "Dr. Rajesh Kumar",
    "role": "doctor",
    "hospital_affiliation": "Apollo Hospital",
    "created_at": "2026-08-30T12:00:00"
  }
}
```

**Validation Rules:**
- Email must end with `@pulsewatch.io`
- Password must be 5-8 numeric digits
- Role must be: `user`, `doctor`, or `admin`

---

### Login

**POST** `/auth/login`

Authenticates user and returns session token.

**Request Body:**
```json
{
  "email": "doctor@pulsewatch.io",
  "password": "12345"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "doctor@pulsewatch.io",
    "full_name": "Dr. Rajesh Kumar",
    "role": "doctor",
    "created_at": "2026-08-30T12:00:00"
  },
  "session_id": 1
}
```

---

### Logout

**POST** `/auth/logout`

**Headers:**
```
Authorization: Bearer <session_id>
```

**Response (200 OK):**
```json
{
  "message": "Logout successful"
}
```

---

### Get Profile

**GET** `/auth/profile`

**Headers:**
```
Authorization: Bearer <session_id>
```

**Response (200 OK):**
```json
{
  "user": {
    "id": 1,
    "email": "doctor@pulsewatch.io",
    "full_name": "Dr. Rajesh Kumar",
    "role": "doctor",
    "created_at": "2026-08-30T12:00:00"
  }
}
```

---

### Update Profile

**PUT** `/auth/profile`

**Headers:**
```
Authorization: Bearer <session_id>
Content-Type: application/json
```

**Request Body:**
```json
{
  "full_name": "Dr. Rajesh Kumar Singh",
  "hospital_affiliation": "Apollo Hospital, Chennai",
  "phone_number": "+91-9876543210"
}
```

**Response (200 OK):**
```json
{
  "message": "Profile updated successfully",
  "user": { ... }
}
```

---

### Change Password

**POST** `/auth/change-password`

**Headers:**
```
Authorization: Bearer <session_id>
Content-Type: application/json
```

**Request Body:**
```json
{
  "old_password": "12345",
  "new_password": "54321"
}
```

**Response (200 OK):**
```json
{
  "message": "Password changed successfully"
}
```

---

## 🔍 Predictions

### Differential Diagnosis

**POST** `/predictions/differential-diagnosis`

Performs differential diagnosis based on symptoms using ML models.

**Headers:**
```
Authorization: Bearer <session_id>
Content-Type: application/json
```

**Request Body:**
```json
{
  "symptoms": ["fever", "cough", "sore_throat"],
  "vital_signs": {
    "temperature": 38.5,
    "heart_rate": 95,
    "blood_pressure": "120/80",
    "respiratory_rate": 20,
    "oxygen_saturation": 98
  },
  "medical_history": ["asthma", "hypertension"],
  "patient_id": 1,
  "duration_days": 3
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "prediction_id": 1,
  "data": {
    "primary_diagnosis": "Influenza",
    "confidence_score": 0.85,
    "differential_diagnoses": [
      {
        "disease": "Influenza",
        "score": 0.85,
        "confidence": 85.0,
        "severity": "moderate",
        "typical_duration_days": 7
      },
      {
        "disease": "COVID-19",
        "score": 0.72,
        "confidence": 72.0,
        "severity": "moderate_to_severe",
        "typical_duration_days": 14
      },
      {
        "disease": "Common Cold",
        "score": 0.45,
        "confidence": 45.0,
        "severity": "mild",
        "typical_duration_days": 5
      }
    ],
    "recommendations": [
      "Rest for 3-4 days minimum",
      "Maintain hydration with fluids",
      "Take antipyretics as prescribed",
      "Consider antiviral medications",
      "Monitor for complications"
    ]
  },
  "timestamp": "2026-08-30T12:00:00"
}
```

---

### Quick Symptom Check

**POST** `/predictions/quick-check`

Quick disease matching without authentication (no persistence).

**Request Body:**
```json
{
  "symptoms": ["fever", "cough"]
}
```

**Response (200 OK):**
```json
{
  "symptoms_input": ["fever", "cough"],
  "possible_diseases": [
    {
      "disease": "COVID-19",
      "match_score": 0.92
    },
    {
      "disease": "Influenza",
      "match_score": 0.90
    }
  ],
  "disclaimer": "This is for informational purposes only. Please consult a doctor..."
}
```

---

### Get Prediction History

**GET** `/predictions/history?page=1&limit=10`

**Headers:**
```
Authorization: Bearer <session_id>
```

**Response (200 OK):**
```json
{
  "total": 15,
  "pages": 2,
  "current_page": 1,
  "predictions": [
    {
      "id": 1,
      "symptoms": ["fever", "cough"],
      "predicted_diseases": [...],
      "confidence_score": 0.85,
      "diagnosis": "Influenza",
      "created_at": "2026-08-30T12:00:00"
    }
  ]
}
```

---

## 📊 Disease Signals

### Get All Signals

**GET** `/signals?disease=COVID-19&severity=high&confirmed=true&limit=50&offset=0`

**Query Parameters:**
- `disease`: Filter by disease name
- `location`: Filter by location
- `severity`: `low`, `medium`, `high`, `critical`
- `confirmed`: `true` or `false`
- `limit`: Results per page (default: 50)
- `offset`: Pagination offset

**Response (200 OK):**
```json
{
  "total": 150,
  "limit": 50,
  "offset": 0,
  "signals": [
    {
      "id": 1,
      "disease_name": "COVID-19",
      "location": "Chennai, Tamil Nadu",
      "latitude": 13.0827,
      "longitude": 80.2707,
      "reported_cases": 250,
      "severity_level": "high",
      "signal_strength": 0.85,
      "data_source": "hospital",
      "description": "Outbreak detected",
      "confirmed": true,
      "timestamp": "2026-08-30T12:00:00"
    }
  ]
}
```

---

### Create Disease Signal

**POST** `/signals`

**Headers:**
```
Authorization: Bearer <session_id>
Content-Type: application/json
```

**Request Body:**
```json
{
  "disease_name": "COVID-19",
  "location": "Chennai, Tamil Nadu",
  "latitude": 13.0827,
  "longitude": 80.2707,
  "reported_cases": 150,
  "severity_level": "medium",
  "signal_strength": 0.75,
  "data_source": "hospital",
  "description": "Outbreak detected in local hospital",
  "confirmed": false
}
```

**Response (201 Created):**
```json
{
  "message": "Signal created successfully",
  "signal": { ... }
}
```

**Note**: Only doctors and admins can create signals.

---

### Get Hotspots

**GET** `/signals/hotspots?disease=COVID-19&severity_threshold=medium`

**Response (200 OK):**
```json
{
  "hotspots": [
    {
      "location": "Chennai, Tamil Nadu",
      "latitude": 13.0827,
      "longitude": 80.2707,
      "diseases": ["COVID-19", "Influenza"],
      "total_cases": 450,
      "avg_severity": "high",
      "avg_signal_strength": 0.82
    }
  ],
  "total_hotspots": 5
}
```

---

### Get Signal Statistics

**GET** `/signals/statistics`

**Response (200 OK):**
```json
{
  "total_signals": 500,
  "confirmed_signals": 350,
  "recent_signals_7days": 120,
  "disease_distribution": [
    {
      "disease": "COVID-19",
      "count": 150
    },
    {
      "disease": "Influenza",
      "count": 120
    }
  ],
  "severity_distribution": [
    {
      "severity": "high",
      "count": 200
    },
    {
      "severity": "medium",
      "count": 250
    }
  ]
}
```

---

## 👥 Patients

### Get Patients

**GET** `/patients?status=active&page=1&limit=20`

**Headers:**
```
Authorization: Bearer <session_id>
```

**Query Parameters:**
- `status`: `active`, `recovered`, `deceased`
- `page`: Page number
- `limit`: Results per page

**Response (200 OK):**
```json
{
  "total": 45,
  "pages": 3,
  "current_page": 1,
  "patients": [
    {
      "id": 1,
      "patient_id": "PW12345678",
      "age": 35,
      "gender": "M",
      "location": "Chennai, Tamil Nadu",
      "status": "active",
      "created_at": "2026-08-30T12:00:00"
    }
  ]
}
```

---

### Create Patient

**POST** `/patients`

**Headers:**
```
Authorization: Bearer <session_id>
Content-Type: application/json
```

**Request Body:**
```json
{
  "age": 35,
  "gender": "M",
  "location": "Chennai, Tamil Nadu",
  "latitude": 13.0827,
  "longitude": 80.2707,
  "medical_history": ["hypertension", "diabetes"],
  "current_symptoms": ["fever", "cough"]
}
```

**Response (201 Created):**
```json
{
  "message": "Patient created successfully",
  "patient": {
    "id": 1,
    "patient_id": "PW12345678",
    "age": 35,
    "gender": "M",
    "location": "Chennai, Tamil Nadu",
    "status": "active",
    "created_at": "2026-08-30T12:00:00"
  }
}
```

---

### Get Patient Details

**GET** `/patients/{patient_id}`

**Response (200 OK):**
```json
{
  "patient": {
    "id": 1,
    "patient_id": "PW12345678",
    "age": 35,
    "gender": "M",
    "location": "Chennai",
    "medical_history": ["hypertension"],
    "current_symptoms": ["fever", "cough"],
    "status": "active",
    "created_at": "2026-08-30T12:00:00"
  },
  "predictions": [...]
}
```

---

### Update Patient Status

**PUT** `/patients/{patient_id}/status`

**Headers:**
```
Authorization: Bearer <session_id>
Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "recovered"
}
```

**Valid Status Values**: `active`, `recovered`, `deceased`

---

### Get Patient Statistics

**GET** `/patients/statistics`

**Response (200 OK):**
```json
{
  "total_patients": 45,
  "active_patients": 30,
  "recovered_patients": 12,
  "deceased_patients": 3,
  "average_age": 42.5,
  "gender_distribution": {
    "M": 25,
    "F": 20
  }
}
```

---

## 📈 Forecasts

### Generate 7-Day Forecast

**POST** `/forecasts/generate`

**Headers:**
```
Authorization: Bearer <session_id>
Content-Type: application/json
```

**Request Body:**
```json
{
  "disease_name": "COVID-19",
  "location": "Chennai, Tamil Nadu",
  "latitude": 13.0827,
  "longitude": 80.2707,
  "forecast_days": 7
}
```

**Response (201 Created):**
```json
{
  "message": "Forecast generated successfully",
  "forecast": {
    "id": 1,
    "disease_name": "COVID-19",
    "location": "Chennai, Tamil Nadu",
    "forecast_data": {
      "day_1": {
        "cases": 250,
        "confidence": 0.95
      },
      "day_2": {
        "cases": 280,
        "confidence": 0.90
      },
      "day_3": {
        "cases": 310,
        "confidence": 0.85
      }
    },
    "model_type": "Ensemble",
    "trend": "increasing",
    "growth_rate": 12.5
  }
}
```

---

### Get 7-Day Forecast

**GET** `/forecasts/7day?location=Chennai`

**Response (200 OK):**
```json
{
  "forecast_period": "7 days",
  "start_date": "2026-08-30",
  "end_date": "2026-09-06",
  "predictions": {
    "day_1": {
      "date": "2026-08-31",
      "diseases": {
        "COVID-19": {
          "predicted_cases": 250,
          "confidence": 0.95
        },
        "Influenza": {
          "predicted_cases": 100,
          "confidence": 0.88
        }
      }
    }
  }
}
```

---

### Get Risk Assessment

**POST** `/forecasts/risk-assessment`

**Request Body:**
```json
{
  "location": "Chennai, Tamil Nadu",
  "latitude": 13.0827,
  "longitude": 80.2707
}
```

**Response (200 OK):**
```json
{
  "location": "Chennai, Tamil Nadu",
  "risk_score": 75,
  "risk_level": "high",
  "active_forecasts": 5,
  "top_threats": [
    {
      "disease": "COVID-19",
      "predicted_cases": 500
    },
    {
      "disease": "Influenza",
      "predicted_cases": 350
    }
  ],
  "recommendations": [
    "Implement enhanced surveillance protocols",
    "Prepare isolation facilities",
    "Increase healthcare staff availability",
    "Communicate public health advisories",
    "Consider restricted gatherings"
  ]
}
```

**Risk Levels**:
- `low` (0-25): Continue routine monitoring
- `medium` (25-50): Increase monitoring frequency
- `high` (50-75): Implement enhanced protocols
- `critical` (75-100): Activate emergency response

---

## 📝 Response Formats

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful",
  "timestamp": "2026-08-30T12:00:00"
}
```

### Error Response
```json
{
  "error": "Error Type",
  "message": "Detailed error message",
  "code": "ERROR_CODE",
  "timestamp": "2026-08-30T12:00:00"
}
```

### Paginated Response
```json
{
  "total": 100,
  "pages": 5,
  "current_page": 1,
  "limit": 20,
  "offset": 0,
  "data": [...]
}
```

---

## ⚠️ Error Handling

### HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | Successful request |
| 201 | Created | Resource created |
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | Missing/invalid auth |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 500 | Server Error | Internal error |

### Common Errors

**Email Validation Error**
```json
{
  "error": "Invalid email format",
  "message": "Email must end with @pulsewatch.io"
}
```

**Password Validation Error**
```json
{
  "error": "Invalid password format",
  "message": "Password must be 5-8 numeric digits"
}
```

**Authorization Error**
```json
{
  "error": "Unauthorized",
  "message": "Authentication required"
}
```

---

## 🔗 Rate Limiting

- Default: 100 requests per hour
- Burst: 10 requests per minute

**Headers**:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1630334400
```

---

## 📌 API Versioning

Current API Version: **v1.0**

Future versions will be available at:
- `/api/v2/...`
- `/api/v3/...`

---

**Last Updated**: 2026-08-30
