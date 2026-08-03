import React from 'react';
import UnifiedSolutionTemplate from '../components/UnifiedSolutionTemplate';
import { solutionConfigs } from '../data/solutionConfigs';

const SolutionSupport = () => {
  return <UnifiedSolutionTemplate config={solutionConfigs.support} />;
};

export default SolutionSupport;
