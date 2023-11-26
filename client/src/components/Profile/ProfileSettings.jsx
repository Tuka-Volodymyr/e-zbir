import React, { useState } from 'react';
import { Button, Drawer, Space } from 'antd';

import ProfileSettingsCss from './ProfileSettings.module.css'
const ProfileSettings = (props) =>{

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    return(
        <div className = {ProfileSettingsCss.content}>
            <Space>
                <img className={ProfileSettingsCss.settingsLink} src="/img/settings.svg" alt="settings" onClick={showDrawer}/>
            </Space>
            <Drawer
                title="Settings"
                placement='bottom'
                onClose={onClose}
                open={open}
                extra={
                    <Space>
                        <Button type="primary" onClick={onClose}>
                            Зберегти
                        </Button>
                    </Space>
                }
            >
                <form>
                    <input placeholder="Fullname" type="text"/>
                    <input placeholder='Number' type="text"/>
                    <input placeholder='Email' type="text"/>
                    <input placeholder='Password' type="text"/>
                </form>
            </Drawer>
        </div>
    );
};

export default ProfileSettings;