import { Route, Routes, Navigate } from "react-router-dom";
import { Home, Login, SingUp } from '../index';

function PrivateRoute() {
    const token = localStorage.getItem('token');

    const ActiveUser = () => {
        if (token) {
            return (
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="*"
                        element={<Navigate to="/" />}
                    />
                </Routes>
            );
        } else {
            return (
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<SingUp />} />
                    <Route
                        path="*"
                        element={<Navigate to="/" />}
                    />
                </Routes>
            );
        }
    }

    return <ActiveUser />;
}

export default PrivateRoute;