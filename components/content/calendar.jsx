import CalendarCard from "../elements/calendar_card";
import { Text, Title, Grid, SimpleGrid, Card, Space, Center} from "@mantine/core";
import { months } from "../../constants/months";
import { useState } from 'react';

let Calendar = ({ content }) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const [selected, setSelected] = useState({'day': today.getDate(), 'month': today.getMonth(), 'year': today.getFullYear()});
    const firstOfMonthDay = new Date(selected.year, selected.month, 1).getDay();
    const lastDayofMonthDate = new Date(selected.year, selected.month + 1, 0).getDate()
    const lastDayOfLastMonthDate = new Date(selected.year, selected.month, 0).getDate();
    console.log(firstOfMonthDay)
    console.log(lastDayOfLastMonthDate)
    const genDays = () => {
        let days = [];
        for (let i = lastDayOfLastMonthDate - firstOfMonthDay + 1; i <= lastDayOfLastMonthDate; i++) {
            days.push({date: i, month: selected.month - 1, year: selected.year}); // won't work for january
        }
        for (let i = 1; i <= lastDayofMonthDate; i++) {
            days.push({date: i, month: selected.month, year: selected.year});
        }
        return days;
    }
    const switchMonth = (direction) => {
        let newMonth = selected.month + direction;
        let newYear = selected.year;
        if (newMonth == 12) {
            newMonth = 0;
            newYear++;
        }
        else if (newMonth == -1) {
            newMonth = 11;
            newYear--;
        }

        setSelected({'day': selected.day, 'month': newMonth, 'year': newYear});
    }
    const buttonStyle = {fontWeight: 'bold', color: 'white', padding: '5px', width: '30px', backgroundColor: '#232323', borderRadius: '5px', margin: '10px', cursor: 'pointer'}
    return (
        <>
            <Center>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div style={buttonStyle} 
                    onClick={() => switchMonth(-1)}>{'<'}</div>
                    <Title order={3}>{`${months[selected.month]} ${selected.year}`}</Title>
                    <div style={buttonStyle} onClick={() => switchMonth(+1)}>{'>'}</div>
                </div>
            </Center>
            <Space h="sm" />
            <SimpleGrid cols={7}>
                {days.map(d => 
                    <Card style={{color: '#cccccc', fontWeight: 'bold', textAlign: 'center', backgroundColor: '#aaddff34'}} key={d}>
                        {d.toUpperCase()}
                    </Card>)
                }
            </SimpleGrid>
            <Space h='sm' />
            <SimpleGrid cols={7}>
                {genDays().map(({date, month, year}) => {
                    let cardStyle = {};
                    if (month != selected.month) {
                        cardStyle = {backgroundColor: '#ffffff05', color: '#777777'}
                    }
                    else if (date === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                        cardStyle = {backgroundColor: '#7799aa', color: '#ffffff'};
                    }
                    cardStyle = {...cardStyle, ...{height: '70px'}}
                    return (
                        <Card 
                            style={cardStyle}
                            key={`${date}-${month}-${year}`}>
                            <div style={{position: 'absolute', left: '6px', top: '6px'}}>
                                {date}
                            </div>
                        </Card>
                    )
                })}
            </SimpleGrid>
        </>
    )
};
export default Calendar;
