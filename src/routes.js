import React, { Suspense, Fragment, lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

import { BASE_URL } from './config/constant';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Switch>
      {routes.map((route, i) => {
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => <Layout>{route.routes ? renderRoutes(route.routes) : <Component {...props} />}</Layout>}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routes = [
  {
    exact: true,
    path: '/auth/signin',
    component: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    path: '*',
    layout: AdminLayout,
    routes: [
      {
        exact: true,
        path: '/app/dashboard/default',
        component: lazy(() => import('./views/dashboard/DashDefault'))
      },
      {
        exact: true,
        path: '/users',
        component: lazy(() => import('./views/account/users'))
      },
      {
        exact: true,
        path: '/adduser',
        component: lazy(() => import('./views/add-user/create_user'))
      },
      {
        exact: true,
        path: '/users/delete',
        component: lazy(() => import('./views/account/delete'))
      },
      {
        exact: true,
        path: '/users/update',
        component: lazy(() => import('./views/account/update'))
      },
      {
        exact: true,
        path: '/campaigns',
        component: lazy(() => import('./views/project/campaigns'))
      },
      {
        exact: true,
        path: '/addcampaigns',
        component: lazy(() => import('./views/project/addCampaigns'))
      },
      {
        exact: true,
        path: '/campaigns/update',
        component: lazy(() => import('./views/project/updateCampaigns'))
      },
      {
        exact: true,
        path: '/projects',
        component: lazy(() => import('./views/project/projects'))
      },
      {
        exact: true,
        path: '/projects/update',
        component: lazy(() => import('./views/project/updateProject'))
      },
      {
        exact: true,
        path: '/home',
        component: lazy(() => import('./views/project/home'))
      },
      {
        exact: true,
        path: '/updatehome',
        component: lazy(() => import('./views/project/updateHome'))
      },
      {
        exact: true,
        path: '/about',
        component: lazy(() => import('./views/project/about'))
      },
      {
        exact: true,
        path: '/about/update',
        component: lazy(() => import('./views/project/updateAbout'))
      },
      {
        exact: true,
        path: '/updateabout',
        component: lazy(() => import('./views/project/updateAbout'))
      },
      {
        exact: true,
        path: '/addteam',
        component: lazy(() => import('./views/project/addTeam'))
      },
      {
        exact: true,
        path: '/teams',
        component: lazy(() => import('./views/project/team'))
      },
      {
        exact: true,
        path: '/teams/update',
        component: lazy(() => import('./views/project/updateTeam'))
      },
      {
        exact: true,
        path: '/gallery',
        component: lazy(() => import('./views/project/gallery'))
      },
      {
        exact: true,
        path: '/news',
        component: lazy(() => import('./views/project/news'))
      },
      {
        exact: true,
        path: '/news/update',
        component: lazy(() => import('./views/project/updateNews'))
      },
      {
        exact: true,
        path: '/news/addnews',
        component: lazy(() => import('./views/project/addNews'))
      },
      {
        exact: true,
        path: '/gallery',
        component: lazy(() => import('./views/project/gallery'))
      },
      {
        exact: true,
        path: '/gallery/addgallery',
        component: lazy(() => import('./views/project/addGallery'))
      },
      {
        exact: true,
        path: '/stories',
        component: lazy(() => import('./views/project/stories'))
      },
      {
        exact: true,
        path: '/stories/update',
        component: lazy(() => import('./views/project/updateStories'))
      },
      {
        exact: true,
        path: '/stories/addstories',
        component: lazy(() => import('./views/project/addStories'))
      },
      {
        exact: true,
        path: '/causes/update',
        component: lazy(() => import('./views/project/update'))
      },
      {
        exact: true,
        path: '/projects/addprojects',
        component: lazy(() => import('./views/project/addProjects'))
      },
      {
        exact: true,
        path: '/delete',
        component: lazy(() => import('./views/project/deletemaster'))
      },
      {
        path: '*',
        exact: true,
        component: () => <Redirect to={BASE_URL} />
      }
    ]
  }
];

export default routes;
