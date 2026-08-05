// Maps slug -> content config, for every phase-1 flagship page. Only
// integrationRegistry entries with status: 'live' have an entry here —
// see spec "Architecture: registry + content split."
import slack from './slack'
import telegram from './telegram'
import whatsapp from './whatsapp'
import gmail from './gmail'
import googleSheets from './google-sheets'
import httpRequest from './http-request'
import aiAgent from './ai-agent'
import shopify from './shopify'

const integrationDocs = {
  slack,
  telegram,
  whatsapp,
  gmail,
  'google-sheets': googleSheets,
  'http-request': httpRequest,
  'ai-agent': aiAgent,
  shopify,
}

export default integrationDocs
