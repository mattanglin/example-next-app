import { useCallback, useEffect, useState } from 'react';

export type AsyncCallback<R = any, P extends any[] = []> = (...params: P) => Promise<R>;

export const useAsync = <R = any, P extends any[] = []>(callback: AsyncCallback<R, P>, callbackOnMountParams?: P) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(undefined);
  const [result, setResult] = useState<R | undefined>(undefined);

  const integratedCallback = useCallback(async (...params: P) => {
    setLoading(true);
    try {
      const result = await callback(...params);
      setResult(result);
      setError(undefined);
    } catch (err) {
      console.log('ERROR:', err);
      setError(err);
    }
    setLoading(false);
  }, [callback, setLoading, setError]);

  useEffect(() => {
    if (callbackOnMountParams) {
      integratedCallback(...callbackOnMountParams);
    }
  }, []);

  return {
    loading,
    error,
    result,
    callback: integratedCallback,
  }
}