import React, { useState, useEffect } from 'react'
import CustomBar from '../Charts/CustomBar';

const COLORS = ["#1f89bb", "#4ccc43", "#e51e1e"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const [balanceData, setBalanceData] = useState([]);

  useEffect(() => {
    const isSmallScreen = window.innerWidth < 520; // adjust the breakpoint
    setBalanceData([
      { name: isSmallScreen ? "Total\nBalance" : "Total Balance", amount: totalBalance },
      { name: isSmallScreen ? "Total\nIncome" : "Total Income", amount: totalIncome },
      { name: isSmallScreen ? "Total\nExpense" : "Total Expense", amount: totalExpense }
    ]);
  }, [totalBalance, totalIncome, totalExpense]);

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-2xl font-bold mb-10'>Financial Overview</h5>
      </div>

      <CustomBar
        data={balanceData}
        colors={COLORS}
        showTextAnchor
        xKey="name"
        rotateLabels={false}
      />
    </div>
  )
}

export default FinanceOverview;
