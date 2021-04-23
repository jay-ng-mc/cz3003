import React from "react";
import {ThemeProvider, theme, CSSReset, Flex, Box, Image, Heading, HStack, Stack, Button} from "@chakra-ui/react";
import ReactDOM from 'react-dom';
import { GetQuestionQuery, Question, useGetAllQuestionQuery, GetAllQuestionQuery } from "../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Questions = (props)  => {
    const [{data}] = useGetAllQuestionQuery({
        variables: {
            type: "topic 1",
            difficulty: 1,
        }
    })
    const questionBank = data;
    const questionId = Math.floor(props.random*questionBank?.getAllQuestion.length)
    console.log(questionBank)
    console.log("Data:" + questionId); 

    return (
        <ThemeProvider theme={theme}>
            <CSSReset />
            <QuestionsPage 
                questionBank={questionBank} questionId={questionId}
                closePopup={props.closePopup} answerQuestion={props.answerQuestion}
                updateQuestion={props.updateQuestion}
            />
        </ThemeProvider>
    );
}

const AnswerStyle = {
    borderWidth: "3px", 
    borderColor:  "#000000",
    borderRadius: "0px",
    backgroundColor: "orange",
    color: "black",
    height: '100px',
    width: '190px',
}

class QuestionsPage extends React.Component <{questionBank, questionId, closePopup, answerQuestion, updateQuestion}, { [key: string]: any }>{
    constructor(props) {
        super(props);
        this.state = {
            currentAnswer: "",
            correctAnswer: this.props.questionBank?.getAllQuestion[this.props.questionId].correctAnswer.toUpperCase(),
            answeredQuestion: false
        };
        this.isCorrect = this.isCorrect.bind(this);
        this.changeColor1 = this.changeColor1.bind(this);
        this.changeColor2 = this.changeColor2.bind(this);
        this.changeColor3 = this.changeColor3.bind(this);
        this.changeColor4 = this.changeColor4.bind(this);
    }

    componentDidUpdate() {
        console.log(this.props)
        console.log(this.state)
        if (this.state.correctAnswer != this.props.questionBank?.getAllQuestion[this.props.questionId].correctAnswer.toUpperCase()) {
            this.setState({
                ...this.state,
                correctAnswer: this.props.questionBank?.getAllQuestion[this.props.questionId].correctAnswer.toUpperCase()
            })
        }
    }

    render() {
        return (
            <Flex minHeight='100vh' width='full' align='center' justifyContent='center'>
                <Box borderWidth={1} px={1} width='full' borderRadius={4} textAlign='center' boxShadow='lg'  bgColor='white' alignItems='center'>
                    <ThemeProvider theme={theme} />
                    
                    <Box w='60vw' h='120px' bgImage="url('/images/sausage.png')" bgRepeat='no-repeat' bgPosition='center' bgSize='55vw 120px' p={2}>
                        <Box textAlign='center'>
                            <Heading>Question {this.props.questionId + 1} </Heading>
                        </Box>                    
                        <Box maxW='45vw' mr='auto' ml='auto'>
                            <Heading size='md'>
                                {this.props.questionBank?.getAllQuestion[this.props.questionId].questionTitle}
                            </Heading>
                        </Box>
                    </Box>
                    
                    <Box p={3}>
                        <Stack isInline spacing='10px' justify='center'>
                            <h2> A </h2>
                            <Box id = "A" onClick={this.changeColor1} style={AnswerStyle}  as="button" mr="40px">
                                {this.props.questionBank?.getAllQuestion[this.props.questionId].A}
                            </Box>
                            <h2> B </h2>
                            <Box id = "B" onClick={this.changeColor2} style={AnswerStyle}  as="button">
                                {this.props.questionBank?.getAllQuestion[this.props.questionId].B}
                            </Box>
                        </Stack>
                    </Box>

                    <Box p={3}>
                        <Stack isInline spacing='10px' justify='center'>
                            <h2> C </h2>
                            <Box id = "C" onClick={this.changeColor3} style={AnswerStyle} as="button" mr="40px" >
                                {this.props.questionBank?.getAllQuestion[this.props.questionId].C}
                            </Box>
                            <h2> D </h2>
                            <Box id = "D" onClick={this.changeColor4} style={AnswerStyle} as="button" >
                                {this.props.questionBank?.getAllQuestion[this.props.questionId].D}
                            </Box>
                        </Stack>
                    </Box>
                    
                    {this.state.answeredQuestion ? 
                    <Box onClick= {this.props.closePopup} as="button" borderRadius="10px" bg="tomato" color="yellow" px={4}>
                        Next
                    </Box>
                    :
                    <Box onClick= {this.isCorrect} as="button" borderRadius="10px" bg="tomato" color="yellow" px={4}>
                        Confirm
                    </Box>
                    }

                    <h3> Your answer is {this.state.currentAnswer} </h3>

                    <h3 id="answer"></h3>
                </Box>
            </Flex>
        )
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
            this.props.updateQuestion(this.props.questionId, this.state.correctAnswer, this.state.currentAnswer)
            if (this.state.currentAnswer == this.state.correctAnswer){
                document.getElementById('answer').textContent= "Your answer is correct!"
                document.getElementById(this.state.correctAnswer).style.backgroundColor = "green"
                this.props.answerQuestion(true) //correct
            }
            else {
                document.getElementById('answer').textContent= "Your answer is incorrect. The correct answer is " + this.state.correctAnswer
                document.getElementById(this.state.correctAnswer).style.backgroundColor = "green"
                document.getElementById(this.state.currentAnswer).style.backgroundColor = "red"
                this.props.answerQuestion(false) //incorrect
            }

            this.setState({
                ...this.state,
                answeredQuestion: true
            })
        }
    }

}

export default withUrqlClient(createUrqlClient) (Questions);