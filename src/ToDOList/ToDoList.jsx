import React, { Component } from "react";
import { connect } from "react-redux";
import { ThemeProvider } from "styled-components";
import { Button } from "../Components/Button";
import { Container } from "../Components/Container";
import { Dropdown } from "../Components/Dropdown";
import { Heading3 } from "../Components/Heading";
import { Table, Th, Thead, Tr } from "../Components/Table";
import { TextField } from "../Components/TextField";
import {
  ADD,
  CHANGE,
  DELETE,
  DONE,
  EDIT,
  TRASH,
  UPDATE,
} from "./Redux/actions/action";
import { themeAll } from "./Redux/rootReducers/toDoReducer";
class ToDoList extends Component {
  state = {
    taskName: "",
    buttonDisabled: false,
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
            onFocus={this.state.buttonDisabled?"":() => {
              this.setState({
                taskName: "",
              });
            }}
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
          {this.state.buttonDisabled ? (
            ""
          ) : (
            <Button
              onClick={() => {
                let content = this.state.taskName;
                if (content == "") {
                  alert("Xin nhập dữ liệu");
                  return;
                }
                this.props.handleAdd(content);
              }}
              className="ml-2"
            >
              <i className="fa-sharp fa-solid fa-plus"></i>
            </Button>
          )}
          {this.state.buttonDisabled ? (
            <Button
              onClick={() => {
                let content = this.state.taskName;
                if (content == "") {
                  alert("Xin nhập dữ liệu");
                  return;
                }
                this.setState({
                  buttonDisabled: false,
                });
                this.props.handleUpdate(this.props.taskEdit, content);
              }}
              className="ml-2"
            >
              <i className="fa-solid fa-rotate"></i>
            </Button>
          ) : (
            ""
          )}
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
                          this.setState({
                            buttonDisabled: true,
                          });
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
export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);
