import { cleanup, render, screen, waitFor } from '@testing-library/react';
import renderer from 'react-test-renderer' ;

import { Loading } from './Loading';
import { useLoading } from '../../hooks/LoadingContext';

jest.mock('../../hooks/LoadingContext.js');

describe.only('Loading', () => {
  const view = <Loading/>;

  afterEach(cleanup);

  it('renders correctly', () => {
    useLoading.mockImplementation(jest.fn(() => ({ isLoading: true })));

    const tree = renderer.create(view).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the loading img', async() => {
    useLoading.mockImplementation(jest.fn(() => ({ isLoading: true })));

    render(view);

    await waitFor(() => {
      const loading = screen.queryByTestId('loading-img');
      expect(loading).toBeInTheDocument();
    });
  });

  it("doesn't render the loading img", async() => {
    useLoading.mockImplementation(jest.fn(() => ({ isLoading: false })));

    render(view);

    await waitFor(() => {
      const loading = screen.queryByTestId('loading-img');
      expect(loading).toBeNull();
    });
  });
});
