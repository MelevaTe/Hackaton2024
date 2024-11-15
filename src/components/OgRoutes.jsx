import React from 'react'
import {Route, Routes, Navigate} from "react-router-dom";

export default function OgRoutes({ routes, baseRoute }) {
    return (
        <Routes>
            {routes.map(route =>
                <Route
                    element={route.element}
                    path={route.path}
                    key={route.path}
                />
            )};
            <Route path="/*" element={<Navigate to={baseRoute} />} />
        </Routes>
    )
}