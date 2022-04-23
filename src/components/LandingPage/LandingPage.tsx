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
} from '@chakra-ui/react';

import { BsArrowRight } from 'react-icons/bs';
import FinalQuery from './FinalQuery';

import { useForm, FormProvider } from 'react-hook-form';

import { setFormName } from '../../slices/formNameSlice';
import { setFormStep } from '../../slices/formStepSlice';
import { useAppSelector, useAppDispatch } from '../../hooks';

import Link from 'next/link';

const LandingPage = () => {
  const methods = useForm({
    mode: 'all',
    defaultValues: { names: '', budget: '1' },
  });

  const dispatch = useAppDispatch();
  const step = useAppSelector((state) => state.formStep.value);

  return (
    <FormProvider {...methods}>
      <Box bg="#332244" minH="91vh" fontFamily="Roboto, sans-serif">
        <Center
          flexDirection={'column'}
          minH="80vh"
          mr={{ base: '0', md: '10rem' }}
        >
          {step >= 0 && (
            <Box width="full" display={step !== 0 ? 'none' : 'block'}>
              <Heading
                as="h1"
                size="4xl"
                fontSize={'5rem'}
                color="#FFDD99"
                letterSpacing={'2px'}
                textAlign="center"
                fontFamily="Roboto, sans-serif"
              >
                Hello
              </Heading>
              <Flex
                width="100%"
                alignItems={'center'}
                justifyContent={'center'}
                marginTop={'7.5rem'}
              >
                <Editable
                  placeholder="Your name here"
                  variant="solid"
                  color="#FFDD99"
                  bg="#644386"
                  borderRadius="1rem"
                  width="60%"
                  maxWidth={'400px'}
                  height="2.25rem"
                  fontSize="sm"
                  paddingLeft="1.25rem"
                  lineHeight="225%"
                  fontFamily="Roboto, sans-serif"
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
                  borderRadius={'1rem'}
                  size="sm"
                  marginLeft={'1.5rem'}
                  bg="#644386"
                  color="#FFDD99"
                  _hover={{
                    bg: '#FFDD99',
                    color: 'white',
                  }}
                  onClick={() => {
                    dispatch(setFormName(methods.getValues('names')));
                    dispatch(setFormStep(1));
                  }}
                  disabled={!methods.formState.isValid}
                  padding="0"
                  width="2.25rem"
                  height="2.25rem"
                  fontSize="lg"
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
                <Box width="2.5rem"></Box>
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
                <Box width="2.25rem" marginLeft="1.5rem"></Box>
              </Flex>
              <Link href="/about">
                <Button
                  fontSize="2rem"
                  fontWeight="regular"
                  color="#FFDD99"
                  bg="#644386"
                  opacity="0.9"
                  position="fixed"
                  right="1.75rem"
                  bottom="1.75rem"
                  width="3.25rem"
                  height="3.25rem"
                  borderRadius="full"
                  boxShadow="4px 4px 8px rgba(0, 0, 0, 0.25)"
                  _hover={{ bg: '#644386' }}
                >
                  ?
                </Button>
              </Link>
            </Box>
          )}
          {step >= 1 && <FinalQuery />}
        </Center>
      </Box>
    </FormProvider>
  );
};

export default LandingPage;
