const authScreen = document.getElementById('auth-screen');
const dashboardScreen = document.getElementById('dashboard-screen');
const userForm = document.getElementById('userForm');
const displayUserName = document.getElementById('displayUserName');
const logoutBtn = document.getElementById('logoutBtn');

const queryInput = document.getElementById('queryInput');
const submitQueryBtn = document.getElementById('submitQueryBtn');
const micBtn = document.getElementById('micBtn');
const micText = document.getElementById('micText');

const responseSection = document.getElementById('responseSection');
const loadingSpinner = document.getElementById('loadingSpinner');
const resultCard = document.getElementById('resultCard');

const resAct = document.getElementById('resAct');
const resSummary = document.getElementById('resSummary');
const resSteps = document.getElementById('resSteps');

// 1. Handle Login
userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    if(name) {
        displayUserName.textContent = name;
        authScreen.classList.add('hidden');
        dashboardScreen.classList.remove('hidden');
    }
});

// 2. Handle Logout
logoutBtn.addEventListener('click', () => {
    userForm.reset();
    dashboardScreen.classList.add('hidden');
    authScreen.classList.remove('hidden');
    responseSection.classList.add('hidden');
    queryInput.value = '';
});

// 3. Handle Category Chips click (auto-fills query)
document.querySelectorAll('.cat-chip').forEach(chip => {
    chip.addEventListener('click', () => {
        queryInput.value = chip.getAttribute('data-query');
        triggerAIAnalysis();
    });
});

// 4. Handle Submit Button
submitQueryBtn.addEventListener('click', () => {
    if(queryInput.value.trim() !== "") {
        triggerAIAnalysis();
    } else {
        alert('Kripya pehle apni samasya type karein ya mic par bolein.');
    }
});

// 5. Simulated Voice Recording Feature
let isRecording = false;
micBtn.addEventListener('click', () => {
    if (!isRecording) {
        isRecording = true;
        micBtn.classList.add('listening');
        micText.textContent = "Listening... Speak now";
        queryInput.value = "";
        queryInput.placeholder = "Listening to your voice query...";

        // Simulate voice typing after 3 seconds
        setTimeout(() => {
            queryInput.value = "Mere employer ne pichle 2 mahine ki salary nahi di hai, kya karu?";
            micBtn.classList.remove('listening');
            micText.textContent = "Speak Problem";
            queryInput.placeholder = "Jaise: Employer ne salary nahi di...";
            isRecording = false;
            triggerAIAnalysis();
        }, 3000);
    }
});

// 6. AI Response Simulator Function
function triggerAIAnalysis() {
    responseSection.classList.remove('hidden');
    loadingSpinner.classList.remove('hidden');
    resultCard.classList.add('hidden');

    // Dynamic mock logic based on query keywords
    setTimeout(() => {
        loadingSpinner.classList.add('hidden');
        resultCard.classList.remove('hidden');

        const text = queryInput.value.toLowerCase();
        
        if(text.includes('salary') || text.includes('employer') || text.includes('labour')) {
            resAct.textContent = "Payment of Wages Act, 1936";
            resSummary.textContent = "Employer dwara bina kisi valid legal reason ke salary rokna ya delay karna Labour Laws ke khilaf hai.";
            resSteps.innerHTML = `
                <li>Apni company ko official email ya written notice bhejein jisme salary release ki maang ho.</li>
                <li>Agar company na sune, toh state ke <strong>Labour Commissioner Office</strong> mein form bhar kar shikayat karein.</li>
                <li>Free legal assistance ke liye NALSA helpline 15100 par sampark karein.</li>
            `;
        } else if(text.includes('fraud') || text.includes('shopping') || text.includes('online')) {
            resAct.textContent = "Consumer Protection Act, 2019";
            resSummary.textContent = "Online ecommerce fraud ya fake product delivery ke khilaf aapko consumer forum mein mukabla karne ka poora adhikar hai.";
            resSteps.innerHTML = `
                <li>Order ID, invoice, aur payment receipt ka screenshot safe rakhein.</li>
                <li>National Consumer Helpline (NCH) portal par online complaint darj karein.</li>
                <li>Agar company response na de, toh District Consumer Disputes Redressal Commission mein case file karein.</li>
            `;
        } else if(text.includes('cyber') || text.includes('bullying') || text.includes('harassment')) {
            resAct.textContent = "Information Technology Act, 2000 (Section 67/66E)";
            resSummary.textContent = "Digital platforms par harassment ya cyber crime ek punishable offense hai jisme turant action liya ja sakta hai.";
            resSteps.innerHTML = `
                <li>Chat messages ya abusive posts ke screenshots aur links save kar lein.</li>
                <li>Turant National Cyber Crime Reporting Portal (cybercrime.gov.in) par report karein.</li>
                <li>Emergency ke liye helpline number <strong>1930</strong> par dial karein.</li>
            `;
        } else {
            resAct.textContent = "General Legal Guidance & Rights";
            resSummary.textContent = "Aapki samasya ko primary legal framework ke antargat analyze kiya gaya hai jiske liye aapko local administration ya legal aid ki sahayata leni chahiye.";
            resSteps.innerHTML = `
                <li>Apne paas ke District Legal Services Authority (DLSA) office jayein.</li>
                <li>Free legal advice aur counsel ke liye NALSA portal ka use karein.</li>
                <li>Kisi bhi emergency ya crime ki sthiti mein turant local police station se sampark karein.</li>
            `;
        }
    }, 1500); // 1.5 seconds loading simulation for AI effect
}