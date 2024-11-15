import React, { useContext, useState } from 'react'
import main__page__cl from '../../static/styles/MainPages.module.css'
import create__cl from './CreateEvents.module.css'
import OgInput from '../UI/ogInput/OgInput'
import { changeHandler } from '../../utils/changeHandler'
import OgButton from '../UI/ogButton/OgButton'
import { Context } from '../../index'

export default function CreateEvents() {
    const [title, setTitle] = useState('')
    const [hasError, setHasError] = useState({
        title: false, date: false,
        type: false, rules: false,
        desc: false
    });

    const { store } = useContext(Context);

    const isFormInvalid = hasError.username || hasError.password;

    return (
        <div className={main__page__cl.page__container}>
            <div className={main__page__cl.page__content}>
                <h1 className={create__cl.create__event__header}>Создать новую суету</h1>

                <form action="">
                    <OgInput
                        type="text"
                        name="username"
                        id="username"
                        value={title}
                        onChange={(event) => changeHandler(event, setTitle, setHasError, "username")}
                        placeholder="Название"

                    />
                    <select
                        id="reason"
                        className="control"
                        // value={form.reason}
                        onChange={(evt) => console.log(evt)}
                    >
                        <option value="error">Одиночное</option>
                        <option value="help">Групповое</option>
                    </select>

                    <OgInput
                        type="datetime-local"
                        name="date"
                        id="date"
                        value={title}
                        onChange={(event) => console.log(event)}
                    />
                    <OgInput
                        type="text"
                        name="rules"
                        id="rules"
                        value={title}
                        onChange={(event) => console.log(event)}
                        placeholder="Правила"
                    />
                    <OgInput
                        type="text"
                        name="description"
                        id="description"
                        value={title}
                        onChange={(event) => console.log(event)}
                        placeholder="Описание"
                    />

                    <div>
                        <OgButton disabled={isFormInvalid}>
                            Войти
                        </OgButton>
                    </div>
                </form>
            </div>
        </div>
    )
}