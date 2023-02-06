const roomReducer = (state = {room_id: null }, action) => {
    switch (action.type) {
        case 'CREATE':
            var id = { ...action.data }.id
            localStorage.setItem('room_id', id );
            return { ...state, room_id: id, loading: false, errors: null };
        case 'CHECK':
            var id = { ...action.data }.roomId
            localStorage.setItem('room_id', id );
            return { ...state, room_id: id, loading: false, errors: null };

        default:
            return state;
    }
  };
  
export default roomReducer