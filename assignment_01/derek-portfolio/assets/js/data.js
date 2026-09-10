/* =============================================================================
   data.js — SINGLE SOURCE OF TRUTH
   -----------------------------------------------------------------------------
   Everything on the site AND everything the AI agent knows comes from here.
   Edit this file only; you never need to touch the HTML to change content.

   >>> ALL CONTENT IS REAL. Set meta.placeholder to true only if you
   reintroduce placeholder copy — that re-shows the demo banner. <<<
   ========================================================================== */

window.PROFILE = {
  meta: {
    placeholder: false,

    name: "Derek Stringfellow",
    initials: "DS",
    headline: "AI Platform Architect · Senior Technical Program Manager · Enterprise Platform Product Manager",
    // Shown under your name in the top nav. It has very little room, so keep it
    // short — the full `headline` above is used in the hero card and footer.
    shortHeadline: "AI Platform Architect",
    // Shown in the browser tab + search results + social previews.
    siteTitle: "Derek Stringfellow — Senior Technical Program Manager & Product Leader",
    siteDescription:
      "20+ years of product and program leadership across enterprise ecommerce and cloud platforms. PMP, CSPO, CSM. Delivered $456.2M Marketing GMV and cut operational capex by $12.75M.",
    location: "Detroit, Michigan, United States",
    // Update if your situation changes.
    availability: "Open to senior program, product and platform leadership roles",
    email: "derek@anotherplace.com",
    resumeUrl: "", // e.g. "/assets/derek-stringfellow-cv.pdf" — leave "" to hide the button
  },

  socials: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/derek-stringfellow/", icon: "linkedin" },
    { label: "Email", url: "mailto:derek@anotherplace.com", icon: "mail" },
  ],

  hero: {
    eyebrow: "Open to senior program, product & platform leadership roles",
    // These rotate with a typewriter effect. Lead with the phrasing you want
    // to be found by — recruiters search on titles.
    roles: [
      "AI Platform Architect",
      "Senior Technical Program Manager",
      "Enterprise Platform Product Manager",
    ],
    summary:
      "20+ years leading product and program delivery across enterprise ecommerce and cloud platforms — from on-premise systems to multi-cloud SaaS. Currently completing an M.S. in Artificial Intelligence (Industrial AI) at Wayne State University.",
    primaryCta: { label: "View my work", href: "#work" },
    secondaryCta: { label: "Talk to my AI agent", action: "agent" },
  },

  stats: [
    { value: 20, suffix: "+", label: "Years in product & program leadership" },
    { value: 95, suffix: "", label: "Engineers supported at Walmart Global Tech" },
    { value: 456.2, prefix: "$", suffix: "M", decimals: 1, label: "Marketing GMV delivered (target $350M)" },
    { value: 12.75, prefix: "$", suffix: "M", decimals: 2, label: "Operational capex reduced" },
  ],

  about: {
    heading: "Innovative, customer-centric solutions that drive growth and efficiency.",
    paragraphs: [
      "With over 20 years of product and project management experience, I am a certified PMP, CSPO, and CSM professional who specialises in UI/UX, digital commerce development, and SDLC cross-functional team management. I have successfully transitioned on-premise platforms and applications to cloud-based SaaS models, using behaviour-driven development with Outcome Driven Innovation and a smattering of EQ grooming.",
      "As a Senior Technical Program Manager at Walmart Global Tech, I led the development and implementation of the agile framework and scrum processes for the Data Engineering and Customer Analytics engineering teams, consisting of 95 engineers. I also designed, implemented, and maintained reporting mechanisms for senior program managers across data and analytics programs, ensuring senior leadership visibility, awareness, and risk management.",
      "I contributed to achieving $456.2M on a Marketing GMV target of $350M, and improved capacity planning and visibility processes by 63%, resulting in a $12.75M reduction in operational capital expenditures. My mission is to deliver innovative and customer-centric solutions that drive business growth and efficiency.",
    ],
    highlights: [
      {
        icon: "users",
        title: "Program leadership at scale",
        text: "Built the agile framework and scrum processes for 95 engineers across eight data and analytics programs.",
      },
      {
        icon: "target",
        title: "Measurable commercial impact",
        text: "$456.2M delivered against a $350M Marketing GMV target; $12.75M operational capex eliminated.",
      },
      {
        icon: "layers",
        title: "Platform & cloud depth",
        text: "On-premise to SaaS transitions, AWS–GCP multi-cloud architecture, Terraform and CloudFormation governance.",
      },
      {
        icon: "zap",
        title: "Product craft",
        text: "Outcome Driven Innovation, behaviour-driven development, and EQ-led team building.",
      },
    ],
  },

  // Newest first. `end: "Present"` renders the "current" accent style.
  experience: [
    {
      role: "Application Analyst 3",
      company: "Great Lakes Water Authority",
      location: "Detroit, Michigan · Hybrid",
      start: "Feb 2025",
      end: "Present",
      summary:
        "Lead change and deliver value by applying, configuring and supporting project management technology solutions for the capital improvement programme.",
      achievements: [
        "Partner with internal and external stakeholders to define, document and enable the business processes and technology underpinning the Capital Improvement Program.",
        "Work directly with the Director and collaborate across engineering, operations, planning and IT to run the Capital Improvement Plan and complete projects efficiently.",
        "Support long-term enterprise-wide CIP efforts, including financial projections and budgets, and diagram current and future states of systems and processes.",
      ],
      tech: ["Business Analysis", "Process Design", "CIP Governance", "Stakeholder Management"],
    },
    {
      role: "Senior Technical Program & Product Consultant",
      company: "Another Place — Product Management Group",
      location: "Royal Oak, Michigan · Hybrid",
      start: "Mar 2024",
      end: "Present",
      summary:
        "Independent consulting practice covering enterprise implementation, multi-cloud architecture and cloud migration governance.",
      achievements: [
        "Facilitated enterprise implementation consultations using agile frameworks and scrum processes for internal business units and engineering teams.",
        "Designed and deployed systems audits to drive KPIs for data-driven multi-cloud architecture, leveraging AWS and Google Cloud Platform to meet diverse business needs.",
        "Established project governance for internal and external units, identifying optimal migration strategies and ensuring seamless transitions.",
        "Directed governance of automation scripts and templates using Terraform and AWS CloudFormation, standardising deployments across environments.",
        "Led performance optimisation and cost analysis initiatives to maximise resource utilisation and reduce operational expense.",
      ],
      tech: ["AWS", "Google Cloud", "Terraform", "CloudFormation", "Agile"],
    },
    {
      role: "Senior Technical Program Manager",
      company: "Walmart Global Tech",
      location: "Remote · Contract",
      start: "Oct 2021",
      end: "Mar 2024",
      summary:
        "Owned the agile framework and delivery reporting for the Data Engineering and Customer Analytics organisation — 95 engineers across eight major data programs.",
      achievements: [
        "Established the agile framework and scrum processes for the Data Engineering and Customer Analytics (DCA) engineering teams, comprising 95 engineers.",
        "Designed, implemented and maintained reporting mechanisms for program managers across Privacy, Segmentr, Identity, Real-time Data Platform, Facets, C360, Customer Data Lake, and Audience & Data Sharing.",
        "Improved capacity planning and visibility processes by 63%, contributing to a $12.75M reduction in operational capital expenditures.",
        "Contributed to achieving $456.2M against a $350M Marketing GMV target.",
        "Drove cross-program communication and transparency through accurate tracing of initiatives and projects to the wider organisation.",
      ],
      tech: ["Jira", "Confluence", "Tableau", "Power BI", "Scrum", "Capacity Planning"],
    },
    {
      role: "Ecommerce Senior Product / Program Manager",
      company: "Mi9 Retail",
      location: "Los Angeles Metropolitan Area · Remote",
      start: "Jul 2016",
      end: "Sep 2021",
      summary:
        "End-to-end product ownership of a multi-tenant SaaS commerce platform, from AWS→GCP replatforming through a full order management rebuild.",
      achievements: [
        "Orchestrated cloud service replatforming from AWS to Google Cloud Platform and extended the platform pipeline via new internal app marketplace infrastructure.",
        "Designed and delivered the Rewards Point System, micro-transactions, merchandising system, promotions engine, segmentation targeting, enhanced CRM tooling, multi-tenant management and banner management.",
        "Rebuilt the Order Management System with a rules-based UI and microservices, enabling predictive inventory availability, Available-to-Promise logic, BOPIS/BOSFS rules, fulfilment optimisation and order orchestration.",
        "Established the Ecommerce PMO on Agile and Lean foundations and authored a custom SDLC framework specific to the organisation's SaaS needs.",
        "Managed the full implementation and deployment lifecycle — requirements gathering, specifications, WBS, UAT, QA task lists, status reviews, scope and risk management using PMI standards.",
        "Mentored new project managers and team members in developing their professional skillsets.",
      ],
      tech: ["Jira", "Confluence", "Aha", "MS Project", "Agile", "Lean"],
    },
    {
      role: "Senior Product / Project Manager",
      company: "Upshot Commerce",
      location: "Remote",
      start: "Sep 2001",
      end: "May 2016",
      summary:
        "Took a two-person operations team to a cross-functional organisation of 34 and converted a hosted product into an AWS SaaS business.",
      achievements: [
        "Partnered with the CEO to transition the business to a SaaS model, increasing year-over-year revenue by 238%.",
        "Transitioned the recurring-fee hosted solution to an AWS cloud platform, and drove redevelopment of the CGI platform to PHP.",
        "Designed and implemented a modular framework covering Order Management, Procurement and Allocations, Inventory Management, Order Pipeline management and Last Mile Fulfilment.",
        "Grew a two-person operation into a cross-functional team of 34 spanning project managers, engineering, UX/UI, design and DevOps.",
        "Led rebranding from Make-a-store, Inc. to Upshot Commerce, and refactored the platform from monolith to modular infrastructure and an apps marketplace.",
        "Owned product vision and roadmap, the partner programme and integrations, payment gateway vault initiatives, and a Customer Advisory Panel.",
        "Mentored project managers and product development engineers, and defined and introduced the organisation's agile process.",
      ],
      tech: ["AWS", "PHP", "SaaS", "Roadmapping", "Agile"],
    },
    {
      role: "President",
      company: "Another Place — Marketing, Advertising & Promotions",
      location: "Canada",
      start: "1992",
      end: "2001",
      summary:
        "Vertical advertising and marketing boutique focused on GLBT and youth marketplaces in Canada.",
      achievements: [
        "Developed, launched and managed the initial website and online business initiatives for Viacom's Famous Players Theatres — then Canada's largest cinema chain — for two years.",
        "Initiated, launched and managed a national live event spanning 50 nightclubs for Paramount Pictures' premiere of \"To Wong Foo, Thanks for Everything! Julie Newmar\".",
        "Co-managed media buys and promotions for BMG Music Canada, Sony Music Canada and RCA Music Canada.",
        "Created the Canadian Gay Newspaper Guild, giving corporations a national vehicle to reach the GLBT community.",
      ],
      tech: ["Marketing", "Advertising", "Media Buying", "Partnerships"],
    },
    {
      role: "Serviceman",
      company: "US Army",
      location: "United States",
      start: "1985",
      end: "1990",
      summary:
        "Developed teamwork, leadership, and the ability to think laterally to achieve shared goals.",
      achievements: [
        "Fort Jackson, SC — Basic Training, Squad Leader.",
        "Redstone Arsenal, AL — Pershing Missile Repair, Security Clearance.",
        "Fort Monmouth, NJ — United States Military Academy Preparatory School; admitted as a candidate for USMA.",
        "United States Military Academy, West Point NY — attended until junior year.",
      ],
      tech: ["Leadership", "Teamwork"],
    },
  ],

  projects: [
    {
      title: "Autonomous AI Agent Platform",
      tagline: "AI Platform · R&D",
      description:
        "Filed three provisional patent applications with the USPTO covering autonomous AI companion architecture, token-based identity systems, and hierarchical ethical constraint enforcement. Prototype in development as an IE6010 capstone at Wayne State University.",
      tech: ["Agent Architecture", "Patent Filing", "Wayne State IE6010"],
      link: "",
      metrics: [{ label: "provisional patents filed", value: "3" }],
    },
    {
      title: "Mi9 Retail Ecommerce Platform",
      tagline: "SaaS Platform · End-to-End Product Ownership",
      description:
        "Led the rebrand and platform evolution from Upshot Commerce through the Mi9 Retail acquisition — introducing agile process, launching an internal apps marketplace, and owning product vision, roadmap and a customer advisory panel.",
      tech: ["AWS", "GCP", "SaaS", "Product Roadmap"],
      link: "",
      metrics: [{ label: "years owned", value: "5" }],
    },
    {
      title: "Distributed Order Management System",
      tagline: "Order Orchestration · Mi9 Retail",
      description:
        "Order orchestration platform collecting orders from external channels, optimising package selection and routing each one to the best fulfilment location for BOPIS and BOSFS. Owned scoping, architecture, scalability and fail-safes across internal and external development teams.",
      tech: ["Microservices", "Order Orchestration", "ATP Logic"],
      link: "",
      metrics: [],
    },
    {
      title: "Dell Financial Services — Global DTC Replatform",
      tagline: "Global Commerce · Mi9 Retail",
      description:
        "Global B2B and DTC ecommerce replatform spanning five storefronts across three countries — RFP response, SOW authoring, C-level liaison, data normalisation, payment gateway integration and language/currency localisation.",
      tech: ["Global Commerce", "Payments", "Localisation"],
      link: "https://www.dellrefurbished.com/",
      metrics: [{ label: "storefronts launched", value: "5" }],
    },
    {
      title: "Hard Rock Cafe — Global DTC Replatform",
      tagline: "Global Commerce · Mi9 Retail",
      description:
        "Global direct-to-consumer replatforming with C-level liaison, UX process improvement, 3PL and warehouse integration into the online supply chain, ERP integration, and an in-store/online rewards points programme.",
      tech: ["ERP Integration", "3PL", "Rewards"],
      link: "",
      metrics: [],
    },
    {
      title: "Upshot Commerce → AWS SaaS Transformation",
      tagline: "Business Transformation · Upshot Commerce",
      description:
        "Converted a recurring-fee hosted product into an AWS cloud SaaS business, growing a two-person operation into a cross-functional team of 34 and refactoring the platform from monolith to modular infrastructure.",
      tech: ["AWS", "PHP", "SaaS", "Monolith → Modular"],
      link: "",
      metrics: [
        { label: "YoY revenue", value: "+238%" },
        { label: "team growth", value: "2→34" },
      ],
    },
  ],

  // Rendered as grouped capability chips.
  // NOTE: deliberately not percentage bars — self-assigned proficiency scores
  // aren't verifiable and read as an engineer's framing, not a leader's.
  skills: [
    {
      name: "Program & Portfolio Leadership",
      items: [
        "Agile & Scrum frameworks",
        "PMO establishment",
        "Capacity planning",
        "Risk & dependency management",
        "SDLC governance",
        "Roadmapping",
        "Budget & financial tracking",
        "Cross-program reporting",
      ],
    },
    {
      name: "Product Management",
      items: [
        "Product vision & strategy",
        "MVP definition",
        "Go-to-market planning",
        "Customer focus groups",
        "Market & competitive analysis",
        "Outcome Driven Innovation",
        "Behaviour-driven development",
        "Customer advisory panels",
      ],
    },
    {
      name: "Data Science & Analytics",
      items: [
        "Python (Pandas, Plotly, Panel)",
        "SQL",
        "Regression & classification",
        "Clustering (k-means, DBSCAN)",
        "Random Forest & Gradient Boosting",
        "Cross-validation & tuning",
        "Data storytelling",
        "Tableau",
        "Power BI",
      ],
    },
    {
      name: "Platform, Cloud & Engineering",
      items: [
        "AWS",
        "Google Cloud Platform",
        "Terraform",
        "AWS CloudFormation",
        "Docker",
        "Kubernetes",
        "MongoDB",
        "Solution architecture",
        "Multi-cloud architecture",
        "Cloud migration strategy",
        "Microservices",
      ],
    },
    {
      name: "Enterprise Ecommerce & SaaS",
      items: [
        "B2B & DTC commerce",
        "Order management systems",
        "SaaS platforms",
        "ERP integration",
        "Payments & gateways",
        "Fulfilment (BOPIS / BOSFS)",
        "Rewards & promotions engines",
        "CRM & segmentation",
        "Capital improvement programmes",
      ],
    },
    {
      name: "Leadership & Communication",
      items: [
        "Teams up to 95 engineers",
        "Mentoring & coaching",
        "Emotional intelligence (EQ)",
        "Change management",
        "Executive stakeholder alignment",
        "Cross-functional facilitation",
        "Strategic partnerships",
        "Design thinking",
      ],
    },
  ],

  // Scrolling marquee under the hero — keep to short phrases.
  marquee: [
    "Program Management",
    "Product Strategy",
    "Agile & Scrum",
    "Cloud Migration",
    "Multi-Cloud · AWS · GCP",
    "Outcome Driven Innovation",
    "Enterprise Ecommerce",
    "Order Management",
    "SDLC Governance",
    "Capacity Planning",
    "Executive Reporting",
    "Data Science",
    "Industrial AI",
    "Generative AI",
    "EQ Leadership",
  ],

  education: [
    {
      school: "Wayne State University",
      focus: "M.S. Artificial Intelligence — Industrial AI major",
      years: "In progress · final year",
      inProgress: true,
    },
    {
      school: "United States Military Academy at West Point",
      focus: "Computer Science Engineering, Math Engineering",
      years: "1987 – 1990",
    },
    {
      school: "Wayne State University",
      focus: "BA, Public Relations & Crisis Management",
      years: "1990 – 1991",
    },
    {
      school: "University of Wisconsin–Stevens Point",
      focus: "Grad Studies, Mass Communications",
      years: "1991 – 1992",
    },
  ],

  certifications: [
    { name: "Project Management Professional (PMP)", issuer: "Project Management Institute", year: "2020" },
    { name: "Certified Scrum Product Owner (CSPO)", issuer: "Scrum Alliance", year: "2021" },
    { name: "Certified ScrumMaster (CSM)", issuer: "Scrum Alliance", year: "2021" },
    { name: "kBuilder Developer Certification", issuer: "Kuaishou Technology", year: "2025" },
    { name: "Google Advanced Data Analytics Professional", issuer: "Google", year: "2024" },
    { name: "IBM Data Science Specialization", issuer: "IBM", year: "2024" },
    { name: "Machine Learning with Python (with Honors)", issuer: "IBM", year: "2024" },
    { name: "Databases and SQL for Data Science (with Honors)", issuer: "IBM", year: "2024" },
    { name: "Data Visualization with Python", issuer: "IBM", year: "2024" },
  ],

  // Volunteering — rendered after the career timeline.
  volunteering: [
    {
      role: "Data Analyst — Dashboard Developer",
      org: "DataKind",
      dates: "Sep 2024 – Nov 2024 · Economic Empowerment",
      summary:
        "Florida Housing Availability DataKit Challenge — turned fragmented public housing data into an interactive dashboard anyone can read.",
      points: [
        "Designed and developed an interactive dashboard using Python, Panel and Plotly to visualise housing availability across Florida counties.",
        "Integrated multiple data sources, including Census and HUD data, to surface housing types, vacancy rates, population and unit structures.",
        "Enabled dynamic county selection with per-year metrics for homeowner and rental vacancy rates and unit structures by type.",
        "Applied advanced data cleaning, transformation and visualisation techniques to keep the insights accurate and meaningful.",
        "Volunteered to drive public data transparency on Florida housing metrics.",
      ],
      tech: ["Python", "Pandas", "Plotly", "Panel", "Data Visualisation"],
      link: "https://app.screencast.com/qocNWO9QTLEEi?tab=Details&conversation=vVJOqtwSTyNPp2wqMeleFy",
    },
    {
      role: "Expert Reviewer — AI2AI Challenge",
      org: "DataKind",
      dates: "Jul 2024 – Aug 2024 · Science and Technology",
      summary:
        "Scored and critiqued proposals applying AI to social impact, with a focus on economic inclusion.",
      points: [
        "Evaluated and scored proposals from nonprofits, social enterprises and academic institutions worldwide applying AI for social impact, particularly economic inclusion.",
        "Completed orientation on the scoring rubric, review process and the Award Force scoring platform.",
        "Provided detailed, constructive feedback highlighting areas for improvement and ways to increase potential social impact.",
        "Contributed 5–20 hours of expertise across the review period, and was recognised on the AI2AI Challenge website for the contribution.",
      ],
      tech: ["AI Evaluation", "Proposal Review", "Economic Inclusion", "Social Impact"],
      link: "",
    },
  ],

  // Top LinkedIn skill endorsements, shown verbatim with their counts — this is
  // third-party validation, so it isn't paraphrased or reordered by importance.
  endorsements: [
    { skill: "E-commerce", count: 45 },
    { skill: "Online Marketing", count: 26 },
    { skill: "Product Management", count: 21 },
    { skill: "Strategy", count: 16 },
    { skill: "Marketing Strategy", count: 15 },
    { skill: "Management", count: 13 },
    { skill: "Project Management", count: 11 },
    { skill: "Business Development", count: 11 },
    { skill: "SaaS", count: 9 },
    { skill: "SEO", count: 8 },
  ],

  // Real LinkedIn recommendations. Quotes are trimmed to the most substantive
  // sentences (order preserved, no meaning changed) — see README.
  testimonials: [
    {
      quote:
        "When Derek was asked to step up into a leadership role a number of years ago, he didn't hesitate. He threw his energies into leading our team and pushing for improvements in documentation and process that helped to improve efficiency and transparency with clients. Derek goes the extra mile, he's a curious constant learner, and he has a wealth of institutional knowledge and professional insight that everyone benefits from.",
      author: "Rebecca Traxler",
      title: "Senior Systems Consultant — Application, CSPO",
      context: "Reported to Derek directly · 2019",
    },
    {
      quote:
        "I eventually reported to him when he assumed leadership over our eCommerce project management team. I looked to him for guidance on agile project methodology best practices and to answer questions about building WBS, project charters, and other key project artifacts. I would enthusiastically work with, or for, Derek again.",
      author: "Erica Jessen",
      title: "Senior IT Project Manager",
      context: "Reported to Derek directly · 2018",
    },
    {
      quote:
        "He always knows how to motivate the team to do a great job and how to set everyone in a good mood. He is a leader and a reliable team player. He is my go-to person for eCommerce knowledge, and I mostly respect him for his exceptional problem-solving skills and constant strive to deliver a perfect product.",
      author: "Desislava Dimitrova",
      title: "Product Owner · Team Lead · UI/UX Designer",
      context: "Worked on the same team · 2021",
    },
    {
      quote:
        "Derek is a great visionary. He was pitching SaaS before the concept was coined. He has mentored, led, and took direction equally. And he's very tall.",
      author: "Neal Kaiser",
      title: "Co-Founder & CTO at Virtual Sapiens",
      context: "Worked on the same team · 2008",
    },
  ],

  /* ===========================================================================
     AI AGENT
     ---------------------------------------------------------------------------
     mode: "local"  → fully offline, zero config, instant. (default)
     mode: "api"    → POSTs the conversation to `endpoint` and streams the reply.

     The `kb` entries below are keyword-matched when running locally. Keep
     `keywords` lowercase; more specific phrases score higher.
     ========================================================================= */
  agent: {
    name: "Ask Derek AI",
    tagline: "Trained on this portfolio",
    greeting:
      "Hi — I'm Derek's AI agent. I can walk you through his experience, technical depth and availability. What would you like to know?",

    mode: "local", // "local" | "api"
    endpoint: "", // e.g. "/api/chat" — required when mode === "api"
    model: "gpt-4o-mini",

    // Starter prompts rendered as chips in the panel.
    suggestions: [
      "Summarise his experience",
      "What are his biggest wins?",
      "Tell me about his AI work",
      "What do colleagues say?",
      "How large a team has he led?",
      "How do I get in touch?",
    ],

    // Extra system instruction appended when mode === "api".
    systemPromptExtra:
      "Only discuss Derek's professional background. If asked something outside that, politely redirect. Never invent employers, dates or metrics.",

    kb: [
      {
        id: "experience",
        keywords: ["experience", "background", "career", "history", "worked", "role", "job", "cv", "resume", "summary", "summarise", "summarize", "years"],
        answer: ({ experience }) =>
          "Derek has 20+ years in product and program leadership:\n\n" +
          experience
            .map((e) => `• ${e.role} — ${e.company} (${e.start}–${e.end})`)
            .join("\n") +
          "\n\nAsk about any role and I'll go deeper.",
      },
      {
        id: "tech",
        keywords: ["tech", "stack", "technologies", "tools", "language", "languages", "framework", "skills", "know", "use", "proficient", "technically", "toolkit"],
        answer: ({ skills }) =>
          "His toolkit breaks down like this:\n\n" +
          skills
            .map((g) => `• ${g.name}: ${g.items.slice(0, 6).join(", ")}`)
            .join("\n") +
          "\n\nAsk about any area and I'll go into detail.",
      },
      {
        id: "ai",
        keywords: ["ai work", "artificial intelligence", "agent", "patent", "uspto", "machine learning", "autonomous", "llm", "ai", "industrial ai"],
        answer:
          "AI is his current focus. He's in the final year of an M.S. in Artificial Intelligence with an Industrial AI major at Wayne State University, and has filed three provisional patent applications with the USPTO covering autonomous AI companion architecture, token-based identity systems, and hierarchical ethical constraint enforcement — built as his IE6010 capstone.\n\nHe also holds a Google Advanced Data Analytics Professional certificate plus IBM certifications in Machine Learning with Python (with Honors), Data Science Specialization, and Databases and SQL for Data Science. On the applied side he volunteers with DataKind, building Python dashboards for public-interest datasets.",
      },
      {
        id: "win",
        keywords: ["win", "biggest", "achievement", "accomplishment", "proud", "impact", "result", "success", "best", "roi", "numbers", "wins"],
        answer:
          "The headline numbers come from Walmart Global Tech:\n\n" +
          "• $456.2M delivered against a $350M Marketing GMV target\n" +
          "• 63% improvement in capacity planning and visibility processes\n" +
          "• $12.75M reduction in operational capital expenditure\n" +
          "• Agile framework and scrum processes built for 95 engineers across 8 data programs\n\n" +
          "Earlier, at Upshot Commerce he grew year-over-year revenue by 238% and scaled the team from 2 people to 34.",
      },
      {
        id: "availability",
        keywords: ["available", "opportunit", "hiring", "hire", "open to", "notice", "start", "recruit", "headhunt", "role offer", "contract", "freelance", "consulting"],
        answer: ({ meta }) =>
          `He's ${meta.availability.toLowerCase()}. Based in ${meta.location}, and works well remotely.\n\nShare the role details and I can tell you how closely it maps to his background.`,
      },
      {
        id: "contact",
        keywords: ["contact", "email", "reach", "touch", "call", "connect", "linkedin", "message", "get in touch", "speak"],
        answer: ({ meta, socials }) =>
          `Easiest route is email: ${meta.email}\n\n` +
          // Skip the mail identity — the address is already stated above, and
          // printing its raw `mailto:` URL reads badly.
          socials
            .filter((s) => s.icon !== "mail")
            .map((s) => `• ${s.label}: ${s.url}`)
            .join("\n"),
      },
      {
        id: "ecommerce",
        keywords: ["ecommerce", "e-commerce", "retail", "commerce", "order management", "oms", "fulfilment", "fulfillment", "bopis", "saas", "platform", "digital commerce"],
        answer:
          "Enterprise commerce is his deepest domain — 20+ years of it. Highlights:\n\n" +
          "• Rebuilt a rules-based Order Management System with predictive inventory availability, Available-to-Promise logic, and BOPIS/BOSFS fulfilment rules\n" +
          "• Global DTC replatforms for Dell Financial Services (5 storefronts, 3 countries) and Hard Rock Cafe\n" +
          "• Took a hosted product to an AWS SaaS business with 238% YoY revenue growth\n" +
          "• Designed and shipped rewards, micro-transactions, merchandising, promotions and segmentation systems",
      },
      {
        id: "projects",
        keywords: ["project", "portfolio", "built", "build", "shipped", "case study", "work sample"],
        answer: ({ projects }) =>
          "Six highlights:\n\n" +
          projects.map((p) => `• ${p.title} — ${p.tagline}`).join("\n") +
          "\n\nAsk about any of them and I'll go deeper.",
      },
      {
        id: "leadership",
        keywords: ["lead", "leadership", "mentor", "manage", "management", "senior", "team", "collaborat", "stakeholder", "size", "large", "many people", "direct report"],
        answer:
          "He operates at programme level. At Walmart Global Tech he built the agile framework and scrum processes for a 95-engineer organisation spanning eight data programs, and owned the reporting that gave senior leadership visibility and risk management.\n\nEarlier, at Upshot Commerce he grew a two-person operation into a cross-functional team of 34, and he has consistently mentored project managers and product development engineers.",
      },
      {
        id: "remote",
        keywords: ["remote", "onsite", "on-site", "hybrid", "relocat", "timezone", "location", "where", "based"],
        answer: ({ meta }) =>
          `He's based in ${meta.location}. Walmart Global Tech and Mi9 Retail were both fully remote roles; his current work is hybrid in Detroit. Hybrid, remote and on-site arrangements have all worked for him.`,
      },
      {
        id: "why",
        keywords: ["why", "different", "unique", "stand out", "value", "strength", "should we hire", "fit"],
        answer:
          "Two things stand out.\n\nFirst, he ties programme work to money — $456.2M GMV against a $350M target, a $12.75M capex reduction, 238% YoY revenue growth.\n\nSecond, he builds the operating system, not just the deliverable: the agile framework, the PMO, the custom SDLC, and the reporting that lets leadership see risk early.",
      },
      {
        id: "references",
        keywords: ["recommendation", "reference", "colleague", "feedback", "say about", "endorsement", "peer", "praise", "testimonial", "reputation", "think of him", "what do others"],
        answer: ({ testimonials }) =>
          `${testimonials.length} colleagues have recommended him publicly:\n\n` +
          testimonials
            .map((t) => {
              const first = t.quote.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? t.quote;
              return `• ${t.author}, ${t.title} (${t.context}) — "${first}"`;
            })
            .join("\n\n"),
      },
      {
        id: "education",
        keywords: ["education", "degree", "university", "college", "study", "school", "certif", "qualified", "qualification", "credential", "masters", "ms", "ba"],
        answer: ({ education, certifications }) =>
          "Education:\n" +
          education.map((e) => `• ${e.focus} — ${e.school} (${e.years})`).join("\n") +
          "\n\nCertifications:\n" +
          certifications.map((c) => `• ${c.name} — ${c.issuer} (${c.year})`).join("\n"),
      },
      {
        id: "volunteering",
        keywords: ["volunteer", "volunteering", "community", "datakind", "give back", "social impact", "nonprofit", "non-profit", "charity", "outside work", "pro bono"],
        answer: ({ volunteering }) =>
          "He volunteers with DataKind, applying data skills to public-interest problems:\n\n" +
          volunteering
            .map((v) => `• ${v.role} at ${v.org} (${v.dates}) — ${v.summary}`)
            .join("\n\n"),
      },
      {
        id: "data",
        keywords: ["data science", "analytics", "python", "pandas", "plotly", "panel", "dashboard", "visualisation", "visualization", "sql", "tableau", "power bi", "data storytelling", "statistics", "ml"],
        answer:
          "He works in Python day to day — Pandas for wrangling, Plotly and Panel for interactive dashboards. His Google Advanced Data Analytics and IBM Data Science certifications cover regression and classification, clustering (k-means, DBSCAN), Random Forest, Gradient Boosting, Naive Bayes, cross-validation, hyperparameter tuning and bootstrapping.\n\nApplied, that shows up in the DataKind Florida Housing dashboard he built as a volunteer, and in the reporting he owned across eight data programs at Walmart Global Tech.",
      },
      {
        id: "process",
        keywords: ["process", "methodolog", "agile", "how does he work", "approach", "way of working", "scrum", "kanban", "lean"],
        answer:
          "Agile and Scrum form the base, with Lean where it fits. He establishes PMOs and authors custom SDLC frameworks rather than importing a template, works to PMI standards for scope, budget and risk, and applies Outcome Driven Innovation and behaviour-driven development to keep delivery tied to customer outcomes.",
      },
    ],

    // Said when nothing matches. Keeps the agent feeling intentional.
    fallback:
      "I don't have that detail on file — I only speak to Derek's professional background. Try asking about his experience, tech stack, projects, or how to get in touch.",
  },
};
