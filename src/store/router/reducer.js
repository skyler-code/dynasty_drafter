import Immutable from 'seamless-immutable';

const initialState = Immutable({
  currentTab: "IMPORT",
  activeTabs: ["IMPORT"]
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}

// selectors

export function getCurrentTab(state) {
  return state.router.currentTab;
}

export function getActiveTabs(state){
  return state.router.activeTabs;
}