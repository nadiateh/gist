
interface ContextData {
    context: string | null;
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

const MENU_ID = "gist-explain";
const API_URL = "http://127.0.0.1:8000/api/explain";

// Create the context menu when the extension is installed.
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.removeAll(() => {
        chrome.contextMenus.create({
            id: MENU_ID,
            title: "Explain with Gist",
            contexts: ["selection"]
        });
    });
});

// Handle clicks on the context menu.
chrome.contextMenus.onClicked.addListener(
    async (info, tab) => {
        // Make sure this is our menu item.
        if (info.menuItemId !== MENU_ID) {
            return;
        }

        // Check that the tab exists and has a valid ID.
        if (typeof tab?.id !== "number") {
            console.error("Gist could not identify the current tab.");
            return;
        }

        const tabId = tab.id;
        const selectedText = info.selectionText?.trim();

        if (!selectedText) {
            return;
        }

        try {
            // Retrieve surrounding text from the content script.
            const contextData: ContextData =
                await chrome.tabs.sendMessage(tabId, {
                    type: "GET_CONTEXT"
                });

            // Send the selected text and context to the backend.
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text: selectedText,
                    context: contextData?.context ?? null
                })
            });

            if (!response.ok) {
                throw new Error(
                    `Gist API returned status ${response.status}`
                );
            }

            const result: ExplanationResult = await response.json();

            // Send the explanation to the content script.
            await chrome.tabs.sendMessage(tabId, {
                type: "GIST_RESULT",
                result
            });

            console.log("Gist explanation completed.");

        } catch (error) {
            console.error("Gist extension error:", error);

            try {
                await chrome.tabs.sendMessage(tabId, {
                    type: "GIST_ERROR",
                    message:
                        "Unable to generate an explanation. Check that Gist's backend is running."
                });
            } catch {
                console.error(
                    "Could not communicate with the webpage."
                );
            }
        }
    }
);
