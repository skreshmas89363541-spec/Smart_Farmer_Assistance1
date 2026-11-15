
/* =====================================
   SMART FARMER ASSISTANCE
   JavaScript - Complete Version
===================================== */


/* 1. LANGUAGE TRANSLATIONS */

const translations = {
    en: {
        welcome: "Welcome, Farmer!",
        intro: "Find crop information, weather, fertilizer guidance and market listings in one place.",
        loading: "Loading...",
        noCrops: "No crop suggestions available.",
        noListings: "No crop listings yet.",
        enterCoordinates: "Enter both latitude and longitude.",
        uploadSuccess: "Image uploaded successfully.",
        listening: "Listening...",
        voiceFinished: "Voice input finished.",
        title: "Smart Farmer Assistance",
        soil: "Soil type",
        season: "Season",
        language: "Select Language",
        temperature: "Temperature",
        cropButton: "Find suitable crops"
    },

    te: {
        welcome: "రైతులకు స్వాగతం!",
        intro: "పంటలు, వాతావరణం, ఎరువులు మరియు మార్కెట్ వివరాలను ఒకేచోట తెలుసుకోండి.",
        loading: "లోడ్ అవుతోంది...",
        noCrops: "పంటల సూచనలు అందుబాటులో లేవు.",
        noListings: "ఇంకా పంటల ప్రకటనలు లేవు.",
        enterCoordinates: "అక్షాంశం మరియు రేఖాంశం నమోదు చేయండి.",
        uploadSuccess: "చిత్రం విజయవంతంగా అప్‌లోడ్ అయింది.",
        listening: "వింటున్నాము...",
        voiceFinished: "వాయిస్ ఇన్‌పుట్ పూర్తయింది.",
        title: "స్మార్ట్ రైతు సహాయం",
        soil: "నేల రకం",
        season: "పంట కాలం",
        language: "భాషను ఎంచుకోండి",
        temperature: "ఉష్ణోగ్రత",
        cropButton: "అనుకూలమైన పంటలను కనుగొనండి"
    },

    hi: {
        welcome: "किसान आपका स्वागत है!",
        intro: "फसल, मौसम, खाद और बाजार की जानकारी एक ही जगह पाएं।",
        loading: "लोड हो रहा है...",
        noCrops: "फसल के सुझाव उपलब्ध नहीं हैं।",
        noListings: "अभी कोई फसल सूची उपलब्ध नहीं है।",
        enterCoordinates: "अक्षांश और देशांतर दर्ज करें।",
        uploadSuccess: "छवि सफलतापूर्वक अपलोड हुई।",
        listening: "सुन रहे हैं...",
        voiceFinished: "वॉइस इनपुट पूरा हुआ।",
        title: "स्मार्ट किसान सहायता",
        soil: "मिट्टी का प्रकार",
        season: "मौसम",
        language: "भाषा चुनें",
        temperature: "तापमान",
        cropButton: "उपयुक्त फसलें खोजें"
    }
};


/* 2. COMMON FUNCTIONS */

function getElement(id) {
    return document.getElementById(id);
}

function currentLanguage() {
    return getElement("language")?.value || "en";
}

function text(key) {
    return translations[currentLanguage()]?.[key] ||
           translations.en[key] ||
           key;
}

function showText(id, value) {
    const element = getElement(id);

    if (element) {
        element.textContent = value;
    }
}

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }[character]));
}


/* 3. LANGUAGE CHANGE */

function changeLanguage() {
    const lang = currentLanguage();
    const selected = translations[lang] || translations.en;

    showText("welcome", selected.welcome);

    if (getElement("intro")) {
        showText("intro", selected.intro);
    } else {
        showText("welcomeText", selected.intro);
    }

    showText("title", selected.title);
    showText("soilLabel", selected.soil);
    showText("seasonLabel", selected.season);
    showText("languageLabel", selected.language);
    showText("temperatureLabel", selected.temperature);
    showText("suggestBtn", selected.cropButton);

    // Update elements marked for translation in HTML
    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.dataset.i18n;

        if (selected[key]) {
            element.textContent = selected[key];
        }
    });
}


/* 4. API FUNCTION */

async function api(url, options = {}) {
    const response = await fetch(url, options);

    let data;

    try {
        data = await response.json();
    } catch {
        throw new Error("Invalid server response.");
    }

    if (!response.ok) {
        throw new Error(data.error || "Request failed.");
    }

    return data;
}


/* 5. CROP SUGGESTIONS */

async function loadCrops() {
    const box = getElement("cropResults") ||
                getElement("result");

    if (!box) return;

    box.textContent = text("loading");

    try {
        const season = encodeURIComponent(
            getElement("season")?.value || ""
        );

        const soil = encodeURIComponent(
            getElement("soil")?.value || ""
        );

        const data = await api(
            `/api/crops?season=${season}&soil=${soil}`
        );

        if (!data.crops || data.crops.length === 0) {
            box.textContent = text("noCrops");
            return;
        }

        box.innerHTML =
            `<strong>Suggested crops:</strong> ${
                data.crops.map(escapeHtml).join(", ")
            }`;

    } catch (error) {
        box.textContent = error.message;
    }
}


/* 6. WEATHER INFORMATION */

async function getWeather() {
    const box = getElement("weatherResults");

    if (!box) return;

    const lat = getElement("lat")?.value;
    const lon = getElement("lon")?.value;

    if (!lat || !lon) {
        box.textContent = text("enterCoordinates");
        return;
    }

    box.textContent = text("loading");

    try {
        const data = await api(
            `/api/weather?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`
        );

        box.textContent =
            `Temperature: ${data.temperature} °C | ` +
            `Rain chance: ${data.precipitation_probability}% | ` +
            `Wind: ${data.wind_speed} km/h`;

    } catch (error) {
        box.textContent = error.message;
    }
}


/* 7. FERTILIZER GUIDANCE */

async function loadFertilizer() {
    const crop = encodeURIComponent(
        getElement("fertCrop")?.value || ""
    );

    const box = getElement("fertResults");

    if (!box) return;

    box.textContent = text("loading");

    try {
        const data = await api(
            `/api/fertilizers?crop=${crop}`
        );

        box.innerHTML =
            `<strong>${escapeHtml(data.crop)}</strong>
             <p>${escapeHtml(data.guidance)}</p>`;

    } catch (error) {
        box.textContent = error.message;
    }
}


/* 8. FARMER MARKETING */

async function refreshMarket() {
    const box = getElement("marketResults");

    if (!box) return;

    try {
        const data = await api("/api/marketing");

        if (!data.listings || data.listings.length === 0) {
            box.textContent = text("noListings");
            return;
        }

        box.innerHTML = data.listings.map(item =>
            `<div class="result-card">
                <strong>${escapeHtml(item.crop)}</strong>
                · ${escapeHtml(item.quantity)} kg
                · ₹${escapeHtml(item.price)}/kg
                <br>
                Farmer: ${escapeHtml(item.farmer)}
                · Location: ${escapeHtml(item.location)}
                · Contact: ${escapeHtml(item.contact)}
            </div>`
        ).join("");

    } catch (error) {
        box.textContent = error.message;
    }
}


/* 9. ADD CROP LISTING */

const marketForm = getElement("marketForm");

if (marketForm) {
    marketForm.addEventListener("submit", async event => {
        event.preventDefault();

        const form = event.currentTarget;

        const payload = Object.fromEntries(
            new FormData(form).entries()
        );

        try {
            await api("/api/marketing", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            form.reset();

            await refreshMarket();

            alert("Crop listing added successfully.");

        } catch (error) {
            alert(error.message);
        }
    });
}


/* 10. PEST IMAGE UPLOAD */

const pestForm = getElement("pestForm");

if (pestForm) {
    pestForm.addEventListener("submit", async event => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        const box = getElement("pestResults");

        if (box) {
            box.textContent = text("loading");
        }

        try {
            const data = await api("/api/pest-upload", {
                method: "POST",
                body: formData
            });

            if (box) {
                box.textContent =
                    `${text("uploadSuccess")} ${data.filename}. ` +
                    `Selected symptom: ${data.symptom}. ` +
                    "AI diagnosis is not available in this version.";
            }

            form.reset();

        } catch (error) {
            if (box) {
                box.textContent = error.message;
            }
        }
    });
}


/* 11. TEXT TO SPEECH */

function speakText() {
    if (!("speechSynthesis" in window)) {
        alert("Text-to-speech is not supported in this browser.");
        return;
    }

    const lang = currentLanguage();

    const selected = translations[lang] || translations.en;

    const speech = new SpeechSynthesisUtterance(
        selected.welcome + " " + selected.intro
    );

    speech.lang =
        lang === "te" ? "te-IN" :
        lang === "hi" ? "hi-IN" :
        "en-IN";

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
}


/* 12. VOICE INPUT */

function startVoice() {
    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    const status = getElement("voiceStatus");

    if (!SpeechRecognition) {
        if (status) {
            status.textContent =
                "Speech recognition is not supported. Please type your question.";
        }
        return;
    }

    const recognition = new SpeechRecognition();
    const lang = currentLanguage();

    recognition.lang =
        lang === "te" ? "te-IN" :
        lang === "hi" ? "hi-IN" :
        "en-IN";

    recognition.onstart = () => {
        if (status) status.textContent = text("listening");
    };

    recognition.onresult = event => {
        const voiceInput = getElement("voiceText");

        if (voiceInput) {
            voiceInput.value =
                event.results[0][0].transcript;
        }
    };

    recognition.onerror = () => {
        if (status) {
            status.textContent =
                "Could not recognize speech. Check microphone permission.";
        }
    };

    recognition.onend = () => {
        if (status) {
            status.textContent = text("voiceFinished");
        }
    };

    recognition.start();
}


/* 13. CONNECT HTML BUTTONS */

function connectButton(id, callback) {
    const button = getElement(id);

    if (button) {
        button.addEventListener("click", callback);
    }
}

connectButton("suggestBtn", loadCrops);
connectButton("cropBtn", loadCrops);
connectButton("weatherBtn", getWeather);
connectButton("fertBtn", loadFertilizer);
connectButton("speakBtn", speakText);
connectButton("voiceBtn", startVoice);

const languageSelect = getElement("language");

if (languageSelect) {
    languageSelect.addEventListener("change", changeLanguage);
}


/* 14. PAGE INITIALIZATION */

document.addEventListener("DOMContentLoaded", () => {
    changeLanguage();
    refreshMarket();
});
