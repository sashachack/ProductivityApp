import { Card, Text } from "@mantine/core";

const BoardCard = ({ taskName, label, dueDate, id, click }) => {
    return (
        <div>
            <Card
                onClick={() => click(id)}
                style={{ "&:hover": { backgroundColor: "#333333" } }}
            >
                <Text weight="500" size="lg" color="white">
                    {taskName}
                </Text>
                <Text size="sm">{label}</Text>
                <Text size="sm">
                    {dueDate.month + "-" + dueDate.day + "-" + dueDate.year}
                </Text>
            </Card>
        </div>
    );
};

export default BoardCard;
