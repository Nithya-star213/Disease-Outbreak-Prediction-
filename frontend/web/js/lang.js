/* PulseWatch India - 100% 5-Language Translation Engine (English, Tamil, Hindi, Telugu, Malayalam) */

const TRANSLATIONS = {
    en: {
        nav_home: "Home",
        nav_checker: "Symptom Checker",
        nav_map: "Outbreak Map",
        nav_signals: "Live Signals Feed",
        nav_forecast: "Forecast & Trends",
        nav_about: "About & Tech",
        nav_privacy: "Privacy Policy",
        
        hero_tag: "🛡️ 99% Accuracy Target • Powered by AI & ICMR Data",
        hero_title: "Detect Outbreaks <span>Before They Spread</span> Across India",
        hero_desc: "PulseWatch continuously monitors public health signals across all 28 Indian States and 8 Union Territories using BioBERT NER, DBSCAN clustering, and LSTM forecasting.",
        btn_check_symptoms: "Check Symptoms Now",
        btn_view_map: "Explore Outbreak Map",
        
        stat_signals_label: "Signals Processed",
        stat_clusters_label: "Active Outbreak Clusters",
        stat_states_label: "Indian States Monitored",
        stat_lead_label: "Avg Lead Time (Days)",
        
        how_title: "How PulseWatch Works",
        how_step1_title: "1. Signals Ingested",
        how_step1_desc: "Continuously polls NewsAPI India, WHO RSS, Twitter/X, and Google Trends feeds.",
        how_step2_title: "2. BioBERT Symptom Extraction",
        how_step2_desc: "NLP engine cleans text and extracts symptoms with 75%+ confidence threshold.",
        how_step3_title: "3. Spatial Cluster & Forecast",
        how_step3_desc: "DBSCAN clusters outbreak spikes; LSTM predicts 7-day transmission trajectory.",
        
        recent_alerts_title: "Recent Active Regional Alerts",
        
        footer_copy: "© 2026 PulseWatch India. All rights reserved. S.A. Engineering College AI&DS."
    },

    ta: {
        nav_home: "முகப்பு",
        nav_checker: "அறிகுறி பரிசோதனை",
        nav_map: "நோய் பரவல் வரைபடம்",
        nav_signals: "நிகழ்நேர சமிக்ஞைகள்",
        nav_forecast: "முன்னறிவிப்பு & போக்குகள்",
        nav_about: "தொழில்நுட்பம் & எங்களைப் பற்றி",
        nav_privacy: "தனியுரிமைக் கொள்கை",
        
        hero_tag: "🛡️ 99% இலக்கு துல்லியம் • AI & ICMR தரவு மூலம் இயக்கப்படுகிறது",
        hero_title: "நோய் பரவலை <span>முன்கூட்டியே கண்டறியவும்</span>",
        hero_desc: "பல்ஸ்வாட்ச் இந்தியாவின் 28 மாநிலங்கள் மற்றும் 8 யூனியன் பிரதேசங்களில் நிகழ்நேர சுகாதார சமிக்ஞைகளைக் கண்காணிக்கிறது.",
        btn_check_symptoms: "அறிகுறிகளைச் சரிபார்க்கவும்",
        btn_view_map: "வரைபடத்தைக் காண்க",
        
        stat_signals_label: "செயலாக்கப்பட்ட சமிக்ஞைகள்",
        stat_clusters_label: "செயலில் உள்ள நோய் கொத்துகள்",
        stat_states_label: "கண்காணிக்கப்படும் இந்திய மாநிலங்கள்",
        stat_lead_label: "சராசரி முன்னறிவிப்பு நேரம் (நாட்கள்)",
        
        how_title: "பல்ஸ்வாட்ச் எவ்வாறு செயல்படுகிறது",
        how_step1_title: "1. தரவு சேகரிப்பு",
        how_step1_desc: "செய்திகள், WHO RSS மற்றும் சமூக ஊடகத் தரவுகளைத் தொடர்ச்சியாக சேகரிக்கிறது.",
        how_step2_title: "2. BioBERT அறிகுறி பிரித்தெடுத்தல்",
        how_step2_desc: "AI இன்ஜின் அறிகுறிகளைப் பிரித்தெடுத்து ஆபத்து அளவைக் கணக்கிடுகிறது.",
        how_step3_title: "3. நோய் கணிப்பு",
        how_step3_desc: "7 நாள் பரவல் பாதையை முன்கூட்டியே கணிக்கிறது.",
        
        recent_alerts_title: "சமீபத்திய செயலில் உள்ள எச்சரிக்கைகள்",
        
        footer_copy: "© 2026 பல்ஸ்வாட்ச் இந்தியா. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை. எஸ்.ஏ. இன்ஜினியரிங் கல்லூரி."
    },

    hi: {
        nav_home: "मुख्य पृष्ठ",
        nav_checker: "लक्षण जांच (Checker)",
        nav_map: "प्रकोप मानचित्र (Map)",
        nav_signals: "लाइव सिग्नल फीड",
        nav_forecast: "पूर्वानुमान और रुझान",
        nav_about: "तकनीक और हमारे बारे में",
        nav_privacy: "गोपनीयता नीति (Privacy)",
        
        hero_tag: "🛡️ 99% लक्ष्य सटीकता • AI और ICMR डेटा से संचालित",
        hero_title: "भारत में फैलने से पहले <span>प्रकोप का पता लगाएं</span>",
        hero_desc: "पल्सवॉच भारत के सभी 28 राज्यों और 8 केंद्र शासित प्रदेशों में स्वास्थ्य संकेतों की निरंतर निगरानी करता है।",
        btn_check_symptoms: "अभी लक्षण जांचें",
        btn_view_map: "मानचित्र देखें",
        
        stat_signals_label: "संसाधित संकेत",
        stat_clusters_label: "सक्रिय प्रकोप क्लस्टर",
        stat_states_label: "निगरानी वाले भारतीय राज्य",
        stat_lead_label: "औसत अग्रिम समय (दिन)",
        
        how_title: "पल्सवॉच कैसे काम करता है",
        how_step1_title: "1. डेटा एकत्रण",
        how_step1_desc: "NewsAPI, WHO RSS और Google ट्रेंड्स से सिग्नल एकत्र करता है।",
        how_step2_title: "2. BioBERT लक्षण निष्कर्षण",
        how_step2_desc: "NLP इंजन पाठ का विश्लेषण करके लक्षणों को निकालता है।",
        how_step3_title: "3. प्रकोप पूर्वानुमान",
        how_step3_desc: "LSTM मॉडल 7-दिवसीय प्रकोप पथ का पूर्वानुमान लगाता है।",
        
        recent_alerts_title: "हाल के सक्रिय क्षेत्रीय अलर्ट",
        
        footer_copy: "© 2026 पल्सवॉच इंडिया। सर्वाधिकार सुरक्षित। एस.ए. इंजीनियरिंग कॉलेज।"
    },

    te: {
        nav_home: "హోమ్",
        nav_checker: "లక్షణాల తనిఖీ",
        nav_map: "వ్యాప్తి మ్యాప్",
        nav_signals: "లైవ్ సిగ్నల్స్ ఫీడ్",
        nav_forecast: "అంచనా & ట్రెండ్స్",
        nav_about: "సాంకేతికత & మా గురించి",
        nav_privacy: "గోప్యతా విధానం (Privacy)",
        
        hero_tag: "🛡️ 99% లక్ష్య ఖచ్చితత్వం • AI & ICMR డేటాతో పవర్ చేయబడింది",
        hero_title: "భారతదేశంలో వ్యాప్తి చెందడానికి ముందే <span>వ్యాధులను గుర్తించండి</span>",
        hero_desc: "పల్స్‌వాచ్ 28 రాష్ట్రాలు మరియు 8 కేంద్రపాలిత ప్రాంతాలలో నిజ-సమయ ఆరోగ్య సంకేతాలను నిరంతరం పర్యవేక్షిస్తుంది.",
        btn_check_symptoms: "ఇప్పుడే లక్షణాలను తనిఖీ చేయండి",
        btn_view_map: "మ్యాప్‌ని అన్వేషించండి",
        
        stat_signals_label: "సంస్కరించబడిన సంకేతాలు",
        stat_clusters_label: "యాక్టివ్ ఔట్‌బ్రేక్ క్లస్టర్లు",
        stat_states_label: "పర్యవేక్షించబడే భారతీయ రాష్ట్రాలు",
        stat_lead_label: "సరాసరి ముందస్తు సమయం (రోజులు)",
        
        how_title: "పల్స్‌వాచ్ ఎలా పనిచేస్తుంది",
        how_step1_title: "1. డేటా సేకరణ",
        how_step1_desc: "NewsAPI, WHO RSS మరియు గూగుల్ ట్రెండ్స్ నుండి డేటాను సేకరిస్తుంది.",
        how_step2_title: "2. BioBERT లక్షణాల గుర్తింపు",
        how_step2_desc: "AI ఇంజిన్ లక్షణాలను విశ్లేషించి వర్గీకరిస్తుంది.",
        how_step3_title: "3. వ్యాప్తి అంచనా",
        how_step3_desc: "7-రోజుల వ్యాప్తి మార్గాన్ని అంచనా వేస్తుంది.",
        
        recent_alerts_title: "ఇటీవలి సక్రియ ప్రాంతీయ హెచ్చరికలు",
        
        footer_copy: "© 2026 పల్స్‌వాచ్ ఇండియా. సర్వహక్కులు ప్రత్యేకించబడ్డాయి. ఎస్.ఎ. ఇంజనీరింగ్ కాలేజీ."
    },

    ml: {
        nav_home: "ഹോം",
        nav_checker: "രോഗലക്ഷണ പരിശോധന",
        nav_map: "വ്യാപന ഭൂപടം (Map)",
        nav_signals: "ലൈവ് സിഗ്നലുകൾ",
        nav_forecast: "പ്രവചനവും പ്രവണതകളും",
        nav_about: "സാങ്കേതികവിദ്യ & ഞങ്ങളെക്കുറിച്ച്",
        nav_privacy: "സ്വകാര്യതാ നയം (Privacy)",
        
        hero_tag: "🛡️ 99% ലക്ഷ്യ കൃത്യത • AI & ICMR ഡാറ്റ ഉപയോഗിച്ച് പ്രവർത്തിക്കുന്നു",
        hero_title: "പടർന്നുപിടിക്കുന്നതിനുമുമ്പ് <span>രോഗവ്യാപനം കണ്ടെത്തുക</span>",
        hero_desc: "പൾസ്‌വാച്ച് ഇന്ത്യയിലെ 28 സംസ്ഥാനങ്ങളിലും 8 കേന്ദ്രഭരണ പ്രദേശങ്ങളിലും തത്സമയ ആരോഗ്യ സൂചനകൾ നിരീക്ഷിക്കുന്നു.",
        btn_check_symptoms: "ലക്ഷണങ്ങൾ പരിശോധിക്കുക",
        btn_view_map: "ഭൂപടം കാണുക",
        
        stat_signals_label: "പ്രോസസ്സ് ചെയ്ത സിഗ്നലുകൾ",
        stat_clusters_label: "സജീവ രോഗബാധിത മേഖലകൾ",
        stat_states_label: "നിരീക്ഷിക്കുന്ന ഇന്ത്യൻ സംസ്ഥാനങ്ങൾ",
        stat_lead_label: "ശരാശരി മുൻകൂട്ടി മുന്നറിയിപ്പ് സമയം (ദിവസങ്ങൾ)",
        
        how_title: "പൾസ്‌വാച്ച് എങ്ങനെ പ്രവർത്തിക്കുന്നു",
        how_step1_title: "1. ഡാറ്റ ശേഖരണം",
        how_step1_desc: "വാർത്തകൾ, WHO RSS, സോഷ്യൽ മീഡിയ എന്നിവയിൽ നിന്ന് ഡാറ്റ ശേഖരിക്കുന്നു.",
        how_step2_title: "2. BioBERT ലക്ഷണ കണ്ടെത്തൽ",
        how_step2_desc: "AI എൻജിൻ വിവരങ്ങൾ വിശകലനം ചെയ്ത് രോഗലക്ഷണങ്ങൾ കണ്ടെത്തുന്നു.",
        how_step3_title: "3. രോഗപ്രവചനം",
        how_step3_desc: "7 ദിവസത്തെ രോഗവ്യാപന പാത മുൻകൂട്ടി പ്രവചിക്കുന്നു.",
        
        recent_alerts_title: "സമീപകാല സജീവ മുന്നറിയിപ്പുകൾ",
        
        footer_copy: "© 2026 പൾസ്‌വാച്ച് ഇന്ത്യ. സർവ്വ അവകാശങ്ങളും നിക്ഷിപ്തം. എസ്.എ. എഞ്ചിനീയറിംഗ് കോളേജ്."
    }
};

let currentLang = localStorage.getItem('pulsewatch_light_lang') || 'en';

function setLanguage(lang) {
    if (TRANSLATIONS[lang]) {
        currentLang = lang;
        localStorage.setItem('pulsewatch_light_lang', lang);
        applyTranslations();
    }
}

function applyTranslations() {
    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS['en'];
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            if (el.tagName === 'INPUT' && el.getAttribute('placeholder')) {
                el.placeholder = dict[key];
            } else {
                el.innerHTML = dict[key];
            }
        }
    });

    document.querySelectorAll('.lang-selector').forEach(sel => {
        sel.value = currentLang;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    applyTranslations();
});
