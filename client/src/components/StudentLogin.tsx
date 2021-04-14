import { Box, FormControl, FormLabel, Input, Button,  } from "@chakra-ui/react";
import {Formik, Form} from "formik";
import { useUpdateStudentTeacherMutation} from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
    
const LoginForm = () => {
    const router = useRouter();
    const [,updateStudentTeacher] = useUpdateStudentTeacherMutation();
    return (
        <Box my={8} textAlign='left'>
            <Formik
                initialValues={{ student: '', teacher: '' }}
                
                onSubmit={async (values, {setErrors}) => {
                    await updateStudentTeacher({student: values.student, teacher: 'me'});
                    router.push("/");

                }}
            >
                {({
                    values,
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
                                type="student"
                                name="student"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.student}
                            />
                        </FormControl>
                            
                        <FormControl mt={4}>
                            <FormLabel>Password:</FormLabel>
                            <Input
                                type="password"
                                name="teacher"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.teacher}
                            />
                        </FormControl>
                        
                        <Button width='full' type="submit" isLoading={isSubmitting} backgroundColor="teal.300" mt={10}
                        bgImage="url('/images/sausage.png')" bgPosition='center' bgSize='430px 45px'>
                            Login
                        </Button>
                        
                    </Form>
                )}
            </Formik>
        </Box>
    )

}
    
export default withUrqlClient(createUrqlClient) (LoginForm);