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
            <div className="stat-stack">
              <div className="mini-stat">
                <span>Signal</span>
                <strong>Extract it without overfitting it</strong>
              </div>
              <div className="mini-stat">
                <span>Regime</span>
                <strong>Know when the same factor stops behaving the same way</strong>
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
