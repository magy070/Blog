---
title: Hello World
date: 2026-07-22
tags: [meta, javascript]
---

Welcome to my blog. This is the first post — a place to think in public.

## Why a Static Markdown Blog?

No frameworks. No build tools. No database. Just:

- **HTML** for structure
- **CSS** for style
- **JavaScript** for rendering `.md` files in the browser

GitHub Pages hosts it for free, and the entire site is a single repo.

## How It Works

Each post is a Markdown file in `posts/` with a YAML frontmatter header:

```yaml
---
title: Hello World
date: 2026-07-22
tags: [meta, javascript]
---
```

The page fetches the file, parses the frontmatter, and runs it through [marked.js](https://marked.js.org) to produce HTML. Code blocks get syntax highlighting from [highlight.js](https://highlightjs.org).

## Code Example

Here's a small JavaScript snippet, just to show syntax highlighting in action:

```js
function fibonacci(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}

console.log(fibonacci(10)); // 55
```

And some Python:

```python
def fibonacci(n: int) -> int:
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

print(fibonacci(10))  # 55
```

## What's Next

Write more posts. Add them to the `POSTS` array in `script.js`. Push to GitHub. Done.

> The best blog is the one you actually write in.
