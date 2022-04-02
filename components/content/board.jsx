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
    // const [tasks, updateTasks] = useState(items);
    // console.log("ITEMS INITIAL", items);
    // console.log("TASKS INITIAL", tasks);
    // useEffect(() => {
    //     updateTasks(tasks);
    //     console.log("task !!!!!!!");
    // }, []);
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
    // const removeFromList = (items, index) => {
    //     const result = Array.from(items);
    //     const [removed] = result.splice(index, 1);
    //     console.log("removed task", removed);

    //     return [removed, result];
    // };

    // const addToList = (items, index, element) => {
    //     const result = Array.from(items);
    //     console.log("element", element);
    //     result.splice(index, 0, element);
    //     console.log("task added list", result);
    //     return result;
    // };

    const onDragEnd = (result) => {
        console.log("RESULT");
        console.log(result);
        if (!result.destination) {
            return;
        }

        // send result.draggableId and result.destination.droppableId to the server
        const data = {
            id: result.draggableId,
            update: {
                status: result.destination.droppableId,
            },
        };
        let editTask = async () => {
            await fetch("/api/edit_task", {
                method: "POST",
                body: JSON.stringify(data),
            });
        };
        editTask().then(() => {
            console.log("Edited task");
            // setDragItem(null);
        });

        let c = JSON.parse(JSON.stringify(content));
        // console.log(c);
        for (let i = 0; i < c.length; i++) {
            if (c[i].id == result.draggableId) {
                c[i].status = result.destination.droppableId;
                break;
            }
        }
        setContent(c);

        // console.log("DRAGGED");
        // console.log("tasks list", items);

        // const copy = { ...tasks };
        // console.log("copy list", copy);

        // const startStatusList = copy[result.source.droppableId];
        // console.log("start status list", startStatusList);

        // const [removedElement, newStartStatusList] = removeFromList(
        //     startStatusList,
        //     result.source.index
        // );
        // copy[result.source.droppableId] = newStartStatusList;
        // console.log("new start status", newStartStatusList);

        // const endStatusList = copy[result.destination.droppableId];
        // copy[result.destination.droppableId] = addToList(
        //     endStatusList,
        //     result.destination.index,
        //     removedElement
        // );

        // console.log("end status list", copy[result.destination.droppableId]);
        // console.log("FINAL LISTS", copy);
        // updateTasks(copy);
    };

    return (
        <div>
            <SimpleGrid cols={statuses.length}>
                {statuses.map((s, i) => (
                    <Card key={i} style={{ backgroundColor: "#44445522" }}>
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
                        <Droppable key={i} droppableId ={s}>
                            {(provided, snapshot) => ( 
                                <div key={i} {...provided.droppableProps} ref={provided.innerRef}>
                                    {items[s].map((c, j) => (
                                        <Draggable key={c["_id"]} draggableId={c["_id"]} index={j}>
                                        {(provided) => (
                                            <div ref={provided.innerRef} snapshot={snapshot} {...provided.dragHandleProps} {...provided.draggableProps} >
                                                <BoardCard
                                                    taskName={c.title}
                                                    label={c.label}
                                                    dueDate={c.dueDate}
                                                    id={c["_id"]}
                                                    click={(id) => clickCard(id)}
                                                />
                                                <Space h="md" />
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
