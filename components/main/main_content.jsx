import { AppShell, Navbar, Header, Title, Text } from "@mantine/core";
import { useState } from "react";
import Board from "../content/board";
import Table from "../content/table";
import Calendar from "../content/calendar";
import EditTask from "../elements/edit_task";
import { SegmentedControl, Divider, Space } from "@mantine/core";
import { content } from "../../constants/items_constants";

const MainContent = () => {
    const pages = [
        { label: "Board", value: "board" },
        { label: "Table", value: "table" },
        { label: "Calendar", value: "calendar" },
    ];

    const [value, setValue] = useState(pages[0].value);
    const [modalOpened, setModalOpened] = useState(false);
    const [selectedID, setSelectedID] = useState(0);

    let clickCard = (id) => {
        setSelectedID(id);
        setModalOpened(true);
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
                <Board content={content} clickCard={(i) => clickCard(i)} />
            )}
            {value == "table" && (
                <Table content={content} clickCard={(i) => clickCard(i)} />
            )}
            {value == "calendar" && <Calendar content={content} />}
            <EditTask
                content={content.find((c) => c.id == selectedID)}
                opened={modalOpened}
                setOpened={setModalOpened}
            />
        </div>
    );
};

export default MainContent;
