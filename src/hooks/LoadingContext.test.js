import { renderHook } from '@testing-library/react';
import { LoadingProvider, useLoading } from './LoadingContext';

describe('LoadingContext', () => {
  it('returns the loading context', () => {
    const { result } = renderHook(() => useLoading(), { wrapper: LoadingProvider });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.setIsLoading).toBeInstanceOf(Function);
  });
});
