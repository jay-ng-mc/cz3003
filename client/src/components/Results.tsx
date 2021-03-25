import React from "react";
import { Link, Button, Stack, Flex, Heading, Box, ThemeProvider, theme, CSSReset, propNames } from "@chakra-ui/react";
import { BiHome } from 'react-icons/bi';
import NextLink from "next/link";
//import Questions from "./Questions";


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
        <Flex minHeight='100vh' width='full' align='center' justifyContent='center'>
            <Box borderWidth={1} px={1} width='full' maxWidth='400px' borderRadius={4} textAlign='center' boxShadow='lg'>
                <ThemeProvider theme={theme} />
                <Box p={2}>
                    <ResultsHeader />
                    <PlayerResult />
                </Box>
            </Box>
        </Flex>
    );
}

const ResultsHeader = () => {
    return (
        <Box marginBottom={5} textAlign='center'>
            <Heading>Final Game Results</Heading>
        </Box>
    )
}

var PlayerBase = [
    { name: 'John', asked: '10', correct: '6' },
    { name: 'Nick', asked: '11', correct: '1' },
    { name: 'Tom', asked: '12', correct: '11' }];

export const getCurrPlayer = (playername) => {
    const currPlayer = playername;

    return (currPlayer)
}

const getPlayerResult = () => {

    return (
        <div>
            {PlayerBase.map((player, index) => (
                <div key={index}>
                    <Box textAlign='left'>{player.name}</Box>
                    <Stack isInline justifyContent='space-between' mt={0}>
                        <Box>Total questions asked:</Box>
                        <Box>{player.asked}</Box>
                    </Stack>

                    <Stack isInline justifyContent='space-between' mt={0}>
                        <Box>Total questions correctly answered:</Box>
                        <Box>{player.correct}</Box>
                    </Stack>

                    {/* <Button backgroundColor='orange' borderRadius="md" color="black" borderWidth={2} borderStyle="solid" borderColor="black" px={4} h={8}>
                        Display questions
                    </Button> */}

                    <NextLink href={"/Questions"}>
                        <Link as={Button} backgroundColor='orange' borderRadius="md" color="black" borderWidth={2} borderStyle="solid" borderColor="black" px={4} h={8} mr={2}>Display questions</Link>
                    </NextLink>
                </div>
            ))}
            <Stack marginTop={5} justifyContent='space-between' direction='row'>
                <Button backgroundColor='orange' borderRadius="md" color="black" borderWidth={2} borderStyle="solid" borderColor="black">
                    Display Leaderboard
                </Button>

                <Button backgroundColor='orange' borderRadius="md" color="black" borderWidth={2} borderStyle="solid" borderColor="black" leftIcon={<BiHome />}>
                    Return Home
                </Button>
            </Stack>
        </div>
    );
}

const PlayerResult = () => {
    var p_result = getPlayerResult()

    return (
        <Box fontSize='medium' fontWeight='semibold'>
            {p_result}
        </Box>
    )
}

export default Results;