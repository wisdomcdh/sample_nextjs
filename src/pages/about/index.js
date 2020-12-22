import { useSelector, useDispatch } from 'react-redux'
import Api from '@Api';
import { useEffect } from 'react';

const about = (props) => {
    const login = useSelector(state => state.customer.login);
    const dispatch = useDispatch();
    const onClick = () => {
        dispatch(Api.customer.fetchLogin({ a: 1 }));
    }
    const onClickExtension = () => {
        dispatch(Api.customer.fetchExtention());
    }
    useEffect(() => {
        //console.log(login);
    }, [login]);
    return (
        <>
            <h1>About</h1>
            <hr />
            <button onClick={onClick}>API TEST(Login)</button>
            <button onClick={onClickExtension}>API TEST(Extension)</button>
            <hr />
            <pre>{JSON.stringify(login)}</pre>
        </>
    );
}

export default about;