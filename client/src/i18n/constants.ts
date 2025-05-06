export const LOCALS = {
  EN: 'en',
  UK: 'uk',
} as const;

export type Locale = (typeof LOCALS)[keyof typeof LOCALS];
