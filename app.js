/**
 * DevTrack - Developer Portfolio & Task Ecosystem
 * Author: Nickson Kumar (WD Week 6 Full-Stack Capstone)
 * Description: Client-side state architecture, dynamic DOM generation,
 *              CRUD task sprint engine, live filtering, regex modal validation,
 *              and persistent localStorage synchronization.
 */

// ==========================================================================
// 1. Initial Seed Data (Default Projects & Sprint Tasks)
// ==========================================================================

const DEFAULT_PROJECTS = [
  {
    id: "proj-1",
    title: "CloudMatrix - Distributed Task Runner",
    category: "Full-Stack",
    description: "High-throughput asynchronous job processing queue built with Node.js, Redis, and WebSockets. Features live progress monitoring, failure retry strategies, and rate limiting.",
    tags: ["Node.js", "Redis", "WebSockets", "Docker", "Express"],
    repoUrl: "https://github.com/Nickson-D-kumar/cloud-matrix-runner",
    demoUrl: "https://cloudmatrix-demo.nicksonkumar.dev",
    stars: 48,
    date: "Week 6 Milestone",
    icon: "cloud"
  },
  {
    id: "proj-2",
    title: "OmniUI - Enterprise Component System",
    category: "Frontend",
    description: "Zero-dependency, WCAG 2.1 AA accessible design system crafted in vanilla CSS & JavaScript. Provides compound dropdowns, data tables, and modal focus traps.",
    tags: ["CSS Grid", "ARIA", "Vanilla JS", "Design Tokens"],
    repoUrl: "https://github.com/Nickson-D-kumar/omni-ui-system",
    demoUrl: "https://omniui.nicksonkumar.dev",
    stars: 34,
    date: "Week 4 Milestone",
    icon: "palette"
  },
  {
    id: "proj-3",
    title: "NexusAPI - Serverless Gateway & Auth",
    category: "Backend",
    description: "JWT-authenticated API microservice gateway with Redis token caching, Prometheus metric telemetry, and dynamic CORS policy resolution.",
    tags: ["REST API", "JWT", "PostgreSQL", "Cloud Run"],
    repoUrl: "https://github.com/Nickson-D-kumar/nexus-api-gateway",
    demoUrl: "https://api-nexus.nicksonkumar.dev/health",
    stars: 27,
    date: "Week 5 Milestone",
    icon: "server"
  },
  {
    id: "proj-4",
    title: "DevSprint - Kanban Sprint Execution Engine",
    category: "Full-Stack",
    description: "Agile sprint management workspace with drag-and-drop task workflows, team velocity burn-down metrics, and persistent IndexedDB / LocalStorage fallbacks.",
    tags: ["JavaScript", "HTML5 DragDrop", "SaaS", "CSS3"],
    repoUrl: "https://github.com/Nickson-D-kumar/devsprint-kanban",
    demoUrl: "https://devsprint.nicksonkumar.dev",
    stars: 52,
    date: "Week 3 Milestone",
    icon: "kanban"
  },
  {
    id: "proj-5",
    title: "GitAuto - Milestone Release Automation",
    category: "DevOps",
    description: "CLI developer utility automating conventional git commit linting, semantic versioning tag calculation, and automated changelog generation.",
    tags: ["Bash", "Node CLI", "Git Hooks", "CI/CD"],
    repoUrl: "https://github.com/Nickson-D-kumar/gitauto-cli",
    demoUrl: "https://www.npmjs.com/package/@nickson/gitauto",
    stars: 19,
    date: "Week 1 Milestone",
    icon: "terminal"
  },
  {
    id: "proj-6",
    title: "PulseAnalytics - Realtime Dashboard",
    category: "Frontend",
    description: "Interactive SVG charting dashboard delivering sub-millisecond telemetry renders for traffic spikes, server latency, and user conversion heatmaps.",
    tags: ["Canvas API", "SVG", "Data Viz", "Responsive"],
    repoUrl: "https://github.com/Nickson-D-kumar/pulse-dashboard",
    demoUrl: "https://pulse.nicksonkumar.dev",
    stars: 39,
    date: "Week 2 Milestone",
    icon: "chart"
  }
];

const DEFAULT_TASKS = [
  {
    id: "task-101",
    title: "Refactor CSS Grid to 3-Column Responsive Breakpoint",
    category: "Frontend",
    priority: "High",
    hours: 3,
    description: "Ensure cards smoothly collapse to 2 columns under 1024px and 1 column under 640px.",
    completed: true,
    createdAt: Date.now() - 86400000 * 3
  },
  {
    id: "task-102",
    title: "Integrate Real-Time Email Regex Validation in Modal",
    category: "Frontend",
    priority: "High",
    hours: 2,
    description: "Ensure regex compliance with user input, showing instant valid/invalid color states.",
    completed: true,
    createdAt: Date.now() - 86400000 * 2
  },
  {
    id: "task-103",
    title: "Implement LocalStorage State Sync & Mutation Handlers",
    category: "Full-Stack",
    priority: "Medium",
    hours: 4,
    description: "Serialize sprint tasks to JSON, handle schema versioning, and auto-sync KPI counter widgets.",
    completed: true,
    createdAt: Date.now() - 86400000
  },
  {
    id: "task-104",
    title: "Audit WCAG 2.1 AA Accessibility & Keyboard Traps",
    category: "UI/UX",
    priority: "Medium",
    hours: 2,
    description: "Check tab ordering, aria-modal controls, focus rings, and color contrast on buttons.",
    completed: false,
    createdAt: Date.now() - 3600000 * 5
  },
  {
    id: "task-105",
    title: "Configure GitHub Pages Deployment Pipeline for Release",
    category: "DevOps",
    priority: "High",
    hours: 3,
    description: "Publish repository to gh-pages branch, verify asset path resolution, and check custom domain.",
    completed: false,
    createdAt: Date.now() - 3600000 * 2
  },
  {
    id: "task-106",
    title: "Author 500-Word Comprehensive Technical Capstone Report",
    category: "Full-Stack",
    priority: "Medium",
    hours: 5,
    description: "Document technical stack, state architecture, challenges overcome, and 6-week learnings.",
    completed: true,
    createdAt: Date.now() - 1800000
  }
];

// ==========================================================================
// 2. State Management & Storage Keys
// ==========================================================================

const STORAGE_KEYS = {
  TASKS: "devtrack_nickson_tasks_v1",
  PROJECTS: "devtrack_nickson_projects_v1"
};

const AppState = {
  projects: [],
  tasks: [],
  activeProjectCategory: "all",
  projectSearchTerm: "",
  activeTaskFilter: "all",
  taskSearchTerm: ""
};

// ==========================================================================
// 3. SVG Icon Helper Dictionary
// ==========================================================================

const ICONS = {
  cloud: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>`,
  palette: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path></svg>`,
  server: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>`,
  kanban: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 3h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path><line x1="10" y1="3" x2="10" y2="21"></line><line x1="16" y1="3" x2="16" y2="21"></line></svg>`,
  terminal: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>`,
  chart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`,
  check: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>`,
  trash: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>`,
  external: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/></svg>`,
  github: `<svg viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>`
};

// ==========================================================================
// 4. Application Initialization
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  initStorage();
  bindGlobalEvents();
  renderAllModules();
  showToast("Welcome to DevTrack", "Portfolio state & sprint ecosystem loaded successfully.", "info");
});

function initStorage() {
  // Load or seed tasks
  const storedTasks = localStorage.getItem(STORAGE_KEYS.TASKS);
  if (storedTasks) {
    try {
      AppState.tasks = JSON.parse(storedTasks);
    } catch (err) {
      console.error("Error parsing stored tasks, reverting to defaults:", err);
      AppState.tasks = [...DEFAULT_TASKS];
      persistTasks();
    }
  } else {
    AppState.tasks = [...DEFAULT_TASKS];
    persistTasks();
  }

  // Load or seed projects
  const storedProjects = localStorage.getItem(STORAGE_KEYS.PROJECTS);
  if (storedProjects) {
    try {
      AppState.projects = JSON.parse(storedProjects);
    } catch (err) {
      console.error("Error parsing stored projects, reverting to defaults:", err);
      AppState.projects = [...DEFAULT_PROJECTS];
      persistProjects();
    }
  } else {
    AppState.projects = [...DEFAULT_PROJECTS];
    persistProjects();
  }
}

function persistTasks() {
  localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(AppState.tasks));
}

function persistProjects() {
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(AppState.projects));
}

function renderAllModules() {
  renderMetrics();
  renderProjectCategoryCounts();
  renderProjects();
  renderTasks();
}

// ==========================================================================
// 5. Real-Time Metrics & KPI Synchronization
// ==========================================================================

function renderMetrics() {
  const total = AppState.tasks.length;
  const completed = AppState.tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

  // DOM node updates
  const totalEl = document.getElementById("totalTasksCount");
  const completedEl = document.getElementById("completedTasksCount");
  const pendingEl = document.getElementById("pendingTasksCount");
  const rateEl = document.getElementById("completionRateValue");
  const progressBar = document.getElementById("metricProgressBar");
  const boardBadge = document.getElementById("boardTaskCountBadge");

  if (totalEl) totalEl.textContent = total;
  if (completedEl) completedEl.textContent = completed;
  if (pendingEl) pendingEl.textContent = pending;
  if (rateEl) rateEl.textContent = `${rate}%`;
  if (progressBar) progressBar.style.width = `${rate}%`;
  if (boardBadge) boardBadge.textContent = `${total} Tasks`;
}

// ==========================================================================
// 6. Projects Portfolio Module (Dynamic Render, Filters, Search)
// ==========================================================================

function renderProjectCategoryCounts() {
  const countAll = AppState.projects.length;
  const countFS = AppState.projects.filter(p => p.category === "Full-Stack").length;
  const countFE = AppState.projects.filter(p => p.category === "Frontend").length;
  const countBE = AppState.projects.filter(p => p.category === "Backend").length;
  const countDO = AppState.projects.filter(p => p.category === "DevOps").length;

  const elAll = document.getElementById("countAll");
  const elFS = document.getElementById("countFullStack");
  const elFE = document.getElementById("countFrontend");
  const elBE = document.getElementById("countBackend");
  const elDO = document.getElementById("countDevOps");

  if (elAll) elAll.textContent = countAll;
  if (elFS) elFS.textContent = countFS;
  if (elFE) elFE.textContent = countFE;
  if (elBE) elBE.textContent = countBE;
  if (elDO) elDO.textContent = countDO;
}

function renderProjects() {
  const container = document.getElementById("projectsContainer");
  const noProjectsMsg = document.getElementById("noProjectsMessage");
  if (!container) return;

  container.innerHTML = "";

  // Filter based on active category & search query
  const query = AppState.projectSearchTerm.trim().toLowerCase();
  const filtered = AppState.projects.filter(proj => {
    const matchesCategory = (AppState.activeProjectCategory === "all") || (proj.category === AppState.activeProjectCategory);
    const matchesSearch = !query ||
      proj.title.toLowerCase().includes(query) ||
      proj.description.toLowerCase().includes(query) ||
      proj.tags.some(tag => tag.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    if (noProjectsMsg) noProjectsMsg.classList.remove("hidden");
    return;
  } else {
    if (noProjectsMsg) noProjectsMsg.classList.add("hidden");
  }

  // Construct card elements using document.createElement for DOM integrity
  filtered.forEach(project => {
    const card = document.createElement("article");
    card.className = "project-card";
    card.setAttribute("data-id", project.id);

    const iconSvg = ICONS[project.icon] || ICONS.cloud;

    card.innerHTML = `
      <div class="project-card-header">
        <div class="project-badge-group">
          <span class="project-tech-category">${project.category}</span>
          <span class="badge badge-emerald">${project.date}</span>
        </div>
        <div class="project-icon-art">
          ${iconSvg}
        </div>
      </div>
      <div class="project-card-body">
        <h3 class="project-title">${escapeHTML(project.title)}</h3>
        <p class="project-description">${escapeHTML(project.description)}</p>
        <div class="project-tags">
          ${project.tags.map(t => `<span class="project-tag-pill">${escapeHTML(t)}</span>`).join("")}
        </div>
        <div class="project-card-footer">
          <div class="project-links">
            <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" aria-label="Live Demo for ${escapeHTML(project.title)}">
              ${ICONS.external}
              <span>Live Demo</span>
            </a>
            <a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" aria-label="GitHub Repository for ${escapeHTML(project.title)}">
              ${ICONS.github}
              <span>Code</span>
            </a>
          </div>
          <span class="badge badge-indigo">★ ${project.stars}</span>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

// ==========================================================================
// 7. Sprint Task Kanban / CRUD Engine
// ==========================================================================

function renderTasks() {
  const taskList = document.getElementById("taskList");
  const noTasksPlaceholder = document.getElementById("noTasksMessage");
  if (!taskList) return;

  taskList.innerHTML = "";

  const query = AppState.taskSearchTerm.trim().toLowerCase();
  const filter = AppState.activeTaskFilter;

  const filteredTasks = AppState.tasks.filter(task => {
    // Status Filter
    let matchesStatus = true;
    if (filter === "pending") matchesStatus = !task.completed;
    if (filter === "completed") matchesStatus = task.completed;

    // Search Query
    let matchesSearch = true;
    if (query) {
      matchesSearch =
        task.title.toLowerCase().includes(query) ||
        task.category.toLowerCase().includes(query) ||
        task.priority.toLowerCase().includes(query) ||
        (task.description && task.description.toLowerCase().includes(query));
    }

    return matchesStatus && matchesSearch;
  });

  if (filteredTasks.length === 0) {
    if (noTasksPlaceholder) noTasksPlaceholder.classList.remove("hidden");
    return;
  } else {
    if (noTasksPlaceholder) noTasksPlaceholder.classList.add("hidden");
  }

  filteredTasks.forEach(task => {
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "completed" : ""}`;
    li.setAttribute("data-task-id", task.id);

    // Priority Badge styling
    let priorityBadgeClass = "badge-amber";
    if (task.priority === "High") priorityBadgeClass = "badge-rose";
    if (task.priority === "Low") priorityBadgeClass = "badge-emerald";

    li.innerHTML = `
      <div class="task-left">
        <button type="button" class="task-checkbox-custom" data-action="toggle" aria-label="Mark task as ${task.completed ? 'pending' : 'completed'}">
          ${ICONS.check}
        </button>
        <div class="task-meta-wrap">
          <div class="task-title-row">
            <span class="task-text">${escapeHTML(task.title)}</span>
            <span class="badge ${priorityBadgeClass}">${task.priority}</span>
            <span class="badge badge-indigo">${task.category}</span>
          </div>
          <div class="task-sub-meta">
            <span>⏱ ${task.hours || 1} hr(s)</span>
            ${task.description ? `<span>• ${escapeHTML(task.description)}</span>` : ""}
          </div>
        </div>
      </div>
      <div class="task-right-actions">
        <button type="button" class="btn-icon-action delete" data-action="delete" aria-label="Delete sprint task">
          ${ICONS.trash}
        </button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

/**
 * Task Creation Handler
 */
function handleCreateTask(e) {
  e.preventDefault();

  const titleInput = document.getElementById("taskTitle");
  const categoryInput = document.getElementById("taskCategory");
  const priorityInput = document.getElementById("taskPriority");
  const hoursInput = document.getElementById("taskHours");
  const descInput = document.getElementById("taskDescription");
  const titleError = document.getElementById("taskTitleError");

  const title = titleInput.value.trim();
  const category = categoryInput.value;
  const priority = priorityInput.value;
  const hours = parseInt(hoursInput.value, 10) || 2;
  const description = descInput.value.trim();

  // Validate Title
  if (!title) {
    titleInput.classList.add("is-invalid");
    if (titleError) titleError.textContent = "Please enter a descriptive task title.";
    titleInput.focus();
    return;
  } else {
    titleInput.classList.remove("is-invalid");
    if (titleError) titleError.textContent = "";
  }

  const newTask = {
    id: `task-${Date.now()}`,
    title,
    category,
    priority,
    hours,
    description,
    completed: false,
    createdAt: Date.now()
  };

  // Prepend new task to state
  AppState.tasks.unshift(newTask);
  persistTasks();
  renderMetrics();
  renderTasks();

  // Reset Form
  titleInput.value = "";
  descInput.value = "";
  hoursInput.value = "4";

  showToast("Sprint Task Added", `"${title}" has been appended to your backlog.`, "success");
}

/**
 * Event Delegation for Task Item Actions (Toggle & Delete)
 */
function handleTaskListClick(e) {
  const target = e.target;
  const actionBtn = target.closest("[data-action]");
  if (!actionBtn) return;

  const action = actionBtn.getAttribute("data-action");
  const taskItem = actionBtn.closest(".task-item");
  if (!taskItem) return;

  const taskId = taskItem.getAttribute("data-task-id");
  const taskIndex = AppState.tasks.findIndex(t => t.id === taskId);
  if (taskIndex === -1) return;

  if (action === "toggle") {
    AppState.tasks[taskIndex].completed = !AppState.tasks[taskIndex].completed;
    persistTasks();
    renderMetrics();
    renderTasks();
    const statusText = AppState.tasks[taskIndex].completed ? "Completed" : "Reopened";
    showToast(`Task ${statusText}`, `"${AppState.tasks[taskIndex].title}" is now marked as ${statusText.toLowerCase()}.`, "info");
  } else if (action === "delete") {
    const deletedTaskTitle = AppState.tasks[taskIndex].title;
    AppState.tasks.splice(taskIndex, 1);
    persistTasks();
    renderMetrics();
    renderTasks();
    showToast("Task Deleted", `"${deletedTaskTitle}" was permanently removed.`, "danger");
  }
}

function handleResetDefaultTasks() {
  if (confirm("Reset all sprint tasks back to curriculum default demo tasks?")) {
    AppState.tasks = [...DEFAULT_TASKS];
    persistTasks();
    renderMetrics();
    renderTasks();
    showToast("Tasks Restored", "Restored standard Week 6 demo task backlog.", "info");
  }
}

// ==========================================================================
// 8. Contact / Collaboration Modal & Regex Validation
// ==========================================================================

const ModalManager = {
  modalBackdrop: null,
  isOpen: false,

  init() {
    this.modalBackdrop = document.getElementById("contactModal");
    const openBtn = document.getElementById("openContactModalBtn");
    const closeBtn = document.getElementById("closeModalBtn");
    const cancelBtn = document.getElementById("cancelModalBtn");
    const mobileBtn = document.getElementById("mobileContactBtn");

    if (openBtn) openBtn.addEventListener("click", () => this.open());
    if (mobileBtn) {
      mobileBtn.addEventListener("click", () => {
        closeMobileMenu();
        this.open();
      });
    }
    if (closeBtn) closeBtn.addEventListener("click", () => this.close());
    if (cancelBtn) cancelBtn.addEventListener("click", () => this.close());

    // Close on backdrop click
    if (this.modalBackdrop) {
      this.modalBackdrop.addEventListener("click", (e) => {
        if (e.target === this.modalBackdrop) {
          this.close();
        }
      });
    }

    // Keyboard accessibility: Escape key closes modal
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.close();
      }
    });

    // Form submission & validation
    const form = document.getElementById("contactForm");
    if (form) {
      form.addEventListener("submit", (e) => this.handleSubmit(e));
      this.bindRealtimeValidation();
    }
  },

  open() {
    if (!this.modalBackdrop) return;
    this.modalBackdrop.classList.add("open");
    this.modalBackdrop.setAttribute("aria-hidden", "false");
    this.isOpen = true;
    document.body.style.overflow = "hidden"; // Prevent background scrolling

    // Auto-focus first input
    const firstInput = document.getElementById("contactName");
    if (firstInput) setTimeout(() => firstInput.focus(), 150);
  },

  close() {
    if (!this.modalBackdrop) return;
    this.modalBackdrop.classList.remove("open");
    this.modalBackdrop.setAttribute("aria-hidden", "true");
    this.isOpen = false;
    document.body.style.overflow = "";

    // Clear validation states
    const form = document.getElementById("contactForm");
    if (form) {
      form.reset();
      form.querySelectorAll(".form-control").forEach(el => {
        el.classList.remove("is-valid", "is-invalid");
      });
      form.querySelectorAll(".error-msg").forEach(el => el.textContent = "");
    }
  },

  bindRealtimeValidation() {
    const nameInput = document.getElementById("contactName");
    const emailInput = document.getElementById("contactEmail");
    const msgInput = document.getElementById("contactMessage");

    if (nameInput) {
      nameInput.addEventListener("input", () => this.validateName(nameInput));
      nameInput.addEventListener("blur", () => this.validateName(nameInput));
    }

    if (emailInput) {
      emailInput.addEventListener("input", () => this.validateEmail(emailInput));
      emailInput.addEventListener("blur", () => this.validateEmail(emailInput));
    }

    if (msgInput) {
      msgInput.addEventListener("input", () => this.validateMessage(msgInput));
      msgInput.addEventListener("blur", () => this.validateMessage(msgInput));
    }
  },

  validateName(input) {
    const val = input.value.trim();
    const errorEl = document.getElementById("contactNameError");
    if (val.length < 2) {
      input.classList.add("is-invalid");
      input.classList.remove("is-valid");
      if (errorEl) errorEl.textContent = "Please enter your full name (minimum 2 characters).";
      return false;
    } else {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
      if (errorEl) errorEl.textContent = "";
      return true;
    }
  },

  validateEmail(input) {
    const val = input.value.trim();
    const errorEl = document.getElementById("contactEmailError");
    // Strict RFC 5322 compatible email regular expression
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

    if (!val) {
      input.classList.add("is-invalid");
      input.classList.remove("is-valid");
      if (errorEl) errorEl.textContent = "Work email address is required.";
      return false;
    } else if (!emailRegex.test(val)) {
      input.classList.add("is-invalid");
      input.classList.remove("is-valid");
      if (errorEl) errorEl.textContent = "Please provide a valid email format (e.g., name@domain.com).";
      return false;
    } else {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
      if (errorEl) errorEl.textContent = "";
      return true;
    }
  },

  validateMessage(input) {
    const val = input.value.trim();
    const errorEl = document.getElementById("contactMessageError");
    if (val.length < 10) {
      input.classList.add("is-invalid");
      input.classList.remove("is-valid");
      if (errorEl) errorEl.textContent = "Please provide at least 10 characters detailing your inquiry.";
      return false;
    } else {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
      if (errorEl) errorEl.textContent = "";
      return true;
    }
  },

  handleSubmit(e) {
    e.preventDefault();

    const nameInput = document.getElementById("contactName");
    const emailInput = document.getElementById("contactEmail");
    const msgInput = document.getElementById("contactMessage");
    const serviceInput = document.getElementById("contactService");
    const sendBtn = document.getElementById("sendInquiryBtn");
    const spinner = document.getElementById("submitSpinner");
    const btnText = sendBtn ? sendBtn.querySelector(".btn-text") : null;

    const isNameValid = this.validateName(nameInput);
    const isEmailValid = this.validateEmail(emailInput);
    const isMsgValid = this.validateMessage(msgInput);

    if (!isNameValid || !isEmailValid || !isMsgValid) {
      showToast("Validation Error", "Please rectify highlighted form errors before proceeding.", "warning");
      return;
    }

    // Simulate async network request
    if (sendBtn) sendBtn.disabled = true;
    if (spinner) spinner.classList.remove("hidden");
    if (btnText) btnText.textContent = "Transmitting...";

    setTimeout(() => {
      if (sendBtn) sendBtn.disabled = false;
      if (spinner) spinner.classList.add("hidden");
      if (btnText) btnText.textContent = "Transmit Message";

      const clientName = nameInput.value.trim();
      const domain = serviceInput.value;

      this.close();

      showToast(
        "Transmission Confirmed",
        `Thank you, ${clientName}! Your inquiry regarding "${domain}" was logged. Nickson will respond shortly.`,
        "success"
      );
    }, 1200);
  }
};

// ==========================================================================
// 9. Toast Notification Factory
// ==========================================================================

function showToast(title, message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.setAttribute("role", "alert");

  toast.innerHTML = `
    <div class="toast-content">
      <h4 class="toast-title">${escapeHTML(title)}</h4>
      <p class="toast-desc">${escapeHTML(message)}</p>
    </div>
    <button type="button" class="toast-close" aria-label="Dismiss notification">&times;</button>
  `;

  // Dismiss on click
  const closeBtn = toast.querySelector(".toast-close");
  closeBtn.addEventListener("click", () => dismissToast(toast));

  container.appendChild(toast);

  // Auto dismiss after 4.5s
  setTimeout(() => {
    dismissToast(toast);
  }, 4500);
}

function dismissToast(toastElement) {
  if (!toastElement || !toastElement.parentNode) return;
  toastElement.style.opacity = "0";
  toastElement.style.transform = "translateX(50px)";
  setTimeout(() => {
    if (toastElement.parentNode) {
      toastElement.parentNode.removeChild(toastElement);
    }
  }, 250);
}

// ==========================================================================
// 10. Mobile Menu & Global Navigation
// ==========================================================================

function bindGlobalEvents() {
  // Mobile drawer toggle
  const menuToggle = document.getElementById("mobileMenuToggle");
  if (menuToggle) {
    menuToggle.addEventListener("click", toggleMobileMenu);
  }

  // Smooth scroll links & mobile link click
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        closeMobileMenu();
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Project Category Pills
  const pillButtons = document.querySelectorAll(".filter-pills-bar .pill");
  pillButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      pillButtons.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      AppState.activeProjectCategory = btn.getAttribute("data-category");
      renderProjects();
    });
  });

  // Project Live Search
  const searchInput = document.getElementById("projectSearchInput");
  const clearSearchBtn = document.getElementById("clearProjectSearchBtn");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      AppState.projectSearchTerm = e.target.value;
      renderProjects();
    });
  }
  if (clearSearchBtn && searchInput) {
    clearSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      AppState.projectSearchTerm = "";
      renderProjects();
      searchInput.focus();
    });
  }

  const resetProjectFilterBtn = document.getElementById("resetProjectFilterBtn");
  if (resetProjectFilterBtn) {
    resetProjectFilterBtn.addEventListener("click", () => {
      AppState.activeProjectCategory = "all";
      AppState.projectSearchTerm = "";
      if (searchInput) searchInput.value = "";
      pillButtons.forEach(b => {
        b.classList.toggle("active", b.getAttribute("data-category") === "all");
      });
      renderProjects();
    });
  }

  // Task Form Submission
  const taskForm = document.getElementById("taskForm");
  if (taskForm) {
    taskForm.addEventListener("submit", handleCreateTask);
  }

  // Task List Delegation (Toggle Checkbox / Delete)
  const taskList = document.getElementById("taskList");
  if (taskList) {
    taskList.addEventListener("click", handleTaskListClick);
  }

  // Task Filter Tabs
  const taskTabs = document.querySelectorAll(".board-filter-tabs .tab-btn");
  taskTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      taskTabs.forEach(t => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      AppState.activeTaskFilter = tab.getAttribute("data-task-filter");
      renderTasks();
    });
  });

  // Task Live Search
  const taskSearch = document.getElementById("taskSearchInput");
  if (taskSearch) {
    taskSearch.addEventListener("input", (e) => {
      AppState.taskSearchTerm = e.target.value;
      renderTasks();
    });
  }

  // Reset Default Tasks Button
  const resetTasksBtn = document.getElementById("resetDefaultTasksBtn");
  if (resetTasksBtn) {
    resetTasksBtn.addEventListener("click", handleResetDefaultTasks);
  }

  // Modal Initialization
  ModalManager.init();

  // Scroll Header Shadow
  window.addEventListener("scroll", () => {
    const header = document.getElementById("topHeader");
    if (header) {
      if (window.scrollY > 20) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
  });
}

function toggleMobileMenu() {
  const menu = document.getElementById("mobileNavMenu");
  const toggleBtn = document.getElementById("mobileMenuToggle");
  if (!menu) return;

  const isOpen = menu.classList.contains("open");
  if (isOpen) {
    closeMobileMenu();
  } else {
    menu.classList.add("open");
    menu.setAttribute("aria-hidden", "false");
    if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "true");
  }
}

function closeMobileMenu() {
  const menu = document.getElementById("mobileNavMenu");
  const toggleBtn = document.getElementById("mobileMenuToggle");
  if (menu && menu.classList.contains("open")) {
    menu.classList.remove("open");
    menu.setAttribute("aria-hidden", "true");
    if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "false");
  }
}

// ==========================================================================
// 11. Helper Utilities
// ==========================================================================

function escapeHTML(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
