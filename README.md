# GeekTheme

GeekTheme is a modern, minimal Hugo theme focused on readability, accessibility, and a subtle futuristic aesthetic. It includes responsive layouts, a particle hero, an animated typewriter intro, a polished archive/taxonomy layout, and accessible components for tables, navigation, and tags.

## Key Features

- Responsive layout with sticky navigation and mobile-friendly controls
- Particle background support (particles.js)
- Typewriter hero (configurable via `/typewriter.json`)
- Archive and tags/taxonomy pages with improved spacing, tag chips and optional tag-cloud sizing
- Accessible focus states and reduced-motion fallbacks
- Polished table styles and pagination animations

## Installation

1. Copy this theme into your Hugo site's `themes/` directory, or add as a git submodule:

```bash
git submodule add <repo-url> themes/geektheme
```

2. In your site's config (e.g., `config.toml` / `hugo.toml` / `config.yaml`), set the theme:

```toml
theme = "geektheme"
```

3. Start the dev server to preview:

```bash
hugo server -D
```

## Configuration

Most theme defaults live in the theme's templates and CSS. There are a few configurable pieces you may want to customize.

- Particles: place a `particles.json` file at the site root (`static/particles.json`) or update the path in `assets/js/main.js`.

- Typewriter: the animated typewriter reads `/typewriter.json` from the site root. See the next section for details and examples.

- Tags & Archive: the theme includes improved CSS for tag chips, archives and taxonomy lists. Templates render standard Hugo taxonomy pages; style tweaks are in `assets/css/main.css`.

## Typewriter configuration (/typewriter.json)

Place a `typewriter.json` file in your site's `static/` folder (the theme also includes an example at `static/typewriter.json`). The theme will fetch this file at runtime and apply settings and phrases.

Supported top-level settings (all optional):

- `delay` (number): delay between keystrokes for the main line (ms). Default: `40`.
- `deleteSpeed` (number): speed used when deleting text for the info line. Default: `1`.
- `infoDelay` (number): delay between keystrokes for the info/subtitle line. Default: `1`.
- `loop` (boolean): whether the typewriter should loop. Default: `true`.

Phrases list property names accepted (theme supports multiple names):
- `writter` (example uses this misspelling) — supported for backwards compatibility
- `writer`, `phrases`, `writes`

Entry formats supported in the phrases array:

- Object with keys: `{ "title": "...", "subtitle": "..." }` — subtitle can also be `info` or `description`.
- Array: `["Title", "Subtitle"]`.
- String with pipe separator: "Title|Subtitle".
- String only: "Title" (subtitle will be empty).

Fallback: if the JSON fetch fails or is empty, the theme displays a single fallback phrase: `"Welcome to my blog"`.

Example `static/typewriter.json` (the theme includes a sample):

```json
{
  "delay": 40,
  "deleteSpeed": 40,
  "infoDelay": 1,
  "loop": true,
  "writter": [
    {
      "title": "This is my blog",
      "subtitle": "I write about tech, programming, and other stuff."
    },
    "Securing Code|Static Code Analysis, Web Security, and Finding Awesome Bugs...",
    ["Developing Software", "Python & Rust in Neovim..."],
    {
      "title": "Homelab",
      "subtitle": "Self Hosting, Hardware, and Services..."
    }
  ]
}
```

Notes:

- The script accepts `writter` (misspelling) for backwards compatibility but will also look for `writer`, `phrases`, and `writes`.
- If you want per-entry delays or custom timing you'll need to extend the JSON and the typewriter initialization script in `assets/js/main.js`.

## Recent updates

- Archive styles: improved responsive layout, two-column grouping on wider screens, accent-colored headings and accessible focus states (CSS in `assets/css/main.css`).
- Tags & taxonomy: new tag-chip styles, optional tag-cloud sizing via `--freq`, and a `.taxonomy-list` layout for category indexes.
- Typewriter: now reads `/typewriter.json` for settings and phrases; supports multiple entry formats and has a friendly fallback.

## Contributing

Contributions, bug reports, and improvements are welcome. Open an issue or send a PR. When changing behavior, please include a short README update and (if applicable) an example JSON or template change.

## License

This theme is released under the terms of the MIT License. See the `LICENSE` file for details.

---
Happy hacking — enjoy the theme! If you'd like, I can add a sample `static/typewriter.json` directly to your site or help adjust timings/colors.
# Theme Name

## Features

## Installation

## Configuration
