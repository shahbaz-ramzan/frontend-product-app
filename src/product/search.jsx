import React, { useState } from 'react';
import { Button, Input } from 'antd';
import "./product.css";
import AddModal from './add_modal';

function SearchInput() {
  const { Search } = Input;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

const onSearch=(value)=>{
    console.log("value",value)
}

  return (
    <div className='search-wrapper'>
      <Search 
        className="search-field" 
        placeholder="input search text" 
        enterButton="Search" 
        size="large" 
        // loading 
        onSearch={(value)=>onSearch(value)}
      />
      <Button 
        className='add-btn' 
        type='primary' 
        onClick={showModal}
      >
        Add Products
      </Button>
      {isModalOpen &&
      <AddModal 
      isModalOpen={isModalOpen} 
      handleCancel={handleCancel} 
      handleOk={handleOk} 
      />    
    }
    </div>
  );
}

export default SearchInput;
