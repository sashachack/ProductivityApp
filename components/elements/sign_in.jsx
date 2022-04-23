import { Modal, Button, Center, Space, Title } from "@mantine/core";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import Image from "next/image";

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
                className="text-center"
                // classNames
                // size={"xl"}
            >
                {/* <Center> */}
                <Title order={2}>Welcome to</Title>
                {/* </Center> */}
                {/* <Image
                    src="/capable_logo.svg"
                    alt="capable logo"
                    height={300}
                    width={300}
                    className="fixed"
                /> */}
                <Space h="sm"></Space>

                <Title order={1} className="text-white">
                    CAPABLE
                </Title>

                <Space h="xl"></Space>

                {/* <Center> */}
                <Title order={4}>Sign in to make your life easier!</Title>
                {/* </Center> */}
                <Space h="xl"></Space>
                {/* <Space h="xl"></Space> */}

                {/* <Center> */}
                <Button
                    // variant="gradient"
                    // gradient={{ from: "teal", to: "blue", deg: 60 }}
                    // style={{ backgroundColor: "#212225" }}
                    className="bg-day-grey hover:bg-[#212122]"
                    onClick={() => {
                        signIn("google");
                    }}
                    // onClick={() => storeInfo(session)}
                >
                    Sign In
                </Button>
                {/* </Center> */}
            </Modal>
        </>
    );
};

export default SignIn;
