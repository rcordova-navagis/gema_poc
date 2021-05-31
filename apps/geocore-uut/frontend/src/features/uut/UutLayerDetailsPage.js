import React, { useEffect, useState } from 'react';
import {UutListItemDetails, UutLists} from "./index";
import {Grid} from '@material-ui/core';
import {getlayerDetailsQuery} from "../../libs/geocore-common/gql";
import {useQuery} from '@apollo/react-hooks';


const excludedColumns = ['geom', 'geometry','field_1','ogc_fid'];


export default function UutLayerDetailsPage(props) {
  const [layerId, setLayerId] = useState(null);
  const [dataset, setDataset] = useState({dataset_queue: {}, columns: [], rows: []});
  const {data, loading, error} = useQuery(getlayerDetailsQuery, {variables: {layerId: layerId, limit: 5}});

  console.log('UutListItemDetails data: ',data);

  useEffect(() => {
    setLayerId(props.match.params.id);
  }, [props.match.params]);

  useEffect(() => {
    if (data && Array.isArray(data.layers) && data.layers.length) {
      let layer = data.layers[0],
          columns = [],
          rows = [],
          dq = {};

      if (layer.dataset && Array.isArray(layer.dataset.dataset_data) && layer.dataset.dataset_data.length) {
        for (let k in layer.dataset.dataset_data[0].data) {
          if (!excludedColumns.includes(k)) columns.push(k);
        }

        rows = layer.dataset.dataset_data.map(item => {
          return Object.assign({}, item.data, item.geom);
        });
      }

      if (layer.dataset && layer.dataset.dataset_queue) {
        dq = layer.dataset.dataset_queue;
      }

      setDataset({rows: rows, columns: columns, dataset_queue: dq});
    }
  }, [data]);

  if (loading) return 'Loading...';

  return (
    <Grid container
          direction="row"
          alignItems="stretch"
          className="uut-uut-layer-details-page">
        <Grid container
              item
              className="uut-uut-dashboard-grid-item">
            <UutListItemDetails layerId={layerId}
                                dataset={dataset} />
        </Grid>
    </Grid>
  );
};
