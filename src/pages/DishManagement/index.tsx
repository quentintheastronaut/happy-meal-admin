import BasicLayout, { Body, Header } from '@/components/BasicLayout';
import type { ColumnsType } from 'antd/es/table';
import { ORDER, timeFormat } from '@/ultis/constants';
import { Button, Col, Form, Input, Row, Spin, Table, Tooltip } from 'antd';
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
import confirm from 'antd/lib/modal/confirm';
import moment from 'moment';
import { useDebounceValue } from '@ant-design/pro-components';
import UpdateForm from './components/UpdateForm';
import 'antd/dist/antd.css';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const DishManagement: React.FC = (props: any) => {
  const {
    params,
    dishList,
    fetchDishList,
    deleteDish,
    createDish,
    updateDish,
    refresh,
    loadingFetchDishList,
    pageCount,
    saveParams,
  } = props;

  const [value, setValue] = useState<string>();
  const [createFrom] = Form.useForm();
  const [updateFrom] = Form.useForm();
  const debouncedValue = useDebounceValue(value, 500);

  const handelDelete = (id: string) => {
    const payload = { id };
    deleteDish(payload);
  };

  const suffix = (
    <Tooltip placement="top" title={'Search dish'}>
      <SearchOutlined
        style={{
          fontSize: 16,
          color: '#1890ff',
        }}
      />
    </Tooltip>
  );

  const showConfirm = (values: any) => {
    confirm({
      maskClosable: true,
      title: 'Do you want to delete this dish ?',
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
    fetchDishList();
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
    confirm({
      width: 1000,
      centered: true,
      title: values.name,
      maskClosable: true,
      content: <UpdateForm form={updateFrom} values={values} />,
      okText: 'Update',
      onOk: () => {
        const payload = {
          ...updateFrom.getFieldsValue(),
          id: values.id,
        };
        return updateDish(payload);
      },
    });
  };

  const handleClickCreate = (values: any) => {
    confirm({
      width: 1000,
      centered: true,
      title: values.name,
      maskClosable: true,
      content: <UpdateForm form={createFrom} />,
      okText: 'Create',
      onOk: (close) => {
        return createFrom.validateFields().then((items) => {
          const payload = {
            ...items,
            id: values.id,
          };
          createDish(payload);
          createFrom.resetFields();
          close();
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
      title: 'Calories',
      dataIndex: 'calories',
    },
    {
      title: 'Carbohydrates',
      dataIndex: 'carbohydrates',
    },
    {
      title: 'Protein',
      dataIndex: 'protein',
    },
    {
      title: 'Fat',
      dataIndex: 'fat',
    },
    {
      title: 'Last updated',
      dataIndex: 'updatedAt',
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
    <Spin spinning={loadingFetchDishList}>
      <BasicLayout>
        <Header>Dish</Header>
        <Body>
          <div className={`${styles.container}`}>
            <div className={`${styles.title}`}>
              <Row justify="space-between">
                <Col>Dish Management</Col>
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
                          <PlusOutlined /> New dish
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
                dataSource={dishList}
                onChange={handleChanges}
                pagination={{
                  defaultCurrent: 1,
                  total: pageCount,
                }}
              />
            </div>
          </div>
        </Body>
      </BasicLayout>
    </Spin>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchDishList: (payload: any) => dispatch({ type: 'dish/fetchDishList', payload }),
  deleteDish: (payload: any) => dispatch({ type: 'dish/deleteDish', payload }),
  updateDish: (payload: any) => dispatch({ type: 'dish/updateDish', payload }),
  createDish: (payload: any) => dispatch({ type: 'dish/createDish', payload }),
  saveParams: (payload: any) => dispatch({ type: 'dish/saveParams', payload }),
  refresh: () => dispatch({ type: 'dish/refresh' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(DishManagement);
