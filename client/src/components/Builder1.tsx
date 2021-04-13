import Grid from 'react-css-grid'
import React, { Component } from 'react'
import styles from '../board/board.module.css'
import {Box, Stack, HStack, Button, Text, Flex, Heading, ThemeProvider, CSSReset, theme} from "@chakra-ui/react";
import { Container } from './Container';
import { GetQuestionQuery, Question, useGetAllQuestionQuery, GetAllQuestionQuery, useGetQuestionQuery } from "../generated/graphql";
import { useTable } from 'react-table'
import styled from 'styled-components'
import { render } from "react-dom";


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

class Builder1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selection: [],
            type: 'topic 1',
            difficulty: 1
        };
 
    }

    render() {
        return (
            <div>
                <ThemeProvider theme= {theme}>
                    <CSSReset />
                    <Heading marginBottom='2vw' size='2xl'>Level 1</Heading>
                    <Heading size='md'>Selected questions</Heading>
                    <SelectedQuestions />
                    <Heading size='md' marginTop='5vw'>Topic 1</Heading>
                    <QuestionTable type='topic 1' difficulty={1}/>
                    <Heading size='md'>Topic 2</Heading>
                    <QuestionTable type='topic 2' difficulty={1}/>
                    <Heading size='md'>Topic 3</Heading>
                    <QuestionTable type='topic 3' difficulty={1}/>
                </ThemeProvider> 
            </div>
        )
    }

    // isSelected(row) {
    //     this.setState(prevState => ({
    //         selection: [...prevState.selection, row]
    //     }))
    // }
}

const SelectedQuestions = () => {
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
                Header: 'Topic',
                accessor: 'questionTopic',
            },
        ],
        []
      )

    const [{data}] = useGetAllQuestionQuery({
        variables: {
            type: 'topic 1',
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
            questionTopic: 'Topic 1',
        }
    })

    return (
        <Styles>
            <Box textAlign='left'>
                <Table columns={columns} data={builder}/>
                <Stack isInline={true}>
                    <Button w='10vw' h='4vw' boxShadow='lg'  bgColor='green'>
                        <Heading>Save</Heading>
                    </Button>
                </Stack>
            </Box>
        </Styles>
        
    )
}

const QuestionTable = (type, difficulty) => {
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
            type: 'topic 1',
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
        <Styles>
            <Box textAlign='left'>
                <Table columns={columns} data={builder}/> 
            </Box>
        </Styles>
        
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
                <tr {...row.getRowProps()} onClick={highlightRow(row.getRowProps())}>
                    {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}> {cell.render('Cell')} </td>
                    })}
                </tr>
                )
            })}
            </tbody>
        </table>
    )

    function highlightRow (row) {
        console.log("Question " + row + " highlighted")
    }
}



export default Builder1