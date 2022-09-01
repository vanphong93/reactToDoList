import React, { Component } from "react";
import { connect } from "react-redux";
import { ThemeProvider } from "styled-components";
import { Button } from "../Components/Button";
import { Container } from "../Components/Container";
import { Dropdown } from "../Components/Dropdown";
import { Heading3 } from "../Components/Heading";
import { Table, Th, Thead, Tr } from "../Components/Table";
import { TextField } from "../Components/TextField";
import { themeAll } from "./Redux/rootReducers/toDoReducer";
class ToDoList extends Component {
  state = {
    taskName: "",
  };
  render() {
    return (
      <ThemeProvider theme={this.props.themeToDo}>
        <Container className="w-50 mt-4">
          <Dropdown
            onChange={(e) => {
              let { value } = e.target;
              this.props.changeTheme(value);
            }}
          >
            {themeAll.map((item, i) => {
              return (
                <option key={i} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </Dropdown>
          <Heading3>To do list</Heading3>
          <TextField
            value={this.state.taskName}
            onChange={(e) => {
              let { value } = e.target;
              this.setState({
                taskName: value,
              });
            }}
            label="Task name"
            className="w-50"
          />
          <Button
            onClick={() => {
              let object = this.state.taskName;
              this.props.handleAdd(object);
            }}
            className="ml-2"
          >
            <i className="fa-sharp fa-solid fa-plus"></i>
          </Button>
          <Button
            onClick={() => {let object=this.state.taskName;
              this.props.handleUpdate(this.props.taskEdit,object);
            }}
            className="ml-2"
          >
            <i className="fa-solid fa-rotate"></i>
          </Button>
          <hr />
          <Heading3>Task to do</Heading3>
          <Table>
            <Thead>
              {this.props.taskList.map((item, i) => {
                return (
                  <Tr key={i}>
                    <Th>{item.name}</Th>
                    <Th className="text-right">
                      <Button
                        onClick={() => {
                          this.props.handleEdit(item);
                          // this.setState(
                          //   {
                          //     taskName: this.props.taskEdit,
                          //   },
                          //   console.log("taskName", this.state.taskName)
                          // );
                        }}
                        className="mx-1"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Button>
                      <Button
                        onClick={() => {
                          this.props.handleDid(item);
                        }}
                        className="mx-1"
                      >
                        <i className="fa-sharp fa-solid fa-check"></i>
                      </Button>
                      <Button
                        onClick={() => {
                          this.props.handleDelete(item.id);
                        }}
                        className="mx-1"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </Button>
                    </Th>
                  </Tr>
                );
              })}
            </Thead>
          </Table>
          <Heading3>Task did</Heading3>
          <Table>
            <Thead>
              {this.props.taskDid.map((item, i) => {
                return (
                  <Tr key={i}>
                    <Th>{item.name}</Th>
                    <Th className="text-right">
                      <Button>
                        <i
                          onClick={() => {
                            this.props.handleTrash(item.id);
                          }}
                          className="fa-solid fa-trash"
                        ></i>
                      </Button>
                    </Th>
                  </Tr>
                );
              })}
            </Thead>
          </Table>
        </Container>
      </ThemeProvider>
    );
  }
  componentDidUpdate(preProps) {
    if (preProps.taskEdit.id !== this.props.taskEdit.id) {
      this.setState({
        taskName: this.props.taskEdit.name,
      });
    }
  }
}

let mapStateToProps = (state) => {
  console.log("taskEdit", state.toDoReducer.taskEdit.name);
  return {
    themeToDo: state.toDoReducer.themeToDo,
    taskList: state.toDoReducer.taskList,
    taskDid: state.toDoReducer.taskDid,
    taskEdit: state.toDoReducer.taskEdit,
  };
};
let mapDispatchToProps = (dispatch) => {
  return {
    changeTheme: (value) => {
      dispatch({
        type: "change",
        payload: value,
      });
    },
    handleAdd: (object) => {
      dispatch({
        type: "add",
        payload: object,
      });
    },
    handleDelete: (value) => {
      dispatch({
        type: "delete",
        payload: value,
      });
    },
    handleDid: (value) => {
      dispatch({
        type: "done",
        payload: value,
      });
    },

    handleTrash: (value) => {
      dispatch({
        type: "trash",
        payload: value,
      });
    },
    handleEdit: (value) => {
      dispatch({
        type: "edit",
        payload: value,
      });
    },
    handleUpdate:(value,object) => { 
      dispatch({
        type:"update",
        payload:value,
        object:object,
      })
     }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);
