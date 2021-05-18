import React, { useState, useCallback } from 'react';
import {Button, Popover, Grid, Divider} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import {useSwitchMapDriver, useSwitchMapType} from './../../config/redux/hooks';

const MAP_DRIVERS = [
    {
        name: 'GoogleMap',
        value: 'gmap',
    },
    {
        name: 'Mapbox',
        value: 'mapbox',
    },
];

const MAP_TYPES = [
    {
        name: 'Satellite',
        value: 'satellite',
    },
    {
        name: 'Roadmap',
        value: 'roadmap',
    },
    {
        name: 'Terrain',
        value: 'terrain',
    },
];

const MapSettingsContent = (props) => {
    const {switchMapDriver} = useSwitchMapDriver();
    const {switchMapType} = useSwitchMapType();


    return (
        <Grid container spacing={1} className="common-map-map-settings-content">
            <Grid container item>
                <h3>Driver</h3>
                <Grid container item spacing={1}>
                    {
                        MAP_DRIVERS.map(driver => {
                            return (
                                <Button variant="outlined"
                                        color="primary"
                                        onClick={() => {
                                            switchMapDriver(driver.value)
                                        }}
                                >
                                    {driver.name}
                                </Button>
                            );
                        })
                    }
                </Grid>
            </Grid>


            <Grid container item>
                <h3>Map Types</h3>
                <Grid container item spacing={1}>
                    {
                        MAP_TYPES.map(mapType => {
                            return (
                                <Button variant="outlined"
                                        color="primary"
                                        onClick={() => {
                                            switchMapType(mapType.value);
                                        }}
                                >
                                    {mapType.name}
                                </Button>
                            );
                        })
                    }
                </Grid>
            </Grid>
        </Grid>
    );
};

export default function MapSettings(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (e) => {
      setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
      setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'map-settings-popover' : undefined;

  return (
    <div className="common-map-map-settings">
        <Button
            id="geocore-map-settings-btn"
            className="geocore-btn MuiPaper-elevation1"
            startIcon={<SettingsIcon />}
            onClick={handleClick}
        >
            Map Settings
        </Button>

        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <MapSettingsContent {...props} />
        </Popover>
    </div>
  );
};
