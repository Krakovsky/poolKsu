const getAuthToken = async token => token || await window.localStorage.getItem('accessToken') || '';

export default getAuthToken;
