import React from "react";
import {ThemeProvider, theme, CSSReset, Flex, Box, Image, Heading, HStack, Stack} from "@chakra-ui/react";

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
                        <Box borderWidth = "3px" borderColor = "#000000" as="button" borderRadius="0px" bg="orange" color="black" px={4} h='100px' w='200px'>
                            Answer 3
                        </Box>
                        <Box borderWidth = "3px" borderColor = "#000000" as="button" borderRadius="0px" bg="orange" color="black" px={4} h='100px' w='200px' 
                              _active={{
                                bg: "#dddfe2",
                                transform: "scale(0.98)",
                                borderColor: "#bec3c9",
                              }}>
                            Answer 4
                        </Box>
                    </Stack>
                </Box>

                <Box as="button" borderRadius="10px" bg="tomato" color="yellow" px={4}>
                    Confirm
                </Box>
            </Box>


        </Flex>
    );
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