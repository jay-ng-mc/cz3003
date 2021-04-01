import { Container } from '../components/Container'
import React from "react";
import {ThemeProvider, theme, Heading, Flex, Box, Stack, Image, Center } from "@chakra-ui/react";

const welcome = "Welcome to the sausage shop! Click on an item to purchase!"
const ketchupDesc = "KETCHUP: This item can be used before the start of the turn. For the next question, the number of options will be halved."
const mustardDesc = "MUSTARD: This item can be used at any time. You will be able to steal coins from another player!"

const shopSign = "https://www.dropbox.com/s/07q4i3sibqhdkwb/shopSign.png?dl=1"
const itemDescBg = "https://www.dropbox.com/s/aa4zvr4eprdnb84/SausageTransparent.png?dl=1"
const ketchup = "https://www.dropbox.com/s/f7i0e92xizp74xo/KetchupBottleTransparent.png?dl=1"
const mustard = "https://www.dropbox.com/s/ubtqqsgtw1jxxnm/Mustard.png?dl=1"

const BuyOrExitStyle = {
    borderWidth: "3px", 
    borderColor:  "#000000",
    borderRadius: "0px",
    backgroundColor: "orange",
    color: "black",
    height: '50px',
    width: '200px',
}

class ShopPage extends React.Component <{}, { [key: string]: string }> {
    constructor(props) {
        super(props);
        this.state = {currentSelection: "welcome"};
 
        this.selectKetchup = this.selectKetchup.bind(this);
        this.selectMustard = this.selectMustard.bind(this);
    }

    render() {
        return (
            <Container height="100vh">
                <Flex minHeight='100vh' width='full' align='center' justifyContent='center'>
                    <Box borderWidth={1} px={1} width='full' maxWidth='500px' borderRadius={4} textAlign='center' boxShadow='lg'>
                        
                        <ThemeProvider theme={theme} />


                        <Box h='100px' >
                            <Center>
                                <Image 
                                    src={shopSign} 
                                    alt='Shop Sign' 
                                />
                            </Center> 
                        </Box>

                    
                        <Box h='200px' >
                            <Stack isInline >

                                <Box  
                                    onClick={this.selectKetchup} 
                                    as="button"
                                >
                                    <Image 
                                        src={ketchup} 
                                        alt='Ketchup'
                                    />
                                </Box>

                                <Box  
                                    onClick={this.selectMustard} 
                                    as="button"
                                >
                                    <Image 
                                        src={mustard} 
                                        alt='Mustard' 
                                    />
                                </Box>

                                </Stack>
                        </Box>

                
                        <Box 
                            h='230px' 
                            bgImage="url('/images/shop/itemDescBg.png')" 
                            bgRepeat='no-repeat' 
                            bgPosition='center' 
                            bgSize='contain'
                            textAlign='center' 
                        >
 
                                <Heading 
                                    size='md'
                                    pt='20'
                                    pl='10'
                                    pr='10'
                                >
                                    {this.displayInfo()}
                                </Heading>
                  
                        </Box>
                        

                       
                        <Box p={3}>
                            <Stack isInline spacing='10px'>
                                <Box id = "Exit" onClick={this.exitShop} style={BuyOrExitStyle}  as="button" mr='40px'>
                                    <Heading>Exit</Heading>
                                </Box>
                                <Box id = "Buy" onClick={this.buyItem} style={BuyOrExitStyle}  as="button">
                                    <Heading>Purchase</Heading>
                                </Box>
                            </Stack>
                        </Box>         
                            
                    </Box>
                </Flex>
            </Container>
        )
    }

    selectKetchup() {
        this.setState({currentSelection: "ketchup"})
    }

    selectMustard() {
        this.setState({currentSelection: "mustard"})
    }

    displayInfo() {
        if(this.state.currentSelection == 'ketchup') {
            return ketchupDesc
        }
        else if(this.state.currentSelection == 'mustard') {
            return mustardDesc
        }
        else {
            return welcome
        }
    }

    buyItem() {

    }

    exitShop() {

    }
}



// const ShopPage = () => {
//     return (
//         <Container height="100vh">
//             <Flex minHeight='100vh' width='full' align='center' justifyContent='center'>
//                 <Box borderWidth={1} px={1} width='full' maxWidth='800px' borderRadius={4} textAlign='center' boxShadow='lg'>
                    
//                     <ThemeProvider theme={theme} />

//                     <Box h='100px' >
//                         <ShopSign />
//                     </Box>

//                     <Box h='100px' >
//                         <Items />
//                     </Box>

//                     <Box h='100px' bgImage="url('/images/shop/itemDescBg.png')" bgRepeat='no-repeat' bgPosition='center' bgSize='contain'>
//                         <ItemDesc />
//                     </Box>
                    
//                     <Box h='100px' >
//                         <BuyOrExit />
//                     </Box>         
                        
//                 </Box>
//             </Flex>
//         </Container>
        
//     );
// }



export default ShopPage