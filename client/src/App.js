import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// routes
import Home from "./routes/Home";
import Books from "./routes/Books";
import Error from "./routes/Error";
import BookDetail from "./routes/BookDetail";

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
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
