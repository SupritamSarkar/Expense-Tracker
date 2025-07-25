 import React, { useEffect, useState } from 'react'
import { prepareIncomeBarChartData } from '../../utils/helper';
import { LuPlus } from 'react-icons/lu';
import CustomBar from '../Charts/CustomBar';

const COLORS = ["#00A676"]; 

const IncomeOverview = ({transactions, onAddIncome}) => {

    const [chartData, setChartData] = useState([]);

   useEffect(() => {
  // ensure transactions is an array
  const result = prepareIncomeBarChartData(transactions || []);
  setChartData(result); // always an array
}, [transactions]);

    

  return (
    <div className='card'>

      {/*heading and Add button*/}
        <div className='flex items-center justify-between'>
            <div>
                <h2 className='text-xl font-medium'>Income Overview</h2>
                 <p className='text-sm'>Track your earnings</p>
            </div>

            <button className='card-btn text-green-800 bg-green-100' onClick={onAddIncome}>
                <LuPlus size={22}/>
                Add Income
            </button>
        </div>


      {/*income barchart*/}
        <div className='mt-7'>
          <CustomBar 
          data={chartData}
           colors={COLORS}
          showTextAnchor
          xKey="month"
          />
        </div>
      


    </div>
  )
}

export default IncomeOverview