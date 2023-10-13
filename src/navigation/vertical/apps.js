// ** Icons Import
import { CheckSquare, Settings, FileText, Circle, ShoppingCart, User, Shield, Camera, Award, Gift, UserPlus, RefreshCcw, UserCheck } from 'react-feather'

export default [
  {
    header: 'Pages'
  },
  {
    id: 'news',
    title: 'News Articles',
    icon: <FileText size={20} />,
    navLink: '/articles'
  },
  {
    id: 'compaigns',
    title: 'Compaigns',
    icon: <Gift size={20} />,
    navLink: '/compaigns'
  },
  {
    id: 'stories',
    title: 'Success Stories',
    icon: <Award size={20} />,
    navLink: '/stories'
  },
  {
    id: 'projects',
    title: 'Success Projects',
    icon: <CheckSquare size={20} />,
    navLink: '/projects'
  },
  {
    id: 'gallery',
    title: 'Gallery',
    icon: <Camera size={20} />,
    navLink: '/gallery'
  },
  {
    id: 'team',
    title: 'Team Members',
    icon: <UserCheck size={20} />,
    navLink: '/team'
  },
  {
    id: 'updates',
    title: 'Updates',
    icon: <RefreshCcw size={20} />,
    navLink: '/updates'
  },
  {
    id: 'setting',
    title: 'Setting',
    icon: <Settings size={20} />,
    navLink: '/about/1'
  },
  {
    id: 'user',
    title: 'users',
    icon: <UserPlus size={20} />,
    navLink: '/users'
  }
]
