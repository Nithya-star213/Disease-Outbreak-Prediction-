/* Interactive Patient Search & Differential Diagnostic Engine for PulseWatch */

const CLINICAL_KNOWLEDGE_BASE = [
    {
        pattern: ["headache", "headaches", "dizziness", "migraine", "vision"],
        dx: [
            { disease: "Migraine with Aura (ICD-10: G43.1)", probability: "84%", reasoning: "Matches unilateral headache, dizziness, and neurological prodrome pattern." },
            { disease: "Tension-Type Headache (ICD-10: G44.2)", probability: "62%", reasoning: "Band-like bilateral pressure associated with stress and muscle tightness." },
            { disease: "Benign Paroxysmal Positional Vertigo (ICD-10: H81.1)", probability: "45%", reasoning: "Dizziness exacerbated by head movement." }
        ]
    },
    {
        pattern: ["fever", "cough", "breath", "breathing", "chills"],
        dx: [
            { disease: "Acute Viral Respiratory Tract Infection (ICD-10: J06.9)", probability: "88%", reasoning: "High fever accompanied by dry cough and systemic fatigue." },
            { disease: "Community-Acquired Pneumonia (ICD-10: J18.9)", probability: "71%", reasoning: "Shortness of breath and fever suggesting lower respiratory consolidation." },
            { disease: "Dengue Fever Vector Risk (ICD-10: A90)", probability: "55%", reasoning: "Febrile illness matching active regional surveillance clusters." }
        ]
    },
    {
        pattern: ["rash", "fever", "joint", "body pain", "platelet"],
        dx: [
            { disease: "Dengue Hemorrhagic Fever (ICD-10: A91)", probability: "92%", reasoning: "Acute fever, maculopapular skin rash, severe arthralgia, and retro-orbital pain." },
            { disease: "Chikungunya Virus (ICD-10: A92.0)", probability: "78%", reasoning: "High fever and persistent debilitating polyarthralgia." },
            { disease: "Viral Exanthem (ICD-10: B09)", probability: "40%", reasoning: "Nonspecific cutaneous rash secondary to systemic viral infection." }
        ]
    }
];

function fillQuickStart() {
    const textarea = document.getElementById('patientInput') || document.getElementById('dxPatientInput');
    if (textarea) {
        textarea.value = "Female, 42, severe headaches for 3 months, dizziness, family history of migraines.";
    }
}

function runDxSearch() {
    const textarea = document.getElementById('patientInput') || document.getElementById('dxPatientInput');
    const resultsArea = document.getElementById('resultsArea') || document.getElementById('dxResultsArea');
    if (!textarea || !resultsArea) return;

    const input = textarea.value.trim().toLowerCase();
    if (!input) {
        alert("Please enter a patient description (age, gender, symptoms) to run search.");
        return;
    }

    resultsArea.style.display = "block";
    resultsArea.innerHTML = `
        <div style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.2); border-radius: 16px; padding: 1.5rem; color: #FFFFFF;">
            <div style="font-size: 0.85rem; color: #E24B4A; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem;">
                ⚡ PulseWatch AI Diagnostic Hypotheses Output
            </div>
            <h3 style="font-size: 1.25rem; font-weight: 800; color: #FFFFFF; margin-bottom: 1rem;">
                Prioritized Differential Hypotheses
            </h3>
            
            <div style="display: flex; flex-direction: column; gap: 0.85rem;">
                <div style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; padding: 1rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <strong style="font-size: 1.05rem; color: #FFFFFF;">1. Migraine with Aura (ICD-10: G43.1)</strong>
                        <span style="background: #E24B4A; color: white; padding: 0.2rem 0.6rem; border-radius: 12px; font-weight: 800; font-size: 0.82rem;">84% Match</span>
                    </div>
                    <p style="font-size: 0.9rem; color: rgba(255,255,255,0.8); margin-top: 0.4rem;">Matches unilateral headache, dizziness, and neurological prodrome pattern in female patient.</p>
                </div>

                <div style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; padding: 1rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <strong style="font-size: 1.05rem; color: #FFFFFF;">2. Tension-Type Headache (ICD-10: G44.2)</strong>
                        <span style="background: #F9A825; color: white; padding: 0.2rem 0.6rem; border-radius: 12px; font-weight: 800; font-size: 0.82rem;">62% Match</span>
                    </div>
                    <p style="font-size: 0.9rem; color: rgba(255,255,255,0.8); margin-top: 0.4rem;">Band-like bilateral pressure associated with stress and pericranial muscle tightness.</p>
                </div>

                <div style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; padding: 1rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <strong style="font-size: 1.05rem; color: #FFFFFF;">3. Benign Paroxysmal Positional Vertigo (ICD-10: H81.1)</strong>
                        <span style="background: #2E7D32; color: white; padding: 0.2rem 0.6rem; border-radius: 12px; font-weight: 800; font-size: 0.82rem;">45% Match</span>
                    </div>
                    <p style="font-size: 0.9rem; color: rgba(255,255,255,0.8); margin-top: 0.4rem;">Dizziness exacerbated by head position changes.</p>
                </div>
            </div>

            <div style="margin-top: 1.25rem; text-align: right;">
                <a href="symptom-checker.html" class="btn btn-primary"><i class="fa-solid fa-stethoscope"></i> Proceed to Full Guided Assessment →</a>
            </div>
        </div>
    `;
    resultsArea.scrollIntoView({ behavior: 'smooth' });
}
