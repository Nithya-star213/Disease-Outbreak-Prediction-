/* PulseWatch India - Real-Time Ingestion Data Service & Mock API */

const MOCK_CLUSTERS = [
    {
        id: "cluster-1",
        location: "Kozhikode, Kerala",
        lat: 11.2588,
        lng: 75.7804,
        alert_level: "EMERGENCY",
        severity: "EMERGENCY",
        primary_symptom: "Hemorrhage",
        top_symptom: "Hemorrhage",
        risk_score: 9.8,
        z_score: 9.8,
        signal_count: 42,
        description: "Severe Nipah Virus encephalitis cluster detected. 3km containment radius enforced."
    },
    {
        id: "cluster-2",
        location: "Bengaluru, Karnataka",
        lat: 12.9716,
        lng: 77.5946,
        alert_level: "WARNING",
        severity: "WARNING",
        primary_symptom: "Fever",
        top_symptom: "Fever",
        risk_score: 7.4,
        z_score: 7.4,
        signal_count: 28,
        description: "Dengue fever vector surge detected across East Bengaluru zones."
    },
    {
        id: "cluster-3",
        location: "Mumbai, Maharashtra",
        lat: 19.0760,
        lng: 72.8777,
        alert_level: "WARNING",
        severity: "WARNING",
        primary_symptom: "Cough",
        top_symptom: "Cough",
        risk_score: 6.8,
        z_score: 6.8,
        signal_count: 22,
        description: "Monsoon respiratory illness and cough signal increase in suburban clinics."
    },
    {
        id: "cluster-4",
        location: "Delhi NCR",
        lat: 28.6139,
        lng: 77.2090,
        alert_level: "WATCH",
        severity: "WATCH",
        primary_symptom: "Shortness of Breath",
        top_symptom: "Shortness of Breath",
        risk_score: 5.2,
        z_score: 5.2,
        signal_count: 15,
        description: "Winter respiratory distress and asthma signals monitored across NCR hospitals."
    },
    {
        id: "cluster-5",
        location: "Bhubaneswar, Odisha",
        lat: 20.2961,
        lng: 85.8245,
        alert_level: "WATCH",
        severity: "WATCH",
        primary_symptom: "Chills",
        top_symptom: "Chills",
        risk_score: 4.8,
        z_score: 4.8,
        signal_count: 11,
        description: "Seasonal malaria fever and chills signals monitored in coastal districts."
    }
];

const MOCK_SIGNALS = [
    // Fever Signals across Twitter, WHO, NewsAPI, Google Trends
    {
        id: "sig-101",
        source: "Twitter / X Stream",
        timestamp: "2 mins ago",
        location: "Bengaluru, Karnataka",
        symptom: "fever",
        alert_level: "WARNING",
        confidence: 94,
        icon: "fa-hashtag",
        text: "High fever cases spiking rapidly across East Bengaluru clinics. Doctors advising immediate Dengue CBC platelet tests."
    },
    {
        id: "sig-102",
        source: "WHO RSS Feed",
        timestamp: "5 mins ago",
        location: "Kozhikode, Kerala",
        symptom: "fever",
        alert_level: "EMERGENCY",
        confidence: 98,
        icon: "fa-rss",
        text: "WHO Disease Outbreak News: Acute viral fever and encephalitis encephalitis signals confirmed in Kozhikode district."
    },
    {
        id: "sig-103",
        source: "NewsAPI India",
        timestamp: "8 mins ago",
        location: "Chennai, Tamil Nadu",
        symptom: "fever",
        alert_level: "WARNING",
        confidence: 91,
        icon: "fa-newspaper",
        text: "Greater Chennai Corporation launches door-to-door fever surveys following seasonal viral surge in T. Nagar and Velachery."
    },
    {
        id: "sig-104",
        source: "Twitter / X Stream",
        timestamp: "12 mins ago",
        location: "Mumbai, Maharashtra",
        symptom: "fever",
        alert_level: "WARNING",
        confidence: 89,
        icon: "fa-hashtag",
        text: "Multiple patients reporting high fever, joint pain, and body aches at KEM Hospital outpatient wards."
    },
    {
        id: "sig-105",
        source: "Google Trends",
        timestamp: "15 mins ago",
        location: "Delhi NCR",
        symptom: "fever",
        alert_level: "WATCH",
        confidence: 86,
        icon: "fa-chart-line",
        text: "Search queries for 'dengue fever symptoms' and 'platelet count test near me' increased +310% in Delhi NCR region."
    },

    // Cough & Respiratory Signals
    {
        id: "sig-201",
        source: "Twitter / X Stream",
        timestamp: "18 mins ago",
        location: "Mumbai, Maharashtra",
        symptom: "cough",
        alert_level: "WARNING",
        confidence: 92,
        icon: "fa-hashtag",
        text: "Persistent dry cough and bronchospasm complaints surging across Dadar and Thane health dispensaries."
    },
    {
        id: "sig-202",
        source: "NewsAPI India",
        timestamp: "22 mins ago",
        location: "Delhi NCR",
        symptom: "cough",
        alert_level: "WATCH",
        confidence: 88,
        icon: "fa-newspaper",
        text: "AIIMS Delhi reports increased pediatric admissions for chronic cough and acute bronchitis during winter pollution peaks."
    },
    {
        id: "sig-203",
        source: "WHO RSS Feed",
        timestamp: "25 mins ago",
        location: "Kolkata, West Bengal",
        symptom: "cough",
        alert_level: "WATCH",
        confidence: 90,
        icon: "fa-rss",
        text: "Surveillance registry notes localized clusters of influenza-like illness presenting with severe cough."
    },

    // Skin Rash & Dengue Signals
    {
        id: "sig-301",
        source: "Twitter / X Stream",
        timestamp: "30 mins ago",
        location: "Bengaluru, Karnataka",
        symptom: "rash",
        alert_level: "WARNING",
        confidence: 93,
        icon: "fa-hashtag",
        text: "Red skin rash, high fever, and joint stiffness reported by several residents in Indiranagar and Koramangala."
    },
    {
        id: "sig-302",
        source: "NewsAPI India",
        timestamp: "35 mins ago",
        location: "Hyderabad, Telangana",
        symptom: "rash",
        alert_level: "WATCH",
        confidence: 87,
        icon: "fa-newspaper",
        text: "Health officers issue vector alert following clusters of maculopapular skin rash and chikungunya cases."
    },

    // Severe Headache & Encephalitis Signals
    {
        id: "sig-401",
        source: "WHO RSS Feed",
        timestamp: "40 mins ago",
        location: "Kozhikode, Kerala",
        symptom: "headache",
        alert_level: "EMERGENCY",
        confidence: 97,
        icon: "fa-rss",
        text: "Severe acute headache accompanied by fever and drowsiness logged in Kozhikode isolation unit."
    },
    {
        id: "sig-402",
        source: "Twitter / X Stream",
        timestamp: "45 mins ago",
        location: "Pune, Maharashtra",
        symptom: "headache",
        alert_level: "WATCH",
        confidence: 85,
        icon: "fa-hashtag",
        text: "Patients reporting throbbing frontal headache and photophobia at Sassoon General Hospital emergency desk."
    },

    // Hemorrhage Signals
    {
        id: "sig-501",
        source: "WHO RSS Feed",
        timestamp: "50 mins ago",
        location: "Kozhikode, Kerala",
        symptom: "hemorrhage",
        alert_level: "EMERGENCY",
        confidence: 99,
        icon: "fa-rss",
        text: "Spontaneous mucosal hemorrhage and low platelet count observed in confirmed Nipah contact cases."
    }
];

async function fetchClusters() {
    return MOCK_CLUSTERS;
}

async function fetchLiveSignals() {
    return MOCK_SIGNALS;
}

async function fetchForecast(clusterId) {
    return {
        cluster_id: clusterId,
        historical_days: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
        historical_counts: [12, 14, 18, 22, 29, 35, 42],
        forecast_days: ["Day 8", "Day 9", "Day 10", "Day 11", "Day 12", "Day 13", "Day 14"],
        forecast_counts: [52, 68, 85, 96, 104, 110, 108]
    };
}
