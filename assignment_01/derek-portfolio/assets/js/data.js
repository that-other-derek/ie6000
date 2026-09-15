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

  /* ===========================================================================
     INTELLIMAKE JOURNAL — periodic notes from the MS programme.

     `name` is the one place this section is named. The desktop nav link, the
     mobile drawer link, the section eyebrow and the AI agent all read it from
     here, so renaming the section is a one-line change rather than a hunt for
     four hard-coded strings. (It's deliberately not called just "Journal" —
     that reads as a personal diary, which is the opposite of what it is.)

     Add new entries at the TOP of `entries`; the section renders itself and
     the first entry automatically gets the "Latest" badge.
     ========================================================================= */
  journal: {
    name: "IntelliMake Journal",
    lede:
      "IntelliMake is Wayne State University's proof of concept for autonomous manufacturing — not a simulation exercise. Every MS student in the Industrial Engineering, Artificial Intelligence programme contributes coursework toward the same working system. My final year is going into two parts of it.",
    entries: [
      {
        date: "September 2026",
        tag: "Manufacturing Intelligence Exchange",
        title: "Joining the Manufacturing Intelligence Exchange",
        body: [
          "The Exchange is IntelliMake's agent layer, and it works as an exchange rather than a fixed pipeline: autonomous agents post their knowledge objects, then exchange and retrieve what's relevant so they can sequence their workloads collaboratively — behaving as one efficient unit rather than a set of agents working in isolation.",
          "That's the part that pulled me in. I'm joining as a contributing member, with my focus on the foundations of an AI community hub: how a knowledge object has to be structured before another agent can act on it, how relevance gets established when both the publisher and the consumer are machines, and what keeps a shared pool of knowledge trustworthy as more agents start contributing to it.",
          "Building a hub for agents rather than people is the genuinely new problem. Same shape as the enterprise platforms I've spent twenty years on — contributors, governance, a definition of done — except the contributors don't get tired, don't need onboarding, and won't tell you when the schema is wrong.",
        ],
        link: { label: "intellimake.org", url: "https://intellimake.org" },
      },
      {
        date: "September 2026",
        tag: "IntelliAware AI Vision",
        title: "Contributing to IntelliAware AI Vision",
        body: [
          "The second group I'm joining is IntelliAware AI Vision, IntelliMake's computer vision effort. If the Exchange is about how agents share what they know, the vision group is about what they can perceive — the sensing layer that gives an autonomous manufacturing system its picture of the world.",
          "I'll be contributing to both. The balance sits on the Exchange: the hub model is the newer problem, and it's the one I want to come out of this able to build end to end.",
        ],
        link: null,
      },
    ],
  },

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
    // Lead with the questions a recruiter actually types — including the
    // study/current-work ones, which the agent previously couldn't answer.
    suggestions: [
      "What's he studying at Wayne State?",
      "What does he do now?",
      "Summarise his experience",
      "What are his biggest wins?",
      "Tell me about his AI work",
      "How do I get in touch?",
    ],

    // Extra system instruction appended when mode === "api".
    // Deliberately NOT "professional background only": his degree, his
    // IntelliMake research and his volunteering are all fair game, and the old
    // wording made the agent refuse questions it should have answered.
    systemPromptExtra:
      "Cover Derek's professional background, his studies and research, his " +
      "certifications and his volunteering — anything on this site is fair " +
      "game. For anything genuinely outside that, say you don't have it rather " +
      "than guessing. Never invent employers, dates, metrics or credentials.",

    // Query expansion, applied before scoring.
    //
    // Each pair is [what the visitor typed, extra terms to also search for].
    // This is the fix for the class of question that used to fall straight
    // through: "what does Derek do at WSU" had no keyword in common with any
    // entry, because the knowledge base said "Wayne State University" and the
    // visitor said "WSU".
    aliases: [
      ["wsu", "wayne state university masters degree study intellimake capstone research"],
      ["wayne state", "wsu university masters degree study intellimake capstone research"],
      ["masters", "education degree university study qualification ms"],
      ["masters degree", "education degree university study qualification ms"],
      ["degree", "education university study masters qualification"],
      ["postgrad", "education university masters study"],
      // Note: these add terms that exist in the knowledge base below. Keep them
      // targeted — a broad expansion makes several entries match at once and the
      // wrong one can win.
      ["intellimake", "manufacturing intelligence exchange intelliaware autonomous manufacturing agents research project"],
      ["intelliaware", "computer vision intellimake autonomous manufacturing research project"],
      ["the exchange", "manufacturing intelligence exchange intellimake agents research project"],
      ["west point", "usma military army education west point"],
      ["army", "military service west point veterans"],
      ["current job", "now currently role great lakes water authority consulting"],
      ["current role", "now currently role great lakes water authority consulting"],
      ["these days", "now currently role study"],
      ["pmp", "certification project management professional credential"],
      ["cspo", "certification scrum product owner credential"],
      ["csm", "certification scrummaster credential"],
      ["resume", "cv experience download contact"],
      ["cv", "resume experience download contact"],
      ["salary", "compensation rate discussion contact"],
      ["compensation", "salary rate discussion contact"],
      ["comp-wise", "compensation salary package expectations"],
      ["comp wise", "compensation salary package expectations"],
      ["patents", "patent uspto autonomous ai companion architecture"],
      ["genai", "generative ai llm artificial intelligence"],
      ["llm", "generative ai artificial intelligence large language model"],
      ["python", "data science analytics coding technical hands-on"],
      ["hire", "hiring availability open to roles recruit"],
    ],

    kb: [
      {
        id: "experience",
        label: "His 20+ year career, role by role",
        sample: "Summarise his experience",
        keywords: ["experience", "background", "career", "history", "worked", "role", "job", "cv", "resume", "summary", "summarise", "summarize", "years", "companies", "employers", "worked for"],
        also: ["who is he", "tell me about him", "overview", "bio"],
        answer: ({ experience }) =>
          "Derek has 20+ years in product and program leadership:\n\n" +
          experience
            .map((e) => `• ${e.role} — ${e.company} (${e.start}–${e.end})`)
            .join("\n") +
          "\n\nAsk about any role and I'll go deeper.",
      },
      {
        id: "tech",
        label: "His tech stack and the tools he uses",
        sample: "What's his tech stack?",
        keywords: ["tech", "stack", "technologies", "tools", "language", "languages", "framework", "skills", "know", "use", "proficient", "technically", "toolkit", "tech stack"],
        also: ["what tools", "what software", "what platforms"],
        answer: ({ skills }) =>
          "His toolkit breaks down like this:\n\n" +
          skills
            .map((g) => `• ${g.name}: ${g.items.slice(0, 6).join(", ")}`)
            .join("\n") +
          "\n\nAsk about any area and I'll go into detail.",
      },
      {
        id: "ai",
        label: "His AI work and the three patents",
        sample: "Tell me about his AI work",
        keywords: ["ai work", "artificial intelligence", "agent", "patent", "uspto", "machine learning", "autonomous", "llm", "ai", "industrial ai", "generative ai", "genai"],
        also: ["ai experience", "does he know ai", "ai background"],
        answer:
          "AI is his current focus. He's in the final year of an M.S. in Artificial Intelligence with an Industrial AI major at Wayne State University, and has filed three provisional patent applications with the USPTO covering autonomous AI companion architecture, token-based identity systems, and hierarchical ethical constraint enforcement — built as his IE6010 capstone.\n\nHe also holds a Google Advanced Data Analytics Professional certificate plus IBM certifications in Machine Learning with Python (with Honors), Data Science Specialization, and Databases and SQL for Data Science. On the applied side he volunteers with DataKind, building Python dashboards for public-interest datasets.\n\nFor the research itself — IntelliMake, the Manufacturing Intelligence Exchange, IntelliAware AI Vision — ask what he's working on right now.",
      },
      {
        id: "win",
        label: "His biggest wins, with the numbers",
        sample: "What are his biggest wins?",
        keywords: ["win", "biggest", "achievement", "accomplishment", "proud", "impact", "result", "success", "best", "roi", "numbers", "wins", "track record"],
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
        label: "Availability and the roles he's open to",
        sample: "Is he available?",
        keywords: ["available", "opportunit", "hiring", "hire", "open to", "notice", "start", "recruit", "headhunt", "role offer", "contract", "freelance", "consulting", "notice period"],
        answer: ({ meta }) =>
          `He's ${meta.availability.toLowerCase()}. Based in ${meta.location}, and works well remotely.\n\nShare the role details and I can tell you how closely it maps to his background.`,
      },
      {
        id: "contact",
        label: "How to get in touch",
        sample: "How do I get in touch?",
        keywords: ["contact", "email", "reach", "touch", "call", "connect", "linkedin", "message", "get in touch", "speak", "send a message"],
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
        label: "Enterprise ecommerce, order management and SaaS",
        sample: "Tell me about his ecommerce work",
        keywords: ["ecommerce", "e-commerce", "retail", "commerce", "order management", "oms", "fulfilment", "fulfillment", "bopis", "saas", "platform", "digital commerce", "supply chain"],
        answer:
          "Enterprise commerce is his deepest domain — 20+ years of it. Highlights:\n\n" +
          "• Rebuilt a rules-based Order Management System with predictive inventory availability, Available-to-Promise logic, and BOPIS/BOSFS fulfilment rules\n" +
          "• Global DTC replatforms for Dell Financial Services (5 storefronts, 3 countries) and Hard Rock Cafe\n" +
          "• Took a hosted product to an AWS SaaS business with 238% YoY revenue growth\n" +
          "• Designed and shipped rewards, micro-transactions, merchandising, promotions and segmentation systems",
      },
      {
        id: "projects",
        label: "The six projects on this site",
        sample: "What has he built?",
        keywords: ["project", "portfolio", "built", "build", "shipped", "case study", "work sample", "what has he built", "things he has built"],
        answer: ({ projects }) =>
          "Six highlights:\n\n" +
          projects.map((p) => `• ${p.title} — ${p.tagline}`).join("\n") +
          "\n\nAsk about any of them and I'll go deeper.",
      },
      {
        id: "leadership",
        label: "How large a team he's led, and how",
        sample: "How large a team has he led?",
        keywords: ["lead", "leadership", "mentor", "manage", "management", "senior", "team", "collaborat", "stakeholder", "size", "large", "many people", "direct report", "team size", "how many people"],
        answer:
          "He operates at programme level. At Walmart Global Tech he built the agile framework and scrum processes for a 95-engineer organisation spanning eight data programs, and owned the reporting that gave senior leadership visibility and risk management.\n\nEarlier, at Upshot Commerce he grew a two-person operation into a cross-functional team of 34, and he has consistently mentored project managers and product development engineers.",
      },
      {
        id: "remote",
        label: "Location, remote and hybrid",
        sample: "Where is he based?",
        keywords: ["remote", "onsite", "on-site", "hybrid", "relocat", "timezone", "location", "where", "based", "moving", "travel", "commute", "visa", "work permit", "authorised", "authorized"],
        answer: ({ meta }) =>
          `He's based in ${meta.location}. Walmart Global Tech and Mi9 Retail were both fully remote roles; his current work is hybrid in Detroit. Hybrid, remote and on-site arrangements have all worked for him.`,
      },
      {
        id: "why",
        label: "What makes him different",
        sample: "Why should we hire him?",
        keywords: ["why", "different", "unique", "stand out", "value", "strength", "should we hire", "fit", "good fit", "best candidate", "standout"],
        answer:
          "Two things stand out.\n\nFirst, he ties programme work to money — $456.2M GMV against a $350M target, a $12.75M capex reduction, 238% YoY revenue growth.\n\nSecond, he builds the operating system, not just the deliverable: the agile framework, the PMO, the custom SDLC, and the reporting that lets leadership see risk early.",
      },
      {
        id: "references",
        label: "What colleagues say about him",
        sample: "What do colleagues say?",
        keywords: ["recommendation", "reference", "colleague", "feedback", "say about", "endorsement", "peer", "praise", "testimonial", "reputation", "think of him", "what do others", "what do people say", "manager say"],
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
        label: "Every degree and certification",
        sample: "What qualifications does he have?",
        keywords: ["education", "degree", "university", "college", "study", "school", "certif", "qualified", "qualification", "credential", "masters", "ms", "ba", "pmp", "cspo", "csm", "scrum alliance", "credentialed", "accredited"],
        answer: ({ education, certifications }) =>
          "Education:\n" +
          education.map((e) => `• ${e.focus} — ${e.school} (${e.years})`).join("\n") +
          "\n\nCertifications:\n" +
          certifications.map((c) => `• ${c.name} — ${c.issuer} (${c.year})`).join("\n"),
      },
      {
        id: "volunteering",
        label: "His volunteering with DataKind",
        sample: "Does he volunteer?",
        keywords: ["volunteer", "volunteering", "community", "datakind", "give back", "social impact", "nonprofit", "non-profit", "charity", "outside work", "pro bono", "social good"],
        answer: ({ volunteering }) =>
          "He volunteers with DataKind, applying data skills to public-interest problems:\n\n" +
          volunteering
            .map((v) => `• ${v.role} at ${v.org} (${v.dates}) — ${v.summary}`)
            .join("\n\n"),
      },
      {
        id: "data",
        label: "Data science, analytics and Python",
        sample: "What's his data science depth?",
        keywords: ["data science", "analytics", "python", "pandas", "plotly", "panel", "dashboard", "visualisation", "visualization", "sql", "tableau", "power bi", "data storytelling", "statistics", "ml", "machine learning", "modelling", "modeling"],
        answer:
          "He works in Python day to day — Pandas for wrangling, Plotly and Panel for interactive dashboards. His Google Advanced Data Analytics and IBM Data Science certifications cover regression and classification, clustering (k-means, DBSCAN), Random Forest, Gradient Boosting, Naive Bayes, cross-validation, hyperparameter tuning and bootstrapping.\n\nApplied, that shows up in the DataKind Florida Housing dashboard he built as a volunteer, and in the reporting he owned across eight data programs at Walmart Global Tech.",
      },
      {
        id: "process",
        label: "How he runs projects day to day",
        sample: "How does he run a programme?",
        keywords: ["process", "methodolog", "agile", "how does he work", "approach", "way of working", "scrum", "kanban", "lean", "management style", "working style", "run a programme", "run a program", "how does he run", "delivery cadence", "governance"],
        answer:
          "Agile and Scrum form the base, with Lean where it fits. He establishes PMOs and authors custom SDLC frameworks rather than importing a template, works to PMI standards for scope, budget and risk, and applies Outcome Driven Innovation and behaviour-driven development to keep delivery tied to customer outcomes.",
      },

      /* --- The questions that used to fall through -------------------------
         Everything below covers material that was already on the page (the
         IntelliMake Journal, the education list, the current roles) but had no
         knowledge-base entry, so a direct question about it produced a
         blanket "I don't have that detail" instead of an answer. */
      {
        id: "study",
        label: "What he's studying at Wayne State",
        sample: "What's he studying at Wayne State?",
        keywords: [
          "wayne state", "wayne state university", "wsu", "university", "masters", "ms", "msc", "degree", "study", "studying", "student", "school", "college", "class", "course", "coursework", "curriculum", "capstone", "ie6010", "research", "thesis", "industrial engineering", "industrial ai", "graduate", "education",
        ],
        answer: ({ education, journal }) =>
          "He's finishing an M.S. in Artificial Intelligence with an Industrial AI major at Wayne State University — in his final year.\n\n" +
          (journal?.lede ? journal.lede + "\n\n" : "") +
          "Beyond the current degree, his full education list is:\n" +
          education.map((e) => `• ${e.focus} — ${e.school} (${e.years})`).join("\n") +
          "\n\nAsk about the IntelliMake research and I'll go into what he's actually building.",
      },
      {
        id: "journal",
        label: "The IntelliMake Journal (his MS research notes)",
        sample: "What's in the IntelliMake Journal?",
        // Decisive: naming the section should answer about the section, even
        // though the alias expansion for "intellimake" floods the research
        // entry with matches at the same time.
        strong: ["intellimake journal", "the journal", "his journal", "journal"],
        keywords: [
          "intellimake journal", "journal", "blog", "writing", "writes", "notes", "articles", "posts", "updates", "diary", "log", "latest news", "what is he working on", "what is he writing",
        ],
        also: ["anything new", "what has he published"],
        answer: ({ journal }) =>
          // Lead with what the Journal is *not*: the section was renamed to
          // avoid exactly this confusion, so the agent shouldn't reintroduce it.
          [
            `The ${journal.name} isn't a personal diary — it's where he writes up the IntelliMake work as it happens at Wayne State.`,
            ...(journal.entries || []).map((e) => `**${e.title}** (${e.date}, ${e.tag})\n${e.body[0]}`),
            journal.lede || "",
          ].filter(Boolean).join("\n\n"),
      },
      {
        id: "research",
        label: "The IntelliMake research (Exchange, IntelliAware)",
        sample: "What is he building at IntelliMake?",
        keywords: [
          "intellimake", "intelliaware", "manufacturing intelligence exchange", "the exchange", "autonomous manufacturing", "knowledge object", "agents", "agent layer", "computer vision", "vision group", "research project", "capstone project", "what is he building",
        ],
        answer: ({ journal }) => {
          const lede = journal?.lede ? journal.lede + "\n\n" : "";
          // Bold only — the formatter understands ** and `code`, not underscores.
          const entries = (journal?.entries || [])
            .map((e) => `**${e.title}** (${e.date})\n${e.body[0]}`)
            .join("\n\n");
          const link = (journal?.entries || []).map((e) => e.link).find(Boolean);
          return lede + entries + (link ? `\n\nMore at ${link.url}` : "");
        },
      },
      {
        id: "now",
        label: "What he's doing right now",
        sample: "What does he do now?",
        keywords: [
          "now", "currently", "current", "right now", "these days", "current role", "current job", "day to day", "great lakes", "great lakes water authority", "glwa", "application analyst", "another place", "consultancy", "consulting practice",
        ],
        answer: ({ experience }) => {
          const current = experience.filter((e) => /present|current|now/i.test(e.end));
          if (!current.length) return "He's between roles — ask about his availability.";
          return "At the moment he's doing two things:\n\n" +
            current.map((e) => `• ${e.role} at ${e.company} (${e.start} – present) — ${e.summary}`).join("\n\n") +
            "\n\nAlongside both, he's in the final year of his M.S. at Wayne State, working on IntelliMake.";
        },
      },
      {
        id: "hands-on",
        label: "How hands-on and technical he is",
        sample: "Is he hands-on technically?",
        keywords: ["hands-on", "hands on", "technical", "can he code", "does he code", "coding", "developer", "engineer himself", "write code", "practical", "build things", "implement"],
        answer:
          "He's a product and programme leader who stays close to the build rather than a full-time engineer. Concretely: he wrote and shipped the Python/Panel/Plotly dashboard for the DataKind Florida housing challenge, he authored the SDLC framework and governance for Terraform/AWS CloudFormation delivery, he owned architecture and scalability decisions on the order-orchestration platform, and he's currently building a computer-vision and agent-coordination research project at Wayne State.\n\nSo he can read, question and prototype — which is what lets him review engineering work credibly without pretending to be the engineer.",
      },
      {
        id: "military",
        label: "Military service and West Point",
        sample: "Did he serve in the military?",
        keywords: ["military", "army", "us army", "serviceman", "served", "service", "west point", "usma", "veteran", "pershing", "fort jackson", "fort monmouth", "redstone"],
        answer: ({ experience, education }) => {
          const army = experience.find((e) => /army|military/i.test(e.company));
          const wp = (education || []).find((e) => /west point/i.test(e.school));
          return (army
            ? `He served in the US Army from ${army.start} to ${army.end}. ${army.summary}\n\n` +
              (army.achievements || []).map((a) => `• ${a}`).join("\n")
            : "He served in the US Army from 1985 to 1990.") +
            (wp ? `\n\nHe also attended ${wp.school} for ${wp.focus} (${wp.years}).` : "");
        },
      },
      {
        id: "next-steps",
        label: "How to move this forward (CV, interview, intro call)",
        sample: "How do we move forward?",
        keywords: ["next steps", "move forward", "move this forward", "interview", "talk to him", "speak to him", "intro", "introduction", "screening", "process", "schedule", "meeting", "download", "send his cv", "get his cv", "get his resume"],
        answer: ({ meta }) =>
          `Simplest is email — ${meta.email} — with the role or problem in a line or two and he'll reply. He's ${meta.availability.toLowerCase()}.`,
      },
      {
        id: "compensation",
        label: "Compensation and rate",
        sample: "What's he looking for, comp-wise?",
        keywords: ["compensation", "salary", "rate", "day rate", "pay", "package", "remuneration", "money", "expectations", "how much", "cost", "comp-wise", "comp wise", "pay expectations"],
        answer: ({ meta }) =>
          `Not something he publishes here — it depends on the scope and the contract type. Send the role details to ${meta.email} and he'll be straightforward about it.`,
      },
    ],

    // Said when nothing matches. agent.js appends the list of topics it *can*
    // cover, generated from the `label` on each entry above, so a miss reads as
    // a scoped answer rather than a wall.
    fallback:
      "That one isn't in my notes on Derek — I'd rather tell you that than guess.",
  },
};
