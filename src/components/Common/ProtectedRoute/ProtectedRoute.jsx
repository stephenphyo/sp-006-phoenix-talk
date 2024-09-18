import React from 'react';

/*** Router Imports ***/
import { Outlet, Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ account, isLoading, accessToken }) {

    /* Router */
    const location = useLocation();

    return (
        !account && !isLoading && !accessToken
            ? <Navigate to='/login' state={{ from: location }} replace />
            : <Outlet />
    )
}

export default ProtectedRoute;