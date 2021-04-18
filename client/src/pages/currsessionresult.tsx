import React from "react";
import { Flex, Heading, Box, ThemeProvider, theme, CSSReset } from "@chakra-ui/react";
import PlayerResult from '../components/CurrentResults';
import { useLocation } from "react-router-dom";


export const Results = () => {
    return (
        <ThemeProvider theme={theme}>
            <CSSReset />
            <PlayerResult />
        </ThemeProvider>
    );
}

export default Results;