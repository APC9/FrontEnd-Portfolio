
import { Action, createReducer, on } from '@ngrx/store';
import { authenticated, unauthenticated } from './auth.action';

export interface authState{
  isAuthenticated: boolean;
}

export const initialState: authState = {
  isAuthenticated: false,
}


const _authenticatedReducer = createReducer(
  initialState,
  on( authenticated, (state) => ({ ...state, isAuthenticated: true }) ),
  on( unauthenticated, (state) => ({ ...state, isAuthenticated: false }) ),
);

export function authenticatedReducer(state: authState | undefined, action: Action) {
  return _authenticatedReducer(state, action);
};

