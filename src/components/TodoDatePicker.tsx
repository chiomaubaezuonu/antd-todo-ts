import React, { useState } from 'react';
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

const TodoDatePicker: React.FC = () => {
const [pickDate, setPickDate] = useState<string>("")

  return (
    <Space direction="vertical" size={12}>
      <RangePicker />
    </Space>
  )
};

export default TodoDatePicker;
