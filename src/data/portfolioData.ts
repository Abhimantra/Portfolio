export type TechCategoryId =
  | 'all'
  | 'backend'
  | 'cloud'
  | 'ai'
  | 'frontend'
  | 'automation';

export interface TechItem {
  id: string;
  name: string;
  category: Exclude<TechCategoryId, 'all'>;
  categoryLabel: string;
  role: string;
  summary: string;
}

export interface ProjectArchitectureNode {
  stage: string;
  label: string;
  detail: string;
}

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  highlights: string[];
  metrics?: { label: string; value: string }[];
  technologies: string[];
  caseStudy: {
    problem: string;
    solution: string;
    contribution: string[];
    architectureSummary: string;
    architectureFlow: ProjectArchitectureNode[];
  };
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  summary: string;
  focusAreas: string[];
  technologies: string[];
}

export interface CapabilityItem {
  id: string;
  index: string;
  title: string;
  summary: string;
  disciplines: string[];
}

export interface ProfileConfig {
  name: string;
  firstName: string;
  title: string;
  positioning: string;
  experienceYears: string;
  heroHeadlineLine1: string;
  heroHeadlineLine2: string;
  heroSubheadline: string;
  /** Edit this string directly to change the default availability message across the site. */
  defaultAvailability: string;
  availabilityPresets: string[];
  contact: {
    /** Replace with your preferred public contact email */
    email: string;
    /** Replace with your LinkedIn profile URL */
    linkedinUrl: string;
    linkedinLabel: string;
    /** Optional GitHub profile URL (add back when ready) */
    githubUrl?: string;
    githubLabel?: string;
  };
}

export const PROFILE: ProfileConfig = {
  name: 'Abhimantra Singh Rathore',
  firstName: 'Abhimantra',
  title: 'Software Engineer | AI & Cloud Solutions Developer',
  positioning:
    'I build scalable software solutions, intelligent AI agents, cloud-native applications, enterprise automation systems, and modern digital experiences.',
  experienceYears: '4+ Years',
  heroHeadlineLine1: 'Engineering the future.',
  heroHeadlineLine2: 'One intelligent solution at a time.',
  heroSubheadline:
    "I'm Abhimantra, a Software Engineer building scalable applications, intelligent AI agents, and cloud-powered experiences.",
  defaultAvailability: 'Available for new opportunities',
  availabilityPresets: [
    'Available for new opportunities',
    'Open to full-time & consulting roles',
    'Focused on current engagements',
  ],
  contact: {
    email: 'abhimantrarathore1@gmail.com',
    linkedinUrl: 'https://linkedin.com/in/abhimantrasinghrathore',
    linkedinLabel: 'linkedin.com/in/abhimantrasinghrathore',
  },
};

export const TECH_CATEGORIES: { id: TechCategoryId; label: string }[] = [
  { id: 'all', label: 'All Capabilities' },
  { id: 'backend', label: 'Backend' },
  { id: 'cloud', label: 'Cloud & DevOps' },
  { id: 'ai', label: 'Artificial Intelligence' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'automation', label: 'Enterprise Automation' },
];

export const TECH_STACK: TechItem[] = [
  // Backend
  {
    id: 'csharp',
    name: 'C#',
    category: 'backend',
    categoryLabel: 'Backend',
    role: 'Core Systems Language',
    summary: 'Strongly typed application architecture, domain services, and maintainable backend logic.',
  },
  {
    id: 'dotnet-core',
    name: '.NET Core',
    category: 'backend',
    categoryLabel: 'Backend',
    role: 'Application Runtime',
    summary: 'Cross-platform enterprise services, legacy modernization, and high-throughput web backends.',
  },
  {
    id: 'aspnet-core',
    name: 'ASP.NET Core',
    category: 'backend',
    categoryLabel: 'Backend',
    role: 'Web & MVC Framework',
    summary: 'Modern MVC applications, middleware pipelines, authentication, and server-rendered enterprise apps.',
  },
  {
    id: 'rest-apis',
    name: 'REST APIs',
    category: 'backend',
    categoryLabel: 'Backend',
    role: 'Service Interface',
    summary: 'Clean contract design, structured payloads, resilient error handling, and secure endpoint integration.',
  },
  {
    id: 'microservices',
    name: 'Microservices',
    category: 'backend',
    categoryLabel: 'Backend',
    role: 'Distributed Architecture',
    summary: 'Decoupled service boundaries designed for independent scaling, resilience, and cloud deployment.',
  },
  {
    id: 'sql-server',
    name: 'SQL Server',
    category: 'backend',
    categoryLabel: 'Backend',
    role: 'Relational Data & Stored Procedures',
    summary: 'Schema design, query tuning, transactional integrity, and optimized stored procedures.',
  },

  // Cloud & DevOps
  {
    id: 'microsoft-azure',
    name: 'Microsoft Azure',
    category: 'cloud',
    categoryLabel: 'Cloud & DevOps',
    role: 'Cloud Platform',
    summary: 'Designing, deploying, and operating resilient enterprise workloads across Azure services.',
  },
  {
    id: 'azure-functions',
    name: 'Azure Functions',
    category: 'cloud',
    categoryLabel: 'Cloud & DevOps',
    role: 'Serverless Compute',
    summary: 'Event-driven background processing, APIs, and lightweight cloud integration services.',
  },
  {
    id: 'service-bus',
    name: 'Service Bus',
    category: 'cloud',
    categoryLabel: 'Cloud & DevOps',
    role: 'Enterprise Messaging',
    summary: 'Reliable asynchronous queuing and decoupled pub/sub communication between backend services.',
  },
  {
    id: 'event-hub',
    name: 'Event Hub',
    category: 'cloud',
    categoryLabel: 'Cloud & DevOps',
    role: 'Event Streaming',
    summary: 'High-volume event ingestion pipelines for distributed cloud telemetry and messaging.',
  },
  {
    id: 'key-vault',
    name: 'Key Vault',
    category: 'cloud',
    categoryLabel: 'Cloud & DevOps',
    role: 'Secrets Management',
    summary: 'Centralized protection of secrets, credentials, and configuration keys across environments.',
  },
  {
    id: 'azure-storage',
    name: 'Azure Storage',
    category: 'cloud',
    categoryLabel: 'Cloud & DevOps',
    role: 'Cloud Persistence',
    summary: 'Scalable storage integration for enterprise files, payloads, and application artifacts.',
  },
  {
    id: 'azure-devops',
    name: 'Azure DevOps',
    category: 'cloud',
    categoryLabel: 'Cloud & DevOps',
    role: 'Release Engineering',
    summary: 'Automated build and multi-environment release pipelines spanning Development, QA, and Production.',
  },
  {
    id: 'cicd',
    name: 'CI/CD',
    category: 'cloud',
    categoryLabel: 'Cloud & DevOps',
    role: 'Delivery Automation',
    summary: 'Repeatable deployment workflows, ARM template automation, and controlled environment promotions.',
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'cloud',
    categoryLabel: 'Cloud & DevOps',
    role: 'Source Control & Collaboration',
    summary: 'Git branching workflows, pull request reviews, and repository governance.',
  },

  // Artificial Intelligence
  {
    id: 'copilot-studio',
    name: 'Microsoft Copilot Studio',
    category: 'ai',
    categoryLabel: 'Artificial Intelligence',
    role: 'Enterprise AI Agents',
    summary: 'Building conversational and task-oriented enterprise agents connected to business workflows.',
  },
  {
    id: 'claude-projects',
    name: 'Claude Projects',
    category: 'ai',
    categoryLabel: 'Artificial Intelligence',
    role: 'Structured AI Workspaces',
    summary: 'Curated knowledge contexts and repeatable AI workflows for specialized business tasks.',
  },
  {
    id: 'ai-agents',
    name: 'AI Agents',
    category: 'ai',
    categoryLabel: 'Artificial Intelligence',
    role: 'Autonomous Execution',
    summary: 'Designing goal-driven agents that streamline operational processes and enterprise enablement.',
  },
  {
    id: 'agentic-workflows',
    name: 'Agentic Workflows',
    category: 'ai',
    categoryLabel: 'Artificial Intelligence',
    role: 'Multi-Step Orchestration',
    summary: 'Chaining reasoning, business rules, and enterprise connectors into dependable automated flows.',
  },
  {
    id: 'prompt-engineering',
    name: 'Prompt Engineering',
    category: 'ai',
    categoryLabel: 'Artificial Intelligence',
    role: 'Precision Guidance',
    summary: 'Crafting structured system instructions and evaluation patterns for consistent model behavior.',
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    category: 'ai',
    categoryLabel: 'Artificial Intelligence',
    role: 'AI-Assisted Engineering',
    summary: 'Accelerating code authoring, refactoring, and delivery quality across full-stack workflows.',
  },

  // Frontend
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    categoryLabel: 'Frontend',
    role: 'Component UI Architecture',
    summary: 'Building responsive, interactive web interfaces with modular component composition.',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'frontend',
    categoryLabel: 'Frontend',
    role: 'Interactive Web Logic',
    summary: 'Modern client-side interactivity, asynchronous API consumption, and state orchestration.',
  },
  {
    id: 'html',
    name: 'HTML',
    category: 'frontend',
    categoryLabel: 'Frontend',
    role: 'Semantic Structure',
    summary: 'Accessible, SEO-ready document hierarchy and standards-compliant markup.',
  },
  {
    id: 'css',
    name: 'CSS',
    category: 'frontend',
    categoryLabel: 'Frontend',
    role: 'Visual Systems & Layout',
    summary: 'Responsive layout engineering, fluid typography, and refined micro-interactions.',
  },

  // Enterprise Automation
  {
    id: 'powerapps',
    name: 'PowerApps',
    category: 'automation',
    categoryLabel: 'Enterprise Automation',
    role: 'Business Applications',
    summary: 'Custom internal business interfaces for structured request submission and approval tracking.',
  },
  {
    id: 'power-automate',
    name: 'Power Automate',
    category: 'automation',
    categoryLabel: 'Enterprise Automation',
    role: 'Process Orchestration',
    summary: 'Automated multi-stage notifications, routing logic, and enterprise connector orchestration.',
  },
  {
    id: 'sharepoint',
    name: 'SharePoint',
    category: 'automation',
    categoryLabel: 'Enterprise Automation',
    role: 'Enterprise Collaboration & Data',
    summary: 'Structured list data integration, document workflows, and role-based enterprise access.',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'enterprise-application-modernization',
    index: '01',
    title: 'Enterprise Application Modernization',
    category: 'Architecture Modernization',
    tagline: 'Legacy .NET Framework to modern .NET 6 Core MVC migration.',
    description:
      'Migrated three legacy .NET Framework enterprise applications to a modern .NET 6 Core MVC architecture, elevating runtime performance and scalability.',
    image: '/src/assets/images/project_modernization_1795380916999.jpg',
    imageAlt:
      'Architectural dark titanium and smoked glass modular layers illustrating legacy-to-modern .NET application migration',
    highlights: [
      'Migration of three legacy applications',
      'Modernized application architecture',
      'Improved performance by 35%',
      'Improved scalability by 30%',
    ],
    metrics: [
      { label: 'Performance Gain', value: '+35%' },
      { label: 'Scalability Gain', value: '+30%' },
      { label: 'Apps Migrated', value: '03' },
    ],
    technologies: ['C#', '.NET Core', 'ASP.NET Core', 'SQL Server', 'REST APIs', 'Microsoft Azure'],
    caseStudy: {
      problem:
        'Three mission-critical legacy applications built on older .NET Framework patterns faced mounting maintenance overhead, architectural rigidity, and bottlenecks under growing enterprise workloads.',
      solution:
        'Re-architected and migrated all three applications onto .NET 6 Core MVC, establishing clean separation of concerns, modern dependency injection, streamlined data access, and cloud-ready deployment conventions.',
      contribution: [
        'Led code migration and refactoring across three legacy .NET Framework applications into .NET 6 Core MVC.',
        'Modernized application structure, middleware configuration, and SQL Server integration patterns for maintainability.',
        'Validated runtime parity and delivered measurable improvements of 35% in performance and 30% in scalability.',
      ],
      architectureSummary:
        'Layered .NET 6 Core MVC architecture decoupling presentation controllers, domain services, and SQL Server stored procedure data access.',
      architectureFlow: [
        {
          stage: '01',
          label: 'Legacy Audit & Mapping',
          detail: 'Dependency assessment across three .NET Framework applications',
        },
        {
          stage: '02',
          label: '.NET 6 Core MVC Core',
          detail: 'Modular controllers, DI container, and modernized request pipeline',
        },
        {
          stage: '03',
          label: 'Data & API Layer',
          detail: 'Optimized SQL Server stored procedures and service integrations',
        },
        {
          stage: '04',
          label: 'Measured Outcome',
          detail: '35% faster execution performance and 30% greater scalability',
        },
      ],
    },
  },
  {
    id: 'ai-agents-enterprise-automation',
    index: '02',
    title: 'AI Agents & Enterprise Automation',
    category: 'Artificial Intelligence',
    tagline: 'Intelligent enterprise agents built with Microsoft Copilot Studio and Claude Projects.',
    description:
      'Designed and implemented AI agents and agentic workflows to automate repetitive business tasks, optimize operational processes, and support enterprise AI enablement.',
    image: '/src/assets/images/project_ai_agents_1795380916146.jpg',
    imageAlt:
      'Translucent obsidian prisms and titanium orbital rings refracting violet and cyan light representing intelligent AI agents',
    highlights: [
      'Intelligent business workflows',
      'AI-powered task automation',
      'Business process optimization',
      'Enterprise AI enablement',
    ],
    technologies: [
      'Microsoft Copilot Studio',
      'Claude Projects',
      'AI Agents',
      'Agentic Workflows',
      'Prompt Engineering',
      'Power Automate',
    ],
    caseStudy: {
      problem:
        'Enterprise teams spent significant recurring effort on manual information synthesis, repetitive task routing, and fragmented knowledge workflows across tools.',
      solution:
        'Built specialized AI agents using Microsoft Copilot Studio and structured Claude Projects workspaces, pairing disciplined prompt engineering with automated business workflow execution.',
      contribution: [
        'Designed agent instructions, knowledge boundaries, and multi-step agentic workflows for real business scenarios.',
        'Built conversational and task-executing enterprise agents in Microsoft Copilot Studio.',
        'Structured reusable Claude Projects environments to accelerate enterprise AI enablement and process optimization.',
      ],
      architectureSummary:
        'Context-grounded agentic orchestration bridging enterprise knowledge sources, structured prompt frameworks, and automated downstream actions.',
      architectureFlow: [
        {
          stage: '01',
          label: 'User & Business Intent',
          detail: 'Structured operational triggers and conversational queries',
        },
        {
          stage: '02',
          label: 'Agent Reasoning Layer',
          detail: 'Microsoft Copilot Studio & Claude Projects with prompt frameworks',
        },
        {
          stage: '03',
          label: 'Workflow Orchestration',
          detail: 'Agentic task routing and enterprise automation connectors',
        },
        {
          stage: '04',
          label: 'Enterprise Enablement',
          detail: 'Streamlined, repeatable business process execution',
        },
      ],
    },
  },
  {
    id: 'azure-data-factory-cicd',
    index: '03',
    title: 'Azure Data Factory CI/CD Automation',
    category: 'Cloud & DevOps',
    tagline: 'End-to-end release pipelines across Development, QA, and Production.',
    description:
      'Engineered automated Azure DevOps release pipelines for Azure Data Factory, combining ARM template deployments, Azure Key Vault secret management, and PowerShell trigger orchestration.',
    image: '/src/assets/images/project_adf_cicd_1795380916322.jpg',
    imageAlt:
      'Three precision-machined brushed aluminum stepped channels with cyan and violet optical lines illustrating multi-stage CI/CD pipelines',
    highlights: [
      'Azure DevOps release pipelines',
      'ARM template deployments',
      'Azure Key Vault integration',
      'PowerShell automation & trigger management',
    ],
    technologies: [
      'Azure DevOps',
      'CI/CD',
      'Microsoft Azure',
      'Key Vault',
      'GitHub',
    ],
    caseStudy: {
      problem:
        'Promoting Azure Data Factory artifacts manually across Development, QA, and Production risked configuration drift, broken active triggers, and inconsistent credential handling.',
      solution:
        'Designed repeatable Azure DevOps release pipelines utilizing parameterized ARM templates, Azure Key Vault secret retrieval, and automated PowerShell scripts to safely stop, deploy, and restart ADF triggers.',
      contribution: [
        'Architected multi-stage release pipelines spanning Development, QA, and Production environments in Azure DevOps.',
        'Configured ARM template parameterization and secure Azure Key Vault integration across deployment stages.',
        'Authored PowerShell automation scripts to manage pre-deployment and post-deployment ADF trigger states cleanly.',
      ],
      architectureSummary:
        'Multi-environment Azure DevOps promotion flow pairing Infrastructure-as-Code ARM templates with automated Key Vault security and trigger lifecycle management.',
      architectureFlow: [
        {
          stage: '01',
          label: 'Source & ARM Export',
          detail: 'Versioned Data Factory ARM templates published to pipeline artifacts',
        },
        {
          stage: '02',
          label: 'Pre-Deploy PowerShell',
          detail: 'Automated trigger suspension prior to environment update',
        },
        {
          stage: '03',
          label: 'Key Vault & ARM Deploy',
          detail: 'Parameterized promotion across Dev, QA, and Production stages',
        },
        {
          stage: '04',
          label: 'Trigger Reactivation',
          detail: 'Post-deployment PowerShell validation and trigger restoration',
        },
      ],
    },
  },
  {
    id: 'multi-level-approval-automation',
    index: '04',
    title: 'Multi-Level Approval Automation',
    category: 'Enterprise Automation',
    tagline: 'Structured business approval workflows built with PowerApps, Power Automate, and SharePoint.',
    description:
      'Built an integrated multi-level enterprise approval platform uniting a custom PowerApps user experience, SharePoint structured data storage, and Power Automate routing logic.',
    image: '/src/assets/images/project_approval_automation_1795380916393.jpg',
    imageAlt:
      'Four staggered frosted dark glass and basalt slabs connected by brushed silver pins depicting multi-level approval workflow stages',
    highlights: [
      'Multi-level approval workflows',
      'SharePoint integration',
      'Automated business processes',
      'Power Automate integration',
    ],
    technologies: ['PowerApps', 'Power Automate', 'SharePoint'],
    caseStudy: {
      problem:
        'Manual email-based approval chains lacked clear status visibility, consistent multi-tier routing, and centralized audit tracking for internal business requests.',
      solution:
        'Developed a tailored PowerApps interface backed by SharePoint lists and orchestrated by Power Automate flows to route requests automatically across sequential approval levels.',
      contribution: [
        'Designed and implemented the interactive PowerApps submission and review experience.',
        'Configured SharePoint list schemas and integrations for centralized request state tracking.',
        'Built multi-level Power Automate workflows handling dynamic routing, status transitions, and automated notifications.',
      ],
      architectureSummary:
        'Low-code enterprise automation architecture linking PowerApps UI forms, SharePoint data lists, and sequential Power Automate approval state machines.',
      architectureFlow: [
        {
          stage: '01',
          label: 'PowerApps Intake',
          detail: 'Structured business request capture with validation rules',
        },
        {
          stage: '02',
          label: 'SharePoint Persistence',
          detail: 'Centralized record tracking, attachments, and state history',
        },
        {
          stage: '03',
          label: 'Power Automate Routing',
          detail: 'Multi-level sequential approval logic and stakeholder alerts',
        },
        {
          stage: '04',
          label: 'Automated Completion',
          detail: 'Finalized status updates and clear enterprise visibility',
        },
      ],
    },
  },
  {
    id: 'cloud-native-backend-solutions',
    index: '05',
    title: 'Cloud-Native Backend Solutions',
    category: 'Cloud & Distributed Systems',
    tagline: 'Resilient microservices, REST APIs, and event-driven Azure integrations.',
    description:
      'Engineered secure cloud-native backend services combining .NET Core microservices, RESTful APIs, Azure Functions, and asynchronous messaging across Service Bus and Event Hub.',
    image: '/src/assets/images/project_cloud_backend_1795380916691.jpg',
    imageAlt:
      'Isometric matte carbon monoliths linked by delicate cyan and electric violet optical filaments representing cloud-native microservices',
    highlights: [
      'REST API development',
      'Microservices architecture',
      'Azure Functions serverless workloads',
      'Messaging integrations & secure architecture',
    ],
    technologies: [
      'C#',
      '.NET Core',
      'REST APIs',
      'Microservices',
      'Azure Functions',
      'Service Bus',
      'Event Hub',
      'Key Vault',
      'Azure Storage',
      'SQL Server',
    ],
    caseStudy: {
      problem:
        'Enterprise ecosystems require decoupled backend services capable of reliable cross-system integration, secure secret governance, and resilient asynchronous message handling.',
      solution:
        'Built modular .NET Core REST APIs and microservices complemented by serverless Azure Functions, asynchronous Service Bus and Event Hub pipelines, Azure Storage, and Key Vault-backed security.',
      contribution: [
        'Developed RESTful APIs and microservice components in C# and .NET Core.',
        'Implemented serverless integrations using Azure Functions connected to Azure Service Bus and Event Hub.',
        'Enforced secure configuration management with Azure Key Vault alongside SQL Server and Azure Storage persistence.',
      ],
      architectureSummary:
        'Event-driven cloud-native backend combining .NET Core APIs, serverless compute, asynchronous Azure messaging, and centralized secrets security.',
      architectureFlow: [
        {
          stage: '01',
          label: 'API Gateway & REST Layer',
          detail: '.NET Core REST APIs enforcing clean contracts and authorization',
        },
        {
          stage: '02',
          label: 'Microservices & Functions',
          detail: 'Domain microservices paired with event-triggered Azure Functions',
        },
        {
          stage: '03',
          label: 'Messaging Fabric',
          detail: 'Decoupled asynchronous pipelines via Service Bus & Event Hub',
        },
        {
          stage: '04',
          label: 'Secure Persistence',
          detail: 'SQL Server, Azure Storage, and Key Vault secrets governance',
        },
      ],
    },
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'tech-mahindra-allyis',
    company: 'Tech Mahindra Allyis',
    role: 'Software Engineer',
    period: 'January 2026 – August 2026',
    summary:
      'Focused on software engineering, AI enablement, automation, intelligent agents, and enterprise technology solutions.',
    focusAreas: [
      'Software engineering and enterprise technology solution delivery',
      'AI enablement initiatives and intelligent agent development',
      'Enterprise automation and agentic workflow design',
      'Integrating modern AI capabilities into practical business operations',
    ],
    technologies: [
      'Microsoft Copilot Studio',
      'Claude Projects',
      'AI Agents',
      'Agentic Workflows',
      'C#',
      '.NET Core',
      'Microsoft Azure',
    ],
  },
  {
    id: 'insight',
    company: 'Insight',
    role: 'Cloud Engineer / Software Engineer',
    period: 'July 2022 – November 2025',
    summary:
      'Worked on enterprise software development, cloud engineering, application modernization, integrations, and automation.',
    focusAreas: [
      'Enterprise software development across C#, .NET Core, ASP.NET Core MVC, and SQL Server',
      'Cloud engineering on Microsoft Azure including Functions, Service Bus, Event Hub, Key Vault, and Storage',
      'Application modernization from legacy .NET Framework architectures to .NET Core MVC',
      'CI/CD automation in Azure DevOps and enterprise workflow automation with PowerApps, Power Automate, and SharePoint',
    ],
    technologies: [
      'C#',
      '.NET Core',
      'ASP.NET Core',
      'Microsoft Azure',
      'Azure Functions',
      'Azure DevOps',
      'SQL Server',
      'PowerApps',
      'Power Automate',
      'SharePoint',
    ],
  },
];

export const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'software-engineering',
    index: '01',
    title: 'Software Engineering',
    summary:
      'Building clean, maintainable, and scalable enterprise software across C#, .NET Core, ASP.NET Core, SQL Server, and modern React frontends.',
    disciplines: ['C# & .NET Core', 'ASP.NET Core MVC', 'SQL Server', 'React'],
  },
  {
    id: 'ai-agent-development',
    index: '02',
    title: 'AI Agent Development',
    summary:
      'Designing practical AI agents and structured agentic workflows with Microsoft Copilot Studio and Claude Projects that elevate everyday enterprise productivity.',
    disciplines: ['Copilot Studio', 'Claude Projects', 'Agentic Workflows', 'Prompt Engineering'],
  },
  {
    id: 'cloud-architecture',
    index: '03',
    title: 'Cloud Architecture',
    summary:
      'Architecting secure, event-driven Microsoft Azure workloads leveraging Functions, Service Bus, Event Hub, Storage, Key Vault, and automated CI/CD.',
    disciplines: ['Microsoft Azure', 'Serverless & Messaging', 'Key Vault Security', 'Azure DevOps'],
  },
  {
    id: 'enterprise-automation',
    index: '04',
    title: 'Enterprise Automation',
    summary:
      'Transforming manual operational bottlenecks into structured, dependable digital processes through PowerApps, Power Automate, and SharePoint.',
    disciplines: ['PowerApps', 'Power Automate', 'SharePoint', 'Approval Workflows'],
  },
  {
    id: 'application-modernization',
    index: '05',
    title: 'Application Modernization',
    summary:
      'Transitioning legacy .NET Framework systems into modern .NET Core architectures with measurable gains in performance, scalability, and maintainability.',
    disciplines: ['Legacy Migration', '.NET Core MVC', 'Performance Tuning', 'Scalable Design'],
  },
  {
    id: 'system-integration',
    index: '06',
    title: 'System Integration',
    summary:
      'Connecting disparate enterprise platforms, APIs, cloud messaging fabrics, and collaborative tools into unified, dependable software ecosystems.',
    disciplines: ['REST APIs', 'Microservices', 'Service Bus & Event Hub', 'CI/CD Pipelines'],
  },
];
