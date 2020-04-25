import React, { useState, useCallback } from 'react';
import {Button, Popover, Grid, Container, Divider} from '@material-ui/core';
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
            <Container zeroMinWidth
                       className="common-map-map-settings-content">.

            <Grid container
                  spacing={1}
                  zeroMinWidth>

                <Grid container item>
                    <h3>Driver</h3>
                </Grid>

                <Grid container
                      item
                      zeroMinWidth
                      className="common-map-map-settings-content-item-body">
                    {
                        MAP_DRIVERS.map(driver => {
                            return (
                                <Button variant="outlined"
                                        color="primary"
                                        noWrap
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


            <Grid container
                  spacing={1}
                  zeroMinWidth>

                <Grid container
                      item
                >
                    <h3>Map Types</h3>
                </Grid>

                <Grid container
                      item
                      zeroMinWidth
                      className="common-map-map-settings-content-item-body">
                    {
                        MAP_TYPES.map(mapType => {
                            return (
                                <Button variant="outlined"
                                        color="primary"
                                        noWrap
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
        </Container>
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
