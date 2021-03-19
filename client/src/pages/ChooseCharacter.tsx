import React from "react";
import {ThemeProvider, theme, CSSReset, Flex, Box, Heading, IconButton, IconButtonProps, Link, FormControl, FormLabel, Input, Stack, Checkbox, Button, Editable, EditableInput, EditablePreview, ButtonGroup, Image, Avatar } from "@chakra-ui/react";
import { EditIcon, CheckIcon, CloseIcon, ChevronLeftIcon, ChevronRightIcon, ArrowBackIcon } from '@chakra-ui/icons'

let imageList = ["https://theosophical.files.wordpress.com/2011/06/zero2.jpg?w=584", "https://upload.wikimedia.org/wikipedia/commons/c/c5/Number-One.JPG", "https://lezebre.lu/images/detailed/30/sticker-2.png", "https://lh3.googleusercontent.com/proxy/IDx_M59r8t1glmv5s7C6hLPGuduFFqZrXS7970yYm_FGMB5-ktIIUC9LrEZSDJAuVlt2PHbWGMefLQZMp-Nnk0nxo0TcMprA3UBZH6jf2Ds", "https://i.pinimg.com/originals/b9/5a/e6/b95ae6b0def49e2844fd24a6097adde1.gif", "/images/img5.png"]//"http://assets.stickpng.com/images/58c57fee09e8bc1b42c77938.png"]
var savedImageId = 1 //can pass in from DB

const ChooseCharacter = () => {
    return (
        <ThemeProvider theme={theme}>
            <CSSReset />
            <CharacterPage />
        </ThemeProvider>
    );
}

const CharacterPage = () => {
    return (
        <Flex minHeight='100vh' width='full' align='center' justifyContent='center'>
            <Box borderWidth={1} px={4} width='full' maxWidth='300px' borderRadius={4} textAlign='center' boxShadow='lg'>
                <ThemeProvider theme={theme} />
                <Box p={4}>
                    <Title />
                    <CharacterName />
                    <ChangeAvatar />
                    <SaveBox />
                </Box>
            </Box>
        </Flex>
    );
}

const Title = () => {
    return (
        <Box my={1} textAlign='center'>
        <IconButton 
        icon={<ArrowBackIcon />}
        aria-label="Back Icon"
        isRound={true} 
        size='sm'/>
        Choose your character
        </Box>
    )
}


const CharacterName = () => {
    return (
        <Box textAlign='center'>
            <Editable
      textAlign="center"
      defaultValue="Player 1"
      fontSize="2xl"
      isPreviewFocusable={false}
      submitOnBlur={false}
    >
      {(props) => (
        <>
          <EditablePreview />
          <EditableInput />
          <EditableControls {...props} />
        </>
      )}
    </Editable>
        </Box>
    )
}

const ChangeAvatar = () => {
    return (
        <Box my={5} textAlign='center'>
            <ChooseImage imageId={savedImageId} />
        </Box>
    )
}

const SaveBox = () => {
    return (
        <Box my={5} textAlign='left'>
            
            <Button width='full' mt={5}>Save</Button>
            
        </Box>
    )
}

function EditableControls({ isEditing, onSubmit, onCancel, onEdit }) {
    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton icon={<CheckIcon />} onClick={onSubmit} aria-label='submit'/>
        <IconButton icon={<CloseIcon />} onClick={onCancel} aria-label='cancel'/>
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton size="sm" icon={<EditIcon />} onClick={onEdit} aria-label='edit'/>
      </Flex>
    )
  }


function ChooseImage({ imageId }) {
    return (
    <Flex justifyContent="center">
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton icon={<ChevronLeftIcon />} onClick={prevImage} isRound={true} aria-label='previous'/>
        {render()}
        <IconButton icon={<ChevronRightIcon />} onClick={nextImage} isRound={true} aria-label='next'/>
        </ButtonGroup>
    </Flex>
    )

    function render(){
        return(
        <Image
            borderRadius="full"
            boxSize="45px"
            src={imageList[imageId]}
            alt="Avatar"
            img id="Avatar"
            />) }
}

function prevImage() {
  savedImageId = (savedImageId+5)%6; //had some rendering error while trying to put -1 and spam clicking
  (document.getElementById('Avatar') as HTMLImageElement).src = imageList[savedImageId]
  //alert(imageList[savedImageId])
}

function nextImage() {
  savedImageId = (savedImageId+1)%6;
  (document.getElementById('Avatar') as HTMLImageElement).src = imageList[savedImageId]
}


export default ChooseCharacter