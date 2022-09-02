import {
  ADD,
  CHANGE,
  DELETE,
  DONE,
  EDIT,
  TRASH,
  UPDATE,
} from "../actions/action";

export let mapDispatchToProps = (dispatch) => {
  return {
    changeTheme: (value) => {
      dispatch({
        type: CHANGE,
        payload: value,
      });
    },
    handleAdd: (value) => {
      dispatch({
        type: ADD,
        payload: value,
      });
    },
    handleDelete: (value) => {
      dispatch({
        type: DELETE,
        payload: value,
      });
    },
    handleDid: (value) => {
      dispatch({
        type: DONE,
        payload: value,
      });
    },

    handleTrash: (value) => {
      dispatch({
        type: TRASH,
        payload: value,
      });
    },
    handleEdit: (value) => {
      dispatch({
        type: EDIT,
        payload: value,
      });
    },
    handleUpdate: (value, content) => {
      dispatch({
        type: UPDATE,
        payload: value,
        object: content,
      });
    },
  };
};
