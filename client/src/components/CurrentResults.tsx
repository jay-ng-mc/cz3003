import React from "react";
import { Flex, Link, Button, Stack, Box, propNames, ThemeProvider, theme, Heading, Spacer,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, 
    useDisclosure} from "@chakra-ui/react";
import { BiHome } from 'react-icons/bi';
import NextLink from "next/link";
import { useGetAllQuestionQuery } from "../generated/graphql";

export const getPlayerResult = (props) => {

    const [{data}] = useGetAllQuestionQuery({
        variables: {
            type: "Sausage",
            difficulty: 1,
        }
    })
    const questionBank = data;

    return (
        <div>
            <div style={{overflowY:"scroll", height:"375px"}}>
                {props.gameState.users.map((player, index) => (
                    <div key={index}>
                        <Box textColor='black' textAlign='left'>Player name: {player}</Box>
                        <Stack isInline justifyContent='space-between' mt={0}>
                            <Box textColor='black'>Total questions asked:</Box>
                            <Box textColor='black'>{props.gameState.results[index].correctAnswer.length+props.gameState.results[index].wrongAnswer.length + "  "}</Box>
                            <Spacer />
                        </Stack>

                        <Stack isInline justifyContent='space-between' mt={0}>
                            <Box textColor='black'>Total questions correctly answered:</Box>
                            <Box textColor='black'>{props.gameState.results[index].correctAnswer.length + "   "}</Box>
                            <Spacer />
                        </Stack>

                        <div className="App">
                        <CustomModal
                            PlayerNo = {index}
                            props = {props}
                            questionBank = {questionBank}
                        />
                        </div>
                    </div>
                ))}
            </div>
            <Stack marginTop={5} justifyContent='space-between' direction='row'>
                <NextLink href={'/leaderboard'}>
                    <Link as={Button} backgroundColor='orange' borderRadius="md" color="black" borderWidth={2} borderStyle="solid" borderColor="black">
                        Display Leaderboard
                    </Link>
                </NextLink>
                <NextLink href={'/'}>
                    <Link as={Button} backgroundColor='orange' borderRadius="md" color="black" borderWidth={2} borderStyle="solid" borderColor="black" leftIcon={<BiHome />}>
                        Return Home
                    </Link>
                </NextLink>
            </Stack>
        </div>
    );
}
//{}

const CustomModal = ({PlayerNo ,props, questionBank}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
      <>
        <Button onClick={onOpen}>
          Display Question
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Player {PlayerNo + 1}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <div style={{overflowY:"scroll", height:"375px"}}>
                {DisplayCorrectResults(PlayerNo, props, questionBank)}
                {DisplayIncorrectResults(PlayerNo, props, questionBank)}
                </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Exit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };

const PlayerResult = (props) => {
    console.log(props)
    var p_result = getPlayerResult(props)

    return (
        <Flex minHeight='100vh' width='full' align='center' justifyContent='center' bgImage="url('/images/SausageBoard.jpeg')" bgRepeat='no-repeat' bgPosition='center' bgSize='fill'>
            <Box px={1} width='full' maxWidth='350px' maxHeight='500px' height='full' textAlign='center'>
                <ThemeProvider theme={theme} />
                <Box p={2}>
                    <ResultsHeader />
                    <Box fontSize='medium' fontWeight='semibold'>
                        {p_result}
                    </Box>
                </Box>
            </Box>
        </Flex>

    )
}

const ResultsHeader = () => {
    return (
        <Box marginBottom={5} textAlign='center'>
            <Heading color='black'>Final Game Results</Heading>
        </Box>
    )
}

const DisplayCorrectResults = (playerNo, props, questionBank) => {
    return (
        <div>
                <Box textColor='black' textAlign='left'>{props.gameState.users[playerNo]}</Box>
                <Box textColor='black'>Correct Answers</Box>
                {props.gameState.results[playerNo].correctAnswer.map((question, index) => {
                    if (question[1] == "A"){
                    return <div key={index}>
                            <Box textColor='black'>Question: </Box>
                            <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].questionTitle}</Box>
                            <Box textColor='black'>Correct Answer: </Box>
                            <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].A}</Box>
                            <Spacer />
                    </div>
                    }
                    if (question[1] == "B"){
                        return <div key={index}>
                                <Box textColor='black'>Question: </Box>
                                <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].questionTitle}</Box>
                                <Box textColor='black'>Correct Answer: </Box>
                                <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].B}</Box>
                                <Spacer />
                        </div>
                        }
                    if (question[1] == "C"){
                        return <div key={index}>
                                <Box textColor='black'>Question: </Box>
                                <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].questionTitle}</Box>
                                <Box textColor='black'>Correct Answer: </Box>
                                <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].C}</Box>
                                <Spacer />
                        </div>
                        }
                    if (question[1] == "D"){
                        return <div key={index}>
                                <Box textColor='black'>Question: </Box>
                                <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].questionTitle}</Box>
                                <Box textColor='black'>Correct Answer: </Box>
                                <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].D}</Box>
                                <Spacer />
                        </div>
                        }
                })}
        </div>
    )
}

//[1] is correct Answe [2] is given answer

const DisplayIncorrectResults = (playerNo, props, questionBank) => {
    return (
        <div>
                <Box textColor='black'>Inorrect Answers</Box>
                {props.gameState.results[playerNo].wrongAnswer.map((question, index) => {
                    if (question[1] == "A" && question[2] == "B"){
                    return <div key={index}>
                            <Box textColor='black'>Question: </Box>
                            <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].questionTitle}</Box>
                            <Box textColor='black'>Given Answer: </Box>
                            <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].B}</Box>
                            <Box textColor='black'>Correct Answer: </Box>
                            <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].A}</Box>
                            <Spacer />
                    </div>
                    }
                    if (question[1] == "A" && question[2] == "C"){
                        return <div key={index}>
                                <Box textColor='black'>Question: </Box>
                                <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].questionTitle}</Box>
                                <Box textColor='black'>Given Answer: </Box>
                                <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].C}</Box>
                                <Box textColor='black'>Correct Answer: </Box>
                                <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].A}</Box>
                                <Spacer />
                        </div>
                    }
                    if (question[1] == "A" && question[2] == "D"){
                        return <div key={index}>
                                <Box textColor='black'>Question: </Box>
                                <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].questionTitle}</Box>
                                <Box textColor='black'>Given Answer: </Box>
                                <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].D}</Box>
                                <Box textColor='black'>Correct Answer: </Box>
                                <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].A}</Box>
                                <Spacer />
                        </div>
                    }
                    if (question[1] == "B" && question[2] == "A"){
                        return <div key={index}>
                                <Box textColor='black'>Question: </Box>
                                <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].questionTitle}</Box>
                                <Box textColor='black'>Given Answer: </Box>
                                <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].A}</Box>
                                <Box textColor='black'>Correct Answer: </Box>
                                <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].B}</Box>
                                <Spacer />
                        </div>
                    }
                    if (question[1] == "B" && question[2] == "C"){
                        return <div key={index}>
                                <Box textColor='black'>Question: </Box>
                                <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].questionTitle}</Box>
                                <Box textColor='black'>Given Answer: </Box>
                                <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].C}</Box>
                                <Box textColor='black'>Correct Answer: </Box>
                                <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].B}</Box>
                                <Spacer />
                        </div>
                    }
                    if (question[1] == "B" && question[2] == "D"){
                        return <div key={index}>
                                <Box textColor='black'>Question: </Box>
                                <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].questionTitle}</Box>
                                <Box textColor='black'>Given Answer: </Box>
                                <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].D}</Box>
                                <Box textColor='black'>Correct Answer: </Box>
                                <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].B}</Box>
                                <Spacer />
                        </div>
                    }
                    if (question[1] == "C" && question[2] == "A"){
                        return <div key={index}>
                                <Box textColor='black'>Question: </Box>
                                <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].questionTitle}</Box>
                                <Box textColor='black'>Given Answer: </Box>
                                <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].A}</Box>
                                <Box textColor='black'>Correct Answer: </Box>
                                <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].C}</Box>
                                <Spacer />
                        </div>
                    }
                    if (question[1] == "C" && question[2] == "B"){
                        return <div key={index}>
                                <Box textColor='black'>Question: </Box>
                                <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].questionTitle}</Box>
                                <Box textColor='black'>Given Answer: </Box>
                                <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].B}</Box>
                                <Box textColor='black'>Correct Answer: </Box>
                                <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].C}</Box>
                                <Spacer />
                        </div>
                    }
                    if (question[1] == "C" && question[2] == "D"){
                        return <div key={index}>
                                <Box textColor='black'>Question: </Box>
                                <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].questionTitle}</Box>
                                <Box textColor='black'>Given Answer: </Box>
                                <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].D}</Box>
                                <Box textColor='black'>Correct Answer: </Box>
                                <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].C}</Box>
                                <Spacer />
                        </div>
                    }
                    if (question[1] == "D" && question[2] == "A"){
                        return <div key={index}>
                                <Box textColor='black'>Question: </Box>
                                <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].questionTitle}</Box>
                                <Box textColor='black'>Given Answer: </Box>
                                <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].A}</Box>
                                <Box textColor='black'>Correct Answer: </Box>
                                <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].D}</Box>
                                <Spacer />
                        </div>
                    }
                    if (question[1] == "D" && question[2] == "B"){
                        return <div key={index}>
                                <Box textColor='black'>Question: </Box>
                                <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].questionTitle}</Box>
                                <Box textColor='black'>Given Answer: </Box>
                                <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].B}</Box>
                                <Box textColor='black'>Correct Answer: </Box>
                                <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].D}</Box>
                                <Spacer />
                        </div>
                    }
                    if (question[1] == "D" && question[2] == "C"){
                        return <div key={index}>
                                <Box textColor='black'>Question: </Box>
                                <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].questionTitle}</Box>
                                <Box textColor='black'>Given Answer: </Box>
                                <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].C}</Box>
                                <Box textColor='black'>Correct Answer: </Box>
                                <Box textColor='black'>{questionBank?.getAllQuestion[question[0]].D}</Box>
                                <Spacer />
                        </div>
                    }
                })}
        </div>
    )
}


export default PlayerResult;