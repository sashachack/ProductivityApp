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

    //     let res = await fetch("/api/get_labels", {
    //         method: "POST",
    //         body: JSON.stringify({
    //             email: session.user.email, //grab the tasks by email

    //         }),
    //     });

    //     let data = await res.json()

    //     let labels = data.data[0].labels
    //     setLabels(labels)
    // }, [taskStatus, taskDate]);

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
                    {/* <Input
                        placeholder="Untitled"
                        value={localContent.label}
                        onChange={(e) => {
                            const c_copy = JSON.parse(
                                JSON.stringify(localContent)
                            );
                            c_copy.label = e.target.value;
                            setLocalContent(c_copy);
                        }}
                    ></Input> */}
                    {/* <Select
                    
                    placeholder="Select Label"
                    searchable
                    creatable
                    // value={localContent.label}
                    getCreateLabel={(query) => `+ Create ${query}`}
                    onSelect={(e) => {
                        
                        const c_copy = JSON.parse(
                            JSON.stringify(localContent)
                        );
                        c_copy.label = e.target.value;
                        console.log(e.target.value)
                        setLocalContent(c_copy);
                        
                        
                    }}
                    onCreate={(query) => {
                        setLabels((current) => [...current, query])
                        console.log(query)
                        // console.log(labels)
                        labels.push({label: query})
                        setLabels(labels)
                        console.log(labels)
                        addLabel(labels)
                        // const c_copy = JSON.parse(
                        //     JSON.stringify(localContent)
                        // );
                        // c_copy.label = query;
                        // console.log(c_copy)
                        // setLocalContent(c_copy);

                        }}
                    data={labels}
                    value = {localContent.label}
                    
                    /> */}
                    <Select
                        placeholder="Select Label"
                        searchable
                        creatable
                        getCreateLabel={(query) => `+ Create ${query}`}
                        onSelect={(e) => {
                            // console.log(e)
                            const c_copy = JSON.parse(
                                JSON.stringify(localContent)
                            );
                            c_copy.label = e.target.value;
                            console.log(e.target.value);
                            console.log(c_copy);
                            setLocalContent(c_copy);
                            console.log(localContent);
                        }}
                        onCreate={(query) => {
                            setLabels((current) => [...current, query]);
                            console.log(query);
                            // console.log(labels)
                            labels.push({ label: query });
                            setLabels(labels);
                            console.log(labels);
                            addLabel(labels);
                        }}
                        data={labels}
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
