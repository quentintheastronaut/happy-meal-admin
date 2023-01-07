import { Form, Input } from 'antd';
import React, { useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import styles from './index.less';

const UpdateForm: React.FC = (props: any) => {
  const { values, form } = props;

  useEffect(() => {
    form.setFieldsValue({
      ...values,
    });
  }, [values]);

  return (
    <Form
      layout="vertical"
      form={form}
      name="control-hooks"
      className={`${styles.updateFormContainer}`}
    >
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input placeholder="Input name" />
      </Form.Item>
    </Form>
  );
};

export default UpdateForm;
