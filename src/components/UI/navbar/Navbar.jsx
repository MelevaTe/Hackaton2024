import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { Context } from "../../../index";
import cl from './Navbar.module.css'

export default function Navbar() {
  const {store} = useContext(Context);

  return (
    <nav className={cl.nav}>
      <div className={cl.navbar__content}>
        <Link className={cl.tab + " " + cl.active} to='/profile'>Профиль</Link>
          <Link className={cl.tab + " " + cl.acitve} to='/events' >Мероприятия</Link>
          {store.isAdmin &&
              <Link className={cl.tab} to='/create-event'>Создать движ</Link>}
        <div className={cl.tab + " " + cl.logout} onClick={() => store.logout()}>Выход</div>
      </div>
    </nav>
  )
}
