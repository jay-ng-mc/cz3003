import React from "react";
import { Link, Button, Stack, Flex, Heading, Box, ThemeProvider, theme, ColorModeProvider, CSSReset } from "@chakra-ui/react";
import NextLink from 'next/link';

const QuestionResults = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    var foo = params.get("data");
    var dis = DisQns(foo)
    return (
        <div>
            <div style={{overflowY:"scroll", height:"375px"}}>
                <Box fontSize='medium' fontWeight='semibold'>
                    {dis}
                </Box>
            </div>
                <NextLink href={'/currsessionresult'}>
                    <Link as={Button} backgroundColor='orange' borderRadius="md" color="black" borderWidth={2} borderStyle="solid" borderColor="black" fontSize='large' margin={2} px={4} h={8} mr={2}>Back to Results Page</Link>
                </NextLink>
        </div>
    )
}

function DisQns(currname) {
    return (
        <div>
            {QuestionBank.map((person, index) => {
                if (person.Name == currname) {
                    return (
                        <div key={index}>
                            <Box>
                                Questions asked for {person.Name}
                            </Box>
                            <Box>
                                Questions correctly answered:
                            </Box>
                            <div>{person.Correct.map((Cqn, i) => (
                                    <div key={i}>
                                        <Box marginBottom={2} marginTop={2} fontSize='small' textAlign='left'>
                                            {Cqn.Qns}
                                        </Box>
                                        <Box textAlign='left'>
                                            Your Answer: {Cqn.Ans}
                                        </Box>
                                    </div>
                                ))}
                            </div>
                            <Box marginBottom={5} marginTop={5}>
                                Questions incorrectly answered:
                            </Box>
                            <div>{person.Incorrect.map((Iqn, j) => (
                                <div key={j}>
                                    <Box marginBottom={2} marginTop={2} fontSize='small' textAlign='left'>
                                        {Iqn.Qns}
                                    </Box>
                                    <Box textAlign='left'>
                                        Your Answer: {Iqn.Yans}
                                    </Box>
                                    <Box textAlign='left'>
                                        Correct Answer: {Iqn.Cans}
                                    </Box>
                                    </div>
                                ))}
                                </div>
                            </div>
                        )
                    }
                }
                )}
            </div>
        )
    }

const QuestionBank = [
    {
        Name: 'john',
        Correct: [{Qns: 'true?', Ans: 'yes'},
                    {Qns: 'false?', Ans: 'no'},
                    {Qns: 'false?', Ans: 'yes'}],
        Incorrect: [{Qns: 'false?', Yans: 'no', Cans: 'yes'},
                    {Qns: 'true?', Yans: 'yes', Cans: 'no'},
                    {Qns: 'false?', Yans: 'no', Cans: 'yes'}]
    }
]

export default QuestionResults;