import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const Layout = React.lazy(() => import("@Layout/index"));
const HomePage = React.lazy(() => import("@Pages/Home/HomePage"));
const BikesPage = React.lazy(() => import("@Pages/Bikes/BikesPage"));
const BikeDetailPage = React.lazy(
  () => import("@Pages/Home/Components/BikeDetail")
);
const NotFoundPage = React.lazy(
  () => import("@Pages/PageNotFound/PageNotFound")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<></>}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "/home",
        element: (
          <Suspense fallback={<></>}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "/home/:id",
        element: (
          <Suspense fallback={<></>}>
            <BikeDetailPage />
          </Suspense>
        ),
      },
      {
        path: "/bikes",
        element: (
          <Suspense fallback={<></>}>
            <BikesPage />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<></>}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
