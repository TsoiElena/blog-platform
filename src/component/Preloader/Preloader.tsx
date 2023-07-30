import React from 'react';
import { Space } from 'antd';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import loader from '../../assets/1474(1).gif';
const Preloader = () => (
  <Space direction="vertical" style={{ width: '100%', marginTop: '200px' }} align={'center'}>
    <img src={loader} alt="" />
  </Space>
);

export default Preloader;
