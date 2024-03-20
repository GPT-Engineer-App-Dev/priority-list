import { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Heading,
  VStack,
  Input,
  IconButton,
  StackDivider,
  useToast,
  List,
  ListItem,
  HStack,
  Text,
  theme,
} from '@chakra-ui/react';
import { FaPlus, FaTrash } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (!input) {
      toast({
        title: 'No task entered',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, input]);
    setInput('');
  };

  const deleteTask = (index: number) => {
    const newTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(newTasks);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box p={4}>
        <VStack
          divider={<StackDivider />}
          borderColor="gray.100"
          borderWidth="2px"
          p={4}
          borderRadius="lg"
          w="100%"
          maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }}
          alignItems="stretch"
        >
          <Heading mb="8">To-Do List</Heading>
          <HStack>
            <Input
              variant="filled"
              placeholder="Add a new task"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <IconButton
              aria-label="Add task"
              icon={<FaPlus />}
              onClick={addTask}
            />
          </HStack>
          <List spacing={3}>
            {tasks.map((task, i) => (
              <ListItem key={i} p={2} bg="gray.100" borderRadius="md">
                <HStack justifyContent="space-between">
                  <Text>{task}</Text>
                  <IconButton
                    aria-label="Delete task"
                    icon={<FaTrash />}
                    onClick={() => deleteTask(i)}
                  />
                </HStack>
              </ListItem>
            ))}
          </List>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Index;