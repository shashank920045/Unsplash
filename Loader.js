import React,{Component} from 'react';
import './sai.css';


class Loader extends Component {  
        
     render(){
      return(
            
         <div style={{'text-align':'center'}}>
          <div   class="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>

         )
         
       }
}

export default Loader;