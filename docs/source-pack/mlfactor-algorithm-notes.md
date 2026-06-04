# Algorithm Notes

## Penalized regressions

- What it is: Linear models with shrinkage or sparsity penalties.
- Finance use case: Factor selection, hedging, minimum variance portfolios, and interpretable return models.
- Inputs: Returns, characteristics, exposures, covariance estimates.
- Outputs: Coefficients, selected variables, hedge ratios, weights.
- Strengths: Interpretable, stable relative to OLS, good baseline, handles collinearity.
- Weaknesses: Still mostly linear, sensitive to feature engineering, can miss nonlinear effects.
- Common failure modes: Overtrusting coefficients, ignoring regime shifts, treating shrinkage as a cure-all.
- Investor translation: Use when most candidate factors are probably noise.

## Sparse hedging / minimum variance portfolios

- What it is: A constrained portfolio construction problem with regularization to keep the solution sparse and stable.
- Finance use case: Building hedges without creating an unwieldy or fragile position list.
- Inputs: Exposures, risk estimates, constraints, covariance or factor risk models.
- Outputs: Sparse weights, hedge ratios, portfolio risk contributions.
- Strengths: Readable, easier to govern, less unstable than unconstrained optimization.
- Weaknesses: Can under-hedge, depends on input quality, may overreact to estimation error.
- Common failure modes: Overfitting the covariance matrix, hiding risk in ignored exposures.
- Investor translation: Use when you need a hedge that can be understood and defended.

## Tree-based methods

- What it is: Models that split data into rule-like branches and can capture interactions.
- Finance use case: Nonlinear factor interactions, regime-sensitive forecasting, classification problems.
- Inputs: Characteristics, macro states, factor exposures, labels or returns.
- Outputs: Predictions, class probabilities, feature importance, splits.
- Strengths: Flexible, strong tabular baseline, handles interactions well.
- Weaknesses: Can overfit, feature importance can mislead, less transparent than linear models.
- Common failure modes: Too much depth, noisy split chasing, weak walk-forward discipline.
- Investor translation: Use when one signal’s effect depends on another signal.

## Neural networks

- What it is: Flexible layered function approximators.
- Finance use case: Large-scale nonlinear prediction tasks, latent feature learning, mixed signal sets.
- Inputs: Large panels, time windows, alternative data, macro states.
- Outputs: Forecasts, probabilities, embeddings, latent representations.
- Strengths: Very flexible, powerful with enough data, can combine many input types.
- Weaknesses: Data hungry, hard to explain, easy to overfit.
- Common failure modes: False confidence, unstable out-of-sample performance, weak calibration.
- Investor translation: Use only when you have enough data and a serious validation process.

## Support vector machines

- What it is: Margin-based classifiers or regressors, sometimes kernelized.
- Finance use case: Classification of regimes, outperformance states, or event labels.
- Inputs: Features, macro indicators, risk metrics, labels.
- Outputs: Boundaries, class predictions, margin scores.
- Strengths: Clean classification intuition, can work well on smaller datasets.
- Weaknesses: Harder to scale, less transparent, probability outputs are awkward.
- Common failure modes: Using them where tree boosting is easier and more practical, poor calibration.
- Investor translation: Use when you need a crisp boundary rather than a full forecasting machine.

## Bayesian methods

- What it is: A framework for updating prior beliefs with data to produce posterior distributions.
- Finance use case: Forecasts with explicit uncertainty, belief updating, shrinkage, regime-aware views.
- Inputs: Priors, historical data, assumptions, macro beliefs.
- Outputs: Posteriors, credible intervals, probability distributions, shrunk estimates.
- Strengths: Makes uncertainty explicit, good for small samples, aligns with judgment.
- Weaknesses: Sensitive to priors, can become overly complex, can create fake precision.
- Common failure modes: Priors dominating results, poor communication, unjustified certainty.
- Investor translation: Use when the honest answer is a range, not a single number.

## Ensembles

- What it is: A blend of multiple imperfect models.
- Finance use case: Combined forecasts, disagreement tracking, model governance, scenario generation.
- Inputs: Model outputs, factor scores, regime indicators, historical performance.
- Outputs: Combined estimate, disagreement signal, confidence score, scenario distribution.
- Strengths: More robust than a single model, captures specialization and disagreement.
- Weaknesses: Governance burden, can hide poor assumptions, more complex to explain.
- Common failure modes: Naive averaging, double-counting similar models, ignoring regime breaks.
- Investor translation: Use when no single model deserves full trust.
