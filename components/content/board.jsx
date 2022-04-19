import BoardCard from "../elements/board_card";
import { Space, SimpleGrid, Title, Card } from "@mantine/core";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DragItem,
} from "react-beautiful-dnd";
import { useState, useEffect } from "react";

let Board = ({ content, setContent, clickCard, addCard }) => {
    // console.log(content);
    let statuses = ["To Do", "Doing", "Done"];
    let items = {};
    for (let status of statuses) {
        items[status] = content.filter((c) => c.status == status);
    }
    let addCardButton = (label) => {
        // console.log(`Status: ${label}`);
        return (
            <Card
                sx={(theme) => ({
                    backgroundColor: "#44445522",
                    "z-index": "1",
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

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

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
        });
        let c = JSON.parse(JSON.stringify(content));
        // console.log(c);
        for (let i = 0; i < c.length; i++) {
            if (c[i]["_id"] == result.draggableId) {
                c[i].status = result.destination.droppableId;
                break;
            }
        }
        console.log(c);

        setContent(c);
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
                        <Droppable key={`${s}-${i}`} droppableId={s}>
                            {(provided, snapshot) => (
                                <div
                                    key={`${s}-${i}`}
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {items[s].map((c, j) => (
                                        <div key={c["_id"]}>
                                            <Draggable
                                                key={c["_id"]}
                                                draggableId={c["_id"]}
                                                index={j}
                                            >
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        snapshot={snapshot}
                                                        key={c["_id"]}
                                                        {...provided.dragHandleProps}
                                                        {...provided.draggableProps}
                                                    >
                                                        <BoardCard
                                                            taskName={c.title}
                                                            label={c.label}
                                                            dueDate={c.dueDate}
                                                            id={c["_id"]}
                                                            click={(id) =>
                                                                clickCard(id)
                                                            }
                                                            key={c["_id"]}
                                                        />
                                                        <Space h="md" />
                                                    </div>
                                                )}
                                            </Draggable>
                                        </div>
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
