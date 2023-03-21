import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { create } from 'react-test-renderer' ;

import { Main } from './Main';

jest.mock('../../hooks/LoadingContext.js', () => ({
  useLoading: () => ({
    setIsLoading: jest.fn(),
  }),
}));

jest.mock('../../hooks/useSongs.js', () => ({
  useSongs: () => ({
    entry: [
      {
        'im:artist': {},
        'im:image': [{}, {}, {}],
        'im:name': {},
        id: {
          attributes: {
            'im:id': 1,
          },
        },
      },
    ]
  }),
}));

const getContent = (pathname = '/') => {
  return <MemoryRouter initialEntries={[{ pathname }]}>
    <Routes>
      <Route path='/' element={
        <Main/>
      }></Route>

      <Route path='/podcast/1/' element={
        <div data-testid='podcast'></div>
      }></Route>
    </Routes>
  </MemoryRouter>;
}

describe('Podcast', () => {
  const view = getContent();

  afterEach(cleanup);

  it('renders correctly', () => {
    const tree = create(view).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the main view', async() => {
    render(view);

    await waitFor(() => {
      const main = screen.queryByTestId('main');
      expect(main).toBeInTheDocument();
    });
  });

  it('navigates from main view to the podcast view', async () => {
    render(view);

    await waitFor(() => {
      const main = screen.queryByTestId('main');
      expect(main).toBeInTheDocument();
    });

    let link = screen.queryByTestId('link-to-podcast');
    userEvent.click(link);

    await waitFor(() => {
      const episode = screen.queryByTestId('podcast');
      expect(episode).toBeInTheDocument();
    });
  });
});
