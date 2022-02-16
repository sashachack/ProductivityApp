import { AppShell, Navbar, Header, Title, Text } from "@mantine/core";

let Layout = () => {
    let names = ["Nash", "Skylar", "Sasha"];

    return (
        <AppShell
            padding="xl"
            navbar={
                <Navbar width={{ base: 300 }} padding="md">
                    <div>
                        {names.map((n, i) => (
                            <Text color="white" key={i} my={20}>
                                {n}
                            </Text>
                        ))}
                    </div>
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
        </AppShell>
    );
};

export default Layout;
