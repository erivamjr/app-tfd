import React from 'react'
import { TbReportSearch } from 'react-icons/tb'
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'

export const TableActions = ({ id }) => (
  <div className="flex gap-3 items-center justify-center text-2xl">
    <Link to={`/detalhespaciente/${id}`}>
      <div className="bg-yellow-600 hover:bg-yellow-500 text-white rounded p-3">
        <TbReportSearch />
      </div>
    </Link>
    <div className="bg-green-600 hover:bg-green-500 rounded text-white p-3">
      <FaRegEdit />
    </div>
    <div className="bg-red-600 rounded hover:bg-red-500 text-white p-3">
      <RiDeleteBin6Line />
    </div>
  </div>
)
