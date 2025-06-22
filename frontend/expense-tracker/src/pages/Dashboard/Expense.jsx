import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import Modal from '../../components/Modals/Modal'
import moment from 'moment'
import TransactionInfoCard from '../../components/Cards/TransactionInfoCard'
import { addThousandsSeperator } from '../../utils/helper'
import InfoCard from '../../components/Cards/InfoCard'
import { LuDownload, LuHandCoins, LuWalletMinimal } from 'react-icons/lu'
import ExpenseOverview from '../../components/Expense/ExpenseOverview'
import toast from 'react-hot-toast'

const Expense = () => {
  const [expenseData, setExpenseData] = useState([])
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [loading, setLoading] = useState(false)
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)

  //fetch Expense data to page
  const fetchExpenseData = async () => {
    if (loading) return
    setLoading(true)
    
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_EXPENSES)
       if (response.data) {
      const data = response.data.data;
      setExpenseData(data); 
      // Sum up the amounts
      const totalAmount = data.reduce((sum, transaction) => sum + (transaction.amount || 0), 0);
        setExpenseTotal(totalAmount);
      }
    } catch (error) {
      console.error('Error fetching incomes:', error)
    } finally {
      setLoading(false)
    }
  }

  //handle Add expenses
    const handleAddExpense= async (income) =>{
    const{category, amount, date, icon, description} = income;

    if(!category.trim()){
      toast.error("Source is required");
      return;
    }
    if(!date){
      toast.error("Date is required");
      return;
    }
    try{
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category, amount, date, icon, description
      });
      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");
      fetchExpenseData();
    }
    catch(error){
      console.log("Error in adding expense", error);
    }
  }

  //handle delete expense
  const handleDeleteExpense = async (id) =>{
    const sure = window.confirm("Are you sure you want to delete this expense?")
    if(!sure) return;

    try{
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))
        toast.success("Expense Deleted successfully");
      fetchExpenseData();
    }
    catch(error){
      console.log("Error in deleteing expense",error);
      toast.error('Failed to delete expense')
      
    }
  }


    //handle download expense
  const handleDownloadExpense = async() => {
    try{
      const response =await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: "blob",
      });
      //create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Income-Details.xlsx")
      document.body.appendChild(link)
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
    catch(error){
      console.log("Error downloading income details",error);
      toast.error("Failed to download details")
      
    }
  }

  useEffect(() => {
    fetchExpenseData()
  }, [])

  return (
    <DashboardLayout activeMenu="Expense">

      {/* Total income for last 60 days */}
        <div className="mb-6 mt-6 font-bold text-black">
          <InfoCard
            icon={<LuHandCoins className="text-4xl" />}
            label="Total Expense"
            value={addThousandsSeperator(expenseTotal)}
            color="bg-red-600"
          />
        </div>

      {/*Income Overview and Bar chart*/}
      <div className="my-5 mx-auto">
        <ExpenseOverview
          transactions={expenseData}
          onAddExpense={() => setOpenAddExpenseModal(true)}
        />
      </div>


       {/* Recent transactions */}
<div className="flex justify-start">
  <div className="card w-full max-w-2xl">  
    
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
  <h5 className="text-base sm:text-lg font-medium">Last 60 Days Expense Transactions</h5>
  <button
    onClick={handleDownloadExpense}
    className="font-medium bg-blue-100 text-blue-800 px-3 sm:px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition flex items-center gap-2 text-sm sm:text-base w-full sm:w-auto justify-center"
  >
    <LuDownload className="w-4 h-4 sm:w-5 sm:h-5" />
    Download
  </button>
</div>



    {expenseData.length === 0 ? (
      <p className="text-center text-gray-500">No transactions found.</p>
    ) : (
      expenseData.map((item) => (
        <TransactionInfoCard
          key={item._id}
          title={item.category}
          icon={item.icon}
          date={moment(item.date).format('Do MMM YYYY')}
          amount={item.amount}
          type="expense"
          onDelete={()=> handleDeleteExpense(item._id)}
        />
      ))
    )}
  </div>
</div>



      <Modal
  isOpen={openAddExpenseModal}
  onClose={() => setOpenAddExpenseModal(false)}
  title="Add Expense"
  type="expense"
  onSave={handleAddExpense}
/>


    </DashboardLayout>
  )
}

export default Expense
