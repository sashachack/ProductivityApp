import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { MantineProvider, Button, Checkbox, Avatar, Text } from "@mantine/core";
import Layout from "../components/main/layout";
import SignIn from "../components/elements/sign_in";
import { useState } from "react";

export default function Home() {
    const { data: session, status } = useSession();
    console.log("-----------");
    console.log(session);
    console.log(status);

    const [authModalOpened, setAuthModalOpened] = useState(true);

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="diescription"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MantineProvider theme={{ colorScheme: "dark" }}>
                <Layout />
                {!session && (
                    <SignIn
                        opened={true}
                        setOpened={() => setAuthModalOpened(false)}
                    ></SignIn>
                )}
                {session && (
                    <div>
                        <Text>Welcome {session.user.name}! </Text>
                        <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} onClick={() => signOut()}>Sign Out</Button>
                    </div>
                )}
            </MantineProvider>
        </div>
    );
}
