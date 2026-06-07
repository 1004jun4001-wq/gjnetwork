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
        duration: 9500
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
        subtitle: "셋째, 문을 열기 전 AI와 실전처럼 예습하십시오. 깐깐한 박사장님, 이사장님, 최사장님의 실제 목소리와 거절 멘트를 미리 대비하고, 마케팅 예산 거절 극복 특급 화법 치트키를 마스터해 계약 성사율을 높이십시오.",
        view: "roleplay",
        duration: 19000
    },
    {
        id: "outro",
        title: "아웃트로",
        desc: "감자맵스 설치 및 승격",
        subtitle: "마케팅 영업의 성공 공식을 지금 귀하의 스마트폰에 이식해 보십시오. 구글 플레이스토어에서 감자맵스 어플리케이션을 다운로드 및 실행하는 즉시 왕관의 VIP 등급이 활성화됩니다. 지금 바로 무료 설치를 시작해 보세요!",
        view: "download",
        duration: 12000
    }
];

// 2. DOM Elements Binding
// Panels & Tabs
const modeTimeline = document.getElementById("modeTimeline");
const modeFree = document.getElementById("modeFree");
const panelTimelineContent = document.getElementById("panelTimelineContent");
const panelFreeContent = document.getElementById("panelFreeContent");

// Avatar & Waves
const anchorSvg = document.getElementById("anchorSvg");
const mouth = document.getElementById("mouth");
const leftBlink = document.getElementById("left-blink");
const rightBlink = document.getElementById("right-blink");
const voiceWave = document.getElementById("voiceWave");
const anchorImg = document.getElementById("anchorImg");
const statusDot = document.getElementById("statusDot");
const statusText = document.getElementById("statusText");
const subtitleText = document.getElementById("subtitleText");
const timelineList = document.getElementById("timelineList");

// Controls
const btnPlayAd = document.getElementById("btnPlayAd");
const btnResetAd = document.getElementById("btnResetAd");
const toggleTts = document.getElementById("toggleTts");
const volumeSlider = document.getElementById("volumeSlider");

// Free mode statistics & DB
const statDiaryCount = document.getElementById("statDiaryCount");
const statLastScore = document.getElementById("statLastScore");
const btnClearDb = document.getElementById("btnClearDb");
const diaryList = document.getElementById("diaryList");

// Smartphone Views & Bezel
const phoneScreen = document.getElementById("phoneScreen");
const screenContainer = document.getElementById("screenContainer");
const phoneTime = document.getElementById("phoneTime");
const fcmPushBanner = document.getElementById("fcmPushBanner");
const fcmTitle = document.getElementById("fcmTitle");
const fcmMessage = document.getElementById("fcmMessage");
const vipBadge = document.querySelector(".vip-badge");

// Bottom Nav items
const navDash = document.getElementById("navDash");
const navTiming = document.getElementById("navTiming");
const navTracking = document.getElementById("navTracking");
const navRoleplay = document.getElementById("navRoleplay");
const navDownload = document.getElementById("navDownload");

// Screen 1: Dashboard
const btnStartDashboardScan = document.getElementById("btnStartDashboardScan");
const dashLossAmount = document.getElementById("dashLossAmount");

// Screen 2: Timing
const mapSearchInput = document.getElementById("mapSearchInput");
const btnTriggerMapScan = document.getElementById("btnTriggerMapScan");
const mapView = document.getElementById("mapView");
const mapPins = document.getElementById("mapPins");
const radarSweep = document.getElementById("radarSweep");
const scannerStatusText = document.getElementById("scannerStatusText");

// Screen 3: Tracking
const tabOwner = document.getElementById("tabOwner");
const tabSalesman = document.getElementById("tabSalesman");
const paneOwner = document.getElementById("paneOwner");
const paneSalesman = document.getElementById("paneSalesman");
const proposalSlider = document.getElementById("proposalSlider");
const calcPercent = document.getElementById("calcPercent");
const calcSales = document.getElementById("calcSales");
const btnProposalCallOwner = document.getElementById("btnProposalCallOwner");
const crmFeed = document.getElementById("crmFeed");
const goldTimeCard = document.getElementById("goldTimeCard");
const goldCountdown = document.getElementById("goldCountdown");
const btnGoldCallAction = document.getElementById("btnGoldCallAction");

// Screen 4: Roleplay
const roleplaySetup = document.getElementById("roleplaySetup");
const bossSelect = document.getElementById("bossSelect");
const bossAvatarDisp = document.getElementById("bossAvatarDisp");
const bossNameDisp = document.getElementById("bossNameDisp");
const bossDescDisp = document.getElementById("bossDescDisp");
const btnStartRoleplay = document.getElementById("btnStartRoleplay");
const roleplayChatContainer = document.getElementById("roleplayChatContainer");
const chatBossAvatar = document.getElementById("chatBossAvatar");
const chatBossName = document.getElementById("chatBossName");
const chatRound = document.getElementById("chatRound");
const chatMessages = document.getElementById("chatMessages");
const chatOptions = document.getElementById("chatOptions");
const scorecardOverlay = document.getElementById("scorecardOverlay");
const scoreNum = document.getElementById("scoreNum");
const scoreEvalTitle = document.getElementById("scoreEvalTitle");
const scoreEvalDesc = document.getElementById("scoreEvalDesc");
const cheatList = document.getElementById("cheatList");
const btnRestartRoleplay = document.getElementById("btnRestartRoleplay");

// Screen 5: Download
const btnPsInstall = document.getElementById("btnPsInstall");

// Welcome Modal
const welcomeOverlay = document.getElementById("welcomeOverlay");
const btnWelcomeStart = document.getElementById("btnWelcomeStart");


// 3. Web Audio API Sound Synthesizer
let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

function playTone(freq, type, duration, volume = 0.15) {
    try {
        initAudio();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = type || 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        
        gain.gain.setValueAtTime(volume, audioCtx.currentTime);
        // Exponential decay
        gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
        console.warn("Sound generation failed:", e);
    }
}

// Sound effects
const playClickSound = () => playTone(600, 'sine', 0.1, 0.08);
const playNotificationSound = () => {
    // Nice double chime
    playTone(587.33, 'triangle', 0.2, 0.12); // D5
    setTimeout(() => playTone(880, 'triangle', 0.3, 0.12), 120); // A5
};
const playSuccessSound = () => {
    // Ascending arpeggio fanfare
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((f, idx) => {
        setTimeout(() => playTone(f, 'sine', 0.35, 0.1), idx * 100);
    });
};
const playDeleteSound = () => playTone(220, 'sawtooth', 0.15, 0.05);
const playSweepSound = () => {
    // Sweeping oscillator
    try {
        initAudio();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(200, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 1.2);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 1.2);
    } catch(e){}
};
let ringInterval = null;
const startRingTone = () => {
    stopRingTone();
    const ring = () => {
        playTone(440, 'sine', 0.4, 0.1);
        setTimeout(() => playTone(440, 'sine', 0.4, 0.1), 150);
    };
    ring();
    ringInterval = setInterval(ring, 1800);
};
const stopRingTone = () => {
    if (ringInterval) {
        clearInterval(ringInterval);
        ringInterval = null;
    }
};


// 4. Variables & Application State
let currentMode = "timeline"; // "timeline" or "free"
let isPlayingAd = false;
let currentStepIndex = 0;
let adTimer = null;
let lipSyncInterval = null;
let blinkTimeout = null;

// Speech Synthesis
let utterance = null;
const synth = window.speechSynthesis;

// 5. Timeline Renderer
function renderTimeline() {
    timelineList.innerHTML = '';
    scriptData.forEach((step, idx) => {
        const node = document.createElement("div");
        node.className = "timeline-node";
        node.dataset.index = idx;
        
        // Add completed class for finished items
        if (isPlayingAd && idx < currentStepIndex) {
            node.classList.add("completed");
        }
        if (idx === currentStepIndex) {
            node.classList.add("active");
        }
        
        node.innerHTML = `
            <div class="timeline-dot"></div>
            <h4>${step.title}</h4>
            <p>${step.desc}</p>
        `;
        
        node.addEventListener("click", () => {
            if (currentMode === "timeline") {
                jumpToStep(idx);
            }
        });
        
        timelineList.appendChild(node);
    });
}

// 6. Avatar Eye Blinking & Lip Sync Animation
function startBlinking() {
    if (blinkTimeout) clearTimeout(blinkTimeout);
    
    const blink = () => {
        // Toggle blink lines visible if they exist
        if (leftBlink && rightBlink) {
            leftBlink.style.display = 'block';
            rightBlink.style.display = 'block';
        }
        
        setTimeout(() => {
            if (leftBlink && rightBlink) {
                leftBlink.style.display = 'none';
                rightBlink.style.display = 'none';
            }
            
            // Queue next blink in 3-6 seconds
            const nextBlink = 3000 + Math.random() * 3000;
            blinkTimeout = setTimeout(blink, nextBlink);
        }, 150);
    };
    
    blinkTimeout = setTimeout(blink, 4000);
}

function startLipSync() {
    stopLipSync();
    voiceWave.classList.add("active");
    if (anchorImg) anchorImg.classList.add("speaking");
    
    lipSyncInterval = setInterval(() => {
        if (synth.speaking) {
            // Randomly stretch mouth path vertically to simulate talking if mouth exists
            const height = 48 + Math.floor(Math.random() * 8);
            if (mouth) mouth.setAttribute("d", `M44,48 Q50,${height} 56,48 Q50,50 44,48`);
        } else {
            // Idle mouth
            if (mouth) mouth.setAttribute("d", "M44,48 Q50,49 56,48 Q50,50 44,48");
        }
    }, 100);
}

function stopLipSync() {
    if (lipSyncInterval) {
        clearInterval(lipSyncInterval);
        lipSyncInterval = null;
    }
    voiceWave.classList.remove("active");
    if (anchorImg) anchorImg.classList.remove("speaking");
    if (mouth) mouth.setAttribute("d", "M44,48 Q50,49 56,48 Q50,50 44,48");
}


// 7. Timeline Playback Control (TTS Narrator)
function startStep(idx) {
    if (idx >= scriptData.length) {
        stopAdPlayback();
        return;
    }
    
    currentStepIndex = idx;
    renderTimeline();
    
    const step = scriptData[idx];
    subtitleText.textContent = `"${step.subtitle}"`;
    switchPhoneView(step.view);
    
    statusText.textContent = `시연 중: ${step.title}`;
    
    // Play view actions specifically during timeline narration
    if (step.id === "timing") {
        setTimeout(triggerMapScan, 1000);
    } else if (step.id === "tracking") {
        setTimeout(() => {
            // Automate owner slide and salesman notification
            let progress = 10;
            const slideTimer = setInterval(() => {
                progress += 10;
                proposalSlider.value = progress;
                updateProposalCalc(progress);
                if (progress >= 70) {
                    clearInterval(slideTimer);
                    triggerFcmAlert("강남 부대찌개 사장님이 제안서 예상 매출 계산기를 조작 중입니다.");
                }
            }, 300);
        }, 1000);
    } else if (step.id === "roleplay") {
        setTimeout(triggerRoleplayDemo, 1000);
    } else if (step.id === "outro") {
        setTimeout(() => {
            btnPsInstall.click();
        }, 1500);
    }
    
    // Check if TTS is enabled
    if (toggleTts.checked) {
        synth.cancel();
        
        utterance = new SpeechSynthesisUtterance(step.subtitle);
        utterance.lang = "ko-KR";
        utterance.rate = parseFloat(localStorage.getItem("gamjamaps_tts_rate") || "1.0");
        utterance.volume = parseFloat(volumeSlider.value);
        
        // Find Korean voice if possible
        const voices = synth.getVoices();
        const koVoice = voices.find(v => v.lang.includes("ko") || v.lang.includes("KO"));
        if (koVoice) utterance.voice = koVoice;
        
        utterance.onstart = () => {
            startLipSync();
        };
        
        utterance.onend = () => {
            stopLipSync();
            if (isPlayingAd) {
                // Short wait then next step
                adTimer = setTimeout(() => {
                    startStep(currentStepIndex + 1);
                }, 1800);
            }
        };
        
        utterance.onerror = (e) => {
            console.error("TTS synthesis error:", e);
            stopLipSync();
            // Fallback timer if speech synthesizer fails
            if (isPlayingAd) {
                adTimer = setTimeout(() => {
                    startStep(currentStepIndex + 1);
                }, step.duration);
            }
        };
        
        synth.speak(utterance);
    } else {
        // Simple timer fallback
        stopLipSync();
        adTimer = setTimeout(() => {
            startStep(currentStepIndex + 1);
        }, step.duration);
    }
}

function jumpToStep(idx) {
    if (adTimer) clearTimeout(adTimer);
    synth.cancel();
    stopLipSync();
    
    if (!isPlayingAd) {
        isPlayingAd = true;
        btnPlayAd.innerHTML = `<span class="icon">❚❚</span> <span class="text">시연 일시정지</span>`;
        btnResetAd.disabled = false;
        statusDot.className = "status-dot pulsed";
    }
    
    startStep(idx);
}

function stopAdPlayback() {
    isPlayingAd = false;
    btnPlayAd.innerHTML = `<span class="icon">▶</span> <span class="text">광고 다시시작</span>`;
    statusDot.className = "status-dot";
    statusText.textContent = "시연 정지됨";
    
    if (adTimer) clearTimeout(adTimer);
    synth.cancel();
    stopLipSync();
}

function restartAdPlayback() {
    stopAdPlayback();
    jumpToStep(0);
}

// Volume Slider Event
volumeSlider.addEventListener("input", (e) => {
    const vol = parseFloat(e.target.value);
    if (utterance) utterance.volume = vol;
});


// 8. Mode Switcher (Timeline vs. Free Demo)
function switchMode(mode) {
    currentMode = mode;
    playClickSound();
    
    if (mode === "timeline") {
        modeTimeline.classList.add("active");
        modeFree.classList.remove("active");
        panelTimelineContent.classList.remove("hidden");
        panelFreeContent.classList.add("hidden");
        
        // Setup initial avatar state
        avatarBox.style.display = "flex";
        statusDot.className = "status-dot";
        statusText.textContent = "대본 로딩 완료 (정지 상태)";
        subtitleText.textContent = '"광고 시작하기 버튼을 누르면 새로운 세일즈 파트너 \'감자맵스\'의 비디오 프레젠테이션 시뮬레이터가 시작됩니다."';
        
        // Enable nav clicks for script?
        phoneScreen.classList.remove("free-mode-phone");
    } else {
        stopAdPlayback();
        
        modeFree.classList.add("active");
        modeTimeline.classList.remove("active");
        panelFreeContent.classList.remove("hidden");
        panelTimelineContent.classList.add("hidden");
        
        // Hide avatar or customize presenter
        statusDot.className = "status-dot pulsed-green";
        statusText.textContent = "자유 체험 진행 중 (100% 라이브)";
        subtitleText.textContent = '"자유 데모 모드입니다. 우측 스마트폰 화면 하단의 네비게이션 탭을 누르거나 직접 지도 스캔, 슬라이더 조작, AI 훈련 등을 조작하실 수 있습니다."';
        
        // Customize phone screen styling slightly
        phoneScreen.classList.add("free-mode-phone");
        
        updateCrmDashboard();
    }
}

modeTimeline.addEventListener("click", () => switchMode("timeline"));
modeFree.addEventListener("click", () => switchMode("free"));

btnPlayAd.addEventListener("click", () => {
    initAudio();
    if (isPlayingAd) {
        stopAdPlayback();
    } else {
        jumpToStep(currentStepIndex);
    }
});

btnResetAd.addEventListener("click", () => {
    playClickSound();
    restartAdPlayback();
});


// 9. Smartphone View Switcher & Nav Bar
function switchPhoneView(viewId) {
    const views = document.querySelectorAll(".app-view");
    views.forEach(v => v.classList.remove("active"));
    
    const targetView = document.getElementById(`view-${viewId}`);
    if (targetView) targetView.classList.add("active");
    
    // Highlight Navbar
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
        item.classList.remove("active");
        if (item.dataset.view === viewId) {
            item.classList.add("active");
        }
    });
    
    // Reset view specific panels
    if (viewId !== "tracking") {
        fcmPushBanner.classList.remove("show");
    }
}

// Nav bar listeners
document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", (e) => {
        const view = item.dataset.view;
        playClickSound();
        switchPhoneView(view);
    });
});


// ====================================================
// VIEW 1: DASHBOARD
// ====================================================
btnStartDashboardScan.addEventListener("click", () => {
    playClickSound();
    switchPhoneView("timing");
    triggerMapScan();
});


// ====================================================
// VIEW 2: TIMING MAP SCANNER
// ====================================================
let pinsData = [
    { name: "강남 돈까스", type: "🔥 신규", x: 25, y: 35, desc: "최근 15일 이내 신규 개업 매장. 지도 등록 무상 지원 및 첫 달 할인 영업 찬스!", color: "accent" },
    { name: "대박 부대찌개", type: "💎 골목", x: 70, y: 30, desc: "경쟁 점포가 광고 점유율 78% 선점한 틈새 상권 매장. 매출 손실 회복 ROI 제안 필요.", color: "gold" },
    { name: "골목 삼겹살", type: "🟢 여유", x: 50, y: 65, desc: "쉬는 시간: 15:00 ~ 17:00 (브레이크 타임). 사장님이 자리에 앉아 제안서를 검토할 최적 시점.", color: "green" }
];

function triggerMapScan() {
    playSweepSound();
    mapPins.innerHTML = '';
    radarSweep.classList.add("active");
    scannerStatusText.textContent = "상권 내 잠재 타겟을 스캔 중입니다...";
    
    setTimeout(() => {
        radarSweep.classList.remove("active");
        playSuccessSound();
        scannerStatusText.textContent = "스캔 완료! 상권 내 골든 타겟 3곳을 성공적으로 포착했습니다.";
        
        pinsData.forEach((pin, idx) => {
            const pinEl = document.createElement("div");
            pinEl.className = `map-pin ${pin.color}-pin`;
            pinEl.style.left = `${pin.x}%`;
            pinEl.style.top = `${pin.y}%`;
            pinEl.style.animationDelay = `${idx * 0.2}s`;
            
            pinEl.innerHTML = `
                <div class="pin-icon-box">
                    <span>${pin.type.split(" ")[0]}</span>
                </div>
                <div class="pin-tooltip" id="tooltip-${idx}">
                    <h5>${pin.name}</h5>
                    <span class="type-desc">${pin.type} 타겟</span>
                    <p class="text-detail">${pin.desc}</p>
                    <button class="btn-pin-action" onclick="saveMapPinToDiary(${idx})">📝 일지 저장</button>
                </div>
            `;
            
            pinEl.addEventListener("click", (e) => {
                e.stopPropagation();
                // Close all tooltips first
                document.querySelectorAll(".pin-tooltip").forEach(t => t.classList.remove("active"));
                const tooltip = document.getElementById(`tooltip-${idx}`);
                if (tooltip) tooltip.classList.add("active");
            });
            
            mapPins.appendChild(pinEl);
        });
    }, 1500);
}

// Close map tooltips when clicking map
mapView.addEventListener("click", () => {
    document.querySelectorAll(".pin-tooltip").forEach(t => t.classList.remove("active"));
});

// Save Map Pin to local DB
window.saveMapPinToDiary = function(index) {
    const pin = pinsData[index];
    playSuccessSound();
    
    const diaries = JSON.parse(localStorage.getItem("gamjamaps_diaries") || "[]");
    const timestamp = new Date().toLocaleString("ko-KR", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" });
    
    const newEntry = {
        id: Date.now(),
        title: pin.name,
        desc: `${pin.type} 상권 분석 - 상담 대기`,
        time: timestamp
    };
    
    diaries.unshift(newEntry);
    localStorage.setItem("gamjamaps_diaries", JSON.stringify(diaries));
    
    // Alert tooltip
    alert(`📝 [영업일지 등록 완료]\n${pin.name} 매장의 분석 로그가 CRM 관제판에 저장되었습니다!`);
    
    // Close tooltip
    document.querySelectorAll(".pin-tooltip").forEach(t => t.classList.remove("active"));
    
    updateCrmDashboard();
};

btnTriggerMapScan.addEventListener("click", () => {
    playClickSound();
    triggerMapScan();
});


// ====================================================
// VIEW 3: REAL-TIME TRACKING
// ====================================================
// Tab switcher
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

// Calculator slider
proposalSlider.addEventListener("input", (e) => {
    const progress = parseInt(e.target.value);
    updateProposalCalc(progress);
});

let fcmThrottleTimer = null;
proposalSlider.addEventListener("change", (e) => {
    const progress = parseInt(e.target.value);
    
    // Throttle notifications
    if (fcmThrottleTimer) clearTimeout(fcmThrottleTimer);
    fcmThrottleTimer = setTimeout(() => {
        playNotificationSound();
        triggerFcmAlert(`강남 부대찌개 사장님이 제안서의 마케팅 매출 회산기를 ${progress}%로 조정하여 분석 중입니다.`);
    }, 600);
});

function updateProposalCalc(progress) {
    calcPercent.textContent = `${progress}%`;
    const salesVal = Math.floor(progress * 52500);
    calcSales.textContent = `₩${salesVal.toLocaleString()}`;
    
    // Warning loss sync
    const lossVal = Math.floor((100 - progress) * 42000);
    dashLossAmount.textContent = `-₩${lossVal.toLocaleString()}`;
}

btnProposalCallOwner.addEventListener("click", () => {
    playNotificationSound();
    triggerFcmAlert("강남 부대찌개 사장님이 마케팅 콜백 상담 문의를 접수하셨습니다!");
    alert("📞 [FCM 푸시 알림 전송]\n영업 매칭 문의 알림이 영업사원 폰(Salesman)으로 즉시 전달되었습니다!");
});

// Trigger FCM Push Banner
function triggerFcmAlert(message) {
    fcmTitle.textContent = "🥔 Gamja Maps CRM 알림";
    fcmMessage.textContent = message;
    
    // Show banner on top
    fcmPushBanner.classList.add("show");
    
    // Add item to CRM Feed
    const emptyFeed = crmFeed.querySelector(".empty");
    if (emptyFeed) emptyFeed.remove();
    
    const timeStr = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const crmItem = document.createElement("div");
    crmItem.className = "crm-item";
    crmItem.innerHTML = `
        <div class="crm-item-header">
            <strong>🔥 실시간 고객 관심 포착</strong>
            <span>${timeStr}</span>
        </div>
        <div class="crm-item-body">${message}</div>
    `;
    crmFeed.insertBefore(crmItem, crmFeed.firstChild);
    
    // Show golden opportunity call
    goldTimeCard.style.display = "flex";
    startGoldenCountdown();
}

// Golden Call Timer Countdown
let goldCountdownTimer = null;
let goldCountdownSecs = 60;

function startGoldenCountdown() {
    if (goldCountdownTimer) clearInterval(goldCountdownTimer);
    goldCountdownSecs = 60;
    goldCountdown.textContent = "01:00";
    goldCountdown.style.color = "var(--primary-light)";
    
    goldCountdownTimer = setInterval(() => {
        goldCountdownSecs--;
        const mins = Math.floor(goldCountdownSecs / 60);
        const secs = goldCountdownSecs % 60;
        const formattedSecs = secs < 10 ? `0${secs}` : secs;
        goldCountdown.textContent = `0${mins}:${formattedSecs}`;
        
        if (goldCountdownSecs <= 15) {
            goldCountdown.style.color = "var(--warning)";
        }
        if (goldCountdownSecs <= 0) {
            clearInterval(goldCountdownTimer);
            goldCountdown.textContent = "만료됨";
        }
    }, 1000);
}

// Closing Call Trigger
btnGoldCallAction.addEventListener("click", () => {
    initAudio();
    if (goldCountdownSecs <= 0) {
        alert("⌛ 골든타임이 만료되었습니다. 다시 시뮬레이션해 보세요.");
        return;
    }
    
    clearInterval(goldCountdownTimer);
    startRingTone();
    
    // Simulation calling popup
    const callModal = document.createElement("div");
    callModal.className = "scorecard-overlay";
    callModal.id = "phoneCallOverlay";
    callModal.innerHTML = `
        <div class="scorecard-card" style="border-color: var(--accent);">
            <div style="font-size: 40px; animation: beaconPulse 1s infinite;">📞</div>
            <h2>강남 부대찌개 사장님</h2>
            <p class="scorecard-subtitle" id="callStatusText">전화 연결 중...</p>
            <div style="width: 100%; height: 3px; background: rgba(255,255,255,0.05); margin: 15px 0;"></div>
            <button class="btn-clear-db" style="background: rgba(239, 68, 68, 0.2); width: 100%; border-color:#f87171; color: white;" onclick="hangupPhoneCall(false)">통화 종료</button>
        </div>
    `;
    phoneScreen.appendChild(callModal);
    
    setTimeout(() => {
        stopRingTone();
        playSuccessSound();
        const callStatusText = document.getElementById("callStatusText");
        if (callStatusText) callStatusText.innerHTML = "통화 연결 완료!<br><br><strong>\"아 사장님, 보내드린 제안서 계산기 보고 계셨죠? 현재 월 기회 손실액인 420만 원을 월 50만 원의 배달 대형 타겟 광고로 1등 매장의 점유율을 회수하는 전략입니다!\"</strong>";
        
        // Wait 3.5s then closing success
        setTimeout(() => {
            hangupPhoneCall(true);
        }, 3500);
    }, 2500);
});

window.hangupPhoneCall = function(isSuccess) {
    stopRingTone();
    const callModal = document.getElementById("phoneCallOverlay");
    if (callModal) callModal.remove();
    
    if (isSuccess) {
        playSuccessSound();
        
        const diaries = JSON.parse(localStorage.getItem("gamjamaps_diaries") || "[]");
        const timestamp = new Date().toLocaleString("ko-KR", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" });
        
        const newEntry = {
            id: Date.now(),
            title: "강남 부대찌개",
            desc: "📞 골든 콜 성사 - 3회차 결제 약정 완료",
            time: timestamp
        };
        
        diaries.unshift(newEntry);
        localStorage.setItem("gamjamaps_diaries", JSON.stringify(diaries));
        
        alert("👑 [골든 콜 성공!]\n마케팅 약정 클로징에 성공했습니다! 영업일지에 추가되었습니다.");
        goldTimeCard.style.display = "none";
        
        updateCrmDashboard();
    }
};


// ====================================================
// VIEW 4: AI ROLEPLAYING
// ====================================================
let selectedBossId = 0;
let currentChatRound = 0;
let trainingScore = 0;
let bossObjections = [
    {
        name: "박길동 사장님",
        avatar: "👨🍳",
        desc: "돈가스집 사장님. 성격: 깐깐함, 광고 불신 심함",
        rounds: [
            {
                objection: "우리는 마케팅 필요 없어요. 인터넷 광고 안 해도 동네 손님들 알아서 척척 오니까 그냥 가세요.",
                options: [
                    { text: "요즘은 입소문만으로 장사하시는 건 위험해요. 대형 광고를 무조건 돌리셔야 돈을 벌 수 있습니다.", score: 20, feedback: "단순히 필요성만 주장하는 화법은 사장님의 거부감을 자극합니다." },
                    { text: "사장님, 현재 매장에 오시는 단골 분들은 훌륭합니다. 하지만 최근 경쟁 매장에서 반경 300m 이내 집중 마케팅을 집행하여 사장님이 빼앗기고 계시는 기회 손실액이 매달 420만 원에 달합니다.", score: 100, feedback: "손실액 분석 수치(Loss Framing)를 객관적으로 제시하여 사장님의 경각심을 고취한 정답 세일즈 멘트입니다." },
                    { text: "아... 입소문만으로 장사가 잘 된다니 대단하시네요. 나중에 필요하시면 연락 주십시오.", score: 10, feedback: "거절에 아무 반박 없이 물러서는 태도는 영업 성사율을 낮춥니다." }
                ]
            },
            {
                objection: "기회 손실액? 그게 진짜 내 통장에서 빠져나가는 돈도 아닌데 무슨 상관이요?",
                options: [
                    { text: "실제 통장에서 돈이 빠져나가는 게 맞습니다. 경쟁 매장이 그 손님들의 매출을 가져갔으니 그것이 곧 사장님의 기회 비용 손실입니다.", score: 100, feedback: "통계적인 관점과 실제 빼앗긴 신규 유입 매출의 상호 연관 관계를 이해시키고 매칭한 우수한 답변입니다." },
                    { text: "계산해 보니 그렇게 나온 거예요. 마케팅을 하시면 더 많이 버실 수 있는데 왜 마다하십니까?", score: 30, feedback: "사장님의 감정을 상하게 하고 윽박지르는 듯한 강압적인 화법입니다." },
                    { text: "어차피 대세는 마케팅이니까요. 안 하시면 나중에 결국 폐업할 수도 있습니다.", score: 10, feedback: "불필요하게 부정적인 폐업 등의 언어를 사용하는 것은 심각한 클레임을 유발합니다." }
                ]
            },
            {
                objection: "좋소. 그럼 그 손실을 어떻게 막아준다는 거요? 데이터로 증명할 수 있소?",
                options: [
                    { text: "네이버 스마트플레이스에 저희 솔루션을 연동하여 어떤 핵심 키워드로 몇 명이 클릭했는지 매주 통계 그래프로 투명하게 보여드립니다.", score: 100, feedback: "구체적인 노출 통계와 매주 수치로 입증되는 보고 메커니즘을 명시하여 투명성을 보장한 훌륭한 답변입니다." },
                    { text: "블로그 체험단을 대량 뿌리면 무조건 검색 노출되니까 매출 올라갑니다. 믿으세요.", score: 20, feedback: "대체 가능한 체험단 수량만을 앞세우며 무조건적인 확답을 주는 식의 과장 영업은 사기 광고 불신을 초래합니다." },
                    { text: "저희를 믿고 한 번만 진행해 보세요. 대행사 직원들이 실시간으로 매장 마케팅 전담 마크해 드립니다.", score: 40, feedback: "구체적인 데이터 근거 없이 추상적인 사후 서비스 약속만 주는 평균적인 답변입니다." }
                ]
            }
        ]
    },
    {
        name: "이영희 사장님",
        avatar: "👩🍳",
        desc: "카페 사장님. 성격: 소심하나 꼼꼼함, 과거 사기 대행 트라우마 있음",
        rounds: [
            {
                objection: "인터넷 대행업체들 다 사기꾼 아니에요? 저번에 월 30만 원씩 네이버 광고 대행해 준다더니 돈만 먹고 연락도 뜸해지더라고요.",
                options: [
                    { text: "그 업체들은 악질 불법 업체입니다. 저희는 대기업 및 네이버 플레이스 공식 배지를 단 안심 대행사라 절대 그런 일이 없습니다.", score: 40, feedback: "타 업체 탓만 하며 단순 신분 안심을 어필하는 것으로는 트라우마를 해소하기 어렵습니다." },
                    { text: "저희는 1년 치 약정 사기 유도를 하지 않으며, 매주 공공포털 주간 검색 유입 데이터를 수치화하여 투명하게 전달해 드리는 매칭 플랫폼 방식입니다.", score: 100, feedback: "장기 약정 유도가 없고 통계 데이터를 투명하게 수치화하여 매칭 검증함을 명시한 훌륭한 답변입니다." },
                    { text: "광고주 사장님들이 효과를 못 보신 건 다 이유가 있죠. 이번에 저와 진행하시면 그런 사기 피해는 절대 없을 겁니다.", score: 10, feedback: "사장님의 아픈 상처를 자만하며 가볍게 넘기는 화법은 경계를 돋웁니다." }
                ]
            },
            {
                objection: "그럼 매주 보내준다는 그 보고서를 내가 어떻게 실시간으로 믿나요? 조작한 거 아니에요?",
                options: [
                    { text: "저희는 조작이 불가능한 국토교통부 실시간 유입 정보 포털과 매장 지도 조회수 원시 통계 API 값을 기반으로 연동하여 가공 없이 노출해 드립니다.", score: 100, feedback: "원천 소스(API)와 외부 데이터 공공포털 데이터를 활용하여 신뢰 가능함을 정확하게 짚어낸 최고점 답변입니다." },
                    { text: "저희가 사장님 매장 스마트폰 어플로 직접 대시보드를 연동해 드릴 테니 실시간 확인하세요.", score: 50, feedback: "스마트폰 어플 연동의 이점은 좋으나 데이터의 공신력을 충분히 밝히진 못했습니다." },
                    { text: "회사 이름 걸고 조작 같은 건 절대 하지 않습니다. 대기업 솔루션인데 어떻게 사기를 치나요.", score: 20, feedback: "브랜드 신뢰성만 윽박지르고 보장은 없는 비논리적 화법입니다." }
                ]
            },
            {
                objection: "알겠어요. 그런데 우리 카페는 이미 주변에 단골들이 많은데 굳이 지금 추가로 마케팅이 필요한가요?",
                options: [
                    { text: "카페 상권은 이탈률이 70%에 육박합니다. 단골 손님 유지만으론 신규 경쟁 매장 5곳 유입 속도를 버텨낼 수 없습니다.", score: 100, feedback: "높은 이탈률 수치와 경쟁 구도 속 신규 매장 포화 상태를 설명하며 확장을 제안한 정답 멘트입니다." },
                    { text: "단골만으로 장사가 평생 갈 순 없잖아요. 마케팅을 하셔서 매출 규모를 키우셔야죠.", score: 30, feedback: "논리적 근거가 약하고 다소 강요하는 듯한 말투입니다." },
                    { text: "그렇죠. 카페는 단골이 최고이긴 합니다. 그래도 마케팅 한번 해 보세요.", score: 10, feedback: "영업 기회를 흐리멍텅하게 양보하고 마감 처리한 나쁜 화법입니다." }
                ]
            }
        ]
    },
    {
        name: "최성진 사장님",
        avatar: "👨🍳",
        desc: "횟집 사장님. 성격: 지극히 현실적이고 비용에 매우 민감함",
        rounds: [
            {
                objection: "설명은 들었는데, 월 50만 원이라는 돈이 장사도 안 되는데 요새 같은 불경기에 너무 아깝네요.",
                options: [
                    { text: "하루 16,000원꼴입니다. 커피 한 잔 값 아끼신다 생각하시면 마케팅 가치는 충분합니다.", score: 20, feedback: "하루 커피값 비유는 불경기에 생업을 건 사장님의 자금 절박함을 가볍게 취급하는 전형적인 오답입니다." },
                    { text: "불경기일수록 남들이 광고를 멈출 때가 찬스입니다. 저희는 저렴한 편입니다.", score: 40, feedback: "위기 시 투자라는 원론적 논리만 제시하고 구체적 혜택은 없습니다." },
                    { text: "사장님, 월 50만 원은 부담스러운 결심입니다. 하지만 마케팅 없이 방치 시 발생하는 기회 손실액인 420만 원과 비교해 본다면, 50만 원 지출로 420만 원의 손실을 막아 8.4배의 수익을 되찾는 투자가 됩니다.", score: 100, feedback: "단순 지출(Cost)을 손실 방어형 투자(ROI)의 개념으로 전환하여 논리적으로 설득한 베스트 셀러 세일즈 화법입니다." }
                ]
            },
            {
                objection: "8.4배 회수? 그럼 만약 50만 원 넣었는데 8.4배 매출이 안 나오면 당신이 책임질 거요?",
                options: [
                    { text: "마케팅은 불확실한 도박이 아니라 타겟 모수를 축적하는 것입니다. 초기 1~2개월 노출 점유율이 40% 미만일 시 데이터 피드백을 통해 보정 광고를 무상 서비스로 지원하겠습니다.", score: 100, feedback: "무조건적 환불 보장 같은 불법 약속 대신 기술적인 보정 지원(무상 보증)을 약속하여 영리하게 안심시킨 정답 멘트입니다." },
                    { text: "당연히 책임집니다! 만약 효과 안 나오면 100% 전액 환불을 각서 써 드릴게요.", score: 10, feedback: "계약 보장 각서는 런타임 클레임 분쟁의 시초가 되며 지킬 수 없으므로 엄금해야 합니다." },
                    { text: "매출은 전적으로 매장 맛과 서비스도 중요하기 때문에 저희가 광고 효과를 100% 보장하긴 어렵습니다.", score: 30, feedback: "책임을 피하기 위해 발뺌하는 나약한 태도로 신뢰를 실추시킵니다." }
                ]
            },
            {
                objection: "음... 깐깐하게 물어봤는데 제법 자신감이 넘치네. 계약서는 어떻게 작성하는 거요?",
                options: [
                    { text: "감사합니다! 플레이스토어에서 [감자맵스 어플] 설치 후 VIP 등급 승인 버튼만 누르시면 전자 계약 프로세스가 즉시 활성화됩니다.", score: 100, feedback: "플랫폼을 통한 모바일 간편 계약 및 라이선스 승급 단계를 매끄럽고 신속하게 안내한 우수한 답변입니다." },
                    { text: "제가 종이 계약서 서류 가져왔으니 여기에 성함과 계좌번호 작성해 주시면 됩니다.", score: 40, feedback: "구식 서류 서명은 비대면/모바일에 익숙한 현대 사장님들께 서류 거부감을 가중시킵니다." },
                    { text: "이메일로 계약서 양식 보내드릴 테니까 집에서 꼼꼼히 읽어보시고 도장 찍어 보내주세요.", score: 10, feedback: "결정(Closing) 단계에서 고객을 집으로 돌려보내는 것은 계약 성사 가능성을 스스로 포기하는 행위입니다." }
                ]
            }
        ]
    }
];

// Profile Sync on Selection
bossSelect.addEventListener("change", (e) => {
    selectedBossId = parseInt(e.target.value);
    const boss = bossObjections[selectedBossId];
    bossAvatarDisp.textContent = boss.avatar;
    bossNameDisp.textContent = `${boss.name} (${boss.desc.split(".")[0]})`;
    bossDescDisp.textContent = boss.desc.split(".")[1] || "";
});

function startRoleplaySession() {
    initAudio();
    playClickSound();
    
    currentChatRound = 0;
    trainingScore = 0;
    
    roleplaySetup.style.display = "none";
    roleplayChatContainer.style.display = "flex";
    scorecardOverlay.style.display = "none";
    
    const boss = bossObjections[selectedBossId];
    chatBossAvatar.textContent = boss.avatar;
    chatBossName.textContent = `${boss.name} (AI)`;
    
    chatMessages.innerHTML = '';
    showRoundMessage();
}

function showRoundMessage() {
    const boss = bossObjections[selectedBossId];
    const rData = boss.rounds[currentChatRound];
    
    chatRound.textContent = `ROUND ${currentChatRound + 1}/3`;
    
    // Add Boss Message
    addChatMessage(boss.avatar, boss.name, rData.objection, "boss-msg");
    
    // Add options
    chatOptions.innerHTML = '';
    rData.options.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.className = "btn-option";
        btn.textContent = `${idx + 1}. ${opt.text}`;
        btn.addEventListener("click", () => selectChatOption(opt));
        chatOptions.appendChild(btn);
    });
}

function selectChatOption(option) {
    initAudio();
    playClickSound();
    
    // Disable all options
    document.querySelectorAll(".btn-option").forEach(b => b.disabled = true);
    
    // Add User Message
    addChatMessage("💼", "나 (영업마케터)", option.text, "user-msg");
    trainingScore += option.score;
    
    // Play sound based on score
    setTimeout(() => {
        if (option.score >= 90) {
            playSuccessSound();
        } else {
            playTone(330, 'triangle', 0.2, 0.1);
        }
        
        // Show constructive feedback card
        const feedbackBox = document.createElement("div");
        feedbackBox.className = "feedback-box";
        feedbackBox.innerHTML = `
            <strong>💡 실전 피드백 (획득: ${option.score}점)</strong>
            ${option.feedback}
        `;
        chatMessages.appendChild(feedbackBox);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Next round after 2.5 seconds
        setTimeout(() => {
            currentChatRound++;
            if (currentChatRound < 3) {
                showRoundMessage();
            } else {
                finishRoleplaySession();
            }
        }, 3000);
        
    }, 800);
}

function addChatMessage(avatar, sender, text, className) {
    const msg = document.createElement("div");
    msg.className = `chat-msg ${className}`;
    msg.innerHTML = `
        <div class="chat-bubble">
            <strong>${avatar} ${sender}</strong>
            <p style="margin-top: 4px;">${text}</p>
        </div>
    `;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function finishRoleplaySession() {
    playSuccessSound();
    
    const finalScore = Math.floor(trainingScore / 3);
    scoreNum.textContent = finalScore;
    
    // Score evaluation
    if (finalScore >= 90) {
        scoreEvalTitle.textContent = "🏆 최정예 마케팅 스페셜리스트!";
        scoreEvalDesc = "소상공인 사장님의 깐깐한 심리 거절 패턴을 손실 프레이밍과 공공 데이터 수치로 격파했습니다. 실제 미팅 시 계약 성률 90% 이상을 보증합니다.";
    } else if (finalScore >= 60) {
        scoreEvalTitle.textContent = "👔 훌륭한 주니어 세일즈맨!";
        scoreEvalDesc = "경청하는 태도가 좋으나 단가 인하 및 도박적 100% 장담 약속 등 사기 불신 트라우마를 자극하는 오답 노출이 있어 조금 더 학습이 권장됩니다.";
    } else {
        scoreEvalTitle.textContent = "⚠ 보충 훈련 요망";
        scoreEvalDesc = "사장님의 일방적 거절에 쉽게 물러서거나 하루 담배값에 빗대어 장사를 무시하는 오답이 다수 검출되었습니다. 매뉴얼을 다시 정독하고 성적을 개선하세요.";
    }
    
    // Render dynamic cheat list
    cheatList.innerHTML = '';
    const boss = bossObjections[selectedBossId];
    boss.rounds.forEach((r, idx) => {
        const correctOpt = r.options.find(o => o.score >= 90);
        const li = document.createElement("li");
        li.innerHTML = `<strong>Q${idx+1}:</strong> ${correctOpt.text.substring(0, 70)}...`;
        cheatList.appendChild(li);
    });
    
    scorecardOverlay.style.display = "flex";
    
    // Save to Local DB
    localStorage.setItem("gamjamaps_last_score", finalScore);
    updateCrmDashboard();
}

function triggerRoleplayDemo() {
    // Automate AI Roleplay selection simulation during timeline playback
    selectedBossId = 0;
    const boss = bossObjections[selectedBossId];
    
    roleplaySetup.style.display = "none";
    roleplayChatContainer.style.display = "flex";
    scorecardOverlay.style.display = "none";
    
    chatRound.textContent = "AI 시뮬레이션 중...";
    chatBossAvatar.textContent = boss.avatar;
    chatBossName.textContent = `${boss.name} (AI)`;
    chatMessages.innerHTML = '';
    
    addChatMessage(boss.avatar, boss.name, boss.rounds[0].objection, "boss-msg");
    
    // Automatically select the correct option after 1.5 seconds
    setTimeout(() => {
        const correctOpt = boss.rounds[0].options.find(o => o.score >= 90);
        addChatMessage("💼", "나 (영업마케터)", correctOpt.text, "user-msg");
        
        const feedbackBox = document.createElement("div");
        feedbackBox.className = "feedback-box";
        feedbackBox.innerHTML = `
            <strong>💡 실전 피드백 (획득: ${correctOpt.score}점)</strong>
            ${correctOpt.feedback}
        `;
        chatMessages.appendChild(feedbackBox);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1800);
}

btnStartRoleplay.addEventListener("click", () => {
    startRoleplaySession();
});

btnRestartRoleplay.addEventListener("click", () => {
    playClickSound();
    scorecardOverlay.style.display = "none";
    roleplaySetup.style.display = "flex";
    roleplayChatContainer.style.display = "none";
});


// ====================================================
// VIEW 5: GOOGLE PLAY STORE
// ====================================================
let installTimer = null;
btnPsInstall.addEventListener("click", () => {
    initAudio();
    if (btnPsInstall.classList.contains("downloading")) return;
    
    if (btnPsInstall.textContent === "열기" || btnPsInstall.textContent === "실행") {
        playSuccessSound();
        localStorage.setItem("gamjamaps_vip", "true");
        vipBadge.classList.add("active-vip");
        vipBadge.textContent = "👑 VIP";
        
        // Alert VIP upgrade success
        alert("🎉 [VIP 회원 승격]\n축하합니다! 어플리케이션 연동 실행 완료와 동시에 감자맵스 평생 VIP 라이선스가 활성화되었습니다.");
        
        updateCrmDashboard();
        return;
    }
    
    // Install simulation
    playClickSound();
    btnPsInstall.classList.add("downloading");
    let progress = 0;
    
    btnPsInstall.textContent = `설치 중... 0%`;
    
    installTimer = setInterval(() => {
        progress += 10;
        btnPsInstall.textContent = `설치 중... ${progress}%`;
        
        if (progress >= 100) {
            clearInterval(installTimer);
            playSuccessSound();
            btnPsInstall.classList.remove("downloading");
            btnPsInstall.textContent = "실행";
            btnPsInstall.style.backgroundColor = "#0f172a";
            btnPsInstall.style.color = "#fbbf24";
            btnPsInstall.style.border = "1px solid #fbbf24";
            
            // Trigger automatic VIP upgrade in localStorage
            localStorage.setItem("gamjamaps_vip", "true");
            vipBadge.classList.add("active-vip");
            vipBadge.textContent = "👑 VIP";
            updateCrmDashboard();
        }
    }, 200);
});


// ====================================================
// DB & local Storage CRM rendering
// ====================================================
function updateCrmDashboard() {
    const diaries = JSON.parse(localStorage.getItem("gamjamaps_diaries") || "[]");
    const lastScore = localStorage.getItem("gamjamaps_last_score") || "-";
    const isVip = localStorage.getItem("gamjamaps_vip") === "true";
    
    // Render Statistics in free mode panel
    if (statDiaryCount) statDiaryCount.textContent = `${diaries.length}건`;
    if (statLastScore) statLastScore.textContent = lastScore !== "-" ? `${lastScore}점` : "- 점";
    
    // Sync Phone VIP Badge
    if (isVip) {
        vipBadge.classList.add("active-vip");
        vipBadge.textContent = "👑 VIP";
    } else {
        vipBadge.classList.remove("active-vip");
        vipBadge.textContent = "FREE";
    }
    
    // Render logs list
    diaryList.innerHTML = '';
    if (diaries.length === 0) {
        diaryList.innerHTML = '<div class="diary-item-empty">저장된 영업일지가 없습니다.</div>';
    } else {
        diaries.forEach((entry, idx) => {
            const card = document.createElement("div");
            card.className = "diary-card-log";
            if (idx === 0 && entry.id > Date.now() - 2000) {
                card.classList.add("just-added");
            }
            card.innerHTML = `
                <div class="diary-info-left">
                    <strong>📍 ${entry.title}</strong>
                    <span>${entry.desc}</span>
                    <span style="font-size: 8px; color: var(--text-muted);">${entry.time}</span>
                </div>
                <button class="btn-delete-diary" onclick="deleteDiaryEntry(${entry.id})">🗑️</button>
            `;
            diaryList.appendChild(card);
        });
    }
}

// Delete single log entry
window.deleteDiaryEntry = function(id) {
    playDeleteSound();
    let diaries = JSON.parse(localStorage.getItem("gamjamaps_diaries") || "[]");
    diaries = diaries.filter(d => d.id !== id);
    localStorage.setItem("gamjamaps_diaries", JSON.stringify(diaries));
    updateCrmDashboard();
};

// Reset Simulation Database
btnClearDb.addEventListener("click", () => {
    playDeleteSound();
    const c = confirm("🔄 정말로 시뮬레이션 데이터를 전체 초기화하시겠습니까?\n저장된 영업일지와 훈련 성적, VIP 면허 등급이 최초 무료 등급 상태로 복원됩니다.");
    if (c) {
        localStorage.removeItem("gamjamaps_diaries");
        localStorage.removeItem("gamjamaps_last_score");
        localStorage.removeItem("gamjamaps_vip");
        
        // Reset app installer button
        btnPsInstall.textContent = "설치";
        btnPsInstall.style.backgroundColor = "#00875a";
        btnPsInstall.style.color = "white";
        btnPsInstall.style.border = "none";
        
        updateCrmDashboard();
        alert("초기화 완료되었습니다.");
    }
});


// ====================================================
// INITS & LOADERS
// ====================================================
window.addEventListener("DOMContentLoaded", () => {
    renderTimeline();
    updateCrmDashboard();
    startBlinking();
    
    // Initialize voices
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = () => {
            // Warm up voices load
            synth.getVoices();
        };
    }
});

// Welcome Modal CTA
btnWelcomeStart.addEventListener("click", () => {
    initAudio();
    playSuccessSound();
    welcomeOverlay.classList.add("fade-out");
    setTimeout(() => {
        welcomeOverlay.remove();
    }, 600);
});

// 12. Clock time simulation inside phone status bar
function updateClock() {
    const now = new Date();
    const hrs = now.getHours().toString().padStart(2, '0');
    const mins = now.getMinutes().toString().padStart(2, '0');
    phoneTime.textContent = `${hrs}:${mins}`;
}
setInterval(updateClock, 1000);
updateClock();