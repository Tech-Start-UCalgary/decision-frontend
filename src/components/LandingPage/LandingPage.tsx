import {
  Center,
  Editable,
  Flex,
  EditablePreview,
  EditableInput,
  Heading,
  Button,
  Box,
  Text,
  Spacer,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import FinalQuery from './FinalQuery';

import { useForm, FormProvider } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';
import { increment } from '../../slices/counterSlice';

const LandingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const methods = useForm({
    mode: 'all',
    defaultValues: { names: '', budget: '1' },
  });

  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);

  return (
    <FormProvider {...methods}>
      <Box bg="#332244" minH="100vh">
        <Center flexDirection={'column'} minH="80vh">
          {currentStep >= 0 && (
            <Box width="100vw" display={currentStep !== 0 ? 'none' : 'block'}>
              <Heading
                as="h1"
                size="4xl"
                fontSize={'5rem'}
                color="#FFDD99"
                letterSpacing={'2px'}
                textAlign="center"
              >
                Hello
              </Heading>
              <Flex
                width="100%"
                alignItems={'center'}
                justifyContent={'center'}
                marginTop={'5rem'}
              >
                <Editable
                  placeholder="Your name here"
                  variant="solid"
                  color="#FFDD99"
                  bg="#644386"
                  borderRadius="full"
                  px="4"
                  width="60%"
                  maxWidth={'400px'}
                >
                  <EditablePreview />
                  <EditableInput
                    {...methods.register('names', {
                      required: {
                        value: true,
                        message: 'Please enter a name',
                      },
                    })}
                  />
                </Editable>
                <Button
                  borderRadius={'30px'}
                  size="sm"
                  marginLeft={'1rem'}
                  bg="#644386"
                  color="#FFDD99"
                  _hover={{
                    bg: '#FFDD99',
                    color: 'white',
                  }}
                  onClick={() => setCurrentStep(1)}
                  disabled={!methods.formState.isValid}
                >
                  <BsArrowRight />
                </Button>
              </Flex>

              {/* "Hacky" way of displaying message for user to enter in their name */}
              <Flex
                flexDirection="row"
                width="100%"
                alignItems={'center'}
                justifyContent={'center'}
                marginTop="0.25rem"
              >
                <Box width="8"></Box>
                {methods.formState.errors.names && (
                  <Text
                    color="#FFDD99"
                    fontSize="0.625rem"
                    width="60%"
                    maxWidth={'400px'}
                  >
                    {methods.formState.errors.names.message}
                  </Text>
                )}
                <Box width="2.25rem" marginLeft="1rem"></Box>
              </Flex>

              <Button onClick={() => dispatch(increment())}>INCREMENT</Button>
              <Text color="#FFDD99">{count}</Text>
            </Box>
          )}
          {currentStep >= 1 && <FinalQuery />}
        </Center>
      </Box>
    </FormProvider>
  );
};

export default LandingPage;
