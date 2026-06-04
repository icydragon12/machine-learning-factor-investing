export type AlgorithmCard = {
  id: string;
  symbol: string;
  name: string;
  subtitle: string;
  whatItIs: string;
  financeUseCase: string;
  researchExample: {
    summary: string;
    inputs: string[];
    outputs: string[];
    sourceLabel: string;
    sourceUrl: string;
  };
  inputs: string[];
  outputs: string[];
  strengths: string[];
  weaknesses: string[];
  investorTranslation: string;
  researchHighlights?: ResearchHighlight[];
};

export type ResearchHighlight = {
  kind: 'funnel' | 'coverage';
  title: string;
  summary: string;
  takeaway: string;
  inputs: string[];
  outputs: string[];
  sourceLabel: string;
  sourceUrl: string;
  metrics: { label: string; value: number; max?: number }[];
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
    researchExample: {
      summary:
        'Prime example: a double-selection LASSO study started with a huge factor zoo and then squeezed it down to a much smaller, cleaner shortlist. The model screened 191 short-term trading signals against 151 established fundamental controls in the U.S. S&P 500 universe and retained 17 price-volume and microstructure signals with significant incremental explanatory power.',
      inputs: [
        '191 short-term trading signals',
        '151 established fundamental factors',
        'U.S. S&P 500 stock returns',
        'Monthly rebalancing universe',
      ],
      outputs: [
        '17 selected trading factors',
        'Incremental explanatory power',
        'Significance flags after controlling for fundamentals',
      ],
      sourceLabel:
        'Cross-Market Alpha: Testing Short-Term Trading Factors in the U.S. Market via Double-Selection LASSO',
      sourceUrl: 'https://arxiv.org/abs/2601.06499',
    },
    researchHighlights: [
      {
        kind: 'funnel',
        title: 'Factor zoo funnel',
        summary:
          'This is the cleanest finance-native story: start with a very wide signal zoo, control for the slow fundamental model, and keep only the signals that still matter.',
        takeaway:
          'The win is not “magic alpha from nowhere.” It is a narrower, more defensible signal set with incremental explanatory power after the benchmark controls are already in place.',
        inputs: [
          '191 short-term trading signals',
          '151 established fundamental controls',
        ],
        outputs: ['17 retained signals', 'Significant incremental explanatory power'],
        sourceLabel:
          'Cross-Market Alpha: Testing Short-Term Trading Factors in the U.S. Market via Double-Selection LASSO',
        sourceUrl: 'https://arxiv.org/abs/2601.06499',
        metrics: [
          { label: 'Short-term signals', value: 191, max: 191 },
          { label: 'Fundamental controls', value: 151, max: 191 },
          { label: 'Retained factors', value: 17, max: 191 },
        ],
      },
      {
        kind: 'coverage',
        title: 'Sparse index tracking',
        summary:
          'The exclusive lasso paper shows another nice finance use case: use sparsity to build a portfolio that still covers the market instead of collapsing into only a few sectors.',
        takeaway:
          'The paper reports that the exclusive lasso portfolio covered all 12 sectors, compared with 10 for lasso and 6 for group lasso, and delivered visibly better out-of-sample performance.',
        inputs: ['3,074 U.S. stocks', '90-trading-day rolling window', '12-sector universe'],
        outputs: ['Portfolio weights', 'Sector coverage', 'Out-of-sample cumulative return'],
        sourceLabel: 'Optimal Portfolio Using Factor Graphical Lasso',
        sourceUrl: 'https://arxiv.org/abs/2011.00435',
        metrics: [
          { label: 'Exclusive lasso', value: 12, max: 12 },
          { label: 'Lasso', value: 10, max: 12 },
          { label: 'Group lasso', value: 6, max: 12 },
        ],
      },
    ],
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
    researchExample: {
      summary:
        'Prime example: a random forest study on S&P 500 constituents used closing-price returns, opening-price returns, and intraday returns to forecast directional moves; the multi-feature setup delivered 0.54% average daily return before transaction costs, beating the single-feature setup.',
      inputs: [
        'S&P 500 constituent stocks',
        'Closing-price returns',
        'Opening-price returns',
        'Intraday returns',
        '1993-2018 sample window',
      ],
      outputs: [
        'Directional probability forecasts',
        'Top-10 / bottom-10 long-short rankings',
        'Average daily trading return',
      ],
      sourceLabel:
        'Forecasting directional movements of stock prices for intraday trading using LSTM and random forests',
      sourceUrl: 'https://arxiv.org/abs/2004.10178',
    },
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
    researchExample: {
      summary:
        'Prime example: a deep asset-pricing model used firm-level conditioning information, a no-arbitrage loss, adversarial test assets, and macro time series to predict individual stock returns; it outperformed benchmark approaches out of sample in Sharpe ratio, explained variation, and pricing errors.',
      inputs: [
        'Firm-level conditioning information',
        'Macro time series',
        'Adversarially constructed test assets',
        'Time-varying stock return panels',
      ],
      outputs: [
        'Expected return estimates',
        'Asset-pricing model fit',
        'Sharpe ratio and pricing-error diagnostics',
        'Key factors driving prices',
      ],
      sourceLabel: 'Deep Learning in Asset Pricing',
      sourceUrl: 'https://arxiv.org/abs/1904.00745',
    },
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
    researchExample: {
      summary:
        'Prime example: one study paired sentiment analysis on 2.3 million Chinese financial news items with SVM/SVR models to predict stock tendency and prices, reporting that news-driven effects were detectable and often persisted for less than two days.',
      inputs: [
        '2,302,692 Chinese financial news items',
        'Domain stop-word dictionary',
        'Sentiment dictionary',
        'Historical stock data',
      ],
      outputs: [
        'Stock tendency classification',
        'Stock price / return forecasts',
        'SVR and SVC parameter diagnostics',
      ],
      sourceLabel:
        'Stock Market Forecasting Based on Text Mining Technology: A Support Vector Machine Method',
      sourceUrl: 'https://arxiv.org/abs/1909.12789',
    },
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
    researchExample: {
      summary:
        'Prime example: a Bayesian hierarchical market-timing model used lagged fundamental characteristics to estimate conditional expected returns and covariance jointly, and it outperformed most alternatives in point and interval prediction while delivering a 0.92% average monthly sector return and a 0.32% significant Jensen alpha.',
      inputs: [
        'Lagged fundamental characteristics',
        'Asset returns',
        'Covariance matrix estimation',
        'Prior beliefs across assets and sectors',
      ],
      outputs: [
        'Conditional expected returns',
        'Covariance matrix estimates',
        'Posterior predictive distributions',
        'Sector weights and alpha diagnostics',
      ],
      sourceLabel: 'Factor Investing: A Bayesian Hierarchical Approach',
      sourceUrl: 'https://arxiv.org/abs/1902.01015',
    },
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
    researchExample: {
      summary:
        'Prime example: an ensemble Gaussian-process model predicted conditional expected stock returns from stock-level and macro-economic information on U.S. equities from 1962 to 2016, and it dominated existing machine-learning models in out-of-sample R-squared and Sharpe ratio of prediction-sorted portfolios.',
      inputs: [
        'Stock-level characteristics',
        'Macro-economic information',
        'U.S. cross-sectional stock data',
        'Historical return panels from 1962-2016',
      ],
      outputs: [
        'Conditional expected returns',
        'Prediction uncertainty distribution',
        'Prediction-sorted portfolio weights',
      ],
      sourceLabel: 'Empirical Asset Pricing via Ensemble Gaussian Process Regression',
      sourceUrl: 'https://arxiv.org/abs/2212.01048',
    },
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
