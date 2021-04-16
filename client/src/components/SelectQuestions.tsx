import Grid from 'react-css-grid'
import React, { Component } from 'react'
import styles from '../board/board.module.css'
import {Box, Stack, HStack, Button, Text, Flex, Heading, ThemeProvider, CSSReset, theme, Center, VStack} from "@chakra-ui/react";
import { Container } from './Container';
import { GetQuestionQuery, Question, useGetAllQuestionQuery, GetAllQuestionQuery, useGetQuestionQuery } from "../generated/graphql";
import { useTable } from 'react-table'
import styled from 'styled-components'
import { render } from "react-dom";
import question from '../pages/question';
import { Checkbox, CheckboxGroup } from "@chakra-ui/react"
import { Input } from "@chakra-ui/react"


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

class SelectQuestions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selection: [3, 39, 56],
        };
 
    }
    
    render() {
        return (
            <div>
                <ThemeProvider theme= {theme}>
                    <CSSReset />
                    <Center>
                        <VStack>
                            <Heading size='xl'>Selected Questions</Heading>
                            <Input w='25vw' marginLeft='2vw' placeholder="Name of level"/>
                        </VStack>
                    </Center>   
                    <SelectedQuestions/>
                    <Heading size='md' marginTop='5vw'>Topic 1 Difficulty 1 Questions</Heading>
                    <QuestionTableType1Diff1/>
                    <Heading size='md' marginTop='5vw'>Topic 1 Difficulty 2 Questions</Heading>
                    <QuestionTableType1Diff2/>
                    <Heading size='md' marginTop='5vw'>Topic 1 Difficulty 3 Questions</Heading>
                    <QuestionTableType1Diff3/>
                    <Heading size='md' marginTop='5vw'>Topic 2 Difficulty 1 Questions</Heading>
                    <QuestionTableType2Diff1/>
                    <Heading size='md' marginTop='5vw'>Topic 2 Difficulty 2 Questions</Heading>
                    <QuestionTableType2Diff2/>
                    <Heading size='md' marginTop='5vw'>Topic 2 Difficulty 3 Questions</Heading>
                    <QuestionTableType2Diff3/>
                    <Heading size='md' marginTop='5vw'>Topic 3 Difficulty 1 Questions</Heading>
                    <QuestionTableType3Diff1/>
                    <Heading size='md' marginTop='5vw'>Topic 3 Difficulty 2 Questions</Heading>
                    <QuestionTableType3Diff2/>
                    <Heading size='md' marginTop='5vw'>Topic 3 Difficulty 3 Questions</Heading>
                    <QuestionTableType3Diff3/>
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
                accessor: 'number',
            },
            {
                Header: 'ID',
                accessor: 'questionId',
            },
            {
                Header: 'Question',
                accessor: 'questionTitle',
            },
            {
                Header: 'Type',
                accessor: 'type',
            },
            {
                Header: 'Difficulty',
                accessor: 'difficulty',
            },
        ],
        []
      )

    const [{data}] = useGetAllQuestionQuery()

    var selected
    if (data) {
        selected = data.getAllQuestion
    } else {
        selected = []
    }
    selected.sort((firstEl, secondEl) => firstEl.score - secondEl.score) 
    console.log(selected)


    var builder = selected.map((questions, index) => {
        return {
            number: index + 1,
            questionId: questions.id,
            questionTitle: questions.questionTitle,
            type: questions.type,
            difficulty: questions.difficulty,
        }
    })

    return (
        <Styles>
            <Box textAlign='left'>
                <Table columns={columns} data={builder}/>
                <Center>
                    <Button w='30vw' h='4vw' boxShadow='lg'  bgColor='green' marginTop='3'>
                        <Heading>Save</Heading>
                    </Button>
                </Center>
            </Box>
        </Styles>
        
    )
}

const QuestionTableType1Diff1 = () => {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Check',
                accessor: 'checkbox',
            },
            {
                Header: 'ID',
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
            {
                Header: 'Type',
                accessor: 'type',
            },
            {
                Header: 'Difficulty',
                accessor: 'difficulty',
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


    var builder = questions.map((questions) => {
        return {
            checkbox: <Checkbox />,
            questionId: questions.id,
            questionTitle: questions.questionTitle,
            A: questions.A,
            B: questions.B,
            C: questions.C,
            D: questions.D,
            type: questions.type,
            difficulty: questions.difficulty,
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

const QuestionTableType1Diff2 = () => {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Check',
                accessor: 'checkbox',
            },
            {
                Header: 'ID',
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
            {
                Header: 'Type',
                accessor: 'type',
            },
            {
                Header: 'Difficulty',
                accessor: 'difficulty',
            },
        ],
        []
      )

    const [{data}] = useGetAllQuestionQuery({
        variables: {
            type: 'topic 1',
            difficulty: 2,
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


    var builder = questions.map((questions) => {
        return {
            checkbox: <Checkbox />,
            questionId: questions.id,
            questionTitle: questions.questionTitle,
            A: questions.A,
            B: questions.B,
            C: questions.C,
            D: questions.D,
            type: questions.type,
            difficulty: questions.difficulty,
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

const QuestionTableType1Diff3 = () => {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Check',
                accessor: 'checkbox',
            },
            {
                Header: 'ID',
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
            {
                Header: 'Type',
                accessor: 'type',
            },
            {
                Header: 'Difficulty',
                accessor: 'difficulty',
            },
        ],
        []
      )

    const [{data}] = useGetAllQuestionQuery({
        variables: {
            type: 'topic 1',
            difficulty: 3,
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


    var builder = questions.map((questions) => {
        return {
            checkbox: <Checkbox />,
            questionId: questions.id,
            questionTitle: questions.questionTitle,
            A: questions.A,
            B: questions.B,
            C: questions.C,
            D: questions.D,
            type: questions.type,
            difficulty: questions.difficulty,
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

const QuestionTableType2Diff1 = () => {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Check',
                accessor: 'checkbox',
            },
            {
                Header: 'ID',
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
            {
                Header: 'Type',
                accessor: 'type',
            },
            {
                Header: 'Difficulty',
                accessor: 'difficulty',
            },
        ],
        []
      )

    const [{data}] = useGetAllQuestionQuery({
        variables: {
            type: 'topic 2',
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


    var builder = questions.map((questions) => {
        return {
            checkbox: <Checkbox />,
            questionId: questions.id,
            questionTitle: questions.questionTitle,
            A: questions.A,
            B: questions.B,
            C: questions.C,
            D: questions.D,
            type: questions.type,
            difficulty: questions.difficulty,
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

const QuestionTableType2Diff2 = () => {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Check',
                accessor: 'checkbox',
            },
            {
                Header: 'ID',
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
            {
                Header: 'Type',
                accessor: 'type',
            },
            {
                Header: 'Difficulty',
                accessor: 'difficulty',
            },
        ],
        []
      )

    const [{data}] = useGetAllQuestionQuery({
        variables: {
            type: 'topic 2',
            difficulty: 2,
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


    var builder = questions.map((questions) => {
        return {
            checkbox: <Checkbox />,
            questionId: questions.id,
            questionTitle: questions.questionTitle,
            A: questions.A,
            B: questions.B,
            C: questions.C,
            D: questions.D,
            type: questions.type,
            difficulty: questions.difficulty,
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

const QuestionTableType2Diff3 = () => {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Check',
                accessor: 'checkbox',
            },
            {
                Header: 'ID',
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
            {
                Header: 'Type',
                accessor: 'type',
            },
            {
                Header: 'Difficulty',
                accessor: 'difficulty',
            },
        ],
        []
      )

    const [{data}] = useGetAllQuestionQuery({
        variables: {
            type: 'topic 2',
            difficulty: 3,
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


    var builder = questions.map((questions) => {
        return {
            checkbox: <Checkbox />,
            questionId: questions.id,
            questionTitle: questions.questionTitle,
            A: questions.A,
            B: questions.B,
            C: questions.C,
            D: questions.D,
            type: questions.type,
            difficulty: questions.difficulty,
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

const QuestionTableType3Diff1 = () => {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Check',
                accessor: 'checkbox',
            },
            {
                Header: 'ID',
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
            {
                Header: 'Type',
                accessor: 'type',
            },
            {
                Header: 'Difficulty',
                accessor: 'difficulty',
            },
        ],
        []
      )

    const [{data}] = useGetAllQuestionQuery({
        variables: {
            type: 'topic 3',
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


    var builder = questions.map((questions) => {
        return {
            checkbox: <Checkbox />,
            questionId: questions.id,
            questionTitle: questions.questionTitle,
            A: questions.A,
            B: questions.B,
            C: questions.C,
            D: questions.D,
            type: questions.type,
            difficulty: questions.difficulty,
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

const QuestionTableType3Diff2 = () => {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Check',
                accessor: 'checkbox',
            },
            {
                Header: 'ID',
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
            {
                Header: 'Type',
                accessor: 'type',
            },
            {
                Header: 'Difficulty',
                accessor: 'difficulty',
            },
        ],
        []
      )

    const [{data}] = useGetAllQuestionQuery({
        variables: {
            type: 'topic 3',
            difficulty: 2,
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


    var builder = questions.map((questions) => {
        return {
            checkbox: <Checkbox />,
            questionId: questions.id,
            questionTitle: questions.questionTitle,
            A: questions.A,
            B: questions.B,
            C: questions.C,
            D: questions.D,
            type: questions.type,
            difficulty: questions.difficulty,
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

const QuestionTableType3Diff3 = () => {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Check',
                accessor: 'checkbox',
            },
            {
                Header: 'ID',
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
            {
                Header: 'Type',
                accessor: 'type',
            },
            {
                Header: 'Difficulty',
                accessor: 'difficulty',
            },
        ],
        []
      )

    const [{data}] = useGetAllQuestionQuery({
        variables: {
            type: 'topic 3',
            difficulty: 3,
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


    var builder = questions.map((questions) => {
        return {
            checkbox: <Checkbox />,
            questionId: questions.id,
            questionTitle: questions.questionTitle,
            A: questions.A,
            B: questions.B,
            C: questions.C,
            D: questions.D,
            type: questions.type,
            difficulty: questions.difficulty,
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
                <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}> {cell.render('Cell')} </td>
                    })}
                </tr>
                )
            })}
            </tbody>
        </table>
    )
}



export default SelectQuestions