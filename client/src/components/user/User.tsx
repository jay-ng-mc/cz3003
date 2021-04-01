import React, { useState } from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import {Box, Image, Button, Heading} from "@chakra-ui/react";
import {makeData, getQuestion, getCorrect} from './userData'

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
    

    function User() {
        const columns = React.useMemo(
            () => [
            {
                Header: 'Time played',
                accessor: 'timePlayed',
            },
            {
                Header: 'Questions answered',
                accessor: 'questionAnswered',
            },
            {
                Header: 'Correct answer',
                accessor: 'correctAnswer'
            },
            ],
            []
        )

        const data = React.useMemo(() => makeData(10), [])
        const totalQuestions = getQuestion()
        const totalCorrect = getCorrect()
        const percentageCorrect = (totalCorrect/totalQuestions)*100
        const converted = percentageCorrect.toPrecision(3) + "%"
        return (
            <Styles>
                <Box p={3} textAlign='center'>
                    <Image borderRadius="full" src={"images\\titleScreen.png"} alt="title" id="title" />
                    <Heading textAlign='center' mb='10px'>My profile</Heading>
                    <h2> Total questions answered: {totalQuestions} </h2>
                    <h2> Total correct answers: {totalCorrect} </h2>
                    <h2> Accuracy: {converted} </h2>
                </Box>        

                <Table columns={columns} data={data} />
            </Styles>
    )
}


export default User