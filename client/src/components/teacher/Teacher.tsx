import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import {Box, Image, Button, Heading} from "@chakra-ui/react";
import {FacebookShareButton, FacebookIcon} from "react-share";
import { useGetAllStudentTeacherQuery, useMeQuery } from '../../generated/graphql';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';

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

function Teacher() {
    var columns = React.useMemo(
        () => [
        {
            Header: 'Username',
            accessor: 'student',
        },
        {
            Header: 'Mastery',
            accessor: 'mastery',
        },
        ],
        []
    )

    var myName
    const isServer = () => typeof window ==="undefined";
    const [{data: meData, fetching}] = useMeQuery({
        pause: isServer(),
    });
    if (!fetching && meData?.me) {
        myName = meData.me.username
    } else {
        console.log('Did not persist: no me data in StudentLogin')
    }

    var studentTeachers = []
    var [{data}] = useGetAllStudentTeacherQuery({
        variables:{
            teacher: myName
        }
    });
    if (myName && data) {
        studentTeachers = data.getAllStudentTeacher
    }

    var students = []
    studentTeachers.sort((firstEl, secondEl) => firstEl.score - secondEl.score) 
    console.log(studentTeachers)
    students = studentTeachers.map((studentTeacher) => {
        return {
            student: studentTeacher.student,
            mastery: Math.floor(Math.random() * 100),
        }
    })
    console.log(students)

    return <TeacherComponent myName={myName} students={students} columns={columns}/>
}

class TeacherComponent extends React.Component<{myName, students, columns}> {

    render() {
        return (
            <Styles>
                <Box p={3} textAlign='center'>
                    <Image borderRadius="full" src={"images\\titleScreen.png"} alt="title" id="title" />
                </Box>
                <Box my={5} textAlign='center'>
                    {/* <Button type="submit" backgroundColor="teal.300" bgImage="url('/images/sausage.png')" 
                    bgPosition='center' bgSize='112px 45px'>
                        Share Class
                    </Button> */}
                    {this.props.myName ?
                        <FacebookShareButton 
                            url={`http://127.0.0.1:3000/student/${this.props.myName}`}
                            quote={"Join my class"}
                            hashtag="#Sausage_Party">
                            <FacebookIcon size={36} />
                        </FacebookShareButton>
                        : "Loading share button"
                    }
                </Box>
                <Heading textAlign='center' mb='10px'>Students in my class</Heading>
                <Table columns={this.props.columns} data={this.props.students} />
            </Styles>
        )
    }
}


export default withUrqlClient(createUrqlClient) (Teacher);