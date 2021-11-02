// components/CreatePost.js
import React, { useEffect, useState ,Component } from 'react';
import { collection, addDoc, setDoc, doc, docs, getDocs, getDoc,updateDoc,deleteDoc } from "firebase/firestore";
//import app from '../config/fire-base';
import firebaseApp from '../firebaseConfig'
import { getFirestore } from "firebase/firestore";
import { delBasePath } from 'next/dist/shared/lib/router/router';

const db = getFirestore();



const CreatePost = () => {
 
  const [username, setUsername] = useState('');
  const [imageURL, setimage] = useState('');
  const [contype, setContype] = useState('false');
  const [description, setDescription] = useState('');
  const [videolink, setVideolink] = useState('');
  const [blogs,setBlogs]=useState([])
  const [audioURL,setaudio]=useState('')
  const [src, setSrc] = useState('');
  const [onFileSelectError, onFileSelectSuccess] = useState('');
  const [likecount, setCount] = useState(0);
  const [comments, setComments] = useState({ username: "", usercomments: "", dateTime: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = {
      username: username,
      image: imageURL,
      contype: contype,
      description: description,
      videolink: videolink,
      comments: comments,
      audio:audioURL,
      like:Likecount,

    };

    addDoc(collection(db, "dewdropusers3"), {
      username: username,
      image: imageURL,
      contype: contype,
      description: description,
      videolink: videolink,
      comments: comments,
      audio:audioURL,
      like:Likecount,


    });
     }

  // Content Type function

  const contentType = e => {
    const target = e.target;
    if (target.checked) {
      setContype(target.value);
    }
  };


  // base 64 converter
  const getBase64 = file => {
    return new Promise(resolve => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        console.log("Called", reader);
        baseURL = reader.result;
        console.log(baseURL);
        resolve(baseURL);
        
      };
      console.log(fileInfo);
    });
  };


  const handleFileInputChange = (e) => {
    console.log(e.target.files[0]);
    //let { file } = this.state;

    const file = e.target.files[0];

    getBase64(file)
      .then(result => {
        file["base64"] = result;
        console.log("File Is", file);
        setimage(result)
      })
      .catch(err => {
        console.log(err);
      });
  }



  const handleAudioInputChange = (e)=>{
    console.log(e.target.files[0]);
        const file = e.target.files[0];

      getBase64(file)
      .then(result => {
        file["base64Audio"] = result;
        console.log("File Is", file);
        setaudio(result)
      })
      .catch(err => {
        console.log(err);
      });

    //     if (file.s > 1024)
    //         onFileSelectError({ error: "File size cannot exceed more than 1MB" });
    // else onFileSelectSuccess(file);


    // this.setState({selectedFile: e.target.files [0]}, () => {
    // console.log (this.state.selectedFile)} );

  // pass file to props to make it available to parent component
    // var data = e.target.files [0];
    // this.props.AudioFileCallback(data);

      // console.log (data)
  }


  async function allData() {
    //const dataref = getDocs(collection(db, "dewdropusers3"));

    const querySnapshot = await getDocs(collection(db, "users"));
    //console.log(querySnapshot.data());
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
     console.log(doc.id, " => ", doc.data());
      setBlogs([...blogs,doc.data()])
  
      //console.log('all users', blogs)
      renderdata(doc);
    });
  }

  function renderdata(doc){
    setBlogs([...blogs,doc.data()])
    console.log('all users', blogs);
  }
  useEffect(() => {
    allData();
    console.log('all users', blogs);
  }, [])

  

  return (
    <div>
      <h2>Add Blog</h2>
      <form className="SubmitForm" onSubmit={handleSubmit}>
        <div>

          <input
            type="radio"
            id="1"
            value="Image"
            name="contentType"
            checked={contype == 'Image'}
            onChange={contentType}
          />
          <label for="1">Image</label>

          <input
            type="radio"
            id="2"
            value="Video"
            name="contentType"
            checked={contype == 'Video'}
            onChange={contentType}
          />
          <label for="2">Video</label>
        </div>
        <div>
          <label>User Name</label>
          <input type="text" value={username}
            onChange={( event ) => {
              setUsername(event.target.value)}} />
        </div>
        <div>
          <label>Video Link</label>
          <input type="text" value={videolink}
            onChange={( event ) => {
              setVideolink(event.target.value)
              }} />
        </div>
        <div>
          <label>description</label>
          <textarea value={description}
            onChange={( event ) => {setDescription(event.target.value)}} />
        </div>
        
        <div>
          <label>comments</label>
          <textarea value={comments}
            onChange={( event ) => {setComments(event.target.value)}} />
        </div>

        
        <div>
          <input type="file" 
          name="imageURL" 
          onChange={handleFileInputChange} />
        </div>

        <div>
          <p>upload audio file</p>
          <input 
          type="file" 
          name="audioURL"
          onChange={handleAudioInputChange}
          /> 
        </div>
      <div>
        <button 
        // onClick={createUser}
        type="submit">Save
        </button>

        </div>

        <div>
      
          <button >💗 Heart</button>

                
        
          {/* <button >💔 Unheart</button> */}
     
          
      
        </div>
      </form>
      <>
      
        <img src={imageURL} />
        <iframe width="560" height="315" src={videolink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <img src={audioURL} />
      </>
    </div>


  )
}
export default CreatePost;