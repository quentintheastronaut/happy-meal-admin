import { Avatar, Col, Form, Input, InputNumber, Row, Typography, DatePicker, Select } from 'antd';
import React, { useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import styles from './index.less';
import { ACTIVITY_INTENSITY_LIST, HEALTH_GOAL_LIST, timeFormat } from '@/ultis/constants';
import moment from 'moment';

const { Title } = Typography;
const { Option } = Select;

const UpdateForm: React.FC = (props: any) => {
  const { values, form } = props;

  useEffect(() => {
    form.setFieldsValue({
      ...values,
      dob: moment(values?.dob),
    });
  }, [values]);

  // const uploadProps: UploadProps = {
  //   beforeUpload: (file) => {
  //     const isPNG = file.type === 'image/png';
  //     if (!isPNG) {
  //       message.error(`${file.name} is not a png file`);
  //     }
  //     return isPNG || Upload.LIST_IGNORE;
  //   },
  //   onChange: (info) => {
  //     console.log(info.fileList);
  //   },
  // };

  console.log(values?.dob);

  return (
    <Form
      layout="vertical"
      form={form}
      name="control-hooks"
      className={`${styles.updateFormContainer}`}
    >
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Avatar size={222} src={`${values?.imageUrl}`} />
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
          <Title level={4}>Personal Information</Title>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item name="firstName" label="First name" rules={[{ required: true }]}>
                <Input placeholder="Input first name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="lastName" label="Last name" rules={[{ required: true }]}>
                <Input placeholder="Input last name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Form.Item name="dob" label="Date of birth" rules={[{ required: true }]}>
                <DatePicker format={timeFormat.DATE} />
              </Form.Item>
            </Col>
          </Row>
          <Title level={4}>Credential Information</Title>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input placeholder="Input email" />
          </Form.Item>
          <Title level={4}>Body Index</Title>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item name="height" label="Height" rules={[{ required: true }]}>
                <InputNumber addonAfter="cm" placeholder="Input height" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="weight" label="Weight" rules={[{ required: true }]}>
                <InputNumber addonAfter="kg" placeholder="Input weight" />
              </Form.Item>
            </Col>
          </Row>
          <Title level={4}>Health Goal</Title>
          <Form.Item name="healthGoal" label="Goal" rules={[{ required: true }]}>
            <Select>
              {HEALTH_GOAL_LIST.map((item) => {
                return (
                  <Option key={item.value} value={item.value}>
                    {item.value}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="activityIntensity"
            label="Activity intensity"
            rules={[{ required: true }]}
          >
            <Select>
              {ACTIVITY_INTENSITY_LIST.map((item) => {
                return (
                  <Option key={item.value} value={item.value}>
                    {item.label}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item name="desiredWeight" label="Desired weight" rules={[{ required: true }]}>
            <InputNumber addonAfter="kg" placeholder="Input desired weight" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default UpdateForm;
