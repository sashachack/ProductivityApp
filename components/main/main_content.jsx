import { useState } from "react";
import Board from "../content/board";
import Table from "../content/table";
import Calendar from "../content/calendar";
import EditTask from "../elements/edit_task";
import NewTask from "../elements/new_task";
import {
    AppShell,
    Navbar,
    Header,
    Title,
    Text,
    Menu,
    SegmentedControl,
    Divider,
    Space,
    Select,
} from "@mantine/core";
// import { content } from "../../constants/items_constants";
import { empty_content } from "../../constants/new_task";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faFilter } from "@fortawesome/free-solid-svg-icons";

// TODO - the DOM only updates with new tasks
// TODO - if there's already one there; otherwise you need to refresh
// TODO - FIX THIS

const MainContent = ({ collection, collectionID }) => {
    const { data: session, status } = useSession();
    const pages = [
        { label: "Board", value: "board" },
        { label: "Table", value: "table" },
        { label: "Calendar", value: "calendar" },
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
    // * The date, for the calendar
    const [newTaskDate, setNewTaskDate] = useState(null);
    // * Defines what we sort by
    const [sortBy, setSortBy] = useState("dateCreated");

    // * pullTasks is a function that will pull the tasks from the database
    const pullTasks = async () => {
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

        // console.log("UPDATE EVERYTHING");
        setExistingContent(tasks);
    };

    // useEffect(() => {
    //     if (sortBy === "dueDate") {
    //         let t = existingContent.sort((a, b) => {
    //             // console.log(a, b);
    //             if (a.dueDate.year < b.dueDate.year) {
    //                 return -1;
    //             } else if (a.dueDate.year > b.dueDate.year) {
    //                 return 1;
    //             }
    //             if (a.dueDate.month < b.dueDate.month) {
    //                 return -1;
    //             } else if (a.dueDate.month > b.dueDate.month) {
    //                 return 1;
    //             }
    //             if (a.dueDate.day < b.dueDate.day) {
    //                 return -1;
    //             } else if (a.dueDate.day > b.dueDate.day) {
    //                 return 1;
    //             }
    //             return 0;
    //         });
    //         setExistingContent(t);
    //     } else if (sortBy === "dateCreated") {
    //         let t = existingContent.sort((a, b) => {
    //             return parseInt(a._id, 16) - parseInt(b._id, 16);
    //         });
    //         setExistingContent(t);
    //     }
    // }, [existingContent, sortBy]);

    // TODO - useSwr()

    // * This is run to fetch the tasks from the API
    useEffect(() => {
        // console.log(tasks);
        pullTasks();
    }, [
        newTaskModalOpened,
        setNewTaskModalOpened,
        collectionID,
        // pullTasks
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

    let addCard = (status = "To Do", date = null) => {
        console.log(
            `Adding card with status ${status} and date ${JSON.stringify(date)}`
        );
        if (date !== null) setNewTaskDate(date);
        setNewTaskStatus(status);
        setNewTaskModalOpened(true);
        // console.log("add a new task");
    };

    return (
        <div>
            <div className="relative">
                <SegmentedControl
                    value={value}
                    onChange={setValue}
                    data={pages}
                    size="lg"
                />
                <div className="absolute top-3 right-0 flex text-white space-x-4">
                    {/* <Select
                        data={[
                            { label: "Date Created", value: "dateCreated" },
                            { label: "Due Date", value: "dueDate" },
                        ]}
                        value={sortBy}
                        onChange={(e) => setSortBy(e)}
                    /> */}
                    {/* {value !== "calendar" && (
                        <Menu
                            control={
                                <div className="bg-card-grey w-8 h-8 rounded-md flex items-center justify-center hover:bg-gray-100 hover:text-black cursor-pointer">
                                    <FontAwesomeIcon icon={faSort} />
                                </div>
                            }
                        >
                            <Menu.Label>Sort By</Menu.Label>
                            <Menu.Item onClick={() => setSortBy("dateCreated")}>
                                Date Created
                            </Menu.Item>
                            <Menu.Item onClick={() => setSortBy("dueDate")}>
                                Due Date
                            </Menu.Item>
                        </Menu>
                    )}
                    <Menu
                        control={
                            <div className="bg-card-grey w-8 h-8 rounded-md flex items-center justify-center hover:bg-gray-100 hover:text-black cursor-pointer">
                                <FontAwesomeIcon icon={faFilter} />
                            </div>
                        }
                    >
                        <Menu.Label>Filter By</Menu.Label>
                        {value !== "board" && <Menu.Item>Status</Menu.Item>}
                        <Menu.Item>Label</Menu.Item>
                    </Menu> */}
                </div>
            </div>
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
            {value == "calendar" && (
                <Calendar
                    content={existingContent}
                    clickCard={(i) => clickCard(i)}
                    addCard={(d) => addCard("To Do", d)}
                />
            )}
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
                    pullTasks={pullTasks}
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
                taskDate={newTaskDate}
                collectionID={collectionID}
                pullTasks={pullTasks}
                curPage={value}
            ></NewTask>
        </div>
    );
};

export default MainContent;
