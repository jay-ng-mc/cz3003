import {ThemeProvider, theme, CSSReset, Flex, Box, IconButton, Link, Button, Image, HStack, Input, FormControl, FormLabel, FormErrorMessage, FormHelperText, RadioGroup, Radio} from "@chakra-ui/react";
import { SettingsIcon } from '@chakra-ui/icons'
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
  } from "@chakra-ui/react"

const Home = () => {
    return (
        <div>
            <ThemeProvider theme={theme}>
                <CSSReset />
                <HomePage />
            </ThemeProvider> 
        </div>
    );
}

const HomePage = () => {
    return (
        <Flex minHeight='100vh' width='full' align='center' justifyContent='center'>
            <Box borderWidth={1} px={4} width='full' maxWidth='300px' borderRadius={4} textAlign='center' boxShadow='lg'>
                <ThemeProvider theme={theme} />
                <Box p={4}>
                    <CharacterIcon />
                    <Header />
                    <HomeBox />
                </Box>
            </Box>
        </Flex>
    );
}

const CharacterIcon = () => {
    return (
        <Box my={3} textAlign='right'>
        <IconButton 
        aria-label="Change Character"
        isRound={true} 
        icon={<SettingsIcon />}
        size='lg'/>
        </Box>
    )
}

const Header = () => {
    return (
        <Box textAlign='center'>
            <Image
            borderRadius="full"
            src={"images\\Title screen.png"}
            alt="Avatar"
            img id="Avatar"
            />
        </Box>
    )
}

const HomeBox = () => {
    return (
        <Box my={5} textAlign='left'>
            <form>
                <Button width='full' mt={5}>Start Game Lobby</Button>
            </form>
        </Box>
    )
}


export default Home