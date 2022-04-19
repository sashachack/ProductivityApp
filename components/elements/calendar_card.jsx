import { Text } from "@mantine/core";

export default function CalendarCard({ name, id, click }) {
    const handleClick = (e) => {
        e.stopPropagation();
        click(id);
    };
    return (
        <div
            className="rounded bg-light-grey w-full overflow-hidden p-1 cursor-pointer shadow-md"
            onClick={(e) => handleClick(e)}
        >
            <Text>{name}</Text>
        </div>
    );
}
