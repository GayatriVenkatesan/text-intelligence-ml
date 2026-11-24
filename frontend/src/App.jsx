import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError("Please enter some text to analyse.");
      return;
    }

    setLoading(true);
    setError("");
    setEntities([]);

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Unable to analyse the text.");
      }

      const data = await response.json();
      setEntities(data.entities);
    } catch (err) {
      setError(
        "Unable to connect to the backend. Please check whether FastAPI is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      PER: "person",
      ORG: "organization",
      LOC: "location",
      MISC: "misc",
    };

    return colors[category] || "misc";
  };

  return (
    <div className="app">

      {/* Navigation */}
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">T.</div>
          <div>
            <h2>text intelligence</h2>
            <span>AI TEXT ANALYSIS WORKSPACE</span>
          </div>
        </div>

        <div className="model-status">
          <span className="status-dot"></span>
          BERT NER · MODEL READY
        </div>
      </header>

      {/* Main content */}
      <main className="main-container">

        <section className="intro">
          <span className="eyebrow">INTELLIGENCE / ENTITY EXTRACTION</span>

          <h1>
            Understand what's
            <br />
            <span>hidden in your text.</span>
          </h1>

          <p>
            Discover people, organisations and locations within your text
            using intelligent language processing.
          </p>
        </section>

        {/* Input workspace */}
        <section className="workspace">

          <div className="section-heading">
            <div>
              <span className="step-label">01 / INPUT</span>
              <h3>Your text workspace</h3>
            </div>

            <span className="input-hint">ENGLISH TEXT</span>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing or paste your text here..."
          />

          <div className="input-footer">
            <span>{text.length} characters</span>

            <div className="input-actions">
              <button
                className="clear-button"
                onClick={() => {
                  setText("");
                  setEntities([]);
                  setError("");
                }}
              >
                Clear text
              </button>

              <button
                className="analyze-button"
                onClick={handleAnalyze}
                disabled={loading}
              >
                {loading ? "Analysing..." : "Analyse text"}
                <span>↗</span>
              </button>
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

        </section>

        {/* Results */}
        <section className="results-section">

          <div className="section-heading">
            <div>
              <span className="step-label">02 / OUTPUT</span>
              <h3>Analysis results</h3>
            </div>

            <span className="result-count">
              {entities.length} ENTITIES FOUND
            </span>
          </div>

          {entities.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">✳</div>
              <h3>Your insights will appear here.</h3>
              <p>
                Enter some text above and select Analyse text
                to discover the entities within it.
              </p>
            </div>
          ) : (
            <div className="entity-grid">
              {entities.map((entity, index) => (
                <div className="entity-card" key={index}>

                  <div className="entity-top">
                    <span
                      className={`category-badge ${getCategoryColor(
                        entity.category
                      )}`}
                    >
                      {entity.category}
                    </span>

                    <span className="entity-number">
                      #{String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3>{entity.word}</h3>

                  <div className="confidence-header">
                    <span>Model confidence</span>
                    <strong>
                      {(entity.confidence * 100).toFixed(1)}%
                    </strong>
                  </div>

                  <div className="confidence-track">
                    <div
                      className="confidence-fill"
                      style={{
                        width: `${entity.confidence * 100}%`,
                      }}
                    ></div>
                  </div>

                </div>
              ))}
            </div>
          )}

        </section>

      </main>

      {/* Footer */}
      <footer className="footer">
        <span>TEXT INTELLIGENCE © 2026</span>
        <span>POWERED BY BERT · NAMED ENTITY RECOGNITION</span>
      </footer>

    </div>
  );
}

export default App;