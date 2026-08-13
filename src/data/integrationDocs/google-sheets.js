const CONNECTION = { kind: 'credential' }
const SHEET_FIELDS = [
  { label: 'Spreadsheet', required: true, value: 'Order Log 2026', kind: 'select', hint: 'Pick a sheet the service account can see, or paste its ID from the URL.' },
  { label: 'Worksheet', required: true, value: 'Orders', kind: 'select' },
]
const operation = (value) => ({ kind: 'select', label: 'Operation', value, hint: 'What this step should do in the sheet.' })

export default {
  slug: 'google-sheets',
  schemaVersion: 2,
  publishedDate: '2026-08-04',
  lastUpdated: '2026-08-04',
  reviewDate: '2026-11-01',

  hero: {
    tagline: 'Read, add, update and clear spreadsheet rows automatically — so the tracker everyone relies on is never out of date.',
    metaChips: [
      { icon: 'message', label: 'Spreadsheet' },
      { icon: 'clock', label: '~10 min setup' },
      { icon: 'gauge', label: 'Intermediate' },
      { icon: 'key', label: 'Service account' },
    ],
  },

  capabilitiesLead:
    'One node, seven operations covering the full read/write range. Pick one in the Operation dropdown and the form changes to match.',
  capabilities: [
    { icon: 'list', title: 'Add row(s)', operation: 'append', body: 'Appends to the bottom — the usual choice for logging.' },
    { icon: 'file', title: 'Read rows', operation: 'read', body: 'Pulls a range back into the flow for later steps to use.' },
    { icon: 'message', title: 'Find row', operation: 'find', body: 'Looks up a row by a key column, e.g. phone number or order ID.' },
    { icon: 'card', title: 'Update row', operation: 'update', body: 'Changes an existing row in place rather than adding a duplicate.' },
    { icon: 'cart', title: 'Delete row', operation: 'delete', body: 'Removes a row entirely.' },
    { icon: 'pin', title: 'Clear range', operation: 'clear', body: 'Empties cells but keeps the rows and formatting.' },
    { icon: 'image', title: 'Create tab', operation: 'createSheet', body: 'Adds a new worksheet, e.g. one tab per month.' },
  ],

  useCases: [
    { icon: 'bag', text: 'Every order logs itself as a new row — order ID, customer, amount, courier — so the weekly fulfilment report writes itself.' },
    { icon: 'headset', text: 'A support flow looks up a customer by phone number to answer "what plan am I on" without a human opening the sheet.' },
    { icon: 'calendar', text: 'A daily flow reads the leads tab, counts today\'s rows, and posts the number to Slack.' },
    { icon: 'bell', text: 'When a row\'s status column flips to Urgent, the next poll catches it and alerts the on-call person.' },
  ],

  prerequisites: {
    youNeed: 'A Google Sheet you own or can edit',
    weNeed: 'A service account JSON key, with the sheet shared to its email',
    cost: 'Free',
  },

  credentialGuide: {
    anchorId: 'get-credential',
    heading: 'Create a service account',
    lead: 'A service account is a Google account made for apps rather than people. You download its key once, then share your sheet with its email address exactly as you would with a colleague.',
    steps: [
      {
        title: 'Open Google Cloud Console',
        body: 'Create a project if you do not already have one — anything will do, it is just a container.',
        link: { href: 'https://console.cloud.google.com/iam-admin/serviceaccounts', label: 'console.cloud.google.com → Service Accounts' },
        clickPath: ['IAM & Admin', 'Service Accounts', 'Create service account'],
      },
      {
        title: 'Enable the Google Sheets API',
        body: 'A service account alone cannot touch Sheets until the API is switched on for the project.',
        link: { href: 'https://console.cloud.google.com/apis/library/sheets.googleapis.com', label: 'Enable the Sheets API' },
        clickPath: ['APIs & Services', 'Library', 'Google Sheets API', 'Enable'],
        note: 'Skipping this is the most common cause of a connection that saves fine but fails on every run.',
      },
      {
        title: 'Create and download a JSON key',
        body: 'Open the service account you just made, go to its Keys tab, and add a new JSON key. Your browser downloads a file.',
        clickPath: ['Keys', 'Add key', 'Create new key', 'JSON'],
        frame: {
          url: 'console.cloud.google.com / iam-admin / serviceaccounts',
          heading: 'Service account keys',
          fields: [{ label: 'Service account email', value: 'flows@my-project.iam.gserviceaccount.com' }],
        },
        note: 'Google only lets you download this file once. Keep it somewhere safe.',
      },
      {
        title: 'Share your sheet with the service account',
        body: 'Open your Google Sheet, press Share, and paste the service account email as an Editor.',
        clickPath: ['Share', 'Paste the @…gserviceaccount.com email', 'Editor', 'Send'],
        note: 'Forget this and every read or write fails with a permission error, even though the credential itself is valid.',
      },
    ],
  },

  workflowGuide: {
    anchorId: 'configure-node',
    lead: 'Below is the real WorkflowMitra editor. Switch the Operation tabs to see the fields each of the seven operations asks for.',
    nodeType: 'google-sheets',
    triggerLabel: 'New order',
    triggerSummary: 'shopify · order/paid',
    triggerIcon: 'shopify',
    operations: [
      {
        id: 'append',
        label: 'Add row(s)',
        summary: 'append row',
        caption: 'The most common operation. Values map to columns in the order you list them, so keep them lined up with the sheet\'s header row.',
        fields: [CONNECTION, ...SHEET_FIELDS, operation('Add row(s)'), { label: 'Values', multiline: true, placeholder: '{{ order.id }}, {{ customer.name }}, {{ order.total }}' }],
      },
      {
        id: 'read',
        label: 'Read rows',
        summary: 'read rows',
        caption: 'Pulls rows back into the flow so later steps can use them. Keep the range tight — reading a whole sheet every run is slow.',
        fields: [CONNECTION, ...SHEET_FIELDS, operation('Read rows'), { label: 'Range', placeholder: 'A1:F100' }],
      },
      {
        id: 'find',
        label: 'Find row',
        summary: 'find row',
        caption: 'Looks a row up by a key column — the usual way to answer "what do we already know about this customer".',
        fields: [CONNECTION, ...SHEET_FIELDS, operation('Find row'), { label: 'Key column', kind: 'select', value: 'Phone' }, { label: 'Key value', placeholder: '{{ customer.phone }}' }],
      },
      {
        id: 'update',
        label: 'Update row',
        summary: 'update row',
        caption: 'Changes a row in place. Pair it with Find so you update the right one instead of appending a duplicate.',
        fields: [CONNECTION, ...SHEET_FIELDS, operation('Update row'), { label: 'Key column', kind: 'select', value: 'Order ID' }, { label: 'Key value', placeholder: '{{ order.id }}' }, { label: 'Values', multiline: true, placeholder: 'Status: Shipped' }],
      },
      {
        id: 'delete',
        label: 'Delete row',
        summary: 'delete row',
        caption: 'Removes the row entirely and shifts the ones below it up. There is no undo, so prefer Clear range if you only want the values gone.',
        fields: [CONNECTION, ...SHEET_FIELDS, operation('Delete row'), { label: 'Key column', kind: 'select', value: 'Order ID' }, { label: 'Key value', placeholder: '{{ order.id }}' }],
      },
      {
        id: 'clear',
        label: 'Clear range',
        summary: 'clear range',
        caption: 'Empties the cells but leaves the rows, formatting and formulas around them intact.',
        fields: [CONNECTION, ...SHEET_FIELDS, operation('Clear range'), { label: 'Range', placeholder: 'A2:F100' }],
      },
      {
        id: 'createSheet',
        label: 'Create tab',
        summary: 'create tab',
        caption: 'Adds a new worksheet to the same spreadsheet — handy for a fresh tab per month or per campaign.',
        fields: [CONNECTION, ...SHEET_FIELDS.slice(0, 1), operation('Create tab'), { label: 'New tab name', placeholder: 'Orders {{ now.month }}' }],
      },
    ],
    steps: [
      { pin: 1, title: 'Add a Google Sheets step', body: 'right after the step that should trigger it.' },
      { pin: 2, title: 'Upload the service account JSON', body: 'from step 3 above — stored encrypted.' },
      { pin: 3, title: 'Pick the spreadsheet and tab', body: 'only sheets shared with the service account appear.' },
      { pin: 4, title: 'Choose the operation', body: 'and fill in its fields.' },
      { pin: 5, title: 'Save and test', body: 'check the row lands where you expect.' },
    ],
  },

  exampleFlow: {
    nodes: [
      { icon: 'shopify', color: '#7AB55C', label: 'New order' },
      { icon: 'tune', color: '#6B6B6B', label: 'Format row' },
      { icon: 'google-sheets', color: '#34A853', label: 'Google Sheets' },
    ],
    caption: 'Every new order appends a row to the log sheet automatically, so the weekly report is always current.',
  },

  templates: { fallbackWhenEmpty: 'recommended-workflows' },

  mistakes: [
    { text: 'Forgetting to share the sheet with the service account email — the credential saves fine but every run fails on permissions.' },
    { text: 'Not enabling the Google Sheets API for the project, which fails the same way and for the same invisible reason.' },
    { text: 'Appending values that do not line up with the header row, so data lands in the wrong columns.' },
  ],

  faqs: [
    { q: "What's a service account, in plain terms?", a: 'A Google account that belongs to an app rather than a person. You share your sheet with its email exactly like sharing with a colleague.' },
    { q: 'Can I connect more than one sheet?', a: 'Yes — one service account can be shared with as many sheets as you like; pick a different spreadsheet per step.' },
    { q: 'Does this work with Excel files?', a: 'Not directly. An .xlsx would need to be opened as a Google Sheet first.' },
    { q: 'Is the JSON key safe to store here?', a: "Yes — it's encrypted in the credentials vault and never shown again after you upload it." },
  ],

  relatedOverride: undefined,

  seo: {
    metaTitle: 'Google Sheets Integration — Connect Google Sheets to WorkflowMitra',
    metaDescription: 'Read, add, update and clear Google Sheets rows from a WorkflowMitra flow. Step-by-step: create a service account, share your sheet, configure every operation.',
    ogImage: 'category',
  },
}
