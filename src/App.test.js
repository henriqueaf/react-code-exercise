import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import App from './App';
import * as MembersContext from './contexts/MembersContext';

// fetch is not supported in node, which is the context in which these jest tests are run
// this means that the external API calls won't work. That's OK though, we probably don't
// want to rely on real API calls for our tests, so we can use this to stub out a dummy response.

// keep in mind you will need to edit this mock response with the appropriate mock API data
// so that your components recieve the data they expect.
beforeEach(() => {
  global.fetch = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve({
        ok: true,
        Id: '123',
        json: () => {
          return {
            results: [{
              members: []
            }]
          }
        }
      });
    });
  });
});

const contextValues = {
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

beforeEach(() => {
  jest
  .spyOn(MembersContext, 'useMembersContext')
  .mockImplementation(() => contextValues);
});

afterEach(() => {
  jest.clearAllMocks();
})

it('renders without crashing', () => {
  TestRenderer.act(() => {
    TestRenderer.create(<App />);
  })
});
