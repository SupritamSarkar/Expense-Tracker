/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import useUserAuth from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import InfoCard from "../../components/Cards/InfoCard";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { addThousandsSeperator } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverviwe";
import ReactMarkdown from "react-markdown";
import axios from "axios";

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [aiInsights, setAiInsights] = useState("");

  const fetchAIInsights = async (transactions) => {
    try {
      const res = await axiosInstance.post("/api/v1/ai/summary", {
        transactions,
      });

      if (res.data?.insights) {
        setAiInsights(res.data.insights);
      }
    } catch (error) {
      console.error("Failed to fetch Gemini AI insights", error);
    }
  };

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    if (dashboardData?.lastTransactions?.length) {
      fetchAIInsights(dashboardData.lastTransactions);
    }
  }, [dashboardData]);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        {/*Total balance income and expense card*/}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard className="text-4xl" />}
            label="Total Balance"
            value={addThousandsSeperator(dashboardData?.totalBalance || 0)}
            color="bg-purple-800"
          />
          <InfoCard
            icon={<LuWalletMinimal className="text-4xl" />}
            label="Total Income"
            value={addThousandsSeperator(dashboardData?.totalIncome || 0)}
            color="bg-yellow-500"
          />
          <InfoCard
            icon={<LuHandCoins className="text-4xl" />}
            label="Total Expense"
            value={addThousandsSeperator(dashboardData?.totalExpense || 0)}
            color="bg-red-600"
          />
        </div>

        {/*Recent transactions*/}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
            transactions={dashboardData?.lastTransactions}
            onSeeMore={() => navigate("/expense")}
          />
        </div>

        {/*Bar chart of totals*/}
        {dashboardData && (
          <div className="mt-10 ">
            <FinanceOverview
              totalBalance={dashboardData.totalBalance || 0}
              totalIncome={dashboardData.totalIncome || 0}
              totalExpense={dashboardData.totalExpense || 0}
            />
            {aiInsights && (
              <div className="mt-10 p-6 bg-slate-100 rounded-2xl shadow-md">
                <h2 className="text-xl font-semibold mb-2">💡 AI Summary</h2>
                <ReactMarkdown className="prose max-w-none text-gray-800">
                  {aiInsights}
                </ReactMarkdown>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Home;
