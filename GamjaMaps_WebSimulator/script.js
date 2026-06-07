/* ==========================================
   Gamja Maps Web Simulator JavaScript
   Interactive Presentation & App Simulation
   ========================================== */

// 1. Script Timeline Data (User's New Script)
const scriptData = [
    {
        id: "intro",
        title: "인트로",
        desc: "마케팅 영업의 치트키 감자맵스 소개",
        subtitle: "잡상인 취급받는 낡은 영업은 이제 끝내십시오. 마케팅 계약 승률을 200% 극대화하는 완벽한 세일즈 파트너, 감자맵스를 소개합니다.",
        view: "dashboard",
        duration: 9500 // fallback duration in ms if TTS is off/fails
    },
    {
        id: "timing",
        title: "첫째, 타이밍",
        desc: "신규 매장 및 브레이크 타임 스캔",
        subtitle: "첫째, 타이밍을 놓치지 마십시오. 최근 50일 이내 개업한 신규 매장(🔥)과 틈새 골목 상권(💎)을 1초 만에 스캔하고, 사장님이 한가하게 자리에 앉아 쉬는 브레이크 타임(🟢 여유 배지)을 귀신같이 포착하여 안내합니다.",
        view: "timing",
        duration: 16500
    },
    {
        id: "tracking",
        title: "둘째, 실시간 추적",
        desc: "제안서 열람 시 실시간 FCM 알림",
        subtitle: "둘째, 고객의 움직임을 실시간으로 추적하십시오. 발송된 모바일 제안서를 사장님이 열어보는 순간, 슬라이더를 조작해 예상 매출을 계산해보는 순간, 영업 사원의 스마트폰으로 실시간 FCM 푸시 알림이 발송됩니다. 사장님이 관심을 보이는 바로 그 1분 뒤에 전화를 걸어 확실하게 클로징하십시오.",
        view: "tracking",
        duration: 22000
    },
    {
        id: "roleplay",
        title: "셋째, AI 예습",
        desc: "가상 사장님 모의 훈련 & 오답노트",
        subtitle: "셋째, 문을 열기 전 AI와 실전처럼 예습하십시오. 현장 방문 직전, 까다로운 거절 패턴을 학습한 AI 가상 사장님과 말로 대화하며 롤플레잉 훈련을 진행합니다. 훈련 기록표(🔒)는 나만의 오답 노트가 되어 사장님의 거절 반응을 단숨에 제압하는 특급 치트키 화법을 제공합니다.",
        view: "roleplay",
        duration: 18500
    },
    {
        id: "outro",
        title: "설치 및 마무리",
        desc: "Play Store 설치 및 VIP 혜택",
        subtitle: "전국 상권 인허가 데이터를 실시간으로 조회하여 매일 아침 황금 타겟을 배달해 주는 완벽한 세일즈 동반자. 지금 구글 플레이 스토어에서 '감자맵스'를 검색하세요. 감자맵스 VIP 멤버십이 당신의 매출 그래프를 바꿉니다!",
        view: "download",
        duration: 14500
    }
];

// 2. DOM Elements
const welcomeOverlay = document.getElementById("welcomeOverlay");
const btnWelcomeStart = document.getElementById("btnWelcomeStart");

const btnPlayAd = document.getElementById("btnPlayAd");
const btnResetAd = document.getElementById("btnResetAd");
const toggleTts = document.getElementById("toggleTts");
const volumeSlider = document.getElementById("volumeSlider");

const avatarBox = document.getElementById("avatarBox");
const mouth = document.getElementById("mouth");
const leftBlink = document.getElementById("left-blink");
const rightBlink = document.getElementById("right-blink");
const anchorSvg = document.getElementById("anchorSvg");
const statusDot = document.getElementById("statusDot");
const statusText = document.getElementById("statusText");
const subtitleText = document.getElementById("subtitleText");
const timelineList = document.getElementById("timelineList");

// Phone screen views
const phoneScreen = document.getElementById("phoneScreen");
const screenContainer = document.getElementById("screenContainer");
const phoneNavbar = document.getElementById("phoneNavbar");
const phoneTime = document.getElementById("phoneTime");
const fcmPushBanner = document.getElementById("fcmPushBanner");
const fcmTitle = document.getElementById("fcmTitle");
const fcmMessage = document.getElementById("fcmMessage");

// View Specific Elements
// Dashboard
const btnStartDashboardScan = document.getElementById("btnStartDashboardScan");
const dashLossAmount = document.getElementById("dashLossAmount");
// Timing (Map)
const btnTriggerMapScan = document.getElementById("btnTriggerMapScan");
const radarSweep = document.getElementById("radarSweep");
const mapPins = document.getElementById("mapPins");
const scannerStatusText = document.getElementById("scannerStatusText");
// Tracking
const tabOwner = document.getElementById("tabOwner");
const tabSalesman = document.getElementById("tabSalesman");
const paneOwner = document.getElementById("paneOwner");
const paneSalesman = document.getElementById("paneSalesman");
const proposalSlider = document.getElementById("proposalSlider");
const calcPercent = document.getElementById("calcPercent");
const calcSales = document.getElementById("calcSales");
const crmFeed = document.getElementById("crmFeed");
const goldTimeCard = document.getElementById("goldTimeCard");
const goldCountdown = document.getElementById("goldCountdown");
const btnGoldCallAction = document.getElementById("btnGoldCallAction");
const btnProposalCallOwner = document.getElementById("btnProposalCallOwner");
// Roleplay
const roleplaySetup = document.getElementById("roleplaySetup");
const btnStartRoleplay = document.getElementById("btnStartRoleplay");
const roleplayChatContainer = document.getElementById("roleplayChatContainer");
const chatRound = document.getElementById("chatRound");
const chatMessages = document.getElementById("chatMessages");
const chatOptions = document.getElementById("chatOptions");
const scorecardOverlay = document.getElementById("scorecardOverlay");
const scorecardLockIcon = document.getElementById("scorecardLockIcon");
const scoreNum = document.getElementById("scoreNum");
const scoreEvalTitle = document.getElementById("scoreEvalTitle");
const scoreEvalDesc = document.getElementById("scoreEvalDesc");
const btnRestartRoleplay = document.getElementById("btnRestartRoleplay");
// Download (Play Store)
const btnPsInstall = document.getElementById("btnPsInstall");

// Mode Tabs & Content Panels
const modeTimeline = document.getElementById("modeTimeline");
const modeFree = document.getElementById("modeFree");
const panelTimelineContent = document.getElementById("panelTimelineContent");
const panelFreeContent = document.getElementById("panelFreeContent");

// Map Search Input
const mapSearchInput = document.getElementById("mapSearchInput");

// AI Boss Info
const bossSelect = document.getElementById("bossSelect");
const bossAvatarDisp = document.getElementById("bossAvatarDisp");
const bossNameDisp = document.getElementById("bossNameDisp");
const bossDescDisp = document.getElementById("bossDescDisp");
const chatBossAvatar = document.getElementById("chatBossAvatar");
const chatBossName = document.getElementById("chatBossName");

// Local CRM Database & Reset
const statDiaryCount = document.getElementById("statDiaryCount");
const statLastScore = document.getElementById("statLastScore");
const btnClearDb = document.getElementById("btnClearDb");
const diaryList = document.getElementById("diaryList");
const salesDiaryDatabase = document.getElementById("salesDiaryDatabase");

// 3. Audio Synthesizer (Web Audio API)
let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

// Synth Chime Sound (FCM Notification Chime)
function playChimeSound() {
    try {
        initAudio();
        const now = audioCtx.currentTime;
        
        const osc1 = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(880, now); // A5
        osc1.frequency.exponentialRampToValueAtTime(1320, now + 0.1); // E6
        
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(440, now);
        osc2.frequency.exponentialRampToValueAtTime(880, now + 0.15);
        
        gainNode.gain.setValueAtTime(0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        
        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.6);
        osc2.stop(now + 0.6);
    } catch (e) {
        console.error("Audio synth failed", e);
    }
}

// Radar Sweep Sound
function playRadarSweepSound() {
    try {
        initAudio();
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 1.2);
        
        gainNode.gain.setValueAtTime(0.08, now);
        gainNode.gain.linearRampToValueAtTime(0.12, now + 0.6);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
        
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc.start(now);
        osc.stop(now + 1.2);
    } catch (e) {}
}

// Success Chime Sound
function playSuccessSound() {
    try {
        initAudio();
        const now = audioCtx.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        
        notes.forEach((freq, idx) => {
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            osc.type = 'sine';
            osc.frequency.value = freq;
            
            gainNode.gain.setValueAtTime(0, now + idx * 0.1);
            gainNode.gain.linearRampToValueAtTime(0.12, now + idx * 0.1 + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.5);
            
            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            osc.start(now + idx * 0.1);
            osc.stop(now + idx * 0.1 + 0.65);
        });
    } catch (e) {}
}

// Click sound
function playClickSound() {
    try {
        initAudio();
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(2000, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.04);
        
        gainNode.gain.setValueAtTime(0.05, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc.start(now);
        osc.stop(now + 0.05);
    } catch (e) {}
}

// Call Ringing Sound (continuous beep beep)
let ringInterval = null;
function startRingingSound() {
    try {
        initAudio();
        stopRingingSound();
        
        const ring = () => {
            const now = audioCtx.currentTime;
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(450, now);
            osc.frequency.linearRampToValueAtTime(450, now + 0.5);
            
            gainNode.gain.setValueAtTime(0.1, now);
            gainNode.gain.setValueAtTime(0.1, now + 0.4);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
            
            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            osc.start(now);
            osc.stop(now + 0.5);
        };
        
        ring();
        ringInterval = setInterval(ring, 1200);
    } catch (e) {}
}

function stopRingingSound() {
    if (ringInterval) {
        clearInterval(ringInterval);
        ringInterval = null;
    }
}


// 4. Web Speech Synthesis (TTS) Narrator
let ttsSynthesis = window.speechSynthesis;
let currentUtterance = null;
let voices = [];

function loadVoices() {
    if (ttsSynthesis) {
        voices = ttsSynthesis.getVoices();
    }
}
loadVoices();
if (ttsSynthesis && ttsSynthesis.onvoiceschanged !== undefined) {
    ttsSynthesis.onvoiceschanged = loadVoices;
}

// Get Korean voice if available
function getKoreanVoice() {
    loadVoices();
    // Prefer Google Korean, or general ko-KR
    let koVoice = voices.find(v => v.lang === 'ko-KR' || v.lang === 'ko_KR');
    if (!koVoice) {
        koVoice = voices.find(v => v.lang.includes('ko'));
    }
    return koVoice;
}

// 5. App State Variables
let currentStepIndex = -1;
let isAdPlaying = false;
let autoProgressTimeout = null;
let scriptTimerInterval = null;
let isMuted = false;
let lipSyncInterval = null;

// Active Mode: 'timeline' (Ad presentation) or 'free' (User testing)
let activeMode = 'timeline';

// Selected AI Boss Index (0: Park, 1: Lee, 2: Choi)
let selectedBossIdx = 0;

// AI Roleplay State
let roleplayStep = 0;
let roleplayScore = 0;

// FCM timer
let goldCountdownTimer = null;

// Initialize layout timeline nodes
function buildTimeline() {
    timelineList.innerHTML = '';
    scriptData.forEach((data, index) => {
        const node = document.createElement('div');
        node.className = `timeline-node`;
        node.dataset.index = index;
        node.id = `timeline-node-${index}`;
        
        node.innerHTML = `
            <div class="node-bullet">${index + 1}</div>
            <div class="node-content">
                <div class="node-title">${data.title}</div>
                <div class="node-desc">${data.desc}</div>
            </div>
        `;
        
        node.addEventListener('click', () => {
            playClickSound();
            jumpToStep(index);
        });
        timelineList.appendChild(node);
    });
}
buildTimeline();


// 6. Navigation Control for Phone Screen Mockup
const navItems = document.querySelectorAll(".nav-item");
navItems.forEach(item => {
    item.addEventListener("click", () => {
        playClickSound();
        const targetView = item.dataset.view;
        switchPhoneView(targetView);
    });
});

function switchPhoneView(viewId) {
    // Update active nav button
    navItems.forEach(nav => {
        if (nav.dataset.view === viewId) {
            nav.classList.add("active");
        } else {
            nav.classList.remove("active");
        }
    });

    // Update active screen view
    const views = document.querySelectorAll(".app-view");
    views.forEach(view => {
        if (view.id === `view-${viewId}`) {
            view.classList.add("active");
        } else {
            view.classList.remove("active");
        }
    });

    // Close any overlays on view change
    if (viewId !== 'roleplay') {
        scorecardOverlay.style.display = 'none';
        roleplayChatContainer.style.display = 'none';
        roleplaySetup.style.display = 'flex';
    }
    
    // Stop ringing if we navigate away from active tracking
    if (viewId !== 'tracking') {
        stopRingingSound();
        stopGoldCountdown();
    }
}

// 7. Subtitle Typing Effect
let typingTimer = null;
function showSubtitleTyping(text) {
    clearTimeout(typingTimer);
    subtitleText.textContent = '';
    let i = 0;
    
    // Speed: 35ms per character
    function type() {
        if (i < text.length) {
            subtitleText.textContent += text.charAt(i);
            i++;
            typingTimer = setTimeout(type, 30);
        }
    }
    type();
}

// 8. Lip Sync Animation
function startLipSync() {
    stopLipSync();
    avatarBox.classList.add("speaking");
    statusDot.className = "status-dot speaking";
    
    // Animate mouth shape randomly to simulate speaking
    const mouthShapes = [
        "M44,48 Q50,55 56,48 Q50,49 44,48", // open wide
        "M45,48 Q50,51 55,48 Q50,49 45,48", // closed/narrow
        "M44,48 Q50,58 56,48 Q50,50 44,48", // deep open
        "M45,48 Q50,53 55,48 Q50,50 45,48", // small open
        "M44,48 Q50,49 56,48 Q50,50 44,48"  // neutral closed
    ];
    
    let shapeIdx = 0;
    lipSyncInterval = setInterval(() => {
        shapeIdx = (shapeIdx + 1) % mouthShapes.length;
        mouth.setAttribute("d", mouthShapes[shapeIdx]);
    }, 110);
}

function stopLipSync() {
    if (lipSyncInterval) {
        clearInterval(lipSyncInterval);
        lipSyncInterval = null;
    }
    avatarBox.classList.remove("speaking");
    statusDot.className = "status-dot pulsed";
    mouth.setAttribute("d", "M44,48 Q50,49 56,48 Q50,50 44,48"); // return to neutral
}

// Eye Blinking Animation (Random trigger)
function startBlinking() {
    setInterval(() => {
        // Trigger 200ms blink
        leftBlink.style.display = 'block';
        rightBlink.style.display = 'block';
        setTimeout(() => {
            leftBlink.style.display = 'none';
            rightBlink.style.display = 'none';
        }, 180);
    }, 4000);
}
startBlinking();


// 9. Ad Execution Logic
function jumpToStep(stepIdx) {
    // Clear timeouts
    clearTimeout(autoProgressTimeout);
    if (ttsSynthesis) ttsSynthesis.cancel();
    stopLipSync();

    currentStepIndex = stepIdx;
    const step = scriptData[stepIdx];
    
    // Highlight timeline node
    scriptData.forEach((_, idx) => {
        const node = document.getElementById(`timeline-node-${idx}`);
        if (idx === stepIdx) {
            node.className = "timeline-node active";
        } else if (idx < stepIdx) {
            node.className = "timeline-node visited";
        } else {
            node.className = "timeline-node";
        }
    });

    // Update Subtitles
    showSubtitleTyping(step.subtitle);

    // Switch phone screens
    switchPhoneView(step.view);

    // Update Left side status
    statusText.textContent = `진행 중: ${step.title}`;

    // Execute view actions
    executeStepAction(step.id);

    // TTS & Auto-advance
    if (isAdPlaying) {
        const useTts = toggleTts.checked;
        if (useTts && ttsSynthesis) {
            startLipSync();
            const utterance = new SpeechSynthesisUtterance(step.subtitle);
            currentUtterance = utterance;
            
            const koVoice = getKoreanVoice();
            if (koVoice) {
                utterance.voice = koVoice;
            }
            utterance.rate = 1.05; // Slightly fast pace for professional promo
            utterance.volume = parseFloat(volumeSlider.value);
            
            utterance.onend = () => {
                stopLipSync();
                advanceTimeline();
            };
            utterance.onerror = (e) => {
                console.error("TTS failed, using fallback timer", e);
                stopLipSync();
                autoProgressTimeout = setTimeout(advanceTimeline, step.duration);
            };
            
            ttsSynthesis.speak(utterance);
        } else {
            // TTS off fallback timer
            autoProgressTimeout = setTimeout(advanceTimeline, step.duration);
        }
    }
}

function advanceTimeline() {
    if (currentStepIndex < scriptData.length - 1) {
        jumpToStep(currentStepIndex + 1);
    } else {
        // Timeline completed!
        stopAdPlayback();
        statusText.textContent = "광고 완료 (대기 상태)";
        subtitleText.textContent = "감자맵스 시연 광고 상영이 성공적으로 완료되었습니다. 각 탭을 직접 눌러 다른 핵심 기능들을 자유롭게 체험해 보세요!";
        playSuccessSound();
    }
}

function startAdPlayback() {
    isAdPlaying = true;
    btnPlayAd.innerHTML = '<span class="icon">⏸</span> <span class="text">일시 정지</span>';
    btnPlayAd.classList.add("playing");
    btnResetAd.disabled = false;
    
    if (currentStepIndex === -1 || currentStepIndex === scriptData.length - 1) {
        jumpToStep(0);
    } else {
        jumpToStep(currentStepIndex);
    }
}

function pauseAdPlayback() {
    isAdPlaying = false;
    btnPlayAd.innerHTML = '<span class="icon">▶</span> <span class="text">광고 재생하기</span>';
    btnPlayAd.classList.remove("playing");
    
    clearTimeout(autoProgressTimeout);
    if (ttsSynthesis) ttsSynthesis.cancel();
    stopLipSync();
    statusText.textContent = `광고 정지 (일시 정지)`;
}

function stopAdPlayback() {
    isAdPlaying = false;
    btnPlayAd.innerHTML = '<span class="icon">▶</span> <span class="text">광고 다시 재생</span>';
    btnPlayAd.classList.remove("playing");
    
    clearTimeout(autoProgressTimeout);
    if (ttsSynthesis) ttsSynthesis.cancel();
    stopLipSync();
    stopRingingSound();
    stopGoldCountdown();
}

// 10. Specific Step Mock Animations and Actions

function executeStepAction(stepId) {
    switch (stepId) {
        case "intro":
            // Chart resets and draws
            const chartPath = document.querySelector(".chart-path");
            if (chartPath) {
                chartPath.style.animation = 'none';
                chartPath.offsetHeight; // trigger reflow
                chartPath.style.animation = 'draw-line 2s forwards ease-in-out';
            }
            
            // Loss amount ticks up
            animateLossAmount(1250000, 4200000, 3000);
            break;
            
        case "timing":
            // Auto map scan animation
            triggerMapScan();
            break;
            
        case "tracking":
            // Proposal & FCM logic
            triggerTrackingDemo();
            break;
            
        case "roleplay":
            // Chat demo
            triggerRoleplayDemo();
            break;
            
        case "outro":
            // Outro install screen pulse
            btnPsInstall.classList.add("pulsed-g");
            break;
    }
}

// Ticking number animation for Loss Amount
function animateLossAmount(start, end, duration) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing out
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(start + (end - start) * easeProgress);
        
        dashLossAmount.textContent = `-₩${currentVal.toLocaleString()}`;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}


// MAP SCANNING LOGIC (Timing Step)
function triggerMapScan() {
    // Read search term
    const query = mapSearchInput ? (mapSearchInput.value.trim() || "강남 식당") : "강남 식당";
    
    // Reset map
    mapPins.innerHTML = '';
    radarSweep.classList.remove("active");
    scannerStatusCard.style.backgroundColor = "rgba(15, 21, 36, 0.95)";
    scannerStatusText.textContent = "인근 상권 인허가 정부 DB 조회 중...";
    
    playRadarSweepSound();
    radarSweep.classList.add("active");
    
    setTimeout(() => {
        radarSweep.classList.remove("active");
        scannerStatusText.innerHTML = `🎉 <strong>골든 타겟 발견!</strong> '${query}' 주변 300m 이내 신규 매장(🔥) 1곳, 골목 틈새(💎) 1곳, 브레이크 여유(🟢) 1곳이 감지되었습니다.`;
        
        // Add dynamic pins with custom delays
        const pins = [
            { class: 'new-open', icon: '🔥', x: 28, y: 32, title: `${query} 직영점`, detail: '개업 12일차 신규 매장', extra: '영업 성사율 92%' },
            { class: 'niche-alley', icon: '💎', x: 72, y: 25, title: `${query} 골목점`, detail: '골목 상권 노출도 최하위', extra: '인터넷 검색 점유율 4%' },
            { class: 'break-time', icon: '🟢', x: 52, y: 72, title: `${query} 본점`, detail: '브레이크: 15:00~17:00', extra: '여유 시간대 (연락 최적기)', badge: '브레이크' }
        ];

        pins.forEach((p, idx) => {
            setTimeout(() => {
                const pinEl = document.createElement('div');
                pinEl.className = `map-pin ${p.class}`;
                pinEl.style.left = `${p.x}%`;
                pinEl.style.top = `${p.y}%`;
                
                const tooltipBtn = activeMode === 'free' 
                    ? `<button class="btn-save-diary-pin" onclick="window.saveMapPinToDiary('${p.title}', '${p.class}', '${p.detail}')">📝 일지 저장</button>` 
                    : '';
                
                pinEl.innerHTML = `
                    <div class="pin-icon">${p.icon}</div>
                    <div class="pin-tooltip">
                        <strong>${p.title}</strong>
                        <span>${p.detail}</span>
                        <span>${p.extra}</span>
                        ${p.badge ? `<span class="badge-time">${p.badge}</span>` : ''}
                        ${tooltipBtn}
                    </div>
                `;
                
                mapPins.appendChild(pinEl);
                // trigger scale-in
                setTimeout(() => pinEl.classList.add("active"), 50);
                
                // Play notification tick sound
                playClickSound();
            }, idx * 400 + 300);
        });
    }, 1500);
}


// TRACKING DEMO LOGIC (Tracking Step)
let sliderAutoInterval = null;

function triggerTrackingDemo() {
    // Switch to Owner view initially
    tabOwner.click();
    proposalSlider.value = 40;
    updateOwnerSlider(40);
    goldTimeCard.style.display = 'none';
    crmFeed.innerHTML = '<div class="crm-item empty"><p>사장님 화면 탭에서 제안서 슬라이더를 조작하거나 문의하기 버튼을 누르면 실시간 알림이 발송됩니다.</p></div>';

    // Simulated Auto slider drag by the owner (during ad autoplay)
    if (isAdPlaying) {
        let currentVal = 40;
        let dir = 1;
        let sliderCount = 0;
        
        clearInterval(sliderAutoInterval);
        sliderAutoInterval = setInterval(() => {
            currentVal += 10 * dir;
            if (currentVal >= 80) dir = -1;
            if (currentVal <= 30) dir = 1;
            
            proposalSlider.value = currentVal;
            updateOwnerSlider(currentVal);
            
            sliderCount++;
            
            // Trigger FCM after a couple of movements
            if (sliderCount === 3) {
                clearInterval(sliderAutoInterval);
                // Switch view to salesman automatically
                setTimeout(() => {
                    tabSalesman.click();
                    triggerFcmAlert("매출 계산기 감지", "부대찌개 사장님이 예상 매출 슬라이더를 70%까지 올리며 시뮬레이션 중!");
                }, 800);
            }
        }, 800);
    }
}

function updateOwnerSlider(val) {
    calcPercent.textContent = `${val}%`;
    const sales = val * 65000;
    calcSales.textContent = `₩${sales.toLocaleString()}`;
}

proposalSlider.addEventListener("input", (e) => {
    const val = parseInt(e.target.value);
    updateOwnerSlider(val);
});

proposalSlider.addEventListener("change", (e) => {
    const val = parseInt(e.target.value);
    // User manually dragged slider -> send FCM immediately
    triggerFcmAlert("매출 계산기 감지", `부대찌개 사장님이 예상 매출 슬라이더를 ${val}%까지 올리며 직접 시뮬레이션 중!`);
});

// Trigger FCM Push alerts
function triggerFcmAlert(title, message) {
    playChimeSound();
    
    // Slide in push banner
    fcmTitle.textContent = `🥔 감자맵스: ${title}`;
    fcmMessage.textContent = message;
    fcmPushBanner.classList.add("active");
    
    setTimeout(() => {
        fcmPushBanner.classList.remove("active");
    }, 4500);
    
    // Add to CRM list
    const emptyCrm = crmFeed.querySelector(".empty");
    if (emptyCrm) {
        crmFeed.innerHTML = '';
    }
    
    const timeStr = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const crmItem = document.createElement('div');
    crmItem.className = 'crm-item';
    crmItem.innerHTML = `
        <div class="crm-item-header">
            <strong>🔥 실시간 행동 감지</strong>
            <span>${timeStr}</span>
        </div>
        <div class="crm-item-body">
            강남 부대찌개 사장님: ${message}
        </div>
    `;
    crmFeed.insertBefore(crmItem, crmFeed.firstChild);
    
    // Show golden call button and start timer
    goldTimeCard.style.display = 'flex';
    startGoldCountdown();
}

// Gold Countdown timer
let countdownSecs = 60;
function startGoldCountdown() {
    stopGoldCountdown();
    countdownSecs = 60;
    goldCountdown.textContent = "01:00";
    goldCountdown.style.color = "var(--accent)";
    
    goldCountdownTimer = setInterval(() => {
        countdownSecs--;
        const mins = Math.floor(countdownSecs / 60);
        const secs = countdownSecs % 60;
        const formattedSecs = secs < 10 ? `0${secs}` : secs;
        goldCountdown.textContent = `0${mins}:${formattedSecs}`;
        
        if (countdownSecs <= 15) {
            goldCountdown.style.color = "var(--warning)";
        }
        
        if (countdownSecs <= 0) {
            stopGoldCountdown();
            goldCountdown.textContent = "만료됨";
        }
    }, 1000);
}

function stopGoldCountdown() {
    if (goldCountdownTimer) {
        clearInterval(goldCountdownTimer);
        goldCountdownTimer = null;
    }
}


// AI ROLEPLAY DEMO LOGIC (AI Roleplay Step)
// AI Roleplay Boss Configuration & Dialogue Trees (3 distinct bosses)
const bossConfig = [
    {
        avatar: "👨‍🍳",
        name: "박길동 사장님 (돈가스 전문점)",
        desc: "성격: 깐깐함, 광고 불신 심함",
        difficulty: "★★★★☆",
        dialogues: [
            {
                round: 1,
                boss: "우리는 마케팅 필요 없어요. 인터넷 광고 안 해도 손님들 알아서 척척 오니까 그냥 가세요.",
                options: [
                    {
                        text: "요즘은 소문만으론 한계가 있습니다. 저희 마케팅을 무조건 쓰셔야 매출이 오릅니다.",
                        score: 50,
                        feedback: "단순히 필요성만 주장하는 설득 방식은 사장님의 경계심을 해소하지 못해 거절될 확률이 높습니다."
                    },
                    {
                        text: "(핵심 화법) 사장님, 현재 매장은 훌륭하지만 주변 1등 경쟁점이 공격적 광고를 집행해 사장님이 매월 뺏기고 있는 손실액만 420만 원입니다.",
                        score: 95,
                        feedback: "경쟁 매장의 마케팅 현황과 '예상 손실액(Loss Framing)' 수치를 명확하게 제시하여 경각심을 고취시킨 훌륭한 접근입니다."
                    },
                    {
                        text: "아... 그러시군요. 소문난 맛집이시니 부럽네요. 나중에 혹시 생각 있으시면 연락 주세요.",
                        score: 30,
                        feedback: "반박하지 않고 물러나는 화법은 클로징 실패율 100%에 이르는 약한 영업 방식입니다."
                    }
                ]
            },
            {
                round: 2,
                boss: "매월 420만 원이 손해라고요? 에이, 사기 치는 거 아니오? 어떻게 그런 수치가 계산되는 건데?",
                options: [
                    {
                        text: "(치트키) 인근 1km 이내 상권의 카드사 업종별 매출 인허가 데이터와 플레이스 조회량 검색 통계를 매칭해 산출한 정밀 과학 수치입니다.",
                        score: 98,
                        feedback: "신뢰도 높은 데이터 소스(인허가, 검색량)를 차례로 근거로 대며 사장님의 의구심을 단숨에 불식시킨 정밀 세일즈입니다."
                    },
                    {
                        text: "저희 감자맵스 알고리즘이 특허를 받은 최첨단 AI 시스템이라 그렇습니다. 직접 써보시면 믿게 되실 겁니다.",
                        score: 65,
                        feedback: "시스템을 단순히 믿으라고 하는 것보다는 명확한 공공 정보 데이터의 구체적 산출 출처를 들어 설명하는 편이 신뢰를 줍니다."
                    }
                ]
            },
            {
                round: 3,
                boss: "데이터까지 보여주니 솔깃하긴 하구려... 그럼 이 감자맵스 마케팅이라는 거, 등록 비용이 얼마나 드나요?",
                options: [
                    {
                        text: "(마무리) 매달 뺏기는 420만 원 손실을 되찾는데 투자하는 비용은 월 50만 원에 불과합니다. 회수가 확실한 매력적 딜입니다.",
                        score: 96,
                        feedback: "비용(Cost)을 손실 회수용 '투자(ROI)' 프레임으로 영리하게 바꾸어 부담감을 줄이고 계약 체결을 도출해낸 최고 수준의 기법입니다."
                    },
                    {
                        text: "월 50만 원입니다. 싼 편은 아니지만 확실하게 대행 서비스를 지원해 드려서 효과를 볼 수 있게 돕겠습니다.",
                        score: 70,
                        feedback: "가격을 있는 그대로 비싸다고 수용하는 화법보다는 혜택 및 투자 대비 효율 비율로 재프레이밍해 전달하는 것이 효과적입니다."
                    }
                ]
            }
        ],
        cheatSheet: [
            "<strong>1단계 [거절 대응]</strong>: 단순 혜택 주장 대신 <strong>'기회 손실 프레임(Loss Framing)'</strong>을 사용해 420만 원 손실을 각인시킴.",
            "<strong>2단계 [신뢰 구축]</strong>: <strong>'카드사 인허가 + 플레이스 검색 통계'</strong> 등 구체적인 정부 공공 정보 데이터 출처를 인용하여 사기 의심 차단.",
            "<strong>3단계 [비용 클로징]</strong>: 마케팅비를 <strong>'매월 뺏기는 420만 원 손실을 막기 위한 월 50만 원의 투자(ROI)'</strong>로 영리하게 재정의함."
        ]
    },
    {
        avatar: "👩‍🍳",
        name: "이영희 사장님 (카페)",
        desc: "성격: 바쁨, 나중에 오라고 회피",
        difficulty: "★★★☆☆",
        dialogues: [
            {
                round: 1,
                boss: "지금 원두 볶고 디저트 굽느라 엄청 바빠요. 나중에 다시 오세요.",
                options: [
                    {
                        text: "바쁘신데 귀찮게 해서 죄송합니다. 그럼 다음에 오겠습니다.",
                        score: 40,
                        feedback: "단순히 물러나면 재방문 시에도 잡상인으로 취급받으며 거절 패턴이 반복될 가능성이 큽니다."
                    },
                    {
                        text: "(핵심 화법) 귀한 시간 뺏어 죄송합니다 사장님. 감자맵스로 스캔해보니 카페 브레이크/한가한 시간대인 오후 3시 반에 요약 보고서만 딱 5분 브리핑해 드려도 괜찮을까요?",
                        score: 96,
                        feedback: "사장님이 가장 한가한 오후 3시 반(브레이크 타임)을 미리 타겟팅하여 구체적이고 부담 없는 시간 합의를 유도한 최고 화법입니다."
                    },
                    {
                        text: "마케팅이 매장의 미래를 결정하는데, 장사 준비보다 더 중요하지 않으시겠습니까?",
                        score: 55,
                        feedback: "사장님의 우선순위를 무시하고 훈계하는 조의 화법은 감정적 반발을 불러와 훈련 탈락의 원인이 됩니다."
                    }
                ]
            },
            {
                round: 2,
                boss: "오후 3시 반요? 그때가 조금 덜 붐비긴 하지만... 굳이 왜 나한테 보고서까지 주는 건데요?",
                options: [
                    {
                        text: "(치트키) 인근 골목 카페들 평균 매출 대비 사장님 매장의 스마트플레이스 검색 점유율이 8% 이하로 밀려서 발생하는 월 280만 원 기회 손실을 막기 위함입니다.",
                        score: 98,
                        feedback: "타 매장 대비 스마트플레이스 노출 결핍 수치와 이로 인한 매출 누수를 논리적 데이터로 명확히 소구하였습니다."
                    },
                    {
                        text: "사장님 매장이 잘되셨으면 좋겠다는 진심어린 마음에 무료로 재능 기부해 드리는 보고서입니다.",
                        score: 60,
                        feedback: "이유 없는 무료 호의는 오히려 잡상인 대행사의 얕은 상술로 보여 경계심을 키울 수 있습니다."
                    }
                ]
            },
            {
                round: 3,
                boss: "280만 원이 마케팅 안 해서 날아간다고요? 음, 3시 반에 오면 그 얘기 자세히 들어볼 수 있나요?",
                options: [
                    {
                        text: "(마무리) 네 사장님. 3시 반에 맞춰서 데이터와 기회 손실 방어 전략서 들고 찾아뵙겠습니다. 바쁘신데 답변 감사드립니다!",
                        score: 95,
                        feedback: "정해진 시간(3시 반) 약속을 견고히 확정하고 깔끔하고 정중하게 퇴장하여 재방문 신뢰를 성공적으로 다졌습니다."
                    },
                    {
                        text: "그럼요! 그 시간대에 방문해서 저희 회사 마케팅 상품 포트폴리오를 쭉 읊어드리겠습니다.",
                        score: 65,
                        feedback: "재방문 목적을 '포트폴리오 나열'로 잡기보단 '사장님의 매출 누수 진단 보고서 제공'으로 끝까지 가치 위주 세일즈를 펴야 합니다."
                    }
                ]
            }
        ],
        cheatSheet: [
            "<strong>1단계 [시간 확보]</strong>: 바쁜 사장님의 경계심을 풀기 위해 <strong>오후 3시 반 브레이크 타임</strong>을 공략해 5분만 약속 잡기 성공.",
            "<strong>2단계 [필요성 입증]</strong>: 인근 점포 검색률 대비 <strong>'플레이스 점유율 8% 미만'</strong>과 280만 원 손실이라는 팩트 폭격.",
            "<strong>3단계 [미팅 확정]</strong>: 상품 홍보가 아닌 <strong>'손실 방어 전략서 전달'</strong>로 목적성을 고수하여 퇴장 시 재방문 약속 확보."
        ]
    },
    {
        avatar: "👨‍🍳",
        name: "최성진 사장님 (횟집)",
        desc: "성격: 대행사 사기 불신 심함",
        difficulty: "★★★★★",
        dialogues: [
            {
                round: 1,
                boss: "인터넷 대행사 놈들 다 사기꾼 아니야? 저번에도 블로그 상위 노출해준대서 돈 냈더니 전화도 안 오고 돈만 날렸어!",
                options: [
                    {
                        text: "블로그는 옛날 방식이고, 저희는 인스타 숏폼이나 플레이스 전문이라 다릅니다.",
                        score: 50,
                        feedback: "채널의 차이만 설명하는 것으로는 사장님이 겪은 대행업체 전반에 대한 근본적인 불신을 깰 수 없습니다."
                    },
                    {
                        text: "(핵심 화법) 사장님 말씀이 맞습니다. 효과도 없는 상위노출 약정만 팔고 나몰라라 하는 유령 업체들이 많습니다. 저희는 실시간 카드사 데이터 기반으로 고객이 직접 클릭해 유입된 실시간 통계 수치만 연동합니다.",
                        score: 95,
                        feedback: "경쟁사의 사기 행태를 솔직히 인정(동조 프레이밍)하며 감정적 공감대를 사고, 단순 노출이 아닌 실시간 카드사 유입 통계 연동을 제안했습니다."
                    },
                    {
                        text: "아, 저희 회사는 다른 양아치 업체들과는 차원이 다른 공식 마케팅 파트너사입니다.",
                        score: 60,
                        feedback: "스스로 양아치가 아니라고 해명하는 것은 고객 입장에서 변명이나 공수표 약속으로 느껴져 신뢰감을 주기 어렵습니다."
                    }
                ]
            },
            {
                round: 2,
                boss: "말은 번드르르 하네. 수치 연동이니 뭐니 해도, 결국 돈만 받아 챙기고 나 몰라라 할지 어떻게 믿어?",
                options: [
                    {
                        text: "(치트키) 감자맵스는 계약 즉시 사장님 화면의 실시간 슬라이더 계산기를 연동합니다. 매주 플레이스 조회수, 클릭 전환율, 실시간 FCM 고객 상담 유입 로그를 휴대폰으로 띄워 증명합니다.",
                        score: 98,
                        feedback: "모바일 실시간 FCM 연동 기술로 고객의 행동 로그를 사장님이 직접 스마트폰으로 보면서 실시간 검증 가능한 장치를 제시하여 신뢰를 얻었습니다."
                    },
                    {
                        text: "저희는 계약서에 환불 보장 문구와 매출 상승률 명시를 해드릴 테니 걱정하지 않으셔도 됩니다.",
                        score: 70,
                        feedback: "단순 환불 보장은 초기 진입 시 부담은 덜어주나, 근본적으로 '나 몰라라 할 것'이라는 일 처리 불신에 대한 솔루션이 되지 못합니다."
                    }
                ]
            },
            {
                round: 3,
                boss: "휴대폰으로 유입 로그가 뜬다고? 진짜 그렇게 매주 검증이 된다면 얘기가 다른데... 월 마케팅비는 얼마나 됩니까?",
                options: [
                    {
                        text: "(마무리) 사장님 매장 주변 횟집에 매월 뺏기고 계신 450만 원의 손실을 회수하는 전략이며, 마케팅 비용은 월 50만 원에 불과합니다. 빼앗긴 손실액을 돌려받는 확실한 투자입니다.",
                        score: 97,
                        feedback: "가격을 지출 비용이 아닌 450만 원 손실을 막기 위한 '회수 투자'로 설명하여 즉각적인 마케팅 승낙을 유도하였습니다."
                    },
                    {
                        text: "월 50만 원에 맞춰 진행해 드리겠습니다. 대행사 사기 안 당하고 효과 보시도록 밀착 케어해 드릴게요.",
                        score: 68,
                        feedback: "단순히 가격을 낮추거나 감정적으로 케어하겠다는 어조보단, 손실 방어를 통한 기회 비용 상쇄 이익(ROI)을 수치적으로 어필해야 계약 도장을 찍습니다."
                    }
                ]
            }
        ],
        cheatSheet: [
            "<strong>1단계 [신뢰 공감]</strong>: 대행사의 행태를 인정하여 <strong>고객과 영업사원의 대립 구도를 해제</strong>하고 카드사 실시간 데이터 기반 소구.",
            "<strong>2단계 [기술적 검증]</strong>: 사장님이 매주 플레이스 클릭 전환 및 <strong>실시간 FCM 유입 로그를 폰으로 직접 확인</strong>하는 검증 시스템 제시.",
            "<strong>3단계 [비용 재정의]</strong>: 월 50만 원 지출이 아닌 <strong>주변 매장에 매월 뺏기는 450만 원 손실을 즉각 방어하는 투자(ROI)</strong>임을 주입하여 클로징."
        ]
    }
];

// Local Storage Sales Diary CRUD Operations
const DIARY_KEY = 'gamjamaps_sales_diaries';

function getDiaries() {
    try {
        const stored = localStorage.getItem(DIARY_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        return [];
    }
}

function saveDiaries(diaries) {
    localStorage.setItem(DIARY_KEY, JSON.stringify(diaries));
    updateDiaryUI();
}

function addDiary(title, tagClass, notes) {
    const diaries = getDiaries();
    const newEntry = {
        id: 'diary_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        title: title,
        tagClass: tagClass, // 'new-open', 'niche-alley', 'break-time', 'call'
        notes: notes,
        date: new Date().toLocaleString('ko-KR', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
    };
    diaries.unshift(newEntry);
    saveDiaries(diaries);
    playSuccessSound();
}

function deleteDiary(id) {
    let diaries = getDiaries();
    diaries = diaries.filter(d => d.id !== id);
    saveDiaries(diaries);
    playClickSound();
}

function getTagLabel(tagClass) {
    switch(tagClass) {
        case 'new-open': return '🔥 신규';
        case 'niche-alley': return '💎 골목';
        case 'break-time': return '🟢 여유';
        case 'call': return '📞 상담';
        default: return '📝 일지';
    }
}

function updateDiaryUI() {
    const diaries = getDiaries();
    
    // Update count in left panel
    if (statDiaryCount) {
        statDiaryCount.textContent = `${diaries.length}건`;
    }
    
    // Update score in left panel
    const lastScore = localStorage.getItem('gamjamaps_last_score');
    if (statLastScore) {
        statLastScore.textContent = lastScore ? `${lastScore}점` : '- 점';
    }
    
    // Render list in salesman tab
    if (!diaryList) return;
    
    if (diaries.length === 0) {
        diaryList.innerHTML = `<div class="diary-item-empty">저장된 영업일지가 없습니다.</div>`;
    } else {
        diaryList.innerHTML = '';
        diaries.forEach(d => {
            const item = document.createElement('div');
            item.className = 'diary-item';
            item.innerHTML = `
                <div class="diary-item-info">
                    <div class="diary-item-title">
                        <span>${d.title}</span>
                        <span class="diary-item-tag ${d.tagClass}">${getTagLabel(d.tagClass)}</span>
                    </div>
                    <div class="diary-item-notes">${d.notes}</div>
                    <div style="font-size: 0.52rem; color: var(--text-muted); margin-top: 3px;">${d.date}</div>
                </div>
                <button class="btn-diary-delete" onclick="window.deleteDiaryLog('${d.id}')" title="삭제">🗑️</button>
            `;
            diaryList.appendChild(item);
        });
    }
}

// Global functions for inline HTML event handlers
window.saveMapPinToDiary = function(title, tagClass, detail) {
    addDiary(title, tagClass, detail + " - 상권분석 완료 및 영업 후보 등록");
    alert(`📝 영업 일지에 [${title}] 매장이 추가되었습니다!`);
};

window.deleteDiaryLog = function(id) {
    deleteDiary(id);
};


function triggerRoleplayDemo() {
    scorecardOverlay.style.display = 'none';
    roleplayChatContainer.style.display = 'none';
    roleplaySetup.style.display = 'flex';
    
    // Auto-start during ad timeline
    if (isAdPlaying) {
        setTimeout(() => {
            btnStartRoleplay.click();
        }, 1200);
    }
}

function startRoleplaySession() {
    playClickSound();
    roleplaySetup.style.display = 'none';
    roleplayChatContainer.style.display = 'flex';
    chatMessages.innerHTML = '';
    
    roleplayStep = 0;
    roleplayScore = 0;
    
    loadRoleplayRound(0);
}

function loadRoleplayRound(idx) {
    const currentBoss = bossConfig[selectedBossIdx];
    const dialogues = currentBoss.dialogues;
    
    if (idx >= dialogues.length) {
        // Unlocked evaluation scorecard
        showScorecard();
        return;
    }
    
    chatRound.textContent = `ROUND ${idx + 1}/${dialogues.length}`;
    const roundData = dialogues[idx];
    
    // Add Boss message with slight delay
    setTimeout(() => {
        addMessage('boss', currentBoss.avatar, roundData.boss);
        playClickSound();
        
        // Show options
        chatOptions.innerHTML = '';
        roundData.options.forEach((opt, optIdx) => {
            const btn = document.createElement('button');
            btn.className = 'btn-chat-option';
            btn.textContent = opt.text;
            btn.addEventListener('click', () => selectChatOption(idx, opt));
            chatOptions.appendChild(btn);
        });

        // Auto select choice in autoplay (Timeline mode)
        if (isAdPlaying) {
            setTimeout(() => {
                // Autoplay always picks the best option (highest score)
                let bestIdx = 0;
                let maxScore = -1;
                roundData.options.forEach((opt, optIdx) => {
                    if (opt.score > maxScore) {
                        maxScore = opt.score;
                        bestIdx = optIdx;
                    }
                });
                const bestOpt = roundData.options[bestIdx];
                selectChatOption(idx, bestOpt);
            }, 3500);
        }
    }, 500);
}

function selectChatOption(roundIdx, option) {
    playClickSound();
    
    // Disable inputs
    chatOptions.innerHTML = '';
    
    // Add user message
    addMessage('user', '💼', option.text);
    
    // Feedback bubble (educational guide)
    setTimeout(() => {
        const feedbackEl = document.createElement('div');
        feedbackEl.className = 'chat-msg boss feedback-note';
        feedbackEl.style.alignSelf = 'center';
        feedbackEl.style.maxWidth = '95%';
        feedbackEl.innerHTML = `
            <div class="msg-bubble" style="background: rgba(245, 158, 11, 0.05); border-color: rgba(245, 158, 11, 0.2); color: var(--primary-light); font-size: 0.6rem; text-align: left;">
                💡 <strong>피드백:</strong> ${option.feedback}
            </div>
        `;
        chatMessages.appendChild(feedbackEl);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Add score
        roleplayScore += option.score;
        
        // Load next round
        roleplayStep++;
        setTimeout(() => {
            loadRoleplayRound(roleplayStep);
        }, 2200);
    }, 1000);
}

function addMessage(sender, avatar, text) {
    const msg = document.createElement('div');
    msg.className = `chat-msg ${sender}`;
    msg.innerHTML = `
        <div class="msg-avatar">${avatar}</div>
        <div class="msg-bubble">${text}</div>
    `;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showScorecard() {
    playSuccessSound();
    
    const currentBoss = bossConfig[selectedBossIdx];
    const finalScore = Math.round(roleplayScore / currentBoss.dialogues.length);
    scoreNum.textContent = finalScore;
    
    // Save score to local storage
    localStorage.setItem('gamjamaps_last_score', finalScore);
    
    // Custom scorecard details based on final score (fixing constant assignment bug)
    if (finalScore >= 90) {
        scoreEvalTitle.textContent = "🏆 계약 성사! 특급 치트키 세일즈맨";
        scoreEvalDesc.textContent = "사장님의 모든 거절 심리를 수치적 근거와 손실 재프레이밍으로 정확히 받아쳐 계약을 성사시켰습니다. 완벽합니다!";
        scorecardLockIcon.textContent = "🔓 (오답노트 해제됨)";
    } else {
        scoreEvalTitle.textContent = "🔔 보완 필요: 거절 극복 추가 학습 권장";
        scoreEvalDesc.textContent = "단순히 감정적인 설득이나 후퇴 전략은 고객의 거절 반응을 극복하기 어렵습니다. 수치 데이터를 결합한 치트키 화법을 오답노트로 복기해 보세요.";
        scorecardLockIcon.textContent = "🔓 (일부 해제)";
    }
    
    // Render cheat sheet list based on current boss
    const cheatListEl = document.getElementById("cheatList");
    cheatListEl.innerHTML = '';
    currentBoss.cheatSheet.forEach(itemText => {
        const li = document.createElement("li");
        li.innerHTML = itemText;
        cheatListEl.appendChild(li);
    });
    
    scorecardOverlay.style.display = 'flex';
    
    // Update main panel stats
    updateDiaryUI();
}


// PLAYSTORE INSTALL CONTROLS
btnPsInstall.addEventListener("click", () => {
    playClickSound();
    if (btnPsInstall.textContent === "설치") {
        btnPsInstall.textContent = "설치 중...";
        btnPsInstall.disabled = true;
        btnPsInstall.classList.remove("pulsed-g");
        
        // Simulating Google Play downloading progress bar
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 10;
            btnPsInstall.textContent = `설치 중... ${progress}%`;
            if (progress >= 100) {
                clearInterval(progressInterval);
                btnPsInstall.textContent = "실행";
                btnPsInstall.disabled = false;
                btnPsInstall.classList.add("downloaded");
                playSuccessSound();
            }
        }, 250);
    } else if (btnPsInstall.textContent === "실행") {
        // Open the app, which jumps back to Dashboard with a success alert
        switchPhoneView("dashboard");
        alert("🥔 [감자맵스 실행 완료] VIP 등급 라이선스 활성화! 매일 제공되는 황금 타겟을 스캔해 보세요.");
    }
});


// 11. Event Listeners for controls
btnWelcomeStart.addEventListener("click", () => {
    playClickSound();
    welcomeOverlay.classList.add("hidden");
    initAudio();
});

btnPlayAd.addEventListener("click", () => {
    playClickSound();
    if (isAdPlaying) {
        pauseAdPlayback();
    } else {
        startAdPlayback();
    }
});

btnResetAd.addEventListener("click", () => {
    playClickSound();
    stopAdPlayback();
    jumpToStep(0);
    startAdPlayback();
});

// Mode switching helper
function switchMode(mode) {
    activeMode = mode;
    playClickSound();
    
    if (mode === 'timeline') {
        modeTimeline.classList.add("active");
        modeFree.classList.remove("active");
        panelTimelineContent.classList.remove("hidden");
        panelFreeContent.classList.add("hidden");
        
        statusText.textContent = "대본 로딩 완료 (정지 상태)";
        subtitleText.textContent = "광고 시작하기 버튼을 누르면 새로운 세일즈 파트너 '감자맵스'의 비디오 프레젠테이션 시뮬레이터가 시작됩니다.";
        
        // Reset and jump to step 0
        jumpToStep(0);
    } else {
        modeFree.classList.add("active");
        modeTimeline.classList.remove("active");
        panelFreeContent.classList.remove("hidden");
        panelTimelineContent.classList.add("hidden");
        
        pauseAdPlayback();
        if (ttsSynthesis) {
            ttsSynthesis.cancel();
        }
        stopLipSync();
        
        statusText.textContent = "자유 데모 모드 활성화됨";
        subtitleText.textContent = "자유 데모 모드입니다. 우측 스마트폰 화면을 직접 클릭하고 상권을 검색하며 자유롭게 체험해 보세요.";
        
        // Reset dashboard screen view
        switchPhoneView("dashboard");
    }
}

// Sync Owner Call trigger to salesman side
btnProposalCallOwner.addEventListener("click", () => {
    playClickSound();
    alert("📞 사장님이 '마케팅 상담원 문의하기' 버튼을 눌렀습니다. 영업사원의 스마트폰 알림창을 확인하세요!");
    tabSalesman.click();
    triggerFcmAlert("상담 요청 완료", "강남 부대찌개 사장님이 즉시 전화 연결 상담을 요청했습니다!");
});

btnGoldCallAction.addEventListener("click", () => {
    playClickSound();
    stopRingingSound();
    stopGoldCountdown();
    startRingingSound();
    
    btnGoldCallAction.textContent = "📞 사장님 통화 연결 중...";
    btnGoldCallAction.style.background = "var(--primary-gradient)";
    
    setTimeout(() => {
        stopRingingSound();
        btnGoldCallAction.textContent = "✅ 전화 상담 완료 - 긍정적 계약 피드백";
        btnGoldCallAction.style.background = "var(--success-gradient)";
        btnGoldCallAction.disabled = true;
        playSuccessSound();
        
        // CRUD: Log call to local storage
        addDiary("강남 부대찌개 전화 상담", "call", "예상 손실액 기반 설명 완료 및 내일 방문 미팅 잡음 (VIP 유치 유력)");
        
        // Simulate logging it into sales diary
        setTimeout(() => {
            alert("📝 [감자맵스 영업 일지 기록 완료]\n- 강남 부대찌개 사장님과의 통화: 예상 손실액 기반 설명 완료, 내일 방문 미팅 잡음.");
        }, 1200);
    }, 4500);
});

// Interactive map trigger
btnTriggerMapScan.addEventListener("click", () => {
    playClickSound();
    triggerMapScan();
});

btnStartDashboardScan.addEventListener("click", () => {
    playClickSound();
    switchPhoneView("timing");
    triggerMapScan();
});

btnStartRoleplay.addEventListener("click", () => {
    startRoleplaySession();
});

btnRestartRoleplay.addEventListener("click", () => {
    playClickSound();
    triggerRoleplayDemo();
});

// Mode tab clicks
modeTimeline.addEventListener("click", () => switchMode('timeline'));
modeFree.addEventListener("click", () => switchMode('free'));

// Boss dropdown change listener
bossSelect.addEventListener("change", (e) => {
    const idx = parseInt(e.target.value);
    selectedBossIdx = idx;
    
    // Update display in setup card
    bossAvatarDisp.textContent = bossConfig[idx].avatar;
    bossNameDisp.textContent = bossConfig[idx].name;
    bossDescDisp.textContent = bossConfig[idx].desc;
    
    // Update display in chat header
    chatBossAvatar.textContent = bossConfig[idx].avatar;
    chatBossName.textContent = bossConfig[idx].name + " (AI)";
});

// Clear DB button click listener
btnClearDb.addEventListener("click", () => {
    if (confirm("정말 모든 영업일지 데이터를 초기화하시겠습니까?")) {
        localStorage.removeItem(DIARY_KEY);
        localStorage.removeItem('gamjamaps_last_score'); // reset score too
        updateDiaryUI();
        playClickSound();
    }
});

// Navigation nodes dynamic update
timelineList.addEventListener("click", (e) => {
    const node = e.target.closest('.timeline-node');
    if (node) {
        const idx = parseInt(node.dataset.index);
        jumpToStep(idx);
    }
});

// Handle tab switching in tracking pane
tabOwner.addEventListener("click", () => {
    playClickSound();
    tabOwner.classList.add("active");
    tabSalesman.classList.remove("active");
    paneOwner.classList.add("active");
    paneSalesman.classList.remove("active");
});

tabSalesman.addEventListener("click", () => {
    playClickSound();
    tabSalesman.classList.add("active");
    tabOwner.classList.remove("active");
    paneSalesman.classList.add("active");
    paneOwner.classList.remove("active");
});

// 12. Clock time simulation inside phone
function updateClock() {
    const now = new Date();
    const hrs = now.getHours().toString().padStart(2, '0');
    const mins = now.getMinutes().toString().padStart(2, '0');
    phoneTime.textContent = `${hrs}:${mins}`;
}
setInterval(updateClock, 1000);
updateClock();

// Startup initialization: Update local database diaries list
updateDiaryUI();

// Set initial boss description display on start
if (bossSelect) {
    const idx = parseInt(bossSelect.value);
    selectedBossIdx = idx;
    bossAvatarDisp.textContent = bossConfig[idx].avatar;
    bossNameDisp.textContent = bossConfig[idx].name;
    bossDescDisp.textContent = bossConfig[idx].desc;
    chatBossAvatar.textContent = bossConfig[idx].avatar;
    chatBossName.textContent = bossConfig[idx].name + " (AI)";
}
