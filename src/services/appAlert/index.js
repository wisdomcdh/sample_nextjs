import AppEvent from '../appEvent'
let latestKey = 0;
function getNewKey() {
    let key = latestKey = new Date().getTime();
    if (key === latestKey) {
        key = latestKey = new Date().getTime();
    }
    return key;
}
function getOpenInfo(type, info) {
    return {
        key: getNewKey(),
        type, info
    }
}
function getModalPromise(openInfo) {
    const promise = new Promise((resolve, reject) => {
        AppEvent.TR_MODAL_OPEN(openInfo);
        const evntAt = AppEvent.ON_MODAL_CLOSE_AT(openInfo, closeInfo => {
            switch (closeInfo.type) {
                case 'CLOSE':
                    resolve(closeInfo);
                    break;
                case 'DISMISS':
                    reject(closeInfo);
                    break;
                default:
                    break;
            }
            evntAt();
        });
    });

    return {
        result: promise,
        close: () => AppEvent.TR_MODAL_CLOSE({ type: 'CLOSE', openInfo }),
        dismiss: () => AppEvent.TR_MODAL_CLOSE({ type: 'DISMISS', openInfo }),
        destroy: () => AppEvent.TR_MODAL_CLOSE({ type: 'DESTORY', openInfo })
    }
}
/*
AppAlert
info: {
    title: string,
    message: string
}
*/
class AppAlert {
    info = info => {
        return getModalPromise(getOpenInfo('info', info));
    }
    warn = info => {
        return getModalPromise(getOpenInfo('warn', info));
    }
    error = info => {
        return getModalPromise(getOpenInfo('error', info));
    }
    confirm = info => {
        return getModalPromise(getOpenInfo('confirm', info));
    }
}
export default new AppAlert();