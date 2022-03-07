import { Card, Text, SimpleGrid } from "@mantine/core";
import { months } from "../../constants/months";
import { ActionIcon } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const TableCard = ({ taskName, label, dueDate, status, id, click }) => {
    let printDate = (date) => {
        return months[date.month] + " " + date.day + ", " + date.year;
    };

    return (
        <div>
            <Card
                onClick={() => click(id)}
                style={{ "&:hover": { backgroundColor: "#333333" } }}
            >
                {/* <div> */}
                <ActionIcon style={{ position: "absolute", right: "15px" }}>
                    <FontAwesomeIcon
                        icon={faTrashCan}
                        style={{ fontSize: 20, color: "#aaaaaa" }}
                    ></FontAwesomeIcon>
                </ActionIcon>
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
