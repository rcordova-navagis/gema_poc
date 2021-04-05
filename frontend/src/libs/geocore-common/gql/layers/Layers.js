import gql from 'graphql-tag';


const layersSubscription = gql`
    subscription {
        layers(order_by: {created_date: desc}) {
            id
            name
            type
            status
            category_id
            category {
                id
                name
                parent_id
            }
            dataset {
                django_tilestache_layer {
                    name
                }
            }
        }
    }

`;


export {
    layersSubscription
};