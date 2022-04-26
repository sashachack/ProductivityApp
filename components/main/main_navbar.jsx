import {
    AppShell,
    Navbar,
    Header,
    Title,
    Text,
    Card,
    Modal,
    Menu,
    Space,
    Input,
    Button,
    ActionIcon,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const MainNavbar = ({
    collection,
    setCollection,
    collectionID,
    curCollections,
    getCollections,
    setCurCollections,
    // pull
}) => {
    // let names = ["Nash", "Skylar", "Sasha"];
    let [newModalOpen, setNewModalOpen] = useState(false);
    let [delModalOpen, setDelModalOpen] = useState(false);
    let [delId, setDelId] = useState(-1);
    let [newCollectionName, setNewCollectionName] = useState("");
    const { data: session, status } = useSession();
    console.log(session);
    // console.log(curCollections);

    let close = () => {
        if (newCollectionName === "") {
            setNewModalOpen(false);
            return;
        }
        let data = {
            email: session.user.email,
            collection: newCollectionName,
        };
        // data["email"] = session.user.email;
        // console.log(data);
        let sendNewCollection = async () => {
            await fetch("/api/post_collection", {
                method: "POST",
                body: JSON.stringify(data),
            });
            setNewCollectionName("");
        };
        sendNewCollection().then(() => {
            getCollections();
        });
        setNewModalOpen(false);
    };

    // useEffect(() => {
    //     return () => {
    //         setCurCollections(null);
    //         setIsMounted(false);
    //     }
    // }, []);

    let addCollection = () => {
        console.log("add collection");
        setNewModalOpen(true);
    };

    let clickCollection = (col) => {
        setCollection(col);
    };

    let clickDelCollection = (e, colId) => {
        e.stopPropagation();
        console.log(colId);
        setDelId(colId);
        setDelModalOpen(true);
    };

    let closeDelModal = () => {
        setDelModalOpen(false);
        setDelId(-1);
    };

    let delCollection = () => {
        const id = delId;
        let delCol = async () => {
            // data["email"] = session.user.email; //need to pass in the email to link to the account

            await fetch("/api/delete_collection", {
                method: "POST",
                body: JSON.stringify({
                    id: id,
                }),
            });
        };
        delCol().then(() => {
            getCollections();
        });
        // setDelModalOpen(f)
        closeDelModal();
        let filtered = curCollections.filter((c) => c["_id"] != id);
        setCurCollections(filtered);
    };

    return (
        <div
            className="cont"
            style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <div>
                {curCollections.map((n, i) => (
                    <div key={`${n.collection}-${i}`}>
                        {n.collection == collection ? (
                            <Card
                                sx={(theme) => ({
                                    backgroundColor: "#00bbff77",
                                    fontWeight: "bold",
                                    boxShadow: "0px 0px 5px rgba(0,0,0, 0.5)",
                                    overflow: "visible",
                                })}
                            >
                                {n.collection}
                                <div
                                    style={{
                                        backgroundColor: "white",
                                        width: "4px",
                                        height: "90%",
                                        borderRadius: "20px",
                                        position: "absolute",
                                        left: "-8px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                    }}
                                ></div>
                            </Card>
                        ) : (
                            <Card
                                sx={(theme) => ({
                                    backgroundColor: "#66668822",
                                    "&:hover": {
                                        backgroundColor: "#44445566",
                                        cursor: "pointer",
                                    },
                                })}
                                // key={`${n.collection}-${i}`}
                                onClick={() => clickCollection(n.collection)}
                            >
                                <ActionIcon
                                    style={{
                                        position: "absolute",
                                        right: "15px",
                                    }}
                                    onClick={(e) =>
                                        clickDelCollection(e, n._id)
                                    }
                                >
                                    <FontAwesomeIcon
                                        icon={faTrashCan}
                                        style={{
                                            fontSize: 20,
                                            color: "#aaaaaa",
                                        }}
                                    ></FontAwesomeIcon>
                                </ActionIcon>
                                <div>{n.collection}</div>
                            </Card>
                        )}
                        <Space h="sm" />
                    </div>
                ))}
                <Card
                    sx={(theme) => ({
                        backgroundColor: "#44445522",
                        "&:hover": {
                            backgroundColor: "#44445566",
                            cursor: "pointer",
                        },
                    })}
                    onClick={() => addCollection()}
                >
                    + Add Collection
                </Card>

                <Modal
                    centered
                    transition="fade"
                    transitionDuration={600}
                    // transitionTimingFunction="ease"
                    opened={newModalOpen}
                    onClose={close}
                    onKeyUp={(e) => {
                        if (e.keyCode === 13) {
                            close();
                        }
                    }}
                    hideCloseButton
                >
                    <Input
                        size="xl"
                        variant="unstyled"
                        placeholder="Untitled"
                        value={newCollectionName}
                        onChange={(e) => {
                            setNewCollectionName(e.target.value);
                        }}
                    ></Input>
                </Modal>
                <Modal
                    centered
                    transition="fade"
                    transitionDuration={600}
                    opened={delModalOpen}
                    onClose={() => closeDelModal()}
                    title="Are you sure you want to delete this collection?"
                >
                    <div className="flex justify-evenly">
                        <Button onClick={() => delCollection()}>Delete</Button>
                        <Button onClick={() => closeDelModal()}>Cancel</Button>
                    </div>
                </Modal>
            </div>
            <Menu
                trigger="hover"
                position="top"
                control={
                    <Card
                        style={{
                            backgroundColor: "#333333",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <div
                            style={{
                                borderRadius: "100px",
                                overflow: "hidden",
                                position: "relative",
                                width: "60px",
                                height: "60px",
                                boxShadow: "0 0 5px rgba(0,0,0,0.4)",
                            }}
                        >
                            <Image
                                src={session.user.image}
                                alt="User Image"
                                width="60px"
                                height="60px"
                                layout="fixed"
                                objectFit="cover"
                            ></Image>
                        </div>
                        <span
                            style={{ marginLeft: "15px", fontWeight: "bold" }}
                        >
                            {session.user.name}
                        </span>
                    </Card>
                }
            >
                <Menu.Item onClick={() => signOut()}>Sign Out</Menu.Item>
            </Menu>
        </div>
    );
};

export default MainNavbar;
