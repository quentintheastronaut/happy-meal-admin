import {
  Avatar,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Typography,
  DatePicker,
  Select,
  message,
  Upload,
  notification,
  Button,
} from 'antd';
import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import styles from './index.less';
import { ACTIVITY_INTENSITY_LIST, HEALTH_GOAL_LIST, SEX_LIST, timeFormat } from '@/ultis/constants';
import moment from 'moment';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { storage } from '@/firebase/firebase';
import { v4 } from 'uuid';
import { RcFile } from 'antd/lib/upload';

const { Title } = Typography;
const { Option } = Select;

const UpdateForm: React.FC = (props: any) => {
  const { values, form } = props;
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    form.setFieldsValue({
      ...values,
      dob: values?.dob ? moment(values?.dob) : moment(),
      imageUrl,
    });
  }, [values, imageUrl]);

  const handleChange: UploadProps['onChange'] = async (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      const imageFile = info.file.originFileObj as RcFile;

      if (!imageFile) return;
      const imageRef = ref(storage, `/avatar/${imageFile?.name + v4()}`);
      await uploadBytes(imageRef, imageFile).then((response) => {
        setLoading(false);
        console.log(response);
        notification.success({ message: 'Image Uploaded' });
        getDownloadURL(response.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
        });
      });
    }
  };

  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      const isPNG = file.type === 'image/png';
      if (!isPNG) {
        message.error(`${file?.name} is not a png file`);
      }
      return isPNG || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      handleChange(info);
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
            <Avatar size={222} src={`${imageUrl || values?.imageUrl}`} />
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />} loading={loading}>
                Upload
              </Button>
            </Upload>
            <Input
              style={{
                width: '100%',
              }}
              value={imageUrl || values?.imageUrl}
              placeholder="Input image URL"
            />
          </Form.Item>
        </Col>
        <Col span={18}>
          <Title level={4}>Personal Information</Title>
          <div className={`${styles.section}`}>
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
              <Col span={12}>
                <Form.Item name="dob" label="Date of birth" rules={[{ required: true }]}>
                  <DatePicker format={timeFormat.DATE} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="age" label="Age" rules={[{ required: true }]}>
                  <InputNumber addonAfter="years old" placeholder="Input age" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              name="sex"
              label="Sex"
              rules={[{ required: true }]}
              initialValue={SEX_LIST[0]}
            >
              <Select>
                {SEX_LIST.map((item) => {
                  return (
                    <Option key={item} value={item}>
                      <div style={{ textTransform: 'capitalize' }}>{item}</div>
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </div>

          <Title level={4}>Credential Information</Title>
          <div className={`${styles.section}`}>
            <Form.Item name="email" label="Email" rules={[{ required: true }]}>
              <Input placeholder="Input email" />
            </Form.Item>
          </div>

          <Title level={4}>Body Index</Title>
          <div className={`${styles.section}`}>
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
          </div>

          <Title level={4}>Health Goal</Title>
          <div className={`${styles.section}`}>
            <Form.Item
              name="healthGoal"
              label="Goal"
              rules={[{ required: true }]}
              initialValue={HEALTH_GOAL_LIST[0]}
            >
              <Select>
                {HEALTH_GOAL_LIST.map((item) => {
                  return (
                    <Option key={item.value} value={item.value}>
                      {item.label}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              name="activityIntensity"
              label="Activity intensity"
              rules={[{ required: true }]}
              initialValue={ACTIVITY_INTENSITY_LIST[0]}
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
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default UpdateForm;
