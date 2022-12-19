/* eslint-disable array-callback-return */
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedTopc } from '../features/user';
// -----------------------------Imports ----------------------------


export default function Dashboard() {

  const navigate = useNavigate(); // use to navigate through routes
  const user_topics = useSelector((state)=>state.user.Userdata) // contains user data
  let topics = user_topics.topics; // contains user topics
  const dispatch  = useDispatch(); // dispatch api's
  let data = []; // contains data that has to be shown on dashboard


  const navigateToTopic = ()=>{
    navigate('/topic');
  } // navigate to topic   

  const newData = ()=>{
    data = [];
    topics.map(topic =>{// mapping through all topics
      if(topic.data){ // if user has data in topic
        let sumOfTopicsPoint = 0; // sum of all topics points
        let totalNoOfBlocks = 0; // total number of blocks
        totalNoOfBlocks = topic.data.length // assign total number of blocks
        topic.data.map(item=>{
          sumOfTopicsPoint = sumOfTopicsPoint+item.points // calculating sum of points
        })
        let percentage = (sumOfTopicsPoint/(totalNoOfBlocks*4))*100 // percentage 

        data.push({
          title: topic.title,
          percentage:percentage,
          id: topic._id
        }) //creating data
      }
    })
  }

  newData(); // newData called

  useEffect(()=>{
    // eslint-disable-next-line react-hooks/exhaustive-deps
    topics = user_topics.topics;
    newData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user_topics]); // hook used whenever user topic get changed data will also get changed


  return (
    <div>
      <Card>
        {/* add topic button */}
        <Button label="AddTopic" icon="pi pi-plus" onClick={()=>navigateToTopic()}></Button>
        <br/>
        <br/>
        <br/>
        <div>
          {data.map(item=>{
            // mapping through data and sending back relevant info
            return <div id={item.id} style={{display: 'flex', flex:"wrap",justifyContent:"space-evenly",marginBottom:"30px"}}>
                      <div>
                        Title : {item.title} 
                      </div>
                      <div>
                        Percentage : {item.percentage} 
                      </div>
                      {/* Edit button */}
                      <Button style={{marginTop:"-15px"}} icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={(e)=>{
                        dispatch(setSelectedTopc(item.id))
                        navigate('/editTopic');
                      }} />
                    </div>
          })}
        </div>
      </Card>
      <br/>
    </div>
  )
}
