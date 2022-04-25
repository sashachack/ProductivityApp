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
    const [taskAvailable, setTaskAvailable] = useState(false);
    const [curCollections, setCurCollections] = useState([]);
    

    useEffect(async () => {
        let res = await fetch("/api/get_collection_id", {
            method: "POST",
            body: JSON.stringify({
                email: session.user.email, //grab the tasks by email
                collection_name: curCollection,
            }),
        });

        // let json = await res.json();
        let info = await res.json(); //.then((info) => {
        console.log(info);
        if (info.data.length == 0) {
            let data = {
                email: session.user.email,
                collection: curCollection,
            };
            // data["email"] = session.user.email;
            // console.log(data);
            const createCollection = async () => {
                return await fetch("/api/post_collection", {
                    method: "POST",
                    body: JSON.stringify(data),
                });
            };
            let res = await createCollection();
            let json = await res.json();
            // console.log("Created a new collection response:");
            // console.log(json);
            setCurCollectionID(json._id);
            setTaskAvailable(true);
            // return info;
        } else {
            setCurCollectionID(info.data[0]._id);
            setTaskAvailable(true);
        }

       
    }, [curCollection]);

    const getCollections = async () => {
        let res1 = await fetch("/api/get_collections", {
            method: "POST",
            body: JSON.stringify({
                email: session.user.email, //grab the tasks by email
            }),
        });

        let json1 = await res1.json();
        let collections = json1.data;
        // console.log(collections);
        setCurCollections(collections);
    };
    useEffect(() => {
        // if(isMounted){
        getCollections();
        // }
    }, [curCollectionID]);

    const renderMain = () => {
        if (session) {
            if (taskAvailable) {
                console.log("task is...");
                console.log(taskAvailable);
                return (
                    <MainContent
                        collection={curCollection}
                        collectionID={curCollectionID}
                    />
                );
            } else {
            }
        }
    };

    return (
        <AppShell
            padding="xl"
            navbar={
                <Navbar width={{ base: 300 }} padding="md">
                    <MainNavbar
                        collection={curCollection}
                        setCollection={setCurCollection}
                        collectionID={curCollectionID}
                        curCollections={curCollections}
                        getCollections={getCollections}
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
            {renderMain()}
        </AppShell>
    );
};

export default Layout;
