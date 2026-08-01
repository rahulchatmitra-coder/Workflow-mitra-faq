import React from 'react';
import UnifiedSolutionTemplate from '../components/UnifiedSolutionTemplate';
import { solutionConfigs } from '../data/solutionConfigs';

const SolutionSales = () => {
  return <UnifiedSolutionTemplate config={solutionConfigs.sales} />;
};

export default SolutionSales;
