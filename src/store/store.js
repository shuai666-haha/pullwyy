import {createStore} from 'redux'
const reducer = (state={num:"000",data:{}},action)=>{
    console.log(action,"axxxxx");
    switch(action.type){
       case "adddata" :
           console.log(action.data,"action++++++++++");
           return  {...state,data:action.data};
        default :
           return {...state}
    }
}
const store = createStore(reducer)
console.log("0000000000000000000000000000000000000000000");
console.log(store.getState(),"?????+++++++++++++++++++++++++++");
export default store


