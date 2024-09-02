/** @format */

import { createContext } from "react";
import { ContextValue } from "@/types/";

const MyContext = createContext<ContextValue>({
    updateData: function (): void {
        console.log("working...")
    }
});

export default MyContext;