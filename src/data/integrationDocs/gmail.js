const CONNECTION = { kind: 'credential' }
const operation = (value) => ({ kind: 'select', label: 'Operation', value, hint: 'What this step should do in Gmail.' })

export default {
  slug: 'gmail',
  schemaVersion: 2,
  publishedDate: '2026-08-04',
  lastUpdated: '2026-08-04',
  reviewDate: '2026-11-01',

  hero: {
    tagline: 'Send, reply to, draft, archive and label email automatically — from your real Gmail address, not a generic no-reply.',
    metaChips: [
      { icon: 'message', label: 'Email' },
      { icon: 'clock', label: '~8 min setup' },
      { icon: 'gauge', label: 'Intermediate' },
      { icon: 'key', label: 'Google sign-in (OAuth)' },
    ],
  },

  capabilitiesLead:
    'One node, five operations. Pick one in the Operation dropdown and the form changes to match — the tabs further down show every one.',
  capabilities: [
    { icon: 'message', title: 'Send an email', operation: 'send', body: 'A fresh email to any recipient, with variables from earlier steps.' },
    { icon: 'file', title: 'Reply to a thread', operation: 'reply', body: 'Replies in place so the conversation stays threaded.' },
    { icon: 'list', title: 'Create a draft reply', operation: 'draft', body: 'Writes the reply but leaves sending to a human.' },
    { icon: 'card', title: 'Archive', operation: 'archive', body: 'Clears a thread out of the inbox once it has been handled.' },
    { icon: 'key', title: 'Add or remove a label', operation: 'label', body: 'Tags threads so the team can filter what still needs attention.' },
  ],

  useCases: [
    { icon: 'bag', text: 'A new lead fills out a form and gets a personalised welcome email within seconds — from your real address, so replies come back to you.' },
    { icon: 'headset', text: 'A support flow drafts a reply to common questions and labels the thread "Auto-handled", so the team only opens what genuinely needs a human.' },
    { icon: 'calendar', text: "Every Friday afternoon a summary email goes out to the founder with the week's numbers — nobody has to remember to send it." },
    { icon: 'bell', text: 'A failed payment triggers a polite follow-up asking the customer to update their card, sent the moment the webhook fires.' },
  ],

  prerequisites: {
    youNeed: 'A Google or Google Workspace account',
    weNeed: 'A Google connection you approve by signing in',
    cost: 'Free',
  },

  credentialGuide: {
    anchorId: 'get-credential',
    heading: 'Connect your Google account',
    lead: 'Gmail uses Google sign-in, so there is no key to copy. You approve WorkflowMitra once on Google\'s own screen and it receives a secure, revocable connection — never your password.',
    steps: [
      {
        title: 'Open Credentials in WorkflowMitra',
        body: 'Everything starts inside WorkflowMitra rather than a third-party dashboard.',
        clickPath: ['Credentials', 'New credential', 'Gmail'],
      },
      {
        title: 'Sign in with Google',
        body: "Google's own sign-in page opens. Pick the account you want email sent from.",
        note: 'Sending from a Workspace (company) address? Your admin may need to allow the app first if your organisation restricts third-party access.',
      },
      {
        title: 'Review what you are approving, then Allow',
        body: 'Google lists exactly what WorkflowMitra is asking to do — send email on your behalf, and manage labels.',
        clickPath: ['Continue', 'Allow'],
        note: 'You can revoke this any time from your Google Account under "Third-party apps with account access" — no password change needed.',
      },
      {
        title: 'Name the connection and save',
        body: 'Give it a name you will recognise later, like "Support inbox", then save. The connection is now selectable in any Gmail step.',
        copyFields: [{ label: 'Connected account', value: 'you@yourbusiness.com' }],
      },
    ],
  },

  workflowGuide: {
    anchorId: 'configure-node',
    lead: 'Below is the real WorkflowMitra editor. Switch the Operation tabs to see the fields each of the five operations asks for.',
    nodeType: 'gmail',
    triggerLabel: 'New lead',
    triggerSummary: 'website form',
    triggerIcon: 'webhook-trigger',
    operations: [
      {
        id: 'send',
        label: 'Send an email',
        summary: 'send',
        caption: 'The everyday case. Subject and body both accept {{ variables }}, so each email is personalised without templates.',
        fields: [
          CONNECTION,
          operation('Send an email'),
          { label: 'To', required: true, placeholder: '{{ lead.email }}' },
          { label: 'Subject', required: true, placeholder: 'Thanks for getting in touch, {{ lead.name }}' },
          { label: 'Body', required: true, multiline: true, placeholder: 'Hi {{ lead.name }}, thanks for reaching out…' },
        ],
      },
      {
        id: 'reply',
        label: 'Reply to a thread',
        summary: 'reply',
        caption: 'Replies inside an existing conversation instead of starting a new one, so the customer sees one continuous thread.',
        fields: [
          CONNECTION,
          operation('Reply to a thread'),
          { label: 'Thread ID', required: true, placeholder: '{{ trigger.threadId }}', hint: 'Usually comes straight from a Gmail trigger earlier in the flow.' },
          { label: 'Body', required: true, multiline: true, placeholder: 'Thanks for the update — we have logged this.' },
        ],
      },
      {
        id: 'draft',
        label: 'Create a draft reply',
        summary: 'draft',
        caption: 'Writes the reply but sends nothing. Good for anything where a human should read it before the customer does.',
        fields: [
          CONNECTION,
          operation('Create a draft reply'),
          { label: 'Thread ID', required: true, placeholder: '{{ trigger.threadId }}' },
          { label: 'Body', required: true, multiline: true, placeholder: 'Suggested reply for review…' },
        ],
      },
      {
        id: 'archive',
        label: 'Archive',
        summary: 'archive',
        caption: 'Takes a thread out of the inbox without deleting it — the tidy-up step after something has been handled automatically.',
        fields: [
          CONNECTION,
          operation('Archive'),
          { label: 'Message ID', required: true, placeholder: '{{ trigger.messageId }}' },
        ],
      },
      {
        id: 'label',
        label: 'Add or remove a label',
        summary: 'label',
        caption: 'Tags threads so people can filter them. Use it to mark what the flow already dealt with.',
        fields: [
          CONNECTION,
          operation('Add or remove a label'),
          { label: 'Message ID', required: true, placeholder: '{{ trigger.messageId }}' },
          { label: 'Add labels', placeholder: 'Auto-handled' },
          { label: 'Remove labels', placeholder: 'Needs reply' },
        ],
      },
    ],
    steps: [
      { pin: 1, title: 'Add a Gmail step', body: 'right after the step that should trigger it.' },
      { pin: 2, title: 'Pick your connected account', body: 'the one you approved in the steps above.' },
      { pin: 3, title: 'Choose the operation', body: 'send, reply, draft, archive, or label.' },
      { pin: 4, title: 'Fill in the fields', body: 'and insert variables from earlier steps.' },
      { pin: 5, title: 'Save and test', body: 'the email goes out from your real address.' },
    ],
  },

  exampleFlow: {
    nodes: [
      { icon: 'trigger', color: '#0A0A0A', label: 'New lead' },
      { icon: 'tune', color: '#6B6B6B', label: 'Pick template' },
      { icon: 'gmail', color: '#EA4335', label: 'Gmail' },
    ],
    caption: 'The instant a lead form is submitted, WorkflowMitra picks the right welcome email and sends it from your real Gmail address.',
  },

  templates: { fallbackWhenEmpty: 'recommended-workflows' },

  mistakes: [
    { text: 'Reconnecting a different Google account than intended — check the connection name in the node before saving.' },
    { text: "Ignoring Gmail's own sending limits. Very high-volume sending belongs on a dedicated SMTP or marketing provider." },
    { text: 'Leaving the subject line blank — several inboxes treat blank-subject mail as spam.' },
  ],

  faqs: [
    { q: 'Does WorkflowMitra ever see my Gmail password?', a: "No — sign-in happens on Google's own site. WorkflowMitra only receives a secure, revocable connection." },
    { q: 'Can I revoke access later?', a: 'Yes, any time, from your Google Account settings under third-party access — no need to change your password.' },
    { q: 'Can I send from a Workspace (company) address?', a: 'Yes. Connect it the same way; your admin may need to allow the app first if your organisation restricts third-party access.' },
    { q: 'What happens if the connection expires?', a: 'WorkflowMitra flags the step as needing reconnection — repeat the sign-in step and it resumes.' },
  ],

  relatedOverride: undefined,

  seo: {
    metaTitle: 'Gmail Integration — Connect Gmail to WorkflowMitra',
    metaDescription: 'Send, reply, draft, archive and label email automatically from a WorkflowMitra flow. Step-by-step: connect Google and configure every operation.',
    ogImage: 'category',
  },
}
