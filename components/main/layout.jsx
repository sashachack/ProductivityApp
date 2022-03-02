import { AppShell, Navbar, Header, Title, Text, Space } from "@mantine/core";
import MainNavbar from "./main_navbar";
import MainContent from "./main_content";
import { useEffect } from "react";

let Layout = () => {
    useEffect(async () => {
    let res = await fetch("http://localhost:3000/api/get_tasks", {
    method: "POST",
    body: JSON.stringify({
        user_id: 1,
      }),
    });
    let tasks = await res.json();
    console.log(tasks)
    },[])

    return (
        <AppShell
            padding="xl"
            navbar={
                <Navbar width={{ base: 300 }} padding="md">
                    <MainNavbar />
                </Navbar>
            }
            styles={(theme) => ({
                main: {
                    backgroundColor:
                        theme.colorScheme === "dark"
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0],
                },
            })}
        >
            <Title order={1}>Tasks</Title>
            <Space h="sm" />
            <MainContent />
        </AppShell>
    );
};

export default Layout;
