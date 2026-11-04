/**
 * ====================================================================
 * PORTFOLIO CONFIGURATION
 * ====================================================================
 * Customize your portfolio by editing this file.
 * - To add or edit items (projects, skills, education, experience),
 *   simply edit the corresponding array or object.
 * - To toggle a section on or off, change its boolean value in `sections`.
 * ====================================================================
 */

const portfolioConfig = {
  // ------------------------------------------------------------------
  // 1. Profile Information
  // ------------------------------------------------------------------
  profile: {
    name: "Roshan Bonde",
    role: "Data Engineer & DevOps Engineer",
    tagline: "Architecting resilient distributed data pipelines, cloud-native infrastructure, and automated GitOps platforms.",
    location: "India",
    email: "roshanbonde30@gmail.com",
    avatar: "assets/img/personal-image.jpg", // path to your profile picture
    statusBadge: "Available for Data & DevOps Opportunities",
    resumeUrl: "#", // Add link to your resume PDF or Google Drive
    social: {
      github: "https://github.com/roshan-bonde",
      linkedin: "https://linkedin.com/in/roshan-bonde",
      email: "mailto:roshanbonde30@gmail.com"
    }
  },

  // ------------------------------------------------------------------
  // 2. Section Visibility Toggles
  // Set to true to display, false to hide (section and nav link will hide automatically)
  // ------------------------------------------------------------------
  sections: {
    terminal: true,
    skills: true,
    projects: false,
    experience: true,
    education: true,
    contact: true
  },

  // ------------------------------------------------------------------
  // 3. Hero Terminal Preview
  // Commands and output displayed in the interactive terminal on the hero banner
  // ------------------------------------------------------------------
  terminal: {
    user: "roshan",
    host: "data-node-01",
    command: "curl -s https://api.roshan.dev/status | jq .",
    output: {
      status: "operational",
      primary_domains: ["Data Platform Engineering", "Cloud & DevOps"],
      orchestration: "Kubernetes + Airflow",
      event_bus: "Apache Kafka",
      storage_layer: "Delta Lake / Snowflake / S3",
      uptime: "99.99%",
      current_focus: "Scaling streaming lakehouses & automated CI/CD for data pipelines"
    }
  },

  // ------------------------------------------------------------------
  // 4. Skills & Competencies
  // Grouped by technical domains
  // ------------------------------------------------------------------
  skills: [
    {
      category: "Data Engineering & Big Data",
      icon: "ri-database-2-line",
      description: "Distributed computing, lakehouse architectures, and real-time event streaming.",
      items: [
        "Apache Spark",
        "Apache Kafka",
        "Databricks",
        "Snowflake",
        "MSSQL Server / PostgreSQL / MySQL",
        "Apache Airflow",
      ]
    },
    {
      category: "DevOps, Cloud & Infrastructure",
      icon: "ri-cloud-line",
      description: "Containerization, declarative infrastructure-as-code, and cloud platforms.",
      items: [
        "Kubernetes (K8s)",
        "Docker",
        // "Terraform",
        "AWS",
        "Linux / System Administration"
      ]
    },
    /*{
      category: "CI/CD & Observability",
      icon: "ri-git-branch-line",
      description: "GitOps workflows, pipeline automation, and telemetry monitoring.",
      items: [
        "GitHub Actions",
        "GitLab CI",
        "ArgoCD",
        "Prometheus",
        "Grafana",
        "OpenTelemetry",
        "ELK / Vector",
        "Data Quality & SLAs"
      ]
    },
    */
    {
      category: "Languages & Frameworks",
      icon: "ri-terminal-box-line",
      description: "Core programming and scripting languages for data pipelines and tooling.",
      items: [
        "Python (PySpark, Pandas)",
        "SQL (Advanced)",
        "Bash / Shell Scripting",
        "Java / Scala Basics",
        "REST APIs",
        "Git"
      ]
    }
  ],

  // ------------------------------------------------------------------
  // 5. Featured Projects & Architectures
  // Add, remove, or modify projects here
  // ------------------------------------------------------------------
  projects: [
    {
      title: "Real-Time Streaming Lakehouse Platform",
      category: "Data Engineering",
      summary: "End-to-end distributed data streaming platform ingesting event streams, enforcing schema validation, and persisting ACID transactions in an open table format.",
      tech: ["Apache Kafka", "Apache Spark Streaming", "Delta Lake", "MinIO / S3", "Trino", "dbt"],
      highlights: [
        "Ingested and processed 40k+ events/sec with sub-second latency and zero data loss.",
        "Implemented medallion lakehouse architecture (Bronze, Silver, Gold) with automated dbt transformations.",
        "Integrated schema registry and dead-letter queues (DLQ) for corrupted payloads."
      ],
      github: "https://github.com/roshan-bonde",
      liveDemo: ""
    },
    {
      title: "GitOps Cloud Data Platform on Kubernetes",
      category: "DevOps & Cloud",
      summary: "Declarative infrastructure-as-code and GitOps-driven deployment of a production-grade data processing cluster on AWS EKS.",
      tech: ["Terraform", "Kubernetes", "Helm", "ArgoCD", "Airflow on K8s", "AWS EKS"],
      highlights: [
        "Modularized Terraform configurations managing VPCs, IAM roles for service accounts, and managed node groups.",
        "Automated continuous delivery of Airflow DAGs and Spark operator deployments via ArgoCD.",
        "Configured cluster autoscaler and spot instances, reducing cluster compute costs by 35%."
      ],
      github: "https://github.com/roshan-bonde",
      liveDemo: ""
    },
    {
      title: "Automated Data Quality & CI/CD Pipeline",
      category: "Data & DevOps",
      summary: "Automated continuous integration pipeline for analytics engineering with automated regression tests, schema drift detection, and data lineage checks.",
      tech: ["GitHub Actions", "dbt", "Great Expectations", "PostgreSQL", "Docker"],
      highlights: [
        "Orchestrated CI/CD triggers on pull requests to spin up ephemeral test databases in Docker containers.",
        "Automated 120+ data quality validations (null checks, referential integrity, freshness checks) before staging merges.",
        "Generated automated documentation and lineage graphs deployed seamlessly to internal pages."
      ],
      github: "https://github.com/roshan-bonde",
      liveDemo: ""
    },
    {
      title: "Observability & Alerting Stack for Data Pipelines",
      category: "Observability",
      summary: "Centralized monitoring and distributed tracing suite tracking pipeline runtimes, Kafka consumer group lag, and task failure rates.",
      tech: ["Prometheus", "Grafana", "Alertmanager", "OpenTelemetry", "Docker Compose"],
      highlights: [
        "Engineered real-time Grafana dashboards visualizing Kafka offsets, Spark memory utilization, and pipeline SLAs.",
        "Configured proactive Slack and PagerDuty alert rules for lagging consumer groups and task backpressure."
      ],
      github: "https://github.com/roshan-bonde",
      liveDemo: ""
    }
  ],

  // ------------------------------------------------------------------
  // 6. Experience Timeline
  // ------------------------------------------------------------------
  experience: [
    {
      role: "Data Engineer",
      organization: "Persistent Systems",
      period: "2022 — Present",
      location: "India",
      description: "Designing and scaling high-throughput distributed data pipelines, cloud infrastructure provisioning, and containerized deployment workflows.",
      badges: ["Databricks", "Apache Spark", "Kafka", "Docker", "Kubernetes", "Python", "SQL (Advanced)"]
    },
    {
      role: "Backend & Systems Developer",
      organization: "Adhyaaya Technical Committee",
      period: "2020",
      location: "Nagpur, India",
      description: "Engineered core backend services, relational database schemas, and performance optimizations for large-scale student registration systems.",
      badges: ["Backend Architecture", "Database Design", "Performance Tuning"]
    }
  ],

  // ------------------------------------------------------------------
  // 7. Education & Certifications
  // ------------------------------------------------------------------
  education: [
    {
      degree: "Bachelor of Engineering (B.E.) — Computer Science & Engineering",
      institution: "Government College of Engineering, Nagpur",
      period: "2018 — 2022",
      details: "Comprehensive coursework in Distributed Operating Systems, Database Management Systems, Computer Networks, and Object-Oriented Software Engineering.",
      type: "degree"
    }
  ]
};

// Export for browser and node environments
if (typeof window !== "undefined") {
  window.portfolioConfig = portfolioConfig;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = portfolioConfig;
}
if (typeof global !== "undefined") {
  global.portfolioConfig = portfolioConfig;
}
