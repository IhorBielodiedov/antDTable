import { Button, DatePicker, Form, Input, Modal } from "antd";
import { useEffect } from "react";

// Компонент модального окна для добавления/редактирования строк
const ModalForm = ({ visible, onCancel, initialValues, onSubmit }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues]);
  return (
    <Modal
      title={initialValues.index !== undefined ? "Редактировать" : "Добавить"}
      open={visible}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      footer={[
        <Button
          key="cancel"
          onClick={() => {
            form.resetFields();
            onCancel();
          }}
        >
          Отмена
        </Button>,
        <Button key="submit" type="primary" onClick={form.submit}>
          Сохранить
        </Button>,
      ]}
    >
      <Form
        form={form}
        initialValues={initialValues}
        onFinish={onSubmit}
        layout="vertical"
      >
        <Form.Item
          label="Имя"
          name="name"
          rules={[
            {
              required: true,
              message: "Введите имя",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Дата"
          name="date"
          rules={[
            {
              required: true,
              message: "Выберите дату",
            },
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Числовое значение"
          name="numericValue"
          rules={[
            {
              required: true,
              message: "Введите числовое значение",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalForm;
