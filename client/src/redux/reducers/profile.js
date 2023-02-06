const profileReducer = (state = {}, action) => {
    switch (action.type) {
        case 'EDIT':
            localStorage.setItem('username', { ...action.data }.result.username );
            localStorage.setItem('image', { ...action.data }.result.image );
            return { ...state, username: { ...action.data }.result.username, loading: false, errors: null };
        default:
            return state;
    }
  };
  
export default profileReducer