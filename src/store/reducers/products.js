import {
  CREATED_PRODUCT,
  ERROR_CREATED_PRODUCT,
  GET_PROVIDER_PRODUCTS,
  UPDATED_PRODUCT,
  SET_SEARCH_TEXT,
  CLEAN_PRODUCT_STATE
} from '../actions/actionTypes';

const initialState = {
  products: [],
  error: false,
  message: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATED_PRODUCT:
      return {
        ...state,
        error: false,
        message: action.successMsg
      }
    case UPDATED_PRODUCT:
      return {
        ...state,
        error: false,
        message: action.successMsg
      }
    // case ADD_POST:
    //     return {
    //         ...state,
    //         posts: state.posts.concat({
    //             ...action.payload
    //         })
    //     };
    // case ADD_COMMENT:
    //     return {
    //         ...state,
    //         posts: state.posts.map(post => {
    //             if (post.id === action.payload.postId) {
    //                 if (post.comments) {
    //                     post.comments = post.comments.concat(action.payload.comment)
    //                 } else {
    //                     post.comments = [action.payload.comment]
    //                 }
    //             }
    //             return post;
    //         })
    //     };
    case GET_PROVIDER_PRODUCTS:
      return {
        ...state,
        products: action.products
      }
    // case SET_COMERCIAL_SEGMENT_SELECTED: {
    //   const comercialSegmentSelected = action.payload;
    //   return {
    //     ...state,
    //     ads: getAdsByComercialSegment(comercialSegmentSelected),
    //     adsPromotion: getAdsPromotionByComercialSegment(comercialSegmentSelected)
    //   }
    // }
    // case SET_SEARCH_TEXT: {
    //   const { searchText, comercialSegmentSelected } = action.payload;
    //   return {
    //     ...state,
    //     ads: searchText !== '' ? state.ads.filter(ad => ad.name.includes(searchText)) : getAdsByComercialSegment(comercialSegmentSelected),
    //     adsPromotion: searchText !== '' ? state.adsPromotion.filter(
    //       ad => ad.promotion === true && ad.name.includes(searchText)
    //     ) : getAdsPromotionByComercialSegment(comercialSegmentSelected)
    //   }
    // }
    case CLEAN_PRODUCT_STATE:
      return {
        ...state,
        error: false,
        message: ''
      }
    default:
      return state
  }
}

// const getAdsByComercialSegment = (comercialSegmentSelected) => {
//   const adsByComercialSegment = comercialSegmentSelected === 'All'
//     ? ads
//     : ads.filter(ad => ad.comercialSegment === comercialSegmentSelected);
//   return adsByComercialSegment;
// }

// const getAdsPromotionByComercialSegment = (comercialSegmentSelected) => {
//   const adsByComercialSegment = comercialSegmentSelected === 'All'
//     ? ads.filter(ad => ad.promotion === true)
//     : ads.filter(ad =>
//       ad.promotion === true && ad.comercialSegment === comercialSegmentSelected);
//   return adsByComercialSegment;
// }

export default reducer;
