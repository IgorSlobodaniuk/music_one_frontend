import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import logout from '../utils/logout.js'
import {Redirect} from "react-router-dom";


class TheHeaderDropdown extends React.Component {
    constructor(props, context){
        super(props, context);
        this.state = {
            redirect: false
        };
    }


   logoutHandler = () => {
        logout.removeToken((status) => {
            if (status.logged_out) {
                this.setState({redirect: true});
            }
        });
    };

   render() {
   if (this.state.redirect){
        return <Redirect to='login/'/>;
    }
    return (
      <CDropdown
        inNav
        className="c-header-nav-items mx-2"
        direction="down"
      >
        <CDropdownToggle className="c-header-nav-link" caret={false}>
          <div className="c-avatar">
            <CImg
              src={'avatars/6.jpg'}
              className="c-avatar-img"
              alt="admin@bootstrapmaster.com"
            />
          </div>
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">

          <CDropdownItem
            header
            tag="div"
            color="light"
            className="text-center"
          >
            <strong>Settings</strong>
          </CDropdownItem>
          <CDropdownItem>
            <CIcon name="cil-user" className="mfe-2" />Profile
          </CDropdownItem>
          <CDropdownItem>
            <CIcon name="cil-settings" className="mfe-2" />
            Settings
          </CDropdownItem>
          <CDropdownItem>
            <CIcon name="cil-credit-card" className="mfe-2" />
            Payments
            <CBadge color="secondary" className="mfs-auto">42</CBadge>
          </CDropdownItem>

          <CDropdownItem onClick={ this.logoutHandler }>
            <CIcon name="cil-lock-locked" className="mfe-2" />
            Logout
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    )
  }
}

export default TheHeaderDropdown;
