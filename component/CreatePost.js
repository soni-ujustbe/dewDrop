// components/CreatePost.js

import React, { useEffect, useState } from 'react';
import { collection, addDoc, setDoc, doc, docs, getDocs, getDoc, updateDoc, deleteDoc, query} from "firebase/firestore";
import firebaseApp from '../firebaseConfig' ;
import { getFirestore, onSnapshot } from "firebase/firestore";
import { delBasePath } from 'next/dist/shared/lib/router/router';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Link from "next/link";
import { useRouter } from "next/router";
const db = getFirestore();

const CreatePost= () =>{
  
  const [users, setUsers] = useState([]);
  const [getId, setgetId] = useState([]);
  const usersCollectionRef = collection(db, "dewdropusers3");
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [imageURL, setimage] = useState('');
  const [contype, setContype] = useState('false');
  const [description, setDescription] = useState('');
  const [videolink, setVideolink] = useState('');
  const [audioURL, setaudio] = useState('');
  const [comments, setComments] = useState({ username: "", usercomments: "", dateTime: "" });
  const [blogs, setBlogs] = useState([]);
  const [newLike, setNewLike] = useState(0);
  const [newView, setNewView] = useState(0);


  const likeUser = async () => {

    await addDoc(usersCollectionRef, { Like: {totalnumber:Number(newLike), } });
  };


  const handleSubmitbuild = (event) => {
    event.preventDefault();
    let data = {
      username: username,
      image: imageURL,
      contype: contype,
      description: description,
      videolink: videolink,
      comments: comments,
      totallike: newLike,
      totalview: newView
    };
  }


  const createContent = async (event) => {
    const data = {
      username: username,
      imageUrl: imageURL,
      contype: contype,
      description: description,
      videolink: videolink,
      comments: comments,
      audio:audioURL,
      like:newLike,
      totalview: newView,

    };
    console.log("document data",data);
    await addDoc(usersCollectionRef, data);

    setUsername("");
    setimage("");
    setContype("");
    setDescription("");
    setVideolink("");
    setComments("");
    setaudio("");
    setNewLike("");
   
  }

  // content type function
  const contentType = (event) => {
    const target = event.target;
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
        console.log("Image data Reader", reader);
        baseURL = reader.result;
        console.log(baseURL);
        resolve(baseURL);

      };
      // console.log(fileInfo);
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
        setimage(result);
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

  

  // const getIdUser  = async (id) => {
  //     const userId = doc(db,"dewdropusers3",id);
  //     const docSnap = await getDoc(userId);
  //     // const q = query(collection(db, "dewdropusers3"), where("doc.id", "==", true));

  //     // const querySnapshot = await getDocs(q);
  //     // querySnapshot.forEach((doc) => {
  //     //   // doc.data() is never undefined for query doc snapshots
  //     //   console.log(doc.id, " => ", doc.data());
  //     //   console.log(doc.data());
  //     // });

  //     // setgetId(docSnap.docs.map((doc)=>({ ...doc.data(),id:doc.id})));
  //     console.log(docSnap);
  //     if (docSnap.exists()) {
       
  //       console.log("Document data:", docSnap.data());
  //     }else {
  //       // doc.data() will be undefined in this case
  //       console.log("No such document!");
  //     }
      

      
  //   };

  useEffect(() => {
    const getContent = async () => {
      const data = await getDocs(usersCollectionRef);
      // onSnapshot(collection(db, "dewdropusers3"), (snapshot) => {
      //   console.log("Suraj", snapshot);
      //   setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // })
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id:doc.id })));
      console.log(data);
    };

    getContent();
  }, []);

  return (
    <>
    <div>
      <h2>Add Blog</h2>
      <form onSubmit={createContent} >
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
          <input type="text" 
          value={username}
            onChange={( event ) => {
              setUsername(event.target.value)}} />
        </div>

        <div>
          <label>Video Link</label>
          <input type="text" value={videolink}
            onChange={( event ) => {
              setVideolink(event.target.value)}} />
        </div>

        <div>
          <label>description</label>
          <textarea value={description}
            onChange={( event ) => {setDescription(event.target.value)}} />
        </div>
        
        <div>
          <label>comments</label>
          <textarea value={comments}
            onChange={( event ) => {setComments(event.target.value)}}
             />
        </div>

        
        <div>
          <input type="file" 
          name="file" 
          onChange={handleFileInputChange} />
        </div>

        {/* <div>
          <p>upload audio file</p>
          <input 
          type="file" 
          name="audioURL"
          /> 
        </div> */}
        


      <div>
        <button 
        type="submit"
        // onClick={createContent}
        >Save
        </button>
      </div>

      </form>
      <br /><br />
      {/* <>
          <img src={imageURL} />
        <iframe width="560" height="315" src={videolink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
        <br/>
        <img src={audioURL} />
      </> */}
    </div> 

   

{/* map to this form  */}
          
        {
          users && users.map(blog =>{
           
            console.log(blog);
            return(
            <div className="blog-container">
              
              
                  <p>Name: {blog.username}</p>
                  <p>Video link: {blog.videolink}</p>
                  <p>ContentType: {blog.contype}</p>
                  <p>discription: {blog.description}</p>
                  <p>Like: {blog.like}</p>
                  <p>Views: {blog.newView}</p>

                  <Link href={"/userDetails/[id]"} as={"/userDetails/" + blog.id}>
                      <a >link</a>
                  </Link>

                  <div>
                      <img src={blog.imageUrl}
                      width="500px" height="240px" />
                  </div>  
                  <br/>
                  <div>
                      <iframe width="500" height="300" src={blog.videolink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                  </div>

                  <div>
                        <button
                          onClick={() => {
                            updateUser(blog.id, blog.like);
                          }}
                        >
                          {" "}
                          💗 Heart
                        </button>
                  
                      <button
                        onClick={() => {
                          deleteUser(blog.id);
                      }}  
                      >
                      {" "}
                      Delete User
                    </button>          

                  </div>   

                  <br/> <br/> 

          </div>
      
            )
     
          })
        }{
          users?<div></div>:null
        }
  
   </> 
  )
}


export default CreatePost;