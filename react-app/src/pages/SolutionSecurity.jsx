import React from 'react';
import UnifiedSolutionTemplate from '../components/UnifiedSolutionTemplate';
import { solutionConfigs } from '../data/solutionConfigs';

const SolutionSecurity = () => {
  return <UnifiedSolutionTemplate config={solutionConfigs.security} />;
};

export default SolutionSecurity;
