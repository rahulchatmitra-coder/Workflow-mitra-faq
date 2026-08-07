"use client";

import * as React from "react";
import { driver, Driver, DriveStep } from "driver.js";
import "driver.js/dist/driver.css";
import { DocStep } from "@/types/docs";

export function useDriverTour(stepsData?: DocStep[], title?: string, onComplete?: () => void) {
  const driverObjRef = React.useRef<Driver | null>(null);

  // Drag functionality for Driver.js popover
  React.useEffect(() => {
    let isDragging = false;
    let currentX = 0;
    let currentY = 0;
    let initialX = 0;
    let initialY = 0;
    let popoverElement: HTMLElement | null = null;

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      popoverElement = target.closest('.driver-popover.workflow-mitra-popover') as HTMLElement;
      
      if (popoverElement) {
        isDragging = true;
        initialX = e.clientX - currentX;
        initialY = e.clientY - currentY;
        popoverElement.style.transition = 'none';
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && popoverElement) {
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;

        popoverElement.style.transform = `translate(${currentX}px, ${currentY}px)`;
        popoverElement.style.position = 'fixed';
      }
    };

    const handleMouseUp = () => {
      if (isDragging && popoverElement) {
        isDragging = false;
        popoverElement.style.transition = '';
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const startTour = React.useCallback(() => {
    const steps: DriveStep[] = [
      {
        element: "#tour-overview",
        popover: {
          title: "Workflow Mitra Help Center",
          description: "Welcome to Workflow Mitra! Search FAQs or launch our interactive visual flow automation tour.",
          side: "bottom",
          align: "start",
        },
      },
      {
        element: "#tour-canvas",
        popover: {
          title: "Visual Flow Canvas: Facebook Lead → CRM → Team Alert",
          description: "This real-time visual canvas shows an active lead routing workflow matching app.workflowmitra.com.",
          side: "bottom",
          align: "center",
        },
      },
      {
        element: "#tour-node-facebook",
        popover: {
          title: "Node 1: Facebook Lead Ads Webhook",
          description: "Triggers automatically when a new lead submits a form on Facebook Lead Ads.",
          side: "bottom",
          align: "center",
        },
      },
      {
        element: "#tour-node-if",
        popover: {
          title: "Node 2: IF Filter (Has an email)",
          description: "Checks if the lead contains a valid email address before proceeding.",
          side: "bottom",
          align: "center",
        },
      },
      {
        element: "#tour-node-hubspot",
        popover: {
          title: "Node 3: HubSpot CRM App Request",
          description: "Creates or updates the lead contact in HubSpot via POST /crm/v3/objects/contacts.",
          side: "bottom",
          align: "center",
        },
      },
      {
        element: "#tour-node-assign",
        popover: {
          title: "Node 4: Round-Robin Team Assignment",
          description: "Assigns the new contact to the next available sales representative automatically.",
          side: "bottom",
          align: "center",
        },
      },
      {
        element: "#tour-node-destinations",
        popover: {
          title: "Nodes 5, 6 & 7: Multi-Channel Dispatch",
          description: "Fans out to send a welcome Gmail email, post a Slack channel alert, and append a row in Google Sheets!",
          side: "top",
          align: "center",
        },
      },
      {
        element: "#tour-run-btn",
        popover: {
          title: "Interactive Flow Execution",
          description: "Click '▶ Run' on the canvas toolbar to trigger a real-time visual simulation of the workflow!",
          side: "top",
          align: "center",
        },
      },
    ];

    driverObjRef.current = driver({
      showProgress: true,
      popoverClass: "workflow-mitra-popover",
      steps: steps,
      nextBtnText: "Next Step →",
      prevBtnText: "← Previous",
      doneBtnText: "Finish Guide 🎉",
      onDestroyed: () => {
        if (onComplete) {
          onComplete();
        }
      },
    });

    driverObjRef.current.drive();
  }, [title, onComplete]);

  return { startTour };
}
