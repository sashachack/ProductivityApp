import { Card, Text, SimpleGrid } from "@mantine/core";

const TableCard = ({ taskName, label, dueDate, status }) => {
    return (
        <div>
            <Card>
                {/* <div> */}
                <SimpleGrid cols={4}>
                    <Text weight="500" size="lg" color="white">
                        {taskName}
                    </Text>
                    <Text size="sm">{label}</Text>
                    <Text size="sm">
                        {dueDate.month + "-" + dueDate.day + "-" + dueDate.year}
                    </Text>
                    <Text size="sm">{status}</Text>
                </SimpleGrid>
                {/* </div> */}
            </Card>
        </div>
    );
};

export default TableCard;
