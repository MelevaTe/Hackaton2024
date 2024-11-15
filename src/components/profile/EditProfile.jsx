import React, { useContext, useEffect, useState } from 'react';
import cl from "../login/LogInSignIn.module.css";
import OgInput from "../UI/ogInput/OgInput";
import { changeHandler } from "../../utils/changeHandler";
import OgButton from "../UI/ogButton/OgButton";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";

const EditProfile = ({ closeModal }) => {
    const [description, setDescription] = useState("");
    const [goals, setGoals] = useState("");
    const [age, setAge] = useState("");
    const [hasError, setHasError] = useState({ description: false, goals: false, age: false });
    const { store } = useContext(Context);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const isFormInvalid = hasError.description || hasError.goals || hasError.age;
    useEffect(() => {
        const isFormValid = description && goals && age && !isFormInvalid;
        setIsButtonDisabled(!isFormValid);
    }, [description, goals, age, hasError]);

    return (
        <div>
            <form
                className={cl.my_form}
                onSubmit={(event) => {
                    event.preventDefault();
                    if (!isFormInvalid) {
                        store.editUserInfo(localStorage.getItem('id'), {
                            name: store.user?.name,
                            username: store.user?.username,
                            goals,
                            age,
                            description,
                            sex: store.user?.sex
                        });

                        setDescription("");
                        setGoals("");
                        setAge("");
                        closeModal();
                    }
                }}
            >
                <OgInput
                    type="text"
                    name="description"
                    id="description"
                    value={description}
                    onChange={(event) => changeHandler(event, setDescription, setHasError, "description")}
                    placeholder="Описание"
                    style={{ borderColor: hasError.description ? "red" : null }}
                />
                <OgInput
                    type="text"
                    name="goals"
                    id="goals"
                    value={goals}
                    onChange={(event) => changeHandler(event, setGoals, setHasError, "goals")}
                    placeholder="Goals"
                    style={{ borderColor: hasError.goals ? "red" : null }}
                />
                <OgInput
                    type="text"
                    name="age"
                    id="age"
                    value={age}
                    onChange={(event) => changeHandler(event, setAge, setHasError, "age")}
                    placeholder="Возраст"
                    style={{ borderColor: hasError.age ? "red" : null }}
                />
                <div className={cl.form__btns__container}>
                    <OgButton disabled={isButtonDisabled}>
                        Сохранить
                    </OgButton>
                </div>
            </form>
        </div>
    );
};

export default observer(EditProfile);
