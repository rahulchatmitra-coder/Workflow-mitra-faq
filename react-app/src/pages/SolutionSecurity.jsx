import { useEffect } from 'react'
import SolutionHero from '../components/SolutionHero'
import WorkflowDemo from '../components/WorkflowDemo'
import HowItWorks from '../components/HowItWorks'
import IntegrationStrip from '../components/IntegrationStrip'
import SolutionCTA from '../components/SolutionCTA'
import { solutionsData } from '../data/solutionsData'

function SolutionSecurity() {
  const data = solutionsData.security

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
        color={data.color}
        icon={data.icon}
      />
      
      <WorkflowDemo
        useCases={data.useCases}
        color={data.color}
      />
      
      <HowItWorks
        steps={data.howItWorks}
        color={data.color}
      />
      
      <IntegrationStrip
        integrations={data.integrations}
        color={data.color}
      />
      
      <SolutionCTA
        title={data.title}
        color={data.color}
      />
    </div>
  )
}

export default SolutionSecurity
