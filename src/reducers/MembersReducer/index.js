import { useReducer } from 'react';
import { ActionTypes } from './actions';

const INITIAL_STATE = {
  loading: false,
  members: [],
  filteredMembers: [],
  selectedMemberForDetails: null,
  membersPerPage: 10,
  currentPage: 0,
  selectedChamber: 'senate',
  selectedSession: 115
};

const MembersReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ActionTypes.SET_MEMBERS:
      return {
        ...state,
        members: action.payload,
      };
    case ActionTypes.SET_FILTERED_MEMBERS:
      return {
        ...state,
        filteredMembers: action.payload,
      };
    case ActionTypes.SET_SELECTED_MEMBER_FOR_DETAILS:
      return {
        ...state,
        selectedMemberForDetails: action.payload,
      };
    case ActionTypes.SET_MEMBERS_PER_PAGE:
      return {
        ...state,
        membersPerPage: action.payload,
      };
    case ActionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case ActionTypes.SET_SELECTED_CHAMBER:
      return {
        ...state,
        selectedChamber: action.payload,
      };
    case ActionTypes.SET_SELECTED_SESSION:
      return {
        ...state,
        selectedSession: action.payload,
      };
    default:
      return state;
  }
};

export const useMembersReducer = () =>
  useReducer(MembersReducer, INITIAL_STATE);
