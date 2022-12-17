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
  Spin,
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
import { ORDER } from '@/ultis/constants';

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
      measurementTypeId: values?.measurementType?.id || measurementList[0].id,
    });
  }, [values]);

  useEffect(() => {
    saveParams({
      ...params,
      order: ORDER.DESC,
      limit: 50,
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
      <Spin spinning={loadingFetchIngredientList || false}>
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
      </Spin>
      <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
        <InputNumber placeholder="Input quantity" />
      </Form.Item>
      <Form.Item name="measurementTypeId" label="Measurement Type" rules={[{ required: true }]}>
        <Select>
          {measurementList.map((item) => {
            return (
              <Option key={item.name} value={item.id}>
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
