
// Speech Recognition API types
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  // eslint-disable-next-line no-unused-vars
  onresult: (event: SpeechRecognitionEvent) => void;
  // eslint-disable-next-line no-unused-vars
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
}

interface SpeechRecognitionEvent {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  // eslint-disable-next-line no-unused-vars
  item(index: number): SpeechRecognitionResult;
  // eslint-disable-next-line no-unused-vars
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  // eslint-disable-next-line no-unused-vars
  item(index: number): SpeechRecognitionAlternative;
  // eslint-disable-next-line no-unused-vars
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

// eslint-disable-next-line no-redeclare
export declare var SpeechRecognition: {
  prototype: SpeechRecognition;
  new(): SpeechRecognition;
}

declare var webkitSpeechRecognition: {
  prototype: SpeechRecognition;
  new(): SpeechRecognition;
}

// eslint-disable-next-line no-unused-vars
interface Window {
  SpeechRecognition: typeof SpeechRecognition;
  webkitSpeechRecognition: typeof webkitSpeechRecognition;
}