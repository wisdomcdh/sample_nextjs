import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux'
import AppEvent from '@Services/appEvent'

const AlertItem = ({ openInfo }) => {
    const close = () => {
        AppEvent.TR_MODAL_CLOSE({ type: 'CLOSE', openInfo });
    }
    const dismiss = () => {
        AppEvent.TR_MODAL_CLOSE({ type: 'DISMISS', openInfo });
    }
    const backdrop = () => {
        AppEvent.TR_MODAL_CLOSE({ type: 'DISMISS_BACKDROP', openInfo });
    }
    return (
        <div>
            <div>
                <span>{JSON.stringify(openInfo)}</span>
                <button onClick={close}>닫기</button>
                {openInfo.type === 'confirm' ? <button onClick={dismiss}>취소</button> : null}
            </div>
            <div onClick={backdrop}></div>
        </div>
    );
}
const Alert = () => {
    const modal = useSelector(state => state._core.modal);
    return process.browser ? createPortal(
        <>
            {modal.map(value => value ? <AlertItem key={value.key} openInfo={value} /> : null)}
        </>
        , document.body) : null;
}
export default Alert;