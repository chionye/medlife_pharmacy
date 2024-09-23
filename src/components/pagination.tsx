/** @format */

import { PaginationProps } from "@/types";
import React from "react";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className='flex justify-center items-center mt-5'>
      <button
        className={`px-4 py-2 mx-1 ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handlePrevious}
        disabled={currentPage === 1}>
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={`px-4 py-2 mx-1 ${
            currentPage === index + 1
              ? "bg-[#D20606] text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => onPageChange(index + 1)}>
          {index + 1}
        </button>
      ))}

      <button
        className={`px-4 py-2 mx-1 ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleNext}
        disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
