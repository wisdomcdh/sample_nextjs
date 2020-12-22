import { customerSlice } from "./reducers/customer";
import { _coreSlice } from "./reducers/_core";

export default {
    _core: _coreSlice.reducer,
    customer: customerSlice.reducer
}