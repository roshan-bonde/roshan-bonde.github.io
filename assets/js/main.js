/**
 * ====================================================================
 * PORTFOLIO CLIENT ENGINE
 * ====================================================================
 * Dynamic configurable renderer, theme manager, and interactive utilities.
 * Powered by `assets/js/config.js` with zero backend dependencies.
 * ====================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  const config = window.portfolioConfig || {};

  // Initialize features
  initTheme();
  initMobileNav();
  initToast();
  initHeroMediaSwitch(config);

  // Render components based on configuration
  renderProfile(config);
  renderTerminal(config);
  renderSkills(config);
  renderProjects(config);
  renderExperience(config);
  renderEducation(config);
  renderCertifications(config);
  renderContact(config);
  syncNavigationVisibility(config);

  // Footer dynamic year
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

/* ==========================================================================
   THEME MANAGER (Dark / Light with persistence & system preference)
   ========================================================================== */
function initTheme() {
  const root = document.documentElement;
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem("theme");
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

  const currentTheme = savedTheme || (prefersLight ? "light" : "dark");
  applyTheme(currentTheme);

  toggleBtn.addEventListener("click", () => {
    const active = root.getAttribute("data-theme") === "light" ? "light" : "dark";
    const nextTheme = active === "light" ? "dark" : "light";
    applyTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  });
}

function applyTheme(theme) {
  const root = document.documentElement;
  const toggleBtn = document.getElementById("theme-toggle");
  if (theme === "light") {
    root.setAttribute("data-theme", "light");
    if (toggleBtn) toggleBtn.innerHTML = '<i class="ri-moon-line"></i>';
  } else {
    root.removeAttribute("data-theme");
    if (toggleBtn) toggleBtn.innerHTML = '<i class="ri-sun-line"></i>';
  }
}

/* ==========================================================================
   MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const toggle = document.getElementById("mobile-menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  if (!toggle || !navMenu) return;

  toggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    const isOpen = navMenu.classList.contains("open");
    toggle.innerHTML = isOpen ? '<i class="ri-close-line"></i>' : '<i class="ri-menu-line"></i>';
  });

  navMenu.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      toggle.innerHTML = '<i class="ri-menu-line"></i>';
    });
  });
}

/* ==========================================================================
   HERO MEDIA SWITCHER (Terminal <-> Photo Toggle)
   ========================================================================== */
function initHeroMediaSwitch(config) {
  const tabTerminal = document.getElementById("switch-tab-terminal");
  const tabPhoto = document.getElementById("switch-tab-photo");
  const cardTerminal = document.getElementById("hero-terminal");
  const cardPhoto = document.getElementById("hero-photo");

  if (!tabTerminal || !tabPhoto || !cardTerminal || !cardPhoto) return;

  function setMediaView(view) {
    if (view === "photo") {
      tabPhoto.classList.add("active");
      tabPhoto.setAttribute("aria-selected", "true");
      tabTerminal.classList.remove("active");
      tabTerminal.setAttribute("aria-selected", "false");

      cardPhoto.classList.add("active");
      cardTerminal.classList.remove("active");
      localStorage.setItem("heroMediaMode", "photo");
    } else {
      tabTerminal.classList.add("active");
      tabTerminal.setAttribute("aria-selected", "true");
      tabPhoto.classList.remove("active");
      tabPhoto.setAttribute("aria-selected", "false");

      cardTerminal.classList.add("active");
      cardPhoto.classList.remove("active");
      localStorage.setItem("heroMediaMode", "terminal");
    }
  }

  tabTerminal.addEventListener("click", () => setMediaView("terminal"));
  tabPhoto.addEventListener("click", () => setMediaView("photo"));

  // Check saved preference or fallback to terminal
  const savedMode = localStorage.getItem("heroMediaMode");
  if (savedMode === "photo") {
    setMediaView("photo");
  }
}

/* ==========================================================================
   TOAST NOTIFICATION ENGINE
   ========================================================================== */
let toastContainer;
function initToast() {
  toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }
}

function showToast(message) {
  if (!toastContainer) initToast();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i class="ri-checkbox-circle-fill" style="color: var(--accent-emerald);"></i><span>${escapeHtml(message)}</span>`;
  toastContainer.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("show"));

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 250);
  }, 2400);
}

/* ==========================================================================
   CONFIGURABLE COMPONENT RENDERERS
   ========================================================================== */

/**
 * 1. Profile & Hero Section
 */
function renderProfile(config) {
  const profile = config.profile || {};
  const statusBadge = document.getElementById("hero-status-badge");
  const nameEl = document.getElementById("hero-name");
  const roleEl = document.getElementById("hero-role");
  const taglineEl = document.getElementById("hero-tagline");
  const socialsContainer = document.getElementById("hero-socials");

  if (statusBadge && profile.statusBadge) {
    statusBadge.innerHTML = `<span class="status-dot"></span><span>${escapeHtml(profile.statusBadge)}</span>`;
  }

  if (nameEl && profile.name) nameEl.textContent = profile.name;
  if (roleEl && profile.role) roleEl.textContent = profile.role;
  if (taglineEl && profile.tagline) taglineEl.textContent = profile.tagline;

  if (socialsContainer && profile.social) {
    socialsContainer.innerHTML = "";
    if (profile.social.github) {
      socialsContainer.innerHTML += `
        <a href="${profile.social.github}" target="_blank" rel="noopener noreferrer" class="social-pill">
          <i class="ri-github-fill"></i> GitHub
        </a>`;
    }
    if (profile.social.linkedin) {
      socialsContainer.innerHTML += `
        <a href="${profile.social.linkedin}" target="_blank" rel="noopener noreferrer" class="social-pill">
          <i class="ri-linkedin-box-fill"></i> LinkedIn
        </a>`;
    }
    if (profile.email) {
      socialsContainer.innerHTML += `
        <a href="mailto:${profile.email}" class="social-pill">
          <i class="ri-mail-line"></i> Email
        </a>`;
    }
  }

  // Avatar Headshot Photo
  const avatarImg = document.getElementById("hero-avatar-img");
  const photoBadgeText = document.getElementById("photo-badge-text");
  if (avatarImg && profile.avatar) {
    avatarImg.src = profile.avatar;
    if (profile.name) avatarImg.alt = profile.name;
  }
  if (photoBadgeText && profile.name) {
    photoBadgeText.textContent = `${profile.name} // ${profile.role || 'Data & DevOps'}`;
  }

  // Resume button in nav
  const resumeBtn = document.getElementById("nav-resume-btn");
  if (resumeBtn && profile.resumeUrl && profile.resumeUrl !== "#") {
    resumeBtn.href = profile.resumeUrl;
    resumeBtn.style.display = "inline-flex";
  } else if (resumeBtn && (!profile.resumeUrl || profile.resumeUrl === "#")) {
    resumeBtn.style.display = "none";
  }
}

/**
 * 2. Terminal Component
 */
function renderTerminal(config) {
  const terminalSection = document.getElementById("hero-terminal");
  const photoSection = document.getElementById("hero-photo");
  const switcher = document.querySelector(".hero-media-switcher");
  if (!terminalSection) return;

  if (config.sections && config.sections.terminal === false) {
    if (switcher) switcher.style.display = "none";
    terminalSection.classList.remove("active");
    if (photoSection) photoSection.classList.add("active");
    return;
  }

  const term = config.terminal || {};
  const user = term.user || "roshan";
  const host = term.host || "data-platform";
  const cmd = term.command || "curl -s https://api.roshan.dev/status | jq .";

  const userEl = document.getElementById("terminal-user");
  const hostEl = document.getElementById("terminal-host");
  const cmdEl = document.getElementById("terminal-cmd");
  const outputEl = document.getElementById("terminal-output");
  const copyBtn = document.getElementById("terminal-copy-btn");

  if (userEl) userEl.textContent = user;
  if (hostEl) hostEl.textContent = host;
  if (cmdEl) cmdEl.textContent = cmd;

  if (outputEl && term.output) {
    outputEl.innerHTML = formatJsonHighlight(term.output);
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      copyToClipboard(cmd, "Command copied to clipboard!");
    });
  }
}

/**
 * 3. Skills Grid Component
 */
function renderSkills(config) {
  const section = document.getElementById("skills");
  const grid = document.getElementById("skills-grid");
  if (!section || !grid) return;

  if (config.sections && config.sections.skills === false) {
    section.style.display = "none";
    return;
  }

  const skills = config.skills || [];
  grid.innerHTML = "";

  skills.forEach(skillGroup => {
    const card = document.createElement("div");
    card.className = "skill-card";

    const pillsHtml = (skillGroup.items || [])
      .map(item => `<span class="skill-pill">${escapeHtml(item)}</span>`)
      .join("");

    card.innerHTML = `
      <div class="skill-card-header">
        <i class="${escapeHtml(skillGroup.icon || 'ri-tools-line')} skill-card-icon"></i>
        <h3 class="skill-card-title">${escapeHtml(skillGroup.category)}</h3>
      </div>
      <p class="skill-card-desc">${escapeHtml(skillGroup.description || '')}</p>
      <div class="skill-pill-list">${pillsHtml}</div>
    `;
    grid.appendChild(card);
  });
}

/**
 * 4. Projects Grid Component
 */
function renderProjects(config) {
  const section = document.getElementById("projects");
  const grid = document.getElementById("projects-grid");
  if (!section || !grid) return;

  if (config.sections && config.sections.projects === false) {
    section.style.display = "none";
    return;
  }

  const projects = config.projects || [];
  grid.innerHTML = "";

  projects.forEach(proj => {
    const card = document.createElement("div");
    card.className = "project-card";

    const highlightsHtml = (proj.highlights || [])
      .map(h => `
        <li class="project-highlight-item">
          <i class="ri-check-line project-highlight-icon"></i>
          <span>${escapeHtml(h)}</span>
        </li>
      `).join("");

    const techHtml = (proj.tech || [])
      .map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`)
      .join("");

    let linksHtml = "";
    if (proj.github) {
      linksHtml += `
        <a href="${proj.github}" target="_blank" rel="noopener noreferrer" class="project-link-btn" title="View Source on GitHub" aria-label="View Source on GitHub">
          <i class="ri-github-fill"></i>
        </a>`;
    }
    if (proj.liveDemo) {
      linksHtml += `
        <a href="${proj.liveDemo}" target="_blank" rel="noopener noreferrer" class="project-link-btn" title="Live Demo" aria-label="Live Demo">
          <i class="ri-external-link-line"></i>
        </a>`;
    }

    card.innerHTML = `
      <div class="project-card-top">
        <span class="project-category">${escapeHtml(proj.category || 'Project')}</span>
        <div class="project-links">${linksHtml}</div>
      </div>
      <h3 class="project-title">${escapeHtml(proj.title)}</h3>
      <p class="project-summary">${escapeHtml(proj.summary)}</p>
      ${highlightsHtml ? `<ul class="project-highlights">${highlightsHtml}</ul>` : ""}
      <div class="project-tech-stack">${techHtml}</div>
    `;

    grid.appendChild(card);
  });
}

/**
 * 5. Experience Timeline
 */
function renderExperience(config) {
  const section = document.getElementById("experience");
  const wrapper = document.getElementById("experience-timeline");
  if (!section || !wrapper) return;

  if (config.sections && config.sections.experience === false) {
    section.style.display = "none";
    return;
  }

  const expList = config.experience || [];
  wrapper.innerHTML = "";

  expList.forEach(exp => {
    const item = document.createElement("div");
    item.className = "timeline-item";

    const badgesHtml = (exp.badges || [])
      .map(b => `<span class="timeline-badge">${escapeHtml(b)}</span>`)
      .join("");

    item.innerHTML = `
      <div class="timeline-node"></div>
      <div class="timeline-content">
        <div class="timeline-header">
          <h3 class="timeline-role">${escapeHtml(exp.role)}</h3>
          <span class="timeline-period">${escapeHtml(exp.period)}</span>
        </div>
        <div class="timeline-org">${escapeHtml(exp.organization)}${exp.location ? ` • ${escapeHtml(exp.location)}` : ''}</div>
        <p class="timeline-desc">${escapeHtml(exp.description)}</p>
        ${badgesHtml ? `<div class="timeline-badges">${badgesHtml}</div>` : ''}
      </div>
    `;
    wrapper.appendChild(item);
  });
}

/**
 * 6. Education Timeline
 */
function renderEducation(config) {
  const section = document.getElementById("education");
  const wrapper = document.getElementById("education-timeline");
  if (!section || !wrapper) return;

  if (config.sections && config.sections.education === false) {
    section.style.display = "none";
    return;
  }

  const eduList = config.education || [];
  wrapper.innerHTML = "";

  eduList.forEach(edu => {
    const item = document.createElement("div");
    item.className = "timeline-item";

    item.innerHTML = `
      <div class="timeline-node"></div>
      <div class="timeline-content">
        <div class="timeline-header">
          <h3 class="timeline-role">${escapeHtml(edu.degree)}</h3>
          <span class="timeline-period">${escapeHtml(edu.period)}</span>
        </div>
        <div class="timeline-org">${escapeHtml(edu.institution)}</div>
        ${edu.details ? `<p class="timeline-desc">${escapeHtml(edu.details)}</p>` : ''}
      </div>
    `;
    wrapper.appendChild(item);
  });
}

/**
 * 7. Certifications Component
 */
function renderCertifications(config) {
  const section = document.getElementById("certifications");
  const grid = document.getElementById("certifications-grid");
  if (!section || !grid) return;

  if (config.sections && config.sections.certifications === false) {
    section.style.display = "none";
    return;
  }

  const certList = config.certifications || [];
  grid.innerHTML = "";

  certList.forEach(cert => {
    const card = document.createElement("div");
    card.className = "cert-card";

    const badgesHtml = (cert.badges || [])
      .map(b => `<span class="cert-badge">${escapeHtml(b)}</span>`)
      .join("");

    let dateText = escapeHtml(cert.issueDate || "");
    if (cert.expiryDate) {
      dateText += ` — ${escapeHtml(cert.expiryDate)}`;
    }

    let metaRowHtml = "";
    if (cert.credentialId || cert.credentialUrl) {
      metaRowHtml = `<div class="cert-meta-row">`;
      if (cert.credentialId) {
        metaRowHtml += `<span class="cert-id">ID: ${escapeHtml(cert.credentialId)}</span>`;
      }
      if (cert.credentialUrl) {
        metaRowHtml += `
          <a href="${cert.credentialUrl}" target="_blank" rel="noopener noreferrer" class="cert-verify-link">
            <span>Verify</span> <i class="ri-external-link-line"></i>
          </a>`;
      }
      metaRowHtml += `</div>`;
    }

    card.innerHTML = `
      <div class="cert-card-header">
        <div class="cert-icon-wrapper">
          <i class="ri-award-line"></i>
        </div>
        ${dateText ? `<span class="cert-dates">${dateText}</span>` : ""}
      </div>
      <h3 class="cert-name">${escapeHtml(cert.name)}</h3>
      <div class="cert-issuer">${escapeHtml(cert.issuer)}</div>
      ${cert.description ? `<p class="cert-desc">${escapeHtml(cert.description)}</p>` : ""}
      <div class="cert-footer">
        ${badgesHtml ? `<div class="cert-badges">${badgesHtml}</div>` : ""}
        ${metaRowHtml}
      </div>
    `;

    grid.appendChild(card);
  });
}

/**
 * 8. Contact / Connect Section
 */
function renderContact(config) {
  const section = document.getElementById("contact");
  if (!section) return;

  if (config.sections && config.sections.contact === false) {
    section.style.display = "none";
    return;
  }

  const profile = config.profile || {};
  const email = profile.email || "roshanbonde30@gmail.com";
  const emailTextEl = document.getElementById("contact-email-text");
  const copyBtn = document.getElementById("copy-email-btn");
  const socialLinksEl = document.getElementById("contact-social-links");

  if (emailTextEl) emailTextEl.textContent = email;

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      copyToClipboard(email, "Email address copied to clipboard!");
    });
  }

  if (socialLinksEl && profile.social) {
    socialLinksEl.innerHTML = "";
    if (profile.social.github) {
      socialLinksEl.innerHTML += `
        <a href="${profile.social.github}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
          <i class="ri-github-fill"></i> GitHub
        </a>`;
    }
    if (profile.social.linkedin) {
      socialLinksEl.innerHTML += `
        <a href="${profile.social.linkedin}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
          <i class="ri-linkedin-box-fill"></i> LinkedIn
        </a>`;
    }
    socialLinksEl.innerHTML += `
      <a href="mailto:${email}" class="btn btn-primary">
        <i class="ri-mail-send-line"></i> Open Mail Client
      </a>`;
  }
}

/**
 * Sync Navigation items visibility with config.sections
 */
function syncNavigationVisibility(config) {
  const sections = config.sections || {};
  const mapping = {
    skills: "nav-link-skills",
    projects: "nav-link-projects",
    experience: "nav-link-experience",
    education: "nav-link-education",
    certifications: "nav-link-certifications",
    contact: "nav-link-contact"
  };

  Object.entries(mapping).forEach(([key, elementId]) => {
    const el = document.getElementById(elementId);
    if (el) {
      if (sections[key] === false) {
        el.style.display = "none";
      } else {
        el.style.display = "";
      }
    }
  });
}

/* ==========================================================================
   HELPERS & UTILITIES
   ========================================================================== */
function copyToClipboard(text, successMessage) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => showToast(successMessage))
      .catch(() => fallbackCopy(text, successMessage));
  } else {
    fallbackCopy(text, successMessage);
  }
}

function fallbackCopy(text, successMessage) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
    showToast(successMessage);
  } catch (err) {
    showToast("Failed to copy automatically.");
  }
  document.body.removeChild(ta);
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatJsonHighlight(obj) {
  const jsonStr = JSON.stringify(obj, null, 2);
  return jsonStr.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, match => {
    let cls = 'json-val-str';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'json-key';
      } else {
        cls = 'json-val-str';
      }
    } else if (/true|false/.test(match)) {
      cls = 'json-val-arr';
    } else if (/[0-9]/.test(match)) {
      cls = 'json-val-arr';
    }
    return `<span class="${cls}">${escapeHtml(match)}</span>`;
  });
}

