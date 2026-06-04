export type GlossaryTerm = {
  term: string;
  definition: string;
};

export const glossary: GlossaryTerm[] = [
  {
    term: 'Feature',
    definition: 'An input variable used by the model, such as value, momentum, quality, or a macro indicator.',
  },
  {
    term: 'Label',
    definition: 'The outcome the model is trying to predict, such as next-period return or outperformance versus underperformance.',
  },
  {
    term: 'Training set',
    definition: 'The historical sample used to fit the model.',
  },
  {
    term: 'Test set',
    definition: 'A held-out sample used to check whether the model generalizes outside the training data.',
  },
  {
    term: 'Cross-validation',
    definition: 'A repeated validation process that estimates performance across multiple sample splits.',
  },
  {
    term: 'Walk-forward validation',
    definition: 'A time-aware validation method that trains on past data and tests on later data in sequence.',
  },
  {
    term: 'Overfitting',
    definition: 'When the model learns noise or quirks in the sample that do not persist out of sample.',
  },
  {
    term: 'Regularization',
    definition: 'A penalty or constraint that discourages overly complex models.',
  },
  {
    term: 'Hyperparameter',
    definition: 'A setting chosen before training, such as penalty strength or tree depth.',
  },
  {
    term: 'Ensemble',
    definition: 'A combination of multiple models whose outputs are blended into one view.',
  },
  {
    term: 'Signal decay',
    definition: 'The tendency for an edge to weaken as it becomes known, crowded, or regime-dependent.',
  },
  {
    term: 'Regime shift',
    definition: 'A change in market structure, macro backdrop, or investor behaviour that changes how signals behave.',
  },
  {
    term: 'Point-in-time data',
    definition: 'Data recorded as it was known at the time, not later revised values.',
  },
  {
    term: 'Survivorship bias',
    definition: 'The distortion that happens when failed or delisted names are missing from the sample.',
  },
  {
    term: 'Look-ahead bias',
    definition: 'Using information that would not have been known at the decision date.',
  },
];
