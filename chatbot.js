/* ═══════════════════════════════════════════════
   DATA FORGE — FORGE Bot (Gamified Chatbot Engine)
   Mascot: F.O.R.G.E — Friendly Omniscient Retrieval & Guidance Entity
   ═══════════════════════════════════════════════ */

// ─── Knowledge Base ─────────────────────────────
const KB = {
  greetings: {
    patterns: ['hello', 'hi', 'hey', 'sup', 'yo', 'greetings', 'hola', 'howdy'],
    responses: [
      "Hey there, Data Explorer! 👋 I'm F.O.R.G.E — your personal Data Science guide! Ready to forge some knowledge? ⚡",
      "Welcome, future data scientist! 🔥 The forge is hot and I'm ready to help. What would you like to learn today?",
      "Hello, human! 🤖 I'm F.O.R.G.E, the official mascot of Data Forge at SRM IST Trichy. Ask me anything!",
    ]
  },
  about: {
    patterns: ['what is data forge', 'about data forge', 'tell me about', 'who are you', 'what is this club', 'about the club'],
    responses: [
      "🔥 **Data Forge** is the official Data Science Club of SRM IST, Tiruchirapalli! We're a student-led collective obsessed with turning raw data into powerful insight — across every branch, every year, every background.\n\n📌 We cover ML, Big Data, Analytics, Business Intelligence, and more!",
    ]
  },
  join: {
    patterns: ['how to join', 'join the club', 'become member', 'membership', 'sign up', 'register', 'enroll'],
    responses: [
      "🎉 Ready to join the forge? It's super easy!\n\n1️⃣ Click **Join Data Forge** button above\n2️⃣ Join our WhatsApp community\n3️⃣ Attend our orientation session\n\n✅ Open to **ALL branches & ALL skill levels**! No prior data science experience needed.",
    ]
  },
  activities: {
    patterns: ['activities', 'what do you do', 'events', 'workshops', 'bootcamp', 'datathon', 'competition', 'what happens'],
    responses: [
      "⚡ We do some seriously cool stuff!\n\n📅 **Dataset of the Month** — Monthly data story presentations\n📖 **Research Paper Circle** — Weekly ML paper discussions\n💼 **Business Case Analysis** — Bi-weekly real-world cases\n🧩 **Analytics Challenges** — Weekly gamified puzzles\n🛠️ **Workshops** — Python, SQL, Tableau, Power BI\n⚡ **Datathons** — Hackathon-style competitions\n\nWhich one excites you the most? 😄",
    ]
  },
  domains: {
    patterns: ['who can join', 'branches', 'domains', 'computer science', 'electronics', 'mechanical', 'civil', 'all branches', 'my branch'],
    responses: [
      "🌐 Data Science applies to **EVERY ENGINEERING BRANCH**!\n\n💻 CS → ML pipelines, AI systems\n📡 Electronics → Sensor analytics, IoT\n⚙️ Mechanical → Predictive maintenance\n🏗️ Civil → Smart city analytics\n📈 Business → Market intelligence\n🏥 Healthcare → Clinical decision support\n💹 Finance → Risk analytics\n\nWhatever you study, data makes it better! 🚀",
    ]
  },
  python: {
    patterns: ['python', 'learn python', 'programming', 'coding', 'pandas', 'numpy', 'tensorflow'],
    responses: [
      "🐍 Python is the bread and butter of Data Science! Here at Data Forge, we teach:\n\n• **Pandas** — Data manipulation\n• **NumPy** — Numerical computing\n• **Matplotlib/Seaborn** — Visualization\n• **Scikit-learn** — Machine Learning\n• **TensorFlow/PyTorch** — Deep Learning\n\n💡 Pro tip: Start with pandas and you'll be unstoppable! Join our Python workshops to get started! 🔥",
    ]
  },
  ml: {
    patterns: ['machine learning', 'ml', 'ai', 'artificial intelligence', 'deep learning', 'neural network', 'model'],
    responses: [
      "🤖 Machine Learning is at the core of what we do!\n\n**What you'll learn:**\n• Supervised & Unsupervised Learning\n• Neural Networks & Deep Learning\n• Natural Language Processing\n• Computer Vision\n• Model Deployment\n\n🏆 We even host ML competitions where you can win prizes! Ready to build your first model?",
    ]
  },
  sql: {
    patterns: ['sql', 'database', 'data engineering', 'big data', 'hadoop', 'spark', 'queries'],
    responses: [
      "🗄️ Data Engineering is the backbone of analytics!\n\n**Topics we cover:**\n• SQL & Advanced Queries\n• Database Design\n• Apache Spark & Hadoop\n• Data Pipelines\n• Cloud Data Platforms (AWS, GCP)\n\n💪 Strong SQL skills = strong data career. Our workshops cover this in depth!",
    ]
  },
  visualization: {
    patterns: ['visualization', 'tableau', 'power bi', 'graphs', 'charts', 'dashboard', 'plotting'],
    responses: [
      "📊 Data Visualization is storytelling with numbers!\n\n**Tools we teach:**\n• **Tableau** — Drag & drop dashboards\n• **Power BI** — Microsoft's analytics tool\n• **Matplotlib/Seaborn** — Python plotting\n• **Plotly** — Interactive web charts\n\n🎨 Great visualizations can change decisions! We have dedicated workshops for all these tools.",
    ]
  },
  career: {
    patterns: ['career', 'job', 'placement', 'internship', 'salary', 'data scientist', 'future', 'opportunities'],
    responses: [
      "🚀 Data Science careers are 🔥 right now!\n\n**Top roles you can aim for:**\n• Data Scientist — Avg ₹12-25 LPA\n• ML Engineer — Avg ₹15-30 LPA\n• Data Analyst — Avg ₹6-15 LPA\n• Data Engineer — Avg ₹12-22 LPA\n\n💼 Data Forge connects you with **industry professionals** and helps you build a portfolio that gets noticed. Your future self will thank you! 📈",
    ]
  },
  contact: {
    patterns: ['contact', 'reach out', 'email', 'whatsapp', 'social media', 'instagram', 'linkedin', 'connect'],
    responses: [
      "📬 Want to reach us?\n\n• **WhatsApp Community** — Join via the button on this page\n• **Instagram** — @dataforge_srm\n• **LinkedIn** — Data Forge SRM IST Trichy\n\n💬 Or just keep chatting with me! I'm available 24/7, unlike humans 😄",
    ]
  },
  quiz: {
    patterns: ['quiz', 'test me', 'question', 'challenge', 'trivia', 'game', 'play'],
    type: 'quiz',
    responses: ["Let's play! 🎮 Here comes a Data Science challenge!"]
  },
  feedback: {
    patterns: ['feedback', 'rate', 'review', 'suggest', 'improve', 'opinion', 'thoughts'],
    type: 'feedback',
    responses: ["Thanks for wanting to help us improve! 💚"]
  },
  thanks: {
    patterns: ['thank', 'thanks', 'ty', 'appreciate', 'awesome', 'great', 'helpful'],
    responses: [
      "Anytime, Data Explorer! 🔥 That's what I'm forged for! Anything else you'd like to know?",
      "You're welcome! 💚 Keep forging ahead — the data world is yours to conquer! 🚀",
      "Happy to help! 😊 Remember, every data scientist started exactly where you are now. Keep going!",
    ]
  },
  bye: {
    patterns: ['bye', 'goodbye', 'see you', 'later', 'exit', 'quit', 'close'],
    responses: [
      "Forge on, Data Explorer! ⚡ Come back anytime — I'll be right here, processing petabytes of knowledge for you! 👋",
      "Until next time! 🔥 Remember: Data Forge is your gateway to the data world. Goodbye! 💚",
    ]
  },
};

// ─── Quiz Questions ────────────────────────────
const QUIZ_QUESTIONS = [
  {
    q: "🧠 What does ML stand for in Data Science?",
    options: ["Machine Language", "Machine Learning", "Macro Logic", "Meta Learning"],
    correct: 1,
    xp: 20,
    explanation: "Machine Learning! It's the study of algorithms that improve through experience. 🤖"
  },
  {
    q: "📊 Which Python library is primarily used for data manipulation?",
    options: ["NumPy", "Matplotlib", "Pandas", "Scikit-learn"],
    correct: 2,
    xp: 15,
    explanation: "Pandas! It's the go-to library for data wrangling with DataFrames. 🐼"
  },
  {
    q: "🔢 What does SQL stand for?",
    options: ["Structured Query Language", "Simple Query Logic", "System Quality Layer", "Sequential Query Loop"],
    correct: 0,
    xp: 10,
    explanation: "Structured Query Language! The language of databases. 🗄️"
  },
  {
    q: "📉 In statistics, what does 'mean' refer to?",
    options: ["The most frequent value", "The middle value", "The average value", "The range of values"],
    correct: 2,
    xp: 10,
    explanation: "The mean is the average — sum all values and divide by count! 📐"
  },
  {
    q: "🤖 Which of these is NOT a type of Machine Learning?",
    options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Compiled Learning"],
    correct: 3,
    xp: 25,
    explanation: "Compiled Learning doesn't exist! The 3 main types are Supervised, Unsupervised, and Reinforcement. 🎯"
  },
  {
    q: "🏆 Which visualization tool is developed by Microsoft?",
    options: ["Tableau", "Power BI", "Plotly", "Seaborn"],
    correct: 1,
    xp: 15,
    explanation: "Power BI! It's Microsoft's flagship business intelligence and analytics tool. 📊"
  },
  {
    q: "⚡ What is a 'DataFrame' in Pandas?",
    options: ["A type of chart", "A 2D labeled data structure", "A deep learning model", "A database connection"],
    correct: 1,
    xp: 20,
    explanation: "A DataFrame is a 2D table-like structure — the heart of Pandas! Think of it like Excel in Python. 📋"
  },
  {
    q: "🌐 Big Data is characterized by which '3 Vs'?",
    options: ["Volume, Velocity, Variety", "Value, Vision, Validation", "Vector, Variable, Variance", "Virtual, Verified, Volatile"],
    correct: 0,
    xp: 30,
    explanation: "Volume (size), Velocity (speed), Variety (types)! These are the classic 3 Vs of Big Data. 🔥"
  }
];

// ─── Badges System ────────────────────────────
const BADGES = [
  { id: 'first_chat',    name: 'First Contact',     icon: '👋', desc: 'Started your first conversation',     xp: 0   },
  { id: 'curious',      name: 'Curious Coder',      icon: '🔍', desc: 'Asked 5 different questions',         xp: 25  },
  { id: 'quiz_pass',    name: 'Data Apprentice',    icon: '🏅', desc: 'Answered your first quiz correctly',  xp: 10  },
  { id: 'quiz_streak',  name: 'Data Warrior',       icon: '⚔️', desc: 'Got 3 quiz answers correct in a row', xp: 30  },
  { id: 'quiz_master',  name: 'Data Master',        icon: '🏆', desc: 'Scored 100+ XP in quizzes',           xp: 50  },
  { id: 'feedback',     name: 'Community Builder',  icon: '💚', desc: 'Gave feedback to Data Forge',         xp: 20  },
  { id: 'explorer',     name: 'Data Explorer',      icon: '🚀', desc: 'Explored 3+ different topics',        xp: 15  },
  { id: 'forge_fan',    name: 'Forge Fan',          icon: '🔥', desc: 'Chatted for 10+ messages',            xp: 25  },
];

// ─── State ─────────────────────────────────────
const state = {
  xp: 0,
  level: 1,
  badges: new Set(),
  msgCount: 0,
  topicsExplored: new Set(),
  quizStreak: 0,
  quizXP: 0,
  inQuiz: false,
  currentQuiz: null,
  quizIndex: 0,
  inFeedback: false,
  feedbackStep: 0,
  feedbackData: {},
  isOpen: false,
  isTyping: false,
  hasShownWelcome: false,
};

const XP_PER_LEVEL = 100;

// ─── Utilities ─────────────────────────────────
function getLevel(xp) {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}
function getLevelTitle(level) {
  const titles = ['Novice', 'Data Cadet', 'Data Scout', 'Data Analyst', 'Data Scientist', 'Data Guru', 'Data Sage', 'Data Forge Master'];
  return titles[Math.min(level - 1, titles.length - 1)];
}
function getLevelProgressPct() {
  return ((state.xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100;
}

function addXP(amount, label) {
  const oldLevel = state.level;
  state.xp += amount;
  state.level = getLevel(state.xp);
  updateHUD();
  if (state.level > oldLevel) {
    setTimeout(() => showLevelUp(state.level), 400);
  }
  if (label) showXPToast(amount, label);
}

function awardBadge(id) {
  if (state.badges.has(id)) return false;
  const badge = BADGES.find(b => b.id === id);
  if (!badge) return false;
  state.badges.add(id);
  addXP(badge.xp, `Badge: ${badge.name}`);
  showBadgeNotif(badge);
  return true;
}

function randFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function matchIntent(text) {
  const lower = text.toLowerCase().trim();
  for (const [key, data] of Object.entries(KB)) {
    if (data.patterns && data.patterns.some(p => lower.includes(p))) {
      return { key, data };
    }
  }
  return null;
}

// ─── DOM Helpers ───────────────────────────────
function el(id) { return document.getElementById(id); }
function qs(sel, root) { return (root || document).querySelector(sel); }
function qsa(sel, root) { return [...(root || document).querySelectorAll(sel)]; }

// ─── UI Update ─────────────────────────────────
function updateHUD() {
  const xpEl = el('forge-xp-val');
  const lvlEl = el('forge-level-val');
  const progEl = el('forge-progress-fill');
  const titleEl = el('forge-level-title');
  const badgeCntEl = el('forge-badge-count');

  if (xpEl) xpEl.textContent = state.xp;
  if (lvlEl) lvlEl.textContent = state.level;
  if (progEl) progEl.style.width = getLevelProgressPct() + '%';
  if (titleEl) titleEl.textContent = getLevelTitle(state.level);
  if (badgeCntEl) badgeCntEl.textContent = state.badges.size + '/' + BADGES.length;
}

function showXPToast(amount, label) {
  const toast = document.createElement('div');
  toast.className = 'forge-xp-toast';
  toast.innerHTML = `<span>+${amount} XP</span><small>${label}</small>`;
  el('forge-chat-window').appendChild(toast);
  setTimeout(() => toast.remove(), 2200);
}

function showLevelUp(level) {
  const el2 = document.createElement('div');
  el2.className = 'forge-levelup-toast';
  el2.innerHTML = `
    <div class="lu-icon">⚡</div>
    <div class="lu-text">
      <strong>LEVEL UP!</strong>
      <span>You're now Level ${level} — ${getLevelTitle(level)}!</span>
    </div>
  `;
  el('forge-chat-window').appendChild(el2);
  setTimeout(() => el2.remove(), 3500);
}

function showBadgeNotif(badge) {
  const n = document.createElement('div');
  n.className = 'forge-badge-notif';
  n.innerHTML = `
    <span class="bn-icon">${badge.icon}</span>
    <div class="bn-text">
      <strong>Badge Unlocked!</strong>
      <span>${badge.name}</span>
    </div>
  `;
  el('forge-chat-window').appendChild(n);
  setTimeout(() => n.remove(), 3500);
}

// ─── Message Rendering ─────────────────────────
function addMessage(role, content, opts = {}) {
  const msgs = el('forge-messages');
  const wrap = document.createElement('div');
  wrap.className = `forge-msg forge-msg-${role}`;

  const inner = document.createElement('div');
  inner.className = 'forge-msg-inner';

  if (role === 'bot') {
    const avatar = document.createElement('div');
    avatar.className = 'forge-avatar-sm';
    avatar.innerHTML = `<img src="forge-mascot.png" alt="F.O.R.G.E" />`;
    inner.appendChild(avatar);
  }

  const bubble = document.createElement('div');
  bubble.className = 'forge-bubble';
  bubble.innerHTML = markdownLite(content);

  if (opts.buttons) {
    const btnRow = document.createElement('div');
    btnRow.className = 'forge-btn-row';
    opts.buttons.forEach(btn => {
      const b = document.createElement('button');
      b.className = 'forge-quick-btn';
      b.innerHTML = btn.label;
      b.setAttribute('data-action', btn.action);
      b.addEventListener('click', () => handleQuickAction(btn.action, btn.label));
      btnRow.appendChild(b);
    });
    bubble.appendChild(btnRow);
  }

  if (opts.quiz) renderQuizInBubble(bubble, opts.quiz);
  if (opts.feedback) renderFeedbackInBubble(bubble, opts.feedback);
  if (opts.stars) renderStarsInBubble(bubble, opts.stars);

  inner.appendChild(bubble);
  wrap.appendChild(inner);
  msgs.appendChild(wrap);
  msgs.scrollTop = msgs.scrollHeight;
  return bubble;
}

function showTyping() {
  const msgs = el('forge-messages');
  const wrap = document.createElement('div');
  wrap.className = 'forge-msg forge-msg-bot';
  wrap.id = 'forge-typing-indicator';
  wrap.innerHTML = `
    <div class="forge-msg-inner">
      <div class="forge-avatar-sm"><img src="forge-mascot.png" alt="F.O.R.G.E" /></div>
      <div class="forge-bubble forge-typing">
        <span></span><span></span><span></span>
      </div>
    </div>
  `;
  msgs.appendChild(wrap);
  msgs.scrollTop = msgs.scrollHeight;
}

function hideTyping() {
  const t = el('forge-typing-indicator');
  if (t) t.remove();
}

function markdownLite(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');
}

// ─── Quiz Rendering ────────────────────────────
function renderQuizInBubble(bubble, qData) {
  const qDiv = document.createElement('div');
  qDiv.className = 'forge-quiz-block';
  qDiv.innerHTML = `<p class="quiz-q">${qData.q}</p>`;

  const opts = document.createElement('div');
  opts.className = 'quiz-options';
  qData.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt-btn';
    btn.textContent = opt;
    btn.addEventListener('click', () => handleQuizAnswer(i, qData, opts, btn));
    opts.appendChild(btn);
  });

  const xpBadge = document.createElement('div');
  xpBadge.className = 'quiz-xp-badge';
  xpBadge.innerHTML = `⚡ +${qData.xp} XP if correct`;

  qDiv.appendChild(opts);
  qDiv.appendChild(xpBadge);
  bubble.appendChild(qDiv);
}

function handleQuizAnswer(idx, qData, optsEl, clickedBtn) {
  const btns = qsa('.quiz-opt-btn', optsEl);
  btns.forEach(b => b.disabled = true);

  if (idx === qData.correct) {
    clickedBtn.classList.add('quiz-correct');
    state.quizStreak++;
    state.quizXP += qData.xp;
    addXP(qData.xp, 'Correct Answer!');

    // Badge checks
    if (!state.badges.has('quiz_pass')) awardBadge('quiz_pass');
    if (state.quizStreak >= 3) awardBadge('quiz_streak');
    if (state.quizXP >= 100) awardBadge('quiz_master');

    setTimeout(() => {
      addMessage('bot', `✅ **Correct!** +${qData.xp} XP 🎉\n\n💡 ${qData.explanation}\n\nWant another challenge? Type **quiz** or ask me anything else! 🚀`);
    }, 600);
  } else {
    clickedBtn.classList.add('quiz-wrong');
    btns[qData.correct].classList.add('quiz-correct');
    state.quizStreak = 0;

    setTimeout(() => {
      addMessage('bot', `❌ Not quite! The correct answer was **${qData.options[qData.correct]}**.\n\n💡 ${qData.explanation}\n\nDon't worry — every mistake is a learning opportunity! Try another? 💪`);
    }, 600);
  }
  state.inQuiz = false;
}

// ─── Feedback Rendering ────────────────────────
function renderFeedbackInBubble(bubble, step) {
  if (step === 1) {
    const ratingDiv = document.createElement('div');
    ratingDiv.className = 'forge-rating';
    ratingDiv.innerHTML = `<p>How would you rate Data Forge overall?</p>`;
    const stars = document.createElement('div');
    stars.className = 'rating-stars';
    for (let i = 1; i <= 5; i++) {
      const s = document.createElement('button');
      s.className = 'star-btn';
      s.textContent = '★';
      s.setAttribute('data-val', i);
      s.addEventListener('click', () => {
        state.feedbackData.rating = i;
        qsa('.star-btn', stars).forEach((sb, idx) => {
          sb.classList.toggle('star-active', idx < i);
        });
        setTimeout(() => handleFeedbackStep2(), 700);
      });
      stars.appendChild(s);
    }
    ratingDiv.appendChild(stars);
    bubble.appendChild(ratingDiv);
  }
}

function renderStarsInBubble(bubble, data) {
  const inp = document.createElement('div');
  inp.className = 'forge-text-feedback';
  inp.innerHTML = `<p>What would make Data Forge even better? (optional)</p>`;
  const ta = document.createElement('textarea');
  ta.className = 'forge-feedback-ta';
  ta.placeholder = 'Share your thoughts...';
  ta.rows = 3;
  const sendBtn = document.createElement('button');
  sendBtn.className = 'forge-quick-btn forge-send-feedback';
  sendBtn.textContent = '📤 Submit Feedback';
  sendBtn.addEventListener('click', () => {
    state.feedbackData.text = ta.value;
    handleFeedbackSubmit();
  });
  inp.appendChild(ta);
  inp.appendChild(sendBtn);
  bubble.appendChild(inp);
}

function handleFeedbackStep2() {
  addMessage('bot', `${'⭐'.repeat(state.feedbackData.rating)} Thanks for the ${state.feedbackData.rating}-star rating!\n\nOne more thing...`, { stars: true });
}

function handleFeedbackSubmit() {
  awardBadge('feedback');
  addXP(10, 'Feedback Given');
  setTimeout(() => {
    addMessage('bot', `🙏 **Thank you for your feedback!**\n\nYour input helps Data Forge become better for everyone. You've earned the **Community Builder** badge! 💚\n\nIs there anything else I can help you with?`);
    state.inFeedback = false;
  }, 500);
}

// ─── Quick Action Handler ──────────────────────
function handleQuickAction(action, label) {
  addMessage('user', label);
  processInput(action);
}

// ─── Core Response Logic ───────────────────────
function processInput(text) {
  if (state.inFeedback) return;

  state.msgCount++;
  if (state.msgCount >= 10) awardBadge('forge_fan');

  const lower = text.toLowerCase().trim();

  // Quiz trigger
  if (lower.includes('quiz') || lower.includes('test me') || lower.includes('challenge') || lower.includes('play')) {
    triggerQuiz();
    return;
  }

  // Feedback trigger
  if (lower.includes('feedback') || lower.includes('rate') || lower.includes('review') || lower.includes('suggest')) {
    triggerFeedback();
    return;
  }

  // Match knowledge base
  const match = matchIntent(lower);
  if (match) {
    const { key, data } = match;
    state.topicsExplored.add(key);
    if (state.topicsExplored.size >= 3) awardBadge('explorer');
    if (state.topicsExplored.size >= 5) awardBadge('curious');

    addXP(5, 'Learned something new!');

    const response = randFrom(data.responses);
    botReply(response, getFollowUpButtons(key));
    return;
  }

  // Fallback
  const fallbacks = [
    "Hmm, I'm still learning! 🤔 Try asking me about:\n\n• **Data Forge** club\n• **How to Join**\n• **Activities & Events**\n• **Python, ML, SQL**\n• **Career paths**\n\nOr type **quiz** to test your skills! 🎮",
    "That's beyond my current neural weights! 😅 But I can help with anything about Data Forge, Data Science topics, or even test your knowledge with a **quiz**! 🧠",
    "Interesting question! I'm still being trained on that. 🤖 Try asking about our **activities**, **domains**, or type **quiz** to play! ⚡",
  ];
  botReply(randFrom(fallbacks));
}

function triggerQuiz() {
  state.inQuiz = true;
  const q = QUIZ_QUESTIONS[Math.floor(Math.random() * QUIZ_QUESTIONS.length)];
  botReply("🎮 **QUIZ TIME!** Let's test your Data Science knowledge!\n\nFor each correct answer, you earn XP and climb the ranks! Ready?", [], {quiz: q});
}

function triggerFeedback() {
  state.inFeedback = true;
  botReply("💬 **Your feedback matters!** It helps Data Forge grow. Let's start with a rating...", [], {feedback: 1});
}

function getFollowUpButtons(key) {
  const suggestions = {
    about:      [{ label: '🎉 How to Join?', action: 'how to join' }, { label: '📅 Activities', action: 'activities' }],
    join:       [{ label: '📋 About Club', action: 'about data forge' }, { label: '💼 What activities?', action: 'activities' }],
    activities: [{ label: '🐍 Learn Python', action: 'python' }, { label: '🤖 ML Topics', action: 'machine learning' }],
    python:     [{ label: '🤖 Machine Learning', action: 'machine learning' }, { label: '🎮 Quiz me!', action: 'quiz' }],
    ml:         [{ label: '🐍 Python Tools', action: 'python' }, { label: '🎮 Quiz me!', action: 'quiz' }],
    domains:    [{ label: '📖 Learn More', action: 'activities' }, { label: '🚀 Join Now', action: 'how to join' }],
    career:     [{ label: '🤖 Learn ML', action: 'machine learning' }, { label: '🎉 Join Forge', action: 'how to join' }],
  };
  return suggestions[key] || [{ label: '🎮 Try a Quiz!', action: 'quiz' }, { label: '📬 Contact Us', action: 'contact' }];
}

function botReply(text, buttons = [], extras = {}) {
  showTyping();
  const delay = 800 + Math.min(text.length * 10, 1200);
  setTimeout(() => {
    hideTyping();
    const opts = { buttons: buttons && buttons.length ? buttons : undefined, ...extras };
    addMessage('bot', text, opts);
  }, delay);
}

// ─── Chatbot Widget Init ───────────────────────
function initForgeBot() {
  injectChatStyles();
  buildChatWidget();
  bindEvents();

  // Welcome pulse
  setTimeout(() => {
    const launcher = el('forge-launcher');
    if (launcher) launcher.classList.add('forge-pulse');
  }, 2000);
}

function buildChatWidget() {
  const wrapper = document.createElement('div');
  wrapper.id = 'forge-chat-wrapper';
  wrapper.innerHTML = `
    <!-- Launcher Button -->
    <button id="forge-launcher" aria-label="Open Data Forge Chat">
      <div class="forge-launcher-inner">
        <div class="forge-launcher-ring"></div>
        <img src="forge-mascot.png" alt="F.O.R.G.E" id="forge-launcher-img" />
        <span class="forge-launcher-badge" id="forge-notif-badge">1</span>
      </div>
      <div class="forge-launcher-text">
        <span class="forge-launcher-name">F.O.R.G.E</span>
        <span class="forge-launcher-sub">Ask me anything ⚡</span>
      </div>
    </button>

    <!-- Chat Window -->
    <div id="forge-chat-window" class="forge-closed" role="dialog" aria-label="F.O.R.G.E Chatbot">
      <!-- Header -->
      <div id="forge-chat-header">
        <div class="forge-header-left">
          <div class="forge-header-avatar">
            <img src="forge-mascot.png" alt="F.O.R.G.E" />
            <span class="forge-online-dot"></span>
          </div>
          <div class="forge-header-info">
            <strong>F.O.R.G.E</strong>
            <span>Data Forge AI · <em id="forge-level-title">Novice</em></span>
          </div>
        </div>
        <div class="forge-header-right">
          <button id="forge-badges-btn" title="View Badges" aria-label="View Badges">
            🏅 <span id="forge-badge-count">0/8</span>
          </button>
          <button id="forge-close-btn" aria-label="Close Chat">✕</button>
        </div>
      </div>

      <!-- HUD / XP Bar -->
      <div id="forge-hud">
        <div class="hud-left">
          <span class="hud-label">LVL</span>
          <span class="hud-val" id="forge-level-val">1</span>
        </div>
        <div class="hud-center">
          <div class="forge-xp-bar">
            <div class="forge-xp-fill" id="forge-progress-fill" style="width:0%"></div>
          </div>
        </div>
        <div class="hud-right">
          <span class="hud-label">XP</span>
          <span class="hud-val" id="forge-xp-val">0</span>
        </div>
      </div>

      <!-- Messages -->
      <div id="forge-messages"></div>

      <!-- Badges Panel (hidden by default) -->
      <div id="forge-badges-panel" class="forge-panel-closed">
        <div class="badges-panel-header">🏅 Your Badges <button id="forge-badges-close">✕</button></div>
        <div id="forge-badges-grid"></div>
      </div>

      <!-- Input -->
      <div id="forge-input-area">
        <div id="forge-quick-prompts">
          <button class="forge-chip" data-action="about data forge">🔥 About</button>
          <button class="forge-chip" data-action="how to join">🎉 Join</button>
          <button class="forge-chip" data-action="activities">📅 Activities</button>
          <button class="forge-chip" data-action="quiz">🎮 Quiz</button>
          <button class="forge-chip" data-action="python">🐍 Python</button>
          <button class="forge-chip" data-action="machine learning">🤖 ML</button>
        </div>
        <div id="forge-input-row">
          <input type="text" id="forge-input" placeholder="Ask me anything..." autocomplete="off" />
          <button id="forge-send-btn" aria-label="Send message">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
        <div id="forge-footer-brand">Powered by <strong>Data Forge</strong> · SRM IST Trichy ⚡</div>
      </div>
    </div>
  `;
  document.body.appendChild(wrapper);
}

// ─── Event Binding ─────────────────────────────
function bindEvents() {
  const launcher   = el('forge-launcher');
  const closeBtn   = el('forge-close-btn');
  const sendBtn    = el('forge-send-btn');
  const input      = el('forge-input');
  const badgesBtn  = el('forge-badges-btn');
  const badgesClose = el('forge-badges-close');
  const chips      = qsa('.forge-chip');

  launcher.addEventListener('click', toggleChat);
  closeBtn.addEventListener('click', closeChat);
  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') handleSend(); });
  badgesBtn.addEventListener('click', toggleBadgesPanel);
  badgesClose.addEventListener('click', toggleBadgesPanel);
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const action = chip.getAttribute('data-action');
      addMessage('user', chip.textContent.trim());
      processInput(action);
    });
  });
}

function handleSend() {
  const input = el('forge-input');
  const text = input.value.trim();
  if (!text) return;
  addMessage('user', text);
  input.value = '';
  processInput(text);
}

function toggleChat() {
  if (state.isOpen) {
    closeChat();
  } else {
    openChat();
  }
}

function openChat() {
  state.isOpen = true;
  el('forge-chat-window').classList.remove('forge-closed');
  el('forge-chat-window').classList.add('forge-open');
  el('forge-launcher').classList.add('forge-launcher-active');
  el('forge-notif-badge').style.display = 'none';
  el('forge-input').focus();

  if (!state.hasShownWelcome) {
    state.hasShownWelcome = true;
    awardBadge('first_chat');
    setTimeout(() => {
      addMessage('bot',
        "Hey there, Data Explorer! 👋 I'm **F.O.R.G.E** — *Friendly Omniscient Retrieval & Guidance Entity* — the official AI mascot of **Data Forge**!\n\n🔥 I'm here to help you learn about Data Science, answer your questions, and even quiz you!\n\n💡 **You earn XP and badges** as you chat — level up by exploring topics and crushing quizzes!\n\nWhat would you like to know? 🚀",
        {
          buttons: [
            { label: '🔥 About Data Forge', action: 'about data forge' },
            { label: '🎉 How to Join', action: 'how to join' },
            { label: '🎮 Quiz Me!', action: 'quiz' },
          ]
        }
      );
    }, 600);
  }
}

function closeChat() {
  state.isOpen = false;
  el('forge-chat-window').classList.add('forge-closed');
  el('forge-chat-window').classList.remove('forge-open');
  el('forge-launcher').classList.remove('forge-launcher-active');
}

function toggleBadgesPanel() {
  const panel = el('forge-badges-panel');
  const isOpen = !panel.classList.contains('forge-panel-closed');

  if (!isOpen) {
    panel.classList.add('forge-panel-closed');
  } else {
    // Render badges
    const grid = el('forge-badges-grid');
    grid.innerHTML = '';
    BADGES.forEach(b => {
      const earned = state.badges.has(b.id);
      const item = document.createElement('div');
      item.className = `badge-item ${earned ? 'badge-earned' : 'badge-locked'}`;
      item.innerHTML = `
        <div class="badge-icon">${earned ? b.icon : '🔒'}</div>
        <div class="badge-info">
          <strong>${b.name}</strong>
          <small>${b.desc}</small>
          ${b.xp > 0 ? `<span class="badge-xp">+${b.xp} XP</span>` : ''}
        </div>
      `;
      grid.appendChild(item);
    });
    panel.classList.remove('forge-panel-closed');
  }
}

// ─── CSS Injection ─────────────────────────────
function injectChatStyles() {
  const style = document.createElement('style');
  style.id = 'forge-bot-styles';
  style.textContent = `
    /* ── Wrapper ── */
    #forge-chat-wrapper {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 99999;
      font-family: 'Space Grotesk', sans-serif;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 12px;
    }

    /* ── Launcher — Pill Card Design ── */
    #forge-launcher {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 18px 10px 10px;
      border-radius: 50px;
      border: 1.5px solid rgba(57,255,20,.35);
      background: linear-gradient(135deg, #0a1f0a 0%, #0f2d0f 60%, #1a3a1a 100%);
      box-shadow: 0 0 0 0 rgba(57,255,20,.4), 0 8px 32px rgba(0,0,0,.7), inset 0 1px 0 rgba(57,255,20,.08);
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s, border-color .3s;
    }
    /* animated shimmer sweep */
    #forge-launcher::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(105deg, transparent 40%, rgba(57,255,20,.08) 50%, transparent 60%);
      transform: translateX(-100%);
      transition: transform .5s;
    }
    #forge-launcher:hover::before { transform: translateX(100%); }
    #forge-launcher:hover {
      transform: translateY(-3px) scale(1.03);
      border-color: rgba(57,255,20,.7);
      box-shadow: 0 0 0 4px rgba(57,255,20,.12), 0 12px 40px rgba(57,255,20,.2), 0 16px 48px rgba(0,0,0,.6);
    }
    #forge-launcher.forge-launcher-active {
      border-color: #39ff14;
      box-shadow: 0 0 0 3px rgba(57,255,20,.2), 0 8px 32px rgba(57,255,20,.25);
    }
    /* Avatar circle inside pill */
    .forge-launcher-inner {
      position: relative;
      width: 44px;
      height: 44px;
      flex-shrink: 0;
    }
    .forge-launcher-ring {
      position: absolute;
      inset: -3px;
      border-radius: 50%;
      border: 2px solid transparent;
      border-top-color: #39ff14;
      border-right-color: rgba(57,255,20,.3);
      animation: launcherSpin 2.5s linear infinite;
    }
    @keyframes launcherSpin { to { transform: rotate(360deg); } }
    #forge-launcher-img {
      width: 44px;
      height: 44px;
      object-fit: cover;
      border-radius: 50%;
      border: 2px solid rgba(57,255,20,.4);
      filter: drop-shadow(0 0 6px rgba(57,255,20,.5));
      position: relative;
      z-index: 1;
    }
    /* Text inside pill */
    .forge-launcher-text {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1px;
    }
    .forge-launcher-name {
      font-family: 'Orbitron', sans-serif;
      font-size: .72rem;
      font-weight: 800;
      color: #39ff14;
      letter-spacing: .1em;
      text-shadow: 0 0 10px rgba(57,255,20,.6);
      line-height: 1;
    }
    .forge-launcher-sub {
      font-size: .62rem;
      color: #7aab7a;
      letter-spacing: .04em;
      line-height: 1;
    }
    /* Notification badge */
    .forge-launcher-badge {
      position: absolute;
      top: 6px;
      right: 6px;
      width: 16px; height: 16px;
      background: #39ff14;
      color: #030803;
      font-size: .58rem;
      font-weight: 800;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1.5px solid #0a1f0a;
      animation: badgePop .4s cubic-bezier(.34,1.56,.64,1);
    }
    @keyframes badgePop { from { transform: scale(0); } to { transform: scale(1); } }

    /* Pulse animation */
    @keyframes forgePulse {
      0%   { box-shadow: 0 0 0 0 rgba(57,255,20,.5), 0 8px 32px rgba(0,0,0,.6); }
      70%  { box-shadow: 0 0 0 14px rgba(57,255,20,0), 0 8px 32px rgba(0,0,0,.6); }
      100% { box-shadow: 0 0 0 0 rgba(57,255,20,0), 0 8px 32px rgba(0,0,0,.6); }
    }
    #forge-launcher.forge-pulse { animation: forgePulse 1.5s ease-out 3; }

    /* ── Chat Window ── */
    #forge-chat-window {
      position: fixed;
      bottom: 100px;
      right: 24px;
      width: 390px;
      height: min(620px, calc(100vh - 120px));
      max-height: calc(100vh - 120px);
      background: #060e06;
      border: 1px solid rgba(57,255,20,.2);
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 32px 80px rgba(0,0,0,.8), 0 0 0 1px rgba(57,255,20,.15);
      transform-origin: bottom right;
      transition: transform .35s cubic-bezier(.34,1.56,.64,1), opacity .25s;
    }
    #forge-chat-window.forge-closed {
      transform: scale(0.6) translateY(20px);
      opacity: 0;
      pointer-events: none;
    }
    #forge-chat-window.forge-open {
      transform: scale(1) translateY(0);
      opacity: 1;
    }

    /* ── Header ── */
    #forge-chat-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 16px;
      background: linear-gradient(135deg, #0a1f0a, #0f2a0f);
      border-bottom: 1px solid rgba(57,255,20,.15);
      flex-shrink: 0;
    }
    .forge-header-left { display: flex; align-items: center; gap: 12px; }
    .forge-header-avatar {
      width: 42px; height: 42px;
      border-radius: 50%;
      border: 2px solid rgba(57,255,20,.4);
      overflow: hidden;
      position: relative;
      box-shadow: 0 0 16px rgba(57,255,20,.3);
      flex-shrink: 0;
    }
    .forge-header-avatar img { width: 100%; height: 100%; object-fit: cover; }
    .forge-online-dot {
      position: absolute;
      bottom: 1px; right: 1px;
      width: 10px; height: 10px;
      background: #39ff14;
      border-radius: 50%;
      border: 2px solid #0a1f0a;
      box-shadow: 0 0 6px #39ff14;
    }
    .forge-header-info strong {
      display: block;
      font-family: 'Orbitron', sans-serif;
      font-size: .78rem;
      color: #f0fff0;
      letter-spacing: .06em;
    }
    .forge-header-info span {
      font-size: .68rem;
      color: #5e8a5e;
    }
    .forge-header-info em { color: #39ff14; font-style: normal; }
    .forge-header-right { display: flex; align-items: center; gap: 8px; }
    .forge-header-right button {
      background: rgba(57,255,20,.08);
      border: 1px solid rgba(57,255,20,.2);
      border-radius: 8px;
      color: #39ff14;
      font-size: .72rem;
      padding: 5px 10px;
      cursor: pointer;
      transition: background .2s, transform .2s;
      font-family: 'Space Grotesk', sans-serif;
    }
    .forge-header-right button:hover { background: rgba(57,255,20,.15); transform: scale(1.05); }
    #forge-close-btn { padding: 5px 8px; font-size: .9rem; }

    /* ── HUD ── */
    #forge-hud {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 16px;
      background: rgba(10,20,10,.8);
      border-bottom: 1px solid rgba(57,255,20,.08);
      flex-shrink: 0;
    }
    .hud-left, .hud-right { display: flex; align-items: center; gap: 5px; }
    .hud-label {
      font-family: 'Orbitron', sans-serif;
      font-size: .55rem;
      color: #5e8a5e;
      letter-spacing: .1em;
    }
    .hud-val {
      font-family: 'Orbitron', sans-serif;
      font-size: .8rem;
      font-weight: 700;
      color: #39ff14;
      text-shadow: 0 0 8px rgba(57,255,20,.5);
    }
    .hud-center { flex: 1; }
    .forge-xp-bar {
      height: 5px;
      background: rgba(57,255,20,.1);
      border-radius: 10px;
      overflow: hidden;
    }
    .forge-xp-fill {
      height: 100%;
      background: linear-gradient(90deg, #2bcc0f, #39ff14);
      border-radius: 10px;
      transition: width .6s cubic-bezier(.4,0,.2,1);
      box-shadow: 0 0 8px #39ff14;
    }

    /* ── Messages ── */
    #forge-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px 14px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      scrollbar-width: thin;
      scrollbar-color: rgba(57,255,20,.2) transparent;
      min-height: 0;
    }
    #forge-messages::-webkit-scrollbar { width: 3px; }
    #forge-messages::-webkit-scrollbar-thumb { background: rgba(57,255,20,.25); border-radius: 2px; }

    .forge-msg { display: flex; }
    .forge-msg-bot { justify-content: flex-start; }
    .forge-msg-user { justify-content: flex-end; }

    .forge-msg-inner { display: flex; align-items: flex-end; gap: 8px; max-width: 88%; }
    .forge-msg-user .forge-msg-inner { flex-direction: row-reverse; }

    .forge-avatar-sm {
      width: 30px; height: 30px;
      border-radius: 50%;
      overflow: hidden;
      border: 1.5px solid rgba(57,255,20,.3);
      flex-shrink: 0;
      box-shadow: 0 0 10px rgba(57,255,20,.2);
    }
    .forge-avatar-sm img { width: 100%; height: 100%; object-fit: cover; }

    .forge-bubble {
      padding: 11px 15px;
      border-radius: 16px;
      font-size: .82rem;
      line-height: 1.65;
      word-break: break-word;
      animation: msgIn .3s cubic-bezier(.34,1.56,.64,1);
    }
    @keyframes msgIn {
      from { transform: scale(0.85) translateY(8px); opacity: 0; }
      to { transform: scale(1) translateY(0); opacity: 1; }
    }
    .forge-msg-bot .forge-bubble {
      background: rgba(14,25,14,.9);
      border: 1px solid rgba(57,255,20,.15);
      color: #a8c8a8;
      border-bottom-left-radius: 4px;
    }
    .forge-msg-user .forge-bubble {
      background: linear-gradient(135deg, #1a3a1a, #0f2a0f);
      border: 1px solid rgba(57,255,20,.3);
      color: #f0fff0;
      border-bottom-right-radius: 4px;
    }
    .forge-bubble strong { color: #39ff14; }

    /* ── Typing ── */
    .forge-typing {
      display: flex !important;
      gap: 5px;
      align-items: center;
      padding: 14px 18px !important;
    }
    .forge-typing span {
      width: 6px; height: 6px;
      background: #39ff14;
      border-radius: 50%;
      animation: dotBounce 1.3s ease-in-out infinite;
      opacity: .6;
    }
    .forge-typing span:nth-child(2) { animation-delay: .2s; }
    .forge-typing span:nth-child(3) { animation-delay: .4s; }
    @keyframes dotBounce {
      0%, 60%, 100% { transform: translateY(0); opacity: .6; }
      30% { transform: translateY(-6px); opacity: 1; }
    }

    /* ── Quick Buttons ── */
    .forge-btn-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 10px;
    }
    .forge-quick-btn {
      background: rgba(57,255,20,.08);
      border: 1px solid rgba(57,255,20,.3);
      border-radius: 8px;
      color: #39ff14;
      font-size: .72rem;
      font-family: 'Space Grotesk', sans-serif;
      padding: 6px 12px;
      cursor: pointer;
      transition: background .2s, transform .2s;
      font-weight: 600;
    }
    .forge-quick-btn:hover {
      background: rgba(57,255,20,.18);
      transform: translateY(-2px);
    }

    /* ── Quiz ── */
    .forge-quiz-block { margin-top: 12px; }
    .quiz-q {
      color: #f0fff0;
      font-weight: 600;
      margin-bottom: 10px;
      font-size: .85rem;
    }
    .quiz-options {
      display: flex;
      flex-direction: column;
      gap: 7px;
    }
    .quiz-opt-btn {
      background: rgba(57,255,20,.05);
      border: 1px solid rgba(57,255,20,.2);
      border-radius: 8px;
      color: #a8c8a8;
      font-size: .78rem;
      font-family: 'Space Grotesk', sans-serif;
      padding: 9px 14px;
      cursor: pointer;
      text-align: left;
      transition: all .2s;
    }
    .quiz-opt-btn:hover:not(:disabled) {
      background: rgba(57,255,20,.12);
      border-color: rgba(57,255,20,.5);
      color: #f0fff0;
      transform: translateX(4px);
    }
    .quiz-opt-btn:disabled { cursor: default; }
    .quiz-correct {
      background: rgba(57,255,20,.2) !important;
      border-color: #39ff14 !important;
      color: #39ff14 !important;
    }
    .quiz-wrong {
      background: rgba(255,60,60,.1) !important;
      border-color: rgba(255,60,60,.4) !important;
      color: #ff6060 !important;
    }
    .quiz-xp-badge {
      margin-top: 8px;
      font-size: .68rem;
      color: #39ff14;
      font-family: 'Space Mono', monospace;
      opacity: .7;
    }

    /* ── Rating Stars ── */
    .forge-rating p { color: #a8c8a8; font-size: .82rem; margin-bottom: 10px; }
    .rating-stars { display: flex; gap: 6px; }
    .star-btn {
      font-size: 1.6rem;
      background: none;
      border: none;
      cursor: pointer;
      color: rgba(57,255,20,.25);
      transition: color .2s, transform .2s;
      line-height: 1;
    }
    .star-btn:hover, .star-active { color: #39ff14; transform: scale(1.2); }
    .forge-feedback-ta {
      width: 100%;
      margin-top: 8px;
      background: rgba(57,255,20,.04);
      border: 1px solid rgba(57,255,20,.2);
      border-radius: 8px;
      color: #a8c8a8;
      font-size: .8rem;
      font-family: 'Space Grotesk', sans-serif;
      padding: 10px 12px;
      resize: none;
      outline: none;
    }
    .forge-feedback-ta:focus { border-color: rgba(57,255,20,.4); }
    .forge-send-feedback { margin-top: 8px; }

    /* ── Toasts ── */
    .forge-xp-toast {
      position: absolute;
      top: 120px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #0f2a0f, #1a3a1a);
      border: 1px solid #39ff14;
      border-radius: 10px;
      padding: 8px 18px;
      display: flex;
      flex-direction: column;
      align-items: center;
      animation: toastIn .4s cubic-bezier(.34,1.56,.64,1) forwards, toastOut .4s .8s forwards ease-in;
      z-index: 100;
      pointer-events: none;
    }
    .forge-xp-toast span {
      font-family: 'Orbitron', sans-serif;
      font-size: .85rem;
      color: #39ff14;
      font-weight: 700;
      text-shadow: 0 0 10px rgba(57,255,20,.5);
    }
    .forge-xp-toast small { font-size: .65rem; color: #5e8a5e; }

    .forge-levelup-toast, .forge-badge-notif {
      position: absolute;
      top: 70px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #0a1f0a, #1a3a1a);
      border: 1.5px solid #39ff14;
      border-radius: 14px;
      padding: 12px 20px;
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 220px;
      box-shadow: 0 0 30px rgba(57,255,20,.2);
      animation: toastIn .4s cubic-bezier(.34,1.56,.64,1) forwards, toastOut .5s 3s forwards ease-in;
      z-index: 100;
      pointer-events: none;
      white-space: nowrap;
    }
    .lu-icon { font-size: 2rem; animation: spin .5s ease; }
    .lu-text strong {
      display: block;
      font-family: 'Orbitron', sans-serif;
      font-size: .75rem;
      color: #39ff14;
      letter-spacing: .1em;
    }
    .lu-text span { font-size: .7rem; color: #a8c8a8; }
    .bn-icon { font-size: 1.8rem; }
    .bn-text strong {
      display: block;
      font-family: 'Orbitron', sans-serif;
      font-size: .7rem;
      color: #39ff14;
    }
    .bn-text span { font-size: .72rem; color: #a8c8a8; }

    @keyframes toastIn {
      from { opacity: 0; transform: translateX(-50%) translateY(-16px) scale(.85); }
      to { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
    }
    @keyframes toastOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }

    /* ── Badges Panel ── */
    #forge-badges-panel {
      position: absolute;
      inset: 0;
      background: #060e06;
      z-index: 50;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      transition: opacity .3s, transform .3s;
    }
    .forge-panel-closed { opacity: 0; pointer-events: none; transform: scale(.95); }

    .badges-panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      font-family: 'Orbitron', sans-serif;
      font-size: .78rem;
      color: #39ff14;
      letter-spacing: .1em;
      border-bottom: 1px solid rgba(57,255,20,.15);
    }
    #forge-badges-close {
      background: none;
      border: none;
      color: #5e8a5e;
      cursor: pointer;
      font-size: 1rem;
    }
    #forge-badges-grid {
      flex: 1;
      overflow-y: auto;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .badge-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 14px;
      border-radius: 12px;
      border: 1px solid;
      transition: transform .2s;
    }
    .badge-item:hover { transform: translateX(4px); }
    .badge-earned {
      background: rgba(57,255,20,.06);
      border-color: rgba(57,255,20,.25);
    }
    .badge-locked {
      background: rgba(255,255,255,.02);
      border-color: rgba(255,255,255,.06);
      opacity: .6;
    }
    .badge-icon { font-size: 1.8rem; flex-shrink: 0; }
    .badge-info strong { display: block; font-size: .78rem; color: #f0fff0; margin-bottom: 2px; }
    .badge-info small { font-size: .68rem; color: #5e8a5e; }
    .badge-xp {
      display: inline-block;
      margin-top: 4px;
      font-size: .62rem;
      font-family: 'Space Mono', monospace;
      color: #39ff14;
      background: rgba(57,255,20,.1);
      padding: 2px 8px;
      border-radius: 4px;
    }

    /* ── Input Area ── */
    #forge-input-area {
      border-top: 1px solid rgba(57,255,20,.1);
      background: #050d05;
      padding: 10px 14px 12px;
      flex-shrink: 0;
    }
    #forge-quick-prompts {
      display: flex;
      gap: 6px;
      overflow-x: auto;
      padding-bottom: 8px;
      scrollbar-width: none;
    }
    #forge-quick-prompts::-webkit-scrollbar { display: none; }
    .forge-chip {
      white-space: nowrap;
      background: rgba(57,255,20,.06);
      border: 1px solid rgba(57,255,20,.18);
      border-radius: 20px;
      color: #a8c8a8;
      font-size: .68rem;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 600;
      padding: 5px 12px;
      cursor: pointer;
      transition: background .2s, color .2s, transform .2s;
      flex-shrink: 0;
    }
    .forge-chip:hover {
      background: rgba(57,255,20,.15);
      color: #39ff14;
      transform: translateY(-2px);
    }
    #forge-input-row {
      display: flex;
      gap: 8px;
      align-items: center;
    }
    #forge-input {
      flex: 1;
      background: rgba(57,255,20,.04);
      border: 1px solid rgba(57,255,20,.2);
      border-radius: 10px;
      color: #f0fff0;
      font-size: .82rem;
      font-family: 'Space Grotesk', sans-serif;
      padding: 10px 14px;
      outline: none;
      transition: border-color .2s, box-shadow .2s;
    }
    #forge-input:focus {
      border-color: rgba(57,255,20,.5);
      box-shadow: 0 0 0 3px rgba(57,255,20,.08);
    }
    #forge-input::placeholder { color: #3a5a3a; }
    #forge-send-btn {
      width: 40px; height: 40px;
      border-radius: 10px;
      background: #39ff14;
      border: none;
      color: #030803;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform .2s cubic-bezier(.34,1.56,.64,1), box-shadow .2s;
      flex-shrink: 0;
    }
    #forge-send-btn:hover {
      transform: scale(1.12);
      box-shadow: 0 0 16px rgba(57,255,20,.5);
    }
    #forge-footer-brand {
      text-align: center;
      font-size: .6rem;
      color: #3a5a3a;
      margin-top: 8px;
      letter-spacing: .04em;
    }
    #forge-footer-brand strong { color: #39ff14; }

    /* ── Mobile Responsive ── */
    @media (max-width: 480px) {
      #forge-chat-window {
        width: calc(100vw - 16px);
        right: 8px;
        left: 8px;
        bottom: 90px;
        height: min(580px, calc(100vh - 110px));
        max-height: calc(100vh - 110px);
      }
      #forge-chat-wrapper {
        bottom: 12px;
        right: 12px;
      }
      #forge-launcher {
        padding: 8px 14px 8px 8px;
        gap: 8px;
      }
      .forge-launcher-inner { width: 38px; height: 38px; }
      #forge-launcher-img { width: 38px; height: 38px; }
      .forge-launcher-name { font-size: .65rem; }
      .forge-launcher-sub { font-size: .58rem; }
    }
  `;
  document.head.appendChild(style);
}

// ─── Auto-Init ─────────────────────────────────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initForgeBot);
} else {
  initForgeBot();
}
