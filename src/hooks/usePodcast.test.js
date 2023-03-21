import { renderHook, waitFor } from '@testing-library/react';
import { usePodcast } from './usePodcast';

describe('usePodcast', () => {
  it('fetch was called', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ contents: JSON.stringify({
        results: [{}]
      })}),
    }));

    renderHook(() => usePodcast(jest.fn(), 1));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  });
});
