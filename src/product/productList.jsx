import React, { useEffect, useState } from "react";
import { Space, Table, Tag, message, Spin, Button, Popconfirm } from "antd";
import { deleteProduct, getProductList } from "../services/product";
import Delete from "./delete_modal";
import AddModal from "./add_modal";

const { Column } = Table;

const ProductList = () => {
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productId, setProductId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (record) => {
    console.log("record", record?._id);
    await deleteProduct(record?._id);
    message.success("Product Deleted");
  };
  const handleEdit = (record) => {
    setProductId(record?._id);
    showModal();
  };

  console.log("productId", productId);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const cancel = (e) => {
    console.log(e);
  };
  const renderActions = (record) => (
    <Space size="middle">
      <Button type="link" onClick={() => handleEdit(record)}>
        Edit
      </Button>
      <Popconfirm
        title="Delete the task"
        description="Are you sure to delete this task?"
        onConfirm={() => handleDelete(record)}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <Button type="link" >
          Delete
        </Button>
      </Popconfirm>
    </Space>
  );

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const data = await getProductList();
        setListData(data);
      } catch (error) {
        message.error("Failed to fetch product list.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductList();
  }, []);

  return (
    <Spin spinning={loading}>
      <Table dataSource={listData} rowKey="id">
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Quantity" dataIndex="quantity" key="quantity" />
        <Column title="Price" dataIndex="price" key="price" />
        <Column title="Created At" dataIndex="createdAt" key="createdAt" />
        <Column title="Updated At" dataIndex="updatedAt" key="updatedAt" />
        <Column
          title="Action"
          key="action"
          render={(_, record) => renderActions(record)}
        />
      </Table>
      {isModalOpen && productId && (
        <AddModal
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          handleOk={handleOk}
          productId={productId}
        />
      )}
    </Spin>
  );
};

export default ProductList;
