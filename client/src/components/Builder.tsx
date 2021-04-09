import Grid from 'react-css-grid'
import React, { Component } from 'react'
import styles from '../board/board.module.css'
import {Box, Stack, HStack, Button, Text, Flex, Heading, ThemeProvider, CSSReset, theme} from "@chakra-ui/react";
import { Container } from './Container';
import { GetQuestionQuery, Question, useGetAllQuestionQuery, GetAllQuestionQuery, useGetQuestionQuery } from "../generated/graphql";
import { useTable } from 'react-table'

const Builder = () => {
    return (
        <div>
            <ThemeProvider theme= {theme}>
                <CSSReset />
                <BuilderBox />
            </ThemeProvider> 
        </div>
    );
}

const BuilderBox = () => {


    const columns = React.useMemo(
        () => [
          {
            Header: 'No.',
            accessor: 'questionId',
          },
          {
            Header: 'Question',
            accessor: 'questionTitle',
          },
          {
            Header: 'Choice A',
            accessor: 'A',
          },
          {
            Header: 'Choice B',
            accessor: 'B',
          },
          {
            Header: 'Choice C',
            accessor: 'C',
          },
          {
            Header: 'Choice D',
            accessor: 'D',
          },
        ],
        []
      )

    const [{data}] = useGetAllQuestionQuery({
        variables: {
            type: "topic 1",
            difficulty: 1,
        }
    })
    var questions
    if (data) {
      questions = data.getAllQuestion
    } else {
      questions = []
    }
    questions.sort((firstEl, secondEl) => firstEl.score - secondEl.score) 
    console.log(questions)


    var builder = questions.map((questions, index) => {
        return {
            questionId: index + 1,
            questionTitle: questions.questionTitle,
            A: questions.A,
            B: questions.B,
            C: questions.C,
            D: questions.D,
        }
    })

    return (
        <Box my={5} textAlign='left'>
            <Table columns={columns} data={builder}/> 
        </Box>
    )
}

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
                    return <td {...cell.getCellProps()} onClick={highlightRow(row.getRowProps())}>{cell.render('Cell')}</td>
                    })}
                </tr>
                )
            })}
            </tbody>
        </table>
    )

    function highlightRow (row) {
        console.log(row + "highlighted")
    }
}



export default Builder