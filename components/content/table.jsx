import TableCard from "../elements/table_card";
import {
    Space,
    SimpleGrid,
    Text,
    Title,
    Card,
    useMantineTheme,
} from "@mantine/core";

let Table = ({ content, clickCard }) => {
    let cards = content.map((c, i) => (
        <div key={i}>
            <TableCard
                taskName={c.title}
                label={c.label}
                dueDate={c.dueDate}
                status={c.status}
                id={c["_id"]}
                click={(id) => clickCard(id)}
            />
            <Space h="md" />
        </div>
    ));
    const theme = useMantineTheme();

    let sections = ["Title", "Label", "Due Date", "Status"];

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
        </div>
    );
};
export default Table;
