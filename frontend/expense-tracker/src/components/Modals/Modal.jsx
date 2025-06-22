import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

const Modal = ({ isOpen, onClose, title, type = 'income', onSave }) => {
  const [amount, setAmount] = useState('');
  const [sourceOrCategory, setSourceOrCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('💰');
  const [showPicker, setShowPicker] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();

    const data = {
      amount: parseFloat(amount),
      date,
      description,
      icon: selectedEmoji,
    };

    if (type === 'income') {
      data.source = sourceOrCategory;
    } else {
      data.category = sourceOrCategory;
    }

    console.log(data);
    if (onSave) onSave(data); // Send data to parent
    onClose(); // Close modal after save
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/50 z-50 overflow-auto p-4">
      <div className="bg-white p-6 rounded-xl w-[400px] relative shadow-xl mt-10 mb-10">
        {/* Modal header */}
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-xl font-medium">{title}</h2>
          <button
            onClick={onClose}
            className="text-2xl font-bold text-gray-600 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* Modal body */}
        <form onSubmit={handleSave} className="space-y-4">
          {/* Emoji */}
          <div className="relative">
            <label className="block mb-1">Icon (Emoji)</label>
            <button
              type="button"
              onClick={() => setShowPicker(!showPicker)}
              className="text-3xl w-12 h-12 border border-gray-300 flex items-center justify-center rounded"
            >
              {selectedEmoji}
            </button>

            {showPicker && (
              <div className="absolute z-10 mt-2 border border-gray-200 shadow-lg bg-white">
                <EmojiPicker
                  onEmojiClick={(emojiData) => {
                    setSelectedEmoji(emojiData.emoji);
                    setShowPicker(false);
                  }}
                />
              </div>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="block mb-1">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
              placeholder="e.g. 5000"
            />
          </div>

          {/* Source or Category */}
          <div>
            <label className="block mb-1">
              {type === 'income' ? 'Source' : 'Category'}
            </label>
            <input
              type="text"
              value={sourceOrCategory}
              onChange={(e) => setSourceOrCategory(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
              placeholder={
                type === 'income' ? 'e.g. Salary' : 'e.g. Groceries'
              }
            />
          </div>

          {/* Date */}
          <div>
            <label className="block mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Optional"
              rows={3}
            />
          </div>

          {/* Save button */}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full mt-4"
          >
            Save {type === 'income' ? 'Income' : 'Expense'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
