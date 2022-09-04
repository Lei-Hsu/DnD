import React, { useEffect } from 'react';

import { Button, Form, Input, Modal, Select } from 'antd';
import { emergencyType, EmergencyTypeEnum } from 'components/Card/listCard';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';

import { DoubleLeftOutlined, LineOutlined } from '@ant-design/icons';
import { closeEditCardModal } from '@Redux/slices/global/globalSlice';
import { addNewCard, clearOpenCard, deleteCard } from '@Redux/slices/main/mainSlice';

const EmergencyTypeOptions = [
  {
    label: "高",
    value: EmergencyTypeEnum.High,
    icon: <DoubleLeftOutlined className="rotate-90 text-red-600" />,
  },
  {
    label: "一般",
    value: EmergencyTypeEnum.Normal,
    icon: <LineOutlined className="text-yellow-300" />,
  },
  {
    label: "低",
    value: EmergencyTypeEnum.Low,
    icon: <DoubleLeftOutlined className="-rotate-90 text-blue-600" />,
  },
];

const EditCard = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const { Option } = Select;

  const { visible, width, type, title } = useAppSelector(
    (state) => state.global.editCardModal
  );
  const cardData = useAppSelector((state) => state.main.openCard.data);

  useEffect(() => {
    const { title, emergency } = cardData;
    if (title && emergency) {
      form.setFieldsValue({ title, emergency });
    }
  }, [cardData, form]);

  const handleCloseModal = () => {
    dispatch(closeEditCardModal());
    dispatch(clearOpenCard());
    form.resetFields();
  };

  const handleDeleteCard = () => {
    dispatch(deleteCard({ id: cardData.id as number }));
    handleCloseModal();
  };

  const onFinish = (e: { title: string; emergency: emergencyType }) => {
    const { title, emergency } = e;
    dispatch(addNewCard({ title, emergency }));
    handleCloseModal();
  };

  return (
    <Modal
      title={title}
      centered
      visible={visible}
      onOk={handleCloseModal}
      onCancel={handleCloseModal}
      width={width}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="標題:"
          name="title"
          required
          rules={[{ required: true, message: "請輸入標題" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="狀態:"
          name="emergency"
          required
          rules={[{ required: true, message: "請選擇狀態" }]}
        >
          <Select>
            {EmergencyTypeOptions.map((item) => {
              return (
                <Option value={item.value} key={item.value}>
                  <div className="flex items-center">
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </div>
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <div
          className={`flex ${
            type === "edit" ? " justify-between" : " justify-end"
          }`}
        >
          {type === "edit" && (
            <Button type="primary" danger onClick={handleDeleteCard}>
              刪除
            </Button>
          )}
          <div className="space-x-2">
            <Button type="primary" danger onClick={handleCloseModal}>
              取消
            </Button>
            <Button htmlType="submit" type="primary" className="bg-blue-500">
              確認
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default React.memo(EditCard);
