import React, { useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Card} from 'primereact/card'
import {Button} from 'primereact/button'
import {Dialog} from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown';
import { updateTopic } from '../features/user'
import { useNavigate } from 'react-router-dom'
// --------------------Imports ------------------------


export default function Edit() {

    const id = useSelector((state)=>state.user.selectedTopic) // holds the id of selected topic
    const user = useSelector((state)=>state.user.Userdata); // contains user data
    const [display,setDisplay] = useState(false); // toggle for display dialoag
    const [point, setPoint] = useState(null); // use to set point to a bloack
    const [topic, setTopic] = useState({}); // holds the topic data
    const [blockId,setBlockId] = useState(''); // holds the block id
    const dispatch  = useDispatch(); // use to call api
    const navigate = useNavigate(); // navigate through routes

    useLayoutEffect(()=>{
        // eslint-disable-next-line array-callback-return
        user.topics.map(item=>{
            if(item._id === id){
                setTopic(item);
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]) // set topic

    const option = [
        { name: 'UnderStood', code: 1 },
        { name: 'Somewhat understood', code: 2 },
        { name: 'Not clear', code: 3 },
        { name: 'What Rubish', code: 4 },
    ]; // options of dropdown

    const navigateToDash = ()=>{
        navigate('/dashboard');
      } // navigate to dashboard

    const changeTopicData = (data,selectedOption) => {
        
        //eslint-disable-next-line 
        topic.data.map((item)=>{
            if(item._id===data){
                let newBlock = {
                    _id: item._id,
                    points:selectedOption.code,
                    block:item.block
                } // new block data
                dispatch(updateTopic({id:user._id,data:{topicid:topic._id, data:newBlock}})) // update topic api called
            }
        })
    }// update block
    
  return (
    <div>
        <Card>
        {/* Back button */}
        <Button icon="pi pi-arrow-left" className="p-button-rounded" aria-label="Bookmark"onClick={()=>navigateToDash()}/>
        <br/>
        <br/>
            {
                topic.data
                ?topic.data.map(item=>{
                    return <span>
                        {/* blocks button */}
                        <Button label={item.block} style={{margin:"5px"}} 
                            onClick={()=>{
                                //eslint-disable-next-line
                                option.map(op=>{
                                    if(op.code === item.points){
                                        setPoint(op)
                                    }
                                })
                                setBlockId(item._id);
                                console.log(blockId)
                                setDisplay(true);
                            }}
                            // eslint-disable-next-line react/jsx-no-duplicate-props
                            className={
                            item.points===1 
                            ? "p-button-success " : item.points === 2 
                            ? "p-button-warning " : item.points === 3
                            ? "p-button-info "    : item.points === 4
                            ? "p-button-danger "  : "p-button-primary"
                            }
                            >
                        </Button>
                        </span>

                })
                :<h2>No data</h2>
            }
            {/* Dialog box */}
            <Dialog header="Set Points" visible={display} onHide={() => setDisplay(false)} breakpoints={{'960px': '75vw'}} style={{width: '50vw'}}>
                <Dropdown value={point} options={option} onChange={(e)=>{
                    setPoint(e.value);
                    console.log(e.value)
                    changeTopicData(blockId,e.value);
                    }} optionLabel="name" placeholder="Set point" />
            </Dialog>
        </Card>
    </div>
  )
}
