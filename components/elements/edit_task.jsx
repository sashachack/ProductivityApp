import {
    Modal,
    Button,
    Group,
    Title,
    Input,
    Space,
    Select,
    Textarea,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useState } from "react";

const EditTask = ({ content, opened, setOpened }) => {
    // const [opened, setOpened] = useState(false);
    console.log(content);

    return (
        <>
            <Modal
                centered
                transition="fade"
                transitionDuration={600}
                // transitionTimingFunction="ease"
                opened={opened}
                onClose={() => setOpened(false)}
                hideCloseButton
            >
                {/* <Input variant="unstyled" placeholder="Untitled">
                    Task Name
                </Input> */}
                <div>
                    <Input
                        size="xl"
                        variant="unstyled"
                        placeholder="Untitled"
                        value={content.title}
                        onChange={() => console.log("Fix this later")}
                    ></Input>
                    <Select
                        label="Status"
                        data={[
                            { value: "To Do", label: "To Do" },
                            { value: "Doing", label: "Doing" },
                            { value: "Done", label: "Done" },
                        ]}
                        value={content.status}
                    ></Select>
                    <Space h="sm" />
                    <Select
                        label="Label"
                        data={[
                            { value: "SEW", label: "SEW" },
                            { value: "332", label: "332" },
                            { value: "330", label: "330" },
                            { value: "457", label: "457" },
                        ]}
                        value={content.label}
                    ></Select>
                    <Space h="sm" />
                    <DatePicker
                        placeholder="Pick date"
                        label="Event date"
                        value={
                            new Date(
                                content.dueDate.year,
                                content.dueDate.month - 1,
                                content.dueDate.day
                            )
                        }
                    ></DatePicker>
                    <Space h="sm" />
                    <Textarea
                        placeholder="Write some notes..."
                        label="Comments"
                    />
                </div>
            </Modal>
            {/* <Button onClick={() => setOpened(true)}></Button> */}
        </>
    );
};

export default EditTask;
