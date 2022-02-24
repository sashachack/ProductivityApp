import { AppShell, Navbar, Header, Title, Text } from "@mantine/core";

const MainNavbar = () => {
    let names = ["Nash", "Skylar", "Sasha"];

    return (
        <div>
            {names.map((n, i) => (
                <Text color="white" key={i} my={20}>
                    {n}
                </Text>
            ))}
        </div>
    );
};

export default MainNavbar;
