
import { DarkTheme, LightTheme, PrimaryTheme } from '../../../StyledComponent/Theme'
import { ADD, CHANGE, DELETE, DONE, EDIT, TRASH, UPDATE } from '../type/type';
export let themeAll = [
  { id: 1, name: "Primary Theme", value: PrimaryTheme},
  { id: 2, name: "Light Theme", value: LightTheme },
  { id: 3, name: "Dark Theme", value: DarkTheme },
];

const initialState = {
  themeToDo: PrimaryTheme,
  taskList: [],
  taskDid: [],
  taskEdit: "",
};

export let toDoReducer = (state = initialState, { type, payload, object }) => {
  switch (type) {
    case CHANGE:
      let newTheme = themeAll.find((item) => {
        return item.id == payload;
      });
      return { ...state, themeToDo: newTheme.value };
    case ADD: {
      let cloneTask = [...state.taskList];
      let object = {
        id: Date.now(),
        name: payload,
      };
      cloneTask.push(object);
      return { ...state, taskList: cloneTask };
    }
    case DELETE: {
      let cloneTask = state.taskList.filter((item) => {
        return item.id != payload;
      });
      return { ...state, taskList: cloneTask };
    }
    case DONE: {
      let cloneTask = state.taskList.filter((item) => {
        return item.id != payload.id;
      });
      let cloneTaskDid = [...state.taskDid];
      cloneTaskDid.push(payload);
      return { ...state, taskList: cloneTask, taskDid: cloneTaskDid };
    }
    case TRASH: {
      let cloneTaskDid = state.taskDid.filter((item) => {
        return item.id != payload;
      });
      return { ...state, taskDid: cloneTaskDid };
    }
    case EDIT:
      return { ...state, taskEdit: payload };
    case UPDATE: {
      let cloneTaskList = [...state.taskList];
      let index = cloneTaskList.findIndex((item) => {
        return item.id == payload.id;
      });
      cloneTaskList[index].name = object;
      return { ...state,taskList:cloneTaskList };
    }
    default:
      return state;
  }
};
