import { AppShell, Navbar, Header, Title, Text } from "@mantine/core";
import { useState } from "react";
import Board from "../content/board";
import Table from "../content/table";
import Calendar from "../content/calendar";
import EditTask from "../elements/edit_task";
import NewTask from "../elements/new_task";
import { SegmentedControl, Divider, Space } from "@mantine/core";
// import { content } from "../../constants/items_constants";
import { empty_content } from "../../constants/new_task";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

// TODO - the DOM only updates with new tasks
// TODO - if there's already one there; otherwise you need to refresh
// TODO - FIX THIS

const MainContent = ({ collection, collectionID }) => {
    const { data: session, status } = useSession();
    const pages = [
        { label: "Board", value: "board" },
        { label: "Table", value: "table" },
        // { label: "Calendar", value: "calendar" },
    ];
    // console.log(content);

    // * This is our content, to be displayed throughout the app
    const [existingContent, setExistingContent] = useState([]);
    // * This declares what page we're on (Board/Table/Calendar)
    const [value, setValue] = useState(pages[0].value);
    // * This decides whether the newTaskPopup is open
    const [newTaskModalOpened, setNewTaskModalOpened] = useState(false);
    // * This defines if editing an existing task modal is open
    const [modalOpened, setModalOpened] = useState(false);
    // * This is the ID of the currently selected existing task
    const [selectedID, setSelectedID] = useState(-1);
    // * This is the status of a new task, used for the board view when a new task
    // * is added. Outside the board view, tasks are defaulted to "To Do"
    const [newTaskStatus, setNewTaskStatus] = useState("To Do");

    // * This is run to fetch the tasks from the API
    useEffect(async () => {
        console.log("pulling tasks");
        let res = await fetch("/api/get_tasks", {
            method: "POST",
            body: JSON.stringify({
                email: session.user.email, //grab the tasks by email
                collectionID: collectionID,
            }),
        });

        let json = await res.json();
        let tasks = json.data;
        console.log("UPDATE EVERYTHING");
        setExistingContent(tasks);
        // console.log(tasks);
    }, [
        // existingContent,
        newTaskModalOpened,
        setNewTaskModalOpened,
        collectionID,
        // existingContent,
        // dragItem,
    ]);

    // * If collection changes, then setExistingContent to empty
    useEffect(() => {
        setExistingContent([]);
    }, [collection]);

    let clickCard = (id) => {
        // console.log()
        console.log(`Click card of ID ${id}`);
        setSelectedID(id);
        setModalOpened(true);
    };

    let addCard = (status = "To Do") => {
        // console.log(status);
        // console.log(`Add a card of type: ${status}`);
        // console.log(`Status!!!! : ${status}`);
        setNewTaskStatus(status);
        setNewTaskModalOpened(true);
        // console.log("add a new task");
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
            {value == "board" && (
                <Board
                    content={existingContent}
                    setContent={setExistingContent}
                    clickCard={(i) => clickCard(i)}
                    addCard={(l) => addCard(l)}
                />
            )}
            {value == "table" && (
                <Table
                    content={existingContent}
                    setContent={setExistingContent}
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
                    setContent={setExistingContent} // ! This will probably not work
                    opened={modalOpened}
                    setOpened={setModalOpened}
                />
            )}
            {/* // * This is our `EditTask` for editing a newly created task */}
            <NewTask
                // content={newContent}
                // editContent={setNewContent}
                opened={newTaskModalOpened}
                setOpened={setNewTaskModalOpened}
                content={existingContent}
                setContent={setExistingContent}
                taskStatus={newTaskStatus}
                collectionID={collectionID}
            ></NewTask>
        </div>
    );
};

export default MainContent;
