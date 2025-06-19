import React from "react";
import {
  LuAArrowDown,
  LuTrash2,
  LuTrendingDown,
  LuTrendingUp,
  LuUtensils,
} from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
}) => {
  const getAmountStyles = () => {
    return type === "income"
      ? "bg-green-50 text-green-700"
      : "bg-red-50 text-red-700";
  };

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/50">
      <div className="w-12 h-12 flex items-center justify-center text-gray-900 bg-gray-100 rounded-full text-2xl">
        {type === "expense" && icon ? (
          <span>{icon}</span> // Just show emoji directly
        ) : (
          <span>💰</span> // Empty for income
        )}
      </div>

      <div>
        <p className="text-lg text-gray-900 font-medium">{title}</p>
        <p className="text-sm">{date}</p>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {!hideDeleteBtn && (
          <button
            className="text-gray-400 hover:text-red-400 cursor-pointer"
            onClick={onDelete}
          >
            <LuTrash2 size={20} />
          </button>
        )}

        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-md ${getAmountStyles()}`}
        >
          <h6 className="text-lg ">
            {type === "income" ? "+" : "-"} ₹{amount}
          </h6>
          {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
