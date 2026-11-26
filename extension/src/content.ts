
interface ExtensionMessage {
    type: string;
}

interface ExplanationResult {
    input_text: string;
    content_type: "word" | "phrase" | "sentence";
    part_of_speech: string | null;
    plain_explanation: string;
    kid_explanation: string;
    examples: string[];
    synonyms: string[];
    antonyms: string[];
    context_explanation: string | null;
}

function getSelectedContext(): string | null {
    const selection = window.getSelection();

    if (!selection || selection.rangeCount === 0) {
        return null;
    }

    const selectedText = selection.toString().trim();

    if (!selectedText) {
        return null;
    }

    const range = selection.getRangeAt(0);

    const parent = range.commonAncestorContainer;

    const element =
        parent.nodeType === Node.TEXT_NODE
            ? parent.parentElement
            : parent as Element;

    const surroundingText =
        element?.textContent?.trim() || "";

    if (!surroundingText) {
        return null;
    }

    // Limit context to a small amount of nearby text.
    const index = surroundingText.indexOf(selectedText);

    if (index === -1) {
        return surroundingText.slice(0, 500);
    }

    const start = Math.max(0, index - 250);

    const end = Math.min(
        surroundingText.length,
        index + selectedText.length + 250
    );

    return surroundingText.slice(start, end);
}


// Listen for messages from the background service worker.
chrome.runtime.onMessage.addListener(
    (
        message: ExtensionMessage & {
            result?: ExplanationResult;
            message?: string;
        },
        _sender,
        sendResponse
    ) => {

        if (message.type === "GET_CONTEXT") {
            sendResponse({
                context: getSelectedContext()
            });

            return;
        }

        if (message.type === "GIST_RESULT") {
            console.log("Gist result:", message.result);

            // Stage 5 will replace this with the floating popup.
            alert(
                `${message.result?.input_text}\n\n` +
                `${message.result?.plain_explanation}\n\n` +
                `For a kid:\n${message.result?.kid_explanation}`
            );

            return;
        }

        if (message.type === "GIST_ERROR") {
            alert(message.message || "Gist encountered an error.");
        }
    }
);
