export const fieldId = (name: string) => `formField-${name}`;
export const fieldErrorId = (name: string) => `${fieldId(name)}-error`;
export const parseError = (error: any) => {
  if (typeof error === 'string') return error;
  if (error?.message && typeof error === 'string') return error;
}