import { Col, Form, Image, Input, Row } from 'antd';
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
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Image src={values?.imageUrl} style={{ width: '100%' }} />
          <Form.Item
            name="imageUrl"
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '16px',
            }}
            label="Image"
            rules={[{ required: true }]}
          >
            <Input
              style={{
                width: '100%',
              }}
              placeholder="Input image URL"
            />
          </Form.Item>
        </Col>
        <Col span={18}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input placeholder="Input name" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default UpdateForm;
