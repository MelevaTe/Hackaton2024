import React, {useContext} from 'react'
import {publicRoutes, privateRoutes, adminRoutes} from '../router/routes'
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import Navbar from "./UI/navbar/Navbar";
import OgRoutes from "./OgRoutes";



const MainRouter = () => {

    const { store } = useContext(Context);

    return (
        store.isAuth ?
            <>
                <Navbar/>
                <OgRoutes routes={store.isAdmin ? [...privateRoutes, ...adminRoutes] : privateRoutes } baseRoute={"/profile"} />

            </> :
            <OgRoutes routes={publicRoutes} baseRoute={"/login"} />
    );
};

export default observer(MainRouter);