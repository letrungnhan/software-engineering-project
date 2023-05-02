import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom'
import {Box, List, ListItem, ListItemText} from '@mui/material'


const UserPlaylist = () => {
    const [playlist, setPlaylist] = useState([])
    const [loaded, setLoaded] = useState(false)

    return (
        <Box className='sidebar__user__playlist'>
            <List sx={{px: 2}}>
                {playlist?.map((item, index) => {
                    return (
                        <ListItem key={index} dense className='sidebar__items__link' component={NavLink}
                                  to={`/playlist/${item.id}`} activeClassName='active' exact={true}>
                            <ListItemText primary={item.name}/>
                        </ListItem>
                    )
                })}
            </List>
        </Box>
    )
}
export default UserPlaylist