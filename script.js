// Global Variables
let currentPageIndex = 1;
let countdownTimer;
let progressInterval;
let threatCountInterval;
let currentProgress = 0;
let userDDD = '';
let map;

// Page Management
function showPage(pageNumber) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(`page${pageNumber}`);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPageIndex = pageNumber;
        updateProgressTracker();
        
        // Page-specific initialization
        if (pageNumber === 9) {
            startLoadingAnalysis();
        } else if (pageNumber === 10) {
            initializeCharts();
        } else if (pageNumber === 11) {
            initializeFinalCharts();
            startCountdown('countdown2', 600);
        }
    }
}

function nextPage() {
    const nextPageNumber = currentPageIndex + 1;
    if (nextPageNumber <= 11) {
        showPage(nextPageNumber);
    }
}

// Countdown Timer
function startCountdown(elementId, initialTime) {
    let timeLeft = initialTime;
    const element = document.getElementById(elementId);
    
    if (countdownTimer) {
        clearInterval(countdownTimer);
    }
    
    countdownTimer = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        if (element) {
            element.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
        
        timeLeft--;
        
        if (timeLeft < 0) {
            clearInterval(countdownTimer);
            if (element) {
                element.textContent = '00:00';
            }
        }
    }, 1000);
}

// DDD Analysis
function analyzeDDD(event) {
    event.preventDefault();
    
    const dddInput = document.getElementById('ddd');
    userDDD = dddInput.value.trim();
    
    if (userDDD.length !== 5) {
        alert('Por favor, digite exatamente 5 dígitos (DDD + 2 primeiros números)');
        return;
    }
    
    // Show loading for a moment
    const button = event.target.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    button.innerHTML = '<i data-feather="loader"></i> Analisando...';
    button.disabled = true;
    
    // Replace icon
    feather.replace();
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        nextPage(); // Go to map page
    }, 2000);
}

// Map and Threat Analysis
function initializeMap() {
    const mapElement = document.getElementById('threatMap');
    if (!mapElement) return;
    
    // Initialize map centered on Brazil
    map = L.map('threatMap').setView([-14.235, -51.925], 4);
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Fake threat locations based on DDD
    const threats = generateFakeThreats(userDDD);
    
    // Add markers for each threat
    threats.forEach((threat, index) => {
        setTimeout(() => {
            addThreatMarker(threat);
            updateThreatList(threat);
            updateThreatCounter();
        }, index * 1000);
    });
    
    // Update analyzed number display
    document.getElementById('analyzedNumber').textContent = userDDD + 'XX-XXXX';
    document.getElementById('locationCount').textContent = threats.length;
}

function generateFakeThreats(ddd) {
    const dddCode = ddd.substring(0, 2);
    const baseThreats = [
        { lat: -23.5505, lng: -46.6333, city: 'São Paulo', state: 'SP', type: 'Clonagem de SIM' },
        { lat: -22.9068, lng: -43.1729, city: 'Rio de Janeiro', state: 'RJ', type: 'Uso não autorizado' },
        { lat: -19.9191, lng: -43.9386, city: 'Belo Horizonte', state: 'MG', type: 'Tentativa de fraude' },
        { lat: -25.4284, lng: -49.2733, city: 'Curitiba', state: 'PR', type: 'Acesso suspeito' },
        { lat: -30.0346, lng: -51.2177, city: 'Porto Alegre', state: 'RS', type: 'Clonagem detectada' },
        { lat: -15.8267, lng: -47.9218, city: 'Brasília', state: 'DF', type: 'Uso indevido' },
        { lat: -8.0476, lng: -34.8770, city: 'Recife', state: 'PE', type: 'Tentativa de acesso' },
        { lat: -12.9714, lng: -38.5014, city: 'Salvador', state: 'BA', type: 'Atividade fraudulenta' }
    ];
    
    // Select 3-5 random threats, with bias toward major cities for certain DDDs
    const threatCount = Math.floor(Math.random() * 3) + 3;
    let selectedThreats = [];
    
    // Add some logic based on DDD for realism
    if (['11', '12', '13', '14', '15', '16', '17', '18', '19'].includes(dddCode)) {
        // São Paulo region - higher chance of SP threats
        selectedThreats.push(baseThreats[0]); // São Paulo
    } else if (['21', '22', '24'].includes(dddCode)) {
        // Rio region
        selectedThreats.push(baseThreats[1]); // Rio de Janeiro
    }
    
    // Fill remaining slots randomly
    while (selectedThreats.length < threatCount) {
        const randomThreat = baseThreats[Math.floor(Math.random() * baseThreats.length)];
        if (!selectedThreats.some(t => t.city === randomThreat.city)) {
            selectedThreats.push({
                ...randomThreat,
                time: generateRandomTime(),
                details: generateThreatDetails(randomThreat.type)
            });
        }
    }
    
    return selectedThreats;
}

function generateRandomTime() {
    const hoursAgo = Math.floor(Math.random() * 24) + 1;
    const minutesAgo = Math.floor(Math.random() * 60);
    return `${hoursAgo}h${minutesAgo}min atrás`;
}

function generateThreatDetails(type) {
    const details = {
        'Clonagem de SIM': 'Chip clonado detectado em uso',
        'Uso não autorizado': 'Ligações realizadas sem autorização',
        'Tentativa de fraude': 'Tentativa de acesso a contas bancárias',
        'Acesso suspeito': 'Login em apps não reconhecidos',
        'Clonagem detectada': 'Duplicação de número confirmada',
        'Uso indevido': 'Atividades suspeitas detectadas',
        'Tentativa de acesso': 'Acesso a dados pessoais tentado',
        'Atividade fraudulenta': 'Transações não autorizadas'
    };
    return details[type] || 'Atividade suspeita detectada';
}

function addThreatMarker(threat) {
    if (!map) return;
    
    const redIcon = L.divIcon({
        className: 'threat-marker',
        html: '<div style="background: #dc2626; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });
    
    const marker = L.marker([threat.lat, threat.lng], { icon: redIcon }).addTo(map);
    
    marker.bindPopup(`
        <div style="font-family: sans-serif;">
            <strong style="color: #dc2626;">${threat.type}</strong><br>
            <strong>${threat.city}, ${threat.state}</strong><br>
            <span style="font-size: 12px; color: #666;">${threat.details}</span><br>
            <span style="font-size: 11px; color: #999;">${threat.time}</span>
        </div>
    `);
    
    // Animate marker appearance
    marker.getElement().style.animation = 'bounce 0.6s ease-out';
}

function updateThreatList(threat) {
    const threatList = document.getElementById('threatList');
    if (!threatList) return;
    
    const threatItem = document.createElement('div');
    threatItem.className = 'threat-item';
    threatItem.style.opacity = '0';
    threatItem.style.transform = 'translateY(20px)';
    
    threatItem.innerHTML = `
        <div class="threat-icon">
            <i data-feather="alert-triangle"></i>
        </div>
        <div class="threat-info">
            <h4>${threat.city}, ${threat.state}</h4>
            <p>${threat.details}</p>
        </div>
        <div class="threat-time">${threat.time}</div>
    `;
    
    threatList.appendChild(threatItem);
    feather.replace();
    
    // Animate in
    setTimeout(() => {
        threatItem.style.transition = 'all 0.5s ease';
        threatItem.style.opacity = '1';
        threatItem.style.transform = 'translateY(0)';
    }, 100);
}

function updateThreatCounter() {
    const counter = document.getElementById('threatCount');
    if (counter) {
        const currentCount = parseInt(counter.textContent);
        counter.textContent = currentCount + 1;
    }
}

// Loading Analysis (Page 9)
function startLoadingAnalysis() {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const scanSteps = document.getElementById('scanSteps');
    const criticalAlert = document.getElementById('criticalAlert');
    
    let progress = 0;
    let currentStep = 0;
    
    const steps = [
        { label: 'Verificando configurações de firewall', icon: 'shield' },
        { label: 'Analisando permissões de aplicativos', icon: 'lock' },
        { label: 'Testando resistência a malware', icon: 'activity' },
        { label: 'Avaliando criptografia de dados', icon: 'database' },
        { label: 'Finalizando relatório de segurança', icon: 'bar-chart-3' }
    ];
    
    // Create step elements
    scanSteps.innerHTML = '';
    steps.forEach((step, index) => {
        const stepElement = document.createElement('div');
        stepElement.className = 'scan-step pending';
        stepElement.innerHTML = `
            <div class="step-icon">
                <i data-feather="${step.icon}"></i>
            </div>
            <span class="step-text">${step.label}</span>
        `;
        scanSteps.appendChild(stepElement);
    });
    feather.replace();
    
    // Start progress animation
    if (progressInterval) {
        clearInterval(progressInterval);
    }
    
    progressInterval = setInterval(() => {
        progress += 2;
        
        if (progressFill) {
            progressFill.style.width = progress + '%';
        }
        if (progressText) {
            progressText.textContent = progress + '%';
        }
        
        // Update steps
        const stepIndex = Math.floor((progress / 100) * steps.length);
        if (stepIndex > currentStep && stepIndex < steps.length) {
            // Complete previous step
            if (currentStep >= 0) {
                const prevStep = scanSteps.children[currentStep];
                if (prevStep) {
                    prevStep.className = 'scan-step completed';
                    prevStep.querySelector('.step-icon').innerHTML = '<i data-feather="check-circle"></i>';
                }
            }
            
            // Activate current step
            const activeStep = scanSteps.children[stepIndex];
            if (activeStep) {
                activeStep.className = 'scan-step active';
            }
            
            currentStep = stepIndex;
            feather.replace();
        }
        
        // Show critical alert at 90%
        if (progress >= 90 && criticalAlert) {
            criticalAlert.classList.remove('hidden');
        }
        
        // Complete at 100%
        if (progress >= 100) {
            clearInterval(progressInterval);
            
            // Complete final step
            if (scanSteps.children[steps.length - 1]) {
                scanSteps.children[steps.length - 1].className = 'scan-step completed';
                scanSteps.children[steps.length - 1].querySelector('.step-icon').innerHTML = '<i data-feather="check-circle"></i>';
                feather.replace();
            }
            
            setTimeout(() => {
                nextPage();
            }, 1500);
        }
    }, 100);
}

// Chart Functions
function createDonutChart(canvas, percentage, color) {
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 5;
    const innerRadius = radius * 0.6;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI, true);
    ctx.fillStyle = '#374151';
    ctx.fill();
    
    // Draw progress arc
    const angle = (percentage / 100) * 2 * Math.PI;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + angle);
    ctx.arc(centerX, centerY, innerRadius, -Math.PI / 2 + angle, -Math.PI / 2, true);
    ctx.fillStyle = color;
    ctx.fill();
    
    // Draw percentage text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(percentage + '%', centerX, centerY);
}

function initializeCharts() {
    // Metric charts
    setTimeout(() => {
        createDonutChart(document.getElementById('threatChart'), 93, '#ef4444');
    }, 500);
    
    setTimeout(() => {
        createDonutChart(document.getElementById('fraudChart'), 89, '#f59e0b');
    }, 1000);
    
    setTimeout(() => {
        createDonutChart(document.getElementById('protectionChart'), 73, '#22c55e');
    }, 1500);
    
    // Main security chart
    setTimeout(() => {
        createDonutChart(document.getElementById('mainSecurityChart'), 27, '#ef4444');
    }, 2000);
    
    // Animate security bar
    setTimeout(() => {
        const currentLevel = document.getElementById('currentSecurity');
        if (currentLevel) {
            currentLevel.style.width = '27%';
        }
    }, 2500);
}

function initializeFinalCharts() {
    setTimeout(() => {
        createDonutChart(document.getElementById('currentChart'), 27, '#ef4444');
    }, 500);
    
    setTimeout(() => {
        createDonutChart(document.getElementById('proChart'), 97, '#22c55e');
    }, 1000);
}

// Progress Tracker
function updateProgressTracker() {
    const overallProgress = document.getElementById('overallProgress');
    const trackerFill = document.getElementById('trackerFill');
    const currentStep = document.getElementById('currentStep');
    const remainingSteps = document.getElementById('remainingSteps');
    
    const progress = Math.round((currentPageIndex / 11) * 100);
    
    if (overallProgress) {
        overallProgress.textContent = progress + '%';
    }
    
    if (trackerFill) {
        trackerFill.style.width = progress + '%';
    }
    
    if (currentStep) {
        currentStep.textContent = currentPageIndex;
    }
    
    if (remainingSteps) {
        remainingSteps.textContent = 11 - currentPageIndex;
    }
}

// Live Threat Counter
function startThreatCounter() {
    let threatCount = 180;
    const threatElement = document.getElementById('liveThreats');
    
    if (threatCountInterval) {
        clearInterval(threatCountInterval);
    }
    
    threatCountInterval = setInterval(() => {
        threatCount += Math.floor(Math.random() * 3) + 1;
        if (threatElement) {
            threatElement.textContent = threatCount;
        }
    }, 5000);
}

// Exit Prevention
function preventExit() {
    window.addEventListener('beforeunload', function(e) {
        e.preventDefault();
        e.returnValue = 'Tem certeza que deseja sair? Seus dados podem estar em risco!';
        return e.returnValue;
    });
    
    // Prevent back button
    window.addEventListener('popstate', function() {
        window.history.pushState(null, null, window.location.href);
    });
    
    // Push initial state
    window.history.pushState(null, null, window.location.href);
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', function() {
    // Start countdown timer
    startCountdown('countdown', 900);
    
    // Start threat counter
    startThreatCounter();
    
    // Initialize progress tracker
    updateProgressTracker();
    
    // Prevent exit
    preventExit();
    
    // Initialize feather icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
    
    // Initialize map when page 5 is shown
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const page5 = document.getElementById('page5');
                if (page5 && page5.classList.contains('active') && !map) {
                    setTimeout(initializeMap, 500);
                }
            }
        });
    });
    
    const page5 = document.getElementById('page5');
    if (page5) {
        observer.observe(page5, { attributes: true });
    }
});

// Clean up intervals when page unloads
window.addEventListener('beforeunload', function() {
    if (countdownTimer) clearInterval(countdownTimer);
    if (progressInterval) clearInterval(progressInterval);
    if (threatCountInterval) clearInterval(threatCountInterval);
});

// Handle form submissions
document.addEventListener('submit', function(e) {
    if (e.target.classList.contains('ddd-form')) {
        analyzeDDD(e);
    }
});

// Smooth transitions
document.addEventListener('click', function(e) {
    if (e.target.matches('button[onclick*="nextPage"]') || e.target.closest('div[onclick*="nextPage"]')) {
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.target.style.transform = '';
        }, 150);
    }
});