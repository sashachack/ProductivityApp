import { AppShell, Navbar, Header, Title, Text } from "@mantine/core";
import { useState } from "react";
import Board from "../content/board";
import Table from "../content/table";
import Calendar from "../content/calendar";
import EditTask from "../elements/edit_task";
import { SegmentedControl, Divider, Space } from "@mantine/core";
// import { content } from "../../constants/items_constants";
import { empty_content } from "../../constants/new_task";
import { useEffect } from "react";

const MainContent = () => {
    const [existingContent, setExistingContent] = useState([]);
    console.log(empty_content);
    const [newContent, setNewContent] = useState(empty_content);

    let user_id = 3; // * THIS NEEDS TO CHANGE

    useEffect(async () => {
        let res = await fetch("http://localhost:3000/api/get_tasks", {
            method: "POST",
            body: JSON.stringify({
                user_id: user_id,
            }),
        });
        // let res = await fetch('http://localhost:3000/api/get_tasks')
        let json = await res.json();
        let tasks = json.data;
        setExistingContent(tasks);
        console.log(tasks);
    }, [setExistingContent]);

    const pages = [
        // { label: "Board", value: "board" },
        { label: "Table", value: "table" },
        // { label: "Calendar", value: "calendar" },
    ];
    // console.log(content);

    // * This declares what page we're on (Board/Table/Calendar)
    const [value, setValue] = useState(pages[0].value);
    // * This defines if editing an existing task modal is open
    const [modalOpened, setModalOpened] = useState(false);
    // * This is the ID of the currently selected existing task
    const [selectedID, setSelectedID] = useState(-1);

    const [newTaskModalOpened, setNewTaskModalOpened] = useState(false);

    let clickCard = (id) => {
        console.log(id);
        setSelectedID(id);
        setModalOpened(true);
    };

    let addCard = () => {
        setNewTaskModalOpened(true);
        console.log("add a new task");
    };

    return (
        <div>
            <SegmentedControl
                value={value}
                onChange={setValue}
                data={pages}
                size="lg"
            />
            <Space h="sm" />
            {/* <Divider /> */}
            {/* {value == "board" && (
                <Board content={content} clickCard={(i) => clickCard(i)} />
            )} */}
            {value == "table" && (
                <Table
                    content={existingContent}
                    clickCard={(i) => clickCard(i)}
                    addCard={() => addCard()}
                />
            )}
            {/* {value == "calendar" && <Calendar content={content} />} */}
            {/* // * This is our `EditTask` for editing existing tasks */}
            {existingContent.length > 0 && (
                <EditTask
                    content={
                        existingContent.length > 0 &&
                        (selectedID != -1
                            ? existingContent.find(
                                  (c) => c["_id"] == selectedID
                              )
                            : existingContent[0])
                    }
                    opened={modalOpened}
                    setOpened={setModalOpened}
                />
            )}
            {/* // * This is our `EditTask` for editing a newly created task */}
            <EditTask
                content={empty_content}
                opened={newTaskModalOpened}
                setOpened={setNewTaskModalOpened}
            ></EditTask>
        </div>
    );
};

export default MainContent;
