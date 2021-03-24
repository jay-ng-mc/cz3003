import React from "react";
import {ThemeProvider, theme, CSSReset, Flex, Box, IconButton, HStack, VStack, Button, Editable, EditableInput, EditablePreview, ButtonGroup, Image, Center } from "@chakra-ui/react";

const welcome = "Welcome to the sausage shop! Click on an item to purchase!"
const doublePower = "This item can be used before the start of the turn. The next dice roll will be doubled, and you can move twice the number of spaces!"
const halfAndPuff = "This item can be used before the start of the turn. For the next question, the number of options will be halved."

const shopSign = "https://www.dropbox.com/s/07q4i3sibqhdkwb/shopSign.png?dl=1"
const itemDesc = "https://www.dropbox.com/s/97vbnhmtdmjcl9t/itemDesc.png?dl=1"
const item1 = "https://www.dropbox.com/s/yj462pb1r5ehi29/doubleItem.png?dl=1"
const item2 = "https://www.dropbox.com/s/ukk2auz745nhkxg/halfItem.png?dl=1"
const item1Sel = "https://www.dropbox.com/s/nn0oqrt0b6x7iwx/item1sel.png?dl=1"
const item2Sel = "https://www.dropbox.com/s/5n31ou5lyfpou76/item2sel.png?dl=1"
const buy = "https://www.dropbox.com/s/49rkwb9zb2pyzvs/buy.png?dl=1"
const exit = "https://www.dropbox.com/s/ah2uydxm8vcurf4/exitImg.png?dl=1"

const Shop = () => {
    return (
        <ThemeProvider theme={theme}>
            <CSSReset />
            <ShopPage />
        </ThemeProvider>
    );
}

const ShopPage = () => {
    return (
        <Flex maxHeight='150vh' width='full' align='center' justifyContent='center'>
            <Box borderWidth={1} px={4} width='full' maxWidth='300vh' borderRadius={4} textAlign='center' boxShadow='lg'>
                <ThemeProvider theme={theme} />
                <VStack p={4}>
                    <ShopSign />
                    <Items />
                    <ItemDesc />
                    <BuyOrExit />
                </VStack>
            </Box>
        </Flex>
    );
}

const ShopSign = () => {
    return (
        <Center>
            <Image 
                src={shopSign}
                alt="Shop Sign"
            />
        </Center>
    );
}


const Items = () => {
    return (
        <Center>
            <HStack>
                <Image 
                    src={item1}
                    alt="Double Power"
                    onclick={selectItem1}
                />
                <Image 
                    src={item2}
                    alt="Half and Puff"
                    onclick={selectItem2}
                />
            </HStack>
        </Center>
    )
}

const ItemDesc = () => {
    return (
        <Center>
            <Image 
                src={itemDesc}
                alt="Item Description Background"
            />
        </Center>
    )
}

const BuyOrExit = () => {
    return (
        <Center>
            <HStack>
                <Image 
                    src={exit}
                    alt="Exit"
                />
                <Image 
                    src={buy}
                    alt="Buy"
                />
            </HStack>
        </Center>
    )
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function selectItem1() {
    return(
        <Box>Hello1</Box>
    );
}

function selectItem2() {
    return(
        <Box>Hello2</Box>
    );
}



export default Shop