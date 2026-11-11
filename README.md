# DevTrack — Developer Portfolio & Task Ecosystem

![Release](https://img.shields.io/badge/Release-Week%206%20Capstone-6366F1?style=for-the-badge&logo=rocket)
![License](https://img.shields.io/badge/License-MIT-10B981?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-Semantic%20Standards-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Grid%20%26%20Flexbox-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B%20Vanilla-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

> **Final 6-Week Web Development Internship Capstone Project**  
> **Author & Engineer:** Nickson Kumar  
> **GitHub Profile:** [Nickson-D-kumar](https://github.com/Nickson-D-kumar)  
> **Repository Name:** `WD_Week6_NicksonKumar`  
> **Live Production URL:** [https://nickson-d-kumar.github.io/WD_Week6_NicksonKumar/](https://nickson-d-kumar.github.io/WD_Week6_NicksonKumar/)

---

## 1. Project Objective & Overview

**DevTrack** is an enterprise-grade, single-page developer portfolio and real-time sprint execution engine. Engineered as the capstone deliverable for the intensive 6-Week Web Development Internship, this application unites a responsive software showcase with a full client-side task kanban and telemetry management suite. 

The primary architectural objective was to construct a robust, zero-framework web application conforming to modern web standards, strict WCAG 2.1 AA accessibility guidelines, modular state machines, and progressive enhancements without relying on third-party runtime dependencies.

---

## 2. Technical Stack & Architecture

| Layer | Technologies & Design Patterns |
|---|---|
| **Markup & Semantics** | Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`), ARIA Roles, Microdata |
| **Styling & Layout** | CSS3 Custom Properties (Design Tokens), CSS Grid (3-column responsive layout), Flexbox, Mobile-First Media Queries |
| **Design System** | Indigo Primary (`#6366F1`), Emerald Accent (`#10B981`), Slate 900 (`#0F172A`), Slate 50 Canvas (`#F8FAFC`) |
| **Scripting & Logic** | Modern Vanilla JavaScript (ES6+), Event Delegation, State Immutability, DOM Mutation APIs |
| **Data Persistence** | HTML5 Web Storage API (`localStorage`), JSON Serialization, Schema Hydration & Versioning |
| **Form Engineering** | RFC 5322 Regex Validation, Real-Time Input Observers, Accessible Modal Focus Management |
| **DevOps & CI/CD** | Git Version Control, Conventional Commits, GitHub Pages Static Edge Hosting |

---

## 3. Core Features & Capabilities

1. **Semantic HTML5 Landmark Architecture:**
   - Structured with dedicated structural regions (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`) ensuring assistive technology compatibility and optimized search engine indexing.

2. **Multidimensional Responsive Layout Engine:**
   - **CSS Grid:** 3-column project grid adapting dynamically to 2 columns on tablet devices (<1024px) and 1 column on mobile (<640px).
   - **Flexbox:** Fluid navigation bar, dynamic metric telemetry cards, tag groups, and category filter pill bars.

3. **Dynamic State & DOM Rendering:**
   - Pure client-side state orchestration without page reloads. Projects and sprint tasks are constructed safely using DOM node creation and HTML entity escaping to mitigate Cross-Site Scripting (XSS).

4. **Sprint Execution & Task CRUD Engine:**
   - **Create:** Add tasks with title, category, priority, estimated hours, and acceptance criteria.
   - **Read:** Live backlog visualization with priority color badges (`High: Rose`, `Medium: Amber`, `Low: Emerald`).
   - **Update:** Checkbox completion toggle with instantaneous status badges and strikethrough styling.
   - **Delete:** Non-destructive soft/hard removal with immediate toast alerts.

5. **Live Search & Category Filtering:**
   - Instant search filtering on projects and tasks with debounce-ready input listeners. Category pills with dynamic counters for Full-Stack, Frontend, Backend, and DevOps repositories.

6. **Real-Time Telemetry & Metric Synchronizer:**
   - Dynamic recalculation of total tasks, completed milestones, pending sprint items, and overall completion velocity percentage with visual progress bars.

7. **Validated Contact / Collaboration Modal:**
   - Accessible modal dialogue with background blur, ESC key dismiss, backdrop click listener, and real-time field validation using RFC-compliant regular expressions for email validation.

8. **Browser `localStorage` Synchronization:**
   - State persists seamlessly across sessions. Built-in fallback seeds default demo tasks when uninitialized and provides a one-click reset action.

---

## 4. Git Version Control & Progressive Milestone Workflow

The repository was built through disciplined, progressive milestones adhering to the Conventional Commits specification. Below are the sequential CLI commands used to configure, initialize, stage, and commit the codebase:

```bash
# Step 1: Configure Git Author Identity
git config --global user.name "Nickson Kumar"
git config --global user.email "nickson.kumar.dev@example.com"

# Step 2: Initialize Git Repository
cd WD_Week6_NicksonKumar
git init -b main

# Step 3: Progressive Milestone 1 - Scaffolding & Semantics
git add .gitignore assets/ index.html
git commit -m "feat(scaffold): initialize semantic HTML5 document structure, navigation, and SVG assets"

# Step 4: Progressive Milestone 2 - CSS Grid, Flexbox & Theme System
git add style.css
git commit -m "feat(styles): implement responsive SaaS layout, CSS Grid, Flexbox, and design tokens"

# Step 5: Progressive Milestone 3 - State Engine & Dynamic Projects
git add app.js
git commit -m "feat(portfolio): integrate dynamic project rendering, category filter pills, and live search"

# Step 6: Progressive Milestone 4 - Sprint Kanban & LocalStorage CRUD
git add app.js index.html style.css
git commit -m "feat(tasks): implement CRUD task sprint engine with metrics tracking and localStorage persistence"

# Step 7: Progressive Milestone 5 - Modal Validation, Notifications & Docs
git add README.md app.js index.html
git commit -m "feat(ux): implement accessible contact modal, regex validation, toast alerts, and comprehensive docs"

# Step 8: Configure Remote Repository & Push to GitHub
git remote add origin https://github.com/Nickson-D-kumar/WD_Week6_NicksonKumar.git
git branch -M main
git push -u origin main
```

---

## 5. Deployment Instructions (GitHub Pages)

To publish **DevTrack** live to the web via GitHub Pages:

1. Push your repository to GitHub: `git push -u origin main`.
2. Navigate to your repository on GitHub: `https://github.com/Nickson-D-kumar/WD_Week6_NicksonKumar`.
3. In the repository top navigation, click on **Settings** (gear icon).
4. In the left sidebar, navigate to the **Code and automation** section and select **Pages**.
5. Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
6. Under **Branch**, select `main` from the dropdown and set the folder path to `/(root)`.
7. Click **Save**.
8. GitHub Actions will trigger an automated deployment workflow. Within 1-2 minutes, the live URL will become active at:
   ```
   https://nickson-d-kumar.github.io/WD_Week6_NicksonKumar/
   ```

---

## 6. Technical Project Report & 6-Week Internship Learnings

### Engineering Challenges & Architectural Solutions

During the construction of **DevTrack**, two key technical challenges arose:

1. **State Synchronization across Dynamic DOM and LocalStorage:**  
   *Challenge:* Direct DOM manipulation can lead to fragmented state where the visual display desynchronizes from `localStorage` during simultaneous search filtering and task mutations.  
   *Solution:* Implemented a single-source-of-truth state object (`AppState`). All user interactions (adding a task, toggling a checkbox, filtering by category) first mutate `AppState`, execute the persistence pipeline, and subsequently trigger idempotent render passes (`renderMetrics()`, `renderTasks()`). Event delegation on the parent container (`#taskList`) ensures listeners are never lost when elements are recreated.

2. **Regex Precision and Accessible Modal Behavior:**  
   *Challenge:* Native browser forms often cause abrupt page refreshes, and modal focus traps can disrupt screen readers if keyboard navigation (`Escape`, `Tab`) is unhandled.  
   *Solution:* Designed a custom JavaScript `ModalManager` utilizing `aria-modal="true"`, background scroll locking, auto-focusing the first input upon launch, and handling `Escape` key dismissal. Implemented RFC-5322 regex validation with real-time feedback that validates input upon both `input` and `blur` events without jarring error flashes.

### 6-Week Full-Stack Internship Retrospective

The 6-week curriculum served as a transformative journey from core engineering principles to holistic application architecture:

- **Week 1 (Version Control & CI/CD Pipelines):** Mastered Git CLI branching, conflict resolution, atomic commits, SSH key authentication, and collaborative pull requests.
- **Week 2 (Semantic Web & Accessibility):** Cultivated an appreciation for native HTML5 elements, ARIA landmark roles, page outlines, and search engine discoverability.
- **Week 3 (Advanced CSS Architecture):** Explored design token systems, fluid layout mathematics with `minmax()`, CSS Grid auto-fill mechanics, and responsive viewport management.
- **Week 4 (JavaScript Engine & DOM APIs):** Unlocked high-performance DOM manipulation, event delegation patterns, memory management, and ES6+ algorithmic problem-solving.
- **Week 5 (Asynchronous Logic & Browser Storage):** Deep-dived into Web Storage APIs, JSON serialization boundaries, defensive error handling, and asynchronous event simulation.
- **Week 6 (Capstone Synthesis & Production Release):** Consolidated all competencies to architect, test, optimize, and deploy DevTrack—delivering an industry-standard product ready for enterprise presentation.

---

## 7. License & Credits

Distributed under the **MIT License**. Created by **Nickson Kumar** as part of the Web Development Internship Capstone.
