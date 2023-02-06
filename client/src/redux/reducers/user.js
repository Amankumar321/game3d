const userReducer = (state = { authData: null }, action) => {
    switch (action.type) {
      case 'AUTH':
        localStorage.setItem('token', { ...action.data }.token );
        localStorage.setItem('username', { ...action.data }.result.username );
        localStorage.setItem('image', { ...action.data }.result.image );
        return { ...state, username: { ...action.data }.result.username, loading: false, errors: null};
      
      case 'LOGOUT':
        localStorage.clear();
        return { ...state, authData: null, loading: false, errors: null };
    
        default:
          return state;
    }
  };
  
export default userReducer