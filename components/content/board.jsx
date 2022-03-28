import BoardCard from "../elements/board_card";
import { Space, SimpleGrid, Title, Card } from "@mantine/core";

let Board = ({ content, setContent, clickCard, addCard }) => {
    // console.log(content);
    let statuses = ["To Do", "Doing", "Done"];
    let items = {};
    for (let status of statuses) {
        items[status] = content.filter((c) => c.status == status);
    }

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
            <SimpleGrid cols={statuses.length}>
                {statuses.map((s, i) => (
                    <div key={i}>
                        {items[s].map((c, j) => (
                            <div key={j}>
                                <BoardCard
                                    taskName={c.title}
                                    label={c.label}
                                    dueDate={c.dueDate}
                                    id={c["_id"]}
                                    click={(id) => clickCard(id)}
                                />
                                <Space h="md" />
                            </div>
                        ))}
                        {addCardButton(s)}
                    </div>
                ))}
            </SimpleGrid>
        </div>
    );
};

export default Board;
