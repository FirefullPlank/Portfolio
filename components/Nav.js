import {
  Box,
  Flex,
  HStack,
  Icon,
  Link,
  useColorModeValue,
  Text,
  Button,
  useColorMode,
  IconButton,
} from '@chakra-ui/react';

import { BsMoonFill, BsSun } from 'react-icons/bs';
import { AiOutlineAppstore } from 'react-icons/ai';
import styles from '../styles/Nav.module.css';
import { LinkItems } from '../constants/constants';

const NavLink = ({ children, href }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={href}>
    {children}
  </Link>
);

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="0.2s ease"
      bg={useColorModeValue('gray.100', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w="11rem"
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          FirePlank
        </Text>
      </Flex>
      {LinkItems.map((link, index) => (
        <NavItem className={styles.unselectable} unselectable="on" key={link.name} icon={link.icon} id={index}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Link href={LinkItems[rest.id].path} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const NavWithSidebar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} boxShadow='lg' width="100%">
      <SidebarContent
        position="fixed"
        zIndex={998}
        boxShadow="xl"
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Box h={16} width="full">
        <Box mt="3" mr="4" float="right">
          <Button leftIcon={<AiOutlineAppstore/>} marginRight="1rem" onClick={() => window.location.href = "/apps"}>Apps</Button>
          <Button onClick={toggleColorMode} aria-label="change theme button">
              {colorMode === 'light' ? <BsMoonFill /> : <BsSun />}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

const Nav = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} boxShadow='lg'>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <HStack spacing={8} alignItems={'center'}>
          <HStack
            as={'nav'}
            spacing={4}
            display={{ base: 'none', md: 'flex' }}>
            <NavLink key={1} href="/">Home</NavLink>
          </HStack>
        </HStack>

        <Flex alignItems={'center'}>
          <Button onClick={toggleColorMode} aria-label="change theme button">
              {colorMode === 'light' ? <BsMoonFill /> : <BsSun />}
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

export { Nav, NavWithSidebar }