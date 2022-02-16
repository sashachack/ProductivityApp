import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Button, Checkbox } from "@mantine/core";

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>Hello</div>
            <Button>Settings</Button>
            <Checkbox></Checkbox>
        </div>
    );
}
