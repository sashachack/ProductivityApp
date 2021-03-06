/* eslint-disable react-hooks/exhaustive-deps */
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
    JsonInput,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
// import { empty_content } from "../../constants/new_task";

const empty_content = (s = "To Do", d = null) => {
    let obj = {
        title: "",
        label: "",
        status: s,
        dueDate: {},
        collectionID: "",
    };

    if (d !== null) {
        obj.dueDate = d;
    }

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
    taskDate,
    collectionID,
    pullTasks,
    curPage,
    labels,
    setLabels,
}) {
    const { data: session, status } = useSession();

    // const[labels, setLabels] = useState([
    //     { value: "SEW", label: "SEW" },
    //     { value: "332", label: "332" },
    //     { value: "330", label: "330" },
    //     { value: "457", label: "457" },
    // ])

    // * This represents the temporary task, not yet sent to the back-end
    // console.log(empty_content(taskStatus));
    const [localContent, setLocalContent] = useState(empty_content(taskStatus));
    useEffect(async () => {
        setLocalContent(empty_content(taskStatus, taskDate));
    }, [taskStatus, taskDate]);

    let today = new Date();

    let addLabel = async (new_labels) => {
        console.log(new_labels);

        let data = { email: session.user.email, labels: new_labels };

        console.log(data);

        let res = await fetch("/api/update_labels", {
            method: "POST",
            body: JSON.stringify(data),
        });
    };

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
        sendNewTask().then(() => {
            console.log(`Successfully added new task`);
            pullTasks();
        });
        setOpened(false);
    };

    return (
        <>
            <Modal
                centered
                transition="fade"
                transitionDuration={600}
                opened={opened}
                onClose={close}
                onKeyUp={(e) => {
                    if (e.keyCode === 13) {
                        close();
                    }
                }}
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

                    <Select
                        placeholder="Select Label"
                        searchable
                        creatable
                        getCreateLabel={(query) => `+ Create ${query}`}
                        onChange={(e) => {
                            // console.log(e.target.value);
                            const c_copy = JSON.parse(
                                JSON.stringify(localContent)
                            );
                            c_copy.label = e;
                            setLocalContent(c_copy);
                        }}
                        // onChange={(e) => {
                        //     console.log(e);
                        // }}
                        onCreate={(query) => {
                            const c_copy = JSON.parse(
                                JSON.stringify(localContent)
                            );
                            c_copy.label = query;
                            setLocalContent(c_copy);

                            let temp = JSON.parse(JSON.stringify(labels));
                            temp.push({ label: query });
                            setLabels(temp);
                            addLabel(temp);
                        }}
                        data={labels.map((l) => ({
                            value: l.label,
                            label: l.label,
                        }))}
                        value={localContent.label}
                    />

                    {/* <Space h="sm" /> */}
                    <DatePicker
                        placeholder="Pick date"
                        label="Event date"
                        value={
                            curPage !== "calendar"
                                ? null
                                : new Date(
                                      localContent.dueDate.year,
                                      localContent.dueDate.month,
                                      localContent.dueDate.day
                                  )
                        }
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
