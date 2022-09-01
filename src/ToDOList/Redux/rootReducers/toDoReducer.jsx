import { DarkTheme } from "../../../StyledComponent/ToDoListDarkTheme";
import { LightTheme } from "../../../StyledComponent/ToDoListLightTheme";
import { PrimaryTheme } from "../../../StyledComponent/ToDoListPrimaryTheme";

export let themeAll = [
  { id: 1, name: "Primary Theme", value: PrimaryTheme },
  { id: 2, name: "Light Theme", value: LightTheme },
  { id: 3, name: "Dark Theme", value: DarkTheme },
];

const initialState = {
  themeToDo: PrimaryTheme,
  taskList: [],
  taskDid: [],
  taskEdit: "",
};

export let toDoReducer = (state = initialState, { type, payload,object}) => {
  switch (type) {
    case "change":
      let newTheme = themeAll.find((item) => {
        return item.id == payload;
      });
      return { ...state, themeToDo: newTheme.value };
    case "add": {
      let cloneTask = [...state.taskList];
      let object = {
        id: Date.now(),
        name: payload,
        // done: false,
      };
      cloneTask.push(object);
      return { ...state, taskList: cloneTask };
    }
    case "delete": {
      let cloneTask = state.taskList.filter((item) => {
        return item.id != payload;
      });
      return { ...state, taskList: cloneTask };
    }
    case "done": {
      let cloneTask = state.taskList.filter((item) => {
        return item.id != payload.id;
      });
      let cloneTaskDid = [...state.taskDid];
      cloneTaskDid.push(payload);
      return { ...state, taskList: cloneTask, taskDid: cloneTaskDid };
    }
    case "trash": {
      let cloneTaskDid = state.taskDid.filter((item) => {
        return item.id != payload;
      });
      return { ...state, taskDid: cloneTaskDid };
    }
    case "edit":
      return { ...state, taskEdit: payload };
    case "update":
     { let cloneTaskList = [...state.taskList];
      let index = cloneTaskList.findIndex((item) => {
        return item.id == payload.id;
      });
      cloneTaskList[index].name=object;
      state.taskList=cloneTaskList;
      return{...state}}
    default:
      return state;
  }
};
