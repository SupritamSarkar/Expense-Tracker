import React from 'react'
import CustomBar from '../Charts/CustomBar';


const COLORS = ["#1f89bb", "#4ccc43", "#e51e1e"]; 


const FinanceOverview = ({totalBalance, totalIncome, totalExpense}) => {

    const balanceData = [
        {name: "Total Balance", amount: totalBalance},
        {name: "Total Income", amount: totalIncome},
        {name: "Total Expense", amount: totalExpense},
    ];
  return (
    <div className='card'>
    <div className='flex items-center justify-between'>
      <h5 className='text-2xl font-bold mb-10'>Financial Overview</h5>
    </div>

    <CustomBar
        data={balanceData}
        label="Total Balance"
        totalAmount={`$${totalBalance}`}
        colors={COLORS}
        showTextAnchor
        xKey ="name"
    />
    </div>
  )
}

export default FinanceOverview
