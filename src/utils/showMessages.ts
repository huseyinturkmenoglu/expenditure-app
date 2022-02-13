import { message } from "antd";

type Message = string;

export const showError = (msg: Message) => {
    message.error(msg);
};

export const showSucces = (msg: Message) => {
    message.success(msg);
};

