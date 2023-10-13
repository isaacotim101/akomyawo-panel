// ** React Imports
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Chat = lazy(() => import('../../views/apps/chat'))
const Todo = lazy(() => import('../../views/apps/todo'))
const Email = lazy(() => import('../../views/apps/email'))

const Articles = lazy(() => import('../../views/articles/list'))
const ArticlesDetails = lazy(() => import('../../views/articles/details'))
const ArticlesEdit = lazy(() => import('../../views/articles/edit'))
const ArticlesAdd = lazy(() => import('../../views/articles/add'))
const Delete = lazy(() => import('../../views/articles/delete'))

const Updates = lazy(() => import('../../views/updates/list'))
const UpdatesDetails = lazy(() => import('../../views/updates/details'))
const UpdatesEdit = lazy(() => import('../../views/updates/edit'))
const UpdatesAdd = lazy(() => import('../../views/updates/add'))

const Compaigns = lazy(() => import('../../views/campaigns/list'))
const CompaignsDetails = lazy(() => import('../../views/campaigns/details'))
const CompaignsEdit = lazy(() => import('../../views/campaigns/edit'))
const CompaignsAdd = lazy(() => import('../../views/campaigns/add'))

const Stories = lazy(() => import('../../views/stories/list'))
const StoriesDetails = lazy(() => import('../../views/stories/details'))
const StoriesEdit = lazy(() => import('../../views/stories/edit'))
const StoriesAdd = lazy(() => import('../../views/stories/add'))

const Projects = lazy(() => import('../../views/projects/list'))
const ProjectsDetails = lazy(() => import('../../views/projects/details'))
const ProjectsEdit = lazy(() => import('../../views/projects/edit'))
const ProjectsAdd = lazy(() => import('../../views/projects/add'))

const Gallery = lazy(() => import('../../views/gallery/list'))
const GalleryAdd = lazy(() => import('../../views/gallery/add'))

const Team = lazy(() => import('../../views/team/list'))
const TeamAdd = lazy(() => import('../../views/team/add'))
const TeamEdit = lazy(() => import('../../views/team/edit'))
const TeamDetails = lazy(() => import('../../views/team/details'))

const Aboutpage = lazy(() => import('../../views/apps/aboutpage/view'))
const AboutpageEdit = lazy(() => import('../../views/apps/aboutpage/view'))

const Users = lazy(() => import('../../views/users/basic'))
const UsersEdit = lazy(() => import('../../views/users/basic'))
const UsersAdd = lazy(() => import('../../views/users/add'))

const Homepage = lazy(() => import('../../views/apps/homepage/view'))
const HomepageEdit = lazy(() => import('../../views/apps/homepage/view'))

const Kanban = lazy(() => import('../../views/apps/kanban'))
const Calendar = lazy(() => import('../../views/apps/calendar'))

const InvoiceAdd = lazy(() => import('../../views/apps/invoice/add'))
const InvoiceList = lazy(() => import('../../views/apps/invoice/list'))
const InvoiceEdit = lazy(() => import('../../views/apps/invoice/edit'))
const InvoicePrint = lazy(() => import('../../views/apps/invoice/print'))
const InvoicePreview = lazy(() => import('../../views/apps/invoice/preview'))

const EcommerceShop = lazy(() => import('../../views/apps/ecommerce/shop'))
const EcommerceDetail = lazy(() => import('../../views/apps/ecommerce/detail'))
const EcommerceWishlist = lazy(() => import('../../views/apps/ecommerce/wishlist'))
const EcommerceCheckout = lazy(() => import('../../views/apps/ecommerce/checkout'))

const UserList = lazy(() => import('../../views/apps/user/list'))
const UserView = lazy(() => import('../../views/apps/user/view'))

const Roles = lazy(() => import('../../views/apps/roles-permissions/roles'))
const Permissions = lazy(() => import('../../views/apps/roles-permissions/permissions'))

const AppRoutes = [
  {
    element: <Articles />,
    path: '/articles'
  },
  {
    path: '/articles/detail/:id',
    element: <ArticlesDetails />
  },
  {
    path: '/articles/edit/:id',
    element: <ArticlesEdit />
  },
  {
    path: '/articles/add',
    element: <ArticlesAdd />
  },
  {
    element: <Updates />,
    path: '/updates'
  },
  {
    path: '/updates/detail/:id',
    element: <UpdatesDetails />
  },
  {
    path: '/updates/edit/:id',
    element: <UpdatesEdit />
  },
  {
    path: '/updates/add',
    element: <UpdatesAdd />
  },
  {
    path: '/delete',
    element: <Delete />
  },
  {
    element: <Compaigns />,
    path: '/compaigns'
  },
  {
    element: <CompaignsDetails />,
    path: '/campaigns/detail/:id'
  },
  {
    element: <CompaignsEdit />,
    path: '/campaigns/edit/:id'
  },
  {
    element: <CompaignsAdd />,
    path: '/compaigns/add'
  },
  {
    element: <Stories />,
    path: '/stories'
  },
  {
    element: <StoriesDetails />,
    path: '/stories/detail/:id'
  },
  {
    element: <StoriesEdit />,
    path: '/stories/edit/:id'
  },
  {
    element: <StoriesAdd />,
    path: '/stories/add'
  },
  {
    element: <Projects />,
    path: '/projects'
  },
  {
    element: <ProjectsDetails />,
    path: '/projects/detail/:id'
  },
  {
    element: <ProjectsEdit />,
    path: '/projects/edit/:id'
  },
  {
    element: <ProjectsAdd />,
    path: '/projects/add'
  },
  {
    element: <Gallery />,
    path: '/gallery'
  },
  {
    element: <GalleryAdd />,
    path: '/gallery/add'
  },
  {
    element: <Team />,
    path: '/team'
  },
  {
    element: <TeamAdd />,
    path: '/team/add'
  },
  {
    element: <TeamEdit />,
    path: '/team/edit/:id'
  },
  {
    element: <TeamDetails/>,
    path: '/team/detail/:id'
  },
  {
    element: <Users />,
    path: '/users'
  },
  {
    element: <UsersAdd />,
    path: '/users/add'
  },
  {
    element: <UsersEdit />,
    path: '/users/edit'
  },
  {
    element: <Aboutpage />,
    path: '/about/:id'
  },
  {
    element: <AboutpageEdit />,
    path: '/about/edit/:id'
  },
  {
    element: <Homepage />,
    path: '/homepage/:id'
  },
  {
    element: <HomepageEdit/>,
    path: '/homepage/edit/:id'
  },
  {
    element: <Email />,
    path: '/apps/email/:folder',
    meta: {
      appLayout: true,
      className: 'email-application'
    }
  },
  {
    element: <Email />,
    path: '/apps/email/label/:label',
    meta: {
      appLayout: true,
      className: 'email-application'
    }
  },
  {
    element: <Email />,
    path: '/apps/email/:filter'
  },
  {
    path: '/apps/chat',
    element: <Chat />,
    meta: {
      appLayout: true,
      className: 'chat-application'
    }
  },
  {
    element: <Todo />,
    path: '/apps/todo',
    meta: {
      appLayout: true,
      className: 'todo-application'
    }
  },
  {
    element: <Todo />,
    path: '/apps/todo/:filter',
    meta: {
      appLayout: true,
      className: 'todo-application'
    }
  },
  {
    element: <Todo />,
    path: '/apps/todo/tag/:tag',
    meta: {
      appLayout: true,
      className: 'todo-application'
    }
  },
  {
    element: <Calendar />,
    path: '/apps/calendar'
  },
  {
    element: <Kanban />,
    path: '/apps/kanban',
    meta: {
      appLayout: true,
      className: 'kanban-application'
    }
  },
  {
    element: <InvoiceList />,
    path: '/apps/invoice/list'
  },
  {
    element: <InvoicePreview />,
    path: '/apps/invoice/preview/:id'
  },
  {
    path: '/apps/invoice/preview',
    element: <Navigate to='/apps/invoice/preview/4987' />
  },
  {
    element: <InvoiceEdit />,
    path: '/apps/invoice/edit/:id'
  },
  {
    path: '/apps/invoice/edit',
    element: <Navigate to='/apps/invoice/edit/4987' />
  },
  {
    element: <InvoiceAdd />,
    path: '/apps/invoice/add'
  },
  {
    path: '/apps/invoice/print',
    element: <InvoicePrint />,
    meta: {
      layout: 'blank'
    }
  },
  {
    element: <EcommerceShop />,
    path: '/apps/ecommerce/shop',
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    element: <EcommerceWishlist />,
    path: '/apps/ecommerce/wishlist',
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    path: '/apps/ecommerce/product-detail',
    element: <Navigate to='/apps/ecommerce/product-detail/apple-i-phone-11-64-gb-black-26' />,
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    path: '/apps/ecommerce/product-detail/:product',
    element: <EcommerceDetail />,
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    path: '/apps/ecommerce/checkout',
    element: <EcommerceCheckout />,
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    element: <UserList />,
    path: '/apps/user/list'
  },
  {
    path: '/apps/user/view',
    element: <Navigate to='/apps/user/view/1' />
  },
  {
    element: <UserView />,
    path: '/apps/user/view/:id'
  },
  {
    element: <Roles />,
    path: '/apps/roles'
  },
  {
    element: <Permissions />,
    path: '/apps/permissions'
  }
]

export default AppRoutes
