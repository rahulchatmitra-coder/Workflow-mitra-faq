const CONNECTION = { kind: 'credential' }
const provider = (value) => ({ kind: 'select', label: 'Provider', value, hint: 'Which AI service answers. Switching clears the model picked for the old one.' })

export default {
  slug: 'ai-agent',
  schemaVersion: 2,
  publishedDate: '2026-08-04',
  lastUpdated: '2026-08-04',
  reviewDate: '2026-11-01',

  hero: {
    tagline: 'Let Claude, GPT, Gemini, Groq or a self-hosted model answer, decide, or draft text as a step in your flow.',
    metaChips: [
      { icon: 'message', label: 'AI' },
      { icon: 'clock', label: '~5 min setup' },
      { icon: 'gauge', label: 'Intermediate' },
      { icon: 'key', label: 'Provider API key' },
    ],
  },

  capabilitiesLead:
    'One node, five providers. They all take the same prompt and behave the same way in a flow — the tabs below show what each one asks for.',
  capabilities: [
    { icon: 'message', title: 'Anthropic (Claude)', operation: 'anthropic', body: 'API key plus an optional API version pin.' },
    { icon: 'file', title: 'OpenAI (GPT)', operation: 'openai', body: 'A single API key from platform.openai.com.' },
    { icon: 'list', title: 'Google Gemini', operation: 'gemini', body: 'An API key from Google AI Studio.' },
    { icon: 'card', title: 'Groq', operation: 'groq', body: 'An API key — usually the fastest of the hosted options.' },
    { icon: 'pin', title: 'Ollama (self-hosted)', operation: 'ollama', body: 'Your own server address; the key is optional.' },
  ],

  useCases: [
    { icon: 'headset', text: "A WhatsApp customer asks something the AI can answer from your FAQ — it drafts the reply, and only escalates when it's genuinely unsure." },
    { icon: 'bag', text: 'A new lead\'s message is classified as hot, warm or cold automatically, so sales works the best ones first.' },
    { icon: 'calendar', text: "Every evening the AI reads the day's support tickets and writes a one-paragraph summary for the founder." },
    { icon: 'bell', text: 'A long complaint is auto-summarised to two sentences before it lands in the escalation channel, so the on-call agent can act in seconds.' },
  ],

  prerequisites: {
    youNeed: 'An account with one AI provider',
    weNeed: 'One API key (or a server address, for Ollama)',
    cost: 'Pay-per-use, billed by the provider — not by WorkflowMitra',
  },

  credentialGuide: {
    anchorId: 'get-credential',
    heading: 'Get an API key from your provider',
    lead: 'All five providers work the same way: make an account, open their API keys page, create a key, copy it. Links to each are below — you only need one.',
    steps: [
      {
        title: 'Pick a provider and create an account',
        body: 'If you already pay for one of these, use that — there is no advantage to a new account.',
        link: { href: 'https://console.anthropic.com/settings/keys', label: 'Anthropic (Claude) → API keys' },
        note: 'Others: platform.openai.com/api-keys (OpenAI), aistudio.google.com/apikey (Gemini), console.groq.com/keys (Groq). Ollama runs on your own machine and needs no account.',
      },
      {
        title: 'Add billing if the provider asks',
        body: 'Most hosted providers need a payment method before keys will work, even on a free tier.',
        clickPath: ['Settings', 'Billing', 'Add payment method'],
        note: 'Set a monthly spend limit while you are there. It is the simplest protection against a runaway loop.',
      },
      {
        title: 'Create a key and copy it immediately',
        body: 'Open the API keys page and create a new secret key.',
        clickPath: ['API keys', 'Create key', 'Copy'],
        copyFields: [{ label: 'API key', value: 'sk-ant-api03-xxxxxxxxxxxxxxxxxxxx' }],
        note: 'Nearly every provider shows the full key exactly once. If you lose it, you create a new one — you cannot look it up later.',
      },
      {
        title: 'Save it in WorkflowMitra',
        body: 'Paste it into the node, or save it under Credentials so several flows can share the same key.',
        clickPath: ['Credentials', 'New credential', 'Pick your provider'],
      },
    ],
  },

  workflowGuide: {
    anchorId: 'configure-node',
    lead: 'Below is the real WorkflowMitra editor. Switch the Provider tabs to see what each one asks for — the prompt fields are identical across all five.',
    nodeType: 'ai-agent',
    triggerLabel: 'New message',
    triggerSummary: 'whatsapp · inbound',
    triggerIcon: 'whatsapp',
    operations: [
      {
        id: 'anthropic',
        label: 'Anthropic (Claude)',
        summary: 'claude',
        caption: 'Anthropic also accepts an optional API version pin, which keeps behaviour stable if they ship changes.',
        fields: [
          provider('Anthropic (Claude)'),
          CONNECTION,
          { label: 'API key', required: true, placeholder: 'sk-ant-…' },
          { kind: 'select', label: 'Model', value: 'claude-sonnet-4-5' },
          { label: 'System prompt', multiline: true, placeholder: 'You are a support assistant for a skincare brand. Only answer from the FAQ below.' },
          { label: 'Message', placeholder: '{{ customer.message }}', hint: 'The text the model should respond to — usually from an earlier step.' },
        ],
      },
      {
        id: 'openai',
        label: 'OpenAI (GPT)',
        summary: 'gpt',
        caption: 'The simplest of the hosted providers: one key, nothing else to configure.',
        fields: [
          provider('OpenAI'),
          CONNECTION,
          { label: 'API key', required: true, placeholder: 'sk-proj-…' },
          { kind: 'select', label: 'Model', value: 'gpt-4o-mini' },
          { label: 'System prompt', multiline: true, placeholder: 'You are a support assistant…' },
          { label: 'Message', placeholder: '{{ customer.message }}' },
        ],
      },
      {
        id: 'gemini',
        label: 'Google Gemini',
        summary: 'gemini',
        caption: 'Keys come from Google AI Studio rather than Cloud Console — a different screen from the one Sheets uses.',
        fields: [
          provider('Google Gemini'),
          CONNECTION,
          { label: 'API key', required: true, placeholder: 'AIza…' },
          { kind: 'select', label: 'Model', value: 'gemini-2.0-flash' },
          { label: 'System prompt', multiline: true, placeholder: 'You are a support assistant…' },
          { label: 'Message', placeholder: '{{ customer.message }}' },
        ],
      },
      {
        id: 'groq',
        label: 'Groq',
        summary: 'groq',
        caption: 'Usually the fastest to respond, which matters when a customer is waiting on the other end of a chat.',
        fields: [
          provider('Groq'),
          CONNECTION,
          { label: 'API key', required: true, placeholder: 'gsk_…' },
          { kind: 'select', label: 'Model', value: 'llama-3.3-70b' },
          { label: 'System prompt', multiline: true, placeholder: 'You are a support assistant…' },
          { label: 'Message', placeholder: '{{ customer.message }}' },
        ],
      },
      {
        id: 'ollama',
        label: 'Ollama (self-hosted)',
        summary: 'ollama',
        caption: 'Runs on your own hardware, so nothing leaves your network and there is no per-token cost. The API key is optional.',
        fields: [
          provider('Ollama'),
          CONNECTION,
          { label: 'Server address', required: true, placeholder: 'http://localhost:11434' },
          { label: 'API key', placeholder: 'Optional' },
          { kind: 'select', label: 'Model', value: 'llama3.1' },
          { label: 'System prompt', multiline: true, placeholder: 'You are a support assistant…' },
        ],
      },
    ],
    steps: [
      { pin: 1, title: 'Add an AI Agent step', body: 'right after the step that should trigger it.' },
      { pin: 2, title: 'Pick your provider', body: 'and paste the key from the steps above.' },
      { pin: 3, title: 'Write the system prompt', body: 'tell it its role and its rules — be specific.' },
      { pin: 4, title: 'Pass in the message', body: 'usually a {{ variable }} from an earlier step.' },
      { pin: 5, title: 'Save and test', body: 'check the answer before you point real customers at it.' },
    ],
  },

  exampleFlow: {
    nodes: [
      { icon: 'trigger', color: '#0A0A0A', label: 'New message' },
      { icon: 'ai-agent', color: '#ff9e43', label: 'AI Agent' },
      { icon: 'whatsapp', color: '#25D366', label: 'Reply' },
    ],
    caption: 'Every incoming message goes to the AI Agent first — it drafts a reply, and the flow sends it straight back on WhatsApp.',
  },

  templates: { fallbackWhenEmpty: 'recommended-workflows' },

  mistakes: [
    { text: 'Writing a vague system prompt. "Be helpful" gives inconsistent answers; specific rules and examples give reliable ones.' },
    { text: "Not setting a fallback message, so a customer gets silence when the AI genuinely can't answer." },
    { text: 'Forgetting the provider bills you directly — check their usage dashboard, not just WorkflowMitra.' },
  ],

  faqs: [
    { q: 'Which provider should I pick?', a: 'All five behave the same in a flow — pick whichever you already have an account and billing set up with.' },
    { q: 'Can I switch providers later without rebuilding?', a: 'Yes — the node keeps your prompt and flow logic; you only change the connection and model.' },
    { q: 'Does the AI remember earlier messages?', a: 'Only if you attach an AI Memory block to the same step. Otherwise each run is independent.' },
    { q: 'Is my API key safe here?', a: "Yes — it's encrypted in the credentials vault and never shown again after you save it." },
  ],

  relatedOverride: undefined,

  seo: {
    metaTitle: 'AI Agent — Add Claude, GPT or Gemini to WorkflowMitra',
    metaDescription: 'Let an AI model answer, decide or draft text inside a WorkflowMitra flow. Step-by-step: get a provider API key and configure the node for any of five providers.',
    ogImage: 'category',
  },
}
