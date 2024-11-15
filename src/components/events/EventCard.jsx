import React, {useContext} from 'react';
import cl from './EventCard.module.css';
import soloLogo from '../../static/imgs/user.svg';
import comandLogo from '../../static/imgs/users02.svg';
import OgButton from '../UI/ogButton/OgButton';
import {Context} from "../../index";


const EventCard = ({ event, isActive, setIsActive, isSubscribed }) => {

    const {store,events} = useContext(Context);



    return (
        <div className={cl.event__card}>
            <div
                className={cl.event__card__content}
                style={{
                    '--background-image': `url(${event.type === 'командное' ? comandLogo : soloLogo})`
                }}
            >
                <div>
                    <h3>{event.description}</h3>
                    <p style={{ paddingBlock: 5 }}>Правила: {event.rules}</p>
                    <p>{event.date}</p>
                    <a
                        className={cl.links}
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsActive(true)
                        }}
                    >
                        Подробнее
                    </a>
                </div>
            </div>
            <OgButton additionalClass={cl.event__reg__btn}
                      onClick={() => store.addChellengeToUser(localStorage.getItem("id"), event.challengeId)
            }
            >{isSubscribed ? "Отписаться" : "Зарегистрироваться"}</OgButton>
        </div>
    );
};

export default EventCard;
