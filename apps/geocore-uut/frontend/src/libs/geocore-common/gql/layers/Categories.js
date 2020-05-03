import gql from 'graphql-tag';


const layerCategoriesSubscription = gql`
    subscription layerCategoriesSubscription {
        categories(order_by: {id: asc}) {
            id
            name
            parent_id
        }
    }
`;

export {
    layerCategoriesSubscription
};
