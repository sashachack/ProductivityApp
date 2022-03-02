import BoardCard from "../elements/board_card";
import { Space, SimpleGrid, Title } from "@mantine/core";

let Board = ({ content, clickCard }) => {
    let statuses = ["To Do", "Doing", "Done"];
    let items = {};
    for (let status of statuses) {
        items[status] = content.filter((c) => c.status == status);
    }

    // let clickCard = (id) => {
    //     console.log(id);
    // };

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
                {statuses.map((s, i) => (
                    <div key={i}>
                        {items[s].map((c, j) => (
                            <div key={j}>
                                <BoardCard
                                    taskName={c.title}
                                    label={c.label}
                                    dueDate={c.dueDate}
                                    id={c.id}
                                    click={(id) => clickCard(id)}
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
