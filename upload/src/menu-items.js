const menuItems = {
  items: [
    {
      id: 'overview',
      title: 'Overview',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          url: '/app/dashboard/default',
          icon: 'feather icon-home',
        }
      ]
    },
    {
      id: 'project',
      title: 'Catalog',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'project',
          title: 'Project',
          type: 'collapse',
          icon: 'feather icon-folder',
          children: [
            {
              id: 'project-items',
              title: 'Successful Projects',
              type: 'item',
              icon: 'feather icon-check-circle',
              url: '/projects'
            },
            {
              id: 'project-items',
              title: 'Campaigns and Fundraising',
              type: 'item',
              icon: 'feather icon-check-circle',
              url: '/campaigns'
            }
          ]
        }
      ]
    },
    {
      id: 'pages',
      title: 'Pages',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'pages',
          title: 'Pages',
          type: 'collapse',
          icon: 'feather icon-folder',
          children: [
            {
              id: 'home-page',
              title: 'Homes page',
              type: 'item',
              icon: 'feather icon-home',
              url: '/home'
            },   
            {
              id: 'about-page',
              title: 'About',
              type: 'item',
              icon: 'feather icon-briefcase',
              url: '/about'
            },
            {
              id: 'gallery-page',
              title: 'Gallery',
              type: 'item',
              icon: 'feather icon-camera',
              url: '/gallery'
            },   
            {
              id: 'success-stories',
              title: 'Success Stories',
              type: 'item',
              icon: 'feather icon-award',
              url: '/stories'
            },   
            {
              id: 'teams',
              title: 'Team',
              type: 'item',
              icon: 'feather icon-user',
              url: '/teams'
            },   
            {
              id: 'newsletter',
              title: 'News Letters',
              type: 'item',
              icon: 'feather icon-file-text',
              url: '/news'
            }
          ]
        }
      ]
    },
    {
      id: 'account',
      title: 'Accounts',
      type: 'group',
      icon: 'icon-lock',
      children: [
        {
          id: 'user-accounts',
          title: 'User Accounts',
          type: 'item',
          url: '/users',
          icon: 'feather icon-user-check',
        },
        {
          id: 'create-new-users',
          title: 'Create Users',
          type: 'item',
          url: '/adduser',
          icon: 'feather icon-user-plus',
        }
      ]
    }
  ]
};

export default menuItems;
