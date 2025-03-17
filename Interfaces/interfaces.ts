export interface Data {
    candidates:    Candidate[];
    usageMetadata: UsageMetadata;
    modelVersion:  string;
}

export interface Candidate {
    content:          Content;
    finishReason:     string;
    citationMetadata: CitationMetadata;
    avgLogprobs:      number;
}

export interface CitationMetadata {
    citationSources: CitationSource[];
}

export interface CitationSource {
    startIndex: number;
    endIndex:   number;
    uri?:       string;
}

export interface Content {
    parts: Part[];
    role:  string;
}

export interface Part {
    text: string;
}

export interface UsageMetadata {
    promptTokenCount:        number;
    candidatesTokenCount:    number;
    totalTokenCount:         number;
    promptTokensDetails:     TokensDetail[];
    candidatesTokensDetails: TokensDetail[];
}

export interface TokensDetail {
    modality:   string;
    tokenCount: number;
}
export interface Message {
    date: Date;
    text: string;
    sender: 'user' | 'ai';
  }

export interface Chat {
  id: string; // El ID del chat en Firebase
  create_at: Date;
  messages: Message[];
  title: string;
  userId: string; 
}