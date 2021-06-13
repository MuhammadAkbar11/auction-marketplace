import userSidebarMenu from "../data/userSiderbarMenu";

const initState = {
  userSidebarMenu: userSidebarMenu,
};

export const menuReducer = (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
