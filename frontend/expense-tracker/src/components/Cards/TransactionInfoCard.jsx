import React from "react";
import { LuTrash2, LuTrendingDown, LuTrendingUp } from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  transaction,
  icon,
  date,
  amount,
  type,
  onDelete,
  onClick,
}) => {
  const getAmountStyles = () => {
    return type === "income"
      ? "bg-green-50 text-green-700"
      : "bg-red-50 text-red-700";
  };

  return (
    <div
      className="group relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-2 p-3 rounded-lg hover:bg-gray-200"
      onClick={() => onClick && onClick(transaction)}
    >
      {/* Left section */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 flex items-center justify-center text-gray-900 bg-gray-100 rounded-full text-2xl">
          <span>{icon}</span>
        </div>

        <div>
          <p className="text-lg text-gray-900 font-medium">{title}</p>
          <p className="text-sm">{date}</p>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap justify-end w-full sm:w-auto">
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-md ${getAmountStyles()}`}
        >
          <h6 className="text-lg whitespace-nowrap">
            {type === "income" ? "+" : "-"} ₹{amount}
          </h6>
          {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
        </div>

        {onDelete && (
          <button
            className="text-gray-500 hover:text-red-500 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            title="Delete transaction"
          >
            <LuTrash2 size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default TransactionInfoCard;
