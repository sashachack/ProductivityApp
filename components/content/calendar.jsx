import CalendarCard from "../elements/calendar_card";
import {
    Text,
    Title,
    Grid,
    SimpleGrid,
    Card,
    Space,
    Center,
} from "@mantine/core";
import { months } from "../../constants/months";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

let Calendar = ({ content, clickCard }) => {
    console.log(content);

    const today = new Date();
    const [selected, setSelected] = useState({
        day: today.getDate(),
        month: today.getMonth(),
        year: today.getFullYear(),
    });
    const firstOfMonthDay = new Date(selected.year, selected.month, 1).getDay();
    const lastDayofMonthDate = new Date(
        selected.year,
        selected.month + 1,
        0
    ).getDate();
    const lastDayOfLastMonthDate =
        selected.month != 0
            ? new Date(selected.year, selected.month, 0).getDate()
            : new Date(selected.year - 1, 11, 0).getDate();

    const genDays = () => {
        let days = [];
        for (
            let i = lastDayOfLastMonthDate - firstOfMonthDay + 1;
            i <= lastDayOfLastMonthDate;
            i++
        ) {
            if (selected.month === 0) {
                days.push({ day: i, month: 11, year: selected.year - 1 });
            } else {
                days.push({
                    date: i,
                    month: selected.month - 1,
                    year: selected.year,
                });
            }
        }
        for (let i = 1; i <= lastDayofMonthDate; i++) {
            days.push({ date: i, month: selected.month, year: selected.year });
        }
        return days;
    };
    const switchMonth = (direction) => {
        let newMonth = selected.month + direction;
        let newYear = selected.year;
        if (newMonth == 12) {
            newMonth = 0;
            newYear++;
        } else if (newMonth == -1) {
            newMonth = 11;
            newYear--;
        }

        setSelected({ day: selected.day, month: newMonth, year: newYear });
    };
    return (
        <>
            <Center>
                <SimpleGrid className="w-full" cols={3}>
                    <div className="font-bold text-white flex justify-end">
                        <div
                            onClick={() => switchMonth(-1)}
                            className="rounded-full bg-gray-800 flex justify-around items-center w-8 h-8 cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faCaretLeft} />
                        </div>
                    </div>
                    <Title
                        order={2}
                        className="flex align-center justify-center"
                    >
                        {`${months[selected.month]} ${selected.year}`}
                    </Title>
                    <div
                        onClick={() => switchMonth(1)}
                        className="font-bold text-white flex justify-start"
                    >
                        <div className="rounded-full bg-gray-800 flex justify-around items-center w-8 h-8 cursor-pointer">
                            <FontAwesomeIcon icon={faCaretRight} />
                        </div>
                    </div>
                </SimpleGrid>
            </Center>
            <Space h="sm" />
            <SimpleGrid cols={7}>
                {days.map((d) => (
                    <Card
                        style={{
                            color: "#cccccc",
                            fontWeight: "bold",
                            textAlign: "center",
                            backgroundColor: "#aaddff34",
                        }}
                        key={d}
                    >
                        {d.toUpperCase()}
                    </Card>
                ))}
            </SimpleGrid>
            <Space h="sm" />
            <SimpleGrid cols={7}>
                {genDays().map(({ date, month, year }) => {
                    let isToday = false;
                    let isThisMonth = true;
                    if (month != selected.month) {
                        isThisMonth = false;
                    } else if (
                        date === today.getDate() &&
                        month === today.getMonth() &&
                        year === today.getFullYear()
                    ) {
                        isToday = true;
                    }
                    let todaysTasks = content.filter(
                        (task) =>
                            task.dueDate.day === date &&
                            task.dueDate.month === month &&
                            task.dueDate.year === year
                    );
                    let circle = isToday ? "bg-blue-300 rounded-full" : "";
                    let opacity = isThisMonth ? "opacity-100" : "opacity-30";
                    return (
                        <div
                            className={`relative rounded-md bg-card-grey text-white flex h-14 ${opacity}`}
                            key={`${date}-${month}-${year}`}
                        >
                            <div className="p-1">
                                <div
                                    className={`w-6 h-6 flex justify-around items-center ${circle}`}
                                >
                                    {date}
                                </div>
                            </div>
                            <div className="w-full overflow-scroll no-scrollbar space-y-2 p-2">
                                {todaysTasks.map((task) => (
                                    <CalendarCard
                                        key={task._id}
                                        name={task.title}
                                        id={task._id}
                                        click={(i) => clickCard(i)}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </SimpleGrid>
        </>
    );
};
export default Calendar;
