import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Store from "./API/store/store";

const store = new Store();

const events = [
    {description: 'взять кейс', rules: 'Нельзя брать кейс джунов',
        date: '26-10-2024', type: 'одиночное', challengeId: 1},

    {description: 'попытаться подонять фронт', rules: 'Нельзя брать кейс джунов',
        date: '26-10-2024', type: 'командное', challengeId: 2},

    {description: 'влепить костыли', rules: 'Нельзя брать кейс джунов',
        date: '26-10-2024', type: 'командное', challengeId: 3},

    {description: 'молиться, что хоть что-то будет работать', rules: 'Нельзя брать кейс джунов',
        date: '26-10-2024', type: 'одиночное', challengeId: 4},

    {description: 'взять кейс', rules: 'Нельзя брать кейс джунов',
        date: '26-10-2024', type: 'одиночное', challengeId: 5},

    {description: 'взять кейс', rules: 'Нельзя брать кейс джунов',
        date: '26-10-2024', type: 'одиночное', challengeId: 6},

    {description: 'попытаться подонять фронт', rules: 'Нельзя брать кейс джунов',
        date: '26-10-2024', type: 'командное', challengeId: 7},

    {description: 'влепить костыли', rules: 'Нельзя брать кейс джунов',
        date: '26-10-2024', type: 'командное', challengeId: 8},

    {description: 'молиться, что хоть что-то будет работать', rules: 'Нельзя брать кейс джунов',
        date: '26-10-2024', type: 'одиночное', challengeId: 9},

    {description: 'взять кейс', rules: 'Нельзя брать кейс джунов',
        date: '26-10-2024', type: 'одиночное', challengeId: 10},

]

export const Context = createContext({
    store, events
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{ store,events }}>
        <App />
    </Context.Provider>
);
