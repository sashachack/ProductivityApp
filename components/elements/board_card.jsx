import { Card, Text } from "@mantine/core";
import { months } from "../../constants/months";

const BoardCard = ({ taskName, label, dueDate, id, click }) => {
    // console.log(months);
    let printDate = (date) => {
        return months[date.month] + " " + date.day + ", " + date.year;
    };

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
                <Text size="sm">{printDate(dueDate)}</Text>
            </Card>
        </div>
    );
};

export default BoardCard;
