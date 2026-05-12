// ─── i18n ───
const T={zh:{
'meta-title':'GitPulse — 开源脉搏，实时跳动',
'meta-desc':'追踪全球最热门的 GitHub 项目，每 6 小时自动更新。Apple 级暗色设计，零依赖纯静态页面。感受开源世界的心跳。',
'nav-philosophy':'哲学',
'nav-features':'特性',
'nav-data':'数据',
'nav-repos':'仓库',
'nav-timeline':'更新',
'hero-headline':'在信息的洪流中，<br><span class="gradient">脉搏</span>是唯一值得<br>追踪的信号。',
'hero-cta-live':'查看实时数据 →',
'hero-cta-source':'GitHub 源码 ↗',
'hero-scroll':'向下滚动',
'phil-title':'我们相信的三件事',
'phil-sub':'Three convictions that shape every pixel of GitPulse.',
'phil-desc-1':'每 6 小时捕获一次，如同心电图般记录开源世界的每一次心跳。不是静态的排行榜，而是活着的信号。',
'phil-desc-2':'从 topics 关键词云中，你能看到技术思潮的涌动。不是事后回顾，而是此刻正在发生的事。',
'phil-desc-3':'Apple 级的设计语言，因为好的数据值得好的容器。每一个像素都服务于信息，而不是装饰。',
'feat-title':'每一个特性，都有理由存在',
'feat-sub':'Zero dependencies. Pure HTML / CSS / Vanilla JS.',
'feat-1-title':'Apple-grade 暗色设计',
'feat-1-desc':'受 Apple 产品页启发，极致克制的视觉语言。深度通过色彩层级表达，而非阴影。',
'feat-2-title':'纯 HTML/CSS 图表',
'feat-2-desc':'语言分布条、Stars 排行、关键词云 — 零依赖，全端自适应，加载即呈现。',
'feat-3-title':'滚动渐现动画',
'feat-3-desc':'IntersectionObserver 驱动，每个元素在进入视口时优雅浮入。流畅，不突兀。',
'feat-4-title':'数字跳动计数器',
'feat-4-desc':'关键指标从 0 动态增长，数据有生命力。让数字说话，而不是静态文本。',
'feat-5-title':'全响应式',
'feat-5-desc':'桌面、平板、手机，完美适配。在任何设备上都能获得一致的体验。',
'feat-6-title':'每 6 小时自动更新',
'feat-6-desc':'GitHub Actions 自动抓取，数据永不过时。cron: 0 0,6,12,18 * * *',
'feat-7-title':'Topics 关键词云',
'feat-7-desc':'从仓库标签中提取技术趋势，一目了然。热点词用颜色和大小区分权重。',
'feat-8-title':'零框架，零依赖',
'feat-8-desc':'纯 HTML / CSS / Vanilla JS，无框架、无库、无构建步骤。直接部署 GitHub Pages。',
'data-title':'此刻，开源社区在看什么',
'data-sub':'实时数据可视化 — 语言、趋势、热度，一屏尽收。',
'data-card-1':'语言分布',
'data-card-2':'热门关键词',
'data-card-3':'Stars 排行',
'data-card-4':'脉搏信号',
'timeline-title':'每 6 小时，一次心跳',
'timeline-sub':'数据通过 GitHub Actions 自动更新，每天 4 次，永不过时。',
'repo-title':'实时仓库追踪',
'repo-sub':'每日、每周、每月热门仓库一览。数据每 6 小时自动刷新。',
'repo-search':'搜索仓库名或描述…',
'repo-tab-daily':'今日 Daily',
'repo-tab-weekly':'本周 Weekly',
'repo-tab-monthly':'本月 Monthly',
'repo-error':'数据加载失败<br>请检查网络连接或稍后重试',
'retry-reload':'重新加载 →',
'cta-heading':'追踪脉搏，而非噪音。',
'cta-sub':'Track the pulse, not the noise.',
'no-desc':'暂无描述',
'no-desc-available':'暂无描述信息',
'stars':'stars',
'created':'创建时间',
'last-push':'最后推送',
'forks':'Forks',
'open-issues':'Open Issues',
'view-gh':'前往 GitHub 查看 →',
'filter-all':'全部',
'no-results':'没有匹配的仓库',
'last-update':'最后更新',
'next-update':'下次更新',
'updating-soon':'即将更新',
'pulse-story-title':'今日开源脉搏',
'pulse-top-repo':'今日最热',
'pulse-trends':'语言趋势',
'pulse-rising':'飙升项目',
'no-pulse-story':'暂无脉搏故事'
},en:{
'meta-title':'GitPulse — Open Source Pulse, Beating in Real Time',
'meta-desc':'Track the hottest GitHub projects worldwide. Auto-updated every 6 hours. Apple-grade dark design, zero-dependency static pages. Feel the heartbeat of open source.',
'nav-philosophy':'Philosophy',
'nav-features':'Features',
'nav-data':'Data',
'nav-repos':'Repos',
'nav-timeline':'Updates',
'hero-headline':'In the flood of information,<br><span class="gradient">pulse</span> is the only<br>signal worth tracking.',
'hero-cta-live':'View Live Data →',
'hero-cta-source':'GitHub Source ↗',
'hero-scroll':'Scroll Down',
'phil-title':'Three Things We Believe',
'phil-sub':'Three convictions that shape every pixel of GitPulse.',
'phil-desc-1':'Captured every 6 hours, like an EKG recording each heartbeat of the open source world. Not a static leaderboard, but a living signal.',
'phil-desc-2':'From the topics keyword cloud, you can see the currents of technological thought. Not hindsight, but what is happening right now.',
'phil-desc-3':'Apple-grade design language, because good data deserves a good container. Every pixel serves information, not decoration.',
'feat-title':'Every Feature Has a Reason to Exist',
'feat-sub':'Zero dependencies. Pure HTML / CSS / Vanilla JS.',
'feat-1-title':'Apple-grade Dark Design',
'feat-1-desc':'Inspired by Apple product pages. Restrained visual language where depth is expressed through color hierarchy, not shadows.',
'feat-2-title':'Pure HTML/CSS Charts',
'feat-2-desc':'Language bars, stars ranking, keyword cloud — zero dependencies, fully responsive, renders on load.',
'feat-3-title':'Scroll Reveal Animation',
'feat-3-desc':'IntersectionObserver-driven. Each element floats in gracefully as it enters the viewport. Smooth, not jarring.',
'feat-4-title':'Animated Counters',
'feat-4-desc':'Key metrics animate from zero to target. Data has vitality. Numbers that speak rather than sit static.',
'feat-5-title':'Fully Responsive',
'feat-5-desc':'Desktop, tablet, mobile — perfectly adapted. Consistent experience on any device.',
'feat-6-title':'Auto-updated Every 6 Hours',
'feat-6-desc':'GitHub Actions cron at 0,6,12,18 UTC. Data never goes stale.',
'feat-7-title':'Topics Keyword Cloud',
'feat-7-desc':'Extract tech trends from repo topics at a glance. Weighted by color and size for instant signal.',
'feat-8-title':'Zero Framework, Zero Dependencies',
'feat-8-desc':'Pure HTML / CSS / Vanilla JS. No frameworks, no libraries, no build step. Deploy directly to GitHub Pages.',
'data-title':'What Open Source Is Watching Right Now',
'data-sub':'Real-time data visualization — languages, trends, popularity, all in one view.',
'data-card-1':'Language Distribution',
'data-card-2':'Hot Topics',
'data-card-3':'Stars Ranking',
'data-card-4':'Pulse Signal',
'timeline-title':'A Heartbeat Every 6 Hours',
'timeline-sub':'Data auto-updated via GitHub Actions, 4 times a day, never stale.',
'repo-title':'Live Repo Tracker',
'repo-sub':'Daily, weekly, and monthly trending repos. Refreshed every 6 hours.',
'repo-search':'Search repo name or description…',
'repo-tab-daily':'Daily',
'repo-tab-weekly':'Weekly',
'repo-tab-monthly':'Monthly',
'repo-error':'Data load failed<br>Please check your connection and try again',
'retry-reload':'Reload →',
'cta-heading':'Track the Pulse, Not the Noise.',
'cta-sub':'Track the pulse, not the noise.',
'no-desc':'No description',
'no-desc-available':'No description available',
'stars':'stars',
'created':'Created',
'last-push':'Last Push',
'forks':'Forks',
'open-issues':'Open Issues',
'view-gh':'View on GitHub →',
'filter-all':'All',
'no-results':'No repos match your filters',
'last-update':'Last update',
'next-update':'Next update',
'updating-soon':'Updating soon',
'pulse-story-title':"Today's Open Source Pulse",
'pulse-top-repo':'Today\'s Hot',
'pulse-trends':'Language Trends',
'pulse-rising':'Rising Projects',
'no-pulse-story':'No pulse story available'
}};

let currentLang='zh';
function t(key){return(T[currentLang]&&T[currentLang][key])||(T.en&&T.en[key])||key;}

const UPDATE_INTERVAL=6*60*60*1000;
const URGENT_THRESHOLD=30*60*1000;

function initUpdateStatus(updatedAt){
  const timeEl=document.getElementById('update-time');
  const countdownEl=document.getElementById('update-countdown');
  if(!timeEl||!countdownEl)return;

  let lastUpdate=updatedAt?new Date(updatedAt):null;
  if(!lastUpdate)lastUpdate=new Date();

  function formatUpdateTime(date){
    const locale=currentLang==='zh'?'zh-CN':'en-US';
    return date.toLocaleString(locale,{
      month:'short',
      day:'numeric',
      hour:'2-digit',
      minute:'2-digit',
      timeZoneName:'short'
    });
  }

  function getNextUpdateTime(last){
    const next=new Date(last);
    const mins=next.getUTCMinutes();
    const nextHour=Math.ceil(mins/6)*6;
    next.setUTCMinutes(nextHour,0,0);
    if(next<=new Date())next.setUTCHours(next.getUTCHours()+6);
    return next;
  }

  function updateDisplay(){
    if(!timeEl||!countdownEl)return;
    timeEl.textContent=t('last-update')+': '+formatUpdateTime(lastUpdate);

    const now=new Date();
    const nextUpdate=getNextUpdateTime(lastUpdate);
    const diff=nextUpdate-now;

    if(diff<=0){
      countdownEl.textContent=t('updating-soon');
      countdownEl.className='update-countdown soon';
    }else{
      const hours=Math.floor(diff/3600000);
      const mins=Math.floor((diff%3600000)/60000);
      const secs=Math.floor((diff%60000)/1000);

      if(hours>0){
        countdownEl.textContent=t('next-update')+': '+hours+'h '+mins+'m';
      }else if(mins>0){
        countdownEl.textContent=t('next-update')+': '+mins+'m '+secs+'s';
      }else{
        countdownEl.textContent=t('next-update')+': '+secs+'s';
      }

      countdownEl.className=diff<URGENT_THRESHOLD?'update-countdown soon':'update-countdown';
    }
  }

  updateDisplay();
  setInterval(updateDisplay,1000);
  window.__updateDisplay__=updateDisplay;
}

function applyLanguage(lang){
  currentLang=lang;
  document.documentElement.lang=lang==='zh'?'zh-CN':'en';
  localStorage.setItem('gitpulse-lang',lang);
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k=el.dataset.i18n;
    if(T[lang]&&T[lang][k])el.textContent=T[lang][k];
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el=>{
    const k=el.dataset.i18nHtml;
    if(T[lang]&&T[lang][k])el.innerHTML=T[lang][k];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
    const k=el.dataset.i18nPlaceholder;
    if(T[lang]&&T[lang][k])el.placeholder=T[lang][k];
  });
  const toggle=document.getElementById('lang-toggle');
  if(toggle)toggle.textContent=lang==='zh'?'En':'中';
  if(window.__DATA__&&typeof renderRepoList==='function')renderRepoList(window.__currentPeriod__||'daily');
  if(window.__updateDisplay__){
    window.__updateDisplay__();
  }
}

(function(){
  const saved=localStorage.getItem('gitpulse-lang');
  applyLanguage(saved||(navigator.language.startsWith('zh')?'zh':'en'));
  const toggle=document.getElementById('lang-toggle');
  if(toggle){
    toggle.addEventListener('click',()=>{
      const next=currentLang==='zh'?'en':'zh';
      document.body.style.transition='opacity 0.15s';
      document.body.style.opacity='0.6';
      setTimeout(()=>{
        applyLanguage(next);
        document.body.style.opacity='1';
        setTimeout(()=>{document.body.style.transition='';document.body.style.opacity='';},200);
      },150);
    });
  }
})();

// ─── Scroll Reveal ───
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── Nav scroll state ───
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ─── Counter Animation ───
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter-value').forEach(el => counterObserver.observe(el));

function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ─── Language Bar Animation ───
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.lang-bar-fill').forEach((bar, i) => {
        setTimeout(() => {
          bar.style.width = bar.dataset.width;
        }, i * 100);
      });
      barObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

const langBars = document.getElementById('lang-bars');
if (langBars) barObserver.observe(langBars);

// ─── Pulse Canvas (ECG-style) ───
const canvas = document.getElementById('pulse-canvas');
const ctx = canvas.getContext('2d');
let animFrame;

function drawPulse() {
  pulseRunning = true;
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const w = rect.width;
  const h = rect.height;
  const mid = h / 2;
  let offset = 0;

  function ecgY(x) {
    const t = ((x + offset) % 120) / 120;
    if (t < 0.15) return mid;
    if (t < 0.2) return mid - 8 * ((t - 0.15) / 0.05);
    if (t < 0.25) return mid + 8 * ((t - 0.2) / 0.05);
    if (t < 0.3) return mid;
    if (t < 0.35) return mid - h * 0.35;
    if (t < 0.4) return mid + h * 0.15;
    if (t < 0.45) return mid;
    if (t < 0.55) return mid - 4;
    if (t < 0.6) return mid;
    return mid;
  }

  function frame() {
    ctx.clearRect(0, 0, w, h);

    // grid
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // line
    ctx.beginPath();
    ctx.strokeStyle = '#FF6600';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#FF6600';
    ctx.shadowBlur = 12;
    for (let x = 0; x < w; x++) {
      const y = ecgY(x);
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    offset += 0.8;
    animFrame = requestAnimationFrame(frame);
  }

  frame();
}

const pulseObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      drawPulse();
      pulseObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

if (canvas) pulseObserver.observe(canvas);

// Pause / resume animation on visibility change
let pulseRunning = false;
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    cancelAnimationFrame(animFrame);
    pulseRunning = false;
  } else if (!pulseRunning) {
    drawPulse();
    pulseRunning = true;
  }
});

// ─── Theme Toggle ───
(function(){
  const toggle = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('gitpulse-theme');
  if (saved === 'light') {
    document.body.classList.add('light');
    if (toggle) toggle.textContent = '☾';
  }
  if (toggle) {
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('light');
      const isLight = document.body.classList.contains('light');
      localStorage.setItem('gitpulse-theme', isLight ? 'light' : 'dark');
      toggle.textContent = isLight ? '☾' : '☀';
    });
  }
})();

// ─── Dynamic Data from data.json ───
const LC={Python:'#3572A5',TypeScript:'#3178c6',JavaScript:'#f1e05a',Rust:'#dea584',Go:'#00ADD8',Swift:'#F05138',Kotlin:'#A97BFF',HTML:'#e34c26',Vue:'#41b883',Java:'#b07219',Shell:'#89e051',Dart:'#00B4AB',Ruby:'#701516',CSS:'#563d7c',C:'#8e8e93','C++':'#f34b7d','C#':'#178600',Zig:'#ec915c',Scala:'#c22d40',Elixir:'#6e4a7e',Haskell:'#5e5086',Lua:'#000080',Julia:'#9558b2',R:'#198ce7',PHP:'#4F5D95',Dockerfile:'#384d54',MDX:'#fcb32c',Svelte:'#ff3e00',Astro:'#ff5a03',Solidity:'#AA6746',Nix:'#7e7eff',Clojure:'#5881d8',OCaml:'#3be133',Erlang:'#B83998',Perl:'#0298c3',Makefile:'#427819',CMake:'#DA3434',PowerShell:'#012456',Batchfile:'#C1F12E',HCL:'#583BBA',Json:'#292929',YAML:'#cb171e',Markdown:'#083fa1',Jupyter:'#DA5B0B','Jupyter Notebook':'#DA5B0B',TSX:'#3178c6',JSX:'#f1e05a',Processing:'#0096D8',Vala:'#a56de2',Crystal:'#000100',Elm:'#60B5CC',Racket:'#3c5caa',Groovy:'#4298b8',Haxe:'#df7900',Objective_C:'#438eff','Objective-C':'#438eff',Nim:'#ffc200',Reason:'#ff5847',PureScript:'#1D222D',Hack:'#878787',Inno_Setup:'#264b99',Smarty:'#f3c035',VBA:'#867db1',Roff:'#ecdebe',Emacs_Lisp:'#c065db','Emacs Lisp':'#c065db',Vim_Script:'#199f4b','Vim Script':'#199f4b',Tcl:'#e4cc98',Smalltalk:'#596706',CoffeeScript:'#244776',SCSS:'#c6538c',Less:'#1d365d',Stylus:'#ff6347',GLSL:'#808080',HLSL:'#aace60',ShaderLab:'#DEC91A',Matlab:'#e16737',TeX:'#3D6117',PLpgSQL:'#336790',PLSQL:'#dad8d8',ColdFusion:'#ed2cd6',ActionScript:'#882B0F',Assembly:'#6E4C13',Fortran:'#4d41b1',Pascal:'#B0CE4E',Ada:'#02f88c',COBOL:'#025078',ABAP:'#E8274B',FSharp:'#b845fc','F#':'#b845fc',Lean:'#222222',Idris:'#b80000',Coq:'#d0b68c',Agda:'#315665',Verilog:'#b2b7f8',SystemVerilog:'#DAE1C2',VHDL:'#adb2cb',AutoHotkey:'#6594b0',SAS:'#B34936',Stata:'#1ab3ff',WebAssembly:'#654ff0',GDScript:'#355570',CMake:'#DA3434',Raku:'#0000fb',MoonScript:'#ff7f50',Earthly:'#2af0ff',Jsonnet:'#0064bd',Puppet:'#302B6D',Cucumber:'#23d96c',RobotFramework:'#00c8b4',Dhall:'#dfafff',ANTLR:'#9DC53D',OpenSCAD:'#e8ce2f',Handlebars:'#f0772b',ReasonML:'#ff5847',Fennel:'#fff3d7',Janet:'#0886a5',Zig:'#ec915c',Mojo:'#FF4C00'};

async function loadPulseStory(){
  try{
    const r=await fetch('archive/pulse-story.json');
    if(!r.ok)throw new Error('No pulse story');
    const story=await r.json();
    renderPulseStory(story);
  }catch(e){
    const section=document.getElementById('pulse-story');
    if(section)section.style.display='none';
  }
}

function renderPulseStory(story){
  const section=document.getElementById('pulse-story');
  if(!section||!story)return;
  section.style.display='block';

  if(story.top_repo){
    const topName=document.getElementById('pulse-top-name');
    const topStars=document.getElementById('pulse-top-stars');
    const topDesc=document.getElementById('pulse-top-desc');
    if(topName)topName.textContent=story.top_repo.name||'';
    if(topStars)topStars.textContent=story.top_repo.stars>=1000?(story.top_repo.stars/1000).toFixed(1)+'k':story.top_repo.stars;
    if(topDesc)topDesc.textContent=story.top_repo.description||'';
  }

  const trendsList=document.getElementById('pulse-trends-list');
  if(trendsList&&story.hot_languages&&story.hot_languages.length){
    trendsList.innerHTML=story.hot_languages.map(lang=>{
      const color=LC[lang.language]||'#8E8E93';
      const arrow=lang.direction==='up'?'↑':'↓';
      return '<div class="pulse-trend-item">'
        +'<span class="pulse-trend-lang">'
        +'<span class="pulse-trend-dot" style="background:'+color+'"></span>'
        +lang.language
        +'</span>'
        +'<span class="pulse-trend-change '+lang.direction+'">'+arrow+' '+Math.abs(lang.change)+'</span>'
        +'</div>';
    }).join('');
  }

  const risingList=document.getElementById('pulse-rising-list');
  if(risingList&&story.rising_repos&&story.rising_repos.length){
    risingList.innerHTML=story.rising_repos.map(repo=>{
      const parts=repo.name.split('/');
      const shortName=parts[parts.length-1]||repo.name;
      return '<a class="pulse-rising-item" href="'+repo.url+'" target="_blank" rel="noopener">'
        +'<span class="pulse-rising-name">'+shortName+'</span>'
        +'<span class="pulse-rising-delta">+'+repo.delta+'</span>'
        +'</a>';
    }).join('');
  }else if(risingList){
    risingList.innerHTML='<div class="no-results">'+t('no-pulse-story')+'</div>';
  }
}

(async()=>{
  try{
    const r=await fetch('data.json');
    if(!r.ok)throw new Error('HTTP '+r.status);
    const DATA=await r.json();window.__DATA__=DATA;
    const all=[...(DATA.daily||[]),...(DATA.weekly||[]),...(DATA.monthly||[])];

    initUpdateStatus(DATA.updated || DATA.updated_at);

    loadPulseStory();

    // Hide loading skeleton
    const skel=document.getElementById('repo-skeleton');
    if(skel)skel.style.display='none';

    // Counters
    const repos=(DATA.daily||[]).length+(DATA.weekly||[]).length+(DATA.monthly||[]).length;
    const langs={};
    const topics={};
    all.forEach(r=>{
      if(r.language&&r.language!=='—')langs[r.language]=(langs[r.language]||0)+1;
      (r.topics||[]).forEach(t=>{if(t)topics[t]=(topics[t]||0)+1});
    });
    const setCnt=(id,v,suf)=>{const el=document.getElementById(id);if(el){el.dataset.target=String(v);el.dataset.suffix=suf||'';el.textContent='0';}};
    setCnt('cnt-repos',repos);
    setCnt('cnt-langs',Object.keys(langs).length);
    setCnt('cnt-updates',4,'×');
    setCnt('cnt-topics',Object.keys(topics).length,'+');
    document.querySelectorAll('.counter-value').forEach(el=>counterObserver.observe(el));

    // Language bars
    const sorted=Object.entries(langs).sort((a,b)=>b[1]-a[1]).slice(0,8);
    const maxV=sorted[0]?sorted[0][1]:1;
    const langEl=document.getElementById('lang-bars');
    if(langEl&&sorted.length){
      langEl.innerHTML=sorted.map(([k,v])=>{
        const c=LC[k]||'#8E8E93';
        return '<div class="lang-row"><span class="lang-dot" style="background:'+c+'"></span><span class="lang-name">'+k+'</span><div class="lang-bar-track"><div class="lang-bar-fill" data-width="'+(v/maxV*100)+'%" style="background:'+c+'"></div></div><span class="lang-count">'+v+'</span></div>';
      }).join('');
      barObserver.observe(langEl);
    }

    // Topics cloud
    const topicSorted=Object.entries(topics).sort((a,b)=>b[1]-a[1]).slice(0,20);
    const cloudEl=document.getElementById('topics-cloud');
    if(cloudEl&&topicSorted.length){
      const maxT=topicSorted[0][1];
      cloudEl.innerHTML=topicSorted.map(([t,c])=>{
        const cls=c>=maxT?'hot':c>=maxT*0.5?'warm':'';
        return '<span class="cloud-tag '+cls+'">'+t+'</span>';
      }).join('');
    }

    // Stars ranking
    const seen=new Set();const topRepos=[...all].sort((a,b)=>b.stars-a.stars).filter(r=>seen.has(r.name)?false:seen.add(r.name)).slice(0,5);
    const rankEl=document.getElementById('rank-list');
    if(rankEl&&topRepos.length){
      const medals=['gold','silver','bronze'];
      rankEl.innerHTML=topRepos.map((r,i)=>{
        const cls=i<3?medals[i]:'';
        const parts=r.name.split('/');
        const stars=r.stars>=1000?(r.stars/1000).toFixed(1)+'k':r.stars;
        return '<a class="rank-item" href="'+r.url+'" target="_blank" rel="noopener"><span class="rank-num '+cls+'">'+(i+1)+'</span><div class="rank-info"><div class="rank-name">'+(parts[parts.length-1]||r.name)+'</div></div><span class="rank-stars">★ '+stars+'</span></a>';
      }).join('');
    }

    // ─── Repo Explorer (daily / weekly / monthly tabs) ───
    let currentPeriod='daily';
    let currentLangFilter='';
    let currentSearch='';

    function fmtStars(n){return n>=1000?(n/1000).toFixed(1)+'k':String(n);}

    function buildLangChips(list){
      const langCounts={};
      list.forEach(r=>{
        if(r.language&&r.language!=='—')langCounts[r.language]=(langCounts[r.language]||0)+1;
      });
      const sortedLangs=Object.entries(langCounts).sort((a,b)=>b[1]-a[1]);
      const container=document.getElementById('lang-filters');
      if(!container)return;
      let html='<button class="lang-chip'+(currentLangFilter===''?' active':'')+'" data-lang="">'+t('filter-all')+'<span class="lang-chip-count">'+list.length+'</span></button>';
      sortedLangs.forEach(([lang,count])=>{
        const color=LC[lang]||'#8E8E93';
        const active=currentLangFilter===lang?' active':'';
        html+='<button class="lang-chip'+active+'" data-lang="'+lang+'"><span class="lang-chip-dot" style="background:'+color+'"></span>'+lang+'<span class="lang-chip-count">'+count+'</span></button>';
      });
      container.innerHTML=html;
      container.querySelectorAll('.lang-chip').forEach(chip=>{
        chip.addEventListener('click',()=>{
          currentLangFilter=chip.dataset.lang;
          renderRepoList(currentPeriod);
        });
      });
    }

    function filterList(list){
      return list.filter(r=>{
        if(currentLangFilter&&r.language!==currentLangFilter)return false;
        if(currentSearch){
          const q=currentSearch.toLowerCase();
          if(!(r.name||'').toLowerCase().includes(q)&&!(r.description||'').toLowerCase().includes(q))return false;
        }
        return true;
      });
    }

    function renderRepoList(period){window.renderRepoList=renderRepoList;
      currentPeriod=period;window.__currentPeriod__=period;
      const list=DATA[period]||[];
      const filtered=filterList(list);
      const el=document.getElementById('repo-list');
      if(!el)return;

      buildLangChips(list);

      if(!filtered.length){
        el.innerHTML='<div class="no-results">'+t('no-results')+'</div>';
        return;
      }

      el.innerHTML=filtered.map((r,idx)=>{
        const parts=r.name.split('/');
        const owner=parts[0]||'';
        const repo=parts.slice(1).join('/');
        const lc=r.language&&r.language!=='—'?LC[r.language]||'#8E8E93':'transparent';
        const langTxt=r.language&&r.language!=='—'?r.language:'';
        const desc=r.description?'<div class="repo-desc">'+r.description+'</div>':'<div class="repo-desc empty">' + t('no-desc') + '</div>';
        const topics=(r.topics||[]).slice(0,4).map(t=>'<span class="repo-topic">'+t+'</span>').join('');
        const topicsHtml=topics?'<div class="repo-topics">'+topics+'</div>':'';
        const deltaHtml=r.delta>0?'<span class="delta-badge">↑ +'+fmtStars(r.delta)+'</span>':'';
        const allTopics=(r.topics||[]).map(t=>'<span class="repo-detail-topic">'+t+'</span>').join('');

        return '<div class="repo-card" data-idx="'+idx+'" data-period="'+period+'" tabindex="0" role="button" aria-expanded="false">'
          +'<img class="repo-avatar" src="'+r.avatar+'" alt="" loading="lazy" onerror="this.style.display=\'none\'">'
          +'<div class="repo-body">'
          +'<div class="repo-name-row">'
          +'<span class="repo-fullname"><span class="owner">'+owner+'/</span>'+repo+'</span>'
          +(langTxt?'<span class="repo-lang-dot" style="background:'+lc+'"></span><span class="repo-lang">'+langTxt+'</span>':'')
          +'</div>'
          +desc
          +topicsHtml
          +'</div>'
          +'<div class="repo-meta">'
          +deltaHtml
          +'<span class="repo-stars">★ '+fmtStars(r.stars)+'</span>'
          +'<span class="repo-stars-label">'+t('stars')+'</span>'
          +'</div>'
          +'<div class="repo-detail" id="detail-'+period+'-'+idx+'">'
          +'<div class="repo-detail-inner">'
          +'<div>'
          +'<div class="repo-detail-full-desc">'+(r.description||t('no-desc-available'))+'</div>'
          +(allTopics?'<div class="repo-detail-topics">'+allTopics+'</div>':'')
          +'</div>'
          +'<div>'
          +'<div class="repo-detail-meta"><span class="repo-detail-meta-label">'+t('created')+'</span><span class="repo-detail-meta-value">'+(r.created||'—')+'</span></div>'
          +'<div class="repo-detail-meta"><span class="repo-detail-meta-label">'+t('last-push')+'</span><span class="repo-detail-meta-value">'+(r.pushed||'—')+'</span></div>'
          +'<div class="repo-detail-meta"><span class="repo-detail-meta-label">'+t('forks')+'</span><span class="repo-detail-meta-value">'+(r.forks||0)+'</span></div>'
          +'<div class="repo-detail-meta"><span class="repo-detail-meta-label">'+t('open-issues')+'</span><span class="repo-detail-meta-value">'+(r.open_issues||0)+'</span></div>'
          +'</div>'
          +'<a class="repo-detail-link" href="'+r.url+'" target="_blank" rel="noopener">'+t('view-gh')+'</a>'
          +'</div>'
          +'</div>'
          +'</div>';
      }).join('');

      // Click: detail panel toggle
      el.querySelectorAll('.repo-card').forEach(card=>{
        card.addEventListener('click',e=>{
          if(e.target.closest('a'))return;
          const detail=document.getElementById('detail-'+card.dataset.period+'-'+card.dataset.idx);
          if(!detail)return;
          const isOpen=detail.classList.contains('open');
          el.querySelectorAll('.repo-detail.open').forEach(d=>d.classList.remove('open'));
          el.querySelectorAll('.repo-card').forEach(c=>{c.style.background='';c.setAttribute('aria-expanded','false');});
          if(!isOpen){
            detail.classList.add('open');
            card.style.background='var(--surface2)';
            card.setAttribute('aria-expanded','true');
          }
        });
        card.addEventListener('keydown',e=>{
          if(e.key==='Enter'||e.key===' '){e.preventDefault();card.click();}
        });
      });
    }

    renderRepoList('daily');

    // Tab switching
    document.querySelectorAll('.repo-tab').forEach(tab=>{
      tab.addEventListener('click',()=>{
        document.querySelectorAll('.repo-tab').forEach(t=>t.classList.remove('active'));
        tab.classList.add('active');
        currentLangFilter='';
        currentSearch='';
        const si=document.getElementById('repo-search');
        if(si)si.value='';
        renderRepoList(tab.dataset.period);
      });
    });

    // Search with debounce
    let searchTimeout;
    const searchInput=document.getElementById('repo-search');
    if(searchInput){
      searchInput.addEventListener('input',()=>{
        clearTimeout(searchTimeout);
        searchTimeout=setTimeout(()=>{
          currentSearch=searchInput.value.trim();
          renderRepoList(currentPeriod);
        },200);
      });
    }
  }catch(e){
    console.error('Data load error:',e);
    const skel=document.getElementById('repo-skeleton');
    const errEl=document.getElementById('repo-error');
    if(skel)skel.style.display='none';
    if(errEl)errEl.style.display='block';
  }
})();
