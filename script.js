const introScreen = document.getElementById('intro-screen');
const startHackBtn = document.getElementById('start-hack-btn');
const targetSelectionScreen = document.getElementById('target-selection-screen');
const initiateHackBtn = document.getElementById('initiate-hack-btn');
const hackingScreen = document.getElementById('hacking-screen');
const hackingOutput = document.getElementById('hacking-output');
const successScreen = document.getElementById('success-screen');
const phoneNumberInput = document.getElementById('phone-number-input');
const appListDiv = document.querySelector('.app-list');
const hackedAppIcon = document.getElementById('hacked-app-icon');

let selectedApp = null; // To store the currently selected app

// List of popular apps with their names and simulated icon URLs
// In a real scenario, you'd host these images or use data URIs.
// For GitHub Pages, you can place them in an 'icons' folder next to your HTML/CSS/JS.
const apps = [
    { name: "WhatsApp", icon: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" },
    { name: "Instagram", icon: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" },
    { name: "Telegram", icon: "https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" },
    { name: "PUBG Mobile", icon: "https://upload.wikimedia.org/wikipedia/en/2/25/PUBG_Mobile_logo.svg" },
    { name: "Clash of Clans", icon: "https://upload.wikimedia.org/wikipedia/en/b/b3/Clash_of_Clans_logo.svg" },
    { name: "Spotify", icon: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" },
    { name: "Netflix", icon: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
    { name: "TikTok", icon: "https://upload.wikimedia.org/wikipedia/en/e/e7/TikTok_logo.svg" },
    { name: "Facebook", icon: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" },
    { name: "Snapchat", icon: "https://upload.wikimedia.org/wikipedia/en/a/ad/Snapchat_logo.svg" },
    { name: "YouTube", icon: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" },
    { name: "Gmail", icon: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" },
    { name: "Google Chrome", icon: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%282011%29.svg" },
    { name: "Among Us", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Among_Us_logo.svg/langfa-320px-Among_Us_logo.svg.png" }, // Example with Farsi Wiki link for diversity
];


// Function to generate app list dynamically
function generateAppList() {
    appListDiv.innerHTML = ''; // Clear previous list
    apps.forEach(app => {
        const appItem = document.createElement('div');
        appItem.classList.add('app-item');
        appItem.dataset.appName = app.name;

        const appIcon = document.createElement('img');
        appIcon.src = app.icon;
        appIcon.alt = app.name + " icon";
        appIcon.classList.add('app-icon');

        const appName = document.createElement('span');
        appName.classList.add('app-name');
        appName.textContent = app.name;

        appItem.appendChild(appIcon);
        appItem.appendChild(appName);
        appListDiv.appendChild(appItem);

        appItem.addEventListener('click', () => {
            // Remove 'selected' class from all other app items
            document.querySelectorAll('.app-item').forEach(item => {
                item.classList.remove('selected');
            });
            // Add 'selected' class to the clicked item
            appItem.classList.add('selected');
            selectedApp = app; // Set the selected app
            phoneNumberInput.value = ''; // Clear phone number if an app is selected
        });
    });
}

// Initial display of intro screen
introScreen.classList.remove('hidden');
generateAppList(); // Generate app list on load

startHackBtn.addEventListener('click', () => {
    introScreen.classList.add('hidden');
    targetSelectionScreen.classList.remove('hidden');
});

initiateHackBtn.addEventListener('click', () => {
    const targetInfo = phoneNumberInput.value.trim();
    if (targetInfo === '' && !selectedApp) {
        alert("لطفاً یک برنامه را انتخاب کنید یا شماره تلفن وارد کنید.");
        return;
    }

    targetSelectionScreen.classList.add('hidden');
    hackingScreen.classList.remove('hidden');
    startHackingSimulation(targetInfo || (selectedApp ? selectedApp.name : 'Unknown Target'));
});

// Hacking simulation messages
const hackingMessages = [
    "Establishing secure connection to target network...",
    "Scanning for open ports and vulnerabilities...",
    "Attempting to bypass firewall systems...",
    "Injecting malicious payload via exploit...",
    "Analyzing server response and data flow...",
    "Cracking encryption protocols (AES-256, RSA-2048)...",
    "Accessing root directory and system files...",
    "Extracting user authentication tokens...",
    "Bypassing biometric security measures...",
    "Diverting data streams to secure proxy...",
    "Downloading sensitive user data...",
    "Compiling a full system report...",
    "Obfuscating digital footprint...",
    "Cleaning up logs and traces...",
    "Establishing persistent backdoor...",
    "Verifying data integrity...",
    "Synchronizing compromised data to cloud...",
    "Mission status: Critical data acquisition in progress...",
    "Executing phase 2 protocols...",
    "Analyzing network traffic for anomalies...",
    "Deploying advanced persistent threat (APT)...",
    "Bypassing multi-factor authentication (MFA)...",
    "Enumerating active user sessions...",
    "Mapping internal network architecture...",
    "Elevating privileges to administrative level...",
    "Collecting password hashes and credentials...",
    "Disabling security alerts and monitoring...",
    "Initializing data exfiltration module...",
    "Finalizing remote command and control (C2)..."
];

let messageIndex = 0;
let hackInterval;
let hackStartTime;
let totalHackDuration; // In milliseconds (10 to 30 minutes)

function getRandomDuration(minMinutes, maxMinutes) {
    return (Math.floor(Math.random() * (maxMinutes - minMinutes + 1)) + minMinutes) * 60 * 1000;
}

function startHackingSimulation(target) {
    hackingOutput.textContent = `Target: ${target}\n\n`;
    messageIndex = 0;
    
    totalHackDuration = getRandomDuration(10, 30); // 10 to 30 minutes
    hackStartTime = Date.now();

    hackInterval = setInterval(() => {
        if (messageIndex < hackingMessages.length) {
            const message = hackingMessages[messageIndex];
            const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
            hackingOutput.textContent += `[${timestamp}] ${message}\n`;
            hackingOutput.scrollTop = hackingOutput.scrollHeight; // Auto-scroll to bottom
            messageIndex++;
        }

        // Check if total duration has passed
        if (Date.now() - hackStartTime >= totalHackDuration) {
            clearInterval(hackInterval);
            hackingOutput.textContent += "\n[INFO] Operation complete. Finalizing...\n";
            setTimeout(() => {
                showSuccessScreen(target);
            }, 3000); // Wait 3 seconds before showing success screen
        } else if (messageIndex >= hackingMessages.length) {
            // Loop messages if duration not passed but messages ran out
            messageIndex = 0;
            hackingOutput.textContent += "\n[INFO] Continuing data extraction...\n";
        }
    }, Math.random() * (3000 - 1000) + 1000); // Random interval between 1 to 3 seconds for messages
}

function showSuccessScreen(target) {
    hackingScreen.classList.add('hidden');
    successScreen.classList.remove('hidden');
    
    // Set the icon based on the selected app, or a generic "hacked" icon
    let finalIconSrc = '';
    if (selectedApp) {
        finalIconSrc = selectedApp.icon;
    } else {
        // Fallback for phone number input or if no app selected, use a generic "hacked" icon
        // You might want to create a generic "hacked_icon.svg" and place it in an 'icons' folder
        finalIconSrc = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2300FF00'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z'/%3E%3C/svg%3E"; // A generic green hacker icon
    }
    hackedAppIcon.src = finalIconSrc;
}

// Listen for input on the phone number field
phoneNumberInput.addEventListener('input', () => {
    // If user types in phone number, deselect any chosen app
    if (phoneNumberInput.value.trim() !== '') {
        document.querySelectorAll('.app-item').forEach(item => {
            item.classList.remove('selected');
        });
        selectedApp = null;
    }
});
  
