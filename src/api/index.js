import {getUrl} from './fetch';

export const getSeller = getUrl('/api/seller');
export const getGoods = getUrl('/api/goods');
export const getRatings = getUrl('/api/ratings');