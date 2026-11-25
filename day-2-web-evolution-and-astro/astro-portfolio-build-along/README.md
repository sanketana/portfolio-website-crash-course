# Mira Varma's portfolio: an Astro build-along

## Part 1 · The project

### What it is

A portfolio website for Mira Varma, a **fictional** application security lead, built with Astro 7 and hosted free on GitHub Pages. One small site shows the three kinds of content Astro handles:

1. **Static content.** The home page, written in plain HTML. It ships with zero JavaScript.
2. **Content from a collection.** Security write-ups kept as Markdown files. A schema checks each one, and Astro turns every file into its own page.
3. **An island.** A React contact form. It loads JavaScript only when it scrolls into view, and sends messages through Formspree without leaving the page.

"Dynamic" content here means *data-driven*. The write-up pages are generated from Markdown files when the site is built, not on each visit. The finished site is still just static files, which is why GitHub Pages can host it.

### Setup

- **Node.js 22.23.4 or newer.** Astro 7 requires it. Check with `node -v`.
- **Git and a GitHub account.**
- **A GitHub repository named `portfolio`** (public). In the repo, open Settings › Pages and set Source to **GitHub Actions**. You only do this once.
- **Edit `astro.config.mjs`.** Replace `YOUR-GITHUB-USERNAME` with your GitHub username. If the repository has a different name, change `base: '/portfolio/'` to match it.
- **A free Formspree account (from step 7).** Create a form and copy its address, which looks like `https://formspree.io/f/abcdwxyz`. Paste it into `FORMSPREE` in `src/pages/index.astro`.
- **Commit `package-lock.json`.** `npm install` creates it, and the GitHub Action uses it to choose npm.

There are no secrets in this project. The Formspree address is public by design, because it sits in the page's HTML. Spam is handled by the hidden `_gotcha` field and by Formspree's own settings. Even so, never commit passwords or API keys to a repository, and never put them in HTML comments. View source shows comments to everyone.

### How to run

- **Any step:** `cd step5_collection && npm install && npm run dev`, then open http://localhost:4321/portfolio/
- **See what gets published:** `npm run build`, then look inside `dist/`. `npm run preview` serves that folder.
- **Publish:** from step 3 on, `git push` to `main`. The workflow builds and deploys the site to `https://YOUR-GITHUB-USERNAME.github.io/portfolio/`.

### How the code works (final version, step 8)

- **`astro.config.mjs`** says where the site lives (`site` and `base`, for GitHub Pages) and turns on React.
- **`src/layouts/Base.astro`** is the shell every page shares: the `<head>`, the tab title, the styles and the footer. `<slot />` is where each page's own content goes.
- **`src/pages/index.astro`** is the home page. It has the static intro and skills (plain HTML), a write-ups list built from the collection, and the contact form island.
- **`src/content.config.ts`** defines the `writeups` collection: where the files are (`glob`) and the shape each one must have (the schema: title, date, summary).
- **`src/content/writeups/*.md`** are the write-ups: frontmatter for the data, Markdown for the story.
- **`src/pages/writeups/[id].astro`** builds one page per write-up. `getStaticPaths` lists them at build time, and `render()` turns each one's Markdown into HTML.
- **`src/components/ContactFormBasic.astro`** is the plain HTML form, kept as the stepping stone the island improved on.
- **`src/components/ContactForm.jsx`** is the island. React keeps a `status` (idle, sending, sent or error) and sends the form with `fetch()`, so the page never reloads. It keeps `action` and `method` too, so the form still works without JavaScript.
- **`.github/workflows/deploy.yml`** is GitHub's robot. On every push it runs `npm run build` and publishes `dist/`.

### Changes from the original

There was no earlier project: this one was built for this class. These were the decisions taken:

- **Versions:** Astro 7.4, React 19 through `@astrojs/react`, and Formspree for the form.
- **`base` ends in a slash** (`/portfolio/`), so the links built from `import.meta.env.BASE_URL` come out right.
- **Spam protection:** a hidden `_gotcha` field, so Formspree can drop bot messages.

### Files

- **`step1_home/` … `step8_island/`:** the project as it stands at the end of each step. Each one is complete and runnable with `npm install && npm run dev`. The header comment at the top of each step's `src/pages/index.astro` says what that step adds and how it ends.
- **`diffs/`:** what each step adds (`step3_to_step4.diff` and so on). Use these to rescue a stuck student, one step at a time.
- **`package.json`** carries no bucket tags, because JSON can't hold comments. Its only change is in step 8, which adds React; see `diffs/step7_to_step8.diff`.

## Part 2 · Teaching guide

**Class and assumptions.** Parul, a security manager who knows some HTML and no JavaScript; 1:1, one 90-minute session. The island uses React to match the Astro deck. The form sends through Formspree. Defaults used: the fictional persona (Mira Varma), write-ups as the collection's content, and deployment through GitHub Actions.

**Slides.** "Astro Portfolio: Visual Notes" (https://claude.ai/artifact/GMLjdkaA3r4B3unk9Gd29Q) has four slides: what `npm run build` puts in `dist/` (step 3), the push-to-live pipeline (step 3), a Markdown file passing or failing the schema (step 5), and when the island wakes up (step 8).

**How to unpack the lesson.** The session exists to land three ideas, and one is the spine to protect if time runs short:

1. **The spine:** Astro builds plain HTML ahead of time, and JavaScript is the exception you opt into.
2. Content can live as data (Markdown), with a schema guarding what gets in.
3. One interactive part can be an island without turning the site into an app.

Open by showing the finished site live and asking: "How much JavaScript do you think this page needs?" Let her guess; the answer arrives at step 8.

At every step, keep the same rhythm:

- Parul predicts before each run.
- She explains every paste before it runs.
- She types where the idea lives, while you describe the intent instead of dictating the syntax.
- Then break something on purpose to reveal the next gap.

The two failures are gifts, so slow down there:

- **Step 4:** the Markdown files exist, but the site ignores them.
- **Step 5:** the schema blocks a write-up. This is input validation, her own field, and the collection slide frames it.

Use the dist slide after the first `npm run build`, and the island slide with the Network tab open. Close by asking her to explain, from memory, what happens from `git push` to a visitor clicking Send. Her `view source` comments are also a natural security aside: everything in HTML comments ships to the browser.

**Growth chain**

| Step | Enhancement | Ends with |
|---|---|---|
| 1 · Home | project config (PASTE), Mira's intro and skills in HTML (TYPE) | works, but the tab has no title and the page is unstyled |
| 2 · Layout | Base layout shell (INVESTIGATE), import + wrap (PASTE), three colours (TYPE), styles (INVESTIGATE) | works: styled, with a tab title |
| 3 · Deploy | GitHub Actions workflow (INVESTIGATE), repo + Pages setup | **★ payoff:** live on GitHub Pages |
| 4 · Markdown | her write-up as Markdown (TYPE), a given second write-up (INVESTIGATE) | **fails:** the site ignores both files |
| 5 · Collection | collection config (PASTE), schema fields (TYPE), list on home (PASTE) | **fails:** the build stops, because the given write-up has no `summary` |
| 6 · Pages | the missing `summary:` line (TYPE), `[id].astro` (INVESTIGATE/PASTE), title wrapped in a link | **★ payoff:** listed write-ups, each with its own page |
| 7 · Form | Formspree address (TYPE), plain HTML form + spam trap (TYPE), contact section (PASTE) | **fails:** sending takes the visitor off the site |
| 8 · Island | React integration (PASTE), `ContactForm.jsx` (PASTE/INVESTIGATE), messages (TYPE), swap to `client:visible` (TYPE) | **★ payoff:** sends in place; JS loads only when the form scrolls into view |

### The steps

**Step 1 · Home.** Paste `astro.config.mjs` and `.gitignore`, and ask why the address ends in the repo name. Parul types Mira's heading, role, intro and a four-item skills list. Prediction: "What will view source show?" Expect a page with the four skills and no `<script>` anywhere. Break it: point at the tab. It shows only the address, with no title. That gap leads to step 2.

**Step 2 · Layout.** Paste the import and wrap the page in `<Base title="…">`. Investigate `Base.astro`. Parul types the three `--ink`, `--accent` and `--paper` colours. Expect the tab title and the styled page; changing `--accent` recolours the headings and links. Break it: delete `<slot />` and her whole page vanishes, which shows what a slot is. Put it back.

**Step 3 · Deploy.** Run `npm run build` and open `dist/`: one HTML file, no JS. Show the dist slide here. Investigate `deploy.yml` against the pipeline slide, then create the repo, set Pages to GitHub Actions, and push. Expect a green run in the Actions tab and the site at `https://<username>.github.io/portfolio/`. Ask: "If you wanted ten write-ups, how would you add them?" (Ten hand-made pages.) That question sets up stage 2.

**Step 4 · Markdown.** Parul types her own write-up in `src/content/writeups/`: frontmatter (title, date, summary) and a short story. The second, given file has no summary yet; don't mention it. Prediction: "Will the home page show the write-ups now?" Expect nothing to change, and `dist/` still holds only `index.html`. The gap: Astro doesn't know these files are content.

**Step 5 · Collection.** Paste `content.config.ts` and have Parul type the three schema fields (`z.string()` for text, `z.coerce.date()` for the date). Paste the `getCollection` line and the list. Prediction: "How many `<li>` will the browser get?" Expect the build to stop with `InvalidContentEntryDataError … summary: Required`, naming `hospital-app-pentest.md`. Show the collection slide now, before she fixes it. The schema caught bad data, which is input validation.

**Step 6 · Pages.** Parul adds one line, `summary:`, to the given write-up. Paste `[id].astro`, investigate `getStaticPaths` ("when does this run, and how many pages?"), and wrap each title in a link. Expect both write-ups listed newest first, each link opening its own page, and `dist/writeups/` holding two folders. Push to see them live. Break it: delete the summary again, and the gate holds.

**Step 7 · Form.** Parul types the `FORMSPREE` address (her real form) and a plain HTML form with name, email, message, Send, plus the hidden `_gotcha` spam trap. Paste the import and the contact section. Expect a message to arrive in her inbox, but sending throws the visitor onto Formspree's page. Ask: "Which era of the deck does this feel like?" (The 2000s full-page reload.) That is the gap.

**Step 8 · Island.** Paste the React integration and run `npm install` again (step 8 adds three packages). Investigate `ContactForm.jsx`: `handleSubmit` is the AJAX idea from the deck. Ask her to spot the four differences from her HTML form (`className`, the `style={{…}}` object, `tabIndex`, `rows={4}`). Parul types the sent and error messages, and swaps the usage to `<ContactForm client:visible action={FORMSPREE} />`. Then use the island slide: with the window short and the Network tab filtered to JS, there are zero files until she scrolls, then three arrive. Sending shows "Thanks…" with no reload. Push to put it live.
