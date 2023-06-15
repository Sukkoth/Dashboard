import { createContext, useState } from 'react';

export const LayoutContext = createContext({});

const LayoutProvider = ({ children }) => {
    const [sidebarToggle, setSidebarToggle] = useState(true);
    return (
        <LayoutContext.Provider
            value={{
                sidebarToggle,
                setSidebarToggle,
            }}
        >
            {children}
        </LayoutContext.Provider>
    );
};

export default LayoutProvider;
