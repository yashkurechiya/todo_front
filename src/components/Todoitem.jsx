import React from 'react';

const TodoItem = ({ title, description, onEdit, onDelete }) => {
  return (
    <div className="w-full bg-slate-800 text-gray-100 p-5 rounded-xl shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-lg transition-all duration-200">
      
      {/* Task Content */}
      <div className="flex-1">
        <h4 className="text-xl font-semibold text-white">{title}</h4>
        <p className="text-gray-400 mt-1">{description}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onEdit}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          {/* <Pencil size={16} className="inline mr-1" /> */}
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-md transition focus:outline-none focus:ring-2 focus:ring-rose-400"
        >
          {/* <Trash2 size={16} className="inline mr-1" /> */}
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
