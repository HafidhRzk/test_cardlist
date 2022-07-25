import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
    Box,
    Text,
    Heading,
    VStack,
    Button,
    HStack,
    Input,
    FlatList
} from "native-base";

export default function Todos(){

    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const link = 'https://api.kontenbase.com/query/api/v1/c22efab6-35da-42ec-be60-7f5d8fa54600/Todos'

    const getData = async () => {
        try {
            const response = await axios.get(link)
            const json = JSON.stringify(response.data)
            const todos = JSON.parse(json)
            setTodos(todos)
        } catch (error) {
            alert(error.message);
        }
    };

    const onChangeHandler = (todo) => {
        setTodo(todo);
    };

    const onSubmitHandler = async (event) => {
        try {
            const response = await axios.post(link, {todo});
            if (response.status === 201) {
              alert(` You have created: ${JSON.stringify(response.data)}`);
              setIsLoading(true);
              setTodo('');
              refetch();
            } else {
              throw new Error("An error has occurred");
            }
        } catch (error) {
            alert("An error has occurred");
            setIsLoading(false);
        }      
    };

    const onDeleteHandler = async (_id) => {
        const response = await axios.delete(`https://api.kontenbase.com/query/api/v1/c22efab6-35da-42ec-be60-7f5d8fa54600/Todos/${_id}`);
    };

    const onUpdateHandler = async (_id) => {
        const response = await axios.patch(`https://api.kontenbase.com/query/api/v1/c22efab6-35da-42ec-be60-7f5d8fa54600/Todos/${_id}`, {todo});
    };

    const renderItem = ({ item }) => {
        return (
            <HStack w="100%">
                <Text w="50%" h={30} 
                bg="error.50" color="black" 
                fontSize={16} p={2} m={2}
                justifyContent="center">{item.todo}</Text>
                <Button p={2} m={2} bg="error.800" w={60}
                onPress={() => onUpdateHandler(item._id)}>Change</Button>
                <Button p={2} m={2} bg="error.800" w={60} 
                onPress={() => onDeleteHandler(item._id)}>Delete</Button>
            </HStack>
        );
    };
    
    useEffect(() => {
        getData();
    }, []);

    return (
        <Box safeArea bg="error.300" flex={1} p={10} w="100%" h="100" mx="auto" justifyContent="center">
            <Heading p={5}>Todos App</Heading>
            <Input h={30} bg="error.50" color="black" fontSize={10} p={5} 
            value={todo} onChangeText={onChangeHandler} editable={!isLoading}/>
            <Button p={2} m={2} bg="error.800" w={100} onPress={onSubmitHandler} disabled={isLoading}>Add</Button>
            <VStack>
                <FlatList 
                    keyExtractor={(item) => item._id} 
                    data={todos}
                    extraData={selectedId}
                    renderItem={renderItem}
                />
            </VStack>
        </Box>
    )
}