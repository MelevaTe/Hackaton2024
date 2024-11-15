import React from 'react'
import cl from './OgModal.module.css'

export default function MyModal({ isActive, setIsActive, children}) {
    return (
        <div onClick={() => setIsActive(false)} className={isActive ? cl.modal + ' ' + cl.active: cl.modal}>
            <div className={isActive ? cl.modal__content + ' ' + cl.active: cl.modal__content} onClick={e => e.stopPropagation()}>
                { children }
            </div>
        </div>
    )
}