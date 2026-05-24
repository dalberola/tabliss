import { Reducer, ReducerState, useEffect, useReducer, useRef } from "react";

export function useSavedReducer<R extends Reducer<any, any>>(
  reducer: R,
  initialState: ReducerState<R>,
  save: (state: ReducerState<R>) => void,
) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Hold the latest save callback in a ref so we don't have to add `save`
  // to the effect deps — callers typically pass an inline arrow which
  // would otherwise cause the effect to run on every parent render.
  const saveRef = useRef(save);
  saveRef.current = save;

  useEffect(() => {
    saveRef.current(state);
  }, [state]);

  return dispatch;
}
