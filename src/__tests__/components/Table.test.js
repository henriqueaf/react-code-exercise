import {render, fireEvent, screen, cleanup} from '@testing-library/react';
import * as MembersContext from '../../contexts/MembersContext';
import Table from '../../components/Table';

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

const contextValues = {
  filteredMembers: [member],
  setSelectedMemberForDetails: () => {},
  membersPerPage: 1,
  currentPage: 0
};

beforeEach(() => {
  jest
  .spyOn(MembersContext, 'useMembersContext')
  .mockImplementation(() => contextValues);
});

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

const mount = () => {
  return render(<Table />);
};

describe('Table', () => {
  it('Matches snapshot', () => {
    const {container} = mount();
    expect(container).toMatchSnapshot();
  });

  it('Renders member data on table columns', () => {
    mount();
    const tableRow = screen.getByRole('row', {name: 'A00123 Lamar Frank lamartwt lamarfc lamaryoutube 117 /LA 2022 Details'});
    expect(tableRow.children[0].textContent).toBe(member.id);
  });
})
