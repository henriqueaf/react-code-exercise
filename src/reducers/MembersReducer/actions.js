export const ActionTypes = {
  SET_LOADING: '@members/SET_LOADING',
  SET_MEMBERS: '@members/SET_MEMBERS',
  SET_FILTERED_MEMBERS: '@members/SET_FILTERED_MEMBERS',
  SET_SELECTED_MEMBER_FOR_DETAILS: '@members/SET_SELECTED_MEMBER_FOR_DETAILS',
  SET_MEMBERS_PER_PAGE: '@members/SET_MEMBERS_PER_PAGE',
  SET_CURRENT_PAGE: '@members/SET_CURRENT_PAGE',
  SET_SELECTED_CHAMBER: '@members/SET_SELECTED_CHAMBER',
  SET_SELECTED_SESSION: '@members/SET_SELECTED_SESSION',
}

export const setLoading = (loading) =>
  ({type: ActionTypes.SET_LOADING, payload: loading})
export const setMembers = (members) =>
  ({type: ActionTypes.SET_MEMBERS, payload: members})
  export const setFilteredMembers = (filteredMembers) =>
  ({type: ActionTypes.SET_FILTERED_MEMBERS, payload: filteredMembers})
export const setSelectedMemberForDetails = (member) =>
  ({type: ActionTypes.SET_SELECTED_MEMBER_FOR_DETAILS, payload: member})
export const setMembersPerPage = (membersPerPage) =>
  ({type: ActionTypes.SET_MEMBERS_PER_PAGE, payload: membersPerPage})
export const setCurrentPage = (currentPage) =>
  ({type: ActionTypes.SET_CURRENT_PAGE, payload: currentPage})
export const setSelectedChamber = (selectedChamber) =>
  ({type: ActionTypes.SET_SELECTED_CHAMBER, payload: selectedChamber})
export const setSelectedSession = (selectedSession) =>
  ({type: ActionTypes.SET_SELECTED_SESSION, payload: selectedSession})
