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

const EditTask = ({
    content,
    setContent,
    opened,
    setOpened,
    pullTasks,
    labels,
    setLabels,
}) => {
    const { data: session, status } = useSession();
    // const [opened, setOpened] = useState(false);
    // console.log(content);
    // console.log(JSON.stringify(content));
    // console.log(Object.keys(content));
    // console.log(JSON.stringify(content["dueDate"]));

    // let user_id = 7; // ! CHANGE THIS

    // console.log(`AND NOW CONTENT IS ${JSON.stringify(content)}`);

    const [localContent, setLocalContent] = useState(content);
    if (localContent === undefined) {
        setLocalContent({
            title: "",
            label: "",
            status: "",
            dueDate: { year: 0, month: 0, day: 0 },
        });
    }

    // if (content === undefined) {
    //     console.log("UNDEFINED");
    //     setLocalContent({
    //         title: "",
    //         label: "",
    //         status: "",
    //         dueDate: { year: 0, month: 0, day: 0 },
    //     });
    // } else {
    //     setLocalContent(content);
    // }
    // * Modify localContent if content is changed
    useEffect(() => {
        // * if content is undefined
        if (content === undefined) {
            // console.log("UNDEFINED");
            setLocalContent({
                title: "",
                label: "",
                status: "",
                dueDate: { year: 0, month: 0, day: 0 },
            });
        } else {
            setLocalContent(content);
        }
    }, [content]);

    // console.log(content);
    // console.log(localContent);
    // TODO - make sure to also edit global content

    let close = () => {
        // setLocalContent(localContent);
        // console.log(localContent);

        let sendNewTask = async () => {
            // let data = localContent;

            //localContent["user_id"] = user_id;
            // localContent["dueDate"] = { year: 2022, month: 4, day: 8 };
            localContent["email"] = session.user.email; //need to pass in the email to link to the account

            let data = {
                id: localContent["_id"],
                update: {
                    title: localContent.title,
                    label: localContent.label,
                    status: localContent.status,
                    dueDate: localContent.dueDate,
                },
            };

            await fetch("/api/edit_task", {
                method: "POST",
                body: JSON.stringify(data),
            });
        };
        sendNewTask().then(() => {
            console.log(`Successfully edited task`);
            pullTasks();
        });
        // sendNewTask().then(() => {
        setOpened(false);
        // });
    };

    let today = new Date();

    return (
        <>
            <Modal
                centered
                transition="fade"
                transitionDuration={600}
                // transitionTimingFunction="ease"
                opened={opened}
                onClose={close}
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
                        value={
                            localContent && localContent.title
                                ? localContent.title
                                : ""
                        }
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
                        value={
                            localContent && localContent.status
                                ? localContent.status
                                : ""
                        }
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
                            // console.log(e)
                            const c_copy = JSON.parse(
                                JSON.stringify(localContent)
                            );
                            c_copy.label = e;
                            setLocalContent(c_copy);
                        }}
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
                        value={
                            localContent &&
                            Object.keys(localContent).includes("label")
                                ? localContent.label
                                : ""
                        }
                    />
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
                            // console.log(e);
                            // console.log(typeof e.getMonth());
                            const c_copy = JSON.parse(
                                JSON.stringify(localContent)
                            );
                            // c_copy.dueDate.year = e.getFullYear();
                            // c_copy.dueDate.month = e.getMonth();
                            // c_copy.dueDate.day = e.getDay();
                            let date = {
                                year: e.getFullYear(),
                                month: e.getMonth(),
                                day: e.getDate(),
                            };
                            c_copy["dueDate"] = date;
                            setLocalContent(c_copy);
                        }}
                        value={
                            localContent && localContent.dueDate
                                ? new Date(
                                      localContent.dueDate.year,
                                      localContent.dueDate.month,
                                      localContent.dueDate.day
                                  )
                                : new Date(0, 0, 0)
                        }
                    ></DatePicker>
                    {/* <Text color="white">{JSON.stringify(content.dueDate)}</Text> */}
                    {/* <Space h="sm" /> */}
                    {/* <Textarea
                        placeholder="Write some notes..."
                        label="Comments"
                    /> */}
                </div>
            </Modal>
            {/* <Button onClick={() => setOpened(true)}></Button> */}
        </>
    );
};

export default EditTask;
