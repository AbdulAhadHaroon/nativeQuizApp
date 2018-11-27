import React from 'react';
import { StyleSheet, Text, View , Button ,  ActivityIndicator} from 'react-native';
//import Data from './quizQuestion'


export default class AfterLogin extends React.Component {
 
  constructor(){
   super();
   this.state = 
   {
    index:0 ,
    totalMarks : 0 ,
    testEnded:false, 
    questionsArray:[],
    fetchComplete:false
   }
   this.playagain = this.playagain.bind(this);
 }

async componentDidMount(){
  const{questionsArray , fetchComplete}=this.state;

  var myRequest = await fetch(`https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple`);
  var myJson = await myRequest.json();
  
  for(var key in myJson.results){
  
      var data = {
  
          question : myJson.results[key].question ,
          ans : myJson.results[key].correct_answer,
          opt1 : myJson.results[key].incorrect_answers[0] ,
          opt2 : myJson.results[key].incorrect_answers[1] ,
          opt3 : myJson.results[key].incorrect_answers[2] 
      }

      questionsArray.push(data);
      
      if(questionsArray.length==10)
      {
        this.setState({fetchComplete:true})
      }
  }    
  
}

 playagain(){
  const {index , totalMarks , testEnded } = this.state;
  this.setState({index:0 , totalMarks:0 , testEnded:false})
 }
 
 Questions(val){
  const {index , totalMarks , testEnded , questionsArray } = this.state;

   var correct = questionsArray[index].ans;
   
   if(correct==val)
    {
      if(questionsArray.length==index+1){
       this.setState({totalMarks:totalMarks+5 , testEnded:true})
      }else{
        this.setState({totalMarks:totalMarks+5 , index:index+1 })
      }
    } 
    else
    {
      if(questionsArray.length==index+1){
        this.setState({testEnded:true})
       }else{
         this.setState({index:index+1 })
       }
    }
 }
 
  render() {
    const {index , testEnded , totalMarks , questionsArray , fetchComplete}=this.state;
    return (
    <View style={{ flex: 1 }}>  

     {!fetchComplete && 
      <View style={{justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="#8000FF" /> 
      </View>
     }


     {!testEnded && fetchComplete &&
       <View >
          <Text style={{fontSize:40 , textAlign:'center' , color:'#8000FF' , borderColor:'black'}}  >Trivia Quiz App </Text>
          <Text style={{fontSize:20}} >Qno{index+1}:{questionsArray[index].question}{"\n"}</Text>
          <View style={{marginTop:'50%'}} >
            <Button buttonStyle={{ backgroundColor: '#8000FF', borderRadius: 10 , }} textStyle={{ textAlign: 'center' }} onPress={()=>{this.Questions(questionsArray[index].opt1)}} title={questionsArray[index].opt1} />
            <Text></Text>
            <Button buttonStyle={{ backgroundColor: '#8000FF', borderRadius: 10 }} textStyle={{ textAlign: 'center' }} onPress={()=>{this.Questions(questionsArray[index].ans)}} title={questionsArray[index].ans}  />
            <Text></Text>
            <Button buttonStyle={{ backgroundColor: '#8000FF', borderRadius: 10 }} textStyle={{ textAlign: 'center' }} onPress={()=>{this.Questions(questionsArray[index].opt2)}} title={questionsArray[index].opt2} />
            <Text></Text>
            <Button buttonStyle={{ backgroundColor: '#8000FF', borderRadius: 10 }} textStyle={{ textAlign: 'center' }} onPress={()=>{this.Questions(questionsArray[index].opt3)}} title={questionsArray[index].opt3} />
         </View>
      </View>
     }

    {testEnded &&
      <View>
        <Text style={{fontSize:30}}> Your Score is {totalMarks} out of 50 </Text>
        <View style={{marginTop:'30%'}} >
          <Button  onPress={this.playagain} title="Play Again" />
        </View>
      </View>
    }
  </View>
    );
  }
}

