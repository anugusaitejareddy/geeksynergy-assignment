import React from "react";

export const LogInContext = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, isLoggedIn: true };
    case "logout":
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}

const LogInContextProvider = ({ children }) => {
  const loggedIn = JSON.stringify(window.localStorage.getItem("isLoggedIn"));

  const [userStatus, dispatch] = React.useReducer(reducer, {
    isLoggedIn: loggedIn === true ? true : false,
  });

  return (
    <LogInContext.Provider value={{ userStatus, dispatch }}>
      {children}
    </LogInContext.Provider>
  );
};

export default LogInContextProvider;
