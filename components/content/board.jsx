import BoardCard from "../board_card";
import { Space, SimpleGrid, Title } from "@mantine/core";

let Board = ({ content }) => {
    let statuses = ["To Do", "Doing", "Done"];
    let items = {};
    for (let status of statuses) {
        items[status] = content.filter((c) => c.status == status);
    }
    console.log(items);
    return (
        <div>
            <SimpleGrid cols={statuses.length}>
                {statuses.map((s, i) => (
                    <Title key={i} order={4}>
                        {s}
                    </Title>
                ))}
            </SimpleGrid>
            <Space h="sm"></Space>
            <SimpleGrid cols={statuses.length}>
                {statuses.map((s) => (
                    <div>
                        {items[s].map((c, i) => (
                            <div key={i}>
                                <BoardCard
                                    taskName={c.title}
                                    label={c.label}
                                    dueDate={c.dueDate}
                                />
                                <Space h="md" />
                            </div>
                        ))}
                    </div>
                ))}
            </SimpleGrid>
        </div>
    );
};

export default Board;
