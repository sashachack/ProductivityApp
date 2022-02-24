import { AppShell, Navbar, Header, Title, Text } from "@mantine/core";
import { useState } from "react";
import Board from "../content/board";
import Table from "../content/table";
import Calendar from "../content/calendar";
import { SegmentedControl, Divider, Space } from "@mantine/core";
import { content } from "../../constants/items_constants";

const MainContent = () => {
    const pages = [
        { label: "Board", value: "board" },
        { label: "Table", value: "table" },
        { label: "Calendar", value: "calendar" },
    ];

    const [value, setValue] = useState(pages[0].value);
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
            {value == "board" && <Board content={content} />}
            {value == "table" && <Table content={content} />}
            {value == "calendar" && <Calendar content={content} />}
        </div>
    );
};

export default MainContent;
