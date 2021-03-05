import React, {useState} from 'react'

import './Sidebar.css'

import { Link } from 'react-router-dom'
import {FaBars} from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'

import {SidebarData} from './SidebarData'
import Navbar from 'react-bootstrap/Navbar'

import berd_photo from '../images/Berd.png'

function Sidebar() {
    const [sidebar, setSideBar] = useState(false)
    const showSidebar = () => setSideBar(!sidebar)

    return (
        <div>
            <Navbar bg='dark' variant='dark' expand='lg' className='mb-3'>
                <Link to="#" className='menu-bars mr-3'>
                    <FaBars size="30" onClick={showSidebar}/>
                </Link>
                <Navbar.Brand className='d-inline-block align-top mx-auto'>
                    <img alt="" src={berd_photo} width="50"/>
                    <span className="font-weight-bold ml-3">Berd Website</span>
                </Navbar.Brand>
            </Navbar>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className="nav-menu-items" onClick={showSidebar}>
                    <li className="navbar-toggle">
                        <div className="header">Header</div>
                    </li>
                    {SidebarData.map((item, index) => {
                        return(
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar
