export const solutionsData = {
  marketing: {
    id: 'marketing',
    title: 'Marketing',
    icon: '📢',
    eyebrow: 'FLOWMITRA FOR MARKETING',
    headline: 'Stop manually moving data between your marketing tools',
    description: 'Your team already uses HubSpot, Google Sheets, Mailchimp, and a dozen other tools. FlowMitra connects them so form submissions automatically enrich in Clearbit, sync to your CRM, trigger email sequences, and update your reports—without touching a spreadsheet.',
    primaryCTA: 'Start Building',
    secondaryCTA: 'View Templates',
    color: '#64748b',
    
    integrations: ['HubSpot', 'Mailchimp', 'Google Analytics', 'Facebook Ads', 'LinkedIn', 'Airtable', 'Slack', 'Notion'],
    
    useCases: [
      {
        id: 'lead-capture',
        title: 'Lead Capture + Enrichment',
        description: 'Route inbound leads through scoring, enrichment, and CRM checks before they hit sales',
        workflow: [
          { icon: '📝', title: 'Form Submit', subtitle: 'Webflow, Typeform, or landing page' },
          { icon: '🔍', title: 'Enrich Company', subtitle: 'Pull firmographic data from Clearbit' },
          { icon: '⚖️', title: 'Score Lead', subtitle: 'Check against ICP criteria' },
          { icon: '📇', title: 'CRM Lookup', subtitle: 'Prevent duplicate records' },
          { icon: '✉️', title: 'Generate Email', subtitle: 'AI writes personalized intro' },
          { icon: '🔔', title: 'Notify Rep', subtitle: 'Slack message with context' }
        ]
      },
      {
        id: 'campaign-reporting',
        title: 'Weekly Campaign Report',
        description: 'Pull performance data from Google, Facebook, LinkedIn and compile it into one Slack post',
        workflow: [
          { icon: '⏰', title: 'Monday 9am', subtitle: 'Scheduled trigger' },
          { icon: '📊', title: 'Fetch Metrics', subtitle: 'API calls to ad platforms' },
          { icon: '🔄', title: 'Normalize Data', subtitle: 'Standardize field names' },
          { icon: '📈', title: 'Calculate Trends', subtitle: 'Week-over-week deltas' },
          { icon: '💬', title: 'Post to Slack', subtitle: 'Formatted table with charts' }
        ]
      },
      {
        id: 'content-workflows',
        title: 'Content Publishing Flow',
        description: 'Draft blog posts with AI, route for approval, then publish to CMS and social',
        workflow: [
          { icon: '💡', title: 'Notion Request', subtitle: 'Content brief created' },
          { icon: '🤖', title: 'AI Outline', subtitle: 'GPT generates structure' },
          { icon: '✅', title: 'Approval Check', subtitle: 'Manager reviews in Slack' },
          { icon: '📝', title: 'Final Draft', subtitle: 'Writer adds edits' },
          { icon: '🌐', title: 'Publish to CMS', subtitle: 'Webflow or WordPress API' },
          { icon: '🔗', title: 'Cross-post', subtitle: 'LinkedIn + Twitter scheduled' }
        ]
      }
    ],
    
    howItWorks: [
      {
        step: 1,
        title: 'Connect your marketing stack',
        description: 'Authenticate HubSpot, Mailchimp, Google Analytics, Clearbit, and any tool with an API or webhook.'
      },
      {
        step: 2,
        title: 'Build a workflow visually',
        description: 'Drag nodes onto a canvas. No code required, but you can drop into JavaScript for complex logic.'
      },
      {
        step: 3,
        title: 'Add conditional branches and AI',
        description: 'Use if/else logic to route leads. Call GPT to write emails, summarize data, or score fit.'
      },
      {
        step: 4,
        title: 'Test with real data',
        description: 'Run your workflow manually, inspect each step output, fix errors before going live.'
      },
      {
        step: 5,
        title: 'Turn it on and monitor',
        description: 'Set a trigger (form submit, schedule, webhook). Check logs when something breaks.'
      }
    ]
  },

  sales: {
    id: 'sales',
    title: 'Sales',
    icon: '💼',
    eyebrow: 'FLOWMITRA FOR SALES',
    headline: 'Your reps should not spend half their day on data entry',
    description: 'FlowMitra watches your inbox and calendar, then updates Salesforce, schedules follow-ups, researches accounts, and drafts personalized emails. Your team closes deals while the system handles admin work.',
    primaryCTA: 'Start Building',
    secondaryCTA: 'View Templates',
    color: '#64748b',
    
    integrations: ['Salesforce', 'HubSpot', 'LinkedIn', 'Apollo', 'Clearbit', 'Gmail', 'Slack', 'Notion'],
    
    useCases: [
      {
        id: 'lead-generation',
        title: 'Inbound Lead Routing',
        description: 'Score, enrich, and assign leads to the right rep within seconds of form submission',
        workflow: [
          { icon: '🎯', title: 'Demo Request', subtitle: 'Form submitted on site' },
          { icon: '🔍', title: 'Enrich Contact', subtitle: 'Apollo lookups company + role' },
          { icon: '🏢', title: 'Check Domain', subtitle: 'Verify company size, industry' },
          { icon: '⚖️', title: 'Score Fit', subtitle: 'Compare against ICP criteria' },
          { icon: '📇', title: 'Create in CRM', subtitle: 'Salesforce record with fields' },
          { icon: '👤', title: 'Assign Rep', subtitle: 'Round-robin by territory' },
          { icon: '🔔', title: 'Slack Alert', subtitle: 'Rep gets notified with context' }
        ]
      },
      {
        id: 'meeting-prep',
        title: 'Pre-Call Research Brief',
        description: 'Pull account history, recent emails, and company news before every call',
        workflow: [
          { icon: '📅', title: 'Calendar Sync', subtitle: 'Meeting in 1 hour' },
          { icon: '🔍', title: 'Lookup Account', subtitle: 'Fetch CRM activity log' },
          { icon: '📰', title: 'News Search', subtitle: 'Google recent announcements' },
          { icon: '📊', title: 'Engagement Data', subtitle: 'Email opens, site visits' },
          { icon: '📝', title: 'Generate Brief', subtitle: 'GPT summarizes context' },
          { icon: '💬', title: 'Send to Rep', subtitle: 'Slack DM 15 min before call' }
        ]
      },
      {
        id: 'pipeline-updates',
        title: 'Auto-Update Pipeline',
        description: 'Monitor Gmail replies and move deals through stages without manual logging',
        workflow: [
          { icon: '📧', title: 'Reply Received', subtitle: 'Gmail webhook fires' },
          { icon: '🤖', title: 'AI Intent Check', subtitle: 'Classify as interested/no/question' },
          { icon: '📇', title: 'Update Stage', subtitle: 'Move deal in Salesforce' },
          { icon: '⏰', title: 'Set Task', subtitle: 'Create follow-up reminder' },
          { icon: '💬', title: 'Log Activity', subtitle: 'Append to timeline' }
        ]
      }
    ],
    
    howItWorks: [
      {
        step: 1,
        title: 'Link your CRM and email',
        description: 'Authenticate Salesforce (or HubSpot), Gmail, and any enrichment tools you use.'
      },
      {
        step: 2,
        title: 'Map your sales process',
        description: 'Define stages, routing rules, and what triggers a workflow (form, reply, calendar event).'
      },
      {
        step: 3,
        title: 'Add scoring and personalization',
        description: 'Use conditional logic to score leads. Call GPT to write emails or summarize account intel.'
      },
      {
        step: 4,
        title: 'Test with a sample lead',
        description: 'Run the workflow manually, check each step output, tweak the logic.'
      },
      {
        step: 5,
        title: 'Go live and track errors',
        description: 'Turn on triggers. Monitor logs. Fix broken API calls when they happen.'
      }
    ]
  },

  operations: {
    id: 'operations',
    title: 'Operations',
    icon: '⚙️',
    eyebrow: 'FLOWMITRA FOR OPERATIONS',
    headline: 'Stop copying data between Google Sheets and your other tools',
    description: 'Your ops team uses Notion for requests, Airtable for inventory, Sheets for reporting, and Slack for approvals. FlowMitra keeps everything in sync—when a row changes in one system, the updates propagate automatically.',
    primaryCTA: 'Start Building',
    secondaryCTA: 'View Templates',
    color: '#64748b',
    
    integrations: ['Google Sheets', 'Airtable', 'Notion', 'Slack', 'Gmail', 'Zapier', 'Asana', 'Jira'],
    
    useCases: [
      {
        id: 'approval-workflows',
        title: 'Approval Request Flow',
        description: 'Route purchase orders through Slack approvals and log outcomes in Airtable',
        workflow: [
          { icon: '📝', title: 'Form Submit', subtitle: 'Employee files PO request' },
          { icon: '✅', title: 'Validate Fields', subtitle: 'Check required data present' },
          { icon: '💾', title: 'Create Record', subtitle: 'Add row to Airtable' },
          { icon: '📄', title: 'Generate PDF', subtitle: 'Render purchase order doc' },
          { icon: '👤', title: 'Slack Approval', subtitle: 'Manager gets yes/no buttons' },
          { icon: '🔔', title: 'Notify Requester', subtitle: 'Email outcome to employee' }
        ]
      },
      {
        id: 'data-sync',
        title: 'Cross-System Data Sync',
        description: 'When inventory updates in Sheets, push changes to Airtable and ping warehouse',
        workflow: [
          { icon: '📊', title: 'Row Updated', subtitle: 'Google Sheets webhook' },
          { icon: '🔄', title: 'Map Fields', subtitle: 'Transform column names' },
          { icon: '✅', title: 'Validate Quantity', subtitle: 'Ensure number is valid' },
          { icon: '💾', title: 'Update Airtable', subtitle: 'Find record and patch' },
          { icon: '📝', title: 'Log to Notion', subtitle: 'Append to audit log' },
          { icon: '💬', title: 'Slack Alert', subtitle: 'Notify warehouse if low stock' }
        ]
      },
      {
        id: 'scheduled-reports',
        title: 'Weekly Ops Report',
        description: 'Compile metrics from Asana, Jira, and Sheets into one Slack summary',
        workflow: [
          { icon: '⏰', title: 'Friday 5pm', subtitle: 'Scheduled cron trigger' },
          { icon: '📊', title: 'Query Systems', subtitle: 'API calls to Asana/Jira' },
          { icon: '🔄', title: 'Aggregate Metrics', subtitle: 'Combine task counts' },
          { icon: '📈', title: 'Build Table', subtitle: 'Format as markdown' },
          { icon: '💬', title: 'Post to Slack', subtitle: 'Send to #ops channel' }
        ]
      }
    ],
    
    howItWorks: [
      {
        step: 1,
        title: 'Authenticate your systems',
        description: 'Connect Sheets, Airtable, Notion, Slack—anything with an API or webhook.'
      },
      {
        step: 2,
        title: 'Define the trigger event',
        description: 'A row changes, a form submits, a button gets clicked, or a schedule fires.'
      },
      {
        step: 3,
        title: 'Add transformation logic',
        description: 'Map field names, validate data, run conditional branches, call APIs.'
      },
      {
        step: 4,
        title: 'Test the full flow',
        description: 'Run with real data, check outputs at each step, fix errors.'
      },
      {
        step: 5,
        title: 'Monitor and iterate',
        description: 'Turn it on. Check logs when something breaks. Add new steps as needs change.'
      }
    ]
  },

  engineering: {
    id: 'engineering',
    title: 'Engineering',
    icon: '💻',
    eyebrow: 'FLOWMITRA FOR ENGINEERING',
    headline: 'Build internal tools without maintaining Node scripts',
    description: 'Your team has a dozen Bash scripts for deployments, Slack bots cobbled together with Replit, and webhook handlers running on forgotten EC2 instances. Replace them with workflows you can actually debug.',
    primaryCTA: 'Start Building',
    secondaryCTA: 'View API Docs',
    color: '#64748b',
    
    integrations: ['GitHub', 'GitLab', 'Slack', 'PagerDuty', 'Datadog', 'Jira', 'Notion', 'AWS'],
    
    useCases: [
      {
        id: 'webhook-automation',
        title: 'Webhook Router',
        description: 'Receive webhooks from Stripe or GitHub, validate them, and trigger downstream actions',
        workflow: [
          { icon: '🔗', title: 'POST /webhook', subtitle: 'HTTP request arrives' },
          { icon: '✅', title: 'Verify Signature', subtitle: 'Check HMAC is valid' },
          { icon: '💾', title: 'Database Lookup', subtitle: 'Find customer record' },
          { icon: '⚙️', title: 'Run Business Logic', subtitle: 'Conditional branches' },
          { icon: '🌐', title: 'Call External API', subtitle: 'Update third-party service' },
          { icon: '💾', title: 'Write to DB', subtitle: 'Log event for audit' },
          { icon: '💬', title: 'Slack Message', subtitle: 'Notify #eng channel' }
        ]
      },
      {
        id: 'deployment-automation',
        title: 'Deploy Pipeline',
        description: 'Trigger deploys from Git, run health checks, post status to Slack',
        workflow: [
          { icon: '🔀', title: 'main Branch Merge', subtitle: 'GitHub webhook fires' },
          { icon: '🏗️', title: 'Run Jest Tests', subtitle: 'CI check passes' },
          { icon: '🚀', title: 'Deploy to Vercel', subtitle: 'API call triggers build' },
          { icon: '📊', title: 'Health Check', subtitle: 'Poll /api/health endpoint' },
          { icon: '💬', title: 'Post to Slack', subtitle: 'Success or failure message' }
        ]
      },
      {
        id: 'incident-response',
        title: 'Incident Alert Flow',
        description: 'Parse PagerDuty alerts, create Jira tickets, pull logs from Datadog',
        workflow: [
          { icon: '🚨', title: 'PagerDuty Alert', subtitle: 'High-priority incident' },
          { icon: '🤖', title: 'Parse Severity', subtitle: 'Critical vs warning' },
          { icon: '📝', title: 'Create Jira Ticket', subtitle: 'Auto-populate fields' },
          { icon: '💬', title: 'Page On-Call', subtitle: 'Slack DM to engineer' },
          { icon: '📊', title: 'Fetch Logs', subtitle: 'Datadog API last 15min' }
        ]
      }
    ],
    
    howItWorks: [
      {
        step: 1,
        title: 'Connect APIs and webhooks',
        description: 'Authenticate GitHub, Slack, PagerDuty, AWS—anything with an API or webhook endpoint.'
      },
      {
        step: 2,
        title: 'Build the workflow visually',
        description: 'Drag nodes for API calls, conditional logic, loops. Drop into JavaScript when you need it.'
      },
      {
        step: 3,
        title: 'Add error handling',
        description: 'Define retries, fallbacks, and what happens when an API call fails.'
      },
      {
        step: 4,
        title: 'Test with real payloads',
        description: 'Send a test webhook, inspect each step output, iterate until it works.'
      },
      {
        step: 5,
        title: 'Deploy and monitor logs',
        description: 'Turn it on. Check execution logs when something breaks. No need to SSH into a server.'
      }
    ]
  },

  support: {
    id: 'support',
    title: 'Support',
    icon: '💬',
    eyebrow: 'FLOWMITRA FOR SUPPORT',
    headline: 'Route tickets faster than your agents can read them',
    description: 'When a ticket arrives in Zendesk, FlowMitra checks the customer plan in Salesforce, scans past conversations, classifies urgency with GPT, and assigns the right agent—before anyone clicks refresh.',
    primaryCTA: 'Start Building',
    secondaryCTA: 'View Templates',
    color: '#64748b',
    
    integrations: ['Zendesk', 'Intercom', 'Slack', 'Gmail', 'Salesforce', 'HubSpot', 'Notion', 'Jira'],
    
    useCases: [
      {
        id: 'ticket-routing',
        title: 'Smart Ticket Router',
        description: 'Parse ticket content, check account tier, and assign to the agent with capacity',
        workflow: [
          { icon: '📧', title: 'Zendesk Ticket', subtitle: 'New email from customer' },
          { icon: '🤖', title: 'GPT Categorize', subtitle: 'Billing/tech/account question' },
          { icon: '⚠️', title: 'Urgency Check', subtitle: 'Scan for "urgent" or "down"' },
          { icon: '👤', title: 'CRM Lookup', subtitle: 'Find customer in Salesforce' },
          { icon: '🎯', title: 'Assign Agent', subtitle: 'Route by specialty + workload' },
          { icon: '🔔', title: 'Slack DM', subtitle: 'Notify agent with context' },
          { icon: '💾', title: 'Log to CRM', subtitle: 'Append interaction to timeline' }
        ]
      },
      {
        id: 'auto-response',
        title: 'Auto-Resolve Common Requests',
        description: 'Answer password resets and billing questions without human triage',
        workflow: [
          { icon: '💬', title: 'Customer Email', subtitle: '"I need to reset my password"' },
          { icon: '🤖', title: 'Intent Detection', subtitle: 'GPT classifies as password reset' },
          { icon: '📚', title: 'Knowledge Base', subtitle: 'Pull reset link instructions' },
          { icon: '✍️', title: 'GPT Response', subtitle: 'Write personalized reply' },
          { icon: '📧', title: 'Send via Zendesk', subtitle: 'Email goes out automatically' },
          { icon: '✅', title: 'Mark Solved', subtitle: 'Close ticket, tag as auto-resolved' }
        ]
      },
      {
        id: 'escalation',
        title: 'SLA Breach Alert',
        description: 'Monitor first-response time and escalate before you miss SLA',
        workflow: [
          { icon: '⏰', title: 'Cron Every 5min', subtitle: 'Check open tickets' },
          { icon: '⚠️', title: 'Find Overdue', subtitle: 'Approaching SLA deadline' },
          { icon: '🔼', title: 'Bump Priority', subtitle: 'Change to "urgent" in Zendesk' },
          { icon: '👤', title: 'Notify Supervisor', subtitle: 'Email manager with ticket link' },
          { icon: '💬', title: 'Slack #support', subtitle: 'Post alert in channel' }
        ]
      }
    ],
    
    howItWorks: [
      {
        step: 1,
        title: 'Connect Zendesk and your CRM',
        description: 'Authenticate Zendesk, Intercom, Salesforce, Slack—whatever your support stack uses.'
      },
      {
        step: 2,
        title: 'Define routing rules',
        description: 'If ticket mentions "billing" → route to finance team. If customer is enterprise → high priority.'
      },
      {
        step: 3,
        title: 'Add GPT for classification',
        description: 'Call OpenAI to parse intent, detect sentiment, generate replies.'
      },
      {
        step: 4,
        title: 'Test with real tickets',
        description: 'Run the workflow on a sample ticket, check the routing logic, tweak rules.'
      },
      {
        step: 5,
        title: 'Turn it on and monitor',
        description: 'New tickets flow through automatically. Check logs if something gets misrouted.'
      }
    ]
  },

  security: {
    id: 'security',
    title: 'Security',
    icon: '🔒',
    eyebrow: 'FLOWMITRA FOR SECURITY',
    headline: 'Automation with audit logs and access controls',
    description: 'FlowMitra stores credentials in encrypted vaults, logs every workflow execution, and lets you define who can edit or run which workflows. Built for teams with compliance requirements.',
    primaryCTA: 'Start Building',
    secondaryCTA: 'Security Docs',
    color: '#64748b',
    
    integrations: ['Okta', 'Auth0', 'AWS', 'Slack', 'GitHub', 'Datadog', 'PagerDuty', 'Jira'],
    
    useCases: [
      {
        id: 'access-management',
        title: 'User Onboarding Flow',
        description: 'New hire gets added to HR system, workflow provisions accounts across tools',
        workflow: [
          { icon: '👤', title: 'BambooHR Webhook', subtitle: 'New employee record created' },
          { icon: '✅', title: 'Check Approval', subtitle: 'Verify manager signed off' },
          { icon: '🔐', title: 'Create Okta Account', subtitle: 'Provision SSO identity' },
          { icon: '📧', title: 'Send Welcome Email', subtitle: 'Include onboarding docs' },
          { icon: '📝', title: 'Audit Log', subtitle: 'Record who approved + when' },
          { icon: '💬', title: 'Notify IT', subtitle: 'Slack confirmation to ops' }
        ]
      },
      {
        id: 'security-monitoring',
        title: 'Security Event Response',
        description: 'AWS CloudTrail sends alert, workflow creates incident and pages on-call',
        workflow: [
          { icon: '🚨', title: 'CloudTrail Alert', subtitle: 'Suspicious API call detected' },
          { icon: '🤖', title: 'Classify Severity', subtitle: 'High/medium/low risk' },
          { icon: '📝', title: 'Create Incident', subtitle: 'Jira ticket with context' },
          { icon: '💬', title: 'Page Security Team', subtitle: 'PagerDuty alert' },
          { icon: '📊', title: 'Pull Logs', subtitle: 'Datadog last 30min' },
          { icon: '📝', title: 'Audit Trail', subtitle: 'Log response actions' }
        ]
      },
      {
        id: 'compliance',
        title: 'Compliance Reporting',
        description: 'Generate access logs and workflow execution history for audits',
        workflow: [
          { icon: '⏰', title: 'Monthly Schedule', subtitle: 'First of every month' },
          { icon: '📊', title: 'Query Audit Logs', subtitle: 'Fetch execution history' },
          { icon: '🔄', title: 'Aggregate Data', subtitle: 'Group by user, workflow' },
          { icon: '📈', title: 'Generate Report', subtitle: 'CSV + PDF format' },
          { icon: '📧', title: 'Email Compliance', subtitle: 'Send to security team' },
          { icon: '💾', title: 'Store in S3', subtitle: 'Archive for retention' }
        ]
      }
    ],
    
    howItWorks: [
      {
        step: 1,
        title: 'Set up credential vault',
        description: 'Store API keys, OAuth tokens, and secrets in encrypted storage. No plaintext credentials in workflows.'
      },
      {
        step: 2,
        title: 'Define access controls',
        description: 'Set who can view, edit, or execute each workflow. Integrate with Okta or Auth0 for SSO.'
      },
      {
        step: 3,
        title: 'Build auditable workflows',
        description: 'Every execution gets logged with timestamp, user, inputs, outputs, and errors.'
      },
      {
        step: 4,
        title: 'Test with restricted access',
        description: 'Run workflows in staging with scoped permissions. Verify no credential leakage.'
      },
      {
        step: 5,
        title: 'Monitor and export logs',
        description: 'Check audit logs for compliance. Export to S3 or your SIEM for retention.'
      }
    ]
  }
}
