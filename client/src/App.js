import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
// routes
import Home from "./routes/Home";
import Books from "./routes/Books";
import Error from "./routes/Error";
import BookDetail from "./routes/BookDetail";
import Login from "./routes/Login";
import Signup from "./routes/Signup";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <Error />,
    },
    {
      path: "/books",
      element: <Books />,
    },
    {
      path: "/book/:id",
      element: <BookDetail />,
    },
    {
      path: "/error",
      element: <Error />,
    },
    {
      path: "/admin/login",
      element: <Login />,
    },
    {
      path: "/admin/signup",
      element: <Signup />,
    },
  ]);

  // authentication
  const store = createStore({
    authName: "_auth",
    authType: "cookie",
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === "https:",
  });

  return (
    <>
      <AuthProvider store={store}>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
