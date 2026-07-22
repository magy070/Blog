/* ═══════════════════════════════════════════════════════════════
   GTA San Andreas Inspired Blog — script.js
   ═══════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  // ── Post Manifest ──────────────────────────────────────────────
  var POSTS = [
    {
      slug: "hello-world",
      title: "Hello World",
      date: "2026-07-22",
      tags: ["meta", "javascript"],
      excerpt: "Welcome to my blog. This is the first post — a place to think in public about code, tools, and craft.",
      content: 'Welcome to my blog. This is the first post — a place to think in public.\n\n## Why a Static Markdown Blog?\n\nNo frameworks. No build tools. No database. Just:\n\n- **HTML** for structure\n- **CSS** for style\n- **JavaScript** for rendering `.md` files in the browser\n\nGitHub Pages hosts it for free, and the entire site is a single repo.\n\n## How It Works\n\nEach post is an entry in the `POSTS` array in `script.js` with a `content` field containing Markdown.\n\nThe page parses the content and runs it through [marked.js](https://marked.js.org) to produce HTML. Code blocks get syntax highlighting from [highlight.js](https://highlightjs.org).\n\n## Code Example\n\nHere\'s a small JavaScript snippet, just to show syntax highlighting in action:\n\n```js\nfunction fibonacci(n) {\n  if (n <= 1) return n;\n  let a = 0, b = 1;\n  for (let i = 2; i <= n; i++) {\n    [a, b] = [b, a + b];\n  }\n  return b;\n}\n\nconsole.log(fibonacci(10)); // 55\n```\n\nAnd some Python:\n\n```python\ndef fibonacci(n: int) -> int:\n    a, b = 0, 1\n    for _ in range(n):\n        a, b = b, a + b\n    return a\n\nprint(fibonacci(10))  # 55\n```\n\n## What\'s Next\n\nWrite more posts. Add entries to the `POSTS` array in `script.js`. Push to GitHub. Done.\n\n> The best blog is the one you actually write in.'
    },
    {
      slug: "building-rest-api-nodejs",
      title: "Building a REST API with Node.js",
      date: "2026-07-20",
      tags: ["javascript", "nodejs", "backend"],
      excerpt: "A practical guide to building a clean REST API from scratch using Node.js and Express, with proper error handling and project structure.",
      content: 'Building a REST API doesn\'t have to be complicated. Here\'s how I approach it with Node.js.\n\n## Project Structure\n\nKeep it simple at first:\n\n```\napi/\n  routes/\n    users.js\n  middleware/\n    auth.js\n  index.js\n```\n\n## Setting Up Express\n\n```js\nconst express = require("express");\nconst app = express();\n\napp.use(express.json());\n\napp.get("/api/users", (req, res) => {\n  res.json({ users: [] });\n});\n\napp.listen(3000, () => {\n  console.log("Server running on port 3000");\n});\n```\n\n## Error Handling\n\nAlways wrap async route handlers:\n\n```js\nconst asyncHandler = (fn) => (req, res, next) => {\n  Promise.resolve(fn(req, res, next)).catch(next);\n};\n\napp.get("/api/users/:id", asyncHandler(async (req, res) => {\n  const user = await User.findById(req.params.id);\n  if (!user) return res.status(404).json({ error: "Not found" });\n  res.json(user);\n}));\n```\n\n## What I Learned\n\n- Start with the data model, not the framework\n- Keep routes thin — business logic belongs in services\n- Validate inputs at the boundary\n- Log errors, don\'t just swallow them\n\n> Simplicity is the ultimate sophistication.'
    },
    {
      slug: "css-grid-complete-guide",
      title: "CSS Grid: A Complete Guide",
      date: "2026-07-18",
      tags: ["css", "frontend"],
      excerpt: "Everything you need to know about CSS Grid layout — from basic concepts to advanced techniques for building responsive interfaces.",
      content: 'CSS Grid changed how we build layouts. Here\'s everything I wish I knew earlier.\n\n## The Basics\n\n```css\n.container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n}\n```\n\nThis creates a three-column grid with equal widths and 20px gaps.\n\n## Named Areas\n\n```css\n.layout {\n  display: grid;\n  grid-template-areas:\n    "header header"\n    "sidebar main"\n    "footer footer";\n  grid-template-columns: 240px 1fr;\n  grid-template-rows: auto 1fr auto;\n  min-height: 100vh;\n}\n\n.header  { grid-area: header; }\n.sidebar { grid-area: sidebar; }\n.main    { grid-area: main; }\n.footer  { grid-area: footer; }\n```\n\n## Responsive Without Media Queries\n\n```css\n.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 24px;\n}\n```\n\nThe `auto-fill` with `minmax()` pattern is incredibly powerful.\n\n## When to Use Grid vs Flexbox\n\n- **Grid**: two-dimensional layouts, page-level structure\n- **Flexbox**: one-dimensional, alignment, distribution\n\nThey work great together.\n\n> CSS Grid is not just a layout tool — it\'s a way of thinking about space.'
    },
    {
      slug: "dev-setup-2026",
      title: "My Development Setup 2026",
      date: "2026-07-15",
      tags: ["meta", "tools"],
      excerpt: "A look at the tools, editor config, and workflow I use daily as a web developer in 2026.",
      content: 'Here\'s my current development setup and why I chose each tool.\n\n## Editor\n\n**VS Code** with these essentials:\n\n- GitHub Copilot for inline suggestions\n- Error Lens for inline error display\n- Prettier for formatting\n- ESLint for code quality\n\n## Terminal\n\nI use **Warp** on macOS — the AI command search is genuinely useful.\n\n```bash\n# My most used aliases\nalias dev="npm run dev"\nalias lint="npm run lint"\nalias gs="git status"\nalias gc="git commit"\n```\n\n## Browser\n\n**Arc** for development. The spaces feature keeps work and personal separate.\n\nLighthouse built into Chrome DevTools for performance audits.\n\n## Keybindings\n\nI remapped Caps Lock to Escape. My wrists thank me.\n\n## What Matters\n\nYour setup should reduce friction, not create it. Ship code, not configuration.\n\n> Tools should serve the craft, not define it.'
    }
  ];

  // ── Utility Functions ──────────────────────────────────────────
  function debounce(fn, delay) {
    var timer;
    return function () {
      var context = this;
      var args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    };
  }

  function throttle(fn, limit) {
    var inThrottle = false;
    return function () {
      var context = this;
      var args = arguments;
      if (!inThrottle) {
        fn.apply(context, args);
        inThrottle = true;
        setTimeout(function () {
          inThrottle = false;
        }, limit);
      }
    };
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function estimateReadingTime(text) {
    var words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  }

  function getAllTags() {
    var tagMap = {};
    POSTS.forEach(function (post) {
      if (post.tags) {
        post.tags.forEach(function (tag) {
          tagMap[tag] = (tagMap[tag] || 0) + 1;
        });
      }
    });
    return tagMap;
  }

  // ── Markdown Setup ─────────────────────────────────────────────
  marked.setOptions({
    gfm: true,
    breaks: false,
    highlight: function (code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }
      return hljs.highlightAuto(code).value;
    }
  });

  // ── Frontmatter Parser ─────────────────────────────────────────
  function parseFrontmatter(raw) {
    var match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) return { meta: {}, body: raw };
    var meta = {};
    match[1].split("\n").forEach(function (line) {
      var idx = line.indexOf(":");
      if (idx === -1) return;
      var key = line.slice(0, idx).trim();
      var val = line.slice(idx + 1).trim();
      if (val.startsWith("[") && val.endsWith("]")) {
        val = val.slice(1, -1).split(",").map(function (s) { return s.trim(); });
      }
      meta[key] = val;
    });
    return { meta: meta, body: match[2] };
  }

  // ── TOC Generator ──────────────────────────────────────────────
  function generateTOC(html) {
    var div = document.createElement("div");
    div.innerHTML = html;
    var headings = div.querySelectorAll("h2, h3, h4");
    if (headings.length < 2) return null;
    var toc = '<div class="toc-title">On this page</div><ul>';
    headings.forEach(function (h, i) {
      var level = h.tagName.toLowerCase();
      var id = "heading-" + i;
      h.id = id;
      toc += '<li class="toc-' + level + '"><a href="#' + id + '">' + escapeHtml(h.textContent) + '</a></li>';
    });
    toc += "</ul>";
    return { toc: toc, modifiedHtml: div.innerHTML };
  }

  // ── Theme ──────────────────────────────────────────────────────
  function getTheme() {
    return localStorage.getItem("theme") || "dark";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    var lightSheet = document.getElementById("hljs-light");
    var darkSheet = document.getElementById("hljs-dark");
    if (lightSheet && darkSheet) {
      lightSheet.disabled = theme === "dark";
      darkSheet.disabled = theme !== "dark";
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", theme === "dark" ? "#111111" : "#F5F5F5");
    }
  }

  // ── DOM References ─────────────────────────────────────────────
  var contentEl = document.getElementById("content");
  var tocEl = document.getElementById("toc");
  var mainContent = document.getElementById("main-content");
  var homeSections = document.getElementById("home-sections");
  var navbar = document.getElementById("navbar");
  var menuToggle = document.getElementById("menu-toggle");
  var mobileMenu = document.getElementById("mobile-menu");
  var backToTop = document.getElementById("back-to-top");
  var readingProgress = document.getElementById("reading-progress");

  // ── Theme Toggle ───────────────────────────────────────────────
  var themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      applyTheme(getTheme() === "dark" ? "light" : "dark");
    });
  }
  applyTheme(getTheme());

  // ── Mobile Menu ────────────────────────────────────────────────
  var mobileOverlay = null;

  function createOverlay() {
    if (!mobileOverlay) {
      mobileOverlay = document.createElement("div");
      mobileOverlay.className = "mobile-overlay";
      document.body.appendChild(mobileOverlay);
      mobileOverlay.addEventListener("click", closeMobileMenu);
    }
  }

  function openMobileMenu() {
    createOverlay();
    mobileMenu.classList.add("open");
    mobileOverlay.classList.add("open");
    menuToggle.classList.add("open");
    menuToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMobileMenu() {
    if (mobileMenu) mobileMenu.classList.remove("open");
    if (mobileOverlay) mobileOverlay.classList.remove("open");
    if (menuToggle) menuToggle.classList.remove("open");
    if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      if (mobileMenu.classList.contains("open")) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && mobileMenu && mobileMenu.classList.contains("open")) {
      closeMobileMenu();
    }
  });

  // Close mobile menu on link click
  var mobileNavLinks = document.querySelectorAll("[data-mobile-nav]");
  mobileNavLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      closeMobileMenu();
    });
  });

  // ── Navbar Scroll Effect ───────────────────────────────────────
  var lastScrollY = 0;

  function handleScroll() {
    var scrollY = window.scrollY;

    // Navbar glass effect
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }

    // Back to top button
    if (backToTop) {
      if (scrollY > 400) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    }

    // Reading progress bar
    if (readingProgress && mainContent.classList.contains("active")) {
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      document.documentElement.style.setProperty("--progress", progress + "%");
    } else if (readingProgress) {
      document.documentElement.style.setProperty("--progress", "0%");
    }

    lastScrollY = scrollY;
  }

  window.addEventListener("scroll", throttle(handleScroll, 16));

  // Back to top click
  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ── Scroll Animations (IntersectionObserver) ───────────────────
  function initScrollAnimations() {
    if (!("IntersectionObserver" in window)) {
      var els = document.querySelectorAll(".animate-on-scroll, .animate-slide-left, .animate-slide-right");
      els.forEach(function (el) { el.classList.add("visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll(".animate-on-scroll, .animate-slide-left, .animate-slide-right").forEach(function (el) {
      observer.observe(el);
    });
  }

  // ── Copy Code Button ───────────────────────────────────────────
  function initCopyCodeButtons() {
    var pres = document.querySelectorAll(".prose pre");
    pres.forEach(function (pre) {
      if (pre.parentElement.classList.contains("code-block-wrapper")) return;

      var wrapper = document.createElement("div");
      wrapper.className = "code-block-wrapper";
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      var btn = document.createElement("button");
      btn.className = "copy-code-btn";
      btn.textContent = "Copy";
      btn.setAttribute("aria-label", "Copy code to clipboard");
      wrapper.appendChild(btn);

      btn.addEventListener("click", function () {
        var code = pre.querySelector("code");
        var text = code ? code.textContent : pre.textContent;
        navigator.clipboard.writeText(text).then(function () {
          btn.textContent = "Copied!";
          btn.classList.add("copied");
          setTimeout(function () {
            btn.textContent = "Copy";
            btn.classList.remove("copied");
          }, 2000);
        }).catch(function () {
          btn.textContent = "Failed";
          setTimeout(function () { btn.textContent = "Copy"; }, 2000);
        });
      });
    });
  }

  // ── Typing Animation ───────────────────────────────────────────
  var typingStrings = [
    "Developer. Builder. Maker.",
    "I write code that works.",
    "Frontend. Backend. Full stack.",
    "Turning caffeine into commits.",
    "Exploring the web, one API at a time."
  ];
  var typingIndex = 0;
  var typingCharIndex = 0;
  var typingDeleting = false;
  var typingElement = null;
  var typingTimeout = null;

  function typeAnimation() {
    if (!typingElement) return;
    var currentString = typingStrings[typingIndex];

    if (!typingDeleting) {
      typingElement.textContent = currentString.substring(0, typingCharIndex + 1);
      typingCharIndex++;
      if (typingCharIndex === currentString.length) {
        typingDeleting = true;
        typingTimeout = setTimeout(typeAnimation, 2000);
        return;
      }
      typingTimeout = setTimeout(typeAnimation, 60);
    } else {
      typingElement.textContent = currentString.substring(0, typingCharIndex - 1);
      typingCharIndex--;
      if (typingCharIndex === 0) {
        typingDeleting = false;
        typingIndex = (typingIndex + 1) % typingStrings.length;
        typingTimeout = setTimeout(typeAnimation, 400);
        return;
      }
      typingTimeout = setTimeout(typeAnimation, 30);
    }
  }

  function startTyping() {
    typingElement = document.getElementById("hero-typing");
    if (!typingElement) return;
    typingCharIndex = 0;
    typingIndex = 0;
    typingDeleting = false;
    typeAnimation();
  }

  function stopTyping() {
    if (typingTimeout) clearTimeout(typingTimeout);
    typingElement = null;
  }

  // ── Smooth Anchor Navigation ───────────────────────────────────
  document.addEventListener("click", function (e) {
    var link = e.target.closest('a[href^="/#"]');
    if (link) {
      var hash = link.getAttribute("href");
      if (hash && hash.startsWith("/#")) {
        e.preventDefault();
        var targetId = hash.substring(1);
        if (getSlug()) {
          window.location.hash = "";
          setTimeout(function () {
            var target = document.querySelector(targetId);
            if (target) target.scrollIntoView({ behavior: "smooth" });
          }, 100);
        } else {
          var target = document.querySelector(targetId);
          if (target) target.scrollIntoView({ behavior: "smooth" });
        }
        closeMobileMenu();
      }
    }
  });

  // ── Home Page Rendering ────────────────────────────────────────
  function renderHomePage() {
    document.title = "magy070";
    mainContent.classList.remove("active");
    homeSections.classList.add("active");
    tocEl.innerHTML = "";
    stopTyping();

    var sorted = POSTS.slice().sort(function (a, b) {
      return b.date.localeCompare(a.date);
    });

    var html = "";

    // Hero
    html += renderHero();

    // Featured
    html += renderFeatured(sorted);

    // Latest
    html += renderLatest(sorted);

    // Categories
    html += renderCategories();

    // About
    html += renderAbout();

    // Newsletter
    html += renderNewsletter();

    homeSections.innerHTML = html;

    startTyping();
    initCopyCodeButtons();

    setTimeout(function () {
      initScrollAnimations();
      handleScroll();
    }, 50);
  }

  function renderHero() {
    return '' +
      '<section class="hero" id="hero">' +
        '<div class="hero-bg" aria-hidden="true"></div>' +
        '<div class="hero-palms" aria-hidden="true">' +
          '<svg class="palm palm-left" width="200" height="300" viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M100 300V120" stroke="rgba(0,0,0,0.6)" stroke-width="8"/>' +
            '<path d="M100 120C60 80 10 70 5 90C20 75 55 80 100 120Z" fill="rgba(0,0,0,0.5)"/>' +
            '<path d="M100 120C140 80 190 70 195 90C180 75 145 80 100 120Z" fill="rgba(0,0,0,0.5)"/>' +
            '<path d="M100 130C70 95 25 100 20 115C35 105 65 105 100 130Z" fill="rgba(0,0,0,0.45)"/>' +
            '<path d="M100 130C130 95 175 100 180 115C165 105 135 105 100 130Z" fill="rgba(0,0,0,0.45)"/>' +
            '<path d="M100 145C80 115 40 118 35 130C48 122 72 122 100 145Z" fill="rgba(0,0,0,0.4)"/>' +
            '<path d="M100 145C120 115 160 118 165 130C152 122 128 122 100 145Z" fill="rgba(0,0,0,0.4)"/>' +
          '</svg>' +
          '<svg class="palm palm-right" width="200" height="300" viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M100 300V100" stroke="rgba(0,0,0,0.6)" stroke-width="8"/>' +
            '<path d="M100 100C50 55 0 55 0 80C20 65 55 68 100 100Z" fill="rgba(0,0,0,0.5)"/>' +
            '<path d="M100 100C150 55 200 55 200 80C180 65 145 68 100 100Z" fill="rgba(0,0,0,0.5)"/>' +
            '<path d="M100 115C65 75 15 82 12 100C30 88 60 90 100 115Z" fill="rgba(0,0,0,0.45)"/>' +
            '<path d="M100 115C135 75 185 82 188 100C170 88 140 90 100 115Z" fill="rgba(0,0,0,0.45)"/>' +
          '</svg>' +
        '</div>' +
        '<div class="hero-floaters" aria-hidden="true">' +
          '<div class="floater"></div>' +
          '<div class="floater"></div>' +
          '<div class="floater"></div>' +
          '<div class="floater"></div>' +
          '<div class="floater"></div>' +
        '</div>' +
        '<div class="hero-content">' +
          '<div class="hero-badge">Developer Blog</div>' +
          '<h1 class="hero-title">magy<span class="highlight">070</span></h1>' +
          '<p class="hero-subtitle"><span id="hero-typing"></span><span class="cursor" aria-hidden="true"></span></p>' +
          '<a href="/#featured" class="hero-cta">Read the Blog &#8594;</a>' +
        '</div>' +
        '<div class="hero-scroll-indicator" aria-hidden="true">' +
          '<span></span>' +
          'Scroll' +
        '</div>' +
      '</section>';
  }

  function renderFeatured(sorted) {
    var featured = sorted.slice(0, 2);
    var cards = featured.map(function (post, i) {
      return renderBlogCard(post, i, true);
    }).join("");

    return '' +
      '<section class="section" id="featured">' +
        '<div class="animate-on-scroll">' +
          '<div class="section-label">Featured</div>' +
          '<h2 class="section-title">Latest Posts</h2>' +
          '<p class="section-desc">Thoughts on code, tools, and the craft of building things for the web.</p>' +
        '</div>' +
        '<div class="featured-grid">' + cards + '</div>' +
      '</section>';
  }

  function renderLatest(sorted) {
    var latest = sorted;
    var cards = latest.map(function (post, i) {
      return renderBlogCard(post, i, false);
    }).join("");

    return '' +
      '<section class="section" id="latest">' +
        '<div class="animate-on-scroll">' +
          '<div class="section-label">Archive</div>' +
          '<h2 class="section-title">All Articles</h2>' +
          '<p class="section-desc">Every post, sorted newest first.</p>' +
        '</div>' +
        '<div class="latest-grid">' + cards + '</div>' +
      '</section>';
  }

  function renderBlogCard(post, index, isFeatured) {
    var gradients = ["gradient-1", "gradient-2", "gradient-3", "gradient-4"];
    var gradientClass = gradients[index % gradients.length];
    var readTime = estimateReadingTime(post.content);
    var tagsHtml = (post.tags || []).map(function (t) {
      return '<span class="tag">' + escapeHtml(t) + '</span>';
    }).join("");
    var categoryLabel = (post.tags && post.tags[0]) ? post.tags[0] : "Post";
    var delayClass = "delay-" + (index + 1);

    return '' +
      '<article class="blog-card animate-on-scroll ' + delayClass + '">' +
        '<a href="' + location.pathname + '?post=' + escapeHtml(post.slug) + '" class="blog-card-link" aria-label="Read ' + escapeHtml(post.title) + '"></a>' +
        '<div class="blog-card-image">' +
          '<div class="blog-card-image-bg ' + gradientClass + '"></div>' +
          '<span class="blog-card-category">' + escapeHtml(categoryLabel) + '</span>' +
        '</div>' +
        '<div class="blog-card-body">' +
          '<h3 class="blog-card-title">' + escapeHtml(post.title) + '</h3>' +
          '<p class="blog-card-excerpt">' + escapeHtml(post.excerpt || "") + '</p>' +
          '<div class="blog-card-meta">' +
            '<div class="blog-card-meta-left">' +
              '<span>' + escapeHtml(post.date) + '</span>' +
              '<span class="blog-card-reading-time">' + readTime + ' min read</span>' +
            '</div>' +
          '</div>' +
          '<div class="blog-card-tags">' + tagsHtml + '</div>' +
        '</div>' +
      '</article>';
  }

  function renderCategories() {
    var tagMap = getAllTags();
    var pills = Object.keys(tagMap).sort().map(function (tag) {
      var count = tagMap[tag];
      return '' +
        '<div class="category-pill animate-on-scroll">' +
          '<span>' + escapeHtml(tag) + '</span>' +
          '<span class="category-pill-count">' + count + '</span>' +
        '</div>';
    }).join("");

    return '' +
      '<section class="section" id="categories">' +
        '<div class="animate-on-scroll">' +
          '<div class="section-label">Explore</div>' +
          '<h2 class="section-title">Categories</h2>' +
          '<p class="section-desc">Browse posts by topic.</p>' +
        '</div>' +
        '<div class="categories-row">' + pills + '</div>' +
      '</section>';
  }

  function renderAbout() {
    return '' +
      '<section class="section" id="about">' +
        '<div class="about-grid">' +
          '<div class="about-text animate-slide-left">' +
            '<div class="section-label">About</div>' +
            '<h2 class="section-title">The Developer</h2>' +
            '<p>Hey, I\'m magy070. I build things for the web — from small utilities to full-stack applications. This blog is where I share what I learn along the way.</p>' +
            '<p>I care about clean code, thoughtful design, and tools that respect your time. Currently focused on JavaScript, CSS, and building things that work.</p>' +
            '<div class="tech-stack">' +
              '<span class="tech-badge">JavaScript</span>' +
              '<span class="tech-badge">TypeScript</span>' +
              '<span class="tech-badge">CSS</span>' +
              '<span class="tech-badge">Node.js</span>' +
              '<span class="tech-badge">React</span>' +
              '<span class="tech-badge">Git</span>' +
            '</div>' +
          '</div>' +
          '<div class="about-visual animate-slide-right">' +
            '<div class="about-avatar">M</div>' +
          '</div>' +
        '</div>' +
      '</section>';
  }

  function renderNewsletter() {
    return '' +
      '<section class="section" id="newsletter">' +
        '<div class="newsletter-card animate-on-scroll">' +
          '<div class="section-label">Stay Updated</div>' +
          '<h2 class="section-title">Newsletter</h2>' +
          '<p class="section-desc">Get notified when I publish new posts. No spam, no tracking.</p>' +
          '<form class="newsletter-form" id="newsletter-form" novalidate>' +
            '<input type="email" class="newsletter-input" id="newsletter-email" placeholder="you@example.com" aria-label="Email address" required>' +
            '<button type="submit" class="newsletter-btn">Subscribe</button>' +
          '</form>' +
          '<div class="newsletter-success" id="newsletter-success">Thanks for subscribing! You\'re all set.</div>' +
        '</div>' +
      '</section>';
  }

  // ── Post View Rendering ────────────────────────────────────────
  function renderPost(slug) {
    var post = POSTS.find(function (p) { return p.slug === slug; });
    if (!post) {
      contentEl.innerHTML = '<div class="empty-state">Post not found.</div>';
      tocEl.innerHTML = "";
      mainContent.classList.add("active");
      homeSections.classList.remove("active");
      stopTyping();
      return;
    }

    homeSections.classList.remove("active");
    mainContent.classList.add("active");
    stopTyping();

    var raw = post.content;
    var result = parseFrontmatter("---\n---\n" + raw);
    var title = result.meta.title || post.title;
    var date = result.meta.date || post.date;
    var tags = result.meta.tags || post.tags || [];
    var readTime = estimateReadingTime(post.content);

    var rawHtml = marked.parse(result.body);
    var tocResult = generateTOC(rawHtml);
    var bodyHtml = tocResult ? tocResult.modifiedHtml : rawHtml;
    var tocHtml = tocResult ? tocResult.toc : "";

    var tagsHtml = tags.length
      ? '<div class="post-tags">' + tags.map(function (t) {
          return '<span class="tag">' + escapeHtml(t) + '</span>';
        }).join("") + '</div>'
      : '';

    contentEl.innerHTML = '' +
      '<a href="' + location.pathname + '" class="back-link">&#8592; All posts</a>' +
      '<article>' +
        '<div class="post-header">' +
          '<h1>' + escapeHtml(title) + '</h1>' +
          '<div class="post-meta">' +
            '<span>' + escapeHtml(date) + '</span>' +
            '<span class="post-meta-divider" aria-hidden="true"></span>' +
            '<span>' + readTime + ' min read</span>' +
          '</div>' +
          tagsHtml +
        '</div>' +
        '<div class="prose">' + bodyHtml + '</div>' +
      '</article>';

    tocEl.innerHTML = tocHtml;

    document.title = escapeHtml(title) + " — magy070";
    window.scrollTo(0, 0);

    initCopyCodeButtons();
    handleScroll();
  }

  // ── Routing ────────────────────────────────────────────────────
  function getSlug() {
    return new URLSearchParams(window.location.search).get("post");
  }

  function route() {
    var slug = getSlug();
    if (slug) {
      renderPost(slug);
    } else {
      renderHomePage();
    }
  }

  window.addEventListener("popstate", route);
  route();

  // ── Newsletter Form ────────────────────────────────────────────
  document.addEventListener("submit", function (e) {
    if (e.target && e.target.id === "newsletter-form") {
      e.preventDefault();
      var emailInput = document.getElementById("newsletter-email");
      var successMsg = document.getElementById("newsletter-success");
      if (!emailInput || !successMsg) return;

      var email = emailInput.value.trim();
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        emailInput.style.borderColor = "var(--secondary)";
        setTimeout(function () {
          emailInput.style.borderColor = "";
        }, 2000);
        return;
      }

      localStorage.setItem("newsletter_subscribed", "true");
      e.target.style.display = "none";
      successMsg.classList.add("visible");
    }
  });

  // Restore newsletter state
  if (localStorage.getItem("newsletter_subscribed") === "true") {
    var form = document.getElementById("newsletter-form");
    var success = document.getElementById("newsletter-success");
    if (form) form.style.display = "none";
    if (success) success.classList.add("visible");
  }

})();
