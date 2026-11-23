# Day 1 handout: Web basics and Git

**Goal for today:** your own profile page, typed by you, live on the internet at `https://USERNAME.github.io` (replace `USERNAME` with your GitHub username everywhere below).

---

## 1. What a website is

When someone opens your address:

1. **Browser:** they type `USERNAME.github.io` into Chrome or Safari.
2. **DNS:** the name is looked up, like a phone book, and turned into a server's IP address.
3. **Server:** the server sends back your files (HTML, CSS, images) over **HTTPS**, encrypted.
4. **Page:** the browser reads the files and draws the page.

A website is just a folder of ordinary files:

```
USERNAME.github.io/
  index.html   the page
  style.css    the looks
  photo.jpg    an image
```

**Hosting** means keeping that folder on a server that is always on. **Deploying** means putting a new version there.

## 2. HTML and CSS in one minute

| Language   | Job                         | Like a house…             |
| ---------- | --------------------------- | ------------------------- |
| HTML       | What is on the page         | the walls and rooms       |
| CSS        | How it looks                | the paint and furniture   |
| JavaScript | What reacts (forms, menus)  | the electricity (later)   |

**An HTML element:** `<a href="https://…">LinkedIn</a>` is an opening tag (with an *attribute*, `href`), then the content, then a closing tag.

| Tag                          | For                         |
| ---------------------------- | --------------------------- |
| `<h1>` … `<h6>`              | Headings (one `h1` per page) |
| `<p>`                        | A paragraph                 |
| `<a href="…">`               | A link                      |
| `<img src="…" alt="…">`      | An image and its description |
| `<ul>` and `<li>`            | A list and its items        |
| `<main>`, `<header>`, `<div>` | Boxes that group things     |

**A CSS rule:** `h1 { color: #10213f; }` means "find every `h1`, set its `color` to navy". The *selector* (`h1`) picks elements, the *property* (`color`) says what to change, the *value* (`#10213f`) says what to change it to.

## 3. Terminal commands

| Command          | Means                      |
| ---------------- | -------------------------- |
| `pwd`            | Where am I?                |
| `ls`             | What is in this folder?    |
| `cd Documents`   | Go into a folder           |
| `cd ..`          | Go up one folder           |
| `mkdir practice` | Make a folder              |
| `touch notes.txt` | Make an empty file        |
| `open .`         | Show this folder in Finder |
| `code .`         | Open this folder in VS Code |

Tips: **Tab** completes a name; **Up arrow** repeats the last command.

## 4. VS Code shortcuts

| Keys                 | Does                                 |
| -------------------- | ------------------------------------ |
| Cmd + S              | Save                                 |
| Cmd + P              | Open a file by name                  |
| Ctrl + `             | Show or hide the terminal            |
| Cmd + Shift + P      | Command palette (every action)       |
| Cmd + /              | Comment a line on or off             |
| Option + Shift + F   | Tidy the indenting                   |
| Cmd + Z              | Undo                                 |

## 5. One-time setup (once per computer)

```bash
# 1. Install Git (Apple's developer tools)
xcode-select --install
git --version

# 2. Tell Git who you are
git config --global user.name "Parul Sharma"
git config --global user.email "USERNAME@users.noreply.github.com"

# 3. Sign in to GitHub (install the GitHub CLI from cli.github.com first)
gh auth login
```

For `gh auth login` choose: **GitHub.com → HTTPS → Yes → Login with a web browser**.

**Why the noreply email?** Your email is stamped on every commit and your repo is public. GitHub's private address (Settings → Emails) keeps your real one out of view.

---

## 6. Exercise: your profile page

### Step 1: Create the repo and bring it to your Mac

On **github.com**:

1. Click **+ → New repository**.
2. Name it exactly `USERNAME.github.io`.
3. Choose **Public** and tick **Add a README**.
4. Click **Create**, then copy the HTTPS address from the green **Code** button.

In the **terminal**:

```bash
cd ~/Documents
git clone https://github.com/USERNAME/USERNAME.github.io.git
cd USERNAME.github.io
code .
```

Copy your photo into this folder and name it `photo.jpg` (lower case).

### Step 2: Type `index.html`

In VS Code: **New File**, name it `index.html`, and type this in. Replace the `[brackets]` with your own words.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
    content="width=device-width, initial-scale=1">
  <title>Parul Sharma</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main>
    <img src="photo.jpg" alt="Parul Sharma">
    <h1>Parul Sharma</h1>
    <p class="tagline">[your 30-second message]</p>
    <p>[two or three sentences about you]</p>
    <a href="[your LinkedIn URL]">LinkedIn</a>
  </main>
</body>
</html>
```

Save, then double-click `index.html` in Finder to see it in your browser.

### Step 3: Type `style.css`

**New File**, named `style.css`, in the same folder:

```css
body {
  margin: 0;
  background: #fbf8f1;
  color: #141b2a;
  font-family: Georgia, serif;
  line-height: 1.6;
}
main {
  max-width: 560px;
  margin: 80px auto;
  padding: 0 16px;
  text-align: center;
}
img {
  width: 160px;
  border-radius: 50%;
}
.tagline { font-size: 22px; }
a { color: #10213f; }
```

Save and reload the browser. These colours are placeholders; you choose your own on Day 3.

### Step 4: Commit, push and go live

```bash
git status
git add .
git commit -m "My first page"
git push
```

Read what `git status` lists before you add it.

Then on **github.com**: open your repo → **Settings → Pages**. Check the source is **Deploy from a branch**, **main**, **/ (root)**. Wait about a minute (the **Actions** tab shows progress), then open `https://USERNAME.github.io`.

### Done when

- [ ] `https://USERNAME.github.io` opens on your phone
- [ ] Your photo shows, in a circle
- [ ] The LinkedIn link goes to your profile
- [ ] Your commit "My first page" is on GitHub

**Stretch:** change one colour in `style.css`, then save, commit, push and watch the live site update. That loop is how you will update your site from now on.

---

## 7. Your five-command Git cheat sheet

```bash
git status                    # what has changed?
git add index.html            # stage a file (git add . = everything)
git commit -m "Add my bio"    # save a snapshot with a note
git push                      # send it to GitHub
git log --oneline             # list your save points
```

When in doubt, run `git status`.

## 8. Your repo is public

On a free GitHub plan, a Pages site needs a public repo, so anyone can read your files.

- **Safe to commit:** your bio, your talks, the photo you chose, your HTML and CSS.
- **Never commit:** passwords, tokens or API keys; your phone number or home address; anything internal from work.

Git never forgets: deleting a file later still leaves it in the history.

## 9. If something goes wrong

| Problem                              | Try this                                                                 |
| ------------------------------------ | ------------------------------------------------------------------------ |
| `code .` says "command not found"    | In VS Code: Cmd + Shift + P → "Shell Command: Install 'code' command in PATH" |
| `git push` asks for a password       | Run `gh auth login` again                                                |
| The site shows 404                   | Wait another minute, then hard-reload with Cmd + Shift + R               |
| The photo doesn't show               | Check the file is named exactly `photo.jpg`, lower case, in the same folder |
| The page has no styling              | Check `style.css` is in the same folder and the `<link>` line is spelt right |

## 10. Before Day 2 (20–30 minutes)

1. Paste your resume into Claude with the prompt you'll be sent, and ask for two bio drafts: one short, one long.
2. Edit one of them into your own voice.

**Next: Day 2, Astro and Claude Code.** Your page moves into a real framework without losing a line you typed today.
