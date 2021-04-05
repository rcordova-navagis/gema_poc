import React, { Fragment, useState, useCallback } from 'react';
import {
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
    Divider,
    Chip,
} from '@material-ui/core';


export default function UutListView(props) {
  return (
    <Card className="uut-uut-list-view">
        <CardContent>
            <List>
                {
                    props.data.map(row => (
                        <Fragment>
                            <ListItem alignItems="flex-start" key={row.id}>
                                <ListItemAvatar>
                                    <Avatar>{row.status.charAt(0)}</Avatar>
                                </ListItemAvatar>

                                <ListItemText
                                    primary={row.name}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="p"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                                {row.category && row.category.name}
                                            </Typography>

                                            <Chip color="primary"
                                                avatar={<Avatar>{row.status.charAt(0)}</Avatar>}
                                                  label={ row.dataset_queue ? `${row.dataset_queue.progress}%` : '0'}
                                            />
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </Fragment>
                    ))
                }
            </List>
        </CardContent>
    </Card>
  );
};
