import { canadianFinancialsReportAssetBase } from '../data/reportLinks';

const summaryMetrics = [
  { label: 'Best model', value: 'lasso / full' },
  { label: 'Best universe', value: 'banks_relative_sector' },
  { label: 'Target', value: 'relative_sector' },
  { label: 'Mean rank IC', value: '0.0995' },
  { label: 'Mean hit rate', value: '22.76%' },
  { label: 'Model long-short', value: '0.3137' },
  { label: 'Momentum long-short', value: '-0.0044' },
  { label: 'Forecast rows', value: '1,044' },
  { label: 'Features selected across folds', value: '131' },
  { label: 'Date range', value: '2011-12-31 to 2026-05-31' },
];

const survivingVariables = [
  {
    name: 'rel_mom6_sector',
    explanation: 'Six-month relative momentum versus the sector baseline.',
  },
  {
    name: 'policy_rate_change',
    explanation: 'The change in policy rates, a direct lift on bank sensitivity.',
  },
  {
    name: 'cpi_yoy__stock_bns',
    explanation: 'Inflation sensitivity in the Bank of Nova Scotia name.',
  },
  {
    name: 'cpi_yoy__stock_royal_bank',
    explanation: 'Inflation sensitivity in Royal Bank.',
  },
  {
    name: 'rel_mom1_sector',
    explanation: 'Short-term relative momentum against the sector group.',
  },
  {
    name: 'policy_rate_change__stock_bns',
    explanation: 'An interaction that says BNS reacts differently to rate changes.',
  },
  {
    name: 'unemployment_change_3m__stock_td_bank',
    explanation: 'Three-month labour market change interacting with TD Bank.',
  },
  {
    name: 'financials_etf_vol12',
    explanation: 'Twelve-month volatility in the financials ETF proxy.',
  },
];

const chartCards = [
  {
    title: 'Model comparison by validation rank IC',
    body:
      'The winning setup is the one that keeps the ranking signal while staying readable enough for a finance team to trust.',
    src: 'model_comparison_rank_ic.png',
    alt: 'Bar chart comparing model mean rank IC values',
  },
  {
    title: 'Cumulative long-short performance',
    body:
      'This is the part that matters to a PM: a cleaner spread when the top-ranked banks are held versus the bottom-ranked names.',
    src: 'cumulative_long_short.png',
    alt: 'Line chart showing cumulative long-short performance over time',
  },
  {
    title: 'Monthly rank IC with rolling average',
    body:
      'The signal is more useful when it survives through time instead of only working in a handful of lucky months.',
    src: 'monthly_rank_ic.png',
    alt: 'Bar and line chart showing monthly rank information coefficient',
  },
  {
    title: 'Mean return by ranking bucket',
    body:
      'A good ranking model should separate the winners from the laggards in a way that looks orderly, not random.',
    src: 'bucket_calibration.png',
    alt: 'Bar chart of mean next-month return by ranking bucket',
  },
  {
    title: 'Most active coefficients',
    body:
      'These are the surviving variables. The point is not a giant factor zoo, but a smaller, explainable set of signals that still earn their keep.',
    src: 'top_coefficients.png',
    alt: 'Horizontal bar chart of the largest coefficients in the selected model',
  },
];

function StatList() {
  return (
    <div className="report-stat-grid">
      {summaryMetrics.map((metric) => (
        <article className="report-stat" key={metric.label}>
          <span>{metric.label}</span>
          <strong>{metric.value}</strong>
        </article>
      ))}
    </div>
  );
}

export function CanadianFinancialsReport() {
  return (
    <div className="app-shell report-shell">
      <a className="skip-link" href="#report-intro">
        Skip to content
      </a>

      <header className="topbar topbar--report">
        <div className="topbar__brand">
          <span className="brand-mark">ML</span>
          <div>
            <p className="topbar__eyebrow">Research report</p>
            <p className="topbar__title">Canadian financials penalized regression</p>
          </div>
        </div>
        <nav className="topbar__nav" aria-label="Report navigation">
          <a href="#hero">Back to primer</a>
          <a href="#report-results">Results</a>
          <a href="#report-variables">Variables</a>
        </nav>
      </header>

      <main className="report-main">
        <section className="report-hero section" id="report-intro">
          <div className="card card--wide report-hero__copy">
            <p className="eyebrow">Working project</p>
            <h1>Canadian financials penalized regression</h1>
            <p className="report-hero__lede">
              Penalized regression is just regular regression plus a penalty on coefficient size.
              That penalty pushes weak or redundant variables down, so the model keeps only the
              signals that still matter.
            </p>
            <p className="report-hero__support">
              This walk-forward ranking model uses Canadian bank stocks, BoC and Statistics Canada
              macro data, sector context, and stock momentum to ask a practical question:
              which names look strongest next month once the penalty has done its job?
            </p>
            <div className="report-callout">
              <strong>Why it matters:</strong> a traditional finance reader does not need a bigger
              factor zoo. They need a cleaner list of variables that survive the penalty and a
              result that is easier to defend.
            </div>
            <div className="hero__actions">
              <a className="button button--primary" href="#report-results">
                See the results
              </a>
              <a className="button button--secondary" href="#algorithm-map">
                Back to algorithm map
              </a>
            </div>
          </div>

          <aside className="card report-hero__panel">
            <p className="eyebrow">One glance summary</p>
            <StatList />
            <div className="report-panel-note">
              <p className="report-panel-note__title">What the coefficients mean</p>
              <p>
                A coefficient is the model&apos;s direction and weight for a variable after all the
                other variables are considered. Penalization keeps those weights from getting too
                large and forces weak names toward zero.
              </p>
            </div>
          </aside>
        </section>

        <section className="section" id="report-results">
          <div className="section-heading">
            <p className="eyebrow">Evidence</p>
            <h2>What the walk-forward test said</h2>
          </div>
          <div className="card-grid card-grid--two report-chart-grid">
            {chartCards.map((chart) => (
              <article className="card report-chart-card" key={chart.title}>
                <h3>{chart.title}</h3>
                <p>{chart.body}</p>
                <figure className="report-chart-card__figure">
                  <img src={`${canadianFinancialsReportAssetBase}${chart.src}`} alt={chart.alt} />
                </figure>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="report-variables">
          <div className="section-heading">
            <p className="eyebrow">Survivors</p>
            <h2>Which variables survived the penalty</h2>
          </div>
          <div className="report-variable-grid">
            {survivingVariables.map((item) => (
              <article className="card report-variable-card" key={item.name}>
                <p className="report-variable-card__name">{item.name}</p>
                <p>{item.explanation}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="two-column two-column--tight">
            <article className="card card--wide">
              <p className="eyebrow">Plain English takeaway</p>
              <h3>Why this is better than a plain regression screen</h3>
              <ul className="report-list">
                <li>It handles many correlated inputs without pretending they are independent.</li>
                <li>It shrinks noisy coefficients, so the model is less likely to chase clutter.</li>
                <li>LASSO can zero out weak variables entirely, which makes the story easier to explain.</li>
                <li>The surviving coefficients are the variables that earned their place after the penalty.</li>
              </ul>
            </article>

            <article className="card card--wide card--highlight">
              <p className="eyebrow">Investor translation</p>
              <h3>What a PM should remember</h3>
              <p>
                The value here is not just a higher score. It is a more disciplined ranking
                process: fewer variables, clearer economics, and a result that is easier to
                trust in a live workflow.
              </p>
              <p className="report-note">
                Best result in this run: lasso on the banks-relative-sector universe, with a mean
                rank IC of 0.0995 and a mean hit rate of 22.76%.
              </p>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="resources-bar">
            <div>
              <p className="resources-bar__label">Back to the primer</p>
              <p>
                This page is the concrete Canadian financials example. Use the algorithm map to
                compare it with the other model families.
              </p>
            </div>
            <a className="button button--secondary" href="#hero">
              Return to home
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          A native web report for the Canadian financials penalized-regression workflow.
        </p>
      </footer>
    </div>
  );
}
