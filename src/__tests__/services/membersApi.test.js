import { getMembersList, getMemberDetails } from '../../services/membersApi';

afterEach(() => {
  jest.clearAllMocks();
});

const member = {name: 'Member name'};
const membersList = [member];

describe('services/membersApi', () => {
  describe('getMembersList', () => {
    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({
            results: [{
              members: membersList
            }]
          })
        })
      );
    });

    it('Returns members list on request success', async () => {
      const response = await getMembersList('some_uri');
      expect(response).toEqual(membersList);
    });

    it('Raise an error on request error', async () => {
      fetch.mockImplementationOnce(() => Promise.reject("API is down"));
      const response = await getMembersList('some_uri');
      expect(response).toEqual(undefined);
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('getMemberDetails', () => {
    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({
            results: [member]
          })
        })
      );
    });

    it('Returns member details on request success', async () => {
      const response = await getMemberDetails('some_uri');
      expect(response).toEqual(member);
    });

    it('Raise an error on request error', async () => {
      fetch.mockImplementationOnce(() => Promise.reject("API is down"));
      const response = await getMemberDetails('some_uri');
      expect(response).toEqual(undefined);
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  })
});
