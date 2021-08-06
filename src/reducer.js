export const initialState = {
  user: null,
  playlists: [],
  playing: false,
  item: null,
  //token: "BQCRm7YbYJrJE9W0CC4VSR08W1iu2BNpYzcgeD3dHfnHcvRaU5mikZJVcB5_1YHoaHKnZJNm4wHlZvwFlH4fB9VQx9_PglmKPxBfrY-4_uvR_Hm82eye0SG1vCawfxgz8rcTBlYYz7sA811xE6dpEKuiR5Si5-7gisFctM7QQLBKvyBz",
};

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
      case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
      case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };
    default:
      return state;
  }
};

export default reducer;
