/**
 * ============================================================================
 * PIXEL ART PORTFOLIO - ENHANCED LOGIC & VISUAL EFFECTS SCRIPT
 * Author: Abhay
 * Features:
 *   - Auto / Dark / Light Theme Manager (Media Query Aware)
 *   - 8-Bit Web Audio Sound Synthesizer
 *   - Ambient Canvas Pixel Particle Spark Engine
 *   - Interactive Subtle Parallax Effect
 *   - Responsive Vertical Navigation & Active Scroll Spy
 *   - Interactive AI Bot Simulated Chat (OpenAI / Gemini Ready)
 *   - Project Detail Modal Inspector with Focus Trap & Escape Key
 *   - Contact Form Validator & Transmission Feedback
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeManager();
    initSoundSystem();
    initParticlesCanvas();
    initParallax();
    initMobileNav();
    initScrollSpy();
    initTypewriter();
    initChatSystem();
    initContactForm();
    initProjectModals();
    setCurrentYear();
});

/* ==========================================================================
   1. THEME MANAGER (NIGHT MODE / SYSTEM THEME DETECTOR)
   ========================================================================== */
function initThemeManager() {
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIcon = document.getElementById('themeIcon');
    const themeLabel = document.getElementById('themeLabel');
    const body = document.body;

    // Theme states: 'auto' (system default), 'dark', 'light'
    const savedTheme = localStorage.getItem('portfolio_theme') || 'auto';
    applyTheme(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            playBeep(440, 'triangle', 0.08);
            const currentTheme = body.getAttribute('data-theme') || 'auto';
            let nextTheme = 'dark';

            if (currentTheme === 'auto') {
                nextTheme = 'dark';
            } else if (currentTheme === 'dark') {
                nextTheme = 'light';
            } else {
                nextTheme = 'auto';
            }

            applyTheme(nextTheme);
            localStorage.setItem('portfolio_theme', nextTheme);
        });
    }

    function applyTheme(theme) {
        body.setAttribute('data-theme', theme);
        if (theme === 'auto') {
            const isSystemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (themeIcon) themeIcon.className = isSystemDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
            if (themeLabel) themeLabel.textContent = 'THEME: AUTO';
        } else if (theme === 'dark') {
            if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
            if (themeLabel) themeLabel.textContent = 'THEME: DARK';
        } else if (theme === 'light') {
            if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
            if (themeLabel) themeLabel.textContent = 'THEME: LIGHT';
        }
    }

    // Listen for OS theme preference changes if user is in 'auto' mode
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (body.getAttribute('data-theme') === 'auto') {
                applyTheme('auto');
            }
        });
    }
}

/* ==========================================================================
   2. 8-BIT RETRO SOUND SYNTHESIZER (WEB AUDIO API)
   ========================================================================== */
let audioCtx = null;
let soundEnabled = true;

function initSoundSystem() {
    const sfxToggleBtn = document.getElementById('sfxToggleBtn');
    const sfxIcon = document.getElementById('sfxIcon');
    const sfxLabel = document.getElementById('sfxLabel');

    if (sfxToggleBtn) {
        sfxToggleBtn.addEventListener('click', () => {
            soundEnabled = !soundEnabled;
            if (soundEnabled) {
                if (sfxIcon) sfxIcon.className = 'fa-solid fa-volume-high';
                if (sfxLabel) sfxLabel.textContent = 'SFX: ON';
                playBeep(600, 'square', 0.1);
            } else {
                if (sfxIcon) sfxIcon.className = 'fa-solid fa-volume-xmark';
                if (sfxLabel) sfxLabel.textContent = 'SFX: OFF';
            }
        });
    }

    // Attach click sound to interactive buttons & links
    document.querySelectorAll('.pixel-button, .pixel-btn-sm, .nav-link, .social-pixel-link, .prompt-chip, .back-to-top-btn').forEach(el => {
        el.addEventListener('mouseenter', () => {
            playBeep(800, 'sine', 0.02, 0.04);
        });
        el.addEventListener('click', () => {
            playBeep(520, 'square', 0.06, 0.08);
        });
    });
}

function playBeep(frequency = 440, type = 'square', duration = 0.1, volume = 0.08) {
    if (!soundEnabled) return;
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);

        gain.gain.setValueAtTime(volume, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
        // AudioContext initialization prior to user gesture
    }
}

/* ==========================================================================
   3. AMBIENT CANVAS PARTICLES ENGINE (PIXEL STARS & SPARKS)
   ========================================================================== */
function initParticlesCanvas() {
    const canvas = document.getElementById('particlesCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 35), 45); // Responsive particle density

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() > 0.6 ? 3 : 2, // Pixel square size
            speedY: (Math.random() * 0.4 + 0.1) * -1,
            speedX: (Math.random() - 0.5) * 0.2,
            opacity: Math.random() * 0.6 + 0.2,
            color: Math.random() > 0.5 ? '#11e298' : '#00d2ff'
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.y += p.speedY;
            p.x += p.speedX;

            if (p.y < 0) {
                p.y = height;
                p.x = Math.random() * width;
            }
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;

            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.opacity;
            // Draw crisp pixel squares
            ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);
        }

        ctx.globalAlpha = 1.0;
        requestAnimationFrame(animate);
    }

    animate();
}

/* ==========================================================================
   4. SUBTLE PARALLAX TRANSITIONS
   ========================================================================== */
function initParallax() {
    const heroContent = document.querySelector('.hero-content');
    const floatingItems = document.querySelectorAll('.floating-item');

    // Mouse tilt parallax on desktop
    if (window.innerWidth > 768 && heroContent) {
        window.addEventListener('mousemove', (e) => {
            const xOffset = (e.clientX / window.innerWidth - 0.5) * 16;
            const yOffset = (e.clientY / window.innerHeight - 0.5) * 12;

            heroContent.style.transform = `translate3d(${xOffset * 0.4}px, ${yOffset * 0.4}px, 0)`;

            floatingItems.forEach((item, idx) => {
                const depth = (idx + 1) * 0.3;
                item.style.transform = `translate3d(${xOffset * depth}px, ${yOffset * depth}px, 0)`;
            });
        });
    }
}

/* ==========================================================================
   5. MOBILE NAVIGATION TOGGLE
   ========================================================================== */
function initMobileNav() {
    const burgerBtn = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (burgerBtn && mainNav) {
        burgerBtn.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('open');
            burgerBtn.setAttribute('aria-expanded', isOpen);
            burgerBtn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    mainNav.classList.remove('open');
                    burgerBtn.setAttribute('aria-expanded', 'false');
                    burgerBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
                }
            });
        });
    }
}

/* ==========================================================================
   6. SCROLL SPY (ACTIVE NAVBAR HIGHLIGHT)
   ========================================================================== */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.pageYOffset + 220;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === currentSectionId) {
                link.classList.add('active');
            }
        });
    });
}

/* ==========================================================================
   7. TYPEWRITER EFFECT IN HERO
   ========================================================================== */
function initTypewriter() {
    const el = document.getElementById('typewriterText');
    if (!el) return;

    const phrases = [
        "Full-Stack Software Engineer",
        "Distributed Systems Architect",
        "React & Node.js Specialist",
        "8-Bit & Creative Web Developer",
        "Problem Solver & Code Crafter"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            el.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            el.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 90;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000; // Complete pause
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/* ==========================================================================
   8. PROJECT MODALS DATA & VIEWER
   ========================================================================== */
const projectsDatabase = {
    1: {
        title: "CyberStore 2088",
        category: "Full-Stack Web App",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
        description: "CyberStore 2088 is a full-featured retro cyberpunk e-commerce platform built with React, Node.js, and PostgreSQL. It features real-time inventory management, Stripe checkout integration, JWT-based role authentication, and Redis caching for sub-50ms product catalog lookups.",
        stack: ["React", "Node.js", "Express", "PostgreSQL", "Redis", "Stripe API", "Docker"],
        metrics: "⚡ 50ms average latency | 🛡️ PCI-DSS compliant payment flow | 📈 99.9% uptime",
        liveUrl: "https://example.com/demo/cyberstore",
        repoUrl: "https://github.com"
    },
    2: {
        title: "AgentFlow AI Orchestrator",
        category: "Generative AI & Agentic Workflows",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
        description: "An intuitive visual node editor for designing, debugging, and executing multi-agent LLM reasoning workflows. Supports automatic code refactoring loops, tool calling, memory stores, and real-time streaming over WebSockets.",
        stack: ["Next.js", "TypeScript", "Python", "LangChain", "FastAPI", "WebSockets", "TailwindCSS"],
        metrics: "🤖 Up to 10 autonomous agents in parallel | ⚡ Token streaming support | 🧩 20+ built-in tool plugins",
        liveUrl: "https://example.com/demo/agentflow",
        repoUrl: "https://github.com"
    },
    3: {
        title: "PixelMetrics Telemetry",
        category: "DevOps & Infrastructure",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
        description: "A lightweight cloud server telemetry and observability suite designed with retro 8-bit styling. Integrates directly with Prometheus endpoints, docker daemon metrics, and custom webhook alert triggers.",
        stack: ["Go (Golang)", "TypeScript", "Docker", "Prometheus", "WebSockets", "Chart.js"],
        metrics: "📊 10,000 events/sec throughput | 📦 Under 15MB binary footprint | 🔔 Slack & Discord alert hooks",
        liveUrl: "https://example.com/demo/pixelmetrics",
        repoUrl: "https://github.com"
    },
    4: {
        title: "RetroQuest Engine",
        category: "Canvas 2D / Creative Tech",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
        description: "An HTML5 Canvas tile-based RPG game engine with spatial partitioning, custom collision maps, A* pathfinding, dialogue NPC systems, and a built-in chiptune audio synthesizer using the Web Audio API.",
        stack: ["JavaScript (ES6+)", "HTML5 Canvas", "Web Audio API", "Vite"],
        metrics: "🎮 Constant 60 FPS rendering | 🗺️ 100x100 tilemap support | 🔊 Zero external audio assets needed",
        liveUrl: "https://example.com/demo/retroquest",
        repoUrl: "https://github.com"
    }
};

function initProjectModals() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProjectModal();
        }
    });
}

function openProjectModal(projectId) {
    const project = projectsDatabase[projectId];
    if (!project) return;

    playBeep(700, 'square', 0.1);

    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalProjectContent');

    if (modalContent) {
        modalContent.innerHTML = `
            <img src="${project.image}" alt="${project.title} screenshot" class="modal-project-img">
            <span class="project-tag-pill" style="position:static; display:inline-block; margin-bottom:12px;">${project.category}</span>
            <h2 id="modalProjectTitle" class="modal-title">${project.title}</h2>
            <p class="modal-desc">${project.description}</p>
            
            <div style="margin-bottom:16px;">
                <strong style="font-family:var(--font-pixel-heading); font-size:0.68rem; color:var(--text-pixel);">KEY METRICS:</strong>
                <p style="font-size:0.9rem; color:var(--text-primary); margin-top:4px;">${project.metrics}</p>
            </div>

            <div style="margin-bottom:24px;">
                <strong style="font-family:var(--font-pixel-heading); font-size:0.68rem; color:var(--text-pixel);">TECH STACK:</strong>
                <div class="project-tech-tags" style="margin-top:8px;">
                    ${project.stack.map(tech => `<span>${tech}</span>`).join('')}
                </div>
            </div>

            <div class="modal-actions">
                <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="pixel-button primary-btn">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> LIVE DEMO
                </a>
                <a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="pixel-button secondary-btn">
                    <i class="fa-brands fa-github"></i> VIEW SOURCE CODE
                </a>
            </div>
        `;
    }

    if (modal) {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
}

function closeProjectModal() {
    playBeep(300, 'triangle', 0.08);
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

/* ==========================================================================
   9. INTERACTIVE AI CHAT ENGINE
   ========================================================================== */
function initChatSystem() {
    const clearBtn = document.getElementById('clearChatBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            playBeep(350, 'triangle', 0.1);
            const stream = document.getElementById('chatMessages');
            if (stream) {
                stream.innerHTML = `
                    <div class="chat-message bot-msg">
                        <div class="msg-avatar">👾</div>
                        <div class="msg-bubble pixel-bubble">
                            <div class="msg-sender">Abhay-Bot:</div>
                            <p>Chat memory refreshed! How can I assist you with Abhay's portfolio today?</p>
                            <span class="msg-timestamp">Just now</span>
                        </div>
                    </div>
                `;
            }
        });
    }
}

function sendSuggestedPrompt(text) {
    const input = document.getElementById('chatInput');
    if (input) {
        input.value = text;
        handleChatSubmit(new Event('submit'));
    }
}

async function handleChatSubmit(event) {
    event.preventDefault();
    const input = document.getElementById('chatInput');
    const sendBtn = document.getElementById('chatSendBtn');

    if (!input) return;

    const userText = input.value.trim();
    if (!userText) return;

    // 1. Append User Message
    appendChatMessage('user', userText);
    input.value = '';
    playBeep(650, 'square', 0.06);

    // 2. Show Typing Indicator
    const typingIndicatorId = appendTypingIndicator();
    if (sendBtn) sendBtn.disabled = true;

    // Simulated Thinking Delay (or live API hook)
    setTimeout(() => {
        removeTypingIndicator(typingIndicatorId);
        const botResponse = generateAIResponse(userText);
        appendChatMessage('bot', botResponse);
        if (sendBtn) sendBtn.disabled = false;
        playBeep(500, 'sine', 0.08);
    }, 700);
}

function generateAIResponse(query) {
    const q = query.toLowerCase();

    if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('language')) {
        return "Abhay's core stack includes TypeScript, JavaScript, Python, React, Next.js, Node.js, and SQL (PostgreSQL). He also has deep experience with Docker, AWS cloud architecture, and microservices!";
    }
    if (q.includes('project') || q.includes('portfolio') || q.includes('built') || q.includes('work')) {
        return "Abhay has built several production-grade applications including CyberStore 2088 (e-commerce), AgentFlow AI (multi-agent orchestrator), PixelMetrics (cloud telemetry), and RetroQuest Engine. Click 'Inspect Project' in the Projects section to see full details!";
    }
    if (q.includes('hire') || q.includes('available') || q.includes('job') || q.includes('contact') || q.includes('freelance')) {
        return "Abhay is currently open to high-impact full-time software engineering roles and select consulting projects. You can send him a direct message using the Contact form below or email him at abhay.engineer@example.com!";
    }
    if (q.includes('experience') || q.includes('career') || q.includes('education') || q.includes('degree')) {
        return "Abhay holds a B.Tech in Computer Science & Engineering and has 4+ years of hands-on software engineering experience ranging from high-scale SaaS architectures to frontend design.";
    }
    if (q.includes('hobby') || q.includes('hobbies') || q.includes('interest') || q.includes('game')) {
        return "Outside of coding, Abhay loves retro computing, 8-bit game development, mechanical keyboards, sci-fi worldbuilding, and generative AI research!";
    }
    if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
        return "Hey there! 👋 Nice to meet you. Ask me anything about Abhay's background, code repositories, or availability!";
    }

    return "That's an interesting question! Abhay specializes in crafting robust, scalable software architectures with modern TypeScript and Python. Would you like to check out his Projects, review his Career Timeline, or send him a message directly?";
}

function appendChatMessage(sender, text) {
    const stream = document.getElementById('chatMessages');
    if (!stream) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${sender === 'user' ? 'user-msg' : 'bot-msg'}`;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    msgDiv.innerHTML = `
        <div class="msg-avatar">${sender === 'user' ? '🧑‍💻' : '👾'}</div>
        <div class="msg-bubble pixel-bubble">
            <div class="msg-sender">${sender === 'user' ? 'You:' : 'Abhay-Bot:'}</div>
            <p>${escapeHTML(text)}</p>
            <span class="msg-timestamp">${timestamp}</span>
        </div>
    `;

    stream.appendChild(msgDiv);
    stream.scrollTop = stream.scrollHeight;
}

function appendTypingIndicator() {
    const stream = document.getElementById('chatMessages');
    if (!stream) return '';

    const id = 'typing-' + Date.now();
    const div = document.createElement('div');
    div.id = id;
    div.className = 'chat-message bot-msg';
    div.innerHTML = `
        <div class="msg-avatar">👾</div>
        <div class="msg-bubble pixel-bubble" style="color:var(--text-muted); font-family:var(--font-pixel-sub);">
            <span>Abhay-Bot is thinking...</span>
        </div>
    `;
    stream.appendChild(div);
    stream.scrollTop = stream.scrollHeight;
    return id;
}

function removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[tag] || tag));
}

/* ==========================================================================
   10. CONTACT FORM HANDLER
   ========================================================================== */
function initContactForm() {
    // Handled in handleContactSubmit()
}

function handleContactSubmit(event) {
    event.preventDefault();
    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const messageInput = document.getElementById('contactMessage');
    const feedback = document.getElementById('formFeedback');
    const submitBtn = document.getElementById('contactSubmitBtn');

    if (!nameInput || !emailInput || !messageInput || !feedback) return;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
        feedback.className = 'form-feedback error';
        feedback.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> PLEASE FILL IN ALL REQUIRED QUEST FIELDS!';
        feedback.classList.remove('hidden');
        playBeep(220, 'sawtooth', 0.15);
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        feedback.className = 'form-feedback error';
        feedback.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> PLEASE ENTER A VALID EMAIL ADDRESS!';
        feedback.classList.remove('hidden');
        playBeep(220, 'sawtooth', 0.15);
        return;
    }

    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> TRANSMITTING DISPATCH...';
    }

    // Simulated successful transmission
    setTimeout(() => {
        feedback.className = 'form-feedback success';
        feedback.innerHTML = `
            <strong><i class="fa-solid fa-circle-check"></i> DISPATCH RECEIVED SUCCESSFULLY!</strong>
            <p style="margin-top:4px;">Thank you, ${escapeHTML(name)}. Your message has been transmitted to Abhay's inbox. Expect a response within 24 hours!</p>
        `;
        feedback.classList.remove('hidden');

        playBeep(880, 'square', 0.2);

        document.getElementById('contactForm').reset();
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> TRANSMIT MESSAGE';
        }
    }, 900);
}

/* ==========================================================================
   11. FOOTER UTILITIES
   ========================================================================== */
function setCurrentYear() {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}
