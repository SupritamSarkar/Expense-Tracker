import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import Modal from '../../components/Modals/Modal'
import moment from 'moment'
import TransactionInfoCard from '../../components/Cards/TransactionInfoCard'
import { addThousandsSeperator } from '../../utils/helper'
import InfoCard from '../../components/Cards/InfoCard'
import { LuDownload, LuWalletMinimal } from 'react-icons/lu'
import toast from 'react-hot-toast'


// NEW Modal for income transaction details while clicking
const TransactionModal = ({ transaction, isOpen, onClose }) => {
  if (!isOpen || !transaction) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-9 rounded-lg max-w-md w-full relative shadow-xl">
        <button className="absolute top-2 right-3 text-2xl" onClick={onClose}>x</button>
        <h2 className="text-2xl font-bold mb-8 underline">Transaction Details</h2>
        <p className='text-lg'><strong>Source : </strong> {transaction.source}</p>
        <p className='text-lg'><strong>Amount : </strong> ₹{transaction.amount}</p>
        <p className='text-lg'><strong>Date : </strong> {moment(transaction.date).format("Do MMM YYYY")}</p>
        <p className='text-lg'><strong>Description : </strong> {transaction.description || "N/A"}</p>
      </div>
    </div>
  );
};
//end of modal


const Income = () => {
  const [incomeData, setIncomeData] = useState([])
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [loading, setLoading] = useState(false)
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)

  // NEW states for transaction modal
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  //fetching income data to page
  const fetchIncomeData = React.useCallback(async () => {
    if (loading) return
    setLoading(true)
    
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_INCOMES)
       if (response.data) {
      const data = response.data.data;
      setIncomeData(data); 
      // Sum up the amounts
      const totalAmount = data.reduce((sum, transaction) => sum + (transaction.amount || 0), 0);
        setIncomeTotal(totalAmount);
      }
    } catch (error) {
      console.error('Error fetching incomes:', error)
    } finally {
      setLoading(false)
    }
  }, [loading])

  //handle add income
  const handleAddIncome = async (income) =>{
    const{source, amount, date, icon, description} = income;

    if(!source.trim()){
      toast.error("Source is required");
      return;
    }
    if(!date){
      toast.error("Date is required");
      return;
    }
    try{
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source, amount, date, icon, description
      });
      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
      fetchIncomeData();
    }
    catch(error){
      console.log("Error in adding Income", error);
      toast.error('Failed to add income')
    }
  }

  //handle delete income
  const handleDeleteIncome = async (id) =>{
    const sure = window.confirm("Are you sure you want to delete this income?")
    if(!sure) return;

    try{
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))
        toast.success("Income Deleted successfully");
      fetchIncomeData();
    }
    catch(error){
      console.log("Error in deleteing Income",error);
      toast.error('Failed to delete income')
      
    }
  }

  //handle download income
  const handleDownloadIncome = async() => {
    try{
      const response =await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
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
    fetchIncomeData()
  }, [fetchIncomeData])

  return (
    <DashboardLayout activeMenu="Income">

      {/* Total income for last 60 days */}
        <div className="mb-6 mt-6 font-bold text-black">
          <InfoCard
            icon={<LuWalletMinimal className="text-4xl" />}
            label="Total Income"
            value={addThousandsSeperator(incomeTotal)}
            color="bg-yellow-500"
          />
        </div>

      {/*Income Overview and Bar chart*/}
      <div className="my-5 mx-auto">
        <IncomeOverview
          transactions={incomeData}
          onAddIncome={() => setOpenAddIncomeModal(true)}
        />
      </div>


      {/* Recent transactions */}
<div className="flex justify-start">
  <div className="card w-full max-w-2xl">  

    <div className="flex items-center justify-between mb-4">
      <h5 className="text-lg">Last 60 Days Income Transactions</h5>
      <button
        onClick={handleDownloadIncome}
        className="font-medium bg-blue-100 text-blue-800 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition flex justify-center items-center gap-2"
      >
        <LuDownload/>
        Download
      </button>
    </div>


    {incomeData.length === 0 ? (
      <p className="text-center text-gray-500">No transactions found.</p>
    ) : (
      incomeData.map((item) => (
        <TransactionInfoCard
          key={item._id}
          transaction={item}
          title={item.source}
          icon={item.icon}
          date={moment(item.date).format('Do MMM YYYY')}
          amount={item.amount}
          type="income"
          onDelete={()=> handleDeleteIncome(item._id)}
          onClick={(transaction) => {
                  setSelectedTransaction(transaction);
                  setIsTransactionModalOpen(true);
          }}
        />
      ))
    )}
  </div>
</div>


      <Modal
  isOpen={openAddIncomeModal}
  onClose={() => setOpenAddIncomeModal(false)}
  title="Add Income"
  type="income"
  onSave={handleAddIncome}
/>

  <TransactionModal
        transaction={selectedTransaction}
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
      />

    </DashboardLayout>
  )
}

export default Income
