import { useRef, useCallback } from 'react'

export function useDriverTour(stepsData, title, onComplete) {
  const driverObjRef = useRef(null)

  const startTour = useCallback(async () => {
    const { driver } = await import('driver.js')
    await import('driver.js/dist/driver.css')

    const defaultSteps = [
      {
        element: '#tour-overview',
        popover: {
          title: 'Workflow Mitra Help Center',
          description: 'Welcome to Workflow Mitra! Search FAQs or launch our interactive visual flow automation tour.',
          side: 'bottom',
          align: 'start',
        },
      },
      {
        element: '#tour-canvas',
        popover: {
          title: 'Visual Flow Canvas: Facebook Lead → CRM → Team Alert',
          description: 'This real-time visual canvas shows an active lead routing workflow matching app.workflowmitra.com.',
          side: 'bottom',
          align: 'center',
        },
      },
      {
        element: '#tour-node-facebook',
        popover: {
          title: 'Node 1: Facebook Lead Ads Webhook',
          description: 'Triggers automatically when a new lead submits a form on Facebook Lead Ads.',
          side: 'bottom',
          align: 'center',
        },
      },
      {
        element: '#tour-node-if',
        popover: {
          title: 'Node 2: IF Filter (Has an email)',
          description: 'Checks if the lead contains a valid email address before proceeding.',
          side: 'bottom',
          align: 'center',
        },
      },
      {
        element: '#tour-node-hubspot',
        popover: {
          title: 'Node 3: HubSpot CRM App Request',
          description: 'Creates or updates the lead contact in HubSpot via POST /crm/v3/objects/contacts.',
          side: 'bottom',
          align: 'center',
        },
      },
      {
        element: '#tour-node-assign',
        popover: {
          title: 'Node 4: Round-Robin Team Assignment',
          description: 'Assigns the new contact to the next available sales representative automatically.',
          side: 'bottom',
          align: 'center',
        },
      },
      {
        element: '#tour-node-destinations',
        popover: {
          title: 'Nodes 5, 6 & 7: Multi-Channel Dispatch',
          description: 'Fans out to send a welcome Gmail email, post a Slack channel alert, and append a row in Google Sheets!',
          side: 'top',
          align: 'center',
        },
      },
      {
        element: '#tour-run-btn',
        popover: {
          title: 'Interactive Flow Execution',
          description: 'Click "▶ Run" on the canvas toolbar to trigger a real-time visual simulation of the workflow!',
          side: 'top',
          align: 'center',
        },
      },
    ]

    driverObjRef.current = driver({
      showProgress: true,
      popoverClass: 'workflow-mitra-popover',
      steps: stepsData || defaultSteps,
      nextBtnText: 'Next Step →',
      prevBtnText: '← Previous',
      doneBtnText: 'Finish Guide 🎉',
      onDestroyed: () => {
        if (onComplete) {
          onComplete()
        }
      },
    })

    driverObjRef.current.drive()
  }, [stepsData, onComplete])

  return { startTour }
}
