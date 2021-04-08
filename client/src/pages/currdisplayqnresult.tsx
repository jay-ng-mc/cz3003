import React from "react";
import { Link, Button, Stack, Flex, Heading, Box, ThemeProvider, theme, ColorModeProvider, CSSReset } from "@chakra-ui/react"
import QuestionResults from '../components/Questions';


export const Questions = () => {
    return (
        <ThemeProvider theme={theme}>
            <CSSReset />
            <QuestionPage />
        </ThemeProvider>
    );
}

const QuestionPage = () => {
    return (
        <Flex minHeight='100vh' width='full' align='center' justifyContent='center' bgImage="url('/images/result_sausages.png')" bgRepeat='no-repeat' bgPosition='center' bgSize='contain'>
            <Box px={1} width='full' maxWidth='350px' maxHeight='500px' textAlign='center'>
                <ThemeProvider theme={theme} />
                <Box p={2}>
                    <QuestionHeader />
                    <QuestionResults />
                </Box>
            </Box>
        </Flex>
    );
}

const QuestionHeader = () => {
    return (
        <Box marginBottom={5} textAlign='center'>
            <Heading>Your Questions</Heading>
        </Box>
    )
}

export default Questions;
