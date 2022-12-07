import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  Typography,
  InputNumber,
  notification,
  Row,
  Upload,
  Table,
  Tooltip,
  Spin,
  Modal,
} from 'antd';
import { UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import TextArea from 'antd/lib/input/TextArea';
import { RcFile } from 'antd/lib/upload';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { storage } from '@/firebase/firebase';
import { v4 } from 'uuid';
import styles from './index.less';
import { connect } from 'umi';
import mapStateToProps from './mapStateToProps';
import confirm from 'antd/lib/modal/confirm';
import UpdateIngredientForm from '../UpdateIngredientForm';

const { Title } = Typography;

const UpdateForm = (props) => {
  const {
    isUpdate,
    modal,
    values,
    form,
    ingredients,
    fetchIngredient,
    saveCurrentDishId,
    loadingFetchIngredient,
    removeIngredient,
    updateIngredient,
    addIngredient,
  } = props;
  const slug = Form.useWatch('slug', form);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const [createFrom] = Form.useForm();
  const [updateFrom] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      ...values,
      imageUrl: imageUrl || values?.imageUrl,
    });
  }, [values, form, imageUrl]);

  useEffect(() => {
    if (values) {
      const payload = {
        id: values?.id,
      };
      // fetchIngredient(payload);
      saveCurrentDishId(values.id);
    }
  }, [values]);

  const handleChange = async (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      const imageFile = info.file.originFileObj;
      setLoading(false);

      console.log(storage);
      console.log(ref);

      if (!imageFile) return;
      const imageRef = ref(storage, `/images/${slug}/${imageFile?.name + v4()}`);
      await uploadBytes(imageRef, imageFile).then((response) => {
        console.log(response);
        notification.success({ message: 'Image Uploaded' });
        getDownloadURL(response.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
        });
      });
    }
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const isValidImage =
        file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg';
      if (!isValidImage) {
        notification.error(`${file?.name} is invalid file. Only jpg, jpeg, png are available.`);
      }
      return isValidImage || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      handleChange(info);
    },
  };

  const handelDelete = (id) => {
    const payload = { id };
    removeIngredient(payload);
  };

  const showConfirm = (record) => {
    modal.confirm({
      maskClosable: true,
      title: 'Do you want to delete this dish ?',
      icon: (
        <Tooltip placement="top" title={'Warning'}>
          <ExclamationCircleFilled />
        </Tooltip>
      ),
      centered: true,
      onOk: () => handelDelete(record.ingredientToDishId),
      onCancel: () => {},
    });
  };

  const handleClickCreate = () => {
    modal.confirm({
      width: 500,
      icon: null,
      centered: true,
      title: 'Add new ingredient',
      maskClosable: true,
      content: <UpdateIngredientForm isUpdate={false} form={createFrom} />,
      okText: 'Create',
      onOk: (close) => {
        return createFrom.validateFields().then(async (items) => {
          const payload = {
            ...items,
            dishId: values.id.toString(),
            ingredientId: items.ingredientId.toString(),
          };
          await addIngredient(payload);
          createFrom.resetFields();
          await close();
        });
      },
    });
  };

  const handleClickUpdate = (record) => {
    modal.confirm({
      width: 500,
      icon: null,
      centered: true,
      title: `Update ${record.ingredient.name}`,
      maskClosable: true,
      content: <UpdateIngredientForm isUpdate={true} form={updateFrom} values={record} />,
      okText: 'Update',
      onOk: (close) => {
        return updateFrom.validateFields().then(async (items) => {
          const payload = {
            ...items,
            dishId: record.dishId.toString(),
            ingredientId: record.ingredient.id.toString(),
          };
          await updateIngredient(payload);
          updateFrom.resetFields();
          await close();
        });
      },
    });
  };

  const columns = [
    {
      dataIndex: ['ingredient', 'imageUrl'],
      width: 32,
      render: (imageUrl) => {
        return (
          <Image
            fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
            src={imageUrl}
            style={{ width: '32px', height: '32px' }}
          />
        );
      },
    },
    {
      title: 'Name',
      dataIndex: ['ingredient', 'name'],
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Measurement Type',
      dataIndex: 'measurementType',
    },
    {
      title: 'Action',
      render: (record) => {
        return (
          <div>
            <Row gutter={[8, 8]}>
              <Col>
                <Button type="primary">
                  <Tooltip
                    placement="top"
                    title={'Click to update'}
                    onClick={() => handleClickUpdate(record)}
                  >
                    <EditOutlined /> Update
                  </Tooltip>
                </Button>
              </Col>
              <Col>
                <Button type="primary" danger onClick={() => showConfirm(record)}>
                  <Tooltip placement="top" title={'Click to delete'}>
                    <DeleteOutlined /> Delete
                  </Tooltip>
                </Button>
              </Col>
            </Row>
          </div>
        );
      },
    },
  ];

  return (
    <div>
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
              <Image
                style={{ width: '212px' }}
                src={`${imageUrl || values?.imageUrl}`}
                fallback="data:image/png;base64,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"
              />
              <Upload {...uploadProps} disabled={!slug}>
                <Button icon={<UploadOutlined />} loading={loading} disabled={!slug}>
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
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item name="recipe" label="Recipe" rules={[{ required: true }]}>
              {/* <ReactQuill theme="snow" /> */}
              <TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>
        {isUpdate && (
          <div>
            <Row justify="space-between">
              <Title level={4}>Ingredient list</Title>
              <Button type="primary" onClick={() => handleClickCreate()}>
                <PlusOutlined /> Add
              </Button>
            </Row>
            <Spin spinning={loadingFetchIngredient}>
              <Table
                size="small"
                style={{ border: '1px solid #d9d9d9' }}
                columns={columns}
                dataSource={ingredients}
                pagination={false}
              />
            </Spin>
          </div>
        )}
      </Form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchIngredient: (payload) => dispatch({ type: 'dish/fetchIngredient', payload }),
  saveCurrentDishId: (payload) => dispatch({ type: 'dish/saveCurrentDishId', payload }),

  removeIngredient: (payload) => dispatch({ type: 'dish/removeIngredient', payload }),
  updateIngredient: (payload) => dispatch({ type: 'dish/updateIngredient', payload }),
  addIngredient: (payload) => dispatch({ type: 'dish/addIngredient', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateForm);
