import { AppShell, Navbar, Header, Title, Text, Space } from "@mantine/core";
import MainNavbar from "./main_navbar";
import MainContent from "./main_content";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

// TODO - changing status breaks the things

let Layout = () => {
    const { data: session, status } = useSession();

    // * A state to manage our current collection
    const [curCollection, setCurCollection] = useState("Tasks");
    const [curCollectionID, setCurCollectionID] = useState(0);

    useEffect(async () => {
        let res = await fetch("/api/get_collection_id", {
            method: "POST",
            body: JSON.stringify({
                email: session.user.email, //grab the tasks by email
                collection_name: curCollection,
            }),
        });

        let json = await res.json();
        console.log(json);
        setCurCollectionID(json.data[0]._id);
        console.log(curCollectionID);
        // console.log(tasks);
    }, [curCollection]);

    return (
        <AppShell
            padding="xl"
            navbar={
                <Navbar width={{ base: 300 }} padding="md">
                    <MainNavbar
                        collection={curCollection}
                        setCollection={setCurCollection}
                    />
                </Navbar>
            }
            height="100%"
            styles={(theme) => ({
                main: {
                    backgroundColor:
                        theme.colorScheme === "dark"
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0],
                    // height: "100%",
                },
            })}
        >
            <Title order={1}>{curCollection}</Title>
            <Space h="sm" />
            {session && (
                <MainContent
                    collection={curCollection}
                    collectionID={curCollectionID}
                />
            )}
        </AppShell>
    );
};

export default Layout;
