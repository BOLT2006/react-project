import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Layout from "./components/Layout";

import {
  createBrowserRouter,
  RouterProvider,
  Link,
  Outlet,
} from "react-router-dom";

//Data fetching
async function githubProfileLoader() {
  const res = await fetch("https://api.github.com/users/sumanmalakar");

  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}

// Router Setup
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    // Children
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "profile",
        element: <Profile />,
        loader: githubProfileLoader,
        errorElement: (
          <p style={{ textAlign: "center" }}>
            Couldn't load the profile. Try again later.
          </p>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
