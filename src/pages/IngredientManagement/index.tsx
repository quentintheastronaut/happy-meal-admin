import BasicLayout, { Body, Header } from '@/components/BasicLayout';
import type { ColumnsType } from 'antd/es/table';
import { ORDER, timeFormat } from '@/ultis/constants';
import { Button, Col, Form, Input, Modal, Row, Spin, Table, Tooltip } from 'antd';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'umi';
import mapStateToProps from './mapStateToProps';
import styles from './index.less';
import {
  DeleteOutlined,
  ExclamationCircleFilled,
  EyeOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import { useDebounceValue } from '@ant-design/pro-components';
import 'antd/dist/antd.css';
import UpdateForm from './components/UpdateForm';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const IngredientManagement: React.FC = (props: any) => {
  const {
    params,
    ingredientList,
    fetchIngredientList,
    deleteIngredient,
    createIngredient,
    updateIngredient,
    refresh,
    loadingFetchIngredientList,
    pageCount,
    saveParams,
  } = props;

  const [value, setValue] = useState<string>();
  const [createFrom] = Form.useForm();
  const [updateFrom] = Form.useForm();
  const debouncedValue = useDebounceValue(value, 500);

  const [modal, contextHolder] = Modal.useModal();
  const [incompatibleModal, ingredientContextHolder] = Modal.useModal();

  const handelDelete = (id: string) => {
    const payload = { id };
    deleteIngredient(payload);
  };

  const suffix = (
    <Tooltip placement="top" title={'Search ingredient'}>
      <SearchOutlined
        style={{
          fontSize: 16,
          color: '#1890ff',
        }}
      />
    </Tooltip>
  );

  const showConfirm = (values: any) => {
    modal.confirm({
      maskClosable: true,
      title: 'Do you want to delete this ingredient ?',
      icon: (
        <Tooltip placement="top" title={'Warning'}>
          <ExclamationCircleFilled />
        </Tooltip>
      ),
      centered: true,
      onOk: () => handelDelete(values.id),
      onCancel: () => {},
    });
  };

  useEffect(() => {
    fetchIngredientList();
  }, []);

  useEffect(() => {
    saveParams({
      ...params,
      search: debouncedValue,
    });
  }, [debouncedValue]);

  const handleChanges = (pagination: any, filters: any, sorter: any) => {
    saveParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
      order: sorter.order === 'descend' ? ORDER.DESC : ORDER.ASC,
    });
  };

  const handleClickUpdate = (values: any) => {
    modal.confirm({
      width: 1000,
      centered: true,
      title: values.name,
      maskClosable: true,
      content: (
        <UpdateForm isUpdate={true} modal={incompatibleModal} form={updateFrom} values={values} />
      ),
      okText: 'Update',
      onOk: (close) => {
        return updateFrom.validateFields().then(async (items) => {
          const payload = {
            ...items,
            id: values.id,
            ingredientCategoryId: items.ingredientCategoryId.toString(),
          };
          await updateIngredient(payload);
          updateFrom.resetFields();
          await close();
        });
      },
    });
  };

  const handleClickCreate = (values: any) => {
    modal.confirm({
      width: 1000,
      centered: true,
      title: values.name,
      maskClosable: true,
      content: <UpdateForm isUpdate={false} modal={incompatibleModal} form={createFrom} />,
      okText: 'Create',
      onOk: (close) => {
        return createFrom.validateFields().then(async (items) => {
          const payload = {
            ...items,
            id: values.id,
            ingredientCategoryId: items.ingredientCategoryId.toString(),
          };
          await createIngredient(payload);
          createFrom.resetFields();
          await close();
        });
      },
    });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '50px',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Last updated',
      dataIndex: 'updatedAt',
      defaultSortOrder: 'descend',
      sorter: true,
      render: (updatedAt) => moment(updatedAt).format(timeFormat.FULL_TIME),
    },
    {
      title: 'Action',
      render: (record) => {
        return (
          <div>
            <Row gutter={[8, 8]}>
              <Col>
                <Button type="primary" onClick={() => handleClickUpdate(record)}>
                  <Tooltip placement="top" title={'Click to edit'}>
                    <EyeOutlined /> View
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
    <Spin spinning={loadingFetchIngredientList}>
      <BasicLayout>
        <Header>Ingredient</Header>
        <Body>
          <div className={`${styles.container}`}>
            <div className={`${styles.title}`}>
              <Row justify="space-between">
                <Col>Ingredient Management</Col>
                <Col>
                  <Row gutter={[8, 8]}>
                    <Col>
                      <Input
                        onChange={(e) => setValue(e.target.value)}
                        suffix={suffix}
                        allowClear
                        placeholder="Search ..."
                      />
                    </Col>
                    <Col>
                      <Button type="primary" onClick={() => refresh()}>
                        <Tooltip placement="top" title={'Click to reload'}>
                          <ReloadOutlined /> Reload
                        </Tooltip>
                      </Button>
                    </Col>
                    <Col>
                      <Button type="primary" onClick={handleClickCreate}>
                        <Tooltip placement="top" title={'Click to create'}>
                          <PlusOutlined /> New ingredient
                        </Tooltip>
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <div className={`${styles.table}`}>
              <Table
                size="small"
                columns={columns}
                bordered
                dataSource={ingredientList}
                onChange={handleChanges}
                pagination={{
                  defaultCurrent: params.page,
                  total: pageCount,
                }}
              />
            </div>
            {contextHolder}
            {ingredientContextHolder}
          </div>
        </Body>
      </BasicLayout>
    </Spin>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchIngredientList: (payload: any) =>
    dispatch({ type: 'ingredient/fetchIngredientList', payload }),
  deleteIngredient: (payload: any) => dispatch({ type: 'ingredient/deleteIngredient', payload }),
  updateIngredient: (payload: any) => dispatch({ type: 'ingredient/updateIngredient', payload }),
  createIngredient: (payload: any) => dispatch({ type: 'ingredient/createIngredient', payload }),
  saveParams: (payload: any) => dispatch({ type: 'ingredient/saveParams', payload }),
  refresh: () => dispatch({ type: 'ingredient/refresh' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(IngredientManagement);
