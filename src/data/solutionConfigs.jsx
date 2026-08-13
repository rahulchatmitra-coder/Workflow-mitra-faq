import {
  FaClipboardList, FaSearch, FaEnvelope, FaCrosshairs, FaUserCircle,
  FaExclamationTriangle, FaChartBar, FaCodeBranch, FaRocket,
  FaCommentDots, FaRobot, FaCheckCircle, FaBell
} from 'react-icons/fa';

export const solutionConfigs = {
  marketing: {
    department: 'marketing',
    badge: 'WorkflowMitra for Marketing',
    headline: 'Stop manually moving data between your marketing tools',
    subheadline: 'Form submissions automatically enrich in Clearbit, sync to your CRM, trigger email sequences, and update reports—connect HubSpot, Mailchimp, Google Sheets and a dozen other tools without touching a spreadsheet.',
    primaryCTA: 'Start Building',
    secondaryCTA: 'View Templates',
    
    integrations: [
      { name: 'HubSpot', domain: 'hubspot.com' },
      { name: 'Mailchimp', domain: 'mailchimp.com' },
      { name: 'Google Ads', domain: 'google.com' },
      { name: 'Meta', domain: 'meta.com' },
      { name: 'LinkedIn', domain: 'linkedin.com' },
      { name: 'Airtable', domain: 'airtable.com' },
      { name: 'Slack', domain: 'slack.com' },
      { name: 'Notion', domain: 'notion.so' },
      { name: 'Clearbit', domain: 'clearbit.com' },
      { name: 'Webflow', domain: 'webflow.com' },
      { name: 'Typeform', domain: 'typeform.com' }
    ],
    
    customers: ['TechCorp', 'StartupXYZ', 'GrowthCo', 'ScaleInc', 'DataHub', 'MarketPro'],
    
    personas: {
      title: 'demand gen managers, growth marketers, marketing ops, content leads, and campaign managers',
      tabs: ['Lead Capture', 'Campaign Reports', 'Content Publishing', 'Email Sequences', 'Event Tracking']
    },
    
    demoApps: [
      { name: 'HubSpot', checked: true },
      { name: 'Clearbit', checked: true },
      { name: 'Mailchimp', checked: false },
      { name: 'Airtable', checked: false },
      { name: 'Google Sheets', checked: false },
      { name: 'Slack', checked: false }
    ],
    
    skills: {
      description: 'Marketing teams use WorkflowMitra to score leads with custom ICP criteria, generate personalized outreach with GPT, and sync enriched contacts across their entire stack—HubSpot, Mailchimp, Sheets.',
      items: [
        {
          title: 'Score leads against ICP criteria',
          description: 'Check company size, industry, tech stack. Route qualified leads to sales, others to nurture sequences.',
          color: '#f9a8d4',
          showAvatar: true
        },
        {
          title: 'Generate personalized email copy',
          description: 'Pull account data from CRM, feed it to GPT, get back a custom intro email for each lead.',
          color: '#fbcfe8',
          showAvatar: false
        },
        {
          title: 'Sync data across tools in real time',
          description: 'Form submit in Webflow → enriched in Clearbit → added to HubSpot → posted to Slack.',
          color: '#fce7f3',
          showAvatar: true
        }
      ]
    },
    
    chat: {
      channel: 'marketing-ops',
      description: 'Tag your marketing bot in Slack, Teams, or email. Ask it to pull campaign metrics, update contact records, or trigger workflows—no need to log into five different tools.',
      messages: [
        {
          user: 'Sarah Chen',
          time: '9:42 AM',
          text: '@MarketingBot pull last week campaign performance for Google and Facebook ads',
          replies: 2
        },
        {
          user: 'Alex Kumar',
          time: '10:15 AM',
          text: '@MarketingBot enrich this lead: alex@techstartup.com',
          replies: 1
        },
        {
          user: 'Jamie Lee',
          time: '11:03 AM',
          text: '@MarketingBot sync this spreadsheet to HubSpot contacts',
          replies: 3
        }
      ]
    },
    
    background: {
      description: 'Run workflows on a schedule—every Monday morning, every hour, or when a webhook fires. Pull metrics from ad platforms, compile reports, sync data between systems.',
      tasks: [
        {
          name: 'Weekly campaign report',
          frequency: 'Every Monday 9am',
          progress: '75%'
        },
        {
          name: 'Lead enrichment batch',
          frequency: 'Every 2 hours',
          progress: '45%'
        },
        {
          name: 'Social media sync',
          frequency: 'Daily at 6pm',
          progress: '90%'
        }
      ]
    },
    
    multiAgent: {
      description: 'One agent pulls form submissions, another enriches contacts in Clearbit, a third scores fit and routes to sales or nurture—each agent hands off to the next automatically.',
      nodes: [
        { icon: <FaClipboardList />, name: 'Form Capture Agent', decision: 'Valid submission?' },
        { icon: <FaSearch />, name: 'Enrichment Agent', decision: 'Meets ICP criteria?' },
        { icon: <FaEnvelope />, name: 'Email Agent', decision: '' }
      ],
      team: ['Sarah Chen', 'Alex Kumar', 'Jamie Lee', 'Taylor Kim']
    }
  },

  sales: {
    department: 'sales',
    badge: 'WorkflowMitra for Sales',
    headline: 'Your reps should not spend half their day on data entry',
    subheadline: 'WorkflowMitra watches your inbox and calendar, updates Salesforce, schedules follow-ups, researches accounts, and drafts personalized emails—reps close deals while the system handles admin work.',
    primaryCTA: 'Start Building',
    secondaryCTA: 'Talk to Sales',
    
    integrations: [
      { name: 'Salesforce', domain: 'salesforce.com' },
      { name: 'HubSpot', domain: 'hubspot.com' },
      { name: 'LinkedIn', domain: 'linkedin.com' },
      { name: 'Apollo', domain: 'apollo.io' },
      { name: 'Clearbit', domain: 'clearbit.com' },
      { name: 'Gmail', domain: 'gmail.com' },
      { name: 'Slack', domain: 'slack.com' },
      { name: 'Notion', domain: 'notion.so' },
      { name: 'Calendly', domain: 'calendly.com' },
      { name: 'Gong', domain: 'gong.io' },
      { name: 'Outreach', domain: 'outreach.io' }
    ],
    
    customers: ['SalesFirst', 'RevenueGrowth', 'ClosePro', 'DealFlow', 'PipelineInc', 'QuotaMaster'],
    
    personas: {
      title: 'SDRs, AEs, BDRs, account executives, sales ops, and revenue leaders',
      tabs: ['Lead Routing', 'Meeting Prep', 'Pipeline Updates', 'Outbound Sequences', 'Deal Tracking']
    },
    
    demoApps: [
      { name: 'Salesforce', checked: true },
      { name: 'Apollo', checked: true },
      { name: 'Gmail', checked: false },
      { name: 'LinkedIn', checked: false },
      { name: 'Slack', checked: false },
      { name: 'Clearbit', checked: false }
    ],
    
    skills: {
      description: 'Sales teams use WorkflowMitra to score inbound leads with MEDDIC criteria, generate account research briefs before calls, and auto-log email replies to Salesforce—no manual updates.',
      items: [
        {
          title: 'Score leads with MEDDIC framework',
          description: 'Parse form submissions, check budget/authority/need. Route high-fit leads to AEs, others to SDRs.',
          color: '#f9a8d4',
          showAvatar: true
        },
        {
          title: 'Generate pre-call research briefs',
          description: 'Pull CRM history, recent emails, company news. GPT summarizes context 15 minutes before each call.',
          color: '#fbcfe8',
          showAvatar: false
        },
        {
          title: 'Auto-log activity to Salesforce',
          description: 'Email replies, meeting notes, LinkedIn messages—everything gets timestamped and logged automatically.',
          color: '#fce7f3',
          showAvatar: true
        }
      ]
    },
    
    chat: {
      channel: 'sales-ops',
      description: 'Tag your sales bot in Slack or email. Ask it to update deal stages, pull account histories, or research prospects—all without leaving your chat window.',
      messages: [
        {
          user: 'Marcus Rivera',
          time: '8:30 AM',
          text: '@SalesBot pull history for Acme Corp account',
          replies: 1
        },
        {
          user: 'Nina Patel',
          time: '9:45 AM',
          text: '@SalesBot update TechCo deal to "Negotiation" stage',
          replies: 0
        },
        {
          user: 'Jordan Mills',
          time: '10:20 AM',
          text: '@SalesBot research contacts at StartupXYZ, need decision makers',
          replies: 2
        }
      ]
    },
    
    background: {
      description: 'Monitor Gmail for replies, check calendars for upcoming meetings, scan Salesforce for deals approaching close dates—agents work 24/7 so your reps do not have to.',
      tasks: [
        {
          name: 'Email reply monitor',
          frequency: 'Every 15 minutes',
          progress: '60%'
        },
        {
          name: 'Deal stage updates',
          frequency: 'Every hour',
          progress: '85%'
        },
        {
          name: 'Meeting prep agent',
          frequency: '1 hour before calls',
          progress: '40%'
        }
      ]
    },
    
    multiAgent: {
      description: 'One agent monitors inbound leads, another enriches company data, a third scores fit and assigns to reps—each hands off seamlessly based on lead quality and territory.',
      nodes: [
        { icon: <FaCrosshairs />, name: 'Lead Capture Agent', decision: 'Enterprise or SMB?' },
        { icon: <FaSearch />, name: 'Enrichment Agent', decision: 'Assign to territory?' },
        { icon: <FaUserCircle />, name: 'Assignment Agent', decision: '' }
      ],
      team: ['Marcus Rivera', 'Nina Patel', 'Jordan Mills', 'Casey Wu']
    }
  },

  operations: {
    department: 'operations',
    badge: 'WorkflowMitra for Operations',
    headline: 'Stop copying data between Google Sheets and your other tools',
    subheadline: 'Notion for requests, Airtable for inventory, Sheets for reporting, Slack for approvals—WorkflowMitra keeps everything in sync so when a row changes in one system, updates propagate automatically.',
    primaryCTA: 'Start Building',
    secondaryCTA: 'View Templates',
    
    integrations: [
      { name: 'Google Sheets', domain: 'google.com' },
      { name: 'Airtable', domain: 'airtable.com' },
      { name: 'Notion', domain: 'notion.so' },
      { name: 'Slack', domain: 'slack.com' },
      { name: 'Gmail', domain: 'gmail.com' },
      { name: 'Asana', domain: 'asana.com' },
      { name: 'Jira', domain: 'atlassian.com' },
      { name: 'Zapier', domain: 'zapier.com' },
      { name: 'Monday', domain: 'monday.com' },
      { name: 'Trello', domain: 'trello.com' },
      { name: 'QuickBooks', domain: 'quickbooks.intuit.com' }
    ],
    
    customers: ['OpsCo', 'WorkflowHub', 'SyncPro', 'DataOps', 'TeamSync', 'ProcessFlow'],
    
    personas: {
      title: 'operations managers, ops coordinators, finance ops, people ops, and process owners',
      tabs: ['Approval Workflows', 'Data Sync', 'Scheduled Reports', 'Inventory Tracking', 'Request Routing']
    },
    
    demoApps: [
      { name: 'Google Sheets', checked: true },
      { name: 'Airtable', checked: true },
      { name: 'Notion', checked: false },
      { name: 'Slack', checked: false },
      { name: 'Asana', checked: false },
      { name: 'Gmail', checked: false }
    ],
    
    skills: {
      description: 'Ops teams use WorkflowMitra to route purchase order approvals through Slack, sync inventory levels between Sheets and Airtable, and compile weekly metrics from Asana and Jira.',
      items: [
        {
          title: 'Build multi-step approval flows',
          description: 'Employee files a PO in Notion → Manager approves in Slack → Finance gets notified → Status logged in Airtable.',
          color: '#f9a8d4',
          showAvatar: true
        },
        {
          title: 'Keep data in sync across tools',
          description: 'Inventory updated in Sheets → Airtable gets the change → Notion gets the change → Slack alert if stock is low.',
          color: '#fbcfe8',
          showAvatar: false
        },
        {
          title: 'Compile weekly ops reports',
          description: 'Pull task counts from Asana, ticket counts from Jira, format as a table, post to Slack every Friday.',
          color: '#fce7f3',
          showAvatar: true
        }
      ]
    },
    
    chat: {
      channel: 'ops-team',
      description: 'Tag your ops bot in Slack or Teams. Ask it to sync a spreadsheet, check approval status, or pull metrics—no need to open five different tabs.',
      messages: [
        {
          user: 'Robin Zhang',
          time: '9:00 AM',
          text: '@OpsBot sync this inventory sheet to Airtable',
          replies: 1
        },
        {
          user: 'Sam Torres',
          time: '10:30 AM',
          text: '@OpsBot check approval status for PO #1243',
          replies: 2
        },
        {
          user: 'Morgan Lee',
          time: '11:45 AM',
          text: '@OpsBot pull weekly task completion metrics',
          replies: 0
        }
      ]
    },
    
    background: {
      description: 'Run data syncs every hour, generate reports every Friday, check for low inventory twice a day—workflows run on your schedule, not when you remember to check.',
      tasks: [
        {
          name: 'Inventory sync (Sheets ↔ Airtable)',
          frequency: 'Every hour',
          progress: '55%'
        },
        {
          name: 'Weekly ops report',
          frequency: 'Every Friday 5pm',
          progress: '100%'
        },
        {
          name: 'Low stock alert',
          frequency: 'Twice daily',
          progress: '30%'
        }
      ]
    },
    
    multiAgent: {
      description: 'One agent monitors Notion for new requests, another validates data, a third routes to the right approver in Slack—each agent focuses on one step, hands off when done.',
      nodes: [
        { icon: <FaClipboardList />, name: 'Request Capture Agent', decision: 'Valid data?' },
        { icon: <FaCheckCircle />, name: 'Validation Agent', decision: 'Route to approver?' },
        { icon: <FaBell />, name: 'Notification Agent', decision: '' }
      ],
      team: ['Robin Zhang', 'Sam Torres', 'Morgan Lee', 'Avery Kim']
    }
  },

  engineering: {
    department: 'engineering',
    badge: 'WorkflowMitra for Engineering',
    headline: 'Build internal tools without maintaining Node scripts',
    subheadline: 'Replace Bash scripts for deployments, Slack bots cobbled together with Replit, and webhook handlers running on forgotten EC2 instances with workflows you can actually debug.',
    primaryCTA: 'Start Building',
    secondaryCTA: 'View API Docs',
    
    integrations: [
      { name: 'GitHub', domain: 'github.com' },
      { name: 'GitLab', domain: 'gitlab.com' },
      { name: 'Slack', domain: 'slack.com' },
      { name: 'PagerDuty', domain: 'pagerduty.com' },
      { name: 'Datadog', domain: 'datadoghq.com' },
      { name: 'Jira', domain: 'atlassian.com' },
      { name: 'Notion', domain: 'notion.so' },
      { name: 'AWS', domain: 'aws.amazon.com' },
      { name: 'Vercel', domain: 'vercel.com' },
      { name: 'Sentry', domain: 'sentry.io' },
      { name: 'CircleCI', domain: 'circleci.com' }
    ],
    
    customers: ['DevOpsHub', 'CodeShip', 'BuildFast', 'PipelinePro', 'AutoDeploy', 'EngineerKit'],
    
    personas: {
      title: 'backend engineers, DevOps, site reliability engineers, platform teams, and infrastructure leads',
      tabs: ['Webhook Routing', 'Deploy Pipelines', 'Incident Response', 'Database Jobs', 'Monitoring Alerts']
    },
    
    demoApps: [
      { name: 'GitHub', checked: true },
      { name: 'Slack', checked: true },
      { name: 'PagerDuty', checked: false },
      { name: 'Datadog', checked: false },
      { name: 'Jira', checked: false },
      { name: 'AWS', checked: false }
    ],
    
    skills: {
      description: 'Engineering teams use WorkflowMitra to route GitHub webhooks, trigger deploy pipelines after CI passes, and auto-create Jira tickets when PagerDuty alerts fire.',
      items: [
        {
          title: 'Validate and route webhooks',
          description: 'GitHub sends a webhook → verify HMAC signature → parse event type → call downstream APIs → log to database.',
          color: '#f9a8d4',
          showAvatar: true
        },
        {
          title: 'Build deploy pipelines visually',
          description: 'Merge to main → run tests in CI → deploy to Vercel → health check → Slack notification with status.',
          color: '#fbcfe8',
          showAvatar: false
        },
        {
          title: 'Auto-respond to PagerDuty alerts',
          description: 'Alert fires → parse severity → create Jira ticket → page on-call engineer → pull logs from Datadog.',
          color: '#fce7f3',
          showAvatar: true
        }
      ]
    },
    
    chat: {
      channel: 'eng-ops',
      description: 'Tag your eng bot in Slack. Ask it to trigger a deploy, check build status, or pull error logs—all without SSHing into servers.',
      messages: [
        {
          user: 'Dev Sharma',
          time: '2:15 PM',
          text: '@EngBot deploy staging branch to preview environment',
          replies: 1
        },
        {
          user: 'Taylor Nguyen',
          time: '3:00 PM',
          text: '@EngBot check build status for PR #492',
          replies: 0
        },
        {
          user: 'Chris Anderson',
          time: '4:30 PM',
          text: '@EngBot pull error logs from Datadog for last 15 minutes',
          replies: 2
        }
      ]
    },
    
    background: {
      description: 'Run database cleanup jobs at 3am, health-check production endpoints every 5 minutes, pull deploy metrics daily—automation that runs even when the team is offline.',
      tasks: [
        {
          name: 'Database cleanup job',
          frequency: 'Daily at 3am',
          progress: '20%'
        },
        {
          name: 'Health check monitor',
          frequency: 'Every 5 minutes',
          progress: '70%'
        },
        {
          name: 'Deploy metrics report',
          frequency: 'Daily at 9am',
          progress: '95%'
        }
      ]
    },
    
    multiAgent: {
      description: 'One agent monitors GitHub for merged PRs, another runs CI tests, a third triggers deploys and health checks—each agent specializes, hands off at the right stage.',
      nodes: [
        { icon: <FaCodeBranch />, name: 'Git Monitor Agent', decision: 'Tests passed?' },
        { icon: <FaRocket />, name: 'Deploy Agent', decision: 'Health check OK?' },
        { icon: <FaCommentDots />, name: 'Notification Agent', decision: '' }
      ],
      team: ['Dev Sharma', 'Taylor Nguyen', 'Chris Anderson', 'Riley Park']
    }
  },

  support: {
    department: 'support',
    badge: 'WorkflowMitra for Support',
    headline: 'Route tickets faster than your agents can read them',
    subheadline: 'When a ticket arrives in Zendesk, WorkflowMitra checks the customer plan in Salesforce, scans past conversations, classifies urgency with GPT, and assigns the right agent—before anyone clicks refresh.',
    primaryCTA: 'Start Building',
    secondaryCTA: 'View Templates',
    
    integrations: [
      { name: 'Zendesk', domain: 'zendesk.com' },
      { name: 'Intercom', domain: 'intercom.com' },
      { name: 'Slack', domain: 'slack.com' },
      { name: 'Gmail', domain: 'gmail.com' },
      { name: 'Salesforce', domain: 'salesforce.com' },
      { name: 'HubSpot', domain: 'hubspot.com' },
      { name: 'Notion', domain: 'notion.so' },
      { name: 'Jira', domain: 'atlassian.com' },
      { name: 'Front', domain: 'front.com' },
      { name: 'Help Scout', domain: 'helpscout.com' },
      { name: 'Freshdesk', domain: 'freshdesk.com' }
    ],
    
    customers: ['SupportHub', 'TicketFlow', 'CXPro', 'HelpDesk+', 'AgentOps', 'ResponseFirst'],
    
    personas: {
      title: 'support agents, customer success managers, support ops, team leads, and escalation specialists',
      tabs: ['Ticket Routing', 'Auto-Response', 'SLA Monitoring', 'Escalation', 'Sentiment Analysis']
    },
    
    demoApps: [
      { name: 'Zendesk', checked: true },
      { name: 'Salesforce', checked: true },
      { name: 'Slack', checked: false },
      { name: 'Intercom', checked: false },
      { name: 'Gmail', checked: false },
      { name: 'Notion', checked: false }
    ],
    
    skills: {
      description: 'Support teams use WorkflowMitra to classify ticket urgency with GPT, auto-respond to password resets and billing questions, and escalate before SLA deadlines are missed.',
      items: [
        {
          title: 'Classify tickets with GPT',
          description: 'Ticket arrives → GPT categorizes as billing/tech/account → checks for urgent keywords → routes to specialist.',
          color: '#f9a8d4',
          showAvatar: true
        },
        {
          title: 'Auto-resolve common requests',
          description: 'Password reset? Pull knowledge base article, GPT writes personalized reply, send via Zendesk, close ticket.',
          color: '#fbcfe8',
          showAvatar: false
        },
        {
          title: 'Monitor SLA and escalate',
          description: 'Check open tickets every 5 minutes. Approaching deadline? Bump priority, notify supervisor, post to Slack.',
          color: '#fce7f3',
          showAvatar: true
        }
      ]
    },
    
    chat: {
      channel: 'support-ops',
      description: 'Tag your support bot in Slack or Teams. Ask it to check ticket status, pull customer history, or escalate an issue—no need to switch between tabs.',
      messages: [
        {
          user: 'Emma Wilson',
          time: '10:00 AM',
          text: '@SupportBot pull history for ticket #8492',
          replies: 1
        },
        {
          user: 'Liam Chen',
          time: '11:20 AM',
          text: '@SupportBot escalate ticket #8501, customer is enterprise',
          replies: 0
        },
        {
          user: 'Ava Martinez',
          time: '12:45 PM',
          text: '@SupportBot check SLA status for all open tickets',
          replies: 2
        }
      ]
    },
    
    background: {
      description: 'Check for tickets approaching SLA deadlines every 5 minutes, scan for negative sentiment in replies, auto-respond to simple requests 24/7.',
      tasks: [
        {
          name: 'SLA breach monitor',
          frequency: 'Every 5 minutes',
          progress: '65%'
        },
        {
          name: 'Auto-response agent',
          frequency: 'Real-time',
          progress: '80%'
        },
        {
          name: 'Sentiment analysis',
          frequency: 'Every 10 minutes',
          progress: '50%'
        }
      ]
    },
    
    multiAgent: {
      description: 'One agent monitors Zendesk for new tickets, another classifies urgency and topic, a third assigns to agents based on specialty and workload—fully automated triage.',
      nodes: [
        { icon: <FaEnvelope />, name: 'Ticket Monitor Agent', decision: 'Urgent or standard?' },
        { icon: <FaRobot />, name: 'Classification Agent', decision: 'Route by specialty?' },
        { icon: <FaUserCircle />, name: 'Assignment Agent', decision: '' }
      ],
      team: ['Emma Wilson', 'Liam Chen', 'Ava Martinez', 'Noah Kim']
    }
  },

  security: {
    department: 'security',
    badge: 'WorkflowMitra for Security',
    headline: 'Automation with audit logs and access controls',
    subheadline: 'WorkflowMitra stores credentials in encrypted vaults, logs every workflow execution, and lets you define who can edit or run which workflows—built for teams with compliance requirements.',
    primaryCTA: 'Start Building',
    secondaryCTA: 'Security Docs',
    
    integrations: [
      { name: 'Okta', domain: 'okta.com' },
      { name: 'Auth0', domain: 'auth0.com' },
      { name: 'AWS', domain: 'aws.amazon.com' },
      { name: 'Slack', domain: 'slack.com' },
      { name: 'GitHub', domain: 'github.com' },
      { name: 'Datadog', domain: 'datadoghq.com' },
      { name: 'PagerDuty', domain: 'pagerduty.com' },
      { name: 'Jira', domain: 'atlassian.com' },
      { name: 'Splunk', domain: 'splunk.com' },
      { name: 'Duo', domain: 'duo.com' },
      { name: '1Password', domain: '1password.com' }
    ],
    
    customers: ['SecureOps', 'CompliancePro', 'AuditTrack', 'VaultSec', 'ShieldIT', 'ZeroTrust'],
    
    personas: {
      title: 'security engineers, compliance managers, IT admins, infosec analysts, and audit leads',
      tabs: ['Access Management', 'Security Monitoring', 'Compliance Reports', 'Incident Response', 'Audit Logging']
    },
    
    demoApps: [
      { name: 'Okta', checked: true },
      { name: 'AWS', checked: true },
      { name: 'Slack', checked: false },
      { name: 'PagerDuty', checked: false },
      { name: 'Jira', checked: false },
      { name: 'Datadog', checked: false }
    ],
    
    skills: {
      description: 'Security teams use WorkflowMitra to provision Okta accounts for new hires, respond to AWS CloudTrail alerts, and generate monthly compliance reports with full audit trails.',
      items: [
        {
          title: 'Automate user provisioning',
          description: 'New hire in BambooHR → create Okta account → assign app access → send welcome email → log all actions.',
          color: '#f9a8d4',
          showAvatar: true
        },
        {
          title: 'Respond to security alerts',
          description: 'CloudTrail detects suspicious API call → classify severity → create Jira incident → page security team → pull logs.',
          color: '#fbcfe8',
          showAvatar: false
        },
        {
          title: 'Generate compliance reports',
          description: 'Pull workflow execution logs for the last month, group by user and action, export as CSV and PDF.',
          color: '#fce7f3',
          showAvatar: true
        }
      ]
    },
    
    chat: {
      channel: 'security-ops',
      description: 'Tag your security bot in Slack. Ask it to provision access, check incident status, or pull audit logs—all actions are logged and require proper permissions.',
      messages: [
        {
          user: 'Priya Singh',
          time: '8:45 AM',
          text: '@SecurityBot provision Okta access for new hire: jane@company.com',
          replies: 1
        },
        {
          user: 'Kenji Tanaka',
          time: '10:00 AM',
          text: '@SecurityBot check status of security incident #SEC-482',
          replies: 0
        },
        {
          user: 'Maya Johnson',
          time: '11:30 AM',
          text: '@SecurityBot pull audit logs for the last 7 days',
          replies: 2
        }
      ]
    },
    
    background: {
      description: 'Monitor AWS CloudTrail for suspicious activity 24/7, run access reviews monthly, generate compliance reports on the first of every month—automation with full auditability.',
      tasks: [
        {
          name: 'CloudTrail alert monitor',
          frequency: 'Real-time',
          progress: '85%'
        },
        {
          name: 'Monthly access review',
          frequency: 'First of month',
          progress: '0%'
        },
        {
          name: 'Compliance report gen',
          frequency: 'Monthly',
          progress: '100%'
        }
      ]
    },
    
    multiAgent: {
      description: 'One agent monitors CloudTrail for alerts, another classifies severity and creates incidents, a third notifies the security team and pulls relevant logs—coordinated response.',
      nodes: [
        { icon: <FaExclamationTriangle />, name: 'Alert Monitor Agent', decision: 'Critical or warning?' },
        { icon: <FaClipboardList />, name: 'Incident Agent', decision: 'Page security team?' },
        { icon: <FaChartBar />, name: 'Logging Agent', decision: '' }
      ],
      team: ['Priya Singh', 'Kenji Tanaka', 'Maya Johnson', 'Alex Rivera']
    }
  }
};
