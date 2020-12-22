import { createSlice } from '@reduxjs/toolkit';

const _coreSlice = createSlice({
    name: '_core',
    initialState: {
        modal: []
    },
    reducers: {
        showModal(state, action) {
            state.modal.push(action.payload);
        },
        destroyModal(state, action) {
            const findIndex = state.modal.findIndex(v => v.key === action.payload.key);
            state.modal.splice(findIndex, 1);
        }
    }
});

export { _coreSlice };