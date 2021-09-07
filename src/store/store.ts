import { useState, useEffect } from 'react';
import { GlobalState } from '../types/store/globalstate';
import initialState from './initialState';

let globalState: GlobalState = initialState;
let listeners: any[] = [];
let actions: any = {};

export type Dispatch = (actionIdentifier: string, payload: any) => void;

type StoreResult = [GlobalState, Dispatch];

type Store = (shouldListen?: boolean) => StoreResult;

export const useStore: Store = (shouldListen = true) => {
  const setState = useState(globalState)[1];

  const dispatch: Dispatch = (actionIdentifier, payload) => {
    const newState = actions[actionIdentifier](globalState, payload);
    globalState = { ...globalState, ...newState };

    for (const listener of listeners) {
      listener(globalState);
    }
  };

  useEffect(() => {
    if (shouldListen) {
      listeners.push(setState);
    }

    return () => {
      if (shouldListen) {
        listeners = listeners.filter(li => li !== setState);
      }
    };
  }, [setState, shouldListen]);

  return [globalState, dispatch];
};

export const initStore = (userActions: any, initialState: any) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userActions };
};
