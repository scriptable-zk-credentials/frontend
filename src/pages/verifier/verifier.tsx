import { useState } from 'react'
import { HoldersTab, AdminsTab } from './tabs'
import { Tabs, Tab, Box } from '@mui/material'


export function Verifier() {
    const [activeTab, setActiveTab] = useState<string>("holders")

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setActiveTab(newValue);
    };

    const displayActiveTab = () => {
        switch (activeTab) {
            case "holders":
                return <HoldersTab/>
            case "admins":
                return <AdminsTab/>
            default:
                return <></>
        }
    }

    document.title = 'Verifer'
    return(
        <>
            <b>Relying Party Page</b>
            <Box sx={{ width: '100%' }}>
                <Tabs
                    value={activeTab}
                    onChange={handleChange}
                >
                    <Tab value="holders" label="Holders"></Tab>
                    <Tab value="admins" label="Admins" />
                </Tabs>
            </Box>
            {displayActiveTab()}
        </>
    )
}