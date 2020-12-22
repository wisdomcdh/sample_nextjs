import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ApiStore from '../../apiStore'
import reducerHandler from '@Services/utils/reducerHandler'


const name = "customer";

const fetchLogin = createAsyncThunk(
    `${name}/fetchLogin`,
    async (reqDto) => {
        const response = await ApiStore.customer.login(reqDto);
        return response.data
    }
);

const fetchExtention = createAsyncThunk(
    `${name}/fetchExtention`,
    async () => {
        const response = await ApiStore.customer.extention();
        return response.data;
    }
);

const customerSlice = createSlice({
    name: `${name}`,
    initialState: {
        login: {},
        extenstion: {}
    },
    reducers: {},
    extraReducers: {
        [fetchLogin.pending]: reducerHandler.pending('login'),
        [fetchLogin.fulfilled]: reducerHandler.fulfilled('login'),
        [fetchLogin.rejected]: reducerHandler.rejected('login'),

        [fetchExtention.fulfilled]: reducerHandler.fulfilled('extenstion'),
        [fetchExtention.rejected]: reducerHandler.rejected('extenstion')
    }
});

const customerFetch = {
    fetchLogin,
    fetchExtention
}

export {
    customerSlice,
    customerFetch
}