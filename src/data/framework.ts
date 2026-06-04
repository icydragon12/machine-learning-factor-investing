export type FrameworkStep = {
  title: string;
  body: string;
};

export type RoadmapItem = {
  title: string;
  description: string;
};

export const oldWorkflow: FrameworkStep[] = [
  {
    title: 'Guidance',
    body: 'A company or analyst starts with a single scenario that sounds precise.',
  },
  {
    title: 'Analyst estimate',
    body: 'The model turns assumptions into a target, often with more confidence than the inputs deserve.',
  },
  {
    title: 'Point target',
    body: 'The market sees one number, even though the range of possible outcomes is wide.',
  },
  {
    title: 'Single recommendation',
    body: 'The process often collapses uncertainty into one buy, hold, or sell call.',
  },
];

export const betterWorkflow: FrameworkStep[] = [
  {
    title: 'Data',
    body: 'Start with point-in-time data, labels, and regime context that are valid for the decision date.',
  },
  {
    title: 'Multiple models',
    body: 'Use several models to learn different parts of the signal rather than forcing one model to do everything.',
  },
  {
    title: 'Scenario distribution',
    body: 'Translate model outputs into probabilities, ranges, and disagreement bands.',
  },
  {
    title: 'Confidence and uncertainty',
    body: 'Separate where the model is aligned, where it is uncertain, and where the assumptions are fragile.',
  },
  {
    title: 'Investment narrative',
    body: 'Tell a story that is explicit about what is similar, different, and falsifiable.',
  },
];

export const analogyFramework: FrameworkStep[] = [
  {
    title: 'What is similar?',
    body: 'Identify the recurring pattern in valuation, leadership, concentration, dispersion, credit, or macro state.',
  },
  {
    title: 'What is different?',
    body: 'Call out the parts of the current setup that do not match the historical analog.',
  },
  {
    title: 'What does the difference imply?',
    body: 'Ask how the differences change expected return dispersion, factor rotation, and downside risk.',
  },
  {
    title: 'What would falsify the analogy?',
    body: 'Define the evidence that would break the story so the thesis does not become a self-sealing narrative.',
  },
];

export const futureRoadmap: RoadmapItem[] = [
  {
    title: 'Real-data factor exercises',
    description: 'Hands-on examples using live or point-in-time factor datasets.',
  },
  {
    title: 'Penalized regression demo with public data',
    description: 'A guided example that shows variable selection and shrinkage on factor-style features.',
  },
  {
    title: 'Tree model demo using factor characteristics',
    description: 'A simple tree-based classifier or regressor for regime-aware stock selection.',
  },
  {
    title: 'Regime similarity dashboard',
    description: 'A visual tool for comparing the current environment with historical analogs.',
  },
  {
    title: 'Ensemble model demo',
    description: 'A portfolio-style blend of several imperfect views and a disagreement monitor.',
  },
  {
    title: 'Public-data source guide',
    description: 'A practical map of public sources, caveats, and data hygiene issues.',
  },
];
