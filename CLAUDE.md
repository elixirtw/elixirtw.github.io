# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Elixir Taiwan community website and blog. Static site built with Hugo and styled with Tailwind CSS v4, deployed to GitHub Pages at https://elixir.tw.

## Development Commands

```bash
# Install dependencies (requires Hugo: brew install hugo)
npm install

# Start development server (http://localhost:1313)
make server

# Watch CSS changes (separate terminal, optional)
make watch-css

# Production build
make build

# Create new blog post
hugo new posts/YOUR_ARTICLE_TITLE.md
```

## Architecture

- **Hugo** (v0.150.1): Static site generator with TOML config
- **Tailwind CSS v4**: Styling framework with custom Elixir purple theme
- **GitHub Actions**: CI/CD pipeline in `.github/workflows/hugo.yaml`

### Key Directories

- `content/` - Markdown content (Chinese default, `content/en/` for English)
- `themes/elixirtw/layouts/` - Hugo templates (baseof.html is the root template)
- `themes/elixirtw/assets/css/main.css` - Tailwind source CSS
- `themes/elixirtw/static/css/main.css` - Compiled CSS output

### Content Structure

Pages use custom layouts defined in `themes/elixirtw/layouts/_default/`. Each page specifies its layout in front matter (TOML format with `+++`).

Blog posts go in `content/posts/` and use the `posts/list.html` layout for listing.

### Configuration

- `hugo.toml` - Site config (menus, languages, social links, Giscus comments)
- `tailwind.config.js` - Custom colors and theme extensions
