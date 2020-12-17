import React from 'react';
import { Spin } from 'antd';

const Loader = ({ children, loading }) => (
  <Spin spinning={loading} tip="Завантаження...">
    {children}
  </Spin>
);

export default Loader;