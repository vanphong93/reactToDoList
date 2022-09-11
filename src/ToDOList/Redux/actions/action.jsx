import { ADD, CHANGE, DELETE, DONE, EDIT, TRASH, UPDATE } from "../type/type";

export const changeTheme = (value) => {
  return {
    type: CHANGE,
    payload: value,
  };
};
export const handleAdd = (value) => {
  return {
    type: ADD,
    payload: value,
  };
};
export const handleDelete = (value) => {
  return {
    type: DELETE,
    payload: value,
  };
};
export const handleDid = (value) => {
  return {
    type: DONE,
    payload: value,
  };
};
export const handleTrash = (value) => {
  return {
    type: TRASH,
    payload: value,
  };
};
export const handleEdit = (value) => {
  return {
    type: EDIT,
    payload: value,
  };
};
export const handleUpdate = (value,content) => {
  return {
    type: UPDATE,
    payload: value,
    object: content,
  };
};
