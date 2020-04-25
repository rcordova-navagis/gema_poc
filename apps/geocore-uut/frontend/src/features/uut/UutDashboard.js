import React, { useEffect, useState } from 'react';
import {Grid} from '@material-ui/core';
import {UutListItemDetails, UutLists} from "./index";
import * as Faker from 'faker';
import {random} from 'underscore';
import {useGetUutLayers} from './redux/getUutLayers';


const data = Array(10).fill().map((_, i) => {
    return {
        id: i,
        layerName: Faker.commerce.productName(),
        type: Faker.lorem.word(),
        category: Faker.lorem.word(),
        status: Faker.lorem.word(),
        progress: random(0, 100),
        publishedDate: JSON.stringify(Faker.date.past()),
        logs: '',
        uploadedBy: Faker.internet.userName(),
    };
});

console.log('datA: ',data);


export default function UutDashboard(props) {
  const [isListMaximize, setIsListMaximize] = useState(true);
  const [showAddLayerModal, setShowAddLayerModal] = useState(false);
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const {getUutLayers} = useGetUutLayers();

  useEffect(() => {
        getUutLayers();

        return () => {
        };
  }, [getUutLayers]);

  return (
    <div className="uut-uut-dashboard">
        <Grid container
              direction="row"
              alignItems="stretch"
              className="uut-uut-dashboard-grid"
        >
            <Grid container
                  item
                  md={isListMaximize ? 12 : 3}
                  className="uut-uut-dashboard-grid-item"
            >
                <UutLists
                    data={data}
                    setIsListMaximize={setIsListMaximize}
                    isListMaximize={isListMaximize}
                    setShowAddLayerModal={setShowAddLayerModal}
                    showAddLayerModal={showAddLayerModal}
                    setShowCategoriesModal={setShowCategoriesModal}
                    showCategoriesModal={showCategoriesModal}
                />
            </Grid>

            {
                isListMaximize
                ? null
                :   <Grid container
                          item
                          md={9}
                          className="uut-uut-dashboard-grid-item"
                    >
                        <UutListItemDetails />
                    </Grid>
            }

        </Grid>
    </div>
  );
};

