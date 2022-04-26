import { Text } from "@mantine/core";
import { colors } from "../../constants/colors";

export default function CalendarCard({
    name,
    id,
    status,
    label,
    labels,
    click,
}) {
    const handleClick = (e) => {
        e.stopPropagation();
        click(id);
    };

    // get the index of the label
    let labelIndex = labels.findIndex((l) => l.label === label);
    let labelColor = labelIndex != -1 ? colors[labelIndex] : "#2F2F36";

    const statusColors = {
        "To Do": "bg-todo",
        Doing: "bg-doing",
        Done: "bg-done",
    };
    return (
        <div
            style={{ backgroundColor: labelColor }}
            className={`rounded w-full overflow-hidden p-1 cursor-pointer shadow-md flex justify-between items-center`}
            onClick={(e) => handleClick(e)}
        >
            <Text>{name}</Text>
            <div className="pr-1">
                <div
                    className={`${statusColors[status]} w-[8px] h-[8px] rounded-full shadow-md`}
                ></div>
            </div>
        </div>
    );
}
