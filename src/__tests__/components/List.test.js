import {useEffect} from 'react';
import {render, fireEvent, screen, cleanup} from '@testing-library/react';
import {MembersContext} from '../../contexts/MembersContext';
import List from '../../components/List';

const defaultContextValues = {
  loading: false,
  setLoading: () => {},
  members: [],
  filteredMembers: [],
  setFilteredMembers: () => {},
  selectedMemberForDetails: null,
  setSelectedMemberForDetails: () => {},
  membersPerPage: 10,
  setMembersPerPage: () => {},
  currentPage: 0,
  setCurrentPage: () => {},
  chamber: 'senate',
  setChamber: () => {},
  session: 115,
  setSession: () => {},
  minimumSession: 80
};

const mount = (props) => {
  const mergedProps = {
    ...defaultContextValues,
    ...props,
  };

  return render(
    <MembersContext.Provider value={mergedProps}>
      <List />
    </MembersContext.Provider>
  );
};

describe('List', () => {
  it('Matches snapshot', () => {
    const {container, getByAltText} = mount();
    expect(container).toMatchSnapshot();
  });

  it('Show loading', () => {
    const {getByAltText} = mount({loading: true});
    const loadingImg = getByAltText('Loading');
    expect(loadingImg).not.toBeNull();
  });
})
