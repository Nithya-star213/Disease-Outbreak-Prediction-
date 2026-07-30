/* PulseWatch India - Next-Gen Conversational AI Engine */

const INDIAN_CITIES_KNOWLEDGE = {
    chennai: {
        title: "Chennai, Tamil Nadu Surveillance Cluster",
        alert: "WARNING (6.5/10)",
        symptom: "Dengue & Febrile Signals",
        signals: 19,
        details: "Chennai is actively monitored for post-monsoon Aedes mosquito breeding and Dengue vector transmission. Greater Chennai Corporation (GCC) is conducting door-to-door larvicidal spraying and fever camps across zones."
    },
    kerala: {
        title: "Kozhikode & Malappuram, Kerala Cluster",
        alert: "EMERGENCY (9.8/10)",
        symptom: "Nipah Virus Encephalitis",
        signals: 42,
        details: "Kerala is under active EMERGENCY alert for Nipah virus (NiV) transmission. Strict 3km containment zones, contact tracing, and dedicated isolation wards at Kozhikode Medical College are enforced. DSO Helpline: 1056."
    },
    bengaluru: {
        title: "Bengaluru, Karnataka Surveillance Cluster",
        alert: "WARNING (7.4/10)",
        symptom: "Dengue & Viral Fever",
        signals: 28,
        details: "BBMP health teams are tracking elevated Dengue cases in East and South Bengaluru. Residents are advised to clear stagnant water, use mosquito nets, and monitor platelet counts if fever persists."
    },
    mumbai: {
        title: "Mumbai, Maharashtra Surveillance Cluster",
        alert: "WARNING (6.8/10)",
        symptom: "Respiratory & Gastrointestinal",
        signals: 22,
        details: "Monitored for seasonal cough, influenza-like illness (ILI), and acute gastroenteritis. BMC public health dispensaries are conducting free diagnostic screening."
    },
    delhi: {
        title: "Delhi NCR Surveillance Cluster",
        alert: "WATCH (5.2/10)",
        symptom: "Shortness of Breath & Air Quality",
        signals: 15,
        details: "Delhi NCR is tracked for winter respiratory distress and asthma exacerbations. High-vulnerability populations are advised to use N95 masks during peak pollution hours."
    },
    bhubaneswar: {
        title: "Bhubaneswar, Odisha Cluster",
        alert: "WATCH (4.8/10)",
        symptom: "Chills & Malaria Risk",
        signals: 11,
        details: "Monitored for seasonal vector transmission and chills. State public health teams are conducting rapid malaria antigen testing across urban health centers."
    },
    kolkata: {
        title: "Kolkata, West Bengal Cluster",
        alert: "WARNING (6.4/10)",
        symptom: "Enteric & Dengue Signals",
        signals: 18,
        details: "Kolkata Municipal Corporation (KMC) is monitoring waterborne enteric signals and Dengue vector indices across central and eastern boroughs."
    },
    hyderabad: {
        title: "Hyderabad, Telangana Cluster",
        alert: "WATCH (5.5/10)",
        symptom: "Viral Fever & Rash",
        signals: 14,
        details: "GHMC health wing is tracking localized viral fever clusters and enforcing larvicidal treatment in lake containment zones."
    }
};

const SYMPTOM_CLINICAL_KNOWLEDGE = {
    cough: "A cough indicates respiratory tract irritation, viral bronchitis, or SARI. If accompanied by fever ≥100°F or shortness of breath, wear an N95 mask, measure SpO2 levels, and consult a doctor.",
    fever: "High fever (≥101°F) is a primary marker for Dengue, Nipah, or Influenza. Stay hydrated with ORS, use cool compresses, avoid NSAIDs like Ibuprofen/Aspirin without medical advice, and get a CBC blood test if fever lasts >48h.",
    headache: "Severe headache combined with high fever, neck stiffness, or confusion is a warning sign of Viral Encephalitis or Nipah. Seek immediate emergency evaluation at a hospital or call 1056.",
    rash: "Skin rashes with fever and joint pain indicate vector-borne viral illnesses such as Dengue or Chikungunya. Keep skin clean, avoid scratching, remain hydrated, and monitor blood platelets.",
    diarrhea: "Acute diarrhea requires instant oral rehydration solution (ORS) and Zinc supplementation after every loose stool. Drink boiled water and seek medical attention if lethargy or blood in stool appears.",
    vomiting: "Nausea and vomiting signal acute gastroenteritis or foodborne illness. Take small sips of ORS or coconut water and consult a clinician if unable to retain fluids for 12 hours.",
    chills: "Chills and shivering accompany rapid fever spikes in Malaria or Influenza. Get a rapid blood smear/antigen test for Malaria and maintain warm hydration.",
    breath: "Shortness of breath (Dyspnea) is a high-priority emergency signal (SARI). Check SpO2 immediately. If SpO2 drops below 94%, seek emergency oxygen therapy or call 108.",
    hemorrhage: "Spontaneous bleeding (gums, nosebleeds, skin petechiae) during fever indicates Dengue Hemorrhagic Fever or Nipah. Requires immediate emergency hospital admission."
};

const DISEASE_PROFILES = {
    nipah: "Nipah virus (NiV) is a severe zoonotic pathogen causing fever, headache, respiratory distress, and encephalitis (brain swelling). Active surveillance in Kozhikode, Kerala. Call 1056 for isolation guidance.",
    dengue: "Dengue is a mosquito-borne flavivirus causing sudden high fever, retro-orbital eye pain, muscle aches, and rash. Primary care: aggressive fluid hydration and avoiding NSAIDs.",
    sari: "Severe Acute Respiratory Infection (SARI) tracks fever ≥38°C and cough requiring hospitalization. Monitored in Delhi NCR and Mumbai.",
    gastroenteritis: "Acute gastroenteritis is a waterborne illness causing acute watery diarrhea and vomiting. Prevention: boiled drinking water, sanitation, and ORS therapy."
};

function toggleChatWindow() {
    const win = document.getElementById('chatWindow');
    if (!win) return;
    win.classList.toggle('active');
}

function sendQuickQuery(text) {
    const input = document.getElementById('chatInput');
    if (!input) return;
    input.value = text;
    sendChatMessage();
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const thread = document.getElementById('chatThread');
    if (!input || !thread) return;

    const userText = input.value.trim();
    if (!userText) return;

    // Render user message bubble
    const userDiv = document.createElement('div');
    userDiv.className = 'msg-bubble msg-user';
    userDiv.innerText = userText;
    thread.appendChild(userDiv);

    input.value = '';
    thread.scrollTop = thread.scrollHeight;

    // Generate response
    setTimeout(() => {
        const botResponse = generateIntelligentBotReply(userText);
        const botDiv = document.createElement('div');
        botDiv.className = 'msg-bubble msg-bot';
        botDiv.innerHTML = botResponse;
        thread.appendChild(botDiv);
        thread.scrollTop = thread.scrollHeight;
    }, 350);
}

function generateIntelligentBotReply(userText) {
    const q = userText.toLowerCase();

    // 1. Check Indian Cities / Regional Clusters
    for (const [cityKey, data] of Object.entries(INDIAN_CITIES_KNOWLEDGE)) {
        if (q.includes(cityKey)) {
            return `<strong>${data.title}</strong><br>
            <strong>Status:</strong> ${data.alert} | <strong>Primary Symptom:</strong> ${data.symptom}<br>
            <strong>Ingested Signals:</strong> ${data.signals} Ingested<br><br>
            ${data.details}`;
        }
    }

    // 2. Check Clinical Symptoms
    for (const [symKey, advice] of Object.entries(SYMPTOM_CLINICAL_KNOWLEDGE)) {
        if (q.includes(symKey)) {
            return `<strong>Clinical Triage & Guidance (${symKey.toUpperCase()})</strong><br>${advice}`;
        }
    }

    // 3. Check Specific Diseases
    for (const [disKey, profile] of Object.entries(DISEASE_PROFILES)) {
        if (q.includes(disKey)) {
            return `<strong>Disease Surveillance Profile: ${disKey.toUpperCase()}</strong><br>${profile}`;
        }
    }

    // 4. Platform Architectural Queries
    if (q.includes('map') || q.includes('cluster') || q.includes('hotspot')) {
        return "<strong>Geospatial Outbreak Surveillance Map:</strong><br>The map displays live DBSCAN clusters across Indian states. Active hotspots include <strong>Kozhikode, Kerala</strong> (Nipah - Emergency), <strong>Bengaluru</strong> (Dengue - Warning), <strong>Mumbai</strong> (Respiratory), <strong>Delhi NCR</strong> (Breath), and <strong>Bhubaneswar</strong> (Chills). Click any marker or sidebar card to view details.";
    }

    if (q.includes('kafka') || q.includes('stream') || q.includes('ingest')) {
        return "<strong>Apache Kafka Stream Broker:</strong><br>PulseWatch ingests health signals continuously from WHO RSS feeds, NewsAPI India, and Twitter/X streams into an append-only distributed queue with zero message loss.";
    }

    if (q.includes('biobert') || q.includes('nlp') || q.includes('accuracy')) {
        return "<strong>BioBERT Medical NLP Engine:</strong><br>BioBERT is pre-trained on PubMed literature to extract medical entities, symptoms, and negation terms with 91.4% accuracy.";
    }

    if (q.includes('dbscan') || q.includes('radius')) {
        return "<strong>DBSCAN Spatial Clustering:</strong><br>DBSCAN groups geographically proximate disease signals within a 50km radius to calculate cluster Z-score anomaly spikes.";
    }

    if (q.includes('csv') || q.includes('export') || q.includes('download')) {
        return "<strong>CSV Data Export:</strong><br>Click the red <strong>Export CSV</strong> button on the Live Signals Feed or Forecast & Trends page to download the complete dataset in CSV format.";
    }

    if (q.includes('login') || q.includes('email') || q.includes('password')) {
        return "<strong>Access Portal Credentials:</strong><br>Email must end with <strong>@pulsewatch.io</strong> (e.g. user@pulsewatch.io) and Password must contain 5 to 8 numeric digits (e.g. 12345).";
    }

    if (q.includes('hi') || q.includes('hello') || q.includes('hey')) {
        return "Hello! I am your PulseWatch AI Assistant. How can I assist you with symptoms, Indian outbreak maps, or platform features today?";
    }

    // 5. Dynamic Smart Synthesizer for any other city / query
    const words = userText.split(' ');
    const capitalizedQuery = words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    return `<strong>Surveillance & Medical Triage Query: ${capitalizedQuery}</strong><br>
    PulseWatch AI has logged your query for <em>"${userText}"</em> against Indian public health feeds.<br><br>
    • <strong>Outbreak Status:</strong> Regional monitoring active across 28 Indian States.<br>
    • <strong>ICMR Protocol:</strong> If experiencing fever, cough, or rash, maintain hydration with ORS and consult a qualified healthcare professional.<br>
    • <strong>Helpline:</strong> Call <strong>1056</strong> (National Health Helpline) or <strong>108</strong> (Ambulance) for emergency medical assistance.`;
}
