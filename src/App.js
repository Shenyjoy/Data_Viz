import BarChart from './BarChart';
import sunshine from './sunshine.json'
import Select from 'react-select'
import { useState } from 'react';

const options = [
  { value: 'JUL', label: 'July' },
  { value: 'JUN', label: 'June' },
  { value: 'AUG', label: 'August' },
]

function App() {
  const [month,setMonth]=useState(options[0])
  const data=sunshine
    .map(d =>{
      return {city:d.CITY, sunshine:d[month.value]}
  })
  .sort((a, b) => b.sunshine - a.sunshine)
  .slice(0, 20)
  return (
    <div className="App">
      <div className='container'>
        <div className='header'>
          <h1>Sunshine by City</h1>
          <Select defaultValue={month} onChange={setMonth} options={options}/>
        </div>
      
        <BarChart data={data} height={400} width={700}/>
      </div>
    </div>
  )
}

export default App;
