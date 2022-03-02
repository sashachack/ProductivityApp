import { Card, Text, SimpleGrid } from "@mantine/core";
import { months } from "../../constants/months";

const TableCard = ({ taskName, label, dueDate, status }) => {
    let printDate = (date) => {
        return months[date.month - 1] + " " + date.day + ", " + date.year;
    };

    return (
        <div>
            <Card>
                {/* <div> */}
                <SimpleGrid cols={4}>
                    <Text weight="500" size="lg" color="white">
                        {taskName}
                    </Text>
                    <Text size="sm">{label}</Text>
                    <Text size="sm">{printDate(dueDate)}</Text>
                    <Text size="sm">{status}</Text>
                </SimpleGrid>
                {/* </div> */}
            </Card>
        </div>
    );
};

export default TableCard;
