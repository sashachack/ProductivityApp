import { AppShell, Navbar, Header, Title, Text, Card, Modal } from "@mantine/core";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";


const MainNavbar = () => {
    // let names = ["Nash", "Skylar", "Sasha"];
    let [curCollections, setCurCollections] = useState([]);
    let [modalOpen, setModalOpen] = useState(false);
    const { data: session, status } = useSession();

    // let [isMounted, setIsMounted] = useState(false);

    let close = () => {
        setModalOpen(false);

    }

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
            console.log(collections)
            setCurCollections(collections)
        // }
        
    }, [])

    // useEffect(() => {
    //     return () => {
    //         setCurCollections(null);
    //         setIsMounted(false);
    //     }
    // }, []);

    let addCollection = () =>{
        console.log('add colllection')
        setModalOpen(true);

    }

    return (
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
    );
};

export default MainNavbar;
