
import type {
    ExplanationRequest,
    ExplanationResponse
} from "../types/explanation";

const API_URL =
    import.meta.env.VITE_API_BASE_URL ||
    "http://127.0.0.1:8000";

export async function explainText(
    request: ExplanationRequest
): Promise<ExplanationResponse> {

    const response = await fetch(
        `${API_URL}/api/explain`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(request)
        }
    );

    if (!response.ok) {
        const errorData = await response.json();

        throw new Error(
            errorData.detail || "Something went wrong."
        );
    }

    return response.json();
}
