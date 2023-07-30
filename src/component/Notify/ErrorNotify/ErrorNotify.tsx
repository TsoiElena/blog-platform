import React from 'react';
import { Alert, Space } from 'antd';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import s from './errorNotify.module.scss';

const ErrorNotify: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Alert
      className={s.error}
      message="Error"
      description="Sorry, we have some problem! Please, try it later!"
      type="error"
    />
  </Space>
);

export default ErrorNotify;
