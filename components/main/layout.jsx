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

    return (
        <AppShell
            padding="xl"
            navbar={
                <Navbar width={{ base: 300 }} padding="md">
                    <MainNavbar collection={curCollection} />
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
            {session && <MainContent collection={curCollection} />}
        </AppShell>
    );
};

export default Layout;
