import React from 'react';
import UnifiedSolutionTemplate from '../components/UnifiedSolutionTemplate';
import { solutionConfigs } from '../data/solutionConfigs';

const SolutionMarketing = () => {
  return <UnifiedSolutionTemplate config={solutionConfigs.marketing} />;
};

export default SolutionMarketing;
