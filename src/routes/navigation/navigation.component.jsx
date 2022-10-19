import './navigation.styles.scss';
import { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from '../../context/user.context';

const Navigation = () => {
    const { currentUser } = useContext(UserContext)
    return(
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <div><CrwnLogo className='logo'/></div>
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                        Shop
                    </Link>
                    <Link className='nav-link' to='/auth'>
                        {currentUser ? <span>Sign Out</span> : <span>Sign In</span>}
                    </Link>
                </div>
            </div>
            <Outlet/>
        </Fragment>
    )
}

export default Navigation;