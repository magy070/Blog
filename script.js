// ── Post Manifest ──────────────────────────────────────────────
// To add a new post: add an entry here with slug, title, date, tags, and raw content.
const POSTS = [
  {
    slug: "hello-world",
    title: "Hello World",
    date: "2026-07-22",
    tags: ["meta", "javascript"],
    content: `Welcome to my blog. This is the first post — a place to think in public.

## Why a Static Markdown Blog?

No frameworks. No build tools. No database. Just:

- **HTML** for structure
- **CSS** for style
- **JavaScript** for rendering \`.md\` files in the browser

GitHub Pages hosts it for free, and the entire site is a single repo.

## How It Works

Each post is an entry in the \`POSTS\` array in \`script.js\` with a \`content\` field containing Markdown.

The page parses the content and runs it through [marked.js](https://marked.js.org) to produce HTML. Code blocks get syntax highlighting from [highlight.js](https://highlightjs.org).

## Code Example

Here's a small JavaScript snippet, just to show syntax highlighting in action:

\`\`\`js
function fibonacci(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}

console.log(fibonacci(10)); // 55
\`\`\`

And some Python:

\`\`\`python
def fibonacci(n: int) -> int:
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

print(fibonacci(10))  # 55
\`\`\`

## What's Next

Write more posts. Add entries to the \`POSTS\` array in \`script.js\`. Push to GitHub. Done.

> The best blog is the one you actually write in.`,
  },
];

// ── Markdown Setup ─────────────────────────────────────────────
marked.setOptions({
  gfm: true,
  breaks: false,
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  },
});

// ── Frontmatter Parser ─────────────────────────────────────────
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta = {};
  match[1].split("\n").forEach((line) => {
    const idx = line.indexOf(":");
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if (val.startsWith("[") && val.endsWith("]")) {
      val = val.slice(1, -1).split(",").map((s) => s.trim());
    }
    meta[key] = val;
  });
  return { meta, body: match[2] };
}

// ── TOC Generator ──────────────────────────────────────────────
function generateTOC(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  const headings = div.querySelectorAll("h2, h3, h4");
  if (headings.length < 2) return "";
  let toc = '<div class="toc-title">On this page</div><ul>';
  headings.forEach((h, i) => {
    const level = h.tagName.toLowerCase();
    const id = "heading-" + i;
    h.id = id;
    toc += `<li class="toc-${level}"><a href="#${id}">${h.textContent}</a></li>`;
  });
  toc += "</ul>";
  return { toc, modifiedHtml: div.innerHTML };
}

// ── Theme ──────────────────────────────────────────────────────
function getTheme() {
  return localStorage.getItem("theme") || "light";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  const lightSheet = document.getElementById("hljs-light");
  const darkSheet = document.getElementById("hljs-dark");
  if (lightSheet && darkSheet) {
    lightSheet.disabled = theme === "dark";
    darkSheet.disabled = theme !== "dark";
  }
}

document.getElementById("theme-toggle").addEventListener("click", () => {
  applyTheme(getTheme() === "dark" ? "light" : "dark");
});

applyTheme(getTheme());

// ── Routing & Rendering ────────────────────────────────────────
const contentEl = document.getElementById("content");
const tocEl = document.getElementById("toc");

function getSlug() {
  return new URLSearchParams(window.location.search).get("post");
}

function renderPost(slug) {
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) {
    contentEl.innerHTML = '<div class="empty-state">Post not found.</div>';
    tocEl.innerHTML = "";
    return;
  }

  const raw = post.content;
  const { meta, body } = parseFrontmatter("---\n---\n" + raw);
  const title = meta.title || post.title;
  const date = meta.date || post.date;
  const tags = meta.tags || post.tags || [];

  const rawHtml = marked.parse(body);
  const result = generateTOC(rawHtml);
  const bodyHtml = result ? result.modifiedHtml : rawHtml;
  const tocHtml = result ? result.toc : "";

  const tagsHtml = tags.length
    ? `<div class="post-tags">${tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>`
    : "";

  contentEl.innerHTML = `
    <a href="${location.pathname}" class="back-link">&larr; All posts</a>
    <article>
      <div class="post-header">
        <h1>${title}</h1>
        <div class="post-meta">${date}</div>
        ${tagsHtml}
      </div>
      <div class="prose">${bodyHtml}</div>
    </article>
  `;
  tocEl.innerHTML = tocHtml;

  document.title = `${title} — magy070`;
  window.scrollTo(0, 0);
}

function renderHome() {
  document.title = "magy070";
  tocEl.innerHTML = "";

  const sorted = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));

  if (sorted.length === 0) {
    contentEl.innerHTML = '<div class="empty-state">No posts yet.</div>';
    return;
  }

  const list = sorted
    .map((p) => {
      const tagsHtml = p.tags
        ? `<div class="post-tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>`
        : "";
      return `
        <li>
          <a href="${location.pathname}?post=${p.slug}">${p.title}</a>
          <span class="post-date">${p.date}</span>
          ${tagsHtml}
        </li>
      `;
    })
    .join("");

  contentEl.innerHTML = `<ul class="post-list">${list}</ul>`;
}

function route() {
  const slug = getSlug();
  if (slug) {
    renderPost(slug);
  } else {
    renderHome();
  }
}

window.addEventListener("popstate", route);
route();
