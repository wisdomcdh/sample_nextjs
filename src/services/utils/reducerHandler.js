class ReducerHandler {
    pending(prop) {
        const commonPendingHandler = (state, action) => {
            this.status(state[prop], 'pending');
        }
        return commonPendingHandler;
    }
    fulfilled(prop) {
        const commonFulfilledHandler = (state, action) => {
            state[prop] = action.payload.detail;
            this.status(state[prop], 'fulfilled');
        }
        return commonFulfilledHandler;
    }
    rejected(prop) {
        const commonRejectedHandler = (state, action) => {
            state[prop].$errorData = action.error;
            this.status(state[prop], 'rejected');
        }
        return commonRejectedHandler;
    }
    status(that, type) {
        that.$pending = type === 'pending';
        that.$success = type === 'fulfilled';
        that.$error = type === 'rejected';
        if (type !== 'rejected') {
            delete that.$errorData;
        }
    }
}
export default new ReducerHandler();