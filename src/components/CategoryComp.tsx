import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import { addCategory, deleteCategory, getCategories, updateCategory } from "../store/actions/categoryActions";
import { Category, CategoryForm } from "../types/category";

type Mode = "new" | "edit" | "delete";

const defaultForm: CategoryForm = {
    name: "",
    type: "expense",
    color: "black"
}

function CategoryComp() {
    const dispatch = useDispatch();
    const { data, loading } = useSelector((state: AppState) => state.category);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [mode, setMode] = useState<Mode>("new");
    const [form, setForm] = useState<CategoryForm>(defaultForm);
    const [updateId, setUptadeId] = useState<number | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const showModal = (mode: Mode) => {
        debugger;
        setIsModalVisible(true);
        setMode(mode);
        if(mode !== "new") setForm(defaultForm);
    }

    const handleOk = () => {
        if (mode === "new") dispatch(addCategory(form));
        else if (mode === "edit" && typeof updateId === "number") dispatch(updateCategory(form, updateId));
        else if (mode === "delete" && typeof deleteId === "number") dispatch(deleteCategory(deleteId));
        if ((mode === "delete") || form.name) setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setForm(defaultForm);
    };

    const handleFormName = (event: React.FormEvent<HTMLInputElement>) => {
        const element = event.target as HTMLInputElement;
        setForm({ ...form, name: element.value })
    }
    const handleFormType = (event: any) => {
        setForm({ ...form, type: event.value })
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (text: string, category: Category) => {
                return <Tag color={category.color}>{text.toUpperCase()}</Tag>;
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, category: Category) => (
                <Space size="middle">
                    <EditTwoTone twoToneColor="#6495ed" onClick={() => {
                        showModal("edit");
                        setForm(category);
                        setUptadeId(category.id);
                    }} />
                    <DeleteTwoTone twoToneColor="#eb2f96"
                        onClick={() => {
                            setForm(category);
                            showModal("delete");
                            setDeleteId(category.id);
                        }}
                    />
                </Space>
            ),
        },
    ];

    useEffect(() => {
        console.log('dispatch');
        dispatch(getCategories());
    }, [dispatch]);

    return (
        <>
            <div>
                <Button type="primary" onClick={() => showModal("new")}>
                    New Category
                </Button>
                <Modal title={mode === "new"
                    ? "Create New Category"
                    : mode === "edit"
                        ? "Update Category"
                        : "Delete Category"}
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okButtonProps={{ disabled: !(mode === "delete") && !form.name }}
                >
                    <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                        <Form.Item label="Category Name">
                            <Input name="name" value={form.name} onChange={(e: any) => handleFormName(e)} />
                        </Form.Item>
                        <Form.Item label="Category Type">
                            <Select labelInValue defaultValue="income"
                                value={form.type}
                                onChange={(e: any) => handleFormType(e)}>
                                <Select.Option value="income">Income</Select.Option>
                                <Select.Option value="expense">Expense</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Color">
                            <SketchPicker color={form.color} onChange={color => setForm({ ...form, color: color.hex })} />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>

            <Table loading={loading} rowKey={() => Math.random() * 0.10} columns={columns} dataSource={data} />

        </>
    )

}

export default CategoryComp;