
interface SearchBarProps {
    text: string;
    context: string;
    loading: boolean;
    onTextChange: (value: string) => void;
    onContextChange: (value: string) => void;
    onSubmit: () => void;
}

function SearchBar({
    text,
    context,
    loading,
    onTextChange,
    onContextChange,
    onSubmit
}: SearchBarProps) {
    return (
        <form
            className="search-form"
            onSubmit={(event) => {
                event.preventDefault();
                onSubmit();
            }}
        >
            <label htmlFor="gist-search">
                WORD OR EXPRESSION
            </label>

            <div className="search-input-wrapper">
                <input
                    id="gist-search"
                    type="text"
                    placeholder="Enter a word, phrase, or sentence..."
                    value={text}
                    onChange={(event) =>
                        onTextChange(event.target.value)
                    }
                    maxLength={5000}
                />

                <button
                    type="submit"
                    disabled={loading || !text.trim()}
                >
                    {loading ? "Explaining..." : "Explain"}
                    <span aria-hidden="true"> →</span>
                </button>
            </div>

            <label htmlFor="gist-context" className="context-label">
                CONTEXT (OPTIONAL)
            </label>

            <textarea
                id="gist-context"
                placeholder="Paste the sentence or paragraph where you found this text..."
                value={context}
                onChange={(event) =>
                    onContextChange(event.target.value)
                }
                maxLength={10000}
                rows={3}
            />

            <p className="input-hint">
                Adding context helps Gist understand the intended meaning.
            </p>
        </form>
    );
}

export default SearchBar;
