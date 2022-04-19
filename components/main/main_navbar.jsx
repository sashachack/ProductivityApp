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
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

const MainNavbar = ({
    collection,
    setCollection,
    collectionID,
    curCollections,
    getCollections,
}) => {
    // let names = ["Nash", "Skylar", "Sasha"];
    let [modalOpen, setModalOpen] = useState(false);
    let [newCollectionName, setNewCollectionName] = useState("");
    const { data: session, status } = useSession();
    console.log(session);

    // let [isMounted, setIsMounted] = useState(false);

    let close = () => {
        if (newCollectionName === "") {
            setModalOpen(false);
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
        setModalOpen(false);
    };

    // useEffect(() => {
    //     return () => {
    //         setCurCollections(null);
    //         setIsMounted(false);
    //     }
    // }, []);

    let addCollection = () => {
        console.log("add collection");
        setModalOpen(true);
    };

    let clickCollection = (col) => {
        setCollection(col);
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

                                // onClick={() => addCollection()}
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
                                {n.collection}
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
                    opened={modalOpen}
                    onClose={close}
                    hideCloseButton
                >
                    <Input
                        size="xl"
                        variant="unstyled"
                        placeholder="Untitled"
                        value={newCollectionName}
                        onChange={(e) => {
                            // const c_copy = JSON.parse(
                            //     JSON.stringify(localContent)
                            // );
                            // c_copy.title = e.target.value;
                            setNewCollectionName(e.target.value);
                        }}
                    ></Input>
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
