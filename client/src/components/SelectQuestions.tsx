// import React, { useState, useEffect } from 'react'
// import {Box, Stack, HStack, Button, Text, Flex, Heading, ThemeProvider, CSSReset, theme, Center, VStack} from "@chakra-ui/react";
// import { GetQuestionQuery, Question, useGetAllQuestionQuery, GetAllQuestionQuery, useGetQuestionQuery } from "../generated/graphql";
// import { useTable } from 'react-table'
// import styled from 'styled-components'
// import { Checkbox } from "@chakra-ui/react"
// import { Input } from "@chakra-ui/react"
// import { render } from 'react-dom';

// class SelectQuestions extends React.Component <{}, { [key: string]: number[] }> {

//     constructor(props) {
//         super(props);
//         this.state = {selection: []};
//         this.updateSelection = this.updateSelection.bind(this)
//         this.checked = this.checked.bind(this)
//         this.selectedColumns = this.selectedColumns.bind(this)
//         this.selectedBuilder = this.selectedBuilder.bind(this)
//         this.QuestionTables = this.QuestionTables.bind(this)
//         this.questionTableBuilder = this.questionTableBuilder.bind(this)
//         this.questionTableColumns = this.questionTableColumns.bind(this)
//     }   

//     updateSelection(questionId) {
//         let newSelection = this.state.selection;
//         if (newSelection.includes(questionId)) {
//             var index = newSelection.indexOf(questionId);
//             newSelection.splice(index, 1);
//             console.log(questionId + ' unchecked');
//         }
//         else {
//             newSelection.push(questionId);
//             console.log(questionId + ' checked');
//         }
    
//         this.setState({
//             selection: newSelection
//         })
//     }

//     checked(questionId) {
//         if(this.state.selection.includes(questionId)) {
//             return true;
//         }
//         return false;
//     }

//     selectedColumns() {
//         const columns = React.useMemo(
//             () => [
//                 {
//                     Header: 'No.',
//                     accessor: 'number',
//                 },
//                 {
//                     Header: 'ID',
//                     accessor: 'questionId',
//                 },
//                 {
//                     Header: 'Question',
//                     accessor: 'questionTitle',
//                 },
//                 {
//                     Header: 'Type',
//                     accessor: 'type',
//                 },
//                 {
//                     Header: 'Difficulty',
//                     accessor: 'difficulty',
//                 },
//             ],
//             []
//         )

//         return columns;
//     }

//     selectedBuilder() {
//         var selected = []
    
//         for (var i = 0; i < this.state.selection.length; i ++) {
//             const [{data}] = useGetQuestionQuery({
//                 variables: {
//                     id: this.state.selection[i],
//                 }
//             })
    
//             if (data) {
//                 selected.push(data.getQuestion);
//             } 
//             else {
//                 continue;
//             }
//         }
    
//         selected.sort((firstEl, secondEl) => firstEl.id - secondEl.id);
//         console.log(selected);
    
//         var builder = selected.map((questions, index) => {
//             return {
//                 number: index + 1,
//                 questionId: questions.id,
//                 questionTitle: questions.questionTitle,
//                 type: questions.type,
//                 difficulty: questions.difficulty,
//             }
//         })

//         return builder
//     }
    
//     QuestionTables() {
//         return (
//             <Styles>
//                 <Box textAlign='left'>
//                     <Heading size='md' marginTop='5vw'>Topic 1 Difficulty 1 Questions</Heading>
//                     <Table columns={this.questionTableColumns()} data={this.questionTableBuilder('topic 1', 1)}/> 
//                     <Heading size='md' marginTop='5vw'>Topic 1 Difficulty 2 Questions</Heading>
//                     <Table columns={this.questionTableColumns()} data={this.questionTableBuilder('topic 1', 2)}/> 
//                     <Heading size='md' marginTop='5vw'>Topic 1 Difficulty 3 Questions</Heading>
//                     <Table columns={this.questionTableColumns()} data={this.questionTableBuilder('topic 1', 3)}/> 
//                     <Heading size='md' marginTop='5vw'>Topic 2 Difficulty 1 Questions</Heading>
//                     <Table columns={this.questionTableColumns()} data={this.questionTableBuilder('topic 2', 1)}/> 
//                     <Heading size='md' marginTop='5vw'>Topic 2 Difficulty 2 Questions</Heading>
//                     <Table columns={this.questionTableColumns()} data={this.questionTableBuilder('topic 2', 2)}/> 
//                     <Heading size='md' marginTop='5vw'>Topic 2 Difficulty 3 Questions</Heading>
//                     <Table columns={this.questionTableColumns()} data={this.questionTableBuilder('topic 2', 3)}/> 
//                     <Heading size='md' marginTop='5vw'>Topic 3 Difficulty 1 Questions</Heading>
//                     <Table columns={this.questionTableColumns()} data={this.questionTableBuilder('topic 3', 1)}/> 
//                     <Heading size='md' marginTop='5vw'>Topic 3 Difficulty 2 Questions</Heading>
//                     <Table columns={this.questionTableColumns()} data={this.questionTableBuilder('topic 3', 2)}/> 
//                     <Heading size='md' marginTop='5vw'>Topic 3 Difficulty 3 Questions</Heading>
//                     <Table columns={this.questionTableColumns()} data={this.questionTableBuilder('topic 3', 3)}/> 
                    
//                 </Box>
//             </Styles>    
//         )
//     }
    
//     questionTableColumns() {
//         const columns = React.useMemo(
//             () => [
//                 {
//                     Header: 'Check',
//                     accessor: 'checkbox',
//                 },
//                 {
//                     Header: 'ID',
//                     accessor: 'questionId',
//                 },
//                 {
//                     Header: 'Question',
//                     accessor: 'questionTitle',
//                 },
//                 {
//                     Header: 'Choice A',
//                     accessor: 'A',
//                 },
//                 {
//                     Header: 'Choice B',
//                     accessor: 'B',
//                 },
//                 {
//                     Header: 'Choice C',
//                     accessor: 'C',
//                 },
//                 {
//                     Header: 'Choice D',
//                     accessor: 'D',
//                 },
//                 {
//                     Header: 'Type',
//                     accessor: 'type',
//                 },
//                 {
//                     Header: 'Difficulty',
//                     accessor: 'difficulty',
//                 },
//             ],
//             []
//         )
    
//         return columns
//     }
    
//     questionTableBuilder(type, difficulty) {
//         const [{data}] = useGetAllQuestionQuery({
//             variables: {
//                 type: type,
//                 difficulty: difficulty,
//             }
//         })
    
//         var questions;
//         if (data) {
//           questions = data.getAllQuestion;
//         } else {
//           questions = [];
//         }
//         questions.sort((firstEl, secondEl) => firstEl.score - secondEl.score);
//         console.log(questions);
    
    
//         var builder = questions.map((questions) => {
//             return {
//                 checkbox: <Checkbox onChange={() => this.updateSelection(questions.id)} defaultChecked={this.checked(questions.id)}/>,
//                 questionId: questions.id,
//                 questionTitle: questions.questionTitle,
//                 A: questions.A,
//                 B: questions.B,
//                 C: questions.C,
//                 D: questions.D,
//                 type: questions.type,
//                 difficulty: questions.difficulty,
//             }
//         })
    
//         return builder
//     }

//     render() {
//         return (
//             <div>
//                 <ThemeProvider theme= {theme}>
//                     <CSSReset />
//                     <Center>
//                         <VStack>
//                             <Heading size='xl'>Level Editor</Heading>
//                             <Input w='25vw' marginLeft='2vw' placeholder="Name of level"/>
//                         </VStack>
//                     </Center>   
//                     <Styles>
//                         <Box textAlign='left'>
//                             <Table columns={this.selectedColumns} data={this.selectedBuilder}/>
//                             <Center>
//                                 <Button w='30vw' h='4vw' boxShadow='lg'  bgColor='green' marginTop='3'>
//                                     <Heading>Save</Heading>
//                                 </Button>
//                             </Center>
//                         </Box>
//                     </Styles>
//                     <this.QuestionTables />
    
//                 </ThemeProvider> 
//             </div>
//         )
//     }  
    
// }

// function Table({ columns, data }) {
//     // Use the state and functions returned from useTable to build your UI
//     const {
//         getTableProps,
//         getTableBodyProps,
//         headerGroups,
//         rows,
//         prepareRow,
//     } = useTable({
//         columns,
//         data,
//     })
  
//     // Render the UI for your table
//     return (
//         <table {...getTableProps()}>
//             <thead>
//             {headerGroups.map(headerGroup => (
//                 <tr {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map(column => (
//                     <th {...column.getHeaderProps()}>{column.render('Header')}</th>
//                 ))}
//                 </tr>
//             ))}
//             </thead>
//             <tbody {...getTableBodyProps()}>
//             {rows.map((row, i) => {
//                 prepareRow(row)
//                 return (
//                 <tr {...row.getRowProps()}>
//                     {row.cells.map(cell => {
//                     return <td {...cell.getCellProps()}> {cell.render('Cell')} </td>
//                     })}
//                 </tr>
//                 )
//             })}
//             </tbody>
//         </table>
//     )
// }


// const Styles = styled.div`
//   padding: 1rem;

//   table {
//     border-spacing: 0;
//     border: 1px solid black;
//     margin-left: auto;
//     margin-right: auto;

//     tr {
//       :last-child {
//         td {
//           border-bottom: 0;
//         }
//       }
//     }

//     th,
//     td {
//       margin: 0;
//       padding: 0.5rem;
//       border-bottom: 1px solid black;
//       border-right: 1px solid black;

//       :last-child {
//         border-right: 0;
//       }
//     }
//   }
// `

// export default SelectQuestions;









import React, { useState, useEffect } from 'react'
import {Box, Stack, HStack, Button, Text, Flex, Heading, ThemeProvider, CSSReset, theme, Center, VStack} from "@chakra-ui/react";
import { GetQuestionQuery, Question, useGetAllQuestionQuery, GetAllQuestionQuery, useGetQuestionQuery } from "../generated/graphql";
import { useTable } from 'react-table'
import styled from 'styled-components'
import { Checkbox } from "@chakra-ui/react"
import { Input } from "@chakra-ui/react"
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";


const SelectQuestions = () => {

    const [selection, setSelection] = useState([]);

    // const renderThis = () => {}

    const SelectedQuestions = (props) => {
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

        for (var i = 0; i < props.selection.length; i ++) {
            const [{data}] = useGetQuestionQuery({
                variables: {
                    id: props.selection[i],
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
        console.log(props.selection)
        console.log(props.selected)
        
        return (
            
            <Styles>
                <Box textAlign='left'>
                    {console.log(props.selection)}
                    {console.log(props.selected)}
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
                checkbox: <Checkbox onChange={() => updateSelection(questions.id)} defaultChecked={checked(questions.id)}/>,
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
    
        return builder
    }


    const updateSelection = async (questionId) => {
        let newSelection = selection;
        if (newSelection.includes(questionId)) {
            var index = newSelection.indexOf(questionId);
            newSelection.splice(index, 1);
            console.log(questionId + ' unchecked');
        }
        else {
            newSelection.push(questionId);
            console.log(questionId + ' checked');

        }

        await setSelection(newSelection);
    }
    

    const checked = (questionId) => {
        if(selection.includes(questionId)) {
            return true;
        }
        return false;
    }


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
                        <Heading size='xl'>Level Editor</Heading>       
                        <Heading size='md'>Level ID: 1</Heading>
                        <Input w='20vw' marginLeft='2vw' placeholder="Level"/>
                    </VStack>
                </Center>   
                <SelectedQuestions selection={selection}/>
                
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