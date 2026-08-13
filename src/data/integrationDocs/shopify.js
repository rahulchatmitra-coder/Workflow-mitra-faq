const CONNECTION = { kind: 'credential' }
const operation = (value) => ({ kind: 'select', label: 'Operation', value, hint: 'What this step should do in your store.' })

export default {
  slug: 'shopify',
  schemaVersion: 2,
  publishedDate: '2026-08-04',
  lastUpdated: '2026-08-04',
  reviewDate: '2026-11-01',

  hero: {
    tagline: 'React to new orders and read or update products, orders and customers — the moment something happens in your store.',
    metaChips: [
      { icon: 'message', label: 'Commerce' },
      { icon: 'clock', label: '~5 min setup' },
      { icon: 'gauge', label: 'Beginner friendly' },
      { icon: 'key', label: 'Admin API access token' },
    ],
  },

  capabilitiesLead:
    'Shopify reaches WorkflowMitra through the App Request node, so any Admin API endpoint is available. These are the four most common shapes.',
  capabilities: [
    { icon: 'bag', title: 'React to a new order', operation: 'order/paid', body: 'A webhook fires the moment payment clears — the usual starting point.' },
    { icon: 'file', title: 'Read an order', operation: 'GET /orders', body: 'Pull full order details, line items and the shipping address.' },
    { icon: 'cart', title: 'Update a product', operation: 'PUT /products', body: 'Change price, stock or description from a flow.' },
    { icon: 'card', title: 'Manage customers', operation: 'GET /customers', body: 'Look up or update a customer record by email or phone.' },
  ],

  useCases: [
    { icon: 'bag', text: 'A Cash-on-Delivery order over ₹1,500 triggers a WhatsApp confirmation asking the customer to reply YES before it ships.' },
    { icon: 'bell', text: "A product's inventory drops below 5 units and ops gets pinged on Slack before it sells out entirely." },
    { icon: 'calendar', text: 'Every order appends a row to a Google Sheet, so the fulfilment report is always current without anyone updating it.' },
    { icon: 'headset', text: "A cancelled order tells the shipping partner's API to stand down, so no courier is booked for a sale that didn't happen." },
  ],

  prerequisites: {
    youNeed: 'Admin access to your Shopify store',
    weNeed: 'One Admin API access token',
    cost: "Free — Shopify doesn't charge for custom apps on your own store",
  },

  credentialGuide: {
    anchorId: 'get-credential',
    heading: 'Create a custom app token',
    lead: 'Shopify calls this a custom app. It is free, lives only on your store, and gives you one token that WorkflowMitra uses for every call.',
    steps: [
      {
        title: 'Open app development in your Shopify admin',
        body: 'You need a staff account with permission to manage apps — not necessarily the store owner.',
        link: { href: 'https://admin.shopify.com/settings/apps/development', label: 'admin.shopify.com → Develop apps' },
        clickPath: ['Settings', 'Apps and sales channels', 'Develop apps'],
        note: 'First time here, Shopify asks you to enable custom app development. Confirm once and it stays on.',
      },
      {
        title: 'Create the app and choose its scopes',
        body: 'Name it something like "WorkflowMitra", then configure the Admin API scopes — these decide what it may read and write.',
        clickPath: ['Create an app', 'Configure Admin API scopes'],
        note: 'Tick only what you need: read_orders for order flows, write_products to update products. Missing a scope fails silently later, so it is worth being deliberate here.',
      },
      {
        title: 'Install the app and copy the token',
        body: 'Installing activates the token. Shopify reveals it exactly once, right after install.',
        clickPath: ['Install app', 'Reveal token once'],
        frame: {
          url: 'admin.shopify.com / settings / apps / development',
          heading: 'Admin API access token',
          fields: [{ label: 'Access token', value: 'shpat_xxxxxxxxxxxxxxxxxxxx' }],
        },
        note: 'Miss it and there is no way to view it again — you uninstall and reinstall to get a new one.',
      },
      {
        title: 'Note your store URL',
        body: 'WorkflowMitra needs the myshopify domain alongside the token, not your custom domain.',
        copyFields: [{ label: 'Store URL', value: 'your-store.myshopify.com' }],
      },
    ],
  },

  workflowGuide: {
    anchorId: 'configure-node',
    lead: 'Below is the real WorkflowMitra editor. Shopify runs through the App Request node, so you pick the app and then the endpoint you want.',
    nodeType: 'app-request',
    triggerLabel: 'New order',
    triggerSummary: 'shopify · order/paid',
    triggerIcon: 'shopify',
    operations: [
      {
        id: 'read-order',
        label: 'Read an order',
        summary: 'GET /orders',
        caption: 'The everyday shape: the trigger tells you an order ID, and this pulls the full record so later steps can use it.',
        fields: [
          { kind: 'select', label: 'App', value: 'Shopify', hint: 'Which app this request goes to — the credential list filters to match.' },
          CONNECTION,
          { kind: 'select', label: 'Method', value: 'GET' },
          { label: 'Path', required: true, placeholder: '/admin/api/2024-10/orders/{{ order.id }}.json', hint: 'From the Shopify Admin API docs. Keep the version prefix.' },
        ],
      },
      {
        id: 'update-product',
        label: 'Update a product',
        summary: 'PUT /products',
        caption: 'Needs the write_products scope. If you skipped it when creating the app, this fails with a permissions error rather than a helpful message.',
        fields: [
          { kind: 'select', label: 'App', value: 'Shopify' },
          CONNECTION,
          { kind: 'select', label: 'Method', value: 'PUT' },
          { label: 'Path', required: true, placeholder: '/admin/api/2024-10/products/{{ product.id }}.json' },
          { label: 'Body', multiline: true, placeholder: '{ "product": { "status": "active" } }' },
        ],
      },
      {
        id: 'find-customer',
        label: 'Find a customer',
        summary: 'GET /customers',
        caption: 'Search by email or phone to answer "has this person ordered before" without anyone opening the admin.',
        fields: [
          { kind: 'select', label: 'App', value: 'Shopify' },
          CONNECTION,
          { kind: 'select', label: 'Method', value: 'GET' },
          { label: 'Path', required: true, placeholder: '/admin/api/2024-10/customers/search.json' },
          { label: 'Query', placeholder: 'query=email:{{ customer.email }}' },
        ],
      },
    ],
    steps: [
      { pin: 1, title: 'Start with a Shopify trigger', body: 'or add App Request as an action step mid-flow.' },
      { pin: 2, title: 'Pick Shopify as the app', body: 'and select the credential you saved above.' },
      { pin: 3, title: 'Set the method and path', body: 'straight from the Shopify Admin API docs.' },
      { pin: 4, title: 'Add a body for writes', body: 'GET needs none; PUT and POST do.' },
      { pin: 5, title: 'Save and test', body: 'use a development store while you are still building.' },
    ],
  },

  exampleFlow: {
    nodes: [
      { icon: 'shopify', color: '#7AB55C', label: 'New order' },
      { icon: 'tune', color: '#6B6B6B', label: 'Check COD + amount' },
      { icon: 'whatsapp', color: '#25D366', label: 'Confirm on WhatsApp' },
    ],
    caption: 'Every Cash-on-Delivery order over the threshold gets a WhatsApp confirmation request before it ships.',
  },

  templates: { fallbackWhenEmpty: 'recommended-workflows' },

  mistakes: [
    { text: 'Forgetting an Admin API scope. The call fails on permissions, and nothing in the flow explains why until you check the app.' },
    { text: 'Losing the access token after the one-time reveal — the only fix is uninstall and reinstall.' },
    { text: 'Using your custom domain instead of the myshopify.com URL, which never authenticates.' },
  ],

  faqs: [
    { q: 'Do I need to be the store owner?', a: 'No — a staff account with permission to manage apps is enough.' },
    { q: 'Can I connect more than one store?', a: 'Yes — create a custom app per store and save a separate credential for each.' },
    { q: "Does this cost anything on Shopify's side?", a: 'No. Custom apps for your own store are free; Shopify only charges for App Store apps.' },
    { q: 'Is the access token safe here?', a: "Yes — it's encrypted in the credentials vault and never shown again after you save it." },
  ],

  relatedOverride: undefined,

  seo: {
    metaTitle: 'Shopify Integration — Connect Shopify to WorkflowMitra',
    metaDescription: 'React to Shopify orders and manage products or customers from a WorkflowMitra flow. Step-by-step: create a custom app, copy the Admin API token, configure the node.',
    ogImage: 'category',
  },
}
