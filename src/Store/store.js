import { useState, useEffect } from 'react';

let sharedState = {};
let listeners = [];
let actions = {};

export const useStore = () => {
  const setState =  useState(sharedState)[1];

  const dispatch = (actionId, param) => {
    const newState = actions[actionId](sharedState, param);
    sharedState = { ...sharedState, ...newState }

    for(const listener of listeners) {
      listener(sharedState);
    }
  }

  useEffect(()=>{
    listeners.push(setState);

    // remove on unmount
    return ()=>{
      listeners = listeners.filter(l=> l !== setState);
    }
  }, [setState]);

  return [sharedState, dispatch];
}

export const initStore = (userActions, initialState) => {
  if(initialState) {
    sharedState = {...sharedState, ...initialState}
  }
  actions = {...actions, ...userActions}
}