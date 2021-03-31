import React from "react"
import { Link, Button, Stack, Flex, Heading, Box, ThemeProvider, theme, CSSReset, propNames } from "@chakra-ui/react";

export const UserProfile = () => {
    return (
        <ThemeProvider theme={theme}>
            <CSSReset />
            <QuestionsPage />
        </ThemeProvider>
    );
}

const TableStyle = {
    borderWidth: "3px", 
    borderColor:  "#000000",
    borderRadius: "0px",
    color: "black",

}

const userBank = 
[
    {name: 'John',
        play: 
        [
            { time: '9:00', asked: 10, correct: '6' },
            { time: '10:00', asked: 11, correct: '1' },
            {time: '11:00', asked: 12, correct: '11' }
        ]
    }
];


const id=0

class QuestionsPage extends React.Component {
    questions = () => {
        var sum=0
        for (var i = 0; i < userBank[id].play.length; i++) {
            sum += userBank[id].play[i].asked;
          }
        return sum
        }
        
    render() {
    return (
        <ThemeProvider theme={theme}>
            <CSSReset />
            <Flex minHeight='100vh' width='full' align='center' justifyContent='center'>
            <Box borderWidth={1} px={1} width='full' maxWidth='400px' borderRadius={4} textAlign='center' boxShadow='lg'>
            <ThemeProvider theme={theme} />
                <Heading>User Profile</Heading>
                <Heading>Player name: {userBank[id].name}</Heading>
                <h2>Number of games played: {userBank[id].play.length}</h2>
                <h2>Total questions answered: {this.questions} </h2>
                {/* <h2>Total correct answers: {this.answers} </h2> */}
                <br></br>
                <Box style={TableStyle}>
                    <tr>
                        <th>Time played</th>
                        <th>Questions answered</th>
                        <th>Correct answers</th>
                        <th>Percentage correct</th>
                    </tr>
                    {userBank[id].play.map((player) => (
                        <tr>
                        <td>{player.time}</td>
                        <td>{player.asked}</td>
                        <td>{player.correct}</td>                        
                        </tr>
                    ))}
                    
                </Box>
            </Box>
        </Flex>
        </ThemeProvider>
    );
    }


}

