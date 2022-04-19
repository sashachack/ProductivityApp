import TableCard from "../elements/table_card";
import {
    Space,
    SimpleGrid,
    Text,
    Title,
    Card,
    useMantineTheme,
} from "@mantine/core";
// import { useHover } from "@mantine/hooks";

let Table = ({ content, setContent, clickCard, addCard }) => {
    let cards =
        content.length > 0 &&
        content.map((c, i) => (
            <div key={i}>
                <TableCard
                    taskName={c.title}
                    label={c.label}
                    dueDate={c.dueDate}
                    status={c.status}
                    id={c["_id"]}
                    click={(id) => clickCard(id)}
                    content={content}
                    setContent={setContent}
                />
                <Space h="md" />
            </div>
        ));
    const theme = useMantineTheme();

    let sections = ["Title", "Label", "Due Date", "Status"];

    // const { hovered, ref } = useHover();

    // let addTaskBg = ;


    return (
        <div>
            <Card
                style={{ backgroundColor: "#44445522" }}
                sx={() => {
                    backgroundColor: theme.colors.blue[8];
                }}
            >
                <SimpleGrid cols={4}>
                    {sections.map((s, i) => (
                        <Title key={i} order={4}>
                            {s}
                        </Title>
                    ))}
                </SimpleGrid>
            </Card>
            <Space h="md" />
            {cards}
            <Card
                // ref={ref}
                // style={{
                //     backgroundColor: { hovered ? "#44445522" : "#44445522" },
                // }}

                sx={(theme) => ({
                    backgroundColor: "#44445522",
                    "&:hover": {
                        backgroundColor: "#44445566",
                        cursor: "pointer",
                    },
                })}
                onClick={() => addCard()}
            >
                + Add Task
            </Card>
        </div>
    );
};
export default Table;
