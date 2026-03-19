import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import PastEventsPage from '@/components/pages/PastEventsPage';
import PastEventDetailPage from '@/components/pages/PastEventDetailPage';
import ScrollProgressBar from '@/components/ScrollProgressBar';

// Layout component that includes ScrollToTop and ScrollProgressBar
function Layout() {
  return (
    <>
      <ScrollToTop />
      <ScrollProgressBar />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "past-events",
        element: <PastEventsPage />,
        routeMetadata: {
          pageIdentifier: 'past-events',
        },
      },
      {
        path: "past-events/:id",
        element: <PastEventDetailPage />,
        routeMetadata: {
          pageIdentifier: 'past-event-detail',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
