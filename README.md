# Roshan Bonde — Personal Portfolio

A sleek, minimal, high-performance developer portfolio website designed for a **Data Engineer & DevOps Engineer**. Built with vanilla semantic HTML5, modern CSS custom properties, and lightweight client-side rendering. Hosted seamlessly on **GitHub Pages** with zero backend, zero build steps, and no framework overhead.

---

## ⚡ Features

- **Data & DevOps Aesthetic**: Clean dark mode (default) with high-contrast light mode toggle, monospace typography accents, interactive terminal status card, and pipeline timeline nodes.
- **Configurable Component Architecture**: All content—projects, education, work experience, technical skills, and social links—lives in a single, well-documented configuration file (`assets/js/config.js`).
- **Instant Section Toggles**: Enable or disable any section (or its navigation link) with a single boolean switch.
- **Zero Build Tools Required**: Pure native web standards (`HTML`, `CSS`, `JS`). No `npm install`, no `webpack`, no `vite`, and no server-side backend needed.
- **1-Click Copy Utilities**: Fast 1-click email copy button with animated toast notification and interactive terminal command copy.
- **100% GitHub Pages Ready**: Fully compatible with GitHub Pages out of the box.

---

## 📁 Project Structure

```text
├── index.html              # Semantic HTML5 layout skeleton & meta tags
├── assets/
│   ├── css/
│   │   └── style.css       # Design system, CSS variables, dark/light themes
│   ├── js/
│   │   ├── config.js       # ⚙️ Central configuration file for all content
│   │   └── main.js         # Client renderer, theme manager, copy engine
│   └── img/
│       └── personal-image.jpg
└── README.md
```

---

## ⚙️ How to Customize Your Content

All data is managed inside **`assets/js/config.js`**. You do not need to touch `index.html` to add, edit, or remove content.

### 1. Toggle Sections On or Off
In `assets/js/config.js`, adjust the `sections` object. If a section is set to `false`, both the section and its corresponding navigation link are automatically hidden:

```javascript
sections: {
  terminal: true,
  skills: true,
  projects: true,
  experience: true,
  education: true,
  certifications: true,
  contact: true
}
```

### 2. Adding a New Project
In `assets/js/config.js`, add an object to the `projects` array:

```javascript
{
  title: "Distributed Batch ETL Engine",
  category: "Data Engineering",
  summary: "High-throughput batch pipeline processing large-scale analytical workloads with automated partitioning.",
  tech: ["Apache Spark", "PySpark", "S3", "PostgreSQL", "Docker"],
  highlights: [
    "Optimized data skew and shuffle partitions, reducing runtime by 42%.",
    "Scheduled nightly runs with automated data quality checks."
  ],
  github: "https://github.com/roshan-bonde/your-repo",
  liveDemo: "" // Optional URL
}
```

### 3. Adding a Certification
In `assets/js/config.js`, add an object to the `certifications` array:

```javascript
{
  name: "Databricks Certified Data Engineer Associate",
  issuer: "Databricks",
  issueDate: "2024",
  expiryDate: "", // optional
  credentialId: "", // optional
  credentialUrl: "", // optional verification URL
  description: "Expertise in using Spark and Delta Lake for production data workloads.",
  badges: ["Databricks", "Apache Spark", "Delta Lake", "Lakehouse"]
}
```

### 4. Adding an Education Entry
In `assets/js/config.js`, add an object to the `education` array:

```javascript
{
  degree: "Bachelor of Engineering (B.E.) — Computer Science & Engineering",
  institution: "Government College of Engineering, Nagpur",
  period: "2018 — 2022",
  details: "Coursework in Distributed Systems, Operating Systems, and Databases.",
  type: "degree"
}
```

### 5. Updating Skills & Profile
Update `profile` and `skills` objects in `assets/js/config.js` with your preferred technical stack, social links, resume URL, or contact details.

---

## 🚀 Local Development & Preview

You can preview the website locally using any static file server:

### Using Python:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

### Using Node / npx:
```bash
npx serve .
```

---

## 🌐 Deploy to GitHub Pages

1. Commit your changes:
   ```bash
   git add .
   git commit -m "Revamp portfolio website"
   git push origin master
   ```
2. On GitHub, navigate to **Settings** > **Pages**.
3. Under **Branch**, select `master` (or `main`) and root `/`, then save.
4. Your portfolio will be live at `https://roshan-bonde.github.io/`.
