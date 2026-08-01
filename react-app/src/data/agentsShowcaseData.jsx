import { FaChartBar, FaCommentDots, FaBriefcase, FaClipboardList, FaPhoneAlt } from 'react-icons/fa'

export const agentsShowcaseData = [
  {
    id: 'data-analysis',
    name: 'Data Analysis Agent',
    desc: 'A reasoning agent that answers questions from your data warehouse.',
    icon: <FaChartBar />,
    color: '#3B82F6',
    integrations: ['Snowflake', 'Datadog', 'Google Sheets'],
    teamLabel: 'Data',
    question: 'Where are we losing people in the onboarding flow?',
    lead: "Here's where you're losing people:",
    callouts: [
      { icon: '🔴', strong: 'Biggest drop-off: Dashboard → Attempted Integration — 46%', text: "of users who view the dashboard never try to connect an integration — that's 1,432 people falling off in a single step. This is problem #1." },
      { icon: '⚠️', strong: 'Secondary drop-off: Attempted → Completed Integration.', text: "Of the users who try, 37% fail to finish. Combined, only 22% of signups make it through the integration step at all." }
    ],
    table: {
      headers: ['Step', 'Users', 'Drop-off'],
      rows: [
        ['Signed Up', '4,820', '—'],
        ['Completed Profile', '3,940', '-18%'],
        ['Attempted Integration', '2,110', '-46%']
      ]
    },
    stat: {
      title: 'Weekly Active Users',
      data: [38, 55, 60, 48, 66, 72, 58, 64, 70, 50, 62, 68, 56, 44, 60, 30, 58, 64, 52, 46, 62, 54],
      peak: 16
    }
  },
  {
    id: 'support',
    name: 'Support Agent',
    desc: 'A support agent that drafts replies from your help docs and past tickets.',
    icon: <FaCommentDots />,
    color: '#10B981',
    integrations: ['Zendesk', 'Slack', 'Jira'],
    teamLabel: 'Support',
    question: 'Why are refund tickets taking so long to close?',
    lead: "Here's what's slowing your refund tickets down:",
    callouts: [
      { icon: '🔴', strong: 'Biggest bottleneck: Awaiting Manager Approval — 52%', text: "of refund tickets sit in this stage for over 2 days before anyone reviews them. This is your #1 delay." },
      { icon: '⚠️', strong: 'Secondary bottleneck: Payment Reconciliation.', text: "Of tickets that clear approval, 29% wait on finance to confirm the charge before closing." }
    ],
    table: {
      headers: ['Step', 'Tickets', 'Avg Wait'],
      rows: [
        ['Opened', '612', '—'],
        ['Approved', '390', '2.1 days'],
        ['Refunded', '276', '0.6 days']
      ]
    },
    stat: {
      title: 'Tickets Resolved',
      data: [42, 50, 46, 58, 64, 60, 70, 66, 52, 48, 60, 66, 72, 68, 54, 60, 64, 58, 50, 62, 66, 70],
      peak: 12
    }
  },
  {
    id: 'crm',
    name: 'CRM Agent',
    desc: 'A CRM agent that enriches leads and updates deal stages automatically.',
    icon: <FaBriefcase />,
    color: '#F59E0B',
    integrations: ['Salesforce', 'Hubspot', 'Apollo'],
    teamLabel: 'Sales',
    question: 'Which deals are most likely to slip this quarter?',
    lead: "Here's where deals are at risk:",
    callouts: [
      { icon: '🔴', strong: 'Highest risk: Proposal Sent → Negotiation — 41%', text: "of deals stall here past their expected close date, worth $48k in pipeline." },
      { icon: '⚠️', strong: 'Secondary risk: Negotiation → Closed Won.', text: "26% of deals in negotiation go quiet for over 10 days before any follow-up." }
    ],
    table: {
      headers: ['Stage', 'Deals', 'At Risk'],
      rows: [
        ['Proposal Sent', '64', '—'],
        ['Negotiation', '38', '41%'],
        ['Contract Sent', '19', '12%']
      ]
    },
    stat: {
      title: 'Pipeline Value ($K)',
      data: [30, 44, 40, 52, 58, 50, 62, 56, 48, 54, 60, 58, 50, 44, 52, 38, 48, 54, 46, 50, 56, 60],
      peak: 6
    }
  },
  {
    id: 'meeting-prep',
    name: 'Meeting Prep Agent',
    desc: 'A meeting agent that reads past notes and briefs you before every call.',
    icon: <FaClipboardList />,
    color: '#8B5CF6',
    integrations: ['Google Meet', 'Zoom', 'Notion'],
    teamLabel: 'Ops',
    question: 'What should I know before my 3pm call with Meera?',
    lead: "Here's your briefing for the 3pm call:",
    callouts: [
      { icon: '🔴', strong: 'Last touchpoint: 12 days ago.', text: "The account raised a pricing concern that was never formally closed — flag this early." },
      { icon: '⚠️', strong: 'Open item: bulk export request.', text: "A feature request for bulk export is still marked pending from the last call." }
    ],
    table: {
      headers: ['Meeting', 'Date', 'Outcome'],
      rows: [
        ['Kickoff Call', '14 Jun', 'Positive'],
        ['Pricing Review', '3 Jul', 'Open concern'],
        ['Check-in', '19 Jul', 'No response']
      ]
    },
    stat: {
      title: 'Meetings Briefed',
      data: [20, 28, 24, 34, 30, 38, 32, 40, 36, 30, 42, 38, 34, 28, 36, 24, 32, 38, 30, 34, 40, 36],
      peak: 11
    }
  },
  {
    id: 'call-analysis',
    name: 'Call Analysis Agent',
    desc: 'A call agent that scores conversations and flags at-risk accounts.',
    icon: <FaPhoneAlt />,
    color: '#EC4899',
    integrations: ['Gong', 'Zoom', 'Salesforce'],
    teamLabel: 'Sales',
    question: 'Which support calls this week need a manager review?',
    lead: "Here are the calls flagged for review:",
    callouts: [
      { icon: '🔴', strong: '3 calls scored below 40 sentiment,', text: "all involving the same billing issue repeated across customers." },
      { icon: '⚠️', strong: '2 calls ran over 22 minutes', text: "with no resolution logged — likely candidates for a follow-up ticket." }
    ],
    table: {
      headers: ['Call', 'Agent', 'Score'],
      rows: [
        ['#4821', 'Rohan', '32'],
        ['#4835', 'Priya', '38'],
        ['#4902', 'Karan', '61']
      ]
    },
    stat: {
      title: 'Calls Reviewed',
      data: [34, 40, 36, 46, 50, 44, 54, 48, 40, 46, 52, 48, 42, 36, 44, 30, 38, 44, 36, 40, 46, 50],
      peak: 8
    }
  }
];
