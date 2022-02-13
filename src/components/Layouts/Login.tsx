/* eslint-disable react-hooks/rules-of-hooks */
import { Form, Input, Button, Result } from 'antd';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { NewSignUp } from '../../types/notifications';
import { LoginForm } from '../../types/user';
import { showError, showSucces } from '../../utils/showMessages';

import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store';
import { login } from '../../store/actions/userActions';

function Login() {
    const navigate = useNavigate();
    const locations = useLocation() as NewSignUp;
    const dispatch = useDispatch();

    const { data, error } = useSelector((state: AppState) => state.user);

    const onFinish = (values: LoginForm) => {
        dispatch(login(values));
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        data.username && token && showSucces("You have successfully logged in!");
        error && showError(error);
        if (token) navigate("/");
    }, [data.token, data.username, error, navigate]);

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <h3 style={{ textAlign: "center", marginBottom: 30 }}>Login</h3>
            {locations.state?.newSingUp && <Result
                status="success"
                title="Succesfully signed up!"
                subTitle="Please login using your credentials."
            />}
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="ghost" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Login;