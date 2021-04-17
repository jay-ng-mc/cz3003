import React, { useState } from 'react'
import {Box, Stack, HStack, Button, Text, Flex, Heading, ThemeProvider, CSSReset, theme, Center, VStack} from "@chakra-ui/react";
import { GetQuestionQuery, Question, useGetAllQuestionQuery, GetAllQuestionQuery, useGetQuestionQuery } from "../generated/graphql";
import { useTable } from 'react-table'
import styled from 'styled-components'
import { Checkbox } from "@chakra-ui/react"
import { Input } from "@chakra-ui/react"





const SelectQuestions = () => {

    const [selection, setSelection] = useState([3, 5, 14]);


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
    
        var selected = []

        for (var i = 0; i < selection.length; i ++) {
            const [{data}] = useGetQuestionQuery({
                variables: {
                    id: selection[i],
                }
            })

            if (data) {
                selected.push(data.getQuestion);
            } 
            else {
                continue;
            }
        
        }

        selected.sort((firstEl, secondEl) => firstEl.id - secondEl.id);
        console.log(selected);
    
    
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


    const questionTableColumns = () => {
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
    
        return columns
    }


    const questionTableBuilder = (type, difficulty) => {
        const [{data}] = useGetAllQuestionQuery({
            variables: {
                type: type,
                difficulty: difficulty,
            }
        })
    
        var questions;
        if (data) {
          questions = data.getAllQuestion;
        } else {
          questions = [];
        }
        questions.sort((firstEl, secondEl) => firstEl.score - secondEl.score);
        console.log(questions);
    
    
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
    
        return builder;
    }


    // const updateSelection = (questionId) => {
    //     let newSelection = selection;
    //     if (newSelection.includes(questionId)) {
    //         newSelection.splice(questionId);
    //     }
    //     else {
    //         newSelection.push(questionId);
    //     }

    //     setSelection(newSelection);
    // }


    const QuestionTables = () => {
        return (
            <Styles>
                <Box textAlign='left'>
                    <Heading size='md' marginTop='5vw'>Topic 1 Difficulty 1 Questions</Heading>
                    <Table columns={questionTableColumns()} data={questionTableBuilder('topic 1', 1)}/> 
                    <Heading size='md' marginTop='5vw'>Topic 1 Difficulty 2 Questions</Heading>
                    <Table columns={questionTableColumns()} data={questionTableBuilder('topic 1', 2)}/> 
                    <Heading size='md' marginTop='5vw'>Topic 1 Difficulty 3 Questions</Heading>
                    <Table columns={questionTableColumns()} data={questionTableBuilder('topic 1', 3)}/> 
                    <Heading size='md' marginTop='5vw'>Topic 2 Difficulty 1 Questions</Heading>
                    <Table columns={questionTableColumns()} data={questionTableBuilder('topic 2', 1)}/> 
                    <Heading size='md' marginTop='5vw'>Topic 2 Difficulty 2 Questions</Heading>
                    <Table columns={questionTableColumns()} data={questionTableBuilder('topic 2', 2)}/> 
                    <Heading size='md' marginTop='5vw'>Topic 2 Difficulty 3 Questions</Heading>
                    <Table columns={questionTableColumns()} data={questionTableBuilder('topic 2', 3)}/> 
                    <Heading size='md' marginTop='5vw'>Topic 3 Difficulty 1 Questions</Heading>
                    <Table columns={questionTableColumns()} data={questionTableBuilder('topic 3', 1)}/> 
                    <Heading size='md' marginTop='5vw'>Topic 3 Difficulty 2 Questions</Heading>
                    <Table columns={questionTableColumns()} data={questionTableBuilder('topic 3', 2)}/> 
                    <Heading size='md' marginTop='5vw'>Topic 3 Difficulty 3 Questions</Heading>
                    <Table columns={questionTableColumns()} data={questionTableBuilder('topic 3', 3)}/> 
                    
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

    
    return (
        <div>
            <ThemeProvider theme= {theme}>
                <CSSReset />
                <Center>
                    <VStack>
                        <Heading size='xl'>Your Level</Heading>
                        <Input w='25vw' marginLeft='2vw' placeholder="Name of level"/>
                    </VStack>
                </Center>   
                <SelectedQuestions/>
                
                <QuestionTables />

            </ThemeProvider> 
        </div>
    )
}



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

export default SelectQuestions;