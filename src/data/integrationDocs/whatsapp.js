/**
 * Every field label, placeholder and hint below is verbatim from the product's
 * WhatsAppForm.jsx, so the docs show the form the user actually meets.
 */

// Shown on every operation: account + recipient, before the operation-specific part.
const COMMON_FIELDS = [
  {
    kind: 'select',
    label: 'Provider',
    value: 'Meta Cloud API',
    hint: 'Which service actually sends the message. Switching clears the connection saved for the old one.',
  },
  { kind: 'credential' },
  { label: 'Access token', placeholder: 'EAAG…', hint: 'Your Meta Cloud API token — it starts with EAAG.' },
  {
    label: 'Phone number ID',
    placeholder: 'e.g. 123456789012345',
    hint: "The sender's phone-number ID from Meta (a long number), not the phone number itself.",
  },
  {
    label: 'To',
    required: true,
    placeholder: '{{ Mobile }} or 919876543210',
    hint: "The recipient's number with country code (e.g. 919876543210), or a {{ variable }} from an earlier step.",
  },
]

const operation = (value) => ({
  kind: 'select',
  label: 'Operation',
  value,
  hint: 'What kind of WhatsApp message this node sends.',
})

export default {
  slug: 'whatsapp',
  schemaVersion: 2,
  publishedDate: '2026-08-04',
  lastUpdated: '2026-08-04',
  reviewDate: '2026-11-01',

  hero: {
    tagline: 'Send seven different kinds of WhatsApp message — text, approved templates, media, interactive buttons, catalogues, locations and contact cards.',
    metaChips: [
      { icon: 'message', label: 'Messaging' },
      { icon: 'clock', label: '~10 min setup' },
      { icon: 'gauge', label: 'Intermediate' },
      { icon: 'key', label: 'Token + phone number ID' },
    ],
  },

  capabilitiesLead:
    'One node, seven operations — pick one in the Operation dropdown and the form changes to match. Every operation is listed here so you can see the full range before you build anything.',
  capabilities: [
    { icon: 'message', title: 'Text message', operation: 'text', body: 'Free text with variables. Only reaches people who messaged you in the last 24 hours.' },
    { icon: 'file', title: 'Template message', operation: 'template', body: 'A Meta-approved template — the only way to start a new conversation.' },
    { icon: 'image', title: 'Media', operation: 'media', body: 'Image, video, document, audio or sticker from a public URL.' },
    { icon: 'list', title: 'Interactive', operation: 'interactive', body: 'Up to 3 reply buttons, or a tap-to-open list menu of up to 10 rows.' },
    { icon: 'cart', title: 'Catalog / product', operation: 'catalog', body: 'A single product, a curated list, or your whole catalogue.' },
    { icon: 'pin', title: 'Location', operation: 'location', body: 'A map pin with latitude, longitude and an optional name and address.' },
    { icon: 'card', title: 'Contact card', operation: 'contacts', body: 'One or more shareable contact cards.' },
  ],

  useCases: [
    { icon: 'bag', text: 'A Shopify order confirmation goes out on WhatsApp within seconds of payment clearing, using a pre-approved template — no cluttered inbox, no missed email.' },
    { icon: 'calendar', text: 'A clinic sends an automatic appointment reminder 24 hours before, and again 2 hours before, cutting no-shows without a receptionist making calls.' },
    { icon: 'headset', text: 'A customer messages "where is my order" and gets an instant, accurate reply pulled from the live shipment status — no waiting for a human.' },
    { icon: 'bell', text: 'A COD order over a set amount triggers a WhatsApp confirmation asking the customer to reply YES before it ships, cutting return and fraud risk.' },
  ],

  prerequisites: {
    youNeed: 'A Meta Business account and a WhatsApp Business phone number',
    weNeed: 'An access token and a phone number ID',
    cost: "Free to connect — Meta charges per conversation once you're live",
  },

  credentialGuide: {
    anchorId: 'get-credential',
    heading: 'Get your Meta access token',
    lead: "WhatsApp runs through Meta's Cloud API. You need two values from the Meta for Developers console — an access token and a phone number ID. Both are on the same screen.",
    steps: [
      {
        title: 'Open Meta for Developers',
        body: 'Sign in with the Facebook account that manages your business, then create an app of type Business.',
        link: { href: 'https://developers.facebook.com/apps', label: 'developers.facebook.com/apps' },
        clickPath: ['Create App', 'Business', 'Next'],
      },
      {
        title: 'Add the WhatsApp product',
        body: "On your app's dashboard, find WhatsApp in the product list and set it up.",
        clickPath: ['Add products to your app', 'WhatsApp', 'Set up'],
        note: 'This creates a test business account and a free test phone number, so you can try everything before connecting a real number.',
      },
      {
        title: 'Open API Setup and copy both values',
        body: 'The API Setup screen shows a temporary access token at the top and your phone number ID just below the sender dropdown.',
        clickPath: ['WhatsApp', 'API Setup'],
        frame: {
          url: 'developers.facebook.com / apps / your-app / whatsapp-business',
          heading: 'API Setup',
          fields: [
            { label: 'Temporary access token', value: 'EAAG…redactedAccessTokenExample' },
            { label: 'Phone number ID', value: '109876543210987' },
          ],
        },
        note: 'The phone number ID is a long number — it is NOT the phone number itself. Copying the wrong one is the most common setup mistake.',
      },
      {
        title: 'Swap in a permanent token before you go live',
        body: 'The token on that screen expires in 24 hours. For production, create a System User and generate a permanent token.',
        link: { href: 'https://business.facebook.com/settings/system-users', label: 'business.facebook.com → System Users' },
        clickPath: ['Business settings', 'Users', 'System users', 'Generate new token'],
        note: 'Give it the whatsapp_business_messaging and whatsapp_business_management permissions, or sends fail with a permissions error.',
      },
    ],
  },

  workflowGuide: {
    anchorId: 'configure-node',
    lead: 'Below is the real WorkflowMitra editor. Switch the Operation tabs to see exactly which fields each of the seven operations asks for — this is the actual form, field for field.',
    nodeType: 'whatsapp',
    triggerLabel: 'New order',
    triggerSummary: 'shopify · order/paid',
    triggerIcon: 'shopify',
    operations: [
      {
        id: 'text',
        label: 'Text message',
        summary: 'text',
        caption: 'Free text is the simplest mode — but WhatsApp only delivers it inside the 24-hour window after the customer last messaged you. Outside that window it is rejected, and you need a template instead.',
        fields: [
          ...COMMON_FIELDS,
          operation('Text message'),
          {
            label: 'Message',
            multiline: true,
            placeholder: 'Hi {{ Name }}, your order {{ Order ID }} has shipped 📦',
            hint: 'The text to send. Personalise it with {{ variables }} and emoji 📦',
          },
        ],
      },
      {
        id: 'template',
        label: 'Template message',
        summary: 'template · order_update',
        caption: 'Templates are pre-approved by Meta and are the only way to start a conversation. Pick one and WorkflowMitra reads its real shape from Meta, then shows exactly the variables that template takes — no more, no less.',
        fields: [
          ...COMMON_FIELDS,
          operation('Template message'),
          {
            kind: 'select',
            label: 'Template',
            value: 'order_update · en_US · utility',
            hint: 'One of your WhatsApp-approved templates — the only way to message someone outside the 24-hour window.',
          },
          { label: 'Body variables (2)', placeholder: '{{ Name }}' },
          {
            label: 'Header image URL',
            placeholder: 'https://…/file or {{ Image URL }}',
            hint: 'A public link to the image to show at the top. This template always needs one — the preview in Meta is only an example.',
          },
        ],
      },
      {
        id: 'media',
        label: 'Media',
        summary: 'media · image',
        caption: 'Send a file WhatsApp fetches itself, so the URL must be reachable from the public internet. Caption is hidden for audio and stickers; File name appears only for documents.',
        fields: [
          ...COMMON_FIELDS,
          operation('Media (image / video / doc / audio)'),
          { kind: 'select', label: 'Media type', value: 'image', hint: "What you're sending — image, video, document, audio or sticker." },
          {
            label: 'Public URL',
            placeholder: '{{ invoice.pdfUrl }} or https://cdn.acme.in/invoice.pdf',
            hint: 'A link WhatsApp downloads itself, so it must be reachable from the internet. Accepts a {{ variable }} too.',
          },
          { label: 'Caption (optional)', placeholder: '' },
        ],
      },
      {
        id: 'interactive',
        label: 'Interactive',
        summary: 'interactive · buttons',
        caption: 'Reply buttons (up to 3) or a list menu (up to 10 rows). The customer taps instead of typing, so replies come back clean and predictable.',
        fields: [
          ...COMMON_FIELDS,
          operation('Interactive (buttons / list)'),
          { kind: 'select', label: 'Type', value: 'Reply buttons', hint: 'Reply buttons (up to 3) or a tap-to-open list menu.' },
          { label: 'Header (optional)', placeholder: '' },
          { label: 'Body', multiline: true, placeholder: 'Confirm your order for {{ amount }}?', hint: 'The message shown above the buttons or list.' },
          { label: 'Footer (optional)', placeholder: '' },
          { label: 'Reply buttons (max 3)', placeholder: 'Confirm' },
        ],
      },
      {
        id: 'catalog',
        label: 'Catalog / product',
        summary: 'catalog · product',
        caption: 'Requires a Meta product catalogue. Send one product, a curated list, or open your whole catalogue inside the chat.',
        fields: [
          ...COMMON_FIELDS,
          operation('Catalog / product'),
          { kind: 'select', label: 'Catalog message type', value: 'Single product', hint: 'Send a single product, a list of products, or your whole catalog.' },
          { label: 'Catalog ID', placeholder: 'e.g. 1234567890' },
          { label: 'Product retailer ID', placeholder: 'SKU-1' },
          { label: 'Body', multiline: true, placeholder: 'Browse our latest collection' },
          { label: 'Footer (optional)', placeholder: '' },
        ],
      },
      {
        id: 'location',
        label: 'Location',
        summary: 'location',
        caption: 'A map pin. Latitude and longitude are required; name and address are optional labels shown on the pin.',
        fields: [
          ...COMMON_FIELDS,
          operation('Location'),
          { label: 'Latitude', placeholder: '18.5204' },
          { label: 'Longitude', placeholder: '73.8567' },
          { label: 'Name (optional)', placeholder: 'Acme Traders, Pune' },
          { label: 'Address (optional)', placeholder: 'FC Road, Shivajinagar' },
        ],
      },
      {
        id: 'contacts',
        label: 'Contact card',
        summary: 'contacts',
        caption: 'Share one or more contact cards as structured JSON — useful for handing a customer to a specific rep.',
        fields: [
          ...COMMON_FIELDS,
          operation('Contact card'),
          {
            label: 'Contacts',
            multiline: true,
            placeholder: '[ { "name": { "formatted_name": "Priya Sharma" }, "phones": [{ "phone": "+919876543210" }] } ]',
          },
        ],
      },
    ],
    steps: [
      { pin: 1, title: 'Add a WhatsApp step', body: 'right after the step that should trigger it.' },
      { pin: 2, title: 'Pick your provider', body: 'Meta Cloud API is the direct route; ChatMitra also sends today.' },
      { pin: 3, title: 'Paste the token and phone number ID', body: 'from steps 3 and 4 above.' },
      { pin: 4, title: 'Choose the operation', body: 'the form rewrites itself to match — see the tabs above.' },
      { pin: 5, title: 'Save and test', body: 'WorkflowMitra previews resolved variables from your last run.' },
    ],
  },

  exampleFlow: {
    nodes: [
      { icon: 'shopify', color: '#7AB55C', label: 'Order paid' },
      { icon: 'tune', color: '#6B6B6B', label: 'Pick template' },
      { icon: 'whatsapp', color: '#25D366', label: 'WhatsApp' },
    ],
    caption: "The moment payment clears, WorkflowMitra picks the approved order_update template and WhatsApp delivers it with the customer's name and order number filled in.",
  },

  templates: { fallbackWhenEmpty: 'recommended-workflows' },

  mistakes: [
    { text: 'Trying to send free-form text as the first message — WhatsApp requires an approved template to start a new conversation.' },
    { text: 'Using the temporary access token in production — it expires in 24 hours; generate a permanent one under System Users before going live.' },
    { text: 'Mixing up the phone number ID with the actual phone number — they are different values, and both are needed.' },
  ],

  faqs: [
    { q: 'Do I need Meta Business verification before I start?', a: "No — you can test with a free Meta-provided number first. Verification is only required before you can message people who haven't messaged you first, at scale." },
    { q: "What's the difference between a template and a regular message?", a: 'A template is pre-approved by Meta and required to start a conversation; once the customer replies, you have a 24-hour window to send regular text freely.' },
    { q: 'Does WorkflowMitra support other WhatsApp providers besides Meta?', a: 'Yes — the same node has a Provider dropdown covering several Business Solution Providers. Meta Cloud API and ChatMitra send today; the others can be saved now and will send once shipped.' },
    { q: 'Is my access token safe to share?', a: 'No — treat it like a password. WorkflowMitra stores it encrypted and never shows the full value again after you save it.' },
  ],

  relatedOverride: undefined,

  seo: {
    metaTitle: 'WhatsApp Integration — Connect WhatsApp to WorkflowMitra',
    metaDescription: 'Send WhatsApp templates, media, interactive buttons and more from a WorkflowMitra flow. Step-by-step: get your Meta access token and configure every operation.',
    ogImage: 'category',
  },
}
