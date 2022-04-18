import { Text } from "@mantine/core";

export default function CalendarCard({ name, id, click }) {
    return (
        <div
            className="rounded bg-slate-500 w-full overflow-hidden p-1 cursor-pointer"
            onClick={() => click(id)}
        >
            <Text>{name}</Text>
        </div>
    );
}
