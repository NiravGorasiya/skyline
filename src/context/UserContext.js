import React from "react";
import { userlogin } from "../Apiservices"

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  userlogin({ email: login, password: password })
    .then((response) => {
      if (response.data.status === 200) {
        localStorage.setItem('token',response.data.info)
        setError("")
        setIsLoading(false)
        dispatch({ type: 'LOGIN_SUCCESS' })
        history.push('/app/dashboard')
      }
    })
    .catch((err) => {
      if (err.response.status === 422 || err.response.status === 401) {
        setIsLoading(false)
        setError(err.response.data.message)
      }
    })
}

function signOut(dispatch, history) {
  localStorage.removeItem("token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
