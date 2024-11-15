import React, {useContext, useEffect, useState} from 'react'
import {Context} from "../../index";
import cl from './Profile.module.css'
import profileImg from '../../static/imgs/man.png'
import profileImg2 from '../../static/imgs/woooooman.png'
import {observer} from "mobx-react-lite";
import EventCard from "../events/EventCard";
import mainPages__cl from "../../static/styles/MainPages.module.css";
import MyModal from "../UI/OgModal/OgModal";
import EditProfile from "./EditProfile";

const Profile = () => {
    const {store} = useContext(Context);
    const [isActive, setIsActive] = useState(false);
    const [isActive2, setIsActive2] = useState(false);

    useEffect(() => {
        store.getUserInfo(localStorage.getItem('id'));
        store.challenges(localStorage.getItem("id"));
    }, []);

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const openModal = (event) => {
        setSelectedEvent(event);
        setModalOpen(true);
    };

    return (

        <div className={mainPages__cl.page__container}>
            <div className={mainPages__cl.page__content}>
                <div className={cl.pageflex}>
                    <img className={cl.profile__img} src={store.user?.sex === "1" ? profileImg  : profileImg2}
                         alt="icon"/>

                    <div className={cl.user__info}>
                        <div>
                            <h2>Логин: </h2>
                            <p>{store.user ? (store.user.username ? store.user.username :
                                <a onClick={() => {
                                    setIsActive(true)
                                }}>Заполнить</a>) : "Загрузка..."}</p>

                            <h2>Возраст: </h2>
                            <p>{store.user ? (store.user.age ? store.user.age :
                                <a onClick={() => {
                                    setIsActive(true)
                                }}>Заполнить</a>) : "Загрузка..."}</p>

                            <h2>Пол: </h2>
                            <p>
                                {store.user
                                    ? store.user.sex === 1
                                        ? "Муж"
                                        : store.user.sex === 0
                                            ? "Жен"
                                            : <a onClick={() => {
                                                setIsActive(true)
                                            }}>Заполнить</a>
                                    : "Загрузка..."}
                            </p>
                        </div>
                        <div>
                            <h2>О себе: </h2>
                            <p>{store.user ? (store.user.description ? store.user.description :
                                <a onClick={() => {
                                    setIsActive(true)
                                }}>Заполнить</a>) : "Загрузка..."}</p>

                            <h2 style={{paddingBlockStart: "44px"}}>Goals: </h2>
                            <p>{store.user ? (store.user.goals ? store.user.goals :
                                <a onClick={() => {
                                    setIsActive(true)
                                }}>Заполнить</a>) : "Загрузка..."}</p>
                        </div>

                        <button className={cl.btnRefactor}
                                onClick={() => {
                                    setIsActive(true)
                                }}
                        >Редактировать профиль
                        </button>

                    </div>
                </div>
                <hr/>
                <div className={cl.user__achievements}>
                    <h3>Ваши челенджи:</h3>
                    {store.hasChellenge && store.userChellenge.length > 0
                        ? store.userChellenge.map((event, index) => (
                            <EventCard key={index} event={event} isActive={isActive2} setIsActive={setIsActive2} isSubscribed={true}/>
                        ))
                        : <p>Тут как-то пусто... даже слишком</p>}

                </div>
                <MyModal isActive={isActive} setIsActive={setIsActive}>
                    <EditProfile closeModal={() => setIsActive(false)}/>
                </MyModal>
                <MyModal isActive={isActive2} setIsActive={setIsActive2}>
                    попа
                </MyModal>
            </div>
        </div>

    )
}

export default observer(Profile);
