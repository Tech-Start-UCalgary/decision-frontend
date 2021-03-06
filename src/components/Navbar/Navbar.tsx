import React, { ReactNode } from 'react';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Image,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import Selections from './Selections';
import Link from 'next/link';

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="0">
        {children}
      </Box>
    </>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      fontFamily="Roboto, sans-serif"
      bg="#4B3265"
      borderRight="1px"
      borderRightColor="#644386"
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      zIndex="20"
      h="full"
      minH="100vh"
      {...rest}
      boxShadow="0px 2px 8px rgba(0, 0, 0, 0.25)"
    >
      <Flex
        h="20"
        alignItems="center"
        mx="14"
        justifyContent="space-between"
        color="#FFDD99"
      >
        <Link href="/">
          <Image
            src="/whereto-logo-transparent.png"
            w={{ base: '5rem', md: 'full' }}
            mx={{ base: 'auto' }}
            cursor="pointer"
          />
        </Link>
        <CloseButton
          display={{ base: 'flex', md: 'none' }}
          ml="auto"
          mr="-2rem"
          onClick={onClose}
        />
      </Flex>
      <Nav />
      <Selections />
    </Box>
  );
};

const Nav = () => {
  return (
    <>
      <Link href="/about">
        <Flex
          align="center"
          borderTop="1px"
          borderTopColor="#644386"
          p="4"
          role="group"
          cursor="pointer"
          color="#FFDD99"
          _hover={{
            bg: '#644386',
            color: 'white',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="18"
            width="18"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <Text fontSize="1rem" ml="2">
            What is this?
          </Text>
        </Flex>
      </Link>
    </>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg="#442D5A"
      fontFamily="Roboto, sans-serif"
      borderBottomWidth="1.5px"
      borderBottomColor="#332244"
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        bg="transparent"
        variant="solid"
        position="absolute"
        aria-label="open menu"
        color="#FFDD99"
        _hover={{
          bg: '#644386',
          color: 'white',
        }}
        icon={<FiMenu />}
      />
      <Link href="/">
        {/* <Text
          display={{ base: 'flex', md: 'none' }}
          fontSize="1.125rem"
          fontFamily="Roboto, sans-serif"
          fontWeight="bold"
          color="#FFDD99"
          mr="auto"
          ml="auto"
          cursor="pointer"
        >
          Where To?
        </Text> */}
        <Image
          src="/whereto-logo-transparent.png"
          display={{ base: 'flex', md: 'none' }}
          mx="auto"
          w="5rem"
        />
      </Link>
    </Flex>
  );
};
