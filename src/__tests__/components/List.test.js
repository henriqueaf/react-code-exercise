import {render} from '@testing-library/react';
import {MembersContext} from '../../contexts/MembersContext';
import List from '../../components/List';

const defaultContextValues = {
  state: {
    loading: false,
    members: [],
    filteredMembers: [],
    selectedMemberForDetails: null,
    membersPerPage: 10,
    currentPage: 0,
    chamber: 'senate',
    session: 115,
  },
  minimumSession: 80,
  dispatch: () => {}
};

const mount = (stateProps) => {
  const mergedProps = {
    ...defaultContextValues,
    state: {
      ...defaultContextValues.state,
      ...stateProps
    }
  };

  return render(
    <MembersContext.Provider value={mergedProps}>
      <List />
    </MembersContext.Provider>
  );
};

describe('List', () => {
  it('Matches snapshot', () => {
    const {container} = mount();
    expect(container).toMatchSnapshot();
  });

  it('Show loading', () => {
    const {getByAltText} = mount({loading: true});
    const loadingImg = getByAltText('Loading');
    expect(loadingImg).not.toBeNull();
  });
})
