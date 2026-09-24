/* =========================================================
   TYPINGMASTER
   COMPLETE JAVASCRIPT
   Version: 2026
========================================================= */


/* =========================================================
   1. GLOBAL CONFIGURATION
========================================================= */

const STORAGE = {
    history: "typingMasterHistory",
    bestWpm: "typingMasterBestWpm",
    bestAccuracy: "typingMasterBestAccuracy",
    wpmGoal: "typingMasterWpmGoal",
    heatmap: "typingMasterHeatmap",
    theme: "typingMasterTheme",
    challenge: "typingMasterChallenge",
    achievements: "typingMasterAchievements"
};


/* =========================================================
   2. APPLICATION STATE
========================================================= */

const app = {

    currentPage: "home",

    test: {
        duration: 60,
        timeLeft: 60,
        started: false,
        finished: false,
        timer: null,

        text: "",
        index: 0,

        correct: 0,
        errors: 0,
        totalTyped: 0,

        typedChars: [],

        startTime: null,
        language: "english",

        custom: false
    },

    practice: {
        mode: "beginner",
        text: "",
        started: false,
        startTime: null,
        timer: null,
        typed: "",
        errors: 0
    },

    challenge: {
        text: "",
        started: false,
        startTime: null,
        typed: "",
        errors: 0,
        completed: false
    },

    selectedNote: null,

    notesFilter: "all",

    customTest: {
        text: "",
        language: "english",
        duration: 60
    }

};


/* =========================================================
   3. DOM HELPER
========================================================= */

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);


/* =========================================================
   4. TYPING TEXTS
========================================================= */

const TYPING_TEXTS = {

    english: [
        "Typing is a skill that becomes easier with regular practice. Keep your fingers relaxed and focus on accuracy before speed.",
        "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the English alphabet.",
        "Good typing is not only about moving your fingers quickly. It is about accuracy, rhythm, consistency, and comfortable hand position.",
        "Practice every day for a few minutes and your typing speed will gradually improve. Focus on each character and avoid looking at the keyboard.",
        "Technology has changed the way people communicate, work, learn, and create. Fast and accurate typing can save a lot of time every day."
    ],

    hindi: [
        "नियमित अभ्यास से टाइपिंग की गति और सटीकता धीरे धीरे बेहतर होती है। पहले सही टाइप करने पर ध्यान दें और फिर अपनी गति बढ़ाएं।",
        "कंप्यूटर का उपयोग पढ़ाई, काम और रोजमर्रा के जीवन में बहुत बढ़ गया है। अच्छी टाइपिंग समय बचाने में मदद करती है।"
    ],

    punjabi: [
        "ਨਿਯਮਿਤ ਅਭਿਆਸ ਨਾਲ ਟਾਈਪਿੰਗ ਦੀ ਗਤੀ ਅਤੇ ਸਹੀਪਨ ਹੌਲੀ ਹੌਲੀ ਬਿਹਤਰ ਹੁੰਦਾ ਹੈ। ਪਹਿਲਾਂ ਸਹੀ ਟਾਈਪ ਕਰਨ ਤੇ ਧਿਆਨ ਦਿਓ ਅਤੇ ਫਿਰ ਗਤੀ ਵਧਾਓ।",
        "ਕੰਪਿਊਟਰ ਅੱਜ ਦੇ ਸਮੇਂ ਵਿੱਚ ਪੜ੍ਹਾਈ ਅਤੇ ਕੰਮ ਲਈ ਬਹੁਤ ਮਹੱਤਵਪੂਰਨ ਹੈ। ਤੇਜ਼ ਅਤੇ ਸਹੀ ਟਾਈਪਿੰਗ ਸਮਾਂ ਬਚਾਉਂਦੀ ਹੈ।"
    ],

    urdu: [
        "باقاعدہ مشق سے ٹائپنگ کی رفتار اور درستگی بہتر ہوتی ہے۔ پہلے درست ٹائپ کرنے پر توجہ دیں اور پھر اپنی رفتار بڑھائیں۔",
        "کمپیوٹر آج کے دور میں تعلیم اور کام کے لیے بہت اہم ہے۔ تیز اور درست ٹائپنگ وقت بچانے میں مدد کرتی ہے۔"
    ],

    bengali: [
        "নিয়মিত অনুশীলনের মাধ্যমে টাইপিংয়ের গতি এবং নির্ভুলতা ধীরে ধীরে উন্নত হয়। প্রথমে সঠিকভাবে টাইপ করার দিকে মনোযোগ দিন।",
        "কম্পিউটার শিক্ষা এবং কাজের একটি গুরুত্বপূর্ণ অংশ হয়ে উঠেছে। দ্রুত এবং সঠিক টাইপিং প্রতিদিন সময় বাঁচাতে সাহায্য করে।"
    ],

    gujarati: [
        "નિયમિત અભ્યાસથી ટાઇપિંગની ઝડપ અને ચોકસાઈ ધીમે ધીમે સુધરે છે. પહેલા સાચું ટાઇપ કરવા પર ધ્યાન આપો અને પછી ઝડપ વધારો.",
        "કમ્પ્યુટર શિક્ષણ અને કામ માટે ખૂબ ઉપયોગી સાધન છે. સારી ટાઇપિંગ સમય બચાવવામાં મદદ કરે છે."
    ],

    marathi: [
        "नियमित सरावामुळे टायपिंगचा वेग आणि अचूकता हळूहळू सुधारते. सुरुवातीला अचूक टायपिंगवर लक्ष द्या.",
        "संगणकाचा वापर शिक्षण आणि कामासाठी मोठ्या प्रमाणावर केला जातो. जलद आणि अचूक टायपिंग वेळ वाचवते."
    ],

    tamil: [
        "தொடர்ந்து பயிற்சி செய்வதன் மூலம் தட்டச்சு வேகம் மற்றும் துல்லியம் மெதுவாக மேம்படும். முதலில் சரியாக தட்டச்சு செய்வதில் கவனம் செலுத்துங்கள்.",
        "கணினி கல்வி மற்றும் வேலைக்கான முக்கியமான கருவியாக உள்ளது. வேகமான மற்றும் துல்லியமான தட்டச்சு நேரத்தை சேமிக்கிறது."
    ],

    telugu: [
        "నిరంతర సాధనతో టైపింగ్ వేగం మరియు ఖచ్చితత్వం క్రమంగా మెరుగుపడతాయి. ముందుగా సరిగ్గా టైప్ చేయడంపై దృష్టి పెట్టండి.",
        "కంప్యూటర్ విద్య మరియు పని కోసం ముఖ్యమైన సాధనంగా మారింది. వేగంగా మరియు ఖచ్చితంగా టైప్ చేయడం సమయాన్ని ఆదా చేస్తుంది."
    ],

    kannada: [
        "ನಿಯಮಿತ ಅಭ್ಯಾಸದಿಂದ ಟೈಪಿಂಗ್ ವೇಗ ಮತ್ತು ನಿಖರತೆ ನಿಧಾನವಾಗಿ ಸುಧಾರಿಸುತ್ತದೆ. ಮೊದಲು ಸರಿಯಾಗಿ ಟೈಪ್ ಮಾಡುವುದರ ಮೇಲೆ ಗಮನ ಹರಿಸಿ.",
        "ಕಂಪ್ಯೂಟರ್ ಶಿಕ್ಷಣ ಮತ್ತು ಕೆಲಸಕ್ಕಾಗಿ ಬಹಳ ಉಪಯುಕ್ತ ಸಾಧನವಾಗಿದೆ. ವೇಗವಾದ ಮತ್ತು ನಿಖರವಾದ ಟೈಪಿಂಗ್ ಸಮಯವನ್ನು ಉಳಿಸುತ್ತದೆ."
    ],

    malayalam: [
        "സ്ഥിരമായ പരിശീലനത്തിലൂടെ ടൈപ്പിംഗ് വേഗതയും കൃത്യതയും ക്രമേണ മെച്ചപ്പെടുന്നു. ആദ്യം കൃത്യമായി ടൈപ്പ് ചെയ്യുന്നതിൽ ശ്രദ്ധിക്കുക.",
        "വിദ്യാഭ്യാസത്തിനും ജോലിക്കും കമ്പ്യൂട്ടർ വളരെ പ്രധാനപ്പെട്ട ഉപകരണമാണ്. വേഗത്തിലുള്ള ടൈപ്പിംഗ് സമയം ലാഭിക്കാൻ സഹായിക്കുന്നു."
    ],

    nepali: [
        "नियमित अभ्यासले टाइपिङको गति र शुद्धता बिस्तारै सुधार गर्छ। पहिले सही टाइप गर्नमा ध्यान दिनुहोस् र त्यसपछि गति बढाउनुहोस्।"
    ],

    sanskrit: [
        "नियमिताभ्यासेन लेखनवेगः शुद्धता च शनैः शनैः वर्धते। प्रथमं शुद्धलेखनस्य अभ्यासं कुरुत।"
    ],

    arabic: [
        "تتحسن سرعة الكتابة ودقتها تدريجيا مع التدريب المنتظم. ركز على الكتابة الصحيحة أولا ثم حاول زيادة السرعة.",
        "أصبح الحاسوب جزءا مهما من التعليم والعمل والحياة اليومية. تساعد الكتابة السريعة والدقيقة على توفير الوقت."
    ],

    persian: [
        "با تمرین منظم، سرعت و دقت تایپ کردن به تدریج بهتر می‌شود. ابتدا روی درست تایپ کردن تمرکز کنید و سپس سرعت خود را افزایش دهید."
    ],

    hebrew: [
        "תרגול קבוע משפר בהדרגה את מהירות ההקלדה ואת הדיוק. התמקדו תחילה בהקלדה נכונה ולאחר מכן הגדילו את המהירות."
    ],

    russian: [
        "Регулярная практика постепенно улучшает скорость и точность печати. Сначала сосредоточьтесь на правильном наборе текста.",
        "Компьютер стал важной частью учебы и работы. Быстрый и точный набор текста помогает экономить время."
    ],

    ukrainian: [
        "Регулярна практика поступово покращує швидкість і точність друку. Спочатку зосередьтеся на правильному наборі тексту."
    ],

    polish: [
        "Regularne ćwiczenia stopniowo poprawiają szybkość i dokładność pisania. Najpierw skup się na poprawnym pisaniu, a później zwiększaj tempo."
    ],

    german: [
        "Regelmäßiges Üben verbessert nach und nach die Schreibgeschwindigkeit und Genauigkeit. Konzentriere dich zuerst auf korrektes Tippen.",
        "Ein Computer ist heute ein wichtiger Teil von Lernen und Arbeit. Schnelles und genaues Tippen spart jeden Tag Zeit."
    ],

    french: [
        "La pratique régulière améliore progressivement la vitesse et la précision de frappe. Concentrez-vous d'abord sur la précision.",
        "L'ordinateur est devenu un outil important pour apprendre, travailler et communiquer. Une frappe rapide permet de gagner du temps."
    ],

    spanish: [
        "La práctica regular mejora poco a poco la velocidad y la precisión al escribir. Primero concéntrate en escribir correctamente.",
        "El ordenador es una herramienta importante para estudiar y trabajar. Escribir rápido y con precisión ayuda a ahorrar tiempo."
    ],

    italian: [
        "La pratica regolare migliora gradualmente la velocità e la precisione nella digitazione. Prima concentrati sulla correttezza.",
        "Il computer è diventato uno strumento importante per lo studio e il lavoro. Una digitazione precisa fa risparmiare tempo."
    ],

    portuguese: [
        "A prática regular melhora gradualmente a velocidade e a precisão da digitação. Primeiro concentre-se em digitar corretamente.",
        "O computador é uma ferramenta importante para estudar e trabalhar. Digitar rápido e com precisão ajuda a economizar tempo."
    ],

    dutch: [
        "Regelmatig oefenen verbetert geleidelijk je typesnelheid en nauwkeurigheid. Concentreer je eerst op correct typen.",
        "Een computer is tegenwoordig belangrijk voor leren en werken. Snel en nauwkeurig typen bespaart tijd."
    ],

    greek: [
        "Η τακτική εξάσκηση βελτιώνει σταδιακά την ταχύτητα και την ακρίβεια πληκτρολόγησης. Εστιάστε πρώτα στη σωστή πληκτρολόγηση."
    ],

    turkish: [
        "Düzenli pratik yapmak yazma hızını ve doğruluğunu zamanla geliştirir. Önce doğru yazmaya odaklanın, ardından hızınızı artırın."
    ],

    romanian: [
        "Exersarea regulată îmbunătățește treptat viteza și precizia tastării. Concentrează-te mai întâi pe scrierea corectă."
    ],

    czech: [
        "Pravidelné procvičování postupně zlepšuje rychlost a přesnost psaní. Nejprve se zaměřte na správné psaní."
    ],

    slovak: [
        "Pravidelné cvičenie postupne zlepšuje rýchlosť a presnosť písania. Najprv sa sústreďte na správne písanie."
    ],

    hungarian: [
        "A rendszeres gyakorlás fokozatosan javítja a gépelési sebességet és pontosságot. Először a helyes gépelésre figyelj."
    ],

    swedish: [
        "Regelbunden träning förbättrar gradvis skrivhastigheten och noggrannheten. Fokusera först på att skriva korrekt."
    ],

    norwegian: [
        "Regelmessig trening forbedrer gradvis skrivehastigheten og nøyaktigheten. Fokuser først på å skrive riktig."
    ],

    danish: [
        "Regelmæssig træning forbedrer gradvist skrivehastigheden og nøjagtigheden. Fokuser først på at skrive korrekt."
    ],

    finnish: [
        "Säännöllinen harjoittelu parantaa vähitellen kirjoitusnopeutta ja tarkkuutta. Keskity ensin kirjoittamaan oikein."
    ],

    icelandic: [
        "Regluleg æfing bætir smám saman innsláttarhraða og nákvæmni. Einbeittu þér fyrst að réttri innsláttaraðferð."
    ],

    irish: [
        "Feabhsaíonn cleachtadh rialta luas agus cruinneas clóscríobh de réir a chéile. Dírigh ar chruinneas ar dtús."
    ],

    welsh: [
        "Mae ymarfer rheolaidd yn gwella cyflymder a chywirdeb teipio yn raddol. Canolbwyntiwch ar deipio'n gywir yn gyntaf."
    ],

    chinese: [
        "坚持练习可以逐渐提高打字速度和准确率。首先要注意正确输入，然后再慢慢提高速度。",
        "电脑已经成为学习和工作中的重要工具。快速而准确的输入可以帮助我们节省时间。"
    ],

    japanese: [
        "毎日少しずつ練習すると、タイピングの速度と正確さが徐々に向上します。まずは正確に入力することを意識しましょう。",
        "コンピューターは勉強や仕事に欠かせない道具です。速く正確に入力できると時間を節約できます。"
    ],

    korean: [
        "꾸준히 연습하면 타이핑 속도와 정확도가 점점 향상됩니다. 먼저 정확하게 입력하는 것에 집중하세요.",
        "컴퓨터는 공부와 업무에서 중요한 도구입니다. 빠르고 정확하게 입력하면 시간을 절약할 수 있습니다."
    ],

    vietnamese: [
        "Luyện tập thường xuyên giúp cải thiện tốc độ và độ chính xác khi gõ phím. Hãy tập trung vào việc gõ đúng trước khi tăng tốc độ."
    ],

    thai: [
        "การฝึกพิมพ์อย่างสม่ำเสมอช่วยเพิ่มความเร็วและความแม่นยำได้ทีละน้อย ควรเน้นการพิมพ์ให้ถูกต้องก่อนเพิ่มความเร็ว"
    ],

    indonesian: [
        "Latihan mengetik secara teratur dapat meningkatkan kecepatan dan ketepatan secara bertahap. Fokuslah pada ketepatan terlebih dahulu."
    ],

    malay: [
        "Latihan menaip secara konsisten dapat meningkatkan kelajuan dan ketepatan secara beransur-ansur. Fokus pada ketepatan sebelum meningkatkan kelajuan."
    ],

    filipino: [
        "Ang regular na pagsasanay sa pagta-type ay nakakatulong upang mapabuti ang bilis at katumpakan. Unahin ang tamang pagta-type bago ang bilis."
    ],

    swahili: [
        "Mazoezi ya mara kwa mara huboresha kasi na usahihi wa kuandika. Zingatia usahihi kwanza kabla ya kuongeza kasi."
    ],

    afrikaans: [
        "Gereelde oefening verbeter tikspoed en akkuraatheid geleidelik. Fokus eers op korrekte tik voordat jy jou spoed verhoog."
    ],

    zulu: [
        "Ukuzilolonga njalo kuthuthukisa isivinini nokunemba kokuthayipha. Gxila ekunembeni kuqala ngaphambi kokwandisa isivinini."
    ],

    amharic: [
        "በመደበኛ ልምምድ የመተየብ ፍጥነትና ትክክለኛነት በቀስታ ይሻሻላል።"
    ]

};


/* =========================================================
   5. PRACTICE TEXTS
========================================================= */

const PRACTICE_TEXTS = {

    beginner: [
        "hello world",
        "good morning",
        "learn to type",
        "practice every day",
        "typing is easy",
        "keep your hands relaxed"
    ],

    words: [
        "computer keyboard practice speed accuracy learning programming website developer database system internet technology software hardware information"
    ],

    sentences: [
        "Regular typing practice helps you become faster and more accurate over time.",
        "Keep your fingers relaxed and look at the screen instead of the keyboard.",
        "Good typing comes from consistency, patience, accuracy, and daily practice."
    ],

    articles: [
        "Typing is an important computer skill. People use keyboards every day to write messages, create documents, study online, write programs, search for information, and communicate with others. Improving your typing speed can save time and make computer work more comfortable. The best way to improve is to practice regularly and focus on accuracy before speed."
    ],

    programming: [
        'const user = { name: "Prabhjeet", skills: ["Python", "JavaScript", "SQL"] };',
        'function addNumbers(a, b) { return a + b; }',
        'for (let i = 0; i < 10; i++) { console.log(i); }',
        'SELECT name, email FROM users WHERE active = true;'
    ],

    accuracy: [
        "The quick brown fox jumps over the lazy dog.",
        "Accuracy matters more than speed when you are learning.",
        "Pack my box with five dozen liquor jugs.",
        "Programming requires careful attention to symbols: {} [] () <> ; : = + - * /"
    ]

};


/* =========================================================
   6. NOTES
========================================================= */

const NOTES_FILES = [

    {
        name: "COMPUTER NETWORKS NOTES.pdf",
        file: "notes/COMPUTER NETWORKS NOTES.pdf",
        category: "computer",
        icon: "🌐"
    },

    {
        name: "CSS.pdf",
        file: "notes/CSS.pdf",
        category: "web",
        icon: "🎨"
    },

    {
        name: "DATA STRUCTURES THROUGH PYTHON.pdf",
        file: "notes/DATA STRUCTURES THROUGH PYTHON.pdf",
        category: "programming",
        icon: "🐍"
    },

    {
        name: "html_tutorial.pdf",
        file: "notes/html_tutorial.pdf",
        category: "web",
        icon: "🌐"
    },

    {
        name: "Java Programming.pdf",
        file: "notes/Java Programming.pdf",
        category: "programming",
        icon: "☕"
    },

    {
        name: "JS Notes.pdf",
        file: "notes/JS Notes.pdf",
        category: "web",
        icon: "⚡"
    },

    {
        name: "OOP USING C++.pdf",
        file: "notes/OOP USING C++.pdf",
        category: "programming",
        icon: "💻"
    },

    {
        name: "PROGRAMMING IN C.pdf",
        file: "notes/PROGRAMMING IN C.pdf",
        category: "programming",
        icon: "©️"
    },

    {
        name: "PYTHON PROGRAMMING NOTES.pdf",
        file: "notes/PYTHON PROGRAMMING NOTES.pdf",
        category: "programming",
        icon: "🐍"
    },

    {
        name: "SOFTWARE ENGINEERING.pdf",
        file: "notes/SOFTWARE ENGINEERING.pdf",
        category: "computer",
        icon: "⚙️"
    },

    {
        name: "SQL-Manual.pdf",
        file: "notes/SQL-Manual.pdf",
        category: "database",
        icon: "🗄️"
    }

];


/* =========================================================
   7. UTILITY FUNCTIONS
========================================================= */

function getJSON(key, fallback) {

    try {

        const value = localStorage.getItem(key);

        if (!value) {
            return fallback;
        }

        return JSON.parse(value);

    } catch (error) {

        return fallback;

    }

}


function setJSON(key, value) {

    localStorage.setItem(
        key,
        JSON.stringify(value)
    );

}


function clamp(value, min, max) {

    return Math.min(
        Math.max(value, min),
        max
    );

}


function formatTime(seconds) {

    seconds = Math.max(0, Math.floor(seconds));

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds = seconds % 60;

    return (
        String(minutes).padStart(2, "0")
        +
        ":"
        +
        String(remainingSeconds).padStart(2, "0")
    );

}


function randomItem(array) {

    return array[
        Math.floor(
            Math.random() * array.length
        )
    ];

}


function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function sleep(ms) {

    return new Promise(
        resolve => setTimeout(resolve, ms)
    );

}


/* =========================================================
   8. TOAST
========================================================= */

let toastTimer = null;


function showToast(
    message,
    icon = "✓",
    duration = 2200
) {

    const toast = $("#toast");
    const toastMessage = $("#toastMessage");
    const toastIcon = $("#toastIcon");

    if (!toast) return;

    if (toastMessage) {
        toastMessage.textContent = message;
    }

    if (toastIcon) {
        toastIcon.textContent = icon;
    }

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, duration);

}


/* =========================================================
   9. NAVIGATION
========================================================= */

function navigateTo(page) {

    const validPages = [
        "home",
        "practice",
        "test",
        "challenge",
        "custom",
        "progress",
        "notes"
    ];

    if (!validPages.includes(page)) {
        page = "home";
    }

    app.currentPage = page;

    stopPracticeTimer();

    if (page !== "test") {

        stopTestTimer();

    }

    $$(".page").forEach(section => {

        const isActive =
            section.dataset.pageContent === page;

        section.classList.toggle(
            "active-page",
            isActive
        );

        section.classList.toggle(
            "active",
            isActive
        );

        section.hidden = !isActive;

    });


    $$(".nav-link").forEach(link => {

        link.classList.toggle(
            "active",
            link.dataset.page === page
        );

    });


    $$(".main-navigation [data-page]").forEach(link => {

        link.classList.toggle(
            "active",
            link.dataset.page === page
        );

    });


    document.body.classList.toggle(
        "typing-page-active",
        page === "test"
    );


    closeMobileMenu();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (page === "test") {

        if (!app.test.text || app.test.custom) {

            prepareTypingTest(
                app.test.custom
                    ? app.test.text
                    : null
            );

        }

        setTimeout(() => {

            focusTypingInput();

        }, 180);

    }


    if (page === "practice") {

        updatePracticeWorkspace();

    }


    if (page === "challenge") {

        prepareDailyChallenge();

    }


    if (page === "progress") {

        updateProgressPage();

    }


    if (page === "notes") {

        renderNotes();

    }


    if (page === "home") {

        updateHomeStats();

    }


    history.replaceState(
        null,
        "",
        "#" + page
    );

}


/* =========================================================
   10. MOBILE MENU
========================================================= */

function openMobileMenu() {

    const navigation = $(".main-navigation");
    const button = $("#mobileMenuButton");

    if (!navigation) return;

    navigation.classList.add("open");

    if (button) {

        button.setAttribute(
            "aria-expanded",
            "true"
        );

    }

}


function closeMobileMenu() {

    const navigation = $(".main-navigation");
    const button = $("#mobileMenuButton");

    if (!navigation) return;

    navigation.classList.remove("open");

    if (button) {

        button.setAttribute(
            "aria-expanded",
            "false"
        );

    }

}


function toggleMobileMenu() {

    const navigation = $(".main-navigation");

    if (!navigation) return;

    if (navigation.classList.contains("open")) {

        closeMobileMenu();

    } else {

        openMobileMenu();

    }

}


/* =========================================================
   11. THEME
========================================================= */

function loadTheme() {

    const savedTheme =
        localStorage.getItem(STORAGE.theme);

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");
        document.body.classList.add("dark-theme");

    } else {

        document.body.classList.remove("dark-mode");
        document.body.classList.remove("dark-theme");

    }

    updateThemeButton();

}


function toggleTheme() {

    const dark =
        document.body.classList.toggle(
            "dark-mode"
        );

    document.body.classList.toggle(
        "dark-theme",
        dark
    );

    localStorage.setItem(
        STORAGE.theme,
        dark ? "dark" : "light"
    );

    updateThemeButton();

}


function updateThemeButton() {

    const button = $("#themeToggle");

    if (!button) return;

    const dark =
        document.body.classList.contains(
            "dark-mode"
        );

    button.textContent =
        dark ? "☀" : "☾";

    button.title =
        dark
            ? "Switch to light mode"
            : "Switch to dark mode";

}


/* =========================================================
   12. BUILD LONG TEST TEXT
========================================================= */

function buildTypingText(language) {

    const list =
        TYPING_TEXTS[language]
        ||
        TYPING_TEXTS.english;

    /*
        Repeat enough times so even the 10-minute
        test does not run out of text.
    */

    const result = [];

    for (let i = 0; i < 25; i++) {

        result.push(...list);

    }

    return result.join(" ");

}


/* =========================================================
   13. LANGUAGE NAME
========================================================= */

function getLanguageName(value) {

    const select = $("#languageSelect");

    if (select) {

        const option =
            Array.from(
                select.options
            ).find(
                item => item.value === value
            );

        if (option) {

            return option.textContent
                .replace(/^\s+|\s+$/g, "");

        }

    }

    return value;

}


/* =========================================================
   14. TYPING TEST
========================================================= */

function prepareTypingTest(customText = null) {

    stopTestTimer();

    app.test.started = false;
    app.test.finished = false;

    app.test.timeLeft =
        app.test.duration;

    app.test.index = 0;

    app.test.correct = 0;
    app.test.errors = 0;
    app.test.totalTyped = 0;

    app.test.typedChars = [];

    app.test.startTime = null;

    const languageSelect =
        $("#languageSelect");

    const language =
        languageSelect
            ? languageSelect.value
            : "english";

    app.test.language = language;

    if (customText && customText.trim()) {

        app.test.text =
            customText.trim();

        app.test.custom = true;

    } else {

        app.test.text =
            buildTypingText(language);

        app.test.custom = false;

    }


    const currentLanguage =
        $("#currentLanguage");

    if (currentLanguage) {

        currentLanguage.textContent =
            app.test.custom
                ? "Custom Text"
                : getLanguageName(language);

    }


    updateTimerDisplay();

    renderTypingText();

    updateTestStats();

    updateTestProgress();

    resetTypingInput();

}


/* =========================================================
   15. RENDER TYPING TEXT
========================================================= */

function renderTypingText() {

    const display =
        $("#textDisplay");

    if (!display) return;

    display.innerHTML = "";

    const fragment =
        document.createDocumentFragment();

    const chars =
        Array.from(app.test.text);

    chars.forEach((char, index) => {

        const span =
            document.createElement("span");

        span.className =
            "typing-character untyped";

        span.dataset.index =
            String(index);

        span.textContent =
            char === " "
                ? "\u00A0"
                : char;

        fragment.appendChild(span);

    });

    display.appendChild(fragment);

    updateCharacterDisplay();

}


/* =========================================================
   16. UPDATE CHARACTER DISPLAY
========================================================= */

function updateCharacterDisplay() {

    const display =
        $("#textDisplay");

    if (!display) return;

    const characters =
        display.querySelectorAll(
            ".typing-character"
        );

    characters.forEach((element, index) => {

        element.classList.remove(
            "current",
            "correct",
            "wrong",
            "incorrect",
            "untyped"
        );


        if (index < app.test.index) {

            const typed =
                app.test.typedChars[index];

            const expected =
                app.test.text[index];

            if (typed === expected) {

                element.classList.add(
                    "correct"
                );

            } else {

                element.classList.add(
                    "wrong",
                    "incorrect"
                );

            }

        } else if (index === app.test.index) {

            element.classList.add(
                "current"
            );

        } else {

            element.classList.add(
                "untyped"
            );

        }

    });


    scrollCurrentCharacterIntoView();

}


/* =========================================================
   17. SCROLL CURRENT CHARACTER
========================================================= */

function scrollCurrentCharacterIntoView() {

    const display =
        $("#textDisplay");

    if (!display) return;

    const current =
        display.querySelector(
            ".typing-character.current"
        );

    if (!current) return;

    const displayRect =
        display.getBoundingClientRect();

    const currentRect =
        current.getBoundingClientRect();

    if (
        currentRect.top <
        displayRect.top + 35
        ||
        currentRect.bottom >
        displayRect.bottom - 35
    ) {

        current.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest"
        });

    }

}


/* =========================================================
   18. FOCUS HIDDEN TYPING INPUT
========================================================= */

function focusTypingInput() {

    if (app.currentPage !== "test") {
        return;
    }

    const input =
        $("#typingInput");

    if (!input) return;

    try {

        input.focus({
            preventScroll: true
        });

    } catch (error) {

        input.focus();

    }

}


/* =========================================================
   19. RESET HIDDEN INPUT
========================================================= */

function resetTypingInput() {

    const input =
        $("#typingInput");

    if (!input) return;

    input.value = "";

}


/* =========================================================
   20. START TEST
========================================================= */

function startTypingTest() {

    if (app.test.started) {
        return;
    }

    if (app.test.finished) {
        return;
    }

    app.test.started = true;
    app.test.startTime = Date.now();

    app.test.timeLeft =
        app.test.duration;

    updateTimerDisplay();

    stopTestTimer();

    app.test.timer =
        setInterval(() => {

            app.test.timeLeft--;

            updateTimerDisplay();

            updateTestStats();

            if (app.test.timeLeft <= 0) {

                finishTypingTest();

            }

        }, 1000);

}


/* =========================================================
   21. STOP TEST TIMER
========================================================= */

function stopTestTimer() {

    if (app.test.timer) {

        clearInterval(
            app.test.timer
        );

        app.test.timer = null;

    }

}


/* =========================================================
   22. PROCESS CHARACTER
========================================================= */

function processTypedCharacter(character) {

    if (app.currentPage !== "test") {
        return;
    }

    if (app.test.finished) {
        return;
    }

    if (!character) {
        return;
    }


    if (!app.test.started) {

        startTypingTest();

    }


    if (
        app.test.index >=
        app.test.text.length
    ) {

        return;

    }


    const expected =
        app.test.text[
            app.test.index
        ];


    const typed =
        character;


    app.test.typedChars[
        app.test.index
    ] = typed;


    app.test.totalTyped++;


    if (typed === expected) {

        app.test.correct++;

    } else {

        app.test.errors++;

        updateHeatmap(
            typed
        );

    }


    updateHeatmap(
        typed
    );


    app.test.index++;


    updateCharacterDisplay();

    updateTestStats();

    updateTestProgress();


    if (
        app.test.index >=
        app.test.text.length
    ) {

        finishTypingTest();

    }

}


/* =========================================================
   23. BACKSPACE
========================================================= */

function processBackspace() {

    if (app.currentPage !== "test") {
        return;
    }

    if (!app.test.started) {
        return;
    }

    if (app.test.index <= 0) {
        return;
    }


    const previousIndex =
        app.test.index - 1;

    const previousTyped =
        app.test.typedChars[
            previousIndex
        ];

    const expected =
        app.test.text[
            previousIndex
        ];


    if (
        previousTyped ===
        expected
    ) {

        app.test.correct =
            Math.max(
                0,
                app.test.correct - 1
            );

    } else {

        app.test.errors =
            Math.max(
                0,
                app.test.errors - 1
            );

    }


    app.test.totalTyped =
        Math.max(
            0,
            app.test.totalTyped - 1
        );


    app.test.typedChars.pop();

    app.test.index =
        previousIndex;


    updateCharacterDisplay();

    updateTestStats();

    updateTestProgress();

}


/* =========================================================
   24. TEST KEYBOARD INPUT
========================================================= */

function handleTypingKeydown(event) {

    if (app.currentPage !== "test") {
        return;
    }

    const key =
        event.key;


    /* Backspace */

    if (key === "Backspace") {

        event.preventDefault();

        processBackspace();

        return;

    }


    /* Space */

    if (key === " ") {

        event.preventDefault();

        processTypedCharacter(" ");

        resetTypingInput();

        return;

    }


    /* Enter */

    if (key === "Enter") {

        event.preventDefault();

        return;

    }


    /*
        For normal characters we DO NOT preventDefault.
        Browser will fire the input event and the input
        event handles the character.

        This avoids duplicate characters.
    */

}


/* =========================================================
   25. INPUT EVENT
========================================================= */

function handleTypingInput(event) {

    if (app.currentPage !== "test") {
        return;
    }

    const input =
        event.target;

    if (!input) return;

    const value =
        input.value;

    if (!value) {
        return;
    }


    /*
        Process every character in case the browser
        sends multiple characters at once.
    */

    const chars =
        Array.from(value);

    chars.forEach(character => {

        if (
            character !== "\n"
            &&
            character !== "\r"
        ) {

            processTypedCharacter(
                character
            );

        }

    });


    input.value = "";

}


/* =========================================================
   26. PASTE SUPPORT
========================================================= */

function handleTypingPaste(event) {

    if (app.currentPage !== "test") {
        return;
    }

    event.preventDefault();

    const pasted =
        event.clipboardData
            ?.getData("text")
            || "";

    if (!pasted) {
        return;
    }


    Array.from(pasted)
        .forEach(character => {

            if (
                character !== "\n"
                &&
                character !== "\r"
            ) {

                processTypedCharacter(
                    character
                );

            }

        });


    resetTypingInput();

}


/* =========================================================
   27. TEST STATS
========================================================= */

function getCurrentWPM() {

    if (!app.test.startTime) {
        return 0;
    }

    const elapsedSeconds =
        Math.max(
            1,
            (Date.now() -
                app.test.startTime) / 1000
        );


    const minutes =
        elapsedSeconds / 60;


    return Math.round(
        (
            app.test.correct / 5
        ) / minutes
    );

}


function getCurrentAccuracy() {

    if (
        app.test.totalTyped <= 0
    ) {

        return 100;

    }

    return (
        app.test.correct /
        app.test.totalTyped
    ) * 100;

}


function updateTestStats() {

    const wpm =
        getCurrentWPM();

    const accuracy =
        getCurrentAccuracy();


    const wpmValue =
        $("#wpmValue");

    const accuracyValue =
        $("#accuracyValue");

    const charactersValue =
        $("#charactersValue");

    const errorsValue =
        $("#errorsValue");


    if (wpmValue) {

        wpmValue.textContent =
            String(wpm);

    }


    if (accuracyValue) {

        accuracyValue.textContent =
            accuracy.toFixed(0) + "%";

    }


    if (charactersValue) {

        charactersValue.textContent =
            String(
                app.test.totalTyped
            );

    }


    if (errorsValue) {

        errorsValue.textContent =
            String(
                app.test.errors
            );

    }

}


/* =========================================================
   28. TIMER DISPLAY
========================================================= */

function updateTimerDisplay() {

    const timer =
        $("#testTimer");

    if (!timer) return;

    timer.textContent =
        formatTime(
            app.test.timeLeft
        );

}


/* =========================================================
   29. TEST PROGRESS
========================================================= */

function updateTestProgress() {

    const progress =
        $("#testProgress");

    const percentage =
        $("#progressPercentage");

    if (!progress) {
        return;
    }


    const total =
        app.test.text.length;


    if (!total) {
        return;
    }


    const value =
        clamp(
            (
                app.test.index /
                total
            ) * 100,
            0,
            100
        );


    progress.style.width =
        value + "%";


    if (percentage) {

        percentage.textContent =
            Math.round(value) + "%";

    }

}


/* =========================================================
   30. FINISH TYPING TEST
========================================================= */

function finishTypingTest() {

    if (app.test.finished) {
        return;
    }

    app.test.finished = true;

    stopTestTimer();


    const wpm =
        getCurrentWPM();

    const accuracy =
        getCurrentAccuracy();


    const result = {

        date: new Date().toISOString(),

        wpm: Number(wpm),

        accuracy:
            Number(
                accuracy.toFixed(2)
            ),

        characters:
            app.test.totalTyped,

        correct:
            app.test.correct,

        errors:
            app.test.errors,

        duration:
            app.test.duration,

        language:
            app.test.language,

        custom:
            app.test.custom

    };


    saveTestResult(result);

    updateBestScores(result);

    updateAchievements(result);

    updateProgressPage();

    updateHomeStats();


    showTestResultModal(
        result
    );

}


/* =========================================================
   31. SAVE TEST RESULT
========================================================= */

function saveTestResult(result) {

    const history =
        getJSON(
            STORAGE.history,
            []
        );


    history.unshift(result);


    /*
        Keep last 100 tests.
    */

    const trimmed =
        history.slice(
            0,
            100
        );


    setJSON(
        STORAGE.history,
        trimmed
    );

}


/* =========================================================
   32. BEST SCORES
========================================================= */

function updateBestScores(result) {

    const oldBest =
        Number(
            localStorage.getItem(
                STORAGE.bestWpm
            )
        ) || 0;


    const oldAccuracy =
        Number(
            localStorage.getItem(
                STORAGE.bestAccuracy
            )
        );


    if (result.wpm > oldBest) {

        localStorage.setItem(
            STORAGE.bestWpm,
            String(result.wpm)
        );

    }


    if (
        Number.isNaN(oldAccuracy)
        ||
        result.accuracy >
        oldAccuracy
    ) {

        localStorage.setItem(
            STORAGE.bestAccuracy,
            String(result.accuracy)
        );

    }

}


/* =========================================================
   33. TEST RESULT MODAL
========================================================= */

function showTestResultModal(result) {

    const overlay =
        $("#modalOverlay");

    const title =
        $("#modalTitle");

    const description =
        $("#modalDescription");

    const icon =
        $("#modalIcon");

    const action =
        $("#modalAction");


    if (!overlay) {
        return;
    }


    if (icon) {

        icon.textContent =
            result.accuracy >= 95
                ? "🏆"
                : result.wpm >= 60
                    ? "🚀"
                    : "🎯";

    }


    if (title) {

        title.textContent =
            "Test Complete!";

    }


    if (description) {

        description.innerHTML =
            `
                <strong>${result.wpm} WPM</strong>
                &nbsp; • &nbsp;
                <strong>${result.accuracy.toFixed(0)}% Accuracy</strong>
                <br><br>
                ${result.correct} correct characters
                and ${result.errors} errors.
            `;

    }


    updateModalStats();


    if (action) {

        action.textContent =
            "View Progress";

        action.onclick = () => {

            closeModal();

            navigateTo("progress");

        };

    }


    overlay.classList.add("show");

    overlay.setAttribute(
        "aria-hidden",
        "false"
    );

}


/* =========================================================
   34. MODAL
========================================================= */

function closeModal() {

    const overlay =
        $("#modalOverlay");

    if (!overlay) return;

    overlay.classList.remove("show");

    overlay.setAttribute(
        "aria-hidden",
        "true"
    );

}


function openProfileModal() {

    updateModalStats();

    const overlay =
        $("#modalOverlay");

    const title =
        $("#modalTitle");

    const description =
        $("#modalDescription");

    const icon =
        $("#modalIcon");

    const action =
        $("#modalAction");


    if (icon) {
        icon.textContent = "👤";
    }

    if (title) {
        title.textContent =
            "Your Typing Profile";
    }

    if (description) {

        description.textContent =
            "Keep practicing and build your personal typing record.";

    }

    if (action) {

        action.textContent =
            "View Progress";

        action.onclick = () => {

            closeModal();

            navigateTo("progress");

        };

    }


    if (overlay) {

        overlay.classList.add("show");

        overlay.setAttribute(
            "aria-hidden",
            "false"
        );

    }

}


function updateModalStats() {

    const history =
        getJSON(
            STORAGE.history,
            []
        );


    const best =
        Number(
            localStorage.getItem(
                STORAGE.bestWpm
            )
        ) || 0;


    const accuracy =
        Number(
            localStorage.getItem(
                STORAGE.bestAccuracy
            )
        );


    const bestElement =
        $("#modalBestWpm");

    const testsElement =
        $("#modalTests");

    const accuracyElement =
        $("#modalAccuracy");


    if (bestElement) {

        bestElement.textContent =
            String(best);

    }


    if (testsElement) {

        testsElement.textContent =
            String(history.length);

    }


    if (accuracyElement) {

        accuracyElement.textContent =
            (
                Number.isNaN(accuracy)
                    ? 100
                    : accuracy
            ).toFixed(0) + "%";

    }

}


/* =========================================================
   35. PRACTICE
========================================================= */

function getPracticeText(mode) {

    const list =
        PRACTICE_TEXTS[mode]
        ||
        PRACTICE_TEXTS.beginner;


    if (mode === "words") {

        return list[0];

    }


    if (mode === "articles") {

        return list[0];

    }


    return randomItem(list);

}


function startPractice(mode) {

    app.practice.mode =
        mode;

    app.practice.text =
        getPracticeText(mode);

    app.practice.started =
        false;

    app.practice.startTime =
        null;

    app.practice.typed =
        "";

    app.practice.errors =
        0;


    const workspace =
        $("#practiceWorkspace");

    const title =
        $("#practiceTitle");

    const target =
        $("#practiceTarget");

    const input =
        $("#practiceInput");


    if (workspace) {

        workspace.classList.remove(
            "hidden"
        );

    }


    if (title) {

        const names = {

            beginner: "Beginner Practice",

            words: "Word Practice",

            sentences: "Sentence Practice",

            articles: "Article Practice",

            programming: "Programming Practice",

            accuracy: "Accuracy Practice"

        };

        title.textContent =
            names[mode]
            ||
            "Typing Practice";

    }


    if (target) {

        target.textContent =
            app.practice.text;

    }


    if (input) {

        input.value = "";

        input.focus();

    }


    updatePracticeStats();


    if (workspace) {

        workspace.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


function updatePracticeWorkspace() {

    const workspace =
        $("#practiceWorkspace");

    if (!workspace) return;

}


function stopPracticeTimer() {

    if (app.practice.timer) {

        clearInterval(
            app.practice.timer
        );

        app.practice.timer =
            null;

    }

}


function handlePracticeInput(event) {

    const input =
        event.target;

    const value =
        input.value;

    if (!value) {
        return;
    }


    if (!app.practice.started) {

        app.practice.started =
            true;

        app.practice.startTime =
            Date.now();

    }


    app.practice.typed =
        value;


    app.practice.errors =
        calculateErrors(
            value,
            app.practice.text
        );


    updatePracticeStats();


    if (
        value.length >=
        app.practice.text.length
    ) {

        completePractice();

    }

}


function calculateErrors(
    typed,
    target
) {

    let errors = 0;

    const length =
        Math.min(
            typed.length,
            target.length
        );


    for (let i = 0; i < length; i++) {

        if (
            typed[i] !==
            target[i]
        ) {

            errors++;

        }

    }


    if (
        typed.length >
        target.length
    ) {

        errors +=
            typed.length -
            target.length;

    }


    return errors;

}


function getPracticeWPM() {

    if (
        !app.practice.startTime
        ||
        !app.practice.typed
    ) {

        return 0;

    }


    const elapsed =
        Math.max(
            1,
            (
                Date.now() -
                app.practice.startTime
            ) / 1000
        );


    return Math.round(
        (
            app.practice.typed.length /
            5
        )
        /
        (
            elapsed / 60
        )
    );

}


function getPracticeAccuracy() {

    if (
        !app.practice.typed.length
    ) {

        return 100;

    }


    const correct =
        Math.max(
            0,
            app.practice.typed.length -
            app.practice.errors
        );


    return (
        correct /
        app.practice.typed.length
    ) * 100;

}


function updatePracticeStats() {

    const wpm =
        getPracticeWPM();

    const accuracy =
        getPracticeAccuracy();


    const wpmElement =
        $("#practiceWpm");

    const accuracyElement =
        $("#practiceAccuracy");

    const characters =
        $("#practiceCharacters");

    const errors =
        $("#practiceErrors");


    if (wpmElement) {

        wpmElement.textContent =
            String(wpm);

    }


    if (accuracyElement) {

        accuracyElement.textContent =
            accuracy.toFixed(0) + "%";

    }


    if (characters) {

        characters.textContent =
            String(
                app.practice.typed.length
            );

    }


    if (errors) {

        errors.textContent =
            String(
                app.practice.errors
            );

    }

}


function completePractice() {

    stopPracticeTimer();


    const wpm =
        getPracticeWPM();

    const accuracy =
        getPracticeAccuracy();


    showToast(
        `Practice complete — ${wpm} WPM, ${accuracy.toFixed(0)}% accuracy`,
        "🎯",
        3000
    );


    setTimeout(() => {

        startPractice(
            app.practice.mode
        );

    }, 1200);

}


/* =========================================================
   36. DAILY CHALLENGE
========================================================= */

function getTodayKey() {

    const date =
        new Date();

    return [
        date.getFullYear(),
        String(
            date.getMonth() + 1
        ).padStart(2, "0"),
        String(
            date.getDate()
        ).padStart(2, "0")
    ].join("-");

}


function getChallengeData() {

    return getJSON(
        STORAGE.challenge,
        {
            lastCompleted: null,
            streak: 0,
            longestStreak: 0,
            bestWpm: 0,
            completedToday: false
        }
    );

}


function prepareDailyChallenge() {

    const data =
        getChallengeData();


    const today =
        getTodayKey();


    const challengeIndex =
        Math.abs(
            hashString(today)
        )
        %
        TYPING_TEXTS.english.length;


    app.challenge.text =
        TYPING_TEXTS
            .english[
                challengeIndex
            ];


    app.challenge.started =
        false;

    app.challenge.startTime =
        null;

    app.challenge.typed =
        "";

    app.challenge.errors =
        0;

    app.challenge.completed =
        data.lastCompleted === today;


    const target =
        $("#challengeTarget");

    const streak =
        $("#challengeStreak");

    const best =
        $("#challengeBest");

    const currentStreak =
        $("#challengeCurrentStreak");

    const longest =
        $("#challengeLongestStreak");

    const status =
        $("#challengeStatus");


    if (target) {

        target.textContent =
            app.challenge.text;

    }


    if (streak) {

        streak.textContent =
            String(
                data.streak || 0
            );

    }


    if (best) {

        best.textContent =
            String(
                data.bestWpm || 0
            )
            +
            " WPM";

    }


    if (currentStreak) {

        currentStreak.textContent =
            String(
                data.streak || 0
            )
            +
            " days";

    }


    if (longest) {

        longest.textContent =
            String(
                data.longestStreak || 0
            )
            +
            " days";

    }


    if (status) {

        status.textContent =
            data.lastCompleted === today
                ? "Completed ✓"
                : "Not completed";

    }


    updateChallengeStats();

}


function hashString(string) {

    let hash = 0;

    for (
        let i = 0;
        i < string.length;
        i++
    ) {

        hash =
            (
                (
                    hash << 5
                ) -
                hash
            )
            +
            string.charCodeAt(i);

        hash |= 0;

    }

    return hash;

}


function handleChallengeInput(event) {

    const input =
        event.target;

    const value =
        input.value;


    if (!value) {

        updateChallengeStats();

        return;

    }


    if (!app.challenge.started) {

        app.challenge.started =
            true;

        app.challenge.startTime =
            Date.now();

    }


    app.challenge.typed =
        value;


    app.challenge.errors =
        calculateErrors(
            value,
            app.challenge.text
        );


    updateChallengeStats();


    if (
        value.length >=
        app.challenge.text.length
    ) {

        completeDailyChallenge();

    }

}


function getChallengeWPM() {

    if (
        !app.challenge.startTime
    ) {

        return 0;

    }


    const elapsed =
        Math.max(
            1,
            (
                Date.now() -
                app.challenge.startTime
            ) / 1000
        );


    return Math.round(
        (
            app.challenge.typed.length /
            5
        )
        /
        (
            elapsed / 60
        )
    );

}


function getChallengeAccuracy() {

    if (
        !app.challenge.typed.length
    ) {

        return 100;

    }


    const correct =
        Math.max(
            0,
            app.challenge.typed.length -
            app.challenge.errors
        );


    return (
        correct /
        app.challenge.typed.length
    ) * 100;

}


function updateChallengeStats() {

    const wpm =
        getChallengeWPM();

    const accuracy =
        getChallengeAccuracy();


    const wpmElement =
        $("#challengeWpm");

    const accuracyElement =
        $("#challengeAccuracy");


    if (wpmElement) {

        wpmElement.textContent =
            String(wpm);

    }


    if (accuracyElement) {

        accuracyElement.textContent =
            accuracy.toFixed(0) + "%";

    }

}


function completeDailyChallenge() {

    if (
        app.challenge.completed
    ) {

        return;

    }


    const today =
        getTodayKey();

    const data =
        getChallengeData();


    let newStreak =
        data.streak || 0;


    if (data.lastCompleted) {

        const last =
            new Date(
                data.lastCompleted
            );

        const current =
            new Date();


        const difference =
            Math.round(
                (
                    current -
                    last
                ) /
                (
                    1000 *
                    60 *
                    60 *
                    24
                )
            );


        if (difference === 1) {

            newStreak++;

        } else if (difference > 1) {

            newStreak = 1;

        }

    } else {

        newStreak = 1;

    }


    const bestWpm =
        Math.max(
            data.bestWpm || 0,
            getChallengeWPM()
        );


    const longest =
        Math.max(
            data.longestStreak || 0,
            newStreak
        );


    const newData = {

        lastCompleted: today,

        streak: newStreak,

        longestStreak: longest,

        bestWpm: bestWpm,

        completedToday: true

    };


    setJSON(
        STORAGE.challenge,
        newData
    );


    app.challenge.completed =
        true;


    prepareDailyChallenge();


    showToast(
        `Daily challenge completed — ${getChallengeWPM()} WPM`,
        "🏆",
        3500
    );

}


/* =========================================================
   37. CUSTOM TEST
========================================================= */

function createCustomTest() {

    const text =
        $("#customText")?.value.trim();

    const language =
        $("#customLanguage")?.value
        || "english";

    const duration =
        Number(
            $("#customDuration")?.value
        )
        || 60;


    if (!text) {

        showToast(
            "Please enter some text first.",
            "⚠",
            3000
        );

        $("#customText")?.focus();

        return;

    }


    app.customTest.text =
        text;

    app.customTest.language =
        language;

    app.customTest.duration =
        duration;


    app.test.duration =
        duration;

    app.test.timeLeft =
        duration;

    app.test.language =
        language;

    app.test.custom =
        true;


    navigateTo("test");

    prepareTypingTest(text);

    focusTypingInput();


    showToast(
        "Custom typing test created!",
        "✨"
    );

}


/* =========================================================
   38. CUSTOM CHARACTER COUNT
========================================================= */

function updateCustomCharacterCount() {

    const textarea =
        $("#customText");

    const count =
        $("#customCharacterCount");


    if (!textarea || !count) {
        return;
    }


    const length =
        textarea.value.length;


    count.textContent =
        `${length} character${length === 1 ? "" : "s"}`;

}


/* =========================================================
   39. HISTORY
========================================================= */

function updateProgressPage() {

    updateProgressStats();

    renderTypingHistory();

    updateKeyboardHeatmap();

    updateAchievements();

    updateGoal();

    updateStreakProgress();

}


function updateProgressStats() {

    const history =
        getJSON(
            STORAGE.history,
            []
        );


    const best =
        Number(
            localStorage.getItem(
                STORAGE.bestWpm
            )
        ) || 0;


    const accuracy =
        Number(
            localStorage.getItem(
                STORAGE.bestAccuracy
            )
        );


    let average = 0;


    if (history.length) {

        average =
            history.reduce(
                (
                    sum,
                    item
                ) =>
                    sum +
                    Number(item.wpm || 0),
                0
            )
            /
            history.length;

    }


    const personalBest =
        $("#personalBest");

    const averageSpeed =
        $("#averageSpeed");

    const bestAccuracy =
        $("#bestAccuracy");

    const testsCompleted =
        $("#testsCompleted");


    if (personalBest) {

        personalBest.textContent =
            String(best);

    }


    if (averageSpeed) {

        averageSpeed.textContent =
            Math.round(average);

    }


    if (bestAccuracy) {

        bestAccuracy.textContent =
            (
                Number.isNaN(accuracy)
                    ? 100
                    : accuracy
            ).toFixed(0)
            +
            "%";

    }


    if (testsCompleted) {

        testsCompleted.textContent =
            String(history.length);

    }

}


/* =========================================================
   40. HISTORY RENDER
========================================================= */

function renderTypingHistory() {

    const container =
        $("#typingHistory");

    if (!container) return;


    const history =
        getJSON(
            STORAGE.history,
            []
        );


    if (!history.length) {

        container.innerHTML = `
            <div class="empty-state">
                <span>📊</span>
                <h3>No tests yet</h3>
                <p>
                    Complete your first typing test
                    to see your history here.
                </p>
            </div>
        `;

        return;

    }


    container.innerHTML =
        history
            .slice(0, 15)
            .map((item, index) => {

                const date =
                    new Date(
                        item.date
                    );


                return `
                    <div class="history-item">

                        <div class="history-rank">
                            #${index + 1}
                        </div>

                        <div class="history-main">

                            <strong>
                                ${item.wpm} WPM
                            </strong>

                            <span>
                                ${item.accuracy.toFixed(0)}% accuracy
                            </span>

                        </div>

                        <div class="history-details">

                            <span>
                                ${item.characters} chars
                            </span>

                            <span>
                                ${item.errors} errors
                            </span>

                        </div>

                        <div class="history-date">

                            ${date.toLocaleDateString()}

                        </div>

                    </div>
                `;

            })
            .join("");

}


/* =========================================================
   41. CLEAR HISTORY
========================================================= */

function clearHistory() {

    const history =
        getJSON(
            STORAGE.history,
            []
        );


    if (!history.length) {

        showToast(
            "There is no history to clear.",
            "ℹ"
        );

        return;

    }


    const confirmed =
        window.confirm(
            "Clear all typing history?"
        );


    if (!confirmed) {
        return;
    }


    localStorage.removeItem(
        STORAGE.history
    );

    localStorage.removeItem(
        STORAGE.bestWpm
    );

    localStorage.removeItem(
        STORAGE.bestAccuracy
    );


    updateProgressPage();

    updateHomeStats();

    updateModalStats();


    showToast(
        "Typing history cleared.",
        "✓"
    );

}


/* =========================================================
   42. WPM GOAL
========================================================= */

function getWpmGoal() {

    return Number(
        localStorage.getItem(
            STORAGE.wpmGoal
        )
    ) || 60;

}


function updateGoal() {

    const goal =
        getWpmGoal();

    const best =
        Number(
            localStorage.getItem(
                STORAGE.bestWpm
            )
        ) || 0;


    const goalValue =
        $("#wpmGoalValue");

    const goalInput =
        $("#wpmGoalInput");

    const progress =
        $("#wpmGoalProgress");


    if (goalValue) {

        goalValue.textContent =
            String(goal);

    }


    if (goalInput) {

        goalInput.value =
            String(goal);

    }


    if (progress) {

        const percentage =
            clamp(
                (
                    best /
                    goal
                ) * 100,
                0,
                100
            );


        progress.style.width =
            percentage + "%";

    }

}


function saveWpmGoal() {

    const input =
        $("#wpmGoalInput");

    if (!input) {
        return;
    }


    const goal =
        clamp(
            Number(input.value) || 60,
            1,
            300
        );


    localStorage.setItem(
        STORAGE.wpmGoal,
        String(goal)
    );


    updateGoal();


    showToast(
        `WPM goal set to ${goal}.`,
        "🎯"
    );

}


/* =========================================================
   43. STREAK PROGRESS
========================================================= */

function updateStreakProgress() {

    const data =
        getChallengeData();


    const current =
        $("#progressCurrentStreak");

    const longest =
        $("#progressLongestStreak");


    if (current) {

        current.textContent =
            String(
                data.streak || 0
            );

    }


    if (longest) {

        longest.textContent =
            String(
                data.longestStreak || 0
            )
            +
            " days";

    }

}


/* =========================================================
   44. KEYBOARD HEATMAP
========================================================= */

function getHeatmapData() {

    return getJSON(
        STORAGE.heatmap,
        {}
    );

}


function updateHeatmap(character) {

    if (!character) {
        return;
    }


    /*
        Heatmap is based on typed characters.
        Convert letters to uppercase.
    */

    const key =
        character.length === 1
            ? character.toUpperCase()
            : character;


    if (!/^[A-Z]$/.test(key)) {
        return;
    }


    const heatmap =
        getHeatmapData();


    heatmap[key] =
        (
            heatmap[key]
            || 0
        ) + 1;


    setJSON(
        STORAGE.heatmap,
        heatmap
    );

}


function updateKeyboardHeatmap() {

    const container =
        $("#keyboardHeatmap");

    if (!container) {
        return;
    }


    const heatmap =
        getHeatmapData();


    const keys =
        container.querySelectorAll(
            "[data-key]"
        );


    let max =
        0;


    Object.values(
        heatmap
    ).forEach(value => {

        max =
            Math.max(
                max,
                Number(value)
            );

    });


    keys.forEach(element => {

        const key =
            element.dataset.key;

        const value =
            Number(
                heatmap[key]
            )
            || 0;


        element.style.setProperty(
            "--heat",
            max
                ? String(
                    value / max
                )
                : "0"
        );


        element.title =
            `${key}: ${value} typed`;

    });

}


/* =========================================================
   45. ACHIEVEMENTS
========================================================= */

function updateAchievements() {

    const history =
        getJSON(
            STORAGE.history,
            []
        );


    const best =
        Number(
            localStorage.getItem(
                STORAGE.bestWpm
            )
        ) || 0;


    const bestAccuracy =
        Number(
            localStorage.getItem(
                STORAGE.bestAccuracy
            )
        );


    const conditions = {

        "first-test":
            history.length >= 1,

        "40-wpm":
            best >= 40,

        "60-wpm":
            best >= 60,

        "90-wpm":
            best >= 90,

        "accuracy":
            !Number.isNaN(bestAccuracy)
            &&
            bestAccuracy >= 98,

        "ten-tests":
            history.length >= 10

    };


    $$(".achievement").forEach(card => {

        const achievement =
            card.dataset.achievement;


        const unlocked =
            Boolean(
                conditions[
                    achievement
                ]
            );


        card.classList.toggle(
            "locked",
            !unlocked
        );

        card.classList.toggle(
            "unlocked",
            unlocked
        );

    });

}


/* =========================================================
   46. HOME STATS
========================================================= */

function updateHomeStats() {

    const history =
        getJSON(
            STORAGE.history,
            []
        );


    const best =
        Number(
            localStorage.getItem(
                STORAGE.bestWpm
            )
        ) || 0;


    const accuracy =
        Number(
            localStorage.getItem(
                STORAGE.bestAccuracy
            )
        );


    const challenge =
        getChallengeData();


    const tests =
        $("#homeTestsCompleted");

    const personalBest =
        $("#homePersonalBest");

    const bestAccuracy =
        $("#homeBestAccuracy");

    const streak =
        $("#homeStreak");


    if (tests) {

        tests.textContent =
            String(history.length);

    }


    if (personalBest) {

        personalBest.textContent =
            `${best} WPM`;

    }


    if (bestAccuracy) {

        bestAccuracy.textContent =
            (
                Number.isNaN(accuracy)
                    ? 100
                    : accuracy
            ).toFixed(0)
            +
            "%";

    }


    if (streak) {

        streak.textContent =
            `${challenge.streak || 0} days`;

    }

}


/* =========================================================
   47. NOTES
========================================================= */

function getFilteredNotes() {

    const search =
        (
            $("#notesSearch")?.value
            || ""
        )
        .trim()
        .toLowerCase();


    return NOTES_FILES.filter(note => {

        const matchesSearch =
            !search
            ||
            note.name
                .toLowerCase()
                .includes(search);


        const matchesFilter =
            app.notesFilter === "all"
            ||
            note.category ===
            app.notesFilter;


        return (
            matchesSearch &&
            matchesFilter
        );

    });

}


function renderNotes() {

    const container =
        $("#notesTopicList");

    const count =
        $("#notesCount");


    if (!container) {
        return;
    }


    const notes =
        getFilteredNotes();


    if (count) {

        count.textContent =
            `${notes.length} PDF${notes.length === 1 ? "" : "s"}`;

    }


    if (!notes.length) {

        container.innerHTML = `
            <div class="empty-state">
                <span>🔎</span>
                <h3>No notes found</h3>
                <p>
                    Try another search or category.
                </p>
            </div>
        `;

        return;

    }


    container.innerHTML =
        notes
            .map((note, index) => {

                const selected =
                    app.selectedNote?.name ===
                    note.name;


                return `
                    <button
                        type="button"
                        class="notes-topic ${selected ? "active" : ""}"
                        data-note-index="${NOTES_FILES.indexOf(note)}"
                    >

                        <span class="note-file-icon">
                            ${note.icon}
                        </span>

                        <span class="note-file-info">

                            <strong>
                                ${escapeHTML(note.name)}
                            </strong>

                            <small>
                                PDF • ${note.category}
                            </small>

                        </span>

                        <span class="note-arrow">
                            →
                        </span>

                    </button>
                `;

            })
            .join("");


    container
        .querySelectorAll(
            "[data-note-index]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.noteIndex
                        );

                    selectNote(
                        NOTES_FILES[index]
                    );

                }
            );

        });


    if (
        !app.selectedNote
        &&
        notes.length
    ) {

        selectNote(
            notes[0]
        );

    }

}


/* =========================================================
   48. SELECT NOTE
========================================================= */

function selectNote(note) {

    if (!note) {
        return;
    }


    app.selectedNote =
        note;


    const title =
        $("#selectedNoteTitle");

    const viewer =
        $("#noteViewerContent");

    const openButton =
        $("#openNotesPDF");

    const downloadButton =
        $("#downloadNotesPDF");


    const url =
        encodeURI(
            note.file
        );


    if (title) {

        title.textContent =
            note.name;

    }


    if (viewer) {

        viewer.innerHTML = `

            <iframe
                class="note-pdf-frame"
                src="${url}"
                title="${escapeHTML(note.name)}"
                loading="lazy"
            ></iframe>

        `;

    }


    if (openButton) {

        openButton.disabled =
            false;

    }


    if (downloadButton) {

        downloadButton.disabled =
            false;

    }


    renderNotes();

}


/* =========================================================
   49. OPEN NOTE PDF
========================================================= */

function openSelectedNote() {

    if (!app.selectedNote) {

        showToast(
            "Select a PDF first.",
            "📖"
        );

        return;

    }


    const url =
        encodeURI(
            app.selectedNote.file
        );


    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}


/* =========================================================
   50. DOWNLOAD NOTE PDF
========================================================= */

function downloadSelectedNote() {

    if (!app.selectedNote) {

        showToast(
            "Select a PDF first.",
            "📖"
        );

        return;

    }


    const link =
        document.createElement("a");


    link.href =
        encodeURI(
            app.selectedNote.file
        );


    link.download =
        app.selectedNote.name;


    link.target =
        "_blank";


    document.body.appendChild(
        link
    );


    link.click();


    link.remove();

}


/* =========================================================
   51. NOTES FILTER
========================================================= */

function setNotesFilter(filter) {

    app.notesFilter =
        filter;


    $$(".note-filter").forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.noteFilter ===
            filter
        );

    });


    renderNotes();

}


/* =========================================================
   52. EVENT LISTENERS
========================================================= */

function setupNavigationEvents() {

    $$("[data-page]").forEach(element => {

        element.addEventListener(
            "click",
            event => {

                event.preventDefault();

                const page =
                    element.dataset.page;

                navigateTo(page);

            }
        );

    });


    const mobileButton =
        $("#mobileMenuButton");


    if (mobileButton) {

        mobileButton.addEventListener(
            "click",
            toggleMobileMenu
        );

    }

}


/* =========================================================
   53. TEST EVENT LISTENERS
========================================================= */

function setupTestEvents() {

    const typingInput =
        $("#typingInput");

    const displayWrapper =
        $("#typingDisplayWrapper");

    const display =
        $("#textDisplay");


    if (typingInput) {

        typingInput.addEventListener(
            "keydown",
            handleTypingKeydown
        );


        typingInput.addEventListener(
            "input",
            handleTypingInput
        );


        typingInput.addEventListener(
            "paste",
            handleTypingPaste
        );


        typingInput.addEventListener(
            "blur",
            () => {

                if (
                    app.currentPage === "test"
                    &&
                    !app.test.finished
                ) {

                    setTimeout(
                        focusTypingInput,
                        50
                    );

                }

            }
        );

    }


    /*
        Clicking ANYWHERE in the typing display
        focuses the hidden input.
    */

    [
        displayWrapper,
        display
    ]
        .filter(Boolean)
        .forEach(element => {

            element.addEventListener(
                "pointerdown",
                event => {

                    event.preventDefault();

                    focusTypingInput();

                }
            );

        });


    /*
        Duration buttons
    */

    $$(".duration-button").forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const duration =
                    Number(
                        button.dataset.duration
                    );


                if (!duration) {
                    return;
                }


                $$(".duration-button")
                    .forEach(item => {

                        item.classList.toggle(
                            "active",
                            item === button
                        );

                    });


                app.test.duration =
                    duration;


                app.test.timeLeft =
                    duration;


                app.test.custom =
                    false;


                prepareTypingTest();

                focusTypingInput();

            }
        );

    });


    /*
        Language
    */

    const languageSelect =
        $("#languageSelect");


    if (languageSelect) {

        languageSelect.addEventListener(
            "change",
            () => {

                app.test.custom =
                    false;

                prepareTypingTest();

                focusTypingInput();

            }
        );

    }


    /*
        Restart
    */

    const restart =
        $("#restartTest");


    if (restart) {

        restart.addEventListener(
            "click",
            () => {

                prepareTypingTest(
                    app.test.custom
                        ? app.test.text
                        : null
                );

                focusTypingInput();

                showToast(
                    "Typing test restarted.",
                    "↻"
                );

            }
        );

    }

}


/* =========================================================
   54. PRACTICE EVENTS
========================================================= */

function setupPracticeEvents() {

    $$(".practice-card").forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const mode =
                    card.dataset.practice;

                startPractice(mode);

            }
        );

    });


    const input =
        $("#practiceInput");


    if (input) {

        input.addEventListener(
            "input",
            handlePracticeInput
        );

    }


    const restart =
        $("#practiceRestart");


    if (restart) {

        restart.addEventListener(
            "click",
            () => {

                startPractice(
                    app.practice.mode
                );

            }
        );

    }

}


/* =========================================================
   55. DAILY CHALLENGE EVENTS
========================================================= */

function setupChallengeEvents() {

    const input =
        $("#challengeInput");


    if (input) {

        input.addEventListener(
            "input",
            handleChallengeInput
        );

    }


    const restart =
        $("#restartChallenge");


    if (restart) {

        restart.addEventListener(
            "click",
            () => {

                const today =
                    getTodayKey();

                const data =
                    getChallengeData();


                if (
                    data.lastCompleted ===
                    today
                ) {

                    showToast(
                        "Today's challenge is already completed.",
                        "🏆"
                    );

                    return;

                }


                prepareDailyChallenge();

                if (input) {

                    input.value = "";

                    input.focus();

                }

            }
        );

    }

}


/* =========================================================
   56. CUSTOM EVENTS
========================================================= */

function setupCustomEvents() {

    const textarea =
        $("#customText");


    if (textarea) {

        textarea.addEventListener(
            "input",
            updateCustomCharacterCount
        );

    }


    const createButton =
        $("#createCustomTest");


    if (createButton) {

        createButton.addEventListener(
            "click",
            createCustomTest
        );

    }


    updateCustomCharacterCount();

}


/* =========================================================
   57. PROGRESS EVENTS
========================================================= */

function setupProgressEvents() {

    const saveGoal =
        $("#saveWpmGoal");


    if (saveGoal) {

        saveGoal.addEventListener(
            "click",
            saveWpmGoal
        );

    }


    const clear =
        $("#clearHistory");


    if (clear) {

        clear.addEventListener(
            "click",
            clearHistory
        );

    }

}


/* =========================================================
   58. NOTES EVENTS
========================================================= */

function setupNotesEvents() {

    const search =
        $("#notesSearch");


    if (search) {

        search.addEventListener(
            "input",
            renderNotes
        );

    }


    $$(".note-filter").forEach(button => {

        button.addEventListener(
            "click",
            () => {

                setNotesFilter(
                    button.dataset.noteFilter
                );

            }
        );

    });


    const openButton =
        $("#openNotesPDF");


    if (openButton) {

        openButton.addEventListener(
            "click",
            openSelectedNote
        );

    }


    const downloadButton =
        $("#downloadNotesPDF");


    if (downloadButton) {

        downloadButton.addEventListener(
            "click",
            downloadSelectedNote
        );

    }

}


/* =========================================================
   59. THEME EVENTS
========================================================= */

function setupThemeEvents() {

    const button =
        $("#themeToggle");


    if (button) {

        button.addEventListener(
            "click",
            toggleTheme
        );

    }

}


/* =========================================================
   60. PROFILE EVENTS
========================================================= */

function setupProfileEvents() {

    const profile =
        $("#profileButton");


    if (profile) {

        profile.addEventListener(
            "click",
            openProfileModal
        );

    }


    const close =
        $("#modalClose");


    if (close) {

        close.addEventListener(
            "click",
            closeModal
        );

    }


    const overlay =
        $("#modalOverlay");


    if (overlay) {

        overlay.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    overlay
                ) {

                    closeModal();

                }

            }
        );

    }

}


/* =========================================================
   61. KEYBOARD SHORTCUTS
========================================================= */

function setupKeyboardShortcuts() {

    document.addEventListener(
        "keydown",
        event => {

            /*
                Escape closes modal.
            */

            if (
                event.key ===
                "Escape"
            ) {

                closeModal();

            }


            /*
                Ctrl + Enter on custom page
                creates the test.
            */

            if (
                event.ctrlKey
                &&
                event.key === "Enter"
                &&
                app.currentPage === "custom"
            ) {

                createCustomTest();

            }

        }
    );

}


/* =========================================================
   62. HASH NAVIGATION
========================================================= */

function loadPageFromHash() {

    const hash =
        window.location.hash
            .replace("#", "")
            .trim();


    if (
        [
            "home",
            "practice",
            "test",
            "challenge",
            "custom",
            "progress",
            "notes"
        ].includes(hash)
    ) {

        navigateTo(hash);

    } else {

        navigateTo("home");

    }

}


/* =========================================================
   63. BEFORE PAGE LEAVE
========================================================= */

window.addEventListener(
    "hashchange",
    () => {

        const hash =
            window.location.hash
                .replace("#", "")
                .trim();


        if (hash) {

            navigateTo(hash);

        }

    }
);


/* =========================================================
   64. VISIBILITY CHANGE
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        /*
            We don't automatically stop the typing test because
            the user may switch tabs temporarily.

            But we stop practice's unnecessary timer.
        */

        if (
            document.hidden
            &&
            app.currentPage === "practice"
        ) {

            stopPracticeTimer();

        }

    }
);


/* =========================================================
   65. INITIALIZE APPLICATION
========================================================= */

function initializeApp() {

    loadTheme();

    setupNavigationEvents();

    setupTestEvents();

    setupPracticeEvents();

    setupChallengeEvents();

    setupCustomEvents();

    setupProgressEvents();

    setupNotesEvents();

    setupThemeEvents();

    setupProfileEvents();

    setupKeyboardShortcuts();


    /*
        Default test
    */

    app.test.duration = 60;

    prepareTypingTest();


    /*
        Daily challenge
    */

    prepareDailyChallenge();


    /*
        Progress
    */

    updateProgressPage();


    /*
        Home
    */

    updateHomeStats();


    /*
        Notes
    */

    renderNotes();


    /*
        Start page
    */

    loadPageFromHash();


    /*
        Make typing test input ready.
    */

    if (
        app.currentPage ===
        "test"
    ) {

        setTimeout(
            focusTypingInput,
            300
        );

    }

}


/* =========================================================
   66. DOM READY
========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeApp
    );

} else {

    initializeApp();

}


/* =========================================================
   END OF TYPINGMASTER JS
========================================================= */