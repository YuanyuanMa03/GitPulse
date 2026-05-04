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

(async()=>{
  try{
    const r=await fetch('data.json');
    if(!r.ok)throw new Error('HTTP '+r.status);
    const DATA=await r.json();
    const all=[...(DATA.daily||[]),...(DATA.weekly||[]),...(DATA.monthly||[])];

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
      let html='<button class="lang-chip'+(currentLangFilter===''?' active':'')+'" data-lang="">All<span class="lang-chip-count">'+list.length+'</span></button>';
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

    function renderRepoList(period){
      currentPeriod=period;
      const list=DATA[period]||[];
      const filtered=filterList(list);
      const el=document.getElementById('repo-list');
      if(!el)return;

      buildLangChips(list);

      if(!filtered.length){
        el.innerHTML='<div class="no-results">No repos match your filters</div>';
        return;
      }

      el.innerHTML=filtered.map((r,idx)=>{
        const parts=r.name.split('/');
        const owner=parts[0]||'';
        const repo=parts.slice(1).join('/');
        const lc=r.language&&r.language!=='—'?LC[r.language]||'#8E8E93':'transparent';
        const langTxt=r.language&&r.language!=='—'?r.language:'';
        const desc=r.description?'<div class="repo-desc">'+r.description+'</div>':'<div class="repo-desc empty">No description</div>';
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
          +'<span class="repo-stars-label">stars</span>'
          +'</div>'
          +'<div class="repo-detail" id="detail-'+period+'-'+idx+'">'
          +'<div class="repo-detail-inner">'
          +'<div>'
          +'<div class="repo-detail-full-desc">'+(r.description||'No description available')+'</div>'
          +(allTopics?'<div class="repo-detail-topics">'+allTopics+'</div>':'')
          +'</div>'
          +'<div>'
          +'<div class="repo-detail-meta"><span class="repo-detail-meta-label">Created</span><span class="repo-detail-meta-value">'+(r.created||'—')+'</span></div>'
          +'<div class="repo-detail-meta"><span class="repo-detail-meta-label">Last Push</span><span class="repo-detail-meta-value">'+(r.pushed||'—')+'</span></div>'
          +'<div class="repo-detail-meta"><span class="repo-detail-meta-label">Forks</span><span class="repo-detail-meta-value">'+(r.forks||0)+'</span></div>'
          +'<div class="repo-detail-meta"><span class="repo-detail-meta-label">Open Issues</span><span class="repo-detail-meta-value">'+(r.open_issues||0)+'</span></div>'
          +'</div>'
          +'<a class="repo-detail-link" href="'+r.url+'" target="_blank" rel="noopener">View on GitHub →</a>'
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
