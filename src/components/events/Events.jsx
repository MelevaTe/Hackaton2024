import React, { useState, useContext } from 'react';
import cl from './Events.module.css';
import main__page__cl from '../../static/styles/MainPages.module.css'
import { Context } from "../../index";
import OgCalendar from "../UI/myCalendar/OgCalendar";
import EventCard from "./EventCard";
import MyModal from "../UI/OgModal/OgModal";

export default function Events() {
    const { events } = useContext(Context);
    const [isActive, setIsActive] = useState(false);

    return (
        <div className={main__page__cl.page__container}>
            <div className={main__page__cl.page__content}>
                <div className={cl.user__info__container}>
                    <div className={cl.user__info__container__item1st}>
                        <h2 className={cl.user__info__container__item1st__header}>Все события</h2>
                        <div className={cl.user__info__content}>
                            {events && events.map((event, index) => (
                                <EventCard key={index} event={event} isActive={isActive} setIsActive={setIsActive} isSubscribed={false}/>
                            ))}
                        </div>
                    </div>
                    <div className={cl.user__info__container__item2sc}>
                        <OgCalendar/>
                    </div>
                </div>
                <div className={cl.user__achievements}></div>
            </div>

            <MyModal isActive={isActive} setIsActive={setIsActive}>
                Влепить костыли:
                Нужно выжить любой ценой. Неважно, сколько костылей придётся использовать. Приложение должно хоть как-то работать(<span style={{color: "red"}}>Опционально. По возможности</span>).
            </MyModal>

        </div>
    );
}