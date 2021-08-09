import TestRenderer from 'react-test-renderer';
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

const defaultProps: Props = {
  member,
  setSelectedMemberForDetails: mockSetSelectedMemberForDetails
};

const mount = (props) => {
  const mergedProps = {
    ...defaultProps,
    ...props,
  };

  const testRenderer = TestRenderer.create(<ListItem {...mergedProps} />);
  const testInstance = testRenderer.root

  return {
    testRenderer,
    memberTableDatas: testInstance.findAllByType('td')
  };
};

describe('ListItem', () => {
  it('Matches snapshot', () => {
    const { testRenderer } = mount();
    expect(testRenderer).toMatchSnapshot();
  });

  it('renders a tr with some td inside', () => {
    const {memberTableDatas} = mount();
    expect(memberTableDatas.length).toBe(9);
  });

  it('Trigger setSelectedMemberForDetails when details link is pressed', () => {
    const {testRenderer} = mount();
    const link = testRenderer.root.find((el) => el.children && el.children[0] == 'Details');

    link.props.onClick({preventDefault: () => {}});
    expect(mockSetSelectedMemberForDetails).toBeCalledTimes(1);
  });
})
