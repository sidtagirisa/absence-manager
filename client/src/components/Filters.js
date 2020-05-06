import { Button, DatePicker, Form, Input } from 'antd';
import React from 'react';
import './Filters.css';
import api from './../config/api';

const { RangePicker } = DatePicker;

class Filters extends React.Component {
  render() {
    const onFinish = async (values) => {
      this.props.setFilters(values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    function onChange(value, dateString) {
      console.log('Selected Time: ', value);
      console.log('Formatted Selected Time: ', dateString);
    }

    function onOk(value) {
      console.log('onOk: ', value);
    }
    return (
      <div className="Filters">
        <Form
          layout="inline"
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="User Id" name="userId">
            <Input />
          </Form.Item>

          <Form.Item label="Date Range" name="dateRange">
            <RangePicker format="YYYY-MM-DD" onChange={onChange} onOk={onOk} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Filters;
