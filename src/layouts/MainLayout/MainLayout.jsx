import { Outlet } from 'react-router-dom';

/*** CSS Imports ***/
import './MainLayout.css';

/***  Component Imports ***/
import Sidebar from 'components/Common/Sidebar/Sidebar';

function MainLayout() {
    return (
        <>
            <section className='app_body'>
                <div className='app_sidebar col-sm-12 col-lg-3'>
                    <Sidebar />
                </div>
                <div className='app_main col-sm-12 col-lg-9'>
                    <Outlet />
                </div>
            </section>
        </>
    );
}

export default MainLayout;