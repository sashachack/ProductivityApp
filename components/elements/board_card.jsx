import { Card, Text } from "@mantine/core";
import { months } from "../../constants/months";
import { colors } from "../../constants/colors";

const BoardCard = ({ taskName, label, dueDate, id, click, labels }) => {
    // console.log(months);
    let printDate = (date) => {
        return months[date.month] + " " + date.day + ", " + date.year;
    };

    let labelIndex = labels.findIndex((l) => l.label === label);
    let labelColor = labelIndex != -1 ? colors[labelIndex] : "#2F2F36";

    return (
        <div>
            <Card
                onClick={() => click(id)}
                style={{ "&:hover": { backgroundColor: "#333333" } }}
            >
                <Text weight="500" size="lg" color="white">
                    {taskName}
                </Text>
                <Text size="sm" color={labelColor}>
                    {label}
                </Text>
                <Text size="sm">{printDate(dueDate)}</Text>
            </Card>
        </div>
    );
};

export default BoardCard;
