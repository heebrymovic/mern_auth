import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentUser: {},
	isLoading: false,
	isAuthenticated: false
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		signInUpdateStart: (state) => {
			state.isLoading = true;
		},
		signInUpdateSuccess: (state, action) => {
			state.isLoading = false;
			state.currentUser = action.payload;
			state.isAuthenticated = true;
		},
		signInUpdateFailure: (state) => {
			state.currentUser = {};
			state.isLoading = false;
			state.isAuthenticated = false;
		},
		deleteLogoutSuccess: (state) => {
			state.currentUser = {};
			state.isLoading = false;
			state.isAuthenticated = false;
		}
	}
});

export const { signInUpdateStart, signInUpdateSuccess, signInUpdateFailure, deleteLogoutSuccess } = userSlice.actions;

export default userSlice.reducer;
