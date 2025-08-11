import { createContext, useContext, useReducer } from "react";
import { initialState } from "./initialState";
import { reducer } from "./reducer";
import { ContextActionHandlers, contextActions } from "./actions";

export const ContextStore = createContext();
const { Provider } = ContextStore;

export const useContextData = () => {
  const { state } = useContext(ContextStore);
  return state;
};

export const useContextDispatch = () => {
  const { dispatch } = useContext(ContextStore);
  return dispatch;
};

export const useContextStore = (Component) => (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  contextActions.dispatch = dispatch;
  ContextActionHandlers.dispatch = dispatch;
  return (
    <Provider value={{ state, dispatch }}>
      <Component {...props} />
    </Provider>
  );
};
