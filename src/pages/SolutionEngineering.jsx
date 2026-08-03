import React from 'react';
import UnifiedSolutionTemplate from '../components/UnifiedSolutionTemplate';
import { solutionConfigs } from '../data/solutionConfigs';

const SolutionEngineering = () => {
  return <UnifiedSolutionTemplate config={solutionConfigs.engineering} />;
};

export default SolutionEngineering;
