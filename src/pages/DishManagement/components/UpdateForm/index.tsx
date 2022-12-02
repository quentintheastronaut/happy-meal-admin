import { UploadOutlined } from '@ant-design/icons';
import { Button, Col, Form, Image, Input, InputNumber, message, Row, Upload } from 'antd';
import { UploadProps } from 'antd/es/upload/interface';
import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './index.less';

const UpdateForm: React.FC = (props: any) => {
  const { values, form } = props;

  useEffect(() => {
    form.setFieldsValue({
      ...values,
    });
  }, [values]);

  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      const isPNG = file.type === 'image/png';
      if (!isPNG) {
        message.error(`${file.name} is not a png file`);
      }
      return isPNG || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      console.log(info.fileList);
    },
  };

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
          <Form.Item name="slug" label="Slug" rules={[{ required: true }]}>
            <Input placeholder="Input slug" />
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
          <Form.Item name="cookingTime" label="Cooking Time" rules={[{ required: true }]}>
            <InputNumber addonAfter="min" placeholder="Input cooking time" />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <TextArea />
          </Form.Item>
          <Form.Item name="recipe" label="Recipe" rules={[{ required: true }]}>
            <ReactQuill theme="snow" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default UpdateForm;
