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

const MeasurementManagement: React.FC = (props: any) => {
  const {
    params,
    measurementList,
    fetchMeasurementList,
    deleteMeasurement,
    createMeasurement,
    updateMeasurement,
    refresh,
    loadingFetchMeasurementList,
    pageCount,
    saveParams,
  } = props;

  const [value, setValue] = useState<string>();
  const [createFrom] = Form.useForm();
  const [updateFrom] = Form.useForm();
  const debouncedValue = useDebounceValue(value, 500);

  const handelDelete = (id: string) => {
    const payload = { id };
    deleteMeasurement(payload);
  };

  const suffix = (
    <Tooltip placement="top" title={'Search measurement'}>
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
      title: 'Do you want to delete this measurement ?',
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
    fetchMeasurementList();
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
          };
          await updateMeasurement(payload);
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
          };
          await createMeasurement(payload);
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
    <Spin spinning={loadingFetchMeasurementList}>
      <BasicLayout>
        <Header>Measurement</Header>
        <Body>
          <div className={`${styles.container}`}>
            <div className={`${styles.title}`}>
              <Row justify="space-between">
                <Col>Measurement Type Management</Col>
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
                          <PlusOutlined /> New measurement
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
                dataSource={measurementList}
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
  fetchMeasurementList: (payload: any) =>
    dispatch({ type: 'measurement/fetchMeasurementList', payload }),
  deleteMeasurement: (payload: any) => dispatch({ type: 'measurement/deleteMeasurement', payload }),
  updateMeasurement: (payload: any) => dispatch({ type: 'measurement/updateMeasurement', payload }),
  createMeasurement: (payload: any) => dispatch({ type: 'measurement/createMeasurement', payload }),
  saveParams: (payload: any) => dispatch({ type: 'measurement/saveParams', payload }),
  refresh: () => dispatch({ type: 'measurement/refresh' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MeasurementManagement);
