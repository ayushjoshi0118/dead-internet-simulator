# DEAD INTERNET SIMULATOR

> *"The network saw you coming."*

A complete, playable mystery web experience built as a fake browser — explore 12 fictional websites from a lost corner of the internet, discover clues, solve puzzles, and uncover the story of Dr. Elara Valdris and her final experiment.

---

## 🖥️ Setup & Running

### Prerequisites
- Node.js 18+
- npm 9+

### Install & Run

```bash
npm install
npm run dev
# Open http://localhost:5173
```

### Production Build

```bash
npm run build
npm run preview
```

### Run Tests

```bash
npm test           # one-shot run (48 tests)
npm run test:watch # watch mode
```

---

## 🎮 How to Play

### The Browser Interface
NetVault 3.2 — a retro browser with:
- **Address bar** — type URLs directly or search keywords
- **Tabs** — click `+` to open new tabs, `×` to close
- **Back/Forward** — standard navigation history per tab
- **★ Bookmark** button — save pages for quick return
- **Sidebar** (◧/◨) — History, Bookmarks, and the Notebook

### Navigation
- Click any **underlined link** to follow it
- Type a URL (e.g. `hollow://webring`) in the address bar
- Type keywords to search AltaVault
- Click history entries in the sidebar to revisit pages

### The Notebook (🗒)
Your detective's journal:
- **Clues** — auto-populated as you visit pages
- **Puzzles** — three puzzles with input fields; submit answers here
- **Hints** — each puzzle has a collapsible hint
- **Reset** — wipe all progress (requires confirmation)

---

## 🗺️ Site Map (12 Fictional Websites)

| URL | Name | Notes |
|-----|------|-------|
| `altavault://search` | AltaVault Search | Start here |
| `hollow://webring` | The Hollow Webring | Node 09 clue |
| `geocit://elara` | Elara's Corner | Elara's personal page |
| `usenet://sci.research.network` | USENET Mirror | Encoded message |
| `blog://marcus-fenn` | Marcus Fenn's Notebook | Word clue 1 |
| `valdris://home` | Valdris Institute | Research org |
| `valdris://restricted` | Restricted Archive | 🔒 Puzzle 1 |
| `ciphex://terminal` | CipheX Terminal | Cipher tool docs |
| `news://daily-packet` | The Daily Packet | Word clue 3 |
| `room://404` | Room 404 | Frozen chat, coord clue |
| `shrine://midnight` | Midnight Shrine | Word clue 2 |
| `valdris://final-message` | Final Transmission | 🔒 Puzzle 2 |
| `endpoint://the-endpoint` | THE ENDPOINT | 🔒 Puzzle 3 — ending |

---

## 🧩 Puzzles (Spoiler-free)

**Puzzle 1 — The Encoded Transmission** (Caesar Cipher)
- Clues: CipheX Terminal + USENET Mirror
- Unlocks: Valdris Restricted Archive

**Puzzle 2 — The Hidden Phrase** (Word Pattern)
- Clues: Marcus's Blog + Midnight Shrine + Daily Packet
- Unlocks: Valdris Final Transmission

**Puzzle 3 — The Access Sequence** (3-number code)
- Clues: Room 404 + AltaVault stats + Hollow Webring
- Unlocks: THE ENDPOINT (game completion)

---

## 📖 Story Overview

In 1997, Dr. **Elara Valdris** founded the Valdris Institute to study whether the internet develops emergent "witness" properties at scale. Five years of research across three phases. In October 2002, Phase 3 completed — and the Institute went dark. Elara vanished. Her assistant **Marcus Fenn** (`hollow_eye` on USENET) tried to warn people. Then he too went silent.

You piece together what happened from the digital ruins — forum posts, a frozen chatroom, an abandoned personal site, a shrine built by believers — and follow Elara's final message to THE ENDPOINT.

---

## 🔧 Architecture

```
src/
├── engine/           # Pure-function modules (no React)
│   ├── types.ts
│   ├── navigation.ts
│   ├── progress.ts
│   ├── puzzles.ts
│   └── search.ts
├── sites/
│   └── pages.ts      # All 12 fictional pages + 15 clues
├── context/
│   └── AppContext.tsx # Reducer + hooks
├── components/       # React UI
└── tests/            # 48 Vitest tests
```

---

## 🚀 GitHub Publication

```bash
git init
git add .
git commit -m "feat: Dead Internet Simulator"
git remote add origin https://github.com/YOUR_USERNAME/dead-internet-simulator.git
git push -u origin main
```

Deploy to **Netlify/Vercel** by connecting the repo — they handle Vite static builds automatically. For GitHub Pages, deploy the `/dist` folder.

---

## 🎛️ Controls

| Action | How |
|--------|-----|
| Navigate | Type URL in address bar → Enter |
| Follow link | Click underlined text |
| Back/Forward | ◀ ▶ buttons |
| New tab | `+` in tab bar |
| Bookmark | ☆ in address bar |
| Open sidebar | ◧ button |
| Submit puzzle | Notebook → Puzzles → SUBMIT |
| Reset progress | Notebook → Reset Progress |

---

MIT License
