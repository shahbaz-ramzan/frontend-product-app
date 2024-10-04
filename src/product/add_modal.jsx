import { Button, Modal, Form, Input, message } from 'antd';
import React, { useEffect } from "react";
import { addProduct, getProduct } from '../services/product';
import ProductList from './productList';

const AddModal = ({ isModalOpen = false, handleOk, handleCancel, productId }) => {
  const [form] = Form.useForm(); 

  useEffect(() => {
    const fetchData = async () => {
      if (productId) {
        const data = await getProduct(productId);
        form.setFieldsValue({
          name: data?.name || '',
          price: data?.price || '',
          quantity: data?.quantity || '',
        });
      } else {
        form.resetFields(); // Reset fields if no productId is provided
      }
    };

    fetchData(); 
  }, [productId, form]); 
  
  const onFinish = async (values) => {
    const payload = {
      name: values?.name,
      price: values?.price,
      quantity: values?.quantity,
    };
    await addProduct(payload);
    message.success("Product Added Successfully");
    handleOk(); 
    form.resetFields(); 
    ProductList();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      title={productId ? "Edit Product" : "Add Product"}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null} 
    >
      <Form
        form={form}
        id="productForm"
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 14,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          name: "",
          price: "",
          quantity: ""
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Product Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input product name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input price!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[
            {
              required: true,
              message: "Please input quantity!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            {productId ? "Update" : "Add"}
          </Button>
          <Button type="default" onClick={handleCancel} style={{ marginRight: '8px' }}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddModal;
