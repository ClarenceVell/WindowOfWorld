import { createContext, useReducer } from "react";

export const UserContext = createContext();

const initialState = {
  login: false,
  admin: false,
  user: null,
};
const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "success":
    case "login":
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        login: true,
        admin: false,
        user: payload,
      };
    case "admin":
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        login: true,
        admin: true,
        user: payload,
      };
      
    case "failed":
    case "logout":
      localStorage.removeItem("token");
      return {
        ...state,
        login: false,
        user: null,
      };
    default:
      throw new Error();
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // console.log(state)

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};
