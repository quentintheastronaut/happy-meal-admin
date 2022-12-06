import { UploadOutlined } from '@ant-design/icons';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  InputNumber,
  notification,
  Row,
  Select,
  Upload,
} from 'antd';
import { UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import TextArea from 'antd/lib/input/TextArea';
import { RcFile } from 'antd/lib/upload';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { storage } from '@/firebase/firebase';
import { v4 } from 'uuid';
import { connect } from 'umi';
import mapStateToProps from './mapStateToProps';
import measrement from '@/models/measrement';
import { useDebounceValue } from '@ant-design/pro-components';
import styles from './index.less';

const { Option } = Select;

const UpdateIngredientForm = (props) => {
  const {
    params,
    saveParams,
    isUpdate,
    values,
    form,
    ingredientList,
    measurementList,
    loadingFetchIngredientList,
  } = props;

  const [value, setValue] = useState();
  const debouncedValue = useDebounceValue(value, 500);

  useEffect(() => {
    form.setFieldsValue({
      ...values,
    });
  }, [values]);

  useEffect(() => {
    saveParams({
      ...params,
      search: debouncedValue,
    });
  }, [debouncedValue]);

  const handleSearch = (newValue) => {
    if (newValue) {
      setValue(newValue);
    }
  };

  return (
    <Form
      layout="vertical"
      form={form}
      name="control-hooks"
      className={`${styles.updateIngredientFormContainer}`}
    >
      {!isUpdate && (
        <Form.Item name="ingredientId" label="Ingredient" rules={[{ required: true }]}>
          <Select
            showSearch
            placeholder={'Select ingredient'}
            defaultActiveFirstOption={false}
            showArrow={false}
            onSearch={handleSearch}
            filterOption={false}
            notFoundContent={null}
            options={(ingredientList || []).map((item) => ({
              value: item.id,
              label: item.name,
            }))}
          />
        </Form.Item>
      )}
      <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
        <InputNumber placeholder="Input quantity" />
      </Form.Item>
      <Form.Item
        name="measurementType"
        label="Measurement Type"
        rules={[{ required: true }]}
        initialValue={values?.measrementType || measurementList[0].name}
      >
        <Select>
          {measurementList.map((item) => {
            return (
              <Option key={item.name} value={item.name}>
                <div style={{ textTransform: 'capitalize' }}>{item.name}</div>
              </Option>
            );
          })}
        </Select>
      </Form.Item>
    </Form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  saveParams: (payload) => dispatch({ type: 'ingredient/saveParams', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateIngredientForm);
