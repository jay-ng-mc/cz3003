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

const QuestionsPage = () => {
    return (
        <Flex minHeight='100vh' width='full' align='center' justifyContent='center'>
            <Box backgroundImage="url('/src/components/Sausage.png')" borderWidth={1} px={1} width='full' maxWidth='500px' borderRadius={4} textAlign='center' boxShadow='lg'>
                <Image src='./Sausage.png'  />
                <ThemeProvider theme={theme} />
                <Box p={2}>
                    <QuestionHeader />
                    <QuestionTitle />
                </Box>
                <Box p={3}>
                    <Stack isInline  spacing='70px' justify='center'>
                        <Box borderWidth = "3px" borderColor = "#000000" as="button" borderRadius="0px" bg="orange" color="black" px={4} h='100px' w='200px'>
                            Answer 1
                        </Box>
                        <Box borderWidth = "3px" borderColor = "#000000" as="button" borderRadius="0px" bg="orange" color="black" px={4} h='100px' w='200px'>
                            Answer 2
                        </Box>
                    </Stack>
                </Box>

                <Box p={3}>
                    <Stack isInline  spacing='70px' >
                        <Box id = "answer3" onClick={changeColor3} borderWidth = "3px" borderColor = "#000000" as="button" borderRadius="0px" bg="orange" color="black" px={4} h='100px' w='200px'>
                            Answer 3
                        </Box>
                        <Box borderWidth = "3px" borderColor = "#000000" as="button" borderRadius="0px" bg="orange" color="black" px={4} h='100px' w='200px' >
                            Answer 4
                        </Box>
                    </Stack>
                </Box>

                <Box onClick= {isCorrect} as="button" borderRadius="10px" bg="tomato" color="yellow" px={4}>
                    Confirm
                </Box>

                <h3 id="answer"> </h3>

            </Box>
        </Flex>
    );
}

function changeColor3() {
    if (document.getElementById('answer3').style.backgroundColor == "red" ){
        document.getElementById('answer3').style.backgroundColor = "orange"     
    }
    else{
        document.getElementById('answer3').style.backgroundColor = "red"     
    }
}       

function isCorrect() {
    if (true){
        document.getElementById('answer').textContent= "The answer is correct"
    }
    else {
        document.getElementById('answer').textContent= "The answer is incorrect"
    }
}
const QuestionHeader = () => {
    return (
        <Box textAlign='center'>
            <Heading>Question: </Heading>
        </Box>
    )
}

const QuestionTitle = () => {
    return (
        <Box>
            <Heading>Choose the correct option: </Heading>
        </Box>
    )
}