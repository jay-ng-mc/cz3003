import React from "react";
import { Flex, Link, Button, Stack, Box } from "@chakra-ui/react";
import { BiHome } from 'react-icons/bi';
import NextLink from "next/link";

var currentPlayers = ['john', 'tom', 'brad', 'jake'];

export const getPlayerResult = () => {
    return (
        <div>
            <div style={{overflowY:"scroll", height:"375px"}}>
                {currentPlayers.map((player, index) => (
                    <div key={index}>
                        <Box textColor='black' textAlign='left'>Player name: {player}</Box>
                        <Stack isInline justifyContent='space-between' mt={0}>
                            <Box textColor='black'>Total questions asked:</Box>
                            {/*display number of questions asked in current game*/}
                            <Box textColor='black'>{player/*.getQuestionsAsked*/}</Box>
                        </Stack>

                        <Stack isInline justifyContent='space-between' mt={0}>
                            <Box textColor='black'>Total questions correctly answered:</Box>
                            {/*display number of questions correct in current game*/}
                            <Box textColor='black'>{player/*.getQuestionsCorrect*/}</Box>
                        </Stack>

                        <NextLink href={{pathname: '/currdisplayqnresult', query: {data: player}}}>
                            <Link as={Button} backgroundColor='orange' borderRadius="md" color="black" borderWidth={2} borderStyle="solid" borderColor="black" fontSize='large' marginBottom={2} px={4} h={8} mr={2}>Display questions</Link>
                        </NextLink>
                    </div>
                ))}
            </div>
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

export default PlayerResult;