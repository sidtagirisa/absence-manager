import { Button, Card, DatePicker, Divider, Table } from 'antd';
import React, { useState, useEffect } from 'react';
import './App.css';
import Filters from './components/Filters';
import api from './config/api';
import download from 'downloadjs';

const { RangePicker } = DatePicker;

const message = {
  sickness: 'is sick',
  vacation: 'is on vacation',
};

const App = () => {
  const [dataSource, setDataSource] = useState({ absences: [] });
  const [filters, setFilters] = useState({
    userId: undefined,
    dateRange: undefined,
  });

  useEffect(() => {
    getData(filters);
  }, []);

  useEffect(() => {
    getData(filters);
  }, [filters]);

  function getQuery(filters) {
    let query = '';
    if (filters.userId !== undefined) {
      query += `userId=${filters.userId}&`;
    }
    if (filters.dateRange !== undefined) {
      query += `startDate=${filters.dateRange[0].format(
        'YYYY-MM-DD'
      )}&endDate=${filters.dateRange[1].format('YYYY-MM-DD')}`;
    }
    return query;
  }

  const getData = async (filters, type = 'fetch') => {
    let query = getQuery(filters);
    const urlPath =
      type === 'fetch' ? `/absences?${query}` : `/export/absences?${query}`;
    const response = await api.get(urlPath);
    if (type === 'fetch') {
      setDataSource(response.data);
    } else {
      download(response.data, 'absences.ics');
    }
  };

  const downloadData = () => {
    getData(filters, 'download');
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'User Id',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Member Note',
      dataIndex: 'memberNote',
      key: 'memberNote',
    },
    {
      title: 'Admitter Note',
      dataIndex: 'admitterNote',
      key: 'admitterNote',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
  ];

  return (
    <div className="App">
      <Card
        title="Absence Manager"
        extra={<Button onClick={downloadData}>Export iCalendar File</Button>}
      >
        <Filters setDataSource={setDataSource} setFilters={setFilters} />
        <Divider plain>Absences</Divider>
        <Table
          expandable={{
            expandRowByClick: true,
            expandedRowRender: (record) => (
              <p style={{ margin: 0 }}>
                {record.name} {message[record.type]}
              </p>
            ),
          }}
          dataSource={dataSource.absences}
          columns={columns}
        />
      </Card>
    </div>
  );
};

export default App;
