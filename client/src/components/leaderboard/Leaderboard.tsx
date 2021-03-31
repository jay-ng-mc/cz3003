import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import {Box, Heading, Image} from "@chakra-ui/react";
import leaderboardData from './leaderboardData'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;
    margin-left: auto;
    margin-right: auto;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

function Leaderboard() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Ranking',
        accessor: 'rank',
      },
      {
        Header: 'Username',
        accessor: 'userName',
      },
      {
        Header: 'Date Recorded',
        accessor: 'entryDate',
      },
      {
        Header: 'Timing',
        accessor: 'timeTaken',
      },
    ],
    []
  )

  const data = React.useMemo(() => leaderboardData(10), [])

  return (
    <Styles>
      <Box p={3} textAlign='center'>
        <Image borderRadius="full" src={"images\\titleScreen.png"} alt="title" id="title" />
        <Heading>Leaderboard</Heading>
      </Box>
      <Table columns={columns} data={data} />
    </Styles>
  )
}


export default Leaderboard
