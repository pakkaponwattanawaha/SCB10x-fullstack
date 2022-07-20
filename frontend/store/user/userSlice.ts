import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: string;
  isLogin: boolean;
  token: string;
  email: string;
}

/**
 * Default state object with initial values.
 */
const initialState: UserState = {
  id: "",
  isLogin: false,
  token: "",
  email: "",
};

/**
 * Create a slice as a reducer containing actions.
 *
 * In this example actions are included in the slice. It is fine and can be
 * changed based on your needs.
 */
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (
      state: Draft<UserState>,
      action: PayloadAction<UserState>
    ) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.isLogin = action.payload.isLogin;
    },
    getUserDetails: (state: Draft<UserState>) => {
      if (typeof window !== "undefined") {
        state.id = localStorage.getItem("id");
        state.email = localStorage.getItem("email");
        state.token = localStorage.getItem("accessToken");
      }
    },

    setUserDetails: (
      state: Draft<UserState>,
      action: PayloadAction<UserState>
    ) => {
      localStorage.setItem("id", action.payload.id);
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("accessToken", action.payload.token);
    },

    logout: (state: Draft<typeof initialState>) => {
      localStorage.removeItem("id");
      localStorage.removeItem("email");
      localStorage.removeItem("accessToken");
    },
  },
});

// A small helper of user state for `useSelector` function.
export const getUserState = (state: { user: UserState }) => state.user;

// Exports all actions
export const { loginSuccess, getUserDetails, setUserDetails, logout } =
  userSlice.actions;

export default userSlice.reducer;
