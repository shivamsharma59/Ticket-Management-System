import React, { useContext } from 'react'
import logout from '../../services/logoutServices'
import { UserContext } from '../../contexts/userContext'
import './DropDown.css'


function DropDown() {
  const { isLoggedIn } = useContext(UserContext)
  const handleLogout = async () => {
    try {
      const res = await logout()
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='drop-down'>
      <ul>
        <li
          onClick={handleLogout}
        >logout</li>
      </ul>
    </div>
  )
}

export default DropDown;
