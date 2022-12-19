import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { newTopic } from '../features/user';
//----------------------- Imports -----------------------


export default function AddTopic() {
  const [title,setTitle] = useState(''); // state holds the value of title
  const [topic,setTopic] = useState(''); // state holds the value of topic
  const navigate = useNavigate(); // use to navigate to other routes
  const loading = useSelector((state)=>state.user.loading) // tells is any api is bieng called or not
  const user = useSelector((state)=>state.user.Userdata) // holds the value of user
  const dispatch  = useDispatch(); // use to dispatch api's
  const goBack = ()=>{ // use to navigate to dashboard
    navigate('/dashboard');
  }

  const submitTopic = () => { // submit Topic
    const data = {
      title,
      topic
    } // topic data
    dispatch(newTopic({id:user._id,data})) // dispatch new topic api
    goBack(); // navigate to dashboard
  }

  return (
    <div>
      <Card>
        {/* Back button */}
        <Button icon="pi pi-arrow-left" className="p-button-rounded" aria-label="Bookmark" onClick={goBack}/>
        <br/>
        <br/>
        {/* Input for title */}
        <span className="p-float-label">
            <InputText id="in" onChange={(e) => setTitle(e.target.value)} />
            <label htmlFor="in">Title</label>
        </span>
        <br/>
        <h4>Topic</h4>
        {/* Input for topic */}
        <InputTextarea onChange={(e) => setTopic(e.target.value)} rows={5} cols={30} autoResize />

        <br/>
        {/* Submit Button */}
        <Button label="Submit" icon="pi pi-check" loading={loading} onClick={
                        ()=>{
                            submitTopic();
                        }
        } />
      </Card>
    </div>
  )
}
