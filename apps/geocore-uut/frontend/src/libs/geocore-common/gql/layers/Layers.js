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

export {
    layerDatasetsSubscription
};