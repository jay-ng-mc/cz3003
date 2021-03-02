import { theme, CSSReset, Flex, Box, Heading, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { ThemeProvider } from "@emotion/react";
import React from "react";
import {Formik, Form} from "formik";
import { useLoginMutation} from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { NavBar } from "../components/NavBar";


const Login: React.FC<{}> = ({}) => {
    return (
        <ThemeProvider theme={theme}>
            <CSSReset />
            <NavBar />
            <LoginPage />
        </ThemeProvider>
    );
    }

const LoginPage = () => {
    return (
        <Flex minHeight='100vh' width='full' align='center' justifyContent='center'>
            <Box borderWidth={1} px={4} width='full' maxWidth='500px' borderRadius={4} textAlign='center' boxShadow='lg'>
                <ThemeProvider theme={theme} />
                <Box p={4}>
                    <LoginHeader />
                    <LoginForm />
                </Box>
            </Box>
        </Flex>
    );
}
    
const LoginHeader = () => {
    return (
        <Box textAlign='center'>
            <Heading>SausageParty</Heading>
            <Heading p={2}></Heading>
            <Heading>Account Login</Heading>
        </Box>
    )
}
    
const LoginForm = () => {
    const router = useRouter();
    const [,login] = useLoginMutation();
    return (
        <Box my={8} textAlign='left'>
            <Formik
                initialValues={{ username: '', password: '' }}
                
                onSubmit={async (values, {setErrors}) => {
                    const response = await login({username: values.username, password: values.password});
                    if(response.data?.login.errors){
                        setErrors(toErrorMap(response.data.login.errors));
                    } else if (response.data?.login.user) {
                        //worked
                        router.push("/");
                    }
                }}
            >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
            }) => (
            <Form onSubmit={handleSubmit}>

                <FormControl mt={4}>
                    <FormLabel>Login ID:</FormLabel>
                    <Input 
                        type="username"
                        name="username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                    />
                    {errors.username && touched.username && errors.username}
            </FormControl>
                
            <FormControl mt={4}>
            <FormLabel>Password:</FormLabel>
                <Input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                />
                {errors.password && touched.password && errors.password}
                </FormControl>
                
                <Button width='full' type="submit" isLoading={isSubmitting} backgroundColor="teal.300" mt={10}>
                    Login</Button>
                
                </Form>
       )}
     </Formik>
            </Box>
        )

    }
    
    export default withUrqlClient(createUrqlClient) (Login);
