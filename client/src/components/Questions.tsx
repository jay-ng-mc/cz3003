import React from "react";
import {ThemeProvider, theme, CSSReset, Flex, Box, Image, Heading, HStack, Stack, Button} from "@chakra-ui/react";
import ReactDOM from 'react-dom';

export const Questions = () => {
    return (
        <ThemeProvider theme={theme}>
            <CSSReset />
            <QuestionsPage />
        </ThemeProvider>
    );
}

class QuestionsPage extends React.Component <{}, { [key: string]: string }>{
    constructor(props) {
        super(props);
        this.state = {currentAnswer: "",
                    correctAnswer: "B"
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
                {/* <Image src='./Sausage.png'  /> */}
                <ThemeProvider theme={theme} />
                <Box p={2}>
                    <this.QuestionHeader />
                    <this.QuestionTitle />
                </Box>
                <Box p={3}>
                    <Stack isInline  spacing='10px'>
                        <h2> A </h2>
                        <Box id = "answer1" onClick={this.changeColor1} mr="40px" borderWidth = "3px" borderColor = "#000000" as="button" borderRadius="0px" bg="orange" color="black" px={4} h='100px' w='190px'>
                            Answer 1
                        </Box>
                        <h2> B </h2>
                        <Box id = "answer2" onClick={this.changeColor2} borderWidth = "3px" borderColor = "#000000" as="button" borderRadius="0px" bg="orange" color="black" px={4} h='100px' w='190px'>
                            Answer 2
                        </Box>
                    </Stack>
                </Box>

                <Box p={3}>
                    <Stack isInline  spacing='10px' >
                        <h2> C </h2>
                        <Box id = "answer3" onClick={this.changeColor3} mr="40px" borderWidth = "3px" borderColor = "#000000" as="button" borderRadius="0px" bg="orange" color="black" px={4} h='100px' w='190px'>
                            Answer 3
                        </Box>
                        <h2> D </h2>
                        <Box id = "answer4" onClick={this.changeColor4} borderWidth = "3px" borderColor = "#000000" as="button" borderRadius="0px" bg="orange" color="black" px={4} h='100px' w='190px' >
                            Answer 4
                        </Box>
                    </Stack>
                </Box>

                <Box onClick= {this.isCorrect} as="button" borderRadius="10px" bg="tomato" color="yellow" px={4}>
                    Confirm
                </Box>

                <h3> Your current answer is {this.state.currentAnswer} </h3>

                <h3 id="answer"></h3>

            </Box>
        </Flex>
    );
}

changeColor1() {
    if (document.getElementById('answer1').style.backgroundColor == "red" ){
        document.getElementById('answer1').style.backgroundColor = "orange"     
    }
    else{
        document.getElementById('answer1').style.backgroundColor = "red"   
        this.setState({currentAnswer: "A"})  
    }
} 
changeColor2() {
    if (document.getElementById('answer2').style.backgroundColor == "red" ){
        document.getElementById('answer2').style.backgroundColor = "orange"     
    }
    else{
        document.getElementById('answer2').style.backgroundColor = "red"   
        this.setState({currentAnswer: "B"})  
    }
} 

changeColor3() {
    if (document.getElementById('answer3').style.backgroundColor == "red" ){
        document.getElementById('answer3').style.backgroundColor = "orange"     
    }
    else{
        document.getElementById('answer3').style.backgroundColor = "red"   
        this.setState({currentAnswer: "C"})  
    }
} 

changeColor4() {
    if (document.getElementById('answer4').style.backgroundColor == "red" ){
        document.getElementById('answer4').style.backgroundColor = "orange"     
    }
    else{
        document.getElementById('answer4').style.backgroundColor = "red"   
        this.setState({currentAnswer: "D"})  
    }
}       

isCorrect( ) {
    if (this.state.currentAnswer == this.state.correctAnswer){
        document.getElementById('answer').textContent= "The answer is correct"
    }
    else {
        document.getElementById('answer').textContent= "The answer is incorrect"
    }
}
QuestionHeader = () => {
    return (
        <Box textAlign='center'>
            <Heading>Question: </Heading>
        </Box>
    )
}

QuestionTitle = () => {
    return (
        <Box>
            <Heading>Choose the correct option: </Heading>
        </Box>
    )
}


}