export const parseError = (error: any) => {
  // Prioritize axios error reponse
  if (error?.response?.data && typeof error.response.data === 'string') return error.response.data;
  if (typeof error === 'string') return error;
  if (error?.message && typeof error.message === 'string') return error.message;
  
  return 'An Unknown Error occurred';
}
