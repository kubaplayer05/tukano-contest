"use client"

import {ReactNode} from "react";
import {motion} from "framer-motion";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

export default function Template({children}: { children: ReactNode }) {

    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <motion.div initial={{opacity: 0}}
                        animate={{opacity: 1}}>
                {children}
            </motion.div>
        </QueryClientProvider>
    )
}
