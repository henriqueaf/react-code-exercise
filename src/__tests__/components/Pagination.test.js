import {render, fireEvent, waitFor} from '@testing-library/react';
import { MembersProvider } from '../../contexts/MembersContext';
import Pagination from '../../components/Pagination/container';

const member = {
  id: 'A00123',
  suffix: 'Sr.',
  first_name: 'Lamar',
  middle_name: 'Adam',
  last_name: 'Frank',
  twitter_account: 'lamartwt',
  facebook_account: 'lamarfc',
  youtube_account: 'lamaryoutube',
  party: 117,
  district: 'LA',
  state: 'LA',
  next_election: 2022
}

const mount = () => {
  return render(
    <MembersProvider>
      <Pagination />
    </MembersProvider>
  );
};

beforeEach(() => {
  // eslint-disable-next-line no-undef
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({
        results: [{
          members: Array(23).fill(member)
        }]
      })
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Pagination', () => {
  it('Matches snapshot', async () => {
    let container;
    await waitFor(() => {
      container = mount().container;
    });
    expect(container).toMatchSnapshot();
  });

  it('Set members per page', async () => {
    const {findByRole, findAllByRole} = await waitFor(() => mount());

    let pagesLinks = await findAllByRole('listitem');

    expect(pagesLinks.length).toBe(7);

    const membersPerPageCombobox = await findByRole('combobox');
    fireEvent.change(membersPerPageCombobox, { target: { value: 30 } });

    pagesLinks = await findAllByRole('listitem');
    expect(pagesLinks.length).toBe(5);
  });

  it('First page active', async () => {
    const {findByText} = mount();
    const currentPageButton = await findByText('1');

    expect(currentPageButton.parentElement.className).toEqual('page-item active');
  });

  it('Set current page', async () => {
    const {findByText} = mount({filteredMembers: Array(23).fill(member)});
    const lastPageButton = await findByText('Last');

    fireEvent.click(lastPageButton);

    const currentPageButton = await findByText('3');
    expect(currentPageButton.parentElement.className).toEqual('page-item active');
  });
})
