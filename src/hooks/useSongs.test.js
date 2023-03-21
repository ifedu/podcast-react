import { renderHook, waitFor } from '@testing-library/react';
import { useSongs } from './useSongs';

describe('useSongs', () => {
  it('fetch was called', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ contents: JSON.stringify({
        results: [{}]
      })}),
    }));

    renderHook(() => useSongs(jest.fn(), 1));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  });
});
