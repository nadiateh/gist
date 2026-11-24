
import { useState } from "react";

import SearchBar from "./components/SearchBar";
import ResultSection from "./components/ResultSection";

import { explainText } from "./services/api";

import type {
  ExplanationResponse
} from "./types/explanation";

import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [context, setContext] = useState("");

  const [result, setResult] =
    useState<ExplanationResponse | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleExplain() {
    if (!text.trim() || loading) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await explainText({
        text: text.trim(),
        context: context.trim() || null
      });

      setResult(response);

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to explain this text."
      );

    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setText("");
    setContext("");
    setResult(null);
    setError("");
  }

  return (
    <main className="app">

      <nav className="navbar">
        <a
          href="/"
          className="brand"
          onClick={(event) => {
            event.preventDefault();
            handleReset();
          }}
        >
          <span className="brand-mark">g.</span>
          gist
        </a>

        <span className="nav-caption">
          A simpler way to understand
        </span>
      </nav>

      <section className="hero">

        <p className="eyebrow">
          YOUR PERSONAL AI DICTIONARY
        </p>

        <h1>
          Make sense of
          <br />
          <span>anything.</span>
        </h1>

        <p className="hero-description">
          Unfamiliar words, complicated phrases, or
          difficult sentences. Gist breaks them down
          into something you can actually understand.
        </p>

        <div className="search-container">
          <SearchBar
            text={text}
            context={context}
            loading={loading}
            onTextChange={setText}
            onContextChange={setContext}
            onSubmit={handleExplain}
          />
        </div>

        {!result && !loading && (
          <div className="suggestions">
            <span>Try:</span>

            {["Ambiguous", "Break the ice", "Polymorphism"].map(
              (word) => (
                <button
                  key={word}
                  onClick={() => setText(word)}
                >
                  {word}
                </button>
              )
            )}
          </div>
        )}

      </section>

      <section className="content-area">

        {loading && (
          <div className="loading-state">
            <div className="loading-spinner" />

            <h3>Making sense of it...</h3>

            <p>
              Gist is preparing your explanation.
            </p>
          </div>
        )}

        {error && (
          <div className="error-state" role="alert">
            <h3>Something went wrong</h3>

            <p>{error}</p>

            <button onClick={handleExplain}>
              Try again
            </button>
          </div>
        )}

        {result && !loading && (
          <>
            <div className="result-actions">
              <span>YOUR RESULT</span>

              <button onClick={handleReset}>
                New search ↗
              </button>
            </div>

            <ResultSection result={result} />
          </>
        )}

      </section>

      <footer className="footer">
        <span>gist.</span>
        <p>Understand more. Overthink less.</p>
      </footer>

    </main>
  );
}

export default App;
