import NavTop from '@Components/common/nav/navTop';
const Default = (props) => {
    return (
        <>
            <header></header>
            <NavTop />
            <main role="main">{props.children}</main>
            <footer></footer>
        </>
    );
}
export default Default;