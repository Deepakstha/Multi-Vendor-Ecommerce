import { createReducer } from "@reduxjs/toolkit";

const initialState = {
	isAuthenticated: false,
};

export const userReducer = createReducer(initialState, {
	loadUserRequest: (state) => {
		state.loading = true;
	},
	loadUserSuccess: (state, action) => {
		state.isAuthenticated = true;
		state.loading = false;
		state.user = action.payload;
	},
	loadUserFail: (state, action) => {
		state.isAuthenticated = false;
		state.loading = false;
		state.error = action.payload;
	},
	clearErrors: (state) => {
		state.error = null;
	},
});
