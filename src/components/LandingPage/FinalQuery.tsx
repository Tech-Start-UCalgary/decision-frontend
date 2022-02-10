import React from 'react';

import {
  Box,
  Flex,
  Spacer,
  Heading,
  Text,
  Button,
  Editable,
  EditablePreview,
  EditableInput,
  Center,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from '@chakra-ui/react';

import Link from 'next/link';

import defaultInterests from './default-interests';

export default function PreferencesPage() {
  const [selectedBudget, setSelectedBudget] = React.useState(1);
  const [interests, setInterests] = React.useState(defaultInterests);

  const { isOpen, onOpen, onClose } = useDisclosure();

  let interestButtons = interests.map((interest) => {
    return (
      <Button
        width={interest.width}
        height="36px"
        marginRight="16px"
        marginTop="16px"
        borderRadius="16px"
        bg={interest.selected ? '#FFDD99' : '#644386'}
        _hover={{ bg: interest.selected ? '#FFDD99' : '#644386' }}
        onClick={() => toggleInterest(interest.id)}
      >
        <Text
          fontSize="sm"
          fontWeight="medium"
          color={interest.selected ? '#644386' : '#FFDD99'}
        >
          {interest.name}
        </Text>
      </Button>
    );
  });

  function toggleInterest(id: number) {
    if (id === 0) {
      if (interests[0].selected) {
        setInterests((prevInterests) => {
          return prevInterests.map((interest) => {
            return interest.id === 0
              ? { ...interest, selected: !interest.selected }
              : interest;
          });
        });
      } else {
        // "Select" all interests
        setInterests((prevInterests) => {
          return prevInterests.map((interest) => {
            return { ...interest, selected: true };
          });
        });
      }
    } else if (interests[0].selected) {
      // "Un-select the Everything interest"
      setInterests((prevInterests) => {
        return prevInterests.map((interest) => {
          if (interest.id === 0) {
            return { ...interest, selected: false };
          } else {
            return interest.id === id
              ? { ...interest, selected: !interest.selected }
              : interest;
          }
        });
      });
    } else {
      setInterests((prevInterests) => {
        return prevInterests.map((interest) => {
          return interest.id === id
            ? { ...interest, selected: !interest.selected }
            : interest;
        });
      });
    }
  }

  return (
    <Box height="100vh" width="100vw" bg="#332244">
      <Flex height="100%" flexDirection="column">
        <Box>
          <Flex
            direction="column"
            align="left"
            justifyContent="left"
            marginTop="5vh"
            marginLeft="24px"
          >
            <Heading
              color="#FFDD99"
              fontSize="3xl"
              fontWeight="medium"
              paddingBottom="0px"
            >
              How much to spend?
            </Heading>
            <Flex direction="row" marginTop="2.5vh">
              <Text
                color={selectedBudget >= 1 ? '#FFDD99' : '#644386'}
                fontSize="7xl"
                fontWeight="regular"
                lineHeight="48px"
                marginLeft="-4px"
                onClick={() => setSelectedBudget(1)}
              >
                $
              </Text>
              <Text
                color={selectedBudget >= 2 ? '#FFDD99' : '#644386'}
                fontSize="7xl"
                fontWeight="regular"
                lineHeight="48px"
                marginLeft="2px"
                onClick={() => setSelectedBudget(2)}
              >
                $
              </Text>
              <Text
                color={selectedBudget >= 3 ? '#FFDD99' : '#644386'}
                fontSize="7xl"
                fontWeight="regular"
                lineHeight="48px"
                marginLeft="2px"
                onClick={() => setSelectedBudget(3)}
              >
                $
              </Text>
              <Text
                color="#FFDD99"
                fontSize="7xl"
                fontWeight="regular"
                lineHeight="48px"
                marginLeft="20vw"
                onClick={onOpen}
              >
                ?
              </Text>
            </Flex>
            <Text
              color={selectedBudget === 0 ? '#FFDD99' : '#644386'}
              fontSize="lg"
              fontWeight="medium"
              marginTop="3vh"
              onClick={() => setSelectedBudget(0)}
            >
              Ignore budget
            </Text>
          </Flex>
          <Flex
            direction="column"
            align="left"
            marginTop="8vh"
            marginLeft="24px"
          >
            <Heading
              color="#FFDD99"
              fontSize="3xl"
              fontWeight="medium"
              marginBottom="1vh"
            >
              What interests you?
            </Heading>
            <Flex flexWrap="wrap" width="80vw">
              {interestButtons}
            </Flex>
            <Editable
              bg="#644386"
              color="#FFDD99"
              height="36px"
              width="80vw"
              maxWidth="284px"
              borderRadius="16px"
              placeholder="Not here? Type here"
              fontSize="sm"
              fontWeight="regular"
              marginTop="5vh"
              paddingLeft="20px"
              lineHeight="200%"
            >
              <EditablePreview />
              <EditableInput />
            </Editable>
          </Flex>
        </Box>
        <Spacer />
        <Box
          width="100vw"
          align="center"
          bg="#332244"
          paddingBottom="4vh"
          paddingTop="6vh"
        >
          <Link href="/linkgeneration">
            <Button
              bg="#FFDD99"
              height="36px"
              width="144px"
              borderRadius="16px"
              _hover={{ bg: '#FFDD99' }}
            >
              <Text color="#644386" fontSize="md" fontWeight="bold">
                Generate Link
              </Text>
            </Button>
          </Link>
        </Box>
      </Flex>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={true}
        closeOnOverlayClick={true}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent
          width="90vw"
          borderRadius="30px"
          border="1px"
          borderColor="#332244"
          bg="#4B3265"
          top="12vh"
        >
          <ModalBody
            color="#FFDD99"
            fontWeight="regular"
            fontSize="sm"
            fontFamily={'Roboto'}
            textAlign="left"
            margin="3vw 0vw 0vw"
          >
            Select a budget rating ($ to $$$) to specify the cost of the venue's
            recommended to you. Each venue's cost comes from Google and there is
            no direct numerical translation from dollars to a cost rating.
            Typically, "$" refers to an "inexpensive" venue, while "$$" refers
            to a "moderately expensive" venue, and "$$$" refers to an
            "expensive" venue. For example, selecting "$$" means that only
            venues that cost "$$" will be recommended.
          </ModalBody>
          <ModalBody
            color="#FFDD99"
            fontWeight="regular"
            fontSize="sm"
            fontFamily={'Roboto'}
            textAlign="left"
            margin="0vw 0vw 3vw"
          >
            Alternatively, select "Ignore budget" to not filter the generated
            recommendations based on cost (you will receive recommendations that
            cost either "$", "$$", or "$$$").
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
