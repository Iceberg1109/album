import React from 'react'
import { Menu } from 'semantic-ui-react'

import Logo from '../logo.png'

export default ({ setUpload }) => {
  return (
    <Menu pointing secondary>
      <Menu.Item>
        <img src={Logo} className='nav-logo' />
      </Menu.Item>

      <Menu.Item position='right' onClick={() => setUpload(true)}>
          Upload
      </Menu.Item>
    </Menu>
  )
}
