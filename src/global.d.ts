// Global declarations for TypeScript

// Google Analytics gtag function
declare function gtag(...args: any[]): void;

// Window interface extensions
declare interface Window {
  gtag?: (...args: any[]) => void;
}

// NodeJS namespace for types
declare namespace NodeJS {
  interface Timeout {}
}
