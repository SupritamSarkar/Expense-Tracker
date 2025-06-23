import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper';
import { LuPlus } from 'react-icons/lu';
import CustomLine from '../Charts/CustomLine';

const COLORS = ["#E30022"]; 

const ExpenseOverview = ({transactions, onAddExpense}) => {

    const [chartData, setChartData] = useState([]);

   useEffect(() => {
  // ensure transactions is an array
  const result = prepareExpenseBarChartData(transactions || []);
  // only keep the last 8 transactions
    const last8 = result.slice(-8); 
  setChartData(last8); // always an array
}, [transactions]);

    

  return (
    <div className='card'>

      {/*heading and button*/}
        <div className='flex items-center justify-between'>
            <div>
                <h2 className='text-xl font-medium'>Expense Overview</h2>
                 <p className='text-sm'>Track your expenses</p>
            </div>

            <button className='card-btn text-red-800 bg-red-200' onClick={onAddExpense}>
                <LuPlus size={22}/>
                Add Expense
            </button>
        </div>


      {/*expense barchart*/}
        <div className='w-full mt-7'>
          <CustomLine
          data={chartData}
          color={COLORS}
          showTextAnchor
          xKey="month"
          />
        </div>
      


    </div>
  )
}

export default ExpenseOverview
