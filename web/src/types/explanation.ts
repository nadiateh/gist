
export interface ExplanationRequest {
    text: string;
    context: string | null;
}

export interface ExplanationResponse {
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
