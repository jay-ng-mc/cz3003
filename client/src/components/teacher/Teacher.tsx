import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import {Box, Image, Button, Heading} from "@chakra-ui/react";
import {FacebookShareButton, FacebookIcon} from "react-share";
import { useGetAllGameByUsernameQuery, useGetAllStudentTeacherQuery, useMeQuery } from '../../generated/graphql';
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
    function getscore(x){
        console.log(x)
        var dataNeeded = [];
        var masteryScore = 0
        for (var j = 0; j < x.length;j++){
            var allGames
            var dataInside = new Object()
            var correctSum = 0
            var questionSum = 0
            var [{data}] = useGetAllGameByUsernameQuery({
                variables: {
                    username: x[j],
                }
            })
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
                dataInside['student'] = x[j]
                dataInside['mastery'] = masteryScore
            }
            dataNeeded.push(dataInside)
            
        }
        
        console.log(allGames)
        console.log(dataNeeded)
        return dataNeeded
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

<<<<<<< HEAD
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
=======
        var [{data}] = useGetAllStudentTeacherQuery({
            variables:{
                teacher: 't1'
            }
        });
        var studentTeachers
        var studentList = []
        if (data) {
            studentTeachers = data.getAllStudentTeacher
        } else {
        studentTeachers = []
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
        var needed =  getscore(studentList)
        //studentTeachers.sort((firstEl, secondEl) => firstEl.score - secondEl.score) 
        //console.log(studentList)
        //console.log(studentTeachers)
        //console.log(studentTeachers['0'])
<<<<<<< HEAD
        var student = studentTeachers.map((studentTeacher) => {
>>>>>>> 974b644 (changes1.0)
        return {
            student: studentTeacher.student,
            mastery: Math.floor(Math.random() * 100),
=======
        var student = needed.map((studentTeacher) => {
        return {
        student: studentTeacher.student,
        mastery: studentTeacher.mastery,
>>>>>>> 58c08e5 (added mstery calculation)
        }
    })
<<<<<<< HEAD
    console.log(students)
=======
    //console.log(student)
        //const data = React.useMemo(() => teacherData(10), [])
>>>>>>> 974b644 (changes1.0)

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