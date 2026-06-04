import { canadianFinancialsReportHref } from './reportLinks';

export type UseCaseCard = {
  id: string;
  title: string;
  question: string;
  answer: string;
  ctaLabel?: string;
  href?: string;
};

export const useCases: UseCaseCard[] = [
  {
    id: 'canadian-financials-penalized-regression',
    title: 'Canadian financials penalized regression',
    question:
      'Which Canadian bank stocks look strongest next month when rates, inflation, and sector context shift?',
    answer:
      'Rank Canadian bank stocks with rate-sensitive macro variables, stock momentum, and sector-relative signals. The report shows which variables survived the penalty and how that translated into a cleaner long-short spread.',
    ctaLabel: 'Open the web report',
    href: canadianFinancialsReportHref,
  },
  {
    id: 'factor-selection',
    title: 'Factor selection',
    question:
      'Which characteristics actually add signal after controlling for other characteristics?',
    answer:
      'Penalized regression and tree methods help separate signal from correlated clutter, especially when traditional single-factor screens overstate what is really redundant.',
  },
  {
    id: 'return-forecasting',
    title: 'Return forecasting',
    question:
      'Given today’s characteristics and regime, which stocks or factors have better forward odds?',
    answer:
      'A forecasting model should produce a distribution or ranking, not a false promise of precision. Bayesian and ensemble approaches are especially useful here.',
  },
  {
    id: 'risk-model-improvement',
    title: 'Risk model improvement',
    question:
      'Which exposures are hidden until stress regimes?',
    answer:
      'Tree methods and regime-aware models can reveal nonlinear risk behaviour that a static linear risk model may smooth away.',
  },
  {
    id: 'sparse-hedging',
    title: 'Sparse hedging / minimum variance',
    question:
      'How do we hedge without creating a 300-line unstable portfolio?',
    answer:
      'Regularized regression can keep the hedge readable, stable, and less sensitive to collinearity in the input exposures.',
  },
  {
    id: 'regime-analogy',
    title: 'Regime analogy engine',
    question:
      'What historical periods look most similar to today, and what is meaningfully different?',
    answer:
      'Similarity scoring is most useful when it feeds an explanation of what is alike, what is different, and what would falsify the analogy.',
  },
  {
    id: 'ensemble-forecast',
    title: 'Ensemble forecast',
    question:
      'What do multiple imperfect models agree and disagree on?',
    answer:
      'The point is not consensus for its own sake. It is to expose disagreement, use it as a confidence signal, and avoid overcommitting to one fragile view.',
  },
];
