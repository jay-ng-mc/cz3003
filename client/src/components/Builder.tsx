import Grid from 'react-css-grid'
import React, { Component } from 'react'
import styles from '../board/board.module.css'
import {Box, Stack, HStack, Button, Text, Flex, Heading, ThemeProvider, CSSReset, theme} from "@chakra-ui/react";
import { Container } from './Container';
import { GetQuestionQuery, Question, useGetAllQuestionQuery, GetAllQuestionQuery, useGetQuestionQuery } from "../generated/graphql";
import { useTable } from 'react-table'
import styled from 'styled-components'
import NextLink from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";

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

class LevelBuilder extends React.Component {
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
                    <LevelBuilderPage />
                </ThemeProvider> 
            </div>
        )
    }
}

 
const LevelBuilderPage = () => {
    return(
        <div>
            <Heading size='2xl'>Level Builder</Heading>
            <LevelSelection />
            <Heading size='lg' marginTop='5vw'>Your saved levels</Heading>
            <SavedLevels />
        </div>
    )
}

const LevelSelection = () => {
    return(
        <Stack isInline={true} marginTop='2vw'>
            <NextLink href={"/selectquestions"}>
                <Button w='30vw' h='70px' boxShadow='lg'  bgColor='green' textAlign='center'>
                    <Heading>Create New Level</Heading>
                </Button>
            </NextLink>
        </Stack>
    )
}

const SavedLevels = () => {
    const columns = React.useMemo(
        () => [
            {
                Header: 'No.',
                accessor: 'levelID',
            },
            {
                Header: 'Level Name',
                accessor: 'levelName',
            },
            {
                Header: 'Date Created',
                accessor: 'dateCreated',
            },
            {
                Header: 'Created By',
                accessor: 'creator',
            },
            {
                Header: 'Edit',
                accessor: 'edit',
            },
            {
                Header: 'Delete',
                accessor: 'delete',
            },
        ],
        []
      )

    ///////////// TO BE LINKED WITH DATABASE////////////////////////
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
            levelID: index + 1,
            levelName: 'SSAD',
            dateCreated: '13/4/21',
            creator: 'SX',
            edit: <Button><FaEdit /></Button>,
            delete: <Button><FaTrash /></Button>,
        }
    })
    ///////////// TO BE LINKED WITH DATABASE////////////////////////

    return (
        <Styles>
            <Box my={5} textAlign='left'>
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



export default LevelBuilder