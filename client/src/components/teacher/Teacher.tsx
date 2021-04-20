import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import {Box, Image, Button, Heading, StatUpArrow} from "@chakra-ui/react";
import {FacebookShareButton, FacebookIcon} from "react-share";
import { useGetAllGameByUsernameQuery, useGetAllStudentTeacherQuery, useMeQuery } from '../../generated/graphql';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';

const Styles = styled.div`
  //padding: 1rem;

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
    width: 30rem;
    text-align: center;
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
function TableHeader({ columns, data }) {
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
        
        </table>
    )
}
function TableBody({columns, data }) {
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

    var [{data}] = useGetAllStudentTeacherQuery({
        variables:{
            teacher: myName
        }
    });
    var studentTeachers = []
    var studentList = []
    if (myName && data) {
        studentTeachers = data.getAllStudentTeacher
    }
    for (var i = 0; i < studentTeachers.length;i++){
        var temp = String(studentTeachers[i].student);
        try{
            studentList.push(temp)
        }catch(err){
            console.log(err)
        }
    }
    console.log(studentList)
    console.log("reach here 1")
    var needed = []
    if (studentList) {
        needed = [{student:'student',mastery:"mastery"}]
        needed.sort((firstEl, secondEl) => firstEl.score - secondEl.score)
    }
    var studentMasteryList = needed.map((studentTeacher) => {
        return {
            student: studentTeacher.student,
            mastery: studentTeacher.mastery,
        }
    })
    return <TeacherComponent myName={myName} students={studentList} columns={columns} data={studentMasteryList} />
}

class TeacherComponent extends React.Component<{myName, students, columns, data}> {

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
                {/* <Table columns={this.props.columns} data={this.props.students} /> */}
                <TableHeader columns={this.props.columns} data={this.props.data} />
                <DataBox columns={this.props.columns} studentList = {this.props.students} ></DataBox>
                
            </Styles>
        )
    }
}

const DataBox = ({columns, studentList}) => {

return (
    <div className='DataBox'>
        {studentList.map((student,key)=>{
            return(
                <div key={key}>
                    <Student columns={columns} name={student} />
                </div>
            );
        })}
    </div>
);
}

const Student = ({columns, name})=>{

        var dataNeeded = []
        var masteryScore = 0
        var allGames = []
        var dataInside = new Object()
        var correctSum = 0
        var questionSum = 0
        var [{data}] = useGetAllGameByUsernameQuery({
            variables: {
                username: name,
            }
        })
        console.log(data)
        if (data) {
            allGames = data.getAllGameByUsername
        } else {
            allGames = []
        }
        for (var i = 0; i < allGames.length;i++){
            // var temp1 = parseInt(allGames[i].totalCorrect);
            // var temp2 = parseInt(allGames[i].totalQuestion);
            try{
                var temp1 = parseInt(allGames[i].totalCorrect);
                var temp2 = parseInt(allGames[i].totalQuestion);
                 correctSum += temp1
                questionSum += temp2
            }catch(err){
                console.log(err)
            }
            console.log(correctSum)
            console.log(questionSum)
            masteryScore =  parseInt(((correctSum/questionSum)*100).toFixed())
        }
        dataInside['student'] = name
        dataInside['mastery'] = masteryScore
        dataNeeded.push(dataInside)
        console.log(allGames)
        console.log("take from here")
        console.log(dataInside)
        console.log(dataNeeded)
        var studentMasteryList = dataNeeded.map((studentTeacher) => {
            return {
                student: studentTeacher.student,
                mastery: studentTeacher.mastery,
            }
        })
    return(
    <Styles>
    <TableBody columns={columns} data={studentMasteryList}/>
    </Styles> 
    )
}


export default withUrqlClient(createUrqlClient) (Teacher);