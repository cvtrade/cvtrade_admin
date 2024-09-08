import React from 'react'
import DataTable from 'react-data-table-component';

const DataTableBase = (props) => {
  return (
    <DataTable
    pagination
    direction="auto"
    responsive
    subHeaderAlign="right"
    subHeaderWrap
    striped
    highlightOnHover
    fixedHeader
    {...props}
/>
  )
}

export default DataTableBase
  