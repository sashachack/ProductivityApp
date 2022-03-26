import {
    AppShell,
    Navbar,
    Header,
    Title,
    Text,
    Card,
    Modal,
    Menu,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

const MainNavbar = () => {
    // let names = ["Nash", "Skylar", "Sasha"];
    let [curCollections, setCurCollections] = useState([]);
    let [modalOpen, setModalOpen] = useState(false);
    const { data: session, status } = useSession();
    console.log(session);

    // let [isMounted, setIsMounted] = useState(false);

    let close = () => {
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
                    <Text color="white" key={i} my={20}>
                        {n.collection}
                    </Text>
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
                                width: "60px",
                                height: "60px",
                            }}
                        >
                            <Image
                                src={session.user.image}
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
