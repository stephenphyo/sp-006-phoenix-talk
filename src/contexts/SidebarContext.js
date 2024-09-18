import { createContext, useState } from 'react';

/*** Context ***/
const SidebarContext = createContext();
export default SidebarContext;

/*** Context Provider ***/
export const SidebarContextProvider = (props) => {

    /* useState */
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    /* Context Values */
    const value = {
        isSidebarOpen, setIsSidebarOpen
    };

    return (
        <SidebarContext.Provider value={value}>
            {props.children}
        </SidebarContext.Provider>
    );
}