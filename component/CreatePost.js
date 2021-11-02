// components/CreatePost.js
import React, { useEffect, useState, Component } from 'react';
import { collection, addDoc, setDoc, doc, docs, getDocs, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
//import app from '../config/fire-base';
import firebaseApp from '../firebaseConfig'
import { getFirestore } from "firebase/firestore";
import { delBasePath } from 'next/dist/shared/lib/router/router';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'


const db = getFirestore();


function CreatePost() {
  const [newName, setNewName] = useState("");
  const [newLike, setNewLike] = useState(0);

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "dewdropusers3");

  const [username, setUsername] = useState('');
  const [imageURL, setimage] = useState('');
  const [contype, setContype] = useState('false');
  const [description, setDescription] = useState('');
  const [videolink, setVideolink] = useState('');
  const [audioURL, setaudio] = useState('')
  const [likecount, setCount] = useState(0);
  const [comments, setComments] = useState({ username: "", usercomments: "", dateTime: "" });


  const createUser = async () => {

    await addDoc(usersCollectionRef, { name: newName, newLike: {totalnumber:Number(newAge), } });
  };
  const createContent = async () => {
    const data = {
      username: username,
      imageUrl: imageURL,
      contype: contype,
      description: description,
      videolink: videolink,
      comments: comments,
      audio:audioURL,
      like:newLike,
    }
    console.log(data);
    await addDoc(usersCollectionRef, data);
  };

  // content type
  const contentType = e => {
    const target = e.target;
    if (target.checked) {
      setContype(target.value);
    }
  };

  // base 64 converter (image converter)
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


  const updateUser = async (id, like) => {
    const userDoc = doc(db, "dewdropusers3", id);
    const newFields = { like: like + 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "dewdropusers3", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(data);
    };

    getUsers();
  }, []);

  return (
    <>
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
          /> 
        </div>
      <div>
        <button 
        onClick={createContent}>Save
        </button>

        </div>

        <div>
      
          <button >💗 Heart</button>

                
        
          {/* <button >💔 Unheart</button> */}
     
          
      
        </div>
      <div className="App">
        {/* <input
          placeholder="Name..."
          onChange={(event) => {
            setNewName(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Age..."
          onChange={(event) => {
            setNewAge(event.target.value);
          }}
        /> */}

        <button onClick={createUser}> Create User</button>
        {users.map((user) => {
          return (
            <div>
              {" "}
              <h1>Name: {user.username}</h1>
              <h1>Video link: {user.videolink}</h1>
              <h3>like: {user.like}</h3>
              <img src={user.imageUrl}/>
              <button
                onClick={() => {
                  updateUser(user.id, user.like);
                }}
              >
                {" "}
                Increase Age
              </button>
              <button
                onClick={() => {
                  deleteUser(user.id);
                }}
              >
                {" "}
                Delete User
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default CreatePost;