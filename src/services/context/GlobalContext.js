import React, { createContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AppEvent from '@Services/appEvent';
import Action from '@Action';

if (process.env.extend.onMockApi) {
    require('../../../mock/mock-api');
}

const GlobalContext = createContext({
});

const GlobalContextProvider = (props) => {
    const dispatch = useDispatch();
    const modalOpenHandler = (openInfo) => {
        dispatch(Action._core.showModal(openInfo));
    }
    const modalCloseHandler = (closeInfo) => {
        dispatch(Action._core.destroyModal(closeInfo.openInfo));
    }
    useEffect(() => {
        const modalOpenEvnet = AppEvent.ON_MODAL_OPEN(modalOpenHandler);
        const modalCloseEvnet = AppEvent.ON_MODAL_CLOSE(modalCloseHandler);
        return () => {
            modalOpenEvnet();
            modalCloseEvnet();
        }
    }, []);
    return (
        <GlobalContext.Provider value={{}}>
            {props.children}
        </GlobalContext.Provider>
    );
};

export { GlobalContextProvider, GlobalContext };