// ** React Imports
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '@src/assets/images/logo/ah_logo.png'

// ** Icons Imports
import { Disc, X, Circle, Menu } from 'react-feather'

// ** Hooks
import useWindowSize from '../../../../../hooks/useWindowSize'

// ** Config
//import themeConfig from '@configs/themeConfig'

// ** Utils
import { getUserData, getHomeRouteForLoggedInUser } from '@utils'

const VerticalMenuHeader = props => {
  // ** Props
  const { menuCollapsed, setMenuCollapsed, setMenuVisibility, setGroupOpen, menuHover, menuVisibility } = props

  // ** Hooks
  const windowSize = useWindowSize()
  const isMobile = windowSize.width < 1200

  // ** Vars
  const user = getUserData()

  // ** Reset open group
  useEffect(() => {
    if (!menuHover && menuCollapsed) setGroupOpen([])
  }, [menuHover, menuCollapsed])

  // ** Menu toggler component
  const Toggler = () => {
    if (!menuCollapsed) {
      return (
        <Disc
          size={20}
          data-tour='toggle-icon'
          className='text-primary toggle-icon d-none d-xl-block'
          onClick={() => setMenuCollapsed(true)}
        />
      )
    } else {
      return (
        <Circle
          size={20}
          data-tour='toggle-icon'
          className='text-primary toggle-icon d-none d-xl-block'
          onClick={() => setMenuCollapsed(false)}
        />
      )
    }
  }

  return (
    <div className='navbar-header'>
      <ul className='nav navbar-nav flex-row'>
        <li className='nav-item me-auto'>
          <NavLink to={user ? getHomeRouteForLoggedInUser(user.role) : '/'} className='navbar-brand'>
          <text>Akomwayo Ministries</text>
          </NavLink>
        </li>
        <li className='nav-item nav-toggle'>
          <div className='nav-link modern-nav-toggle cursor-pointer'>
            <Toggler />
            {isMobile && (
              <>
                {!menuVisibility && (
                  <Menu 
                    onClick={() => setMenuVisibility(!menuVisibility)} 
                    className='toggle-icon icon-menu'
                    style={{ color: '#6c757d', cursor: 'pointer', marginLeft: '8px' }}
                    size={20} 
                  />
                )}
                {menuVisibility && (
                  <X 
                    onClick={() => setMenuVisibility(false)} 
                    className='toggle-icon icon-x'
                    style={{ color: '#6c757d', cursor: 'pointer', marginLeft: '8px' }}
                    size={20} 
                  />
                )}
              </>
            )}
          </div>
        </li>
      </ul>
    </div>
  )
}

export default VerticalMenuHeader
