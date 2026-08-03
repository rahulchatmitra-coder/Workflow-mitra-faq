import React from 'react';
import UnifiedSolutionTemplate from '../components/UnifiedSolutionTemplate';
import { solutionConfigs } from '../data/solutionConfigs';

const SolutionOperations = () => {
  return <UnifiedSolutionTemplate config={solutionConfigs.operations} />;
};

export default SolutionOperations;
