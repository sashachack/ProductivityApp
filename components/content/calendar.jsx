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

let Calendar = ({ content, clickCard, addCard }) => {
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
                days.push({ date: i, month: 11, year: selected.year - 1 });
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
        let i = 1;
        while (days.length % 7 !== 0) {
            if (selected.month === 11) {
                days.push({ date: i, month: 0, year: selected.year + 1 });
            } else {
                days.push({
                    date: i,
                    month: selected.month + 1,
                    year: selected.year,
                });
            }
            i++;
        }
        // console.log(days);
        return days;
    };
    const renderDays = () => {
        let allDays = genDays();
        console.log(allDays.length);
        return allDays.map(({ date, month, year }) => {
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
            let height = allDays.length === 42 ? "h-16" : "h-20";
            return (
                <div
                    className={`relative rounded-md bg-card-grey text-white flex ${height} ${opacity}`}
                    key={`${date}-${month}-${year}`}
                    onClick={() => clickDay(date, month, year)}
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
        });
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
    const clickDay = (date, month, year) => {
        console.log(date, month, year);
        addCard({ year: year, month: month, day: date });
    };
    return (
        <div className="overflow-hidden h-full">
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
                    <div
                        className={` absolute border-blue-400 border-2 p-1 rounded-md ${
                            selected.month === today.getMonth() &&
                            selected.year === today.getFullYear()
                                ? "bg-blue-400 text-white"
                                : "text-blue-400 hover:bg-blue-400 hover:text-white cursor-pointer"
                        }`}
                        onClick={() =>
                            setSelected({
                                day: today.getDate(),
                                month: today.getMonth(),
                                year: today.getFullYear(),
                            })
                        }
                    >
                        TODAY
                    </div>
                </SimpleGrid>
            </Center>
            <Space h="sm" />
            <SimpleGrid cols={7}>
                {days.map((d) => (
                    <div
                        className="text-white font-bold text-center bg-day-grey rounded-md p-2 overflow-hidden"
                        key={d}
                    >
                        {d.toUpperCase()}
                    </div>
                ))}
            </SimpleGrid>
            <Space h="sm" />
            <SimpleGrid cols={7}>{renderDays()}</SimpleGrid>
        </div>
    );
};
export default Calendar;
