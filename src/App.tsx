import { useMemo, useState } from 'react';
import { algorithms } from './data/algorithms';
import { useCases } from './data/useCases';
import { glossary } from './data/glossary';
import { analogyFramework, betterWorkflow, futureRoadmap, oldWorkflow } from './data/framework';

const sectionLinks = [
  { href: '#hero', label: 'Hero' },
  { href: '#why-this-matters', label: 'Why this matters' },
  { href: '#algorithm-map', label: 'Algorithm map' },
  { href: '#use-cases', label: 'Finance use cases' },
  { href: '#ensemble-mindset', label: 'Ensemble mindset' },
  { href: '#glossary', label: 'Glossary' },
  { href: '#next-steps', label: 'Resources / next steps' },
];

const warningPoints = [
  'Do not train on future data.',
  'Do not use revised data without knowing it.',
  'Do not ignore delisted companies.',
  'Do not randomly shuffle time-series data as if markets were iid.',
  'Prefer walk-forward validation.',
];

const regimeSource = {
  label: 'Market Regime Detection via Realized Covariances',
  url: 'https://arxiv.org/abs/2104.03667',
};

const regimeBands = [
  { label: 'Calm', x: 0, width: 36, color: '#007ea7', opacity: 0.16 },
  { label: 'Transition', x: 36, width: 14, color: '#00a8e8', opacity: 0.18 },
  { label: 'High-vol', x: 50, width: 22, color: '#003459', opacity: 0.18 },
  { label: 'Calm', x: 72, width: 28, color: '#007ea7', opacity: 0.16 },
];

const regimeLinePoints = [
  [0, 78],
  [10, 74],
  [20, 68],
  [30, 63],
  [36, 54],
  [44, 48],
  [50, 36],
  [58, 28],
  [64, 22],
  [72, 34],
  [80, 46],
  [88, 40],
  [100, 32],
];

function RegimeChart() {
  const polylinePoints = regimeLinePoints.map(([x, y]) => `${x},${y}`).join(' ');

  return (
    <div className="regime-chart" aria-label="Stylized regime detection chart">
      <svg viewBox="0 0 100 92" role="img" aria-hidden="true">
        <rect x="0" y="0" width="100" height="92" rx="10" fill="#f6fbfe" />
        {regimeBands.map((band) => (
          <g key={band.label}>
            <rect
              x={band.x}
              y="10"
              width={band.width}
              height="52"
              rx="6"
              fill={band.color}
              opacity={band.opacity}
            />
          </g>
        ))}
        <polyline
          points={polylinePoints}
          fill="none"
          stroke="#00171f"
          strokeWidth="1.8"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {regimeLinePoints.map(([x, y], index) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={index === 6 ? 2.8 : 1.7} fill="#00171f" />
        ))}
        <line x1="0" y1="62" x2="100" y2="62" stroke="#003459" strokeOpacity="0.18" />
        <text x="2" y="87" fontSize="4.1" fill="#003459">
          Calm
        </text>
        <text x="42" y="87" fontSize="4.1" fill="#003459">
          Transition
        </text>
        <text x="80" y="87" fontSize="4.1" fill="#003459">
          High-vol
        </text>
      </svg>
      <div className="regime-legend" aria-hidden="true">
        {regimeBands.slice(0, 3).map((band) => (
          <span key={band.label} className="regime-legend__item">
            <span className="regime-legend__swatch" style={{ background: band.color, opacity: 1 }} />
            {band.label}
          </span>
        ))}
      </div>
      <p className="regime-chart__note">
        Stylized from a published VLSTAR regime-detection model on monthly realized covariances.
      </p>
      <a className="source-link source-link--small" href={regimeSource.url} target="_blank" rel="noreferrer">
        Source: {regimeSource.label}
      </a>
    </div>
  );
}

function SelectionFunnel() {
  return (
    <svg viewBox="0 0 360 240" role="img" aria-label="Factor zoo funnel">
      <defs>
        <linearGradient id="funnelFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#007ea7" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#003459" stopOpacity="0.34" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="360" height="240" rx="18" fill="#f7fbfe" />
      <path
        d="M24 32 H336 L236 116 V186 H124 V116 Z"
        fill="url(#funnelFill)"
        stroke="#007ea7"
        strokeOpacity="0.35"
      />
      <rect x="32" y="30" width="296" height="22" rx="11" fill="#007ea7" fillOpacity="0.1" />
      <text x="180" y="45" textAnchor="middle" fontSize="14" fill="#003459" fontWeight="700">
        191 short-term signals + 151 fundamental controls
      </text>
      <rect x="92" y="112" width="176" height="18" rx="9" fill="#00a8e8" fillOpacity="0.12" />
      <text x="180" y="126" textAnchor="middle" fontSize="13" fill="#003459" fontWeight="700">
        Double-selection LASSO keeps what survives the controls
      </text>
      <rect x="122" y="176" width="116" height="24" rx="12" fill="#003459" fillOpacity="0.9" />
      <text x="180" y="192" textAnchor="middle" fontSize="16" fill="#fff" fontWeight="800">
        17 retained factors
      </text>
      <text x="180" y="222" textAnchor="middle" fontSize="12" fill="#003459">
        Significant incremental explanatory power
      </text>
    </svg>
  );
}

function SectorCoverageBars() {
  const bars = [
    { label: 'Exclusive lasso', value: 12, color: '#003459' },
    { label: 'Lasso', value: 10, color: '#007ea7' },
    { label: 'Group lasso', value: 6, color: '#00a8e8' },
  ];

  return (
    <svg viewBox="0 0 360 230" role="img" aria-label="Sector coverage comparison">
      <rect x="0" y="0" width="360" height="230" rx="18" fill="#f7fbfe" />
      <text x="20" y="28" fontSize="14" fill="#003459" fontWeight="700">
        Sector breadth in the index-tracking study
      </text>
      {bars.map((bar, index) => {
        const width = (bar.value / 12) * 220;
        const y = 54 + index * 50;
        return (
          <g key={bar.label}>
            <text x="20" y={y + 16} fontSize="13" fill="#00171f">
              {bar.label}
            </text>
            <rect x="130" y={y} width={width} height="24" rx="10" fill={bar.color} fillOpacity="0.18" />
            <rect x="130" y={y} width={Math.max(width, 12)} height="24" rx="10" fill={bar.color} />
            <text x={130 + width + 10} y={y + 16} fontSize="12" fill="#003459" fontWeight="700">
              {bar.value}/12
            </text>
          </g>
        );
      })}
      <text x="20" y="205" fontSize="12" fill="#003459">
        The paper reports visibly better out-of-sample performance for exclusive lasso.
      </text>
    </svg>
  );
}

function App() {
  const [selectedAlgorithmId, setSelectedAlgorithmId] = useState(algorithms[0]?.id ?? '');
  const [hoveredAlgorithmId, setHoveredAlgorithmId] = useState<string | null>(null);

  const activeAlgorithm = useMemo(() => {
    const activeId = hoveredAlgorithmId ?? selectedAlgorithmId;
    return algorithms.find((algorithm) => algorithm.id === activeId) ?? algorithms[0];
  }, [hoveredAlgorithmId, selectedAlgorithmId]);

  const handleAlgorithmClick = (id: string) => {
    setSelectedAlgorithmId((current) => (current === id ? algorithms[0]?.id ?? id : id));
  };

  return (
    <div className="app-shell">
      <a className="skip-link" href="#hero">
        Skip to content
      </a>

      <header className="topbar">
        <div className="topbar__brand">
          <span className="brand-mark">ML</span>
          <div>
            <p className="topbar__eyebrow">Finance research primer</p>
            <p className="topbar__title">Machine Learning for Factor Investing</p>
          </div>
        </div>
        <nav className="topbar__nav" aria-label="Section navigation">
          {sectionLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section className="hero section" id="hero">
          <div className="hero__copy">
            <p className="eyebrow">Practical, skeptical, finance-native</p>
            <h1>Machine learning for factor investing is not about replacing judgment.</h1>
            <p className="hero__lede">
              It is about turning thousands of noisy observations into structured probability,
              regime awareness, and testable investment narratives.
            </p>
            <p className="hero__support">
              The right use of ML is not a magic answer machine. It helps structure uncertainty,
              detect nonlinear relationships, and test factor behaviour more honestly than a
              single point estimate.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="#algorithm-map">
                Explore the algorithm map
              </a>
              <a className="button button--secondary" href="#why-this-matters">
                Why this matters
              </a>
            </div>
          </div>
          <aside className="hero__panel">
            <div className="stat-card">
              <p className="stat-card__label">Core message</p>
              <p className="stat-card__value">Probability over prophecy</p>
              <p className="stat-card__copy">
                ML helps you map uncertainty, not pretend the market is a deterministic spreadsheet.
              </p>
            </div>
            <div className="regime-card">
              <p className="mini-stat__label">Regime</p>
              <div className="regime-card__head">
                <strong>Spot the shift, then adapt the playbook</strong>
                <span className="regime-card__tag">VLSTAR</span>
              </div>
              <RegimeChart />
            </div>
            <div className="stat-stack">
              <div className="mini-stat">
                <span>Signal</span>
                <strong>Extract it without overfitting it</strong>
              </div>
              <div className="mini-stat">
                <span>Governance</span>
                <strong>Prefer validation discipline over elegant stories</strong>
              </div>
            </div>
          </aside>
        </section>

        <section className="section section--band" id="why-this-matters">
          <div className="section-heading">
            <p className="eyebrow">Why this matters</p>
            <h2>Why point estimates fail in investing</h2>
          </div>
          <div className="two-column">
            <article className="card card--wide">
              <h3>Old workflow</h3>
              <div className="workflow">
                {oldWorkflow.map((step, index) => (
                  <div className="workflow__step" key={step.title}>
                    <span className="workflow__index">{index + 1}</span>
                    <div>
                      <h4>{step.title}</h4>
                      <p>{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
            <article className="card card--wide card--accent">
              <h3>Modern workflow</h3>
              <div className="workflow">
                {betterWorkflow.map((step, index) => (
                  <div className="workflow__step" key={step.title}>
                    <span className="workflow__index">{index + 1}</span>
                    <div>
                      <h4>{step.title}</h4>
                      <p>{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
          <div className="callout">
            <p>
              Company guidance is usually a single path, but markets price distributions. A DCF
              target can look precise while being extremely sensitive to terminal value, margins,
              discount rate, and revenue assumptions.
            </p>
            <p>
              ML should therefore be framed as a way to map conditional probabilities, not as a
              magic answer machine.
            </p>
          </div>
        </section>

        <section className="section" id="algorithm-map">
          <div className="section-heading">
            <p className="eyebrow">Interactive algorithm map</p>
            <h2>Choose the model family, then inspect the trade-offs</h2>
          </div>

          <div className="map-layout">
            <div className="algorithm-grid" role="list" aria-label="Algorithm families">
              {algorithms.map((algorithm) => {
                const isActive = algorithm.id === activeAlgorithm?.id;
                const isPinned = algorithm.id === selectedAlgorithmId;

                return (
                  <button
                    key={algorithm.id}
                    type="button"
                    className={`algorithm-card ${isActive ? 'is-active' : ''}`}
                    role="listitem"
                    aria-pressed={isPinned}
                    onMouseEnter={() => setHoveredAlgorithmId(algorithm.id)}
                    onMouseLeave={() => setHoveredAlgorithmId(null)}
                    onFocus={() => setHoveredAlgorithmId(algorithm.id)}
                    onBlur={() => setHoveredAlgorithmId(null)}
                    onClick={() => handleAlgorithmClick(algorithm.id)}
                  >
                    <div className="algorithm-card__symbol-wrap">
                      {isPinned ? <span className="pill pill--floating">Pinned</span> : null}
                      <span className="algorithm-card__symbol">{algorithm.symbol}</span>
                    </div>
                    <div className="algorithm-card__body">
                      <div className="algorithm-card__header">
                        <h3>{algorithm.name}</h3>
                      </div>
                      <p>{algorithm.subtitle}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <aside className="detail-panel card" aria-live="polite">
              <div className="detail-panel__top">
                <div>
                  <p className="eyebrow">Expanded panel</p>
                  <h3>{activeAlgorithm?.name}</h3>
                  <p className="detail-panel__subtitle">{activeAlgorithm?.subtitle}</p>
                </div>
                <div className="detail-panel__icon">{activeAlgorithm?.symbol}</div>
              </div>

              <div className="detail-section">
                <h4>What it is</h4>
                <p>{activeAlgorithm?.whatItIs}</p>
              </div>
              <div className="detail-section">
                <h4>Finance use case</h4>
                <p>{activeAlgorithm?.financeUseCase}</p>
              </div>
              <div className="detail-section">
                <h4>Prime literature example</h4>
                <p>{activeAlgorithm?.researchExample.summary}</p>
                <p className="evidence-meta">
                  Inputs: [{activeAlgorithm?.researchExample.inputs.join('; ')}]
                  <br />
                  Outputs: [{activeAlgorithm?.researchExample.outputs.join('; ')}]
                </p>
                <a
                  className="source-link"
                  href={activeAlgorithm?.researchExample.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Source: {activeAlgorithm?.researchExample.sourceLabel}
                </a>
              </div>
              {activeAlgorithm?.researchHighlights?.length ? (
                <div className="research-gallery">
                  <div className="detail-section">
                    <h4>Visual research highlights</h4>
                    <p className="research-gallery__intro">
                      These cards show how the method works in practice: one graph for signal
                      reduction, one for sparse portfolio construction.
                    </p>
                  </div>
                  <div className="research-gallery__grid">
                    {activeAlgorithm.researchHighlights.map((highlight) => {
                      const firstMetric = highlight.metrics[0];
                      const maxMetric = Math.max(...highlight.metrics.map((metric) => metric.max ?? metric.value));

                      return (
                        <article className="research-highlight-card" key={highlight.title}>
                          <div className="research-highlight-card__head">
                            <div>
                              <p className="research-highlight-card__eyebrow">Evidence-backed view</p>
                              <h5>{highlight.title}</h5>
                            </div>
                          </div>
                          <p className="research-highlight-card__summary">{highlight.summary}</p>
                          <div className="research-highlight-card__visual">
                            {highlight.kind === 'funnel' ? <SelectionFunnel /> : <SectorCoverageBars />}
                          </div>
                          <div className="research-highlight-card__meta">
                            <div className="research-highlight-card__kv">
                              <span>Inputs</span>
                              <p>[{highlight.inputs.join('; ')}]</p>
                            </div>
                            <div className="research-highlight-card__kv">
                              <span>Outputs</span>
                              <p>[{highlight.outputs.join('; ')}]</p>
                            </div>
                            <div className="research-highlight-card__bars" aria-hidden="true">
                              {highlight.metrics.map((metric) => {
                                const width = `${(metric.value / maxMetric) * 100}%`;
                                return (
                                  <div className="research-highlight-card__barRow" key={metric.label}>
                                    <span>{metric.label}</span>
                                    <div className="research-highlight-card__barTrack">
                                      <div
                                        className="research-highlight-card__barFill"
                                        style={{ width }}
                                      />
                                    </div>
                                    <strong>{metric.value}</strong>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          <p className="research-highlight-card__takeaway">{highlight.takeaway}</p>
                          <a
                            className="source-link source-link--small"
                            href={highlight.sourceUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Source: {highlight.sourceLabel}
                          </a>
                        </article>
                      );
                    })}
                  </div>
                </div>
              ) : null}
              <div className="detail-grid">
                <div className="detail-block">
                  <h4>Inputs</h4>
                  <ul>
                    {activeAlgorithm?.inputs.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="detail-block">
                  <h4>Outputs</h4>
                  <ul>
                    {activeAlgorithm?.outputs.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="detail-grid">
                <div className="detail-block">
                  <h4>Strengths</h4>
                  <ul>
                    {activeAlgorithm?.strengths.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="detail-block">
                  <h4>Weaknesses</h4>
                  <ul>
                    {activeAlgorithm?.weaknesses.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="investor-translation">
                <span>Investor translation</span>
                <p>{activeAlgorithm?.investorTranslation}</p>
              </div>
            </aside>
          </div>
        </section>

        <section className="section" id="use-cases">
          <div className="section-heading">
            <p className="eyebrow">Factor investing examples</p>
            <h2>Practical questions this toolbox can help answer</h2>
          </div>
          <div className="card-grid card-grid--three">
            {useCases.map((item) => (
              <article className="card" key={item.id}>
                <p className="card__label">{item.title}</p>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="ensemble-mindset">
          <div className="section-heading">
            <p className="eyebrow">Compression story / analogy engine</p>
            <h2>Think like an ensemble investor</h2>
          </div>

          <div className="card card--wide">
            <p className="section-intro">
              The end product should not be: <strong>“Model predicts 8.7% return.”</strong>
            </p>
            <p className="section-intro">
              The better product is a structured narrative that says what is similar, what is
              different, what the difference implies, and what would falsify the analogy.
            </p>
          </div>

          <div className="two-column two-column--tight">
            <article className="card card--wide">
              <h3>Analogy framework</h3>
              <div className="workflow workflow--compact">
                {analogyFramework.map((step, index) => (
                  <div className="workflow__step" key={step.title}>
                    <span className="workflow__index">{index + 1}</span>
                    <div>
                      <h4>{step.title}</h4>
                      <p>{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="card card--wide card--highlight">
              <h3>Bias warning</h3>
              <p className="bias-title">Finance ML dies by data leakage.</p>
              <ul className="warning-list">
                {warningPoints.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
              <p className="bias-note">
                Walk-forward validation is the default discipline. Random shuffles are a bad proxy
                for markets.
              </p>
            </article>
          </div>
        </section>

        <section className="section section--band" id="glossary">
          <div className="section-heading">
            <p className="eyebrow">Mini glossary</p>
            <h2>Core terms worth keeping straight</h2>
          </div>
          <div className="card-grid card-grid--two">
            {glossary.map((term) => (
              <article className="card glossary-card" key={term.term}>
                <h3>{term.term}</h3>
                <p>{term.definition}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="next-steps">
          <div className="section-heading">
            <p className="eyebrow">Future modules</p>
            <h2>What comes next</h2>
          </div>
          <div className="card-grid card-grid--three">
            {futureRoadmap.map((item) => (
              <article className="card roadmap-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
          <div className="resources-bar">
            <div>
              <p className="resources-bar__label">Resources / next steps</p>
              <p>
                Use the site as a primer first, then layer in public data exercises and model
                demonstrations once the basics of leakage, validation, and regime framing are
                clear.
              </p>
            </div>
            <a className="button button--secondary" href="#hero">
              Back to top
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          Built as a practical primer for finance professionals learning machine learning for
          factor investing.
        </p>
      </footer>
    </div>
  );
}

export default App;
