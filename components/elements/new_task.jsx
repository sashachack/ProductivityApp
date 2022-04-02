import {
    Modal,
    Button,
    Group,
    Title,
    Input,
    Space,
    Select,
    Textarea,
    Text,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
// import { empty_content } from "../../constants/new_task";

const empty_content = (s = "To Do") => {
    const obj = {
        title: "",
        label: "",
        status: s,
        dueDate: {},
        collectionID: "",
    };
    // console.log("RIGHT HERE");
    // console.log(obj);
    return obj;
};

export default function NewTask({
    opened,
    setOpened,
    content,
    setContent,
    taskStatus,
    collectionID,
    setNewTaskinDB,
}) {
    const { data: session, status } = useSession();

    // * This represents the temporary task, not yet sent to the back-end
    // console.log(empty_content(taskStatus));
    const [localContent, setLocalContent] = useState(empty_content(taskStatus));
    useEffect(() => {
        setLocalContent(empty_content(taskStatus));
    }, [taskStatus]);

    let today = new Date();

    // * This method will be run upon the closing of the `new task` element, and
    // * will send the data to the backend and reset the `new task` element
    let close = () => {
        let data = JSON.parse(JSON.stringify(localContent));
        console.log(data);
        if (localContent.label === "" && localContent.title === "") {
            console.log("No data inputted as a new task");
            setOpened(false);
            return;
        }
        data.title = data.title.length > 0 ? data.title : "Untitled";

        data.dueDate =
            Object.keys(data.dueDate).length != 0
                ? data.dueDate
                : {
                      year: today.getFullYear(),
                      month: today.getMonth(),
                      day: today.getDate(),
                  };
        data["email"] = session.user.email; //need to pass in the email to link to the account
        data["collection_id"] = collectionID;
        console.log(data);
        let sendNewTask = async () => {
            await fetch("/api/post_tasks", {
                method: "POST",
                body: JSON.stringify({
                    data,
                }),
            });
            setLocalContent(empty_content(taskStatus));
        };
        sendNewTask()
            .then(setOpened(false))
            .then(() => {
                console.log("got here");
            });
        // setOpened(false);
    };

    return (
        <>
            <Modal
                centered
                transition="fade"
                transitionDuration={600}
                opened={opened}
                onClose={close}
                hideCloseButton
            >
                <div>
                    <Input
                        size="xl"
                        variant="unstyled"
                        placeholder="Untitled"
                        value={localContent.title}
                        onChange={(e) => {
                            const c_copy = JSON.parse(
                                JSON.stringify(localContent)
                            );
                            c_copy.title = e.target.value;
                            setLocalContent(c_copy);
                        }}
                    ></Input>
                    <Select
                        label="Status"
                        data={[
                            { value: "To Do", label: "To Do" },
                            { value: "Doing", label: "Doing" },
                            { value: "Done", label: "Done" },
                        ]}
                        value={localContent.status}
                        onChange={(e) => {
                            // console.log(e);
                            const c_copy = JSON.parse(
                                JSON.stringify(localContent)
                            );
                            c_copy.status = e;
                            setLocalContent(c_copy);
                        }}
                    ></Select>
                    <Space h="sm" />
                    <Text size="sm" style={{ fontWeight: "bold" }}>
                        Label
                    </Text>
                    <Space h="5px" />
                    <Input
                        placeholder="Untitled"
                        value={localContent.label}
                        onChange={(e) => {
                            const c_copy = JSON.parse(
                                JSON.stringify(localContent)
                            );
                            c_copy.label = e.target.value;
                            setLocalContent(c_copy);
                        }}
                    ></Input>
                    {/* <Select
                        label="Label"
                        data={[
                            { value: "SEW", label: "SEW" },
                            { value: "332", label: "332" },
                            { value: "330", label: "330" },
                            { value: "457", label: "457" },
                        ]}
                        value={content.label}
                    ></Select> */}
                    {/* <Space h="sm" /> */}
                    <DatePicker
                        placeholder="Pick date"
                        label="Event date"
                        firstDayOfWeek="sunday"
                        dayStyle={(date) => {
                            if (
                                date.getDate() === today.getDate() &&
                                date.getMonth() === today.getMonth() &&
                                date.getFullYear() === today.getFullYear()
                            ) {
                                return {
                                    backgroundColor: "#88bbff",
                                    color: "#000000",
                                };
                            } else if (
                                date.getDay() === 0 ||
                                date.getDay() === 6
                            ) {
                                return {
                                    color: "#88bbff",
                                };
                            } else {
                                null;
                            }
                        }}
                        onChange={(e) => {
                            const c_copy = JSON.parse(
                                JSON.stringify(localContent)
                            );
                            let date = {
                                year: e.getFullYear(),
                                month: e.getMonth(),
                                day: e.getDate(),
                            };
                            c_copy["dueDate"] = date;
                            setLocalContent(c_copy);
                        }}
                    ></DatePicker>
                </div>
            </Modal>
        </>
    );
}
