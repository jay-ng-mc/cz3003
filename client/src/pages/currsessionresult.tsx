import React from "react";
import { Flex, Heading, Box, ThemeProvider, theme, CSSReset } from "@chakra-ui/react";
import PlayerResult from '../components/CurrentResults';
import { useLocation } from "react-router-dom";


export const Results = () => {
    return (
        <ThemeProvider theme={theme}>
            <CSSReset />
            <ResultsPage />
        </ThemeProvider>
    );
}

const ResultsPage = () => {
    return (
        <Flex minHeight='100vh' width='full' align='center' justifyContent='center' bgImage="url('/images/result_sausages.png')" bgRepeat='no-repeat' bgPosition='center' bgSize='contain'>
            <Box px={1} width='full' maxWidth='350px' maxHeight='500px' height='full' textAlign='center'>
                <ThemeProvider theme={theme} />
                <Box p={2}>
                    <ResultsHeader />
                    <PlayerResult/>
                </Box>
            </Box>
        </Flex>
    );
}

const ResultsHeader = () => {
    return (
        <Box marginBottom={5} textAlign='center'>
            <Heading color='black'>Final Game Results</Heading>
        </Box>
    )
}

export default Results;