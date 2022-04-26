import { Card, Text, SimpleGrid, Badge } from "@mantine/core";
import { months } from "../../constants/months";
import { ActionIcon } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBuildingCircleExclamation,
    faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../constants/colors";

const TableCard = ({
    taskName,
    label,
    dueDate,
    status,
    id,
    click,
    content,
    setContent,
    labels,
}) => {
    // console.log(content);
    let labelIndex = labels.findIndex((l) => l.label === label);
    let labelColor = labelIndex != -1 ? colors[labelIndex] : "#2F2F36";

    let printDate = (date) => {
        return months[date.month] + " " + date.day + ", " + date.year;
    };

    let del = (e) => {
        console.log(e);
        try {
            e.stopPropagation();
        } catch (error) {
            console.log(error);
        }
        e.preventDefault();
        let delTask = async () => {
            // data["email"] = session.user.email; //need to pass in the email to link to the account

            await fetch("/api/delete_task", {
                method: "POST",
                body: JSON.stringify({
                    id: id,
                }),
            });
        };
        delTask();
        let filteredContent = content.filter((c) => c["_id"] != id);
        setContent(filteredContent);
    };

    let statusColor = (currStatus) => {
        if (currStatus == "To Do") {
            return "pink";
        } else if (currStatus == "Doing") {
            return "yellow";
        } else return "green";
    };

    return (
        <div>
            <Card
                onClick={() => click(id)}
                // style={{ backgroundColor: labelColor }}
            >
                {/* <div> */}
                <ActionIcon
                    style={{ position: "absolute", right: "15px" }}
                    onClick={(e) => del(e)}
                >
                    <FontAwesomeIcon
                        icon={faTrashCan}
                        style={{ fontSize: 20, color: "#aaaaaa" }}
                    ></FontAwesomeIcon>
                </ActionIcon>
                <SimpleGrid cols={4} className="items-center">
                    <Text weight="500" size="lg" color="white">
                        {taskName}
                    </Text>
                    <Text size="sm" color={labelColor}>
                        {label}
                    </Text>
                    <Text size="sm">{printDate(dueDate)}</Text>
                    <div className="">
                        <Badge
                            radius="sm"
                            size="sm"
                            color={statusColor(status)}
                        >
                            {status}
                        </Badge>
                    </div>
                </SimpleGrid>
                {/* </div> */}
            </Card>
        </div>
    );
};

export default TableCard;
