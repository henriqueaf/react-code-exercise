import {render, fireEvent, screen} from '@testing-library/react'
import ListItem from '../../components/ListItem';

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

const mockSetSelectedMemberForDetails = jest.fn(() => {});

const defaultProps = {
  member,
  setSelectedMemberForDetails: mockSetSelectedMemberForDetails
};

const mount = (props) => {
  const mergedProps = {
    ...defaultProps,
    ...props,
  };

  const tbody = document.createElement('tbody');
  return render(<ListItem {...mergedProps} />, {container: document.body.appendChild(tbody)});
};

describe('ListItem', () => {
  it('Matches snapshot', () => {
    const {container} = mount();
    expect(container).toMatchSnapshot();
  });

  it('Renders a tr with some td inside', () => {
    mount();
    const memberTableDatas = screen.getAllByRole('cell');
    expect(memberTableDatas.length).toBe(9);
  });

  it('Renders member id', () => {
    mount();
    const memberIdTableData = screen.getAllByRole('cell')[0];
    expect(memberIdTableData.textContent).toBe(member.id);
  });

  it('Trigger setSelectedMemberForDetails when details link is pressed', () => {
    mount();
    const link = screen.getByText('Details');

    fireEvent.click(link, {preventDefault: () => {}});
    expect(mockSetSelectedMemberForDetails).toBeCalledTimes(1);
  });
})
