// Full data model for all template flow previews
// templateId matches the existing card id in Templates.jsx
// pos: { x, y } = center of the node circle on the canvas

export const templateFlows = [
  /* ── Template 1: Facebook lead → CRM → team alert ── */
  {
    templateId: 1,
    canvas: { w: 960, h: 360 },
    elsePlaceholder: { x: 460, y: 298 },
    nodes: [
      { id: 'n1', order: 1, title: 'On webhook call', subtitle: 'facebook · lead-ads', app: 'facebook', kind: 'trigger', bg: '#1877F2', pos: { x: 88, y: 168 } },
      { id: 'n2', order: 2, title: 'IF', subtitle: '1 route · first match', app: 'webhook', kind: 'condition', bg: '#f97316', pos: { x: 272, y: 168 } },
      { id: 'n3', order: 3, title: 'App Request', subtitle: 'hubspot · POST /crm/v3/obj…', app: 'hubspot', kind: 'action', bg: '#FF7A59', pos: { x: 460, y: 168 } },
      { id: 'n4', order: 4, title: 'Assign to next rep', subtitle: 'round robin · team rota', app: 'users', kind: 'action', bg: '#111318', pos: { x: 648, y: 168 } },
      { id: 'n5', order: 5, title: 'Gmail', subtitle: 'send {{ email }}', app: 'gmail', kind: 'action', bg: '#EA4335', pos: { x: 848, y: 58 } },
      { id: 'n6', order: 6, title: 'Slack', subtitle: 'post to #leads', app: 'slack', kind: 'action', bg: '#4A154B', pos: { x: 848, y: 168 } },
      { id: 'n7', order: 7, title: 'Google Sheets', subtitle: 'append row · log entry', app: 'sheets', kind: 'action', bg: '#0F9D58', pos: { x: 848, y: 278 } },
    ],
    edges: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3', label: '1st · Has an email' },
      { from: 'n2', to: 'n_else', label: 'Else' },
      { from: 'n3', to: 'n4' },
      { from: 'n4', to: 'n5' },
      { from: 'n4', to: 'n6' },
      { from: 'n4', to: 'n7' },
    ],
    steps: [
      { nodeId: 'n1', body: "Meta calls this flow's webhook the instant someone submits the form — there's no polling schedule and no sync job to wait on, so the automation starts within seconds of the tap." },
      { nodeId: 'n2', body: "Checks the submission for an email address before anything else happens. Lead Ads forms can be set up phone-only, so this stops unusable leads before they reach the CRM — no email, and the flow just stops on the Else branch." },
      { nodeId: 'n3', body: "Creates the contact record in HubSpot using whatever the form captured: name, email, and any custom questions the ad asked." },
      { nodeId: 'n4', body: "Rotates the new contact to the next person in line, so leads don't pile up on one rep's desk while the rest of the team's queue sits empty." },
      { nodeId: 'n5', body: "Emails the assigned rep directly, with the lead's details pulled straight from the record HubSpot just created." },
      { nodeId: 'n6', body: "Posts the same alert to the team channel, so the lead doesn't disappear into one inbox — the rest of the team sees it land in real time too." },
      { nodeId: 'n7', body: "Logs a row for reporting: source, timestamp, assigned rep. Nobody has to update a tracker by hand at the end of the week." },
    ],
    why: [
      "A Lead Ad form lives inside Facebook and Instagram, so someone can fill it out in three taps without ever leaving the app — that convenience is exactly why it converts better than sending traffic to a landing page. But that same convenience creates a gap: the submission sits in Meta's Ads Manager, not in the CRM the sales team actually opens every morning.",
      "Someone has to remember to check Ads Manager, export it, and paste the contact into HubSpot by hand — and in most teams, that check happens once a day, if it happens at all. By the time the rep reaches out, the person who filled the form has already forgotten they did it.",
    ],
    benefit: [
      "Every submission becomes a HubSpot contact within seconds — no export, no copy-paste step for anyone to forget or put off. The rep on rotation gets pinged on Slack and by email before the person has even closed the Facebook app, so outreach starts while the ad is still the most recent thing on their screen.",
      "A row lands in the tracking sheet automatically too, so whoever reports on lead volume each week already has the numbers without asking around for them. The entire hand-off — from ad tap to rep notification — happens without anyone touching it.",
    ],
  },

  /* ── Template 2: Shopify order → invoice → WhatsApp + shipping ── */
  {
    templateId: 2,
    canvas: { w: 640, h: 360 },
    nodes: [
      { id: 'n1', order: 1, title: 'New Order', subtitle: 'shopify · order/paid', app: 'shopify', kind: 'trigger', bg: '#95BF47', pos: { x: 88, y: 168 } },
      { id: 'n2', order: 2, title: 'Create Invoice', subtitle: 'zoho-books · POST /invoices', app: 'zoho', kind: 'action', bg: '#E42528', pos: { x: 272, y: 168 } },
      { id: 'n3', order: 3, title: 'WhatsApp Confirm', subtitle: 'whatsapp · send template', app: 'whatsapp', kind: 'action', bg: '#25D366', pos: { x: 480, y: 68 } },
      { id: 'n4', order: 4, title: 'Book Shipment', subtitle: 'shiprocket · POST /shipments', app: 'truck', kind: 'action', bg: '#E54C4C', pos: { x: 480, y: 168 } },
      { id: 'n5', order: 5, title: 'Log Order', subtitle: 'sheets · append row', app: 'sheets', kind: 'action', bg: '#0F9D58', pos: { x: 480, y: 268 } },
    ],
    edges: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n2', to: 'n4' },
      { from: 'n2', to: 'n5' },
    ],
    steps: [
      { nodeId: 'n1', body: "Shopify fires an order/paid event the moment a customer's payment clears — the automation starts before the confirmation email has even left Shopify's own servers." },
      { nodeId: 'n2', body: "Raises a Zoho Books invoice for the order amount and line items, so accounting stays in sync automatically and nothing has to be entered by hand at month-end." },
      { nodeId: 'n3', body: "Sends the customer a WhatsApp order confirmation using a pre-approved template, hitting the channel they actually check instead of a cluttered inbox." },
      { nodeId: 'n4', body: "Books the shipment with Shiprocket — courier selection, label generation, and tracking ID — all queued without anyone opening the fulfillment dashboard." },
      { nodeId: 'n5', body: "Appends a row to the master order log: order ID, customer, amount, courier, tracking number. The weekly fulfilment report writes itself." },
    ],
    why: [
      "Shopify handles checkout and payment well, but it doesn't talk to your accounting system, your courier aggregator, or WhatsApp on its own. Every order becomes a multi-tab copy-paste job: open Zoho, create invoice, switch to Shiprocket, book courier, switch again, message the customer.",
      "At low order volume that's annoying. At higher volume it becomes a full-time task — and one missed step means an unraised invoice, an unbooked package, or a customer who got no confirmation and opens a support ticket to ask what happened.",
    ],
    benefit: [
      "From the moment a payment clears, the invoice exists in Zoho, the customer has a WhatsApp confirmation, and the package is queued with a courier — all in the time it takes them to close the checkout page.",
      "The fulfilment team doesn't need to monitor Shopify for new orders; the booking lands in their queue automatically. Customer enquiries about order status drop because people already have a tracking number on their phone.",
    ],
  },

  /* ── Template 3: Support ticket → AI triage → team + reply ── */
  {
    templateId: 3,
    canvas: { w: 920, h: 340 },
    nodes: [
      { id: 'n1', order: 1, title: 'New Ticket', subtitle: 'zendesk · ticket.created', app: 'zendesk', kind: 'trigger', bg: '#03363D', pos: { x: 80, y: 160 } },
      { id: 'n2', order: 2, title: 'AI Triage', subtitle: 'openai · categorise + urgency', app: 'sparkles', kind: 'action', bg: '#111318', pos: { x: 256, y: 160 } },
      { id: 'n3', order: 3, title: 'IF Urgent', subtitle: '1 route · urgency = high', app: 'webhook', kind: 'condition', bg: '#f97316', pos: { x: 432, y: 160 } },
      { id: 'n4', order: 4, title: 'Slack Alert', subtitle: 'slack · #support-urgent', app: 'slack', kind: 'action', bg: '#4A154B', pos: { x: 620, y: 80 } },
      { id: 'n5', order: 5, title: 'Assign Agent', subtitle: 'zendesk · PUT /tickets · rota', app: 'users', kind: 'action', bg: '#111318', pos: { x: 620, y: 240 } },
      { id: 'n6', order: 6, title: 'Acknowledge', subtitle: 'zendesk · add public comment', app: 'zendesk', kind: 'action', bg: '#03363D', pos: { x: 810, y: 240 } },
    ],
    edges: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n3', to: 'n4', label: 'Urgent' },
      { from: 'n3', to: 'n5', label: 'Normal' },
      { from: 'n5', to: 'n6' },
    ],
    steps: [
      { nodeId: 'n1', body: "Zendesk fires a webhook the moment a ticket is created — no polling interval, so the triage starts immediately regardless of whether anyone is looking at the helpdesk." },
      { nodeId: 'n2', body: "GPT-4o reads the ticket subject and body and returns a category (billing, technical, general) and an urgency score. This replaces the gut-feel triage that frontline agents do manually on every single ticket." },
      { nodeId: 'n3', body: "Routes high-urgency tickets down a faster path — the branch exists because urgent issues left in a normal queue erode customer trust faster than almost anything else." },
      { nodeId: 'n4', body: "Pings the #support-urgent Slack channel so a senior agent sees it immediately, before it even reaches the assignment queue." },
      { nodeId: 'n5', body: "Assigns the ticket to the next available agent using a round-robin, so workload is spread evenly and nothing sits unassigned waiting for a supervisor to notice." },
      { nodeId: 'n6', body: "Posts a public acknowledgement to the customer — 'We've received your ticket and are looking into it' — so they know something is happening and don't send a follow-up ticket thirty minutes later." },
    ],
    why: [
      "Every support team faces the same triage problem: tickets arrive in a flat queue, agents read them top to bottom, and urgency is assessed by whoever picks up the ticket next. A critical outage report filed at 4 pm can sit behind twenty routine billing questions.",
      "AI triage decouples categorisation from queue position. Every ticket is assessed the moment it arrives, urgent ones are surfaced before anyone has to scroll down to find them, and the customer gets an acknowledgement that stops the 'did you get my email?' follow-up.",
    ],
    benefit: [
      "Urgent tickets reach a human in seconds, not however long it takes the next agent to work down the queue to them. The team sees a live Slack alert instead of discovering the issue buried in a sorted list.",
      "Average first-response time drops because assignments happen automatically. Customers stop sending follow-up tickets asking for confirmation. Agents start their shift with a pre-triaged, pre-assigned queue instead of spending the first twenty minutes figuring out what needs attention.",
    ],
  },

  /* ── Template 4: AI email assistant → draft → approve → send ── */
  {
    templateId: 4,
    canvas: { w: 1040, h: 340 },
    elsePlaceholder: { x: 600, y: 270 },
    nodes: [
      { id: 'n1', order: 1, title: 'New Email', subtitle: 'gmail · INBOX watch', app: 'gmail', kind: 'trigger', bg: '#EA4335', pos: { x: 80, y: 160 } },
      { id: 'n2', order: 2, title: 'AI Classify', subtitle: 'openai · spam / reply / ignore', app: 'sparkles', kind: 'action', bg: '#111318', pos: { x: 256, y: 160 } },
      { id: 'n3', order: 3, title: 'IF needs reply', subtitle: '1 route · class = need-reply', app: 'webhook', kind: 'condition', bg: '#f97316', pos: { x: 432, y: 160 } },
      { id: 'n4', order: 4, title: 'Draft Reply', subtitle: 'openai · generate draft', app: 'sparkles', kind: 'action', bg: '#111318', pos: { x: 600, y: 80 } },
      { id: 'n5', order: 5, title: 'Human Approval', subtitle: 'flowmitra · wait for approve', app: 'user-orange', kind: 'action', bg: '#f97316', pos: { x: 784, y: 80 } },
      { id: 'n6', order: 6, title: 'Send Reply', subtitle: 'gmail · messages.send', app: 'gmail', kind: 'action', bg: '#EA4335', pos: { x: 968, y: 80 } },
    ],
    edges: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n3', to: 'n4', label: 'Needs reply' },
      { from: 'n3', to: 'n_else', label: 'Spam / archive' },
      { from: 'n4', to: 'n5' },
      { from: 'n5', to: 'n6' },
    ],
    steps: [
      { nodeId: 'n1', body: "Gmail's push notification fires as soon as a message lands in the inbox — no polling, no delay. The flow processes the email before you've opened the Gmail tab." },
      { nodeId: 'n2', body: "GPT-4o reads the subject and body and decides: is this spam, something that needs a reply, or something informational that needs no action? This is the sorting step that makes everything else possible." },
      { nodeId: 'n3', body: "Spam and informational mail is archived immediately. Only messages that actually need a response proceed — stopping the draft step from running on newsletters and receipts." },
      { nodeId: 'n4', body: "GPT-4o drafts a contextually relevant reply based on the email content and any instructions you've configured, like your name, role, and communication style." },
      { nodeId: 'n5', body: "The draft is held for human review before anything is sent. A human-in-the-loop approval step exists precisely because AI drafts need a final check — this isn't fully autonomous email." },
      { nodeId: 'n6', body: "Once approved, the reply is sent from your actual Gmail account. The original thread is preserved, and the reply looks indistinguishable from a manually written one." },
    ],
    why: [
      "Email triage is a constant cognitive drain — every message requires a decision: does this need a reply? How soon? What should it say? Those micro-decisions, multiplied across a hundred emails a day, consume attention that should go to actual work.",
      "The assistant doesn't replace human judgment — the approval step ensures it can't. What it does is handle the drafting so the human's job becomes reviewing a good draft rather than composing from scratch, which is much faster.",
    ],
    benefit: [
      "Spam is archived automatically. Emails that need replies already have a draft waiting in the approval queue by the time you open Gmail. The decision to send takes seconds instead of minutes.",
      "Response times improve because the slow part — composing — is done. Your inbox stops being a to-do list you dread and becomes a queue of drafts to approve. The volume of email you can handle per hour roughly doubles.",
    ],
  },

  /* ── Template 5: New blog post → AI rewrite → social ── */
  {
    templateId: 5,
    canvas: { w: 720, h: 340 },
    nodes: [
      { id: 'n1', order: 1, title: 'New Blog Post', subtitle: 'rss · feed.updated', app: 'rss', kind: 'trigger', bg: '#F26522', pos: { x: 80, y: 168 } },
      { id: 'n2', order: 2, title: 'AI Rewrite', subtitle: 'openai · adapt per network', app: 'sparkles', kind: 'action', bg: '#111318', pos: { x: 256, y: 168 } },
      { id: 'n3', order: 3, title: 'Human Approve', subtitle: 'flowmitra · wait for approve', app: 'user-orange', kind: 'action', bg: '#f97316', pos: { x: 432, y: 168 } },
      { id: 'n4', order: 4, title: 'LinkedIn Post', subtitle: 'linkedin · POST /ugcPosts', app: 'linkedin', kind: 'action', bg: '#0A66C2', pos: { x: 620, y: 88 } },
      { id: 'n5', order: 5, title: 'Facebook Post', subtitle: 'facebook · POST /feed', app: 'facebook', kind: 'action', bg: '#1877F2', pos: { x: 620, y: 248 } },
    ],
    edges: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n3', to: 'n4' },
      { from: 'n3', to: 'n5' },
    ],
    steps: [
      { nodeId: 'n1', body: "The RSS feed is polled on a short schedule. The moment a new post appears, the title, excerpt, and link are passed to the rewrite step — no manual trigger needed." },
      { nodeId: 'n2', body: "GPT-4o adapts the content for each network's format and tone: professional and structured for LinkedIn, conversational and punchy for Facebook. One blog post becomes two native-feeling social posts." },
      { nodeId: 'n3', body: "Before anything is published, a human reviews the AI-generated posts. The approval step exists because brand voice is specific, and social publishing is permanent — you want a human sign-off." },
      { nodeId: 'n4', body: "Posts the LinkedIn-formatted version as a UGC post from your company page, with the link to the blog and appropriate hashtags." },
      { nodeId: 'n5', body: "Posts the Facebook-formatted version to your page feed simultaneously, so both networks are updated in the same publish action." },
    ],
    why: [
      "Most teams publish blog content and then separately — sometimes days later, sometimes never — repurpose it for social. The repurposing step requires someone to sit down, read the post, rewrite it in a shorter format, and actually schedule the posts. That context-switch is exactly why it gets skipped.",
      "The AI rewrite step doesn't produce final copy; it produces a very good draft that requires far less effort to review and approve than writing from scratch. The human approval step means nothing goes out without a final check — which keeps the quality bar high while removing most of the effort.",
    ],
    benefit: [
      "Every published blog post automatically becomes social content. The gap between 'published' and 'promoted' collapses from days (or never) to hours, because the drafts are ready the moment the post goes live.",
      "Consistent social presence becomes a byproduct of blog publishing, not a separate task. The team's social feed stays active without anyone adding 'write social posts' to their weekly to-do list.",
    ],
  },

  /* ── Template 6: Website form → WhatsApp + CRM + sales owner ── */
  {
    templateId: 6,
    canvas: { w: 720, h: 340 },
    nodes: [
      { id: 'n1', order: 1, title: 'Form Submit', subtitle: 'flowmitra · webhook POST', app: 'zap', kind: 'trigger', bg: '#111318', pos: { x: 80, y: 168 } },
      { id: 'n2', order: 2, title: 'AI Categorise', subtitle: 'openai · lead type + score', app: 'sparkles', kind: 'action', bg: '#111318', pos: { x: 256, y: 168 } },
      { id: 'n3', order: 3, title: 'CRM Contact', subtitle: 'hubspot · POST /contacts', app: 'hubspot', kind: 'action', bg: '#FF7A59', pos: { x: 432, y: 168 } },
      { id: 'n4', order: 4, title: 'WhatsApp Reply', subtitle: 'whatsapp · send template', app: 'whatsapp', kind: 'action', bg: '#25D366', pos: { x: 620, y: 88 } },
      { id: 'n5', order: 5, title: 'Assign Owner', subtitle: 'flowmitra · round robin', app: 'users', kind: 'action', bg: '#111318', pos: { x: 620, y: 248 } },
    ],
    edges: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n3', to: 'n4' },
      { from: 'n3', to: 'n5' },
    ],
    steps: [
      { nodeId: 'n1', body: "Your website form posts to a FlowMitra webhook on submit — no third-party form service required. The payload carries name, email, phone, and whatever qualification fields the form includes." },
      { nodeId: 'n2', body: "GPT-4o reads the form data and produces a lead type (enterprise, SMB, personal) and an intent score. This prioritisation step means the sales team's queue is sorted by value before anyone looks at it." },
      { nodeId: 'n3', body: "Creates a HubSpot contact with all the form fields plus the AI-generated category and score attached as properties, so CRM data is enriched from the first touch." },
      { nodeId: 'n4', body: "Sends an instant WhatsApp message to the lead's phone number — a short, warm acknowledgement that sets expectations and keeps them engaged while the team prepares to reach out." },
      { nodeId: 'n5', body: "Assigns the contact to the next sales rep in the round-robin, and notifies them via the assigned-owner notification so they can follow up while the lead is warm." },
    ],
    why: [
      "Website contact forms are high-intent — someone who fills one out has already decided they want to talk. The gap between form submission and first contact is where most of that intent evaporates. A form that emails a shared inbox and waits for someone to notice is burning the most valuable part of every inbound lead.",
      "The WhatsApp message is the highest-impact step in the flow: it reaches the lead in under a minute on the channel they check most, sets expectations, and prevents them from filing another form or contacting a competitor while they wait.",
    ],
    benefit: [
      "Leads are in the CRM, qualified, and assigned before any human has opened their laptop. The first contact — a WhatsApp message — goes out in seconds, not hours.",
      "The sales team starts conversations with pre-qualified, pre-assigned leads rather than a flat inbox of raw form submissions. Pipeline data is accurate from day one because HubSpot is populated automatically, not by someone copy-pasting at the end of the day.",
    ],
  },
];
