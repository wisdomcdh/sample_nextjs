import { withRouter } from 'next/router';
import Link from 'next/link';
import classnames from 'classnames';
import MenuTree from '@Variables/menuTree'

const isActive = (item, router) => {
    return router.pathname === (item.pathname || item.href);
}
const isSubActive = (item, router) => {
    if (item.child) {
        return item.child.find(sitem => {
            return isActive(sitem, router) || isSubActive(sitem, router);
        });
    }
    return false;
}

const MenuItem = ({ item, router }) => {
    return (
        <li className={classnames({
            on: isActive(item, router),
            son: isSubActive(item, router)
        })}>
            <Link href={item.href}><a>{item.label}</a></Link>
            {item.child ?
                (<ul>
                    {item.child.map((sitem, index) => <MenuItem key={index} item={sitem} router={router} />)}
                </ul>)
                : null}
        </li>
    );
}

const NavTop = (props) => {
    return (
        <nav>
            <div>Top Navigation</div>
            <ul>
                {MenuTree.map((value, index) => <MenuItem key={index} item={value} router={props.router} />)}
            </ul>
        </nav>
    );
}
export default withRouter(NavTop);