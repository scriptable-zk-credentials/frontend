import { useState } from 'react'
import { HoldersTab, SchemasTab, CredentialsTab, SyncTab, InstancesTab } from './tabs'
import { Tabs, Tab, Box } from '@mui/material'


export function Issuer() {
    const [activeTab, setActiveTab] = useState<string>("holders")

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setActiveTab(newValue);
    };

    const displayActiveTab = () => {
        switch (activeTab) {
            case "holders":
                return <HoldersTab/>
            case "schemas":
                return <SchemasTab/>
            case "credentials":
                return <CredentialsTab/>
            case "sync":
                return <SyncTab/>
            case "instances":
                return <InstancesTab/>
            default:
                return <></>
        }
    }

    return(
        <>
            <b>Issuer Page</b>
            <Box sx={{ width: '100%' }}>
                <Tabs
                    value={activeTab}
                    onChange={handleChange}
                >
                    <Tab value="holders" label="Holders"></Tab>
                    <Tab value="credentials" label="Credentials" />
                    <Tab value="instances" label="Instances" />
                    <Tab value="schemas" label="Schemas" />
                    <Tab value="sync" label="Sync" />
                </Tabs>
            </Box>
            {displayActiveTab()}
        </>
    )
}