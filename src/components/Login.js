import React, { useState } from 'react'
import {  FormControl, FormLabel, VStack,Input, InputGroup, InputRightElement, Button, useToast } from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const[loading,setLoading]=useState(false);
    const [show,setShow]=useState(false);
    const toast=useToast();
    const navigate=useNavigate();

     const handleClick=()=>{
        setShow(!show);
     }

     const submitHandler=async()=>{
        setLoading(true);
        if( !password || !email){
            toast({
                title: "Please fill all the details",
                status: "warning",
                duration: 5000,
                position: "bottom",
                isClosable: true,
              });
              setLoading(false);
              return ;
        }
    
        try{
    
              const config={
                headers:{
                    "Content-type":"application/json"
                }
              }
            const {data}=await axios.post("/api/user/login",{
                 email,password
            },config);
    
            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                position: "bottom",
                isClosable: true,
            })
    
            localStorage.setItem('userInfo',JSON.stringify(data));
            setLoading(false);
            navigate("/dashboard");
    
        }catch(err){
            toast({
                title: "Error Occured",
                description:err.response.data.message,
                status: "warning",
                duration: 5000,
                position: "bottom",
                isClosable: true,
            })
        }
     }

  return (
    <VStack spacing="24px">
       

        <FormControl isRequired>
        <FormLabel >Email: </FormLabel>
            <Input type='email' placeholder='Enter your email'  _placeholder={{ color: 'white' }}
           focusBorderColor="black" onChange={(e)=>setEmail(e.target.value)} ></Input>
        </FormControl>

        <FormControl m="10px 0 10px 0" isRequired >
        <FormLabel>Password: </FormLabel>
        <InputGroup>
            <Input type={show?"text":"password"} placeholder='Enter your password'  _placeholder={{ color: 'white' }}
           focusBorderColor="black" onChange={(e)=>setPassword(e.target.value)} ></Input>
            <InputRightElement width="4.5em" p="3px 0 3px 0" ><Button onClick={handleClick}>{show?"hide":"show"}</Button></InputRightElement>
        </InputGroup>
        </FormControl>

       <Button 
        colorScheme='blue'
        width="100%"
        style={{marginTop:15,backgroundColor:'white',color:'black'}}
        isLoading={loading}
        onClick={submitHandler}
       >
        Login
       </Button>

    </VStack>
  )
}

export default Login