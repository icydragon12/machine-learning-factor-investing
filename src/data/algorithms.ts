export type AlgorithmCard = {
  id: string;
  symbol: string;
  name: string;
  subtitle: string;
  whatItIs: string;
  financeUseCase: string;
  inputs: string[];
  outputs: string[];
  strengths: string[];
  weaknesses: string[];
  investorTranslation: string;
};

export const algorithms: AlgorithmCard[] = [
  {
    id: 'penalized-regressions',
    symbol: 'LR',
    name: 'Penalized Regressions',
    subtitle: 'Linear models with discipline',
    whatItIs:
      'Regression methods that shrink coefficients or remove variables so the model does not chase every noisy relationship.',
    financeUseCase:
      'Useful when you have too many correlated factors and need to control overfitting in return models, hedges, and minimum variance portfolios.',
    inputs: [
      'Asset and factor returns',
      'Characteristics such as value, momentum, quality, size, profitability',
      'Risk exposures',
      'Covariance estimates',
    ],
    outputs: [
      'Coefficients and weights',
      'Selected factors',
      'Expected return estimates',
      'Hedge ratios and portfolio weights',
    ],
    strengths: [
      'More interpretable than most ML',
      'Reduces overfitting versus plain OLS',
      'Works well with correlated predictors',
      'Strong baseline model for research workflows',
    ],
    weaknesses: [
      'Still mostly linear',
      'Can miss nonlinear relationships',
      'Sensitive to feature engineering',
      'Coefficients can shift when regimes change',
    ],
    investorTranslation:
      'Use this when you have 100 possible factors and know most are probably noise.',
  },
  {
    id: 'tree-based-methods',
    symbol: 'TR',
    name: 'Tree-Based Methods',
    subtitle: 'Rules, splits, and nonlinear interactions',
    whatItIs:
      'Models that split the data into branches and combine many trees to capture interactions and nonlinear effects.',
    financeUseCase:
      'Useful for detecting when a factor only works in certain macro regimes, or when one signal matters more after another signal has already moved.',
    inputs: [
      'Stock characteristics',
      'Macro regime variables',
      'Factor exposures',
      'Historical returns or classification labels',
    ],
    outputs: [
      'Return forecasts',
      'Classification probabilities',
      'Feature importance',
      'Rule-like splits',
    ],
    strengths: [
      'Captures nonlinear relationships',
      'Handles interactions well',
      'Often a strong out-of-sample baseline',
      'Can rank features by importance',
    ],
    weaknesses: [
      'Can overfit noisy financial data',
      'Feature importance can be misleading',
      'Less transparent than linear models',
      'Needs careful walk-forward validation',
    ],
    investorTranslation:
      'Use this when the effect of one factor depends on another factor.',
  },
  {
    id: 'neural-networks',
    symbol: 'NN',
    name: 'Neural Networks',
    subtitle: 'Flexible function approximators',
    whatItIs:
      'Layered models that can learn complex nonlinear functions when enough data and discipline are available.',
    financeUseCase:
      'Useful when the relationship between signals and returns is highly nonlinear, high-dimensional, and interaction-heavy.',
    inputs: [
      'Large panels of firm characteristics',
      'Time-series windows',
      'Alternative data if available',
      'Macro and factor states',
    ],
    outputs: [
      'Expected returns',
      'Probabilities',
      'Embeddings or latent features',
      'Regime-sensitive predictions',
    ],
    strengths: [
      'Very flexible',
      'Captures complex nonlinearities',
      'Useful with larger datasets',
      'Can combine many signal types',
    ],
    weaknesses: [
      'Easy to overfit',
      'Harder to explain',
      'Requires more data and validation discipline',
      'Can produce false confidence',
    ],
    investorTranslation:
      'Use this when relationships may be complex, but only if you have enough data and strong validation.',
  },
  {
    id: 'support-vector-machines',
    symbol: 'SVM',
    name: 'Support Vector Machines',
    subtitle: 'Decision boundaries with margins',
    whatItIs:
      'A classifier that tries to find a clean boundary between groups, sometimes with kernels for nonlinear separation.',
    financeUseCase:
      'Useful for classification problems such as outperform versus underperform or crisis versus normal market states.',
    inputs: [
      'Factor characteristics',
      'Macro indicators',
      'Risk metrics',
      'Labels such as outperform or underperform',
    ],
    outputs: [
      'Classification boundary',
      'Class predictions',
      'Margin-based confidence proxy',
    ],
    strengths: [
      'Works well in some smaller datasets',
      'Strong classification intuition',
      'Kernel methods can model nonlinear boundaries',
    ],
    weaknesses: [
      'Can be hard to scale',
      'Less interpretable with kernels',
      'Probability outputs are not natural',
      'Often displaced by tree boosting in tabular finance work',
    ],
    investorTranslation:
      'Use this when you want a clean classification boundary.',
  },
  {
    id: 'bayesian-methods',
    symbol: 'BY',
    name: 'Bayesian Methods',
    subtitle: 'Priors, uncertainty, and belief updating',
    whatItIs:
      'Methods that start with prior beliefs and update them using data, producing distributions rather than only point estimates.',
    financeUseCase:
      'Very useful in markets because data is noisy, sample sizes are limited, and the honest answer is often a range rather than a single value.',
    inputs: [
      'Prior assumptions',
      'Historical data',
      'Factor returns',
      'Forecast distributions',
      'Macro or regime beliefs',
    ],
    outputs: [
      'Posterior estimates',
      'Credible intervals',
      'Probability distributions',
      'Shrunk forecasts',
    ],
    strengths: [
      'Makes uncertainty explicit',
      'Useful when data is limited',
      'Natural fit for investment judgment',
      'Helps combine human priors with data',
    ],
    weaknesses: [
      'Priors can dominate results',
      'Computationally more complex',
      'Harder to communicate if done poorly',
      'Can create false precision if assumptions are bad',
    ],
    investorTranslation:
      'Use this when the honest answer is a probability distribution, not a point estimate.',
  },
  {
    id: 'ensembles',
    symbol: 'ENS',
    name: 'Ensembles',
    subtitle: 'Do not ask one model to be a prophet',
    whatItIs:
      'A combination of multiple imperfect models so the portfolio process does not depend on one fragile specification.',
    financeUseCase:
      'Useful when you want to combine factor scores, macro signals, and several model views into one governance-friendly framework.',
    inputs: [
      'Forecasts from different models',
      'Factor scores',
      'Macro regime indicators',
      'Historical model performance',
    ],
    outputs: [
      'Combined expected return',
      'Model disagreement',
      'Confidence score',
      'Scenario distribution',
    ],
    strengths: [
      'Reduces single-model fragility',
      'Lets models specialize',
      'Captures uncertainty through disagreement',
      'More realistic for investment use',
    ],
    weaknesses: [
      'Can hide bad assumptions',
      'Needs governance',
      'More complex to explain',
      'Still vulnerable to regime breaks',
    ],
    investorTranslation:
      'Use this when no single model deserves full trust.',
  },
];
