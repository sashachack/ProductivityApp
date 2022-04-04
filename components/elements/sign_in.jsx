import { Modal, Button, Center, Space, Title } from "@mantine/core";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

const SignIn = ({ opened, setOpened }) => {
    // const { data: session, status } = useSession();

    return (
        // <div></div>
        <>
            <Modal
                centered
                transition="fade"
                transitionDuration={600}
                // transitionTimingFunction="ease"
                opened={opened}
                onClose={() => setOpened(false)}
                hideCloseButton
                // size={"xl"}
            >
                <Center>
                    <Title order={2}>Welcome to TaskMaster!</Title>
                </Center>

                <Space h="xl"></Space>

                <Center>
                    <Title order={4}>Sign in to make your life easier!</Title>
                </Center>
                <Space h="xl"></Space>
                {/* <Space h="xl"></Space> */}

                <Center>
                    <Button
                        variant="gradient"
                        gradient={{ from: "teal", to: "blue", deg: 60 }}
                        onClick={() => {
                            signIn("google");
                        }}
                        // onClick={() => storeInfo(session)}
                    >
                        Sign In
                    </Button>
                </Center>
            </Modal>
        </>
    );
};

export default SignIn;
