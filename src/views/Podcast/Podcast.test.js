import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes, useParams } from 'react-router-dom';
import { create } from 'react-test-renderer' ;

import { Podcast } from './Podcast';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

jest.mock('../../hooks/LoadingContext.js', () => ({
  useLoading: () => ({
    setIsLoading: jest.fn(),
  }),
}));

jest.mock('../../hooks/usePodcast.js', () => ({
  usePodcast: () => ({
    resultCount: 1,
    results: [
      {
        description: 'Podcast Description',
        trackId: 1,
      }
    ]
  }),
}));

const getContent = (pathname = '/') => {
  const state = {
    song: {
      summary: {},
    },
  };

  return <MemoryRouter initialEntries={[{ pathname, state }]}>
    <Routes>
      <Route path='/podcast/1' element={
        <Podcast/>
      }></Route>

      <Route path='/podcast/1/episode/1' element={
        <div data-testid='episode'></div>
      }></Route>
    </Routes>
  </MemoryRouter>;
}

describe('Podcast', () => {
  let view = getContent('/podcast/1');

  beforeEach(() => {
    useParams.mockReturnValue({ podcastId: 1 });
  });

  afterEach(cleanup);

  it('renders correctly', () => {
    const tree = create(view).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the podcast', async() => {
    render(view);

    await waitFor(() => {
      const podcast = screen.getByTestId('podcast');
      expect(podcast).toBeInTheDocument();
    });
  });

  it('navigates from podcast page to the episode page', async () => {
    render(view);

    await waitFor(() => {
      const podcast = screen.getByTestId('podcast');
      expect(podcast).toBeInTheDocument();
    });

    let link = screen.getByTestId('link-to-episode');
    userEvent.click(link);

    await waitFor(() => {
      const episode = screen.getByTestId('episode');
      expect(episode).toBeInTheDocument();
    });
  });
});
