import { Text } from "@mantine/core";

export default function CalendarCard({ name, id, status, click }) {
    const handleClick = (e) => {
        e.stopPropagation();
        click(id);
    };
    const colors = { "To Do": "bg-todo", Doing: "bg-doing", Done: "bg-done" };
    console.log(colors[status]);
    return (
        <div
            className="rounded bg-light-grey w-full overflow-hidden p-1 cursor-pointer shadow-md flex justify-between items-center"
            onClick={(e) => handleClick(e)}
        >
            <Text>{name}</Text>
            <div className="pr-1">
                <div
                    className={`${colors[status]} w-[8px] h-[8px] rounded-full shadow-md`}
                ></div>
            </div>
        </div>
    );
}
