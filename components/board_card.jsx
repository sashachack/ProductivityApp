import { Card, Text } from "@mantine/core";

const BoardCard = ({ taskName, label, dueDate }) => {
    return (
        <div>
            <Card>
                <Text weight="500" size="lg" color="white">
                    {taskName}
                </Text>
                <Text size="sm">{label}</Text>
                <Text size="sm">{dueDate}</Text>
            </Card>
        </div>
    );
};

export default BoardCard;
