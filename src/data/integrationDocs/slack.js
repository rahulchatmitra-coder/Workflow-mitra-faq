export default {
  slug: 'slack',
  schemaVersion: 2,
  publishedDate: '2026-08-04',
  lastUpdated: '2026-08-04',
  reviewDate: '2026-11-01',

  hero: {
    tagline: 'Post a message to a Slack channel from any flow — the channel is decided by the webhook you create, not by a field in the node.',
    metaChips: [
      { icon: 'message', label: 'Messaging' },
      { icon: 'clock', label: '~5 min setup' },
      { icon: 'gauge', label: 'Beginner friendly' },
      { icon: 'key', label: 'Needs a webhook URL' },
    ],
  },

  capabilitiesLead:
    'The Slack node does one thing and does it simply: post a message. Which channel it lands in comes from the webhook you create in step 1 — there is no channel field to fill in.',
  capabilities: [
    {
      icon: 'message',
      title: 'Post a message',
      operation: 'text',
      body: 'Plain text with {{ variables }} pulled from earlier steps, including emoji.',
    },
  ],

  useCases: [
    { icon: 'bag', text: 'A D2C skincare brand posts to #cod-verification the instant a Cash-on-Delivery Shopify order over ₹1,500 comes in — so ops can call and confirm before it ships.' },
    { icon: 'headset', text: 'When a WhatsApp customer types "talk to a person" and the AI can\'t help, the flow pings #support-escalations so a human picks it up inside the 15-minute SLA.' },
    { icon: 'bell', text: 'If a broadcast campaign\'s failure rate crosses 10%, #campaign-ops gets an alert immediately — instead of finding out from an unhappy client the next morning.' },
    { icon: 'calendar', text: 'Every evening at 7 PM, one line lands in #daily-numbers: leads today, conversion rate, credits left.' },
  ],

  prerequisites: { youNeed: 'A Slack workspace you can install an app in', weNeed: 'One webhook URL', cost: 'Free' },

  credentialGuide: {
    anchorId: 'get-credential',
    heading: 'Create your Slack webhook',
    lead: 'A webhook is a private address Slack gives you. Anything your flow sends to it appears as a message in one specific channel. You do this once per channel.',
    steps: [
      {
        title: "Open Slack's app page",
        body: 'Sign in to the Slack workspace you want messages in, then create a new app.',
        link: { href: 'https://api.slack.com/apps', label: 'api.slack.com/apps' },
        clickPath: ['Create New App', 'From scratch'],
        note: 'Name it something recognisable like "WorkflowMitra Alerts" and pick your workspace.',
      },
      {
        title: 'Turn on Incoming Webhooks',
        body: "In your new app's left sidebar, open Incoming Webhooks and switch the toggle on.",
        clickPath: ['Features', 'Incoming Webhooks', 'Activate Incoming Webhooks'],
        frame: {
          url: 'api.slack.com/apps/A0F92KX/incoming-webhooks',
          heading: 'Incoming Webhooks',
          sub: 'Create Incoming Webhooks to post messages from external sources into Slack.',
          toggle: 'Activate Incoming Webhooks',
        },
      },
      {
        title: 'Add the webhook to a channel',
        body: 'Scroll to the bottom and add one. Slack asks which channel should receive the messages.',
        clickPath: ['Add New Webhook to Workspace', 'Pick a channel', 'Allow'],
        note: 'Posting to a private channel? Invite the app to that channel first, or Slack rejects the message.',
      },
      {
        title: 'Copy the webhook URL',
        body: 'Slack shows a long address. Copy it — this is the one value WorkflowMitra needs.',
        copyFields: [{ label: 'Webhook URL', value: 'https://hooks.slack.com/services/T0N9F/B0A5K/xxxxxxxxxxxxxxxx' }],
        note: 'Treat it like a password. Anyone with this URL can post to that channel.',
      },
    ],
  },

  workflowGuide: {
    anchorId: 'configure-node',
    lead: 'Below is the real WorkflowMitra editor. The Slack node has exactly three controls — there is nothing hidden.',
    nodeType: 'slack',
    triggerLabel: 'New order',
    triggerSummary: 'shopify · order/paid',
    triggerIcon: 'shopify',
    operations: [
      {
        id: 'text',
        label: 'Post a message',
        summary: 'post to #orders',
        caption: 'Slack has a single mode, so there is nothing to switch between — what you see is the whole node.',
        fields: [
          { kind: 'credential' },
          {
            label: 'Slack webhook URL',
            required: true,
            placeholder: 'https://hooks.slack.com/services/…',
            hint: 'Create an Incoming Webhook in Slack and paste its URL — or pick a saved credential above.',
            error: 'A webhook URL is required.',
          },
          {
            label: 'Message',
            required: true,
            multiline: true,
            placeholder: 'New order from {{ customer }} 🎉',
            hint: 'The text to post. Use {{ variables }} from earlier steps.',
          },
        ],
      },
    ],
    steps: [
      { pin: 1, title: 'Add a Slack step', body: 'right after the step that should trigger it.' },
      { pin: 2, title: 'Paste the webhook URL', body: 'from step 4 above — or pick a saved credential.' },
      { pin: 3, title: 'Write the message', body: 'and insert variables from earlier steps.' },
      { pin: 4, title: 'Save and test', body: 'the message lands in the channel you picked.' },
    ],
  },

  exampleFlow: {
    nodes: [
      { icon: 'shopify', color: '#7AB55C', label: 'New order' },
      { icon: 'tune', color: '#6B6B6B', label: 'Format message' },
      { icon: 'slack', color: '#4A154B', label: 'Slack' },
    ],
    caption: 'Shopify reports a paid order, WorkflowMitra formats a one-line summary, and Slack posts it to #orders seconds after checkout.',
  },

  templates: { fallbackWhenEmpty: 'recommended-workflows' },

  mistakes: [
    { text: 'Pasting the webhook URL with a stray space — it fails silently. Copy it fresh if a test doesn\'t arrive.' },
    { text: 'Picking a private channel without inviting the app to it first — Slack rejects the message.' },
    { text: 'Expecting a channel field in the node. There isn\'t one: to post somewhere else, create a second webhook.' },
  ],

  faqs: [
    { q: 'Do I need to be a Slack admin?', a: 'No — any member can create an app and add a webhook for a channel they\'re in, unless your workspace restricts app installs.' },
    { q: 'Can one webhook post to multiple channels?', a: 'No. One webhook is tied to one channel — add a second webhook and a second Slack step for a second channel.' },
    { q: 'Is the webhook URL safe to share?', a: 'Treat it like a password. WorkflowMitra stores it encrypted and never shows the full value again after you save it.' },
    { q: 'What if the test message doesn\'t show up?', a: 'Double-check the URL was copied in full, and make sure the app has access to the channel you picked in step 3.' },
  ],

  relatedOverride: undefined,

  seo: {
    metaTitle: 'Slack Integration — Connect Slack to WorkflowMitra',
    metaDescription: 'Send Slack messages automatically from a WorkflowMitra flow. Step-by-step: create your Incoming Webhook and configure the node — beginner friendly.',
    ogImage: 'category',
  },
}
