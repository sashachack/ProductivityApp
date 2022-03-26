import BoardCard from "../elements/board_card";
import { Space, SimpleGrid, Title, Card } from "@mantine/core";
import { DragDropContext, Droppable, Draggable , DragItem} from 'react-beautiful-dnd';
import { useState, useEffect } from 'react';

let Board = ({ content, setContent, clickCard, addCard }) => {
    // console.log(content);
    let statuses = ["To Do", "Doing", "Done"];
    let items = {};
    for (let status of statuses) {
        items[status] = content.filter((c) => c.status == status);
    }
    const [tasks, updateTasks] = useState(items);
    useEffect(() => {
        updateTasks(items);
      }, []);
    // let clickCard = (id) => {
    //     console.log(id);
    // };

    let addCardButton = (label) => {
        // console.log(`Status: ${label}`);
        return (
            <Card
                sx={(theme) => ({
                    backgroundColor: "#44445522",
                    "&:hover": {
                        backgroundColor: "#44445566",
                        cursor: "pointer",
                    },
                })}
                onClick={() => addCard(label)}
            >
                + Add Task
            </Card>
        );
    };
    const removeFromList = (items, index) => {
        const result = Array.from(items);
        const [removed] = result.splice(index, 1);
        return [removed, result];
    };
      
    const addToList = (items, index, element) => {
        const result = Array.from(items);
        result.splice(index, 0, element);
        return result;
    };

    const onDragEnd = (result) => {  
        if (!result.destination) {  
            return;  
        }  
        const copy = { ...tasks }  
    
        const sourceList = copy[result.source.droppableId]  
        const [removedElement, newSourceList] = removeFromList(sourceList, result.source.index)  
        copy[result.source.droppableId] = newSourceList  
    
        const destinationList = copy[result.destination.droppableId]  
        copy[result.destination.droppableId] = addToList(destinationList, result.destination.index, removedElement)  
    
        updateTasks(copy)  
    }
    

    return (
        <div>
            <SimpleGrid cols={statuses.length}>
                {statuses.map((s, i) => (
                    <Card style={{ backgroundColor: "#44445522" }}>
                        <Title key={i} order={4}>
                            {s}
                        </Title>
                    </Card>
                ))}
            </SimpleGrid>
            <Space h="md"></Space>
            <DragDropContext onDragEnd={onDragEnd}>
            <SimpleGrid cols={statuses.length}>
                {statuses.map((s, i) => (
                        <Droppable droppableID ={`${s}`}>
                            {(provided) => ( 
                                <div key={i} {...provided.droppableProps} ref={provided.innerRef}>
                                    {items[s].map((c, j) => (
                                        <Draggable draggableId={c.id} index={j}>
                                            {(provided, snapshot) => (
                                                <div key={j} ref={provided.innerRef} 
                                                    snapshot={snapshot} 
                                                    {...provided.draggableProps} 
                                                    {...provided.dragHandleProps}
                                                >
                                                {/* <div key={j} ref={provided.innerRef} {...provided.droppableProps} ref={provided.dragHandleProps}> */}
                                                    <BoardCard
                                                        taskName={c.title}
                                                        label={c.label}
                                                        dueDate={c.dueDate}
                                                        id={c["_id"]}
                                                        click={(id) => clickCard(id)}
                                                    />
                                                    <Space h="md" />
                                                {/* </div> */}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))} 
                                {addCardButton(s)}
                                {provided.placeholder}
                                </div>
                            )}
                        </Droppable>  
                    ))}
            </SimpleGrid>
            </DragDropContext>
        </div>
    );
};

export default Board;
