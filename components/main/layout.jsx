import { AppShell, Navbar, Header, Title, Text, Space } from "@mantine/core";
import MainNavbar from "./main_navbar";
import MainContent from "./main_content";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

let Layout = () => {
    const { data: session, status } = useSession();

    // useEffect(() => {
      
    //     let post_user = async() => {
            
    //             await fetch("http://localhost:3000/api/post_user", {
    //             method: "POST",
    //             body: JSON.stringify({
                    
                    
    //                 hello: 'hello',
    //             }),
    //         })
    //     };

    //     post_user(); 
       
    // }, [])
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
            {session && <MainContent />}
        </AppShell>
    );
};

export default Layout;
