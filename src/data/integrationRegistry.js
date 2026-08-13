// Single source of truth for every integration: Hub, search, sitemap,
// category filters, and the related-integrations algorithm all read
// this file. Heavy per-page content for `status: 'live'` entries lives
// separately in src/data/integrationDocs/<slug>.js.

const integrationRegistry = [
  // ---- phase 1 flagship (status: 'live') ----
  { slug: 'slack', title: 'Slack', shortDescription: 'Post a message to a Slack channel from any flow.', category: 'MESSAGING', credentialType: 'slack', icon: 'slack', status: 'live' },
  { slug: 'telegram', title: 'Telegram', shortDescription: 'Send a message from your bot to any chat.', category: 'MESSAGING', credentialType: 'telegram', icon: 'telegram', status: 'live' },
  { slug: 'whatsapp', title: 'WhatsApp', shortDescription: 'Send templates, media, and replies on WhatsApp.', category: 'MESSAGING', credentialType: 'whatsapp', icon: 'whatsapp', status: 'live' },
  { slug: 'gmail', title: 'Gmail', shortDescription: 'Send, reply, and label emails from a flow.', category: 'EMAIL', credentialType: 'google-oauth', icon: 'gmail', status: 'live' },
  { slug: 'google-sheets', title: 'Google Sheets', shortDescription: 'Read, add, and update rows automatically.', category: 'SPREADSHEET', credentialType: 'google-service-account', icon: 'google-sheets', status: 'live' },
  { slug: 'http-request', title: 'HTTP Request', shortDescription: 'Connect any app that has an API — with or without a login key.', category: 'DEVELOPER', credentialType: 'http-auth', icon: 'http-request', status: 'live' },
  { slug: 'ai-agent', title: 'AI Agent', shortDescription: 'Let Claude, GPT, or another model answer, decide, or draft text.', category: 'AI', credentialType: 'ai-provider', icon: 'ai-agent', status: 'live' },
  { slug: 'shopify', title: 'Shopify', shortDescription: 'React to orders, update products, manage customers.', category: 'COMMERCE', credentialType: 'shopify', icon: 'shopify', status: 'live' },

  // ---- coming soon (status: 'coming-soon') — metadata only, no content file ----
  { slug: 'discord', title: 'Discord', shortDescription: 'Post to a Discord server channel via webhook.', category: 'MESSAGING', credentialType: 'discord', icon: 'discord', status: 'coming-soon' },
  { slug: 'smtp-email', title: 'Email (SMTP)', shortDescription: 'Send email through any SMTP provider.', category: 'EMAIL', credentialType: 'smtp', icon: 'smtp-email', status: 'coming-soon' },
  { slug: 'hubspot', title: 'HubSpot', shortDescription: 'Create and update CRM contacts and deals.', category: 'CRM', credentialType: 'hubspot', icon: 'hubspot', status: 'coming-soon' },
  { slug: 'zoho-crm', title: 'Zoho CRM', shortDescription: 'Create and update leads and deals in Zoho CRM.', category: 'CRM', credentialType: 'zoho-crm', icon: 'zoho-crm', status: 'coming-soon' },
  { slug: 'pipedrive', title: 'Pipedrive', shortDescription: 'Create and update deals in your Pipedrive pipeline.', category: 'CRM', credentialType: 'pipedrive', icon: 'pipedrive', status: 'coming-soon' },
  { slug: 'zendesk', title: 'Zendesk', shortDescription: 'Create and update support tickets.', category: 'SUPPORT', credentialType: 'zendesk', icon: 'zendesk', status: 'coming-soon' },
  { slug: 'freshdesk', title: 'Freshdesk', shortDescription: 'Create and update support tickets.', category: 'SUPPORT', credentialType: 'freshdesk', icon: 'freshdesk', status: 'coming-soon' },
  { slug: 'intercom', title: 'Intercom', shortDescription: 'Create conversations and update contacts.', category: 'SUPPORT', credentialType: 'intercom', icon: 'intercom', status: 'coming-soon' },
  { slug: 'zoho-desk', title: 'Zoho Desk', shortDescription: 'Create and update support tickets.', category: 'SUPPORT', credentialType: 'zoho-desk', icon: 'zoho-desk', status: 'coming-soon' },
  { slug: 'woocommerce', title: 'WooCommerce', shortDescription: 'React to orders and manage products.', category: 'COMMERCE', credentialType: 'woocommerce', icon: 'woocommerce', status: 'coming-soon' },
  { slug: 'shiprocket', title: 'Shiprocket', shortDescription: 'Book shipments and track couriers.', category: 'COMMERCE', credentialType: 'shiprocket', icon: 'shiprocket', status: 'coming-soon' },
  { slug: 'linkedin', title: 'LinkedIn', shortDescription: 'Post updates and manage company page activity.', category: 'SOCIAL', credentialType: 'linkedin', icon: 'linkedin', status: 'coming-soon' },
  { slug: 'facebook-pages', title: 'Facebook Page', shortDescription: 'Post updates to a Facebook Page.', category: 'SOCIAL', credentialType: 'facebook-pages', icon: 'facebook-pages', status: 'coming-soon' },
  { slug: 'zoho-books', title: 'Zoho Books', shortDescription: 'Create invoices and sync accounting records.', category: 'FINANCE', credentialType: 'zoho-books', icon: 'zoho-books', status: 'coming-soon' },
  { slug: 'zoom', title: 'Zoom', shortDescription: 'Create and manage Zoom meetings from a flow.', category: 'MEETINGS', credentialType: 'zoom', icon: 'zoom', status: 'coming-soon' },
  { slug: 'google-meet', title: 'Google Meet', shortDescription: 'Create and manage Google Meet meetings.', category: 'MEETINGS', credentialType: 'google-oauth', icon: 'google-meet', status: 'coming-soon' },
  { slug: 'calcom', title: 'Cal.com', shortDescription: 'Create and manage bookings.', category: 'MEETINGS', credentialType: 'calcom', icon: 'calcom', status: 'coming-soon' },
  { slug: 'calendly', title: 'Calendly', shortDescription: 'React to new bookings and manage events.', category: 'MEETINGS', credentialType: 'calendly', icon: 'calendly', status: 'coming-soon' },
  { slug: 'whereby', title: 'Whereby', shortDescription: 'Create and manage video meeting rooms.', category: 'MEETINGS', credentialType: 'whereby', icon: 'whereby', status: 'coming-soon' },
  { slug: 'teams', title: 'Microsoft Teams', shortDescription: 'Create and manage Teams meetings.', category: 'MEETINGS', credentialType: 'teams', icon: 'teams', status: 'coming-soon' },
  { slug: 'zoho-bookings', title: 'Zoho Bookings', shortDescription: 'Create and manage bookings.', category: 'MEETINGS', credentialType: 'zoho-bookings', icon: 'zoho-bookings', status: 'coming-soon' },
  { slug: 'jitsi', title: 'Jitsi Meet', shortDescription: 'Create video meeting rooms.', category: 'MEETINGS', credentialType: 'jitsi', icon: 'jitsi', status: 'coming-soon' },
  { slug: 'postgres', title: 'Postgres', shortDescription: 'Run a query against your database.', category: 'DATABASE', credentialType: 'postgres', icon: 'postgres', status: 'coming-soon' },
  { slug: 'mysql', title: 'MySQL', shortDescription: 'Run a query against your database.', category: 'DATABASE', credentialType: 'mysql', icon: 'mysql', status: 'coming-soon' },
  { slug: 'mongodb', title: 'MongoDB', shortDescription: 'Read and write documents in your database.', category: 'DATABASE', credentialType: 'mongodb', icon: 'mongodb', status: 'coming-soon' },
  { slug: 'redis', title: 'Redis', shortDescription: 'Run a command against your Redis store.', category: 'DATABASE', credentialType: 'redis', icon: 'redis', status: 'coming-soon' },
]

export default integrationRegistry
