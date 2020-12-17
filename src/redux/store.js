import productionStore from './store.production';
import developmentStore from './store.development';

export default process.env.NODE_ENV === 'production' ? productionStore : developmentStore;
