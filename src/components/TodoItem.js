import React , {Component} from 'react';
import pen from '../img/pen.svg';
import trash from '../img/delete.svg';


class TodoItem extends Component{
    constructor(props){
        super(props);
        this.createTasks = this.createTasks.bind(this);
    }
    createTasks(item){
        return <div  className="card mb-2" key={item.key}>
            <div className="card-body">
                <div className="row">
                    <div className="col-9 p-0" 
                    onClick={()=> item.completed === 1? 'completed':'not_completed'}>
                        <p className={`p-0 m-0 pl-2 ${item.completed === 1?"completed" : "not_completed"}`} onClick={()=>this.props.completed(item.key)}>{item.text}</p>
                    </div>
                    <div className="col-3 text-right">
                        <img src={pen} className="pr-2" width="24" onClick={() => this.props.edit(item.key)} title="Edit" alt="Edit"/>
                        <img src={trash} width="16" onClick={() => this.props.delete(item.key)} title="delete" alt="Delete"/>
                    </div>
                </div>
            </div>
        </div>
    }
    render(){
        // console.log(this.props);
        if(this.props.entries){
            var todoEntries = this.props.entries;
            var listItems = todoEntries.map(this.createTasks);
        }
        return(
            <div className="todoListMain">
                <ul className="theList">
                    {listItems}
                </ul>
            </div>
        )
    }
}


export default TodoItem;