import React, { useState } from 'react';
import { Progress } from 'antd';

const App: React.FC = () => {
    const [progress, setProgress] = useState<number>(0)
 return (
    <div>
    <Progress percent={progress} />
    {/* <Progress percent={50} status="active" />
    <Progress percent={70} status="exception" />
    <Progress percent={100} /> */}
    <Progress percent={50} showInfo={false} />
  </div>
 )
};

export default App;