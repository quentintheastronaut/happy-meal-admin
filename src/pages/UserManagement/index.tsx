import BasicLayout, { Body, Header } from '@/components/BasicLayout';
import type { ColumnsType } from 'antd/es/table';
import { ORDER, SEX, timeFormat, USER_STATUS } from '@/ultis/constants';
import { Button, Col, Form, Input, Row, Spin, Table, Tag, Tooltip } from 'antd';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'umi';
import mapStateToProps from './mapStateToProps';
import styles from './index.less';
import {
  ExclamationCircleFilled,
  EyeOutlined,
  ManOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  WomanOutlined,
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

const UserManagement: React.FC = (props: any) => {
  const {
    params,
    userList,
    fetchUserList,
    deactivateUser,
    activateUser,
    createUser,
    updateUser,
    refresh,
    loadingFetchUserList,
    pageCount,
    saveParams,
  } = props;
  console.log('🚀 ~ file: index.tsx:46 ~ userList', userList);

  const [value, setValue] = useState<string>();
  const [createFrom] = Form.useForm();
  const [updateFrom] = Form.useForm();
  const debouncedValue = useDebounceValue(value, 500);

  const handelDeactivate = (id: string) => {
    const payload = { id };
    deactivateUser(payload);
  };

  const handelActivate = (id: string) => {
    const payload = { id };
    activateUser(payload);
  };

  const suffix = (
    <Tooltip placement="top" title={'Search user'}>
      <SearchOutlined
        style={{
          fontSize: 16,
          color: '#1890ff',
        }}
      />
    </Tooltip>
  );

  const showDeactivateConfirm = (values: any) => {
    confirm({
      maskClosable: true,
      title: 'Do you want to deactivate this user ?',
      icon: (
        <Tooltip placement="top" title={'Warning'}>
          <ExclamationCircleFilled />
        </Tooltip>
      ),
      centered: true,
      onOk: () => handelDeactivate(values.id),
      onCancel: () => {},
    });
  };

  const showActivateConfirm = (values: any) => {
    confirm({
      maskClosable: true,
      title: 'Do you want to activate this user ?',
      icon: (
        <Tooltip placement="top" title={'Warning'}>
          <ExclamationCircleFilled />
        </Tooltip>
      ),
      centered: true,
      onOk: () => handelActivate(values.id),
      onCancel: () => {},
    });
  };

  useEffect(() => {
    fetchUserList();
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
      onOk: (close) => {
        return updateFrom.validateFields().then(async (items) => {
          const payload = {
            ...items,
            id: values.id,
            dob: moment(items.dob).format(timeFormat.DATE),
          };
          await updateUser(payload);
          updateFrom.resetFields();
          await close();
        });
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
        return createFrom.validateFields().then(async (items) => {
          const payload = {
            ...items,
            id: values.id,
            dob: moment(items.dob).format(timeFormat.DATE),
          };
          await createUser(payload);
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
      render: (record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Sex',
      dataIndex: 'sex',
      render: (sex) =>
        sex === SEX.MALE ? (
          <div>
            <ManOutlined /> Male
          </div>
        ) : (
          <div>
            <WomanOutlined /> Female
          </div>
        ),
    },
    {
      title: 'Status',
      dataIndex: 'active',
      render: (active) => {
        if (active) return <Tag color="success">{USER_STATUS.ACTIVE}</Tag>;
        return <Tag color="error">{USER_STATUS.DEACTIVE}</Tag>;
      },
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
                {record.active ? (
                  <Button type="primary" danger onClick={() => showDeactivateConfirm(record)}>
                    Deactivate
                  </Button>
                ) : (
                  <Button type="primary" onClick={() => showActivateConfirm(record)}>
                    Activate
                  </Button>
                )}
              </Col>
            </Row>
          </div>
        );
      },
    },
  ];

  return (
    <Spin spinning={loadingFetchUserList}>
      <BasicLayout>
        <Header>User</Header>
        <Body>
          <div className={`${styles.container}`}>
            <div className={`${styles.title}`}>
              <Row justify="space-between">
                <Col>User Management</Col>
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
                          <PlusOutlined /> New user
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
                dataSource={userList}
                onChange={handleChanges}
                pagination={{
                  defaultCurrent: params.page,
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
  fetchUserList: (payload: any) => dispatch({ type: 'user/fetchUserList', payload }),
  deactivateUser: (payload: any) => dispatch({ type: 'user/deactivateUser', payload }),
  activateUser: (payload: any) => dispatch({ type: 'user/activateUser', payload }),
  updateUser: (payload: any) => dispatch({ type: 'user/updateUser', payload }),
  createUser: (payload: any) => dispatch({ type: 'user/createUser', payload }),
  saveParams: (payload: any) => dispatch({ type: 'user/saveParams', payload }),
  refresh: () => dispatch({ type: 'user/refresh' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
