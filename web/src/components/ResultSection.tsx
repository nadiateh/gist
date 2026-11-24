
import type {
    ExplanationResponse
} from "../types/explanation";

import ExplanationCard from "./ExplanationCard";

interface ResultSectionProps {
    result: ExplanationResponse;
}

function ResultSection({ result }: ResultSectionProps) {
    return (
        <section className="result-section">

            <div className="result-header">
                <div>
                    <p className="result-label">YOUR EXPLANATION</p>

                    <h2>{result.input_text}</h2>

                    <div className="result-meta">
                        <span>{result.content_type}</span>

                        {result.part_of_speech && (
                            <>
                                <span>·</span>
                                <span>{result.part_of_speech}</span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="explanation-grid">

                <ExplanationCard
                    title="In simple words"
                    description={result.plain_explanation}
                    icon="✦"
                    variant="plain"
                />

                <ExplanationCard
                    title="Explain it to a kid"
                    description={result.kid_explanation}
                    icon="☀"
                    variant="kid"
                />

            </div>

            {result.context_explanation && (
                <section className="additional-section">
                    <h3>Meaning in context</h3>
                    <p>{result.context_explanation}</p>
                </section>
            )}

            <section className="additional-section">
                <h3>Examples</h3>

                <div className="examples-list">
                    {result.examples.map((example, index) => (
                        <div className="example-item" key={index}>
                            <span className="example-number">
                                0{index + 1}
                            </span>

                            <p>{example}</p>
                        </div>
                    ))}
                </div>
            </section>

            <div className="word-details-grid">

                <section className="word-detail">
                    <h3>Similar words</h3>

                    <div className="word-tags">
                        {result.synonyms.length > 0 ? (
                            result.synonyms.map((word, index) => (
                                <span key={index}>{word}</span>
                            ))
                        ) : (
                            <p>None available.</p>
                        )}
                    </div>
                </section>

                <section className="word-detail">
                    <h3>Opposite words</h3>

                    <div className="word-tags">
                        {result.antonyms.length > 0 ? (
                            result.antonyms.map((word, index) => (
                                <span key={index}>{word}</span>
                            ))
                        ) : (
                            <p>None available.</p>
                        )}
                    </div>
                </section>

            </div>

            <p className="result-footer">
                Explained with Gist AI
            </p>

        </section>
    );
}

export default ResultSection;
