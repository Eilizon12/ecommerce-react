import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'



const sidebar = () => {
  return (
    <Fragment>
         <div className="sidebar-wrapper">
                <nav id="sidebar">
                    <ul className="list-unstyled components">
                    <li>
                        <Link to="/dashboard"><i className=" fa fa-tachometer-alt"></i> Dashboard</Link>
                    </li>
            
                    <li>
                        <Link to="#" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fab fa-product-hunt"></i> Products</Link>
                        <ul className="collapse list-unstyled" id="productSubmenu">
                            <li>
                            <Link to="#"><i className=" fa-clipboard-list"></i> All</Link>
                            </li>
            
                            <li>
                            <Link to="#"><i className=" fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link to="#"><i className=" fa-shopping-basket"></i> Orders</Link>
                    </li>

                    <li>
                        <Link to="#"><i className=" fa-users"></i> Users</Link>
                    </li>
            
                </ul>
                </nav>
            </div>
    </Fragment>
  )
}

export default sidebar