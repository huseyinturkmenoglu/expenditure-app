import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import {showError} from "../../utils/showMessages";

function SingUp() {
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };
    /* eslint-enable no-template-curly-in-string */

    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        try {
            await api.post("/users/register", values);
            debugger;
            navigate("/login",{ state: { newSingUp: true}});
        } catch (error: any) {
            showError(error.response.data.errorMessage);
        }
    };

    return (
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <h3 style={{ textAlign: "center", marginBottom: 30 }}>Register An Account</h3>
            <Form.Item name="username" label="Username" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true, min: 6 }]} >
                <Input.Password />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ type: 'email', required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="full_name" label="Full Name">
                <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

export default SingUp;