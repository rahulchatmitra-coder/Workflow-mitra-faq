import { useEffect } from 'react'
import SolutionHero from '../components/SolutionHero'
import WorkflowDemo from '../components/WorkflowDemo'
import HowItWorks from '../components/HowItWorks'
import IntegrationStrip from '../components/IntegrationStrip'
import SolutionCTA from '../components/SolutionCTA'
import { solutionsData } from '../data/solutionsData'

function SolutionMarketing() {
  const data = solutionsData.marketing

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = `${data.eyebrow} - FlowMitra`
  }, [data.eyebrow])

  return (
    <div className="solution-page">
      <SolutionHero
        eyebrow={data.eyebrow}
        headline={data.headline}
        description={data.description}
        primaryCTA={data.primaryCTA}
        secondaryCTA={data.secondaryCTA}
        icon={data.icon}
      />
      
      <WorkflowDemo
        useCases={data.useCases}
      />
      
      <HowItWorks
        steps={data.howItWorks}
      />
      
      <IntegrationStrip
        integrations={data.integrations}
      />
      
      <SolutionCTA
        title={data.title}
      />
    </div>
  )
}

export default SolutionMarketing
