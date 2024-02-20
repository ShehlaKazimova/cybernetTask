import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { generalRoutes } from '../routes/Routes'

const PrivateRouters = () => {
    return (
        <>
            <Routes>
                <Route>
                    {generalRoutes?.map(({ path, element }) => (
                        <Route path={path} element={element} key={path} />
                    ))}
                </Route>
            </Routes>
        </>
    )
}

export default PrivateRouters