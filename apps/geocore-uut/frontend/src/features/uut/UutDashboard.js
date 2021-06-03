import React, { useEffect, useState } from 'react';
import {Grid} from '@material-ui/core';
import {UutListItemDetails, UutLists} from "./index";
import {
    useGetUutLayers,
    useShowLayerDetails,
    useDeleteLayer
} from './redux/hooks';
import {useSubscription} from '@apollo/react-hooks/lib/useSubscription';
import {CategoriesTransformer} from './../../libs/geocore-common';
import {layerCategoriesSubscription, layerDatasetsSubscription} from './../../libs/geocore-common/gql';
import {useSelector} from 'react-redux';
// import * as Faker from 'faker';
import {random} from 'underscore';
import {useToggleDatasourceDialog} from "../datasource/redux/hooks";


// const layerQueueData = Array(10).fill().map((_, i) => {
//     return {
//         id: i,
//         layerName: Faker.commerce.productName(),
//         type: Faker.lorem.word(),
//         category: Faker.lorem.word(),
//         status: Faker.lorem.word(),
//         progress: random(0, 100),
//         publishedDate: JSON.stringify(Faker.date.past()),
//         logs: '',
//         uploadedBy: Faker.internet.userName(),
//     };
// });


export default function UutDashboard(props) {
  const [isListMaximize, setIsListMaximize] = useState(true);
  const [showAddLayerModal, setShowAddLayerModal] = useState(false);
  const [showUpdateBoundaryLayerModal, setShowUpdateBoundaryLayerModal] = useState(false);
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [layerQueues, setLayerQueues] = useState([]);
  const saveLayerSuccess = useSelector(state => state.uut.saveLayerSuccess);
  const layerIdDetailsToShow = useSelector(state => state.uut.layerIdDetailsToShow);
  const showDatasourceDialog = useSelector(state => state.datasource.showDatasourceDialog);
  const showLayerDetails = (layerId) => { props.history.push(`/uut/${layerId}`) };
  const {deleteLayer} = useDeleteLayer();
  const {toggleDatasourceDialog} = useToggleDatasourceDialog();

  // const {getUutLayers} = useGetUutLayers();
  const {data: layerQueueData, loading, error} = useSubscription(layerDatasetsSubscription);
  const {data: categoryData, loading: loadingLayerCategories, error: errorLayerCategories} = useSubscription(layerCategoriesSubscription);

  useEffect(() => {
      if (saveLayerSuccess === true) {
          setShowAddLayerModal(false);
      }
  }, [saveLayerSuccess]);

  // useEffect(() => {
  //       getUutLayers();
  // }, [getUutLayers]);

  useEffect(() => {
      if (layerQueueData && layerQueueData.layers) {
          setLayerQueues(layerQueueData.layers);
      }
  }, [layerQueueData]);

  useEffect(() => {
      if (categoryData && categoryData.categories) {
          let hierarchy = CategoriesTransformer.transformToDropdownTreeSelect(categoryData.categories);
          setCategories(hierarchy);
      }
  }, [categoryData]);

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
                    data={layerQueues}
                    categories={categories}
                    setIsListMaximize={setIsListMaximize}
                    isListMaximize={isListMaximize}
                    setShowAddLayerModal={setShowAddLayerModal}
                    setShowUpdateBoundaryLayerModal={setShowUpdateBoundaryLayerModal}
                    showUpdateBoundaryLayerModal={showUpdateBoundaryLayerModal}
                    showAddLayerModal={showAddLayerModal}
                    setShowCategoriesModal={setShowCategoriesModal}
                    showCategoriesModal={showCategoriesModal}
                    showDatasourceDialog={showDatasourceDialog}
                    toggleDatasourceDialog={toggleDatasourceDialog}
                    showLayerDetails={showLayerDetails}
                    deleteLayer={deleteLayer}
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
                        {layerIdDetailsToShow ? <UutListItemDetails layerIdDetailsToShow={layerIdDetailsToShow} /> : null}
                    </Grid>
            }

        </Grid>
    </div>
  );
};

