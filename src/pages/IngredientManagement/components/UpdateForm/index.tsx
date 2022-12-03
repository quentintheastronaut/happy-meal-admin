import { Col, Form, Image, Input, InputNumber, Row } from 'antd';
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
            {/* <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '16px',
              }}
            >
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />} style={{ width: '100%' }}>
                  Upload image
                </Button>
              </Upload>
            </div>

            <div
              style={{
                textAlign: 'center',
              }}
            >
              Or
            </div> */}
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
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item name="calories" label="Calories" rules={[{ required: true }]}>
                <InputNumber addonAfter="kcal" placeholder="Input calories" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="carbohydrates" label="Carbohydrates" rules={[{ required: true }]}>
                <InputNumber addonAfter="g" placeholder="Input carbohydrates" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item name="protein" label="Protein" rules={[{ required: true }]}>
                <InputNumber addonAfter="g" placeholder="Input protein" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="fat" label="Fat" rules={[{ required: true }]}>
                <InputNumber addonAfter="g" placeholder="Input fat" />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default UpdateForm;
