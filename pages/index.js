import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { MantineProvider, Button, Checkbox } from "@mantine/core";
import Layout from "../components/main/layout";

export default function Home() {
    const { data: session, status } = useSession();
    console.log("-----------");
    console.log(session);
    console.log(status);

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MantineProvider theme={{ colorScheme: "dark" }}>
                <Layout />
            </MantineProvider>

            {!session && (
                <>
                    Not signed in <br />
                    <button onClick={() => signIn()}>Sign in</button>
                </>
            )}

            {session && (
                <>
                    <h4>You are logged in as: {session.user.name}</h4>
                    <button onClick={() => signOut()}>Sign Out</button>
                </>
            )}
        </div>
    );
}
