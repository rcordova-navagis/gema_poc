import gql from 'graphql-tag';


const layerDatasetsSubscription = gql`
    subscription {
        layers(order_by: {created_date: desc}) {
            id
            name
            code
            type
            published_by
            published_date
            status
            category {
                name
            }
            dataset {
                id
                dataset_queue {
                    id
                    progress
                    uploaded_by
                    uploaded_date
                    status
                }
            }
        }
    }
`;

const getlayerDetailsQuery = gql`
        query GetLayers($layerId: Int!, $limit: Int!) {
            layers(where: {id: {_eq: $layerId}}, limit: 1) {
                id
                name
                code
                type
                published_by
                published_date
                status
                category {
                    id
                    name
                    parent_id
                }
                dataset {
                    id
                    dataset_queue {
                        id
                        name
                        progress
                        sourcefile
                        uploaded_by
                        uploaded_date
                        status
                        has_errors
                    }
                    dataset_data(limit: $limit) {
                        id
                        row_no
                        data
                    }
                }
            }
        }
`;


const deleteLayerAndDatasets = (layerId, datasetId, datasetQueueId) => {
  return gql`
      mutation {
          delete_layers(where: {id: {_eq: ${layerId}}}) {
              affected_rows
          }
          delete_datasets(where: {id: {_eq: ${datasetId}}}) {
              affected_rows
          }
          delete_dataset_queues(where: {id: {_eq: ${datasetQueueId}}}) {
              affected_rows
          }
      }
  `;
};

export {
    layerDatasetsSubscription,
    getlayerDetailsQuery,
    deleteLayerAndDatasets
};