export default {
  slug: 'telegram',
  schemaVersion: 2,
  publishedDate: '2026-08-04',
  lastUpdated: '2026-08-04',
  reviewDate: '2026-11-01',

  hero: {
    tagline: 'Send a message from your own Telegram bot to any chat, group, or channel.',
    metaChips: [
      { icon: 'message', label: 'Messaging' },
      { icon: 'clock', label: '~3 min setup' },
      { icon: 'gauge', label: 'Beginner friendly' },
      { icon: 'key', label: 'Needs a bot token' },
    ],
  },

  capabilitiesLead:
    'The Telegram node sends a message as your bot. Which chat it lands in is a field you fill in, so one bot can serve many chats.',
  capabilities: [
    { icon: 'message', title: 'Send a message', operation: 'text', body: 'Text with {{ variables }} to any person, group, or channel your bot can reach.' },
  ],

  useCases: [
    { icon: 'bag', text: "A grocery delivery app messages a driver's personal Telegram the second they're assigned a delivery, with the address and customer phone number." },
    { icon: 'bell', text: 'When server CPU crosses 90%, the on-call engineer gets a Telegram message before customers start noticing the slowdown.' },
    { icon: 'calendar', text: "Every Monday at 9 AM, last week's sales numbers land straight in the team's Telegram group — no one has to ask for them." },
    { icon: 'headset', text: "A support bot forwards anything it can't answer to a private Telegram channel the team keeps open all day." },
  ],

  prerequisites: { youNeed: 'A Telegram account', weNeed: 'One bot token and a chat ID', cost: 'Free' },

  credentialGuide: {
    anchorId: 'get-credential',
    heading: 'Create your bot with BotFather',
    lead: "BotFather is Telegram's own official bot for making other bots. The whole thing happens as a chat conversation — there is no dashboard to log into.",
    steps: [
      {
        title: 'Open a chat with @BotFather',
        body: 'Search for BotFather in Telegram (it has a blue verified tick) and press Start, then send the /newbot command.',
        link: { href: 'https://t.me/BotFather', label: 'Open @BotFather in Telegram' },
        clickPath: ['Start', '/newbot'],
      },
      {
        title: 'Name your bot',
        body: 'BotFather asks for a display name first — this is what people see, e.g. "WorkflowMitra Alerts".',
        note: 'Then it asks for a username, which must be unique and end in "bot", e.g. workflowmitra_alerts_bot.',
      },
      {
        title: 'Copy the token',
        body: 'BotFather replies immediately with a token. That single line is everything WorkflowMitra needs.',
        copyFields: [{ label: 'Bot token', value: '7738219045:AAF8kq_redactedTokenExample' }],
        note: 'Treat it like a password. Lost it? Send /token to BotFather and pick your bot to see it again.',
      },
      {
        title: 'Find the chat ID',
        body: 'The token says who sends; the chat ID says where to. Message @userinfobot to get your own ID, or add your bot to a group and check its recent updates.',
        link: { href: 'https://t.me/userinfobot', label: 'Open @userinfobot' },
        note: 'Group chat IDs are negative numbers (e.g. -1001234567890). Personal IDs are positive. Using the wrong one is the usual reason a message never arrives.',
      },
    ],
  },

  workflowGuide: {
    anchorId: 'configure-node',
    lead: 'Below is the real WorkflowMitra editor. The Telegram node has three controls beyond the saved connection.',
    nodeType: 'telegram',
    triggerLabel: 'CPU > 90%',
    triggerSummary: 'monitor · threshold',
    triggerIcon: 'webhook-trigger',
    operations: [
      {
        id: 'text',
        label: 'Send a message',
        summary: 'chat -1001234…',
        caption: 'Telegram has a single mode — what you see is the whole node. One bot token can serve any number of chats by changing the Chat ID.',
        fields: [
          { kind: 'credential' },
          {
            label: 'Bot token',
            required: true,
            placeholder: '123456:ABC-DEF…',
            hint: 'Message @BotFather in Telegram to create a bot and copy its token — or pick a saved credential above.',
            error: 'A bot token is required.',
          },
          {
            label: 'Chat ID',
            required: true,
            placeholder: 'e.g. 987654321',
            hint: 'The chat, group, or channel to send to. Message @userinfobot to find your own ID.',
            error: 'A chat ID is required.',
          },
          { label: 'Message', required: true, multiline: true, placeholder: 'Server CPU at 92% — check now' },
        ],
      },
    ],
    steps: [
      { pin: 1, title: 'Add a Telegram step', body: 'right after the step that should trigger it.' },
      { pin: 2, title: 'Paste the bot token', body: 'from step 3 above — or pick a saved credential.' },
      { pin: 3, title: 'Enter the chat ID', body: 'the person, group, or channel that should receive it.' },
      { pin: 4, title: 'Save and test', body: 'the message arrives from your bot.' },
    ],
  },

  exampleFlow: {
    nodes: [
      { icon: 'trigger', color: '#0A0A0A', label: 'CPU > 90%' },
      { icon: 'tune', color: '#6B6B6B', label: 'Format alert' },
      { icon: 'telegram', color: '#26A5E4', label: 'Telegram' },
    ],
    caption: 'The moment a monitoring check crosses the threshold, WorkflowMitra formats the alert and messages the on-call engineer directly.',
  },

  templates: { fallbackWhenEmpty: 'recommended-workflows' },

  mistakes: [
    { text: 'Using a personal chat ID when you meant a group — group IDs are negative numbers and look quite different.' },
    { text: 'Forgetting to add the bot to the group. A bot can only message groups it has been added to.' },
    { text: 'Expecting the bot to reply to people. It only sends what your flow tells it to send.' },
  ],

  faqs: [
    { q: 'Do I need a Telegram Business account?', a: 'No — any regular Telegram account can create a bot through BotFather for free.' },
    { q: "How do I find a group's chat ID?", a: "Add the bot to the group, send any message, then check the bot's recent updates — or use a helper bot like @userinfobot." },
    { q: 'Can the same bot post to multiple chats?', a: 'Yes — one bot token works for any chat the bot can reach; just change the Chat ID per step.' },
    { q: 'Is the bot token safe to share?', a: 'No — anyone with it can send messages as your bot. WorkflowMitra stores it encrypted.' },
  ],

  relatedOverride: undefined,

  seo: {
    metaTitle: 'Telegram Integration — Connect Telegram to WorkflowMitra',
    metaDescription: 'Send Telegram messages automatically from a WorkflowMitra flow. Step-by-step: create a bot with BotFather, find your chat ID, and configure the node.',
    ogImage: 'category',
  },
}
