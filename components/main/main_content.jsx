import { AppShell, Navbar, Header, Title, Text } from "@mantine/core";
import { useState } from "react";
import Board from "../content/board";
import Table from "../content/table";
import Calendar from "../content/calendar";
import EditTask from "../elements/edit_task";
import { SegmentedControl, Divider, Space } from "@mantine/core";
// import { content } from "../../constants/items_constants";
import { useEffect } from "react";

const MainContent = () => {
    const [content, setContent] = useState([]);
    useEffect(async () => {
        let res = await fetch("http://localhost:3000/api/get_tasks", {
            method: "POST",
            body: JSON.stringify({
                user_id: 3,
            }),
        });
        // let res = await fetch('http://localhost:3000/api/get_tasks')
        let json = await res.json();
        let tasks = json.data;
        setContent(tasks);
        console.log(tasks);
    }, [setContent]);

    const pages = [
        // { label: "Board", value: "board" },
        { label: "Table", value: "table" },
        // { label: "Calendar", value: "calendar" },
    ];
    // console.log(content);

    const [value, setValue] = useState(pages[0].value);
    const [modalOpened, setModalOpened] = useState(false);
    const [selectedID, setSelectedID] = useState(-1);

    let clickCard = (id) => {
        console.log(id);
        setSelectedID(id);
        setModalOpened(true);
    };

    let addCard = () => {
        setModalOpened(true);
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
                    content={content}
                    clickCard={(i) => clickCard(i)}
                    addCard={() => addCard()}
                />
            )}
            {/* {value == "calendar" && <Calendar content={content} />} */}
            {content.length > 0 && (
                <EditTask
                    content={
                        content.length > 0 &&
                        (selectedID != -1
                            ? content.find((c) => c["_id"] == selectedID)
                            : content[0])
                    }
                    opened={modalOpened}
                    setOpened={setModalOpened}
                />
            )}
        </div>
    );
};

export default MainContent;
