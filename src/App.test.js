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
