import React from "react";
import {ThemeProvider, theme, CSSReset, Flex, Box, Heading, IconButton, IconButtonProps, Link, FormControl, FormLabel, Input, Stack, Checkbox, Button, Editable, EditableInput, EditablePreview, ButtonGroup, Image, Avatar } from "@chakra-ui/react";
import { EditIcon, CheckIcon, CloseIcon, ChevronLeftIcon, ChevronRightIcon, ArrowBackIcon } from '@chakra-ui/icons'
import { useRouter } from "next/router";
import {Formik, Form} from "formik";
import {useUpdateCharacterMutation, useMeQuery, useGetCharacterQuery} from "../generated/graphql";

let imageList = [...Array(8)].map((_, i) => `icons/${i+1}.png`)
var savedImageId = 0  //can pass in from DB

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


const SaveBox = () => {
  const isServer = () => typeof window ==="undefined";
  const getMe = () => {
    const [{data, fetching}] = useMeQuery({
      pause: isServer(),
    });
    return data
  }
  var meData = getMe()
  var userName
  if (meData) {
    userName = meData.me.username
  }
  var [{data}] = useGetCharacterQuery({
    variables: {username: userName}
  });
  if (data) {
    savedImageId = data.getCharacter.characterId
  } 

  const [,updateCharacter] = useUpdateCharacterMutation();
  const submit = () => {
    updateCharacter({username: userName, characterId: savedImageId});
    window.location.reload(false);
  }
  return (
    <Box>
        <Box my={5} textAlign='center'>
          <ChooseImage imageId={savedImageId} />
        </Box>
        <Box my={5} textAlign='left'>
            <Button width='full' mt={5} onClick={submit}> Save </Button>   
        </Box>
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
        {/* <IconButton icon={<ChevronLeftIcon />} onClick={prevImage} isRound={true} aria-label='previous'/> */}
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
            />
        ) 
    }
}

// function prevImage() {
//   savedImageId = (savedImageId-1)%8; //had some rendering error while trying to put -1 and spam clicking
//   (document.getElementById('Avatar') as HTMLImageElement).src = imageList[savedImageId]
//   //alert(imageList[savedImageId])
// }

function nextImage() {
  savedImageId = (savedImageId+1)%8;
  (document.getElementById('Avatar') as HTMLImageElement).src = imageList[savedImageId]
}


export default ChooseCharacter