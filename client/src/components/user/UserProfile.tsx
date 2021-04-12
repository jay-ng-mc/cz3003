import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import {ThemeProvider, theme, CSSReset, Box, Image, Heading} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useMeQuery, useGetAllGameByUsernameQuery } from "../../generated/graphql";

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

class ProfilePage extends React.Component<{data}> {
  columns = [
    {
        Header: 'Time played',
        accessor: 'timePlayed',
    },
    {
        Header: 'Questions answered',
        accessor: 'questionAnswered',
    },
    {
        Header: 'Correct answer',
        accessor: 'correctAnswer'
    }
  ]

  render() {
    return (
      <Styles>
        <Table columns={this.columns} data={this.props.data} />
      </Styles>
    )
  }
}

// const username = data.me.username

const UserProfile = () => {
  const isServer = () => typeof window ==="undefined";
  const getMe = () => {
    const [{data, fetching}] = useMeQuery({
      pause: isServer(),
    });
    return data
  }
  var meData = getMe()
  var userName
  if (meData) {
    userName = meData.me.username
  } else {
    userName = ''
  }
  var [{data}] = useGetAllGameByUsernameQuery({
    variables: {username: userName}
  });
  var games 
  if (data) {
    games = data.getAllGameByUsername
  } else {
    games = []
  }

  var totalQuestions = 0
  var totalCorrect = 0

  var profile = games.map((game) => {
    totalQuestions += game.totalQuestion,
    totalCorrect += game.score
    return {
      timePlayed: game.startTime,
      questionAnswered: game.totalQuestion,
      correctAnswer: game.score 
    }
  })
  const accuracy_origin = totalCorrect/totalQuestions * 100
  const accuracy = accuracy_origin.toPrecision(4)
  // console.log(profile)
  return(
    <ThemeProvider theme={theme}>
      <CSSReset />
        <Box p={3} textAlign='center'>
          <Image borderRadius="full" src={"images\\titleScreen.png"} alt="title" id="title" />
          <Heading>User Profile</Heading>
          <h2> Total questions answered: {totalQuestions} </h2>
          <h2> Total correct answers: {totalCorrect} </h2>
          <h2> Accuracy: {accuracy}% </h2>
        </Box>
      <ProfilePage data={profile} />
    </ThemeProvider>
  )
}


export default withUrqlClient(createUrqlClient) (UserProfile);
