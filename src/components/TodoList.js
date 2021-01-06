import React, {Component } from 'react';
import { Button } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import TodoItem from './TodoItem';


class TodoList extends Component{
    constructor(props){
        super(props);
        this.state = {
            items:[],
            edit_key:0,
        }
        this.addItem = this.addItem.bind(this);
        this.editItem = this.editItem.bind(this);
    }
    addItem(e){
        var input_value = this._inputElement.value;
        if(input_value !== ""){
            if(this.state.edit_key !== 0){
                var data = [...this.state.items];
                var index = data.findIndex(obj => obj.key === this.state.edit_key);
                data[index].text = input_value;
                this.setState({items:data});
                this.setState({edit_key:0});
            }else{
                var newItem = {
                    text:input_value,
                    key:Date.now(),
                    completed:0
                };
    
                this.setState((prevState)=>{
                    return{
                        items:prevState.items.concat(newItem)
                    };
                });
            }
        }
        this._inputElement.value= "";
        // console.log(this.state);
        e.preventDefault();
    }

    deleteItem(key){
        // console.log(this.state);
        var filteredItem = this.state.items.filter(function(item){
            return (item.key!== key);
        });
        this.setState({
            items:filteredItem
        });

    }
    completeItem(key){
        var data =  [...this.state.items];
        var index = data.findIndex(obj=>obj.key === key);
        if(data[index].completed === 0){
            data[index].completed = 1;
        }else{
            data[index].completed = 0;
        }
        this.setState({items:data});
    }
    editItem(key){
        var data = [...this.state.items];
        var index = data.findIndex(obj => obj.key === key);
        this._inputElement.value = data[index].text;
        this.setState({ edit_key:key });
    }
    
    render(){
        return(
            <div className="justify-content-center todoListMain mt-3 p-4">
                <h2 className="text-white text-center">To Do</h2>
                <div className="row">
                    <div className="col-sm-6">
                        <form onSubmit={this.addItem}>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Type here"
                                    aria-label="todo"
                                    aria-describedby="basic-addon2"
                                    ref={(a) => this._inputElement = a}
                                />
                                <InputGroup.Append>

                                    {
                                    this.state.edit_key !== 0 ? 

                                        <Button type="submit" variant="btn btn-color">Update</Button> : 
                                    
                                        <Button type="submit" variant="btn btn-color">Add</Button>
                                    }
                                    

                                </InputGroup.Append>
                            </InputGroup>
                        </form>
                        <hr />
                        <TodoItem 
                            entries={this.state.items} 
                            delete={this.deleteItem.bind(this)} 
                            completed={this.completeItem.bind(this)}
                            edit={this.editItem.bind(this)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default TodoList;