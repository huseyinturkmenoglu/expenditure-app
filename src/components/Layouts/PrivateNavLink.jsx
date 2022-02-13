import { Menu } from "antd";

import { Link, useNavigate } from "react-router-dom";

function PrivateNavLink() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const deleteToken = () => {
        window.localStorage.removeItem('token');
        navigate("/");
    }

    const ActiveUser = () => {
        if (token) {
            return (
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
                    <Menu.Item key="2" onClick={deleteToken}>Logout</Menu.Item>
                </Menu>
            );
        } else {
            return (
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1"><Link to="/">Login</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/register">Register</Link></Menu.Item>
                </Menu>
            );
        }
    }

    return <ActiveUser />;
}

export default PrivateNavLink;