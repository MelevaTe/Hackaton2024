import React, { useContext, useEffect } from 'react'
import { Context } from "./index";
import { observer } from "mobx-react-lite";
import { BrowserRouter } from "react-router-dom";
import MainRouter from './components/MainRouter';
import "./static/styles/App.css";
import "./static/fonts/font.css";

function App() {

    const { store } = useContext(Context);
    const { events} = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('tokenA')) {
            store.cachedUser();
        }
    }, []);

    if (store.isLoading) {
        return <div>Загрузка...</div>;
    }

    return (
        <>
            <BrowserRouter>
                <MainRouter />
            </BrowserRouter>

        </>
    )
}

export default observer(App);