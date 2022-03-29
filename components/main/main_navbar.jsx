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
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

const MainNavbar = ({ collection, setCollection }) => {
    // let names = ["Nash", "Skylar", "Sasha"];
    let [curCollections, setCurCollections] = useState([]);
    let [modalOpen, setModalOpen] = useState(false);
    const { data: session, status } = useSession();
    console.log(session);

    // let [isMounted, setIsMounted] = useState(false);

    let close = () => {
        // let data = JSON.parse(JSON.stringify(localContent));
        // console.log(data)
        // data['email'] = session.user.email;
        // console.log(data)
        // let sendNewCollection = async () => {
        //     await fetch("/api/post_collection", {
        //         method: "POST",
        //         body: JSON.stringify({
        //             data,
        //         }),
        //     });
        //     setLocalContent({collection_name: ""});
        // };
        // sendNewCollection();
        setModalOpen(false);
    };

    useEffect(async () => {
        // if(isMounted){
        let res1 = await fetch("/api/get_collections", {
            method: "POST",
            body: JSON.stringify({
                email: session.user.email, //grab the tasks by email
            }),
        });

        let json1 = await res1.json();
        let collections = json1.data;
        console.log(collections);
        setCurCollections(collections);
        // }
    }, []);

    // useEffect(() => {
    //     return () => {
    //         setCurCollections(null);
    //         setIsMounted(false);
    //     }
    // }, []);

    let addCollection = () => {
        console.log("add colllection");
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
                    <>
                        {n.collection == collection ? (
                            <Card
                                sx={(theme) => ({
                                    backgroundColor: "#00bbff77",
                                    fontWeight: "bold",
                                    boxShadow: "0px 0px 5px rgba(0,0,0, 0.5)",
                                    overflow: "visible",
                                })}
                                key={i}
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
                                key={i}
                                onClick={() => clickCollection(n.collection)}
                            >
                                {n.collection}
                            </Card>
                        )}
                        <Space h="sm" />
                    </>
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
                ></Modal>
            </div>
            <Menu
                trigger="hover"
                position="top"
                control={
                    <Card
                        style={{
                            backgroundColor: "#333333",
                            // position: "absolute",
                            // bottom: "0",
                            display: "flex",
                            // justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <div
                            style={{
                                borderRadius: "100px",
                                overflow: "hidden",
                                width: "70px",
                                height: "70px",
                                backgroundColor: "#dddddd",
                                position: "relative",
                            }}
                        >
                            <div
                                style={{
                                    borderRadius: "100px",
                                    overflow: "hidden",
                                    position: "relative",
                                    width: "60px",
                                    height: "60px",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
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
