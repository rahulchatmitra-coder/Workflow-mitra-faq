const CONNECTION = { kind: 'credential' }
const authType = (value) => ({ kind: 'select', label: 'Auth', value, hint: 'Match this to whatever your API\'s documentation asks for.' })

export default {
  slug: 'http-request',
  schemaVersion: 2,
  publishedDate: '2026-08-04',
  lastUpdated: '2026-08-04',
  reviewDate: '2026-11-01',

  hero: {
    tagline: "Call any API from a flow — including services WorkflowMitra doesn't have a dedicated node for yet.",
    metaChips: [
      { icon: 'message', label: 'Developer' },
      { icon: 'clock', label: 'Varies by API' },
      { icon: 'gauge', label: 'Intermediate' },
      { icon: 'key', label: 'Whatever your API needs' },
    ],
  },

  capabilitiesLead:
    'This node is the escape hatch: five auth modes covering essentially every REST API. Pick the one your API documentation describes — the tabs below show each.',
  capabilities: [
    { icon: 'message', title: 'No auth', operation: 'none', body: 'Public endpoints that need no key at all.' },
    { icon: 'key', title: 'Bearer token', operation: 'bearer', body: 'The most common modern style — one long token in a header.' },
    { icon: 'card', title: 'Basic auth', operation: 'basic', body: 'A username and password pair, used by older APIs.' },
    { icon: 'file', title: 'API key (header)', operation: 'apiKey', body: 'A key sent in a custom header the API names.' },
    { icon: 'list', title: 'OAuth2', operation: 'oauth2', body: 'Client ID and secret, with WorkflowMitra refreshing the token for you.' },
  ],

  useCases: [
    { icon: 'bag', text: 'Your logistics partner has no WorkflowMitra node yet but publishes a REST API — HTTP Request books the shipment directly.' },
    { icon: 'headset', text: 'An internal tool exposes a key-protected endpoint, and the flow posts new support tickets straight into it.' },
    { icon: 'bell', text: 'A flow calls a public weather API with no login at all and warns the team if tomorrow looks bad for an outdoor event.' },
    { icon: 'calendar', text: "A nightly flow calls an accounting SaaS's OAuth2 API to pull yesterday's numbers into a report." },
  ],

  prerequisites: {
    youNeed: "The API documentation for whatever you're connecting to",
    weNeed: 'Whatever that API requires — nothing, a token, or a client ID and secret',
    cost: 'Depends on the third-party API',
  },

  credentialGuide: {
    anchorId: 'get-credential',
    heading: "Find what your API needs",
    lead: "There is no single dashboard here — every API is different. These steps are how you work out which of the five auth modes you need, and where that provider hides the value.",
    steps: [
      {
        title: "Open your API's documentation and find Authentication",
        body: 'Almost every provider has a page called Authentication, Getting Started, or API Keys. It will say which of the five modes it uses.',
        note: 'If the docs show a curl example with "Authorization: Bearer …", that is Bearer token. "-u user:pass" is Basic auth. A named header like "X-API-Key" is API key.',
      },
      {
        title: 'Generate the credential in that provider\'s dashboard',
        body: 'Most providers have a Developers, API, or Integrations area where you create a key. The exact path varies, but it is nearly always under account or workspace settings.',
        clickPath: ['Settings', 'Developers / API', 'Create key'],
      },
      {
        title: 'Copy the value — or the pair',
        body: 'Bearer and API key give you one string. Basic auth needs a username and password. OAuth2 gives a client ID and a client secret, plus a token URL.',
        copyFields: [{ label: 'Example bearer token', value: 'sk_live_xxxxxxxxxxxxxxxxxxxx' }],
        note: 'Many providers show a secret only once. Copy it before closing the dialog.',
      },
      {
        title: 'Note the exact endpoint URL and method',
        body: 'The docs will show a full URL and whether to use GET, POST, PUT, PATCH or DELETE. You need both in the node.',
        note: 'Watch for a version prefix like /v1/ — leaving it out is a very common 404.',
      },
    ],
  },

  workflowGuide: {
    anchorId: 'configure-node',
    lead: "Below is the real WorkflowMitra editor. Switch the Auth tabs to see what each mode asks for — the rest of the node is the same either way.",
    nodeType: 'http-request',
    triggerLabel: 'New order',
    triggerSummary: 'shopify · order/paid',
    triggerIcon: 'shopify',
    operations: [
      {
        id: 'none',
        label: 'No auth',
        summary: 'GET · public',
        caption: 'For genuinely public endpoints. If you get a 401 here, the API does need a key after all — check its docs again.',
        fields: [
          { kind: 'select', label: 'Method', value: 'GET' },
          { label: 'URL', required: true, placeholder: 'https://api.example.com/v1/forecast' },
          authType('None'),
        ],
      },
      {
        id: 'bearer',
        label: 'Bearer token',
        summary: 'POST · bearer',
        caption: 'The most common style. WorkflowMitra adds the Authorization header for you — paste only the token, without the word "Bearer".',
        fields: [
          CONNECTION,
          { kind: 'select', label: 'Method', value: 'POST' },
          { label: 'URL', required: true, placeholder: 'https://api.example.com/v1/shipments' },
          authType('Bearer token'),
          { label: 'Token', required: true, placeholder: 'sk_live_…', error: 'A token is required.' },
          { label: 'Body', multiline: true, placeholder: '{ "order_id": "{{ order.id }}" }' },
        ],
      },
      {
        id: 'basic',
        label: 'Basic auth',
        summary: 'POST · basic',
        caption: 'Older APIs use a username and password pair. WorkflowMitra encodes them correctly, so paste them as-is.',
        fields: [
          CONNECTION,
          { kind: 'select', label: 'Method', value: 'POST' },
          { label: 'URL', required: true, placeholder: 'https://api.example.com/v1/tickets' },
          authType('Basic auth'),
          { label: 'Username', required: true, placeholder: 'api_user', error: 'A username is required.' },
          { label: 'Password', required: true, placeholder: '••••••••' },
        ],
      },
      {
        id: 'apiKey',
        label: 'API key (header)',
        summary: 'GET · api key',
        caption: 'The API names its own header — copy that name exactly from the docs, capitalisation included.',
        fields: [
          CONNECTION,
          { kind: 'select', label: 'Method', value: 'GET' },
          { label: 'URL', required: true, placeholder: 'https://api.example.com/v1/customers' },
          authType('API key (header)'),
          { label: 'Header name', required: true, placeholder: 'X-API-Key' },
          { label: 'Key', required: true, placeholder: '••••••••' },
        ],
      },
      {
        id: 'oauth2',
        label: 'OAuth2',
        summary: 'POST · oauth2',
        caption: 'The most involved mode, and the one WorkflowMitra does the most for: give it the token URL, client ID and secret, and it fetches and refreshes tokens on its own.',
        fields: [
          CONNECTION,
          { kind: 'select', label: 'Method', value: 'POST' },
          { label: 'URL', required: true, placeholder: 'https://api.example.com/v1/invoices' },
          authType('OAuth2'),
          { label: 'Token URL', required: true, placeholder: 'https://api.example.com/oauth/token' },
          { label: 'Client ID', required: true, placeholder: 'abc123' },
          { label: 'Client secret', required: true, placeholder: '••••••••' },
        ],
      },
    ],
    steps: [
      { pin: 1, title: 'Add an HTTP Request step', body: 'right after the step that should trigger it.' },
      { pin: 2, title: 'Set the method and URL', body: 'straight from the API documentation.' },
      { pin: 3, title: 'Choose the auth type', body: 'matching what you found in step 1, then paste the credential.' },
      { pin: 4, title: 'Build the body', body: 'copy the shape from the docs and swap in {{ variables }}.' },
      { pin: 5, title: 'Save and test', body: 'a 2xx response means it worked; 401 means auth, 404 means the URL.' },
    ],
  },

  exampleFlow: {
    nodes: [
      { icon: 'shopify', color: '#7AB55C', label: 'New order' },
      { icon: 'tune', color: '#6B6B6B', label: 'Build request' },
      { icon: 'http-request', color: '#0A0A0A', label: 'HTTP Request' },
    ],
    caption: "WorkflowMitra builds the request body from the order and calls the courier's API directly — no dedicated node needed.",
  },

  templates: { fallbackWhenEmpty: 'recommended-workflows' },

  mistakes: [
    { text: 'Picking the wrong auth type — a bearer token pasted into a Basic field fails with an error that looks unrelated to auth.' },
    { text: 'Including the word "Bearer" in the token field. Paste only the token; WorkflowMitra adds the prefix.' },
    { text: 'Hardcoding a value that should be a variable, so every run sends the same test data.' },
  ],

  faqs: [
    { q: 'What if the API needs OAuth2 with a refresh token?', a: 'Use the OAuth2 auth mode — enter the token URL, client ID and secret, and WorkflowMitra handles refreshing.' },
    { q: 'Can I use this instead of a dedicated node like Slack?', a: 'Technically yes, but a dedicated node handles auth and field formatting for you. Use HTTP Request mainly for services without one.' },
    { q: 'How do I know what the body should look like?', a: "The API's own docs always show an example request — copy that shape and swap in variables from your flow." },
    { q: 'Is my API key safe here?', a: 'Yes — any credential you save is encrypted, whether it came from a dedicated node or these auth fields.' },
  ],

  relatedOverride: undefined,

  seo: {
    metaTitle: 'HTTP Request — Connect Any API to WorkflowMitra',
    metaDescription: 'Call any REST API from a WorkflowMitra flow. Step-by-step: find your API\'s auth type, then configure bearer, basic, API key or OAuth2 in the node.',
    ogImage: 'category',
  },
}
