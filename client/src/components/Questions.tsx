import React from "react";
import {ThemeProvider, theme, CSSReset, Flex, Box, Image, Heading, HStack, Stack, Button} from "@chakra-ui/react";
import ReactDOM from 'react-dom';
import { useGetQuestionQuery } from "../generated/graphql";
import { Formik } from "formik";


export const Questions = () => {
    return (
        <ThemeProvider theme={theme}>
            <CSSReset />
            <QuestionsPage />
        </ThemeProvider>
    );
}



const QuestionBank = [
    {
        questionTitle: "This is a test question?", 
        A: "Answer A",
        B: "Answer B",
        C: "Answer C",
        D: "Answer D",
        Correct: "A"
    },
    { 
      questionTitle: "why does this happen?", 
      A: "ABCD",
      B: "EFGH",
      C: "IKLM",
      D: "NOP",
      Correct: "C"
    }
]

const AnswerStyle = {
    borderWidth: "3px", 
    borderColor:  "#000000",
    borderRadius: "0px",
    backgroundColor: "orange",
    color: "black",
    height: '100px',
    width: '190px',
}
const questionId = 1

class QuestionsPage extends React.Component <{}, { [key: string]: string }>{
    constructor(props) {
        super(props);
        this.state = {currentAnswer: "",
                    correctAnswer: QuestionBank[questionId].Correct
                };
        this.isCorrect = this.isCorrect.bind(this);
        this.changeColor1 = this.changeColor1.bind(this);
        this.changeColor2 = this.changeColor2.bind(this);
        this.changeColor3 = this.changeColor3.bind(this);
        this.changeColor4 = this.changeColor4.bind(this);
    }

    render() {
    return (
        <Flex minHeight='100vh' width='full' align='center' justifyContent='center'>
            <Box  borderWidth={1} px={1} width='full' maxWidth='500px' borderRadius={4} textAlign='center' boxShadow='lg'>
                <ThemeProvider theme={theme} />
                 <Box p={2}>
                <Box textAlign='center'>
                    <Heading>Question {questionId} </Heading>
                   
                </Box>                    
                <Box>
                        <Heading>{QuestionBank[questionId].questionTitle}</Heading>
                    </Box>
                </Box>
                <Box p={3}>
                    <Stack isInline  spacing='10px'>
                        <h2> A </h2>
                        <Box id = "A" onClick={this.changeColor1} style={AnswerStyle}  as="button" mr="40px">
                            {QuestionBank[questionId].A}
                        </Box>
                        <h2> B </h2>
                        <Box id = "B" onClick={this.changeColor2} style={AnswerStyle}  as="button">
                            {QuestionBank[questionId].B}
                        </Box>
                    </Stack>
                </Box>

                <Box p={3}>
                    <Stack isInline  spacing='10px' >
                        <h2> C </h2>
                        <Box id = "C" onClick={this.changeColor3} style={AnswerStyle} as="button" mr="40px" >
                            {QuestionBank[questionId].C}
                        </Box>
                        <h2> D </h2>
                        <Box id = "D" onClick={this.changeColor4} style={AnswerStyle} as="button" >
                            {QuestionBank[questionId].D}
                        </Box>
                    </Stack>
                </Box>
                
                <Box onClick= {this.isCorrect} as="button" borderRadius="10px" bg="tomato" color="yellow" px={4}>
                    Confirm
                </Box>
                

                <h3> Your answer is {this.state.currentAnswer} </h3>

                <h3 id="answer"></h3>
                
            </Box>
        </Flex>
    );
}

changeColor1() {
    if (document.getElementById('A').style.backgroundColor == "yellow" ){
        document.getElementById('A').style.backgroundColor = "orange"     
    }
    else{
        document.getElementById('A').style.backgroundColor = "yellow"   
        document.getElementById('C').style.backgroundColor = "orange"
        document.getElementById('B').style.backgroundColor = "orange"
        document.getElementById('D').style.backgroundColor = "orange" 
        this.setState({currentAnswer: "A"})  
    }
} 
changeColor2() {
    if (document.getElementById('B').style.backgroundColor == "yellow" ){
        document.getElementById('B').style.backgroundColor = "orange"     
    }
    else{
        document.getElementById('B').style.backgroundColor = "yellow"  
        document.getElementById('C').style.backgroundColor = "orange"
        document.getElementById('D').style.backgroundColor = "orange"
        document.getElementById('A').style.backgroundColor = "orange"  
        this.setState({currentAnswer: "B"})  
    }
} 

changeColor3() {
    if (document.getElementById('C').style.backgroundColor == "yellow" ){
        document.getElementById('C').style.backgroundColor = "orange"     
    }
    else{
        document.getElementById('C').style.backgroundColor = "yellow" 
        document.getElementById('D').style.backgroundColor = "orange"
        document.getElementById('B').style.backgroundColor = "orange"
        document.getElementById('A').style.backgroundColor = "orange"   
        this.setState({currentAnswer: "C"})  
    }
} 

changeColor4() {
    if (document.getElementById('D').style.backgroundColor == "yellow" ){
        document.getElementById('D').style.backgroundColor = "orange"     
    }
    else{
        document.getElementById('D').style.backgroundColor = "yellow" 
        document.getElementById('C').style.backgroundColor = "orange"
        document.getElementById('B').style.backgroundColor = "orange"
        document.getElementById('A').style.backgroundColor = "orange"  
        this.setState({currentAnswer: "D"})  
    }
}       

isCorrect() {
    if (this.state.currentAnswer == ""){
        document.getElementById('answer').textContent= "Please select an answer!"
    }
    else {
        if (this.state.currentAnswer == this.state.correctAnswer){
            document.getElementById('answer').textContent= "Your answer is correct!"
            document.getElementById(this.state.correctAnswer).style.backgroundColor = "green"
        }
        else {
            document.getElementById('answer').textContent= "Your answer is incorrect. The correct answer is " + this.state.correctAnswer
            document.getElementById(this.state.correctAnswer).style.backgroundColor = "green"
            document.getElementById(this.state.currentAnswer).style.backgroundColor = "red"
        }
    }
}

// QuestionTitle = () => {
//     return (
//         <Box>
//             <Heading>Choose the correct option: </Heading>
//         </Box>
//     )
// }

}