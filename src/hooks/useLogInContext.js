import { LogInContext } from "../context/LogInContext";
import React from "react";

function useLogInContext() {
  const userLoginContext = React.useContext(LogInContext);
  return userLoginContext;
}

export default useLogInContext;
