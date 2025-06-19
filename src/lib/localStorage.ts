
import { RootState } from "./store/store";
const STATE_KEY = "reduxState";

export const loadState = (): RootState | undefined => {
  if (typeof window === 'undefined') {
    return undefined; 
  }
  try {
    const serializedState = localStorage.getItem(STATE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state from local storage", err);
    return undefined;
  }
};

export const saveState = (state: RootState) => {
  if (typeof window === 'undefined') {
    return; 
  }
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STATE_KEY, serializedState);
  } catch (err) {
    console.error("Could not save state to local storage", err);
  }
};