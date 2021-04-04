import React,{Component} from 'react';
import './sai.css';
import Loader from './Loader'
import {FaArrowAltCircleRight,FaArrowAltCircleLeft} from 'react-icons/fa'
import InfiniteScroll from 'react-infinite-scroll-component'
import {motion} from 'framer-motion'


class App extends Component {  
    
    constructor(){
        
        super();
        this.state = {
                        images:[],
                        current:0,
                        selectedimage:null
                     };
        
        this.nextSlide = this.nextSlide.bind(this);
        this.prevSlide = this.prevSlide.bind(this);
        this.FetchImages = this.FetchImages.bind(this);
        this.handleClick= this.handleClick.bind(this);
         
     };
    
       nextSlide = () => {
         var nextCurrent= (this.state.current === (this.state.images.length-1 )? 0 : (this.state.current + 1));
         var newSelectedImage= this.state.images[nextCurrent].urls.small;
          
        this.setState({current: nextCurrent,selectedimage: newSelectedImage});
      };

       prevSlide = () => {
         var prevCurrent= (this.state.current === 0 ? (this.state.images.length-1) : (this.state.current - 1));
         var newSelectedImage= this.state.images[prevCurrent].urls.small;
           
        this.setState({current: prevCurrent, selectedimage: newSelectedImage});
      };


    
    componentDidMount() {
        
        this.FetchImages();  
      }
    
   handleClick(e){
    
       if(e.target.classList.contains('backdrop'))
       { 
           this.setState({selectedimage:null});
       }
   }

     FetchImages(){
         
         fetch('https://api.unsplash.com/photos/random/?client_id=ymflSViuFrqzyw7Ss5ZGkyV3_V4nX5hH7MxC9kaSv5o&count=30')
        .then(res => res.json())
        .then(data => this.FetchingImages(data))
        .catch(console.log);   
    }

    FetchingImages(data){
        var newImages = [...this.state.images,...data]
        this.setState({images:newImages});
      
    }
    
     render(){ 
                                                     
      return(
            
         <div>
          
           <h1 style={{textAlign:"center"}}> UnSplash!</h1>
         
          {this.state.selectedimage && 
          
             <div class= "backdrop" onClick={(e)=> this.handleClick(e)}>
                   <FaArrowAltCircleLeft class="left-arrow" onClick= {this.prevSlide} />
                   <FaArrowAltCircleRight class= "right-arrow" onClick= {this.nextSlide} />  
                   <motion.img src={this.state.selectedimage} 
                        initial={{y:"-100vh"}}
                        animate={{y:0}}
                    />           
            </div>}
              
              <InfiniteScroll 
                    dataLength={this.state.images.length} 
                    next={this.FetchImages} 
                    hasMore={true} 
                    loader=<Loader/> 
               >
                  <div class="container">
                    {this.state.images.map((image,index) => 
                            (
                               <div onClick={()=> this.setState({selectedimage:image.urls.small,current:index})} >
                                <img  class= "box" src={image.urls.thumb}  />
                              </div>
                            ))
                    }
                   </div>
              </InfiniteScroll>
         </div>
          )
    }
}

export default App;
