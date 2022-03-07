import { AppShell, Navbar, Header, Title, Text, Space } from "@mantine/core";
import MainNavbar from "./main_navbar";
import MainContent from "./main_content";

let Layout = () => {
    return (
        <AppShell
            padding="xl"
            // navbar={
            //     <Navbar width={{ base: 300 }} padding="md">
            //         <MainNavbar />
            //     </Navbar>
            // }
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
