import React, {useContext, useState} from "react";
import { Calendar } from 'primereact/calendar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import cl from './OgCalendar.module.css';
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";

const OgCalendar = () => {
    const [dates, setDates] = useState(null);
    const {store} = useContext(Context);

    // Функция форматирования даты
    const formatDate = (date) => date ? date.toLocaleDateString() : '';

    const handleGetChellenge = () => {
        if (dates && dates.length === 2) {
            const data = {
                from: formatDate(dates[0]),
                to: formatDate(dates[1])
            };
            store.getChellenge(data);
            console.log(data);
        }
    };

    return (
        <div className={cl.calendarContainer}>
            <Calendar
                value={dates}
                className={cl.calendar}
                onChange={(e) => {
                    setDates(e.value);
                    handleGetChellenge(); // Вызывайте функцию при изменении дат
                }}
                selectionMode="range"
                readOnlyInput
                showButtonBar
                inline
            />
            {dates && dates.length === 2 && (
                <div style={{ marginBlockStart: '10px' }}>
                    <p>Первая дата: {formatDate(dates[0])}</p>
                    <p>Последняя дата: {formatDate(dates[1])}</p>
                </div>
            )}
        </div>
    );
}


export default observer(OgCalendar);