import React, { Component } from 'react'
import { Box, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import {Stack, Text, Flex, Heading, ThemeProvider, CSSReset, theme} from "@chakra-ui/react";
import { useCreateLevelMutation, Question, useGetAllQuestionQuery, GetAllQuestionQuery, useGetQuestionQuery, useGetAllLevelQuery } from "../generated/graphql";
import { useTable } from 'react-table'
import styled from 'styled-components'
import NextLink from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";
import {FacebookShareButton, FacebookIcon} from "react-share";
import { useRouter } from "next/router";
import {Formik, Form} from "formik";



const LevelBuilder = () => {
    return (
        <div>
            <ThemeProvider theme= {theme}>
                <CSSReset />
                <LevelBuilderPage />
            </ThemeProvider> 
        </div>
    )
}

 
const LevelBuilderPage = () => {
    return(
        <div>
            <Heading size='2xl'>Level Builder</Heading>
            <LevelSelection />
            <Heading size='lg' marginTop='5vw'>Your saved levels</Heading>
            <SavedLevels />
            <FacebookShareButton 
                url={"http://127.0.0.1:3000/builder"}
                quote={"Join my class!"}
                hashtag="#Sausage_Party">
                 <FacebookIcon size={36} />
              </FacebookShareButton>
        </div>
    )
}

const LevelSelection = () => {
    const router = useRouter();
    const [,createLevel] = useCreateLevelMutation();
    return(
        // <Stack isInline={true} marginTop='2vw'>
           // <NextLink href={"/selectquestions"}>
            <Formik
                initialValues={{ level: 1, createdBy: ''}}
                
                onSubmit={async (values, {setErrors}) => {
                    const response = await createLevel({level: values.level, createdBy: values.createdBy});
                    // if(response.data?.createLevel.errors){
                    //     setErrors(toErrorMap(response.data.createLevel.errors));
                    // } else
                     if (response.data?.createLevel) {
                        //worked
                        router.push("/selectquestions");
                    }
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <FormControl mt={4}>
                            <FormLabel>Level: </FormLabel>
                            <Input 
                                type="number"
                                name="level"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.level}
                            />
                        </FormControl>
                            
                        <FormControl mt={4}>
                            <FormLabel>Created By: </FormLabel>
                            <Input
                                type="createdBy"
                                name="createdBy"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.createdBy}
                            />
            
                        </FormControl>
                        
                        <Button w='30vw' h='70px' type="submit" isLoading={isSubmitting} boxShadow='lg'  bgColor='green' textAlign='center'>
                            <Heading>Create New Level</Heading>
                        </Button>
                    </Form>
                )}
            </Formik>
                // <Button w='30vw' h='70px' boxShadow='lg'  bgColor='green' textAlign='center'>
                //     <Heading>Create New Level</Heading>
                // </Button>
           // </NextLink>
       // </Stack>
    )
}

const SavedLevels = () => {
    const columns = React.useMemo(
        () => [
            {
                Header: 'No.',
                accessor: 'number',
            },
            {
                Header: 'Level ID',
                accessor: 'levelID',
            },
            {
                Header: 'Level',
                accessor: 'level',
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
    const [{data}] = useGetAllLevelQuery({
        variables: {
            createdBy: 'test1',
        }
    })

    var levels
    if (data) {
      levels = data.getAllLevel
    } else {
      levels = []
    }
    levels.sort((firstEl, secondEl) => firstEl.score - secondEl.score) 
    console.log(levels)


    var builder = levels.map((levels, index) => {
        return {
            number: index + 1,
            levelID: levels.id,
            level: levels.level,
            creator: levels.createdBy,
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


export default LevelBuilder