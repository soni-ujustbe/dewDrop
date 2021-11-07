import React ,{useState,useEffect} from 'react'
import styles from '../styles/Home.module.scss'
import CreatePost from '../component/CreatePost';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
  } from "firebase/firestore";
import firebaseApp from '../firebaseConfig'
import { getFirestore } from "firebase/firestore";
  


  const db=getFirestore();

  const usersCollectionRef = collection(db, "dewdropusers3 ");
  

function getCreatPost() {
    const [username, setUsername] = useState('');
    const [imageURL, setimage] = useState('');
    const [contype, setContype] = useState('false');
    const [description, setDescription] = useState('');
    const [videolink, setVideolink] = useState('');
    const [blogs,setBlogs]=useState([])
    const [audioURL,setaudio]=useState('')
    const [src, setSrc] = useState('');
    const [likecount, setCount] = useState(0);
    const [comments, setComments] = useState('');
    const usersCollectionRef = collection(db, "users");
    const [users, setUsers] = useState([]);


    const updateUser = async (id, likecount) => {
        const userDoc = doc(db, "dewdropusers3", id);
        const newFields = { likecount: likecount + 1 };
        await updateDoc(userDoc, newFields);
        
      };
      const deleteUser = async (id) => {
        const userDoc = doc(db, "dewdropusers3", id);
        await deleteDoc(userDoc);
      };

    
    
      const querySnapshot = await getDocs(collection(db, "cities"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
      
      useEffect(() => {
          const getUsers=async()=>{
              let arr=[]
              const data=await getDocs(collection(db, "users"));
              setBlogs(data.docs.map((doc)=>(
                  {...doc.data(), id: doc.id})));
          };
          
          getUsers();
      }, [])
    
    return (
        <div>
            {blogs.map((blog)=>{
                return(
                    <div>
                        {" "}
                        <h1>Name: {blog.username}</h1>
                        <h1>count: {blog.count}</h1>
                        <h1>image: {blog.imageURL}</h1>
                        <h1>contentType: {blog.contype}</h1>

                        <h1>description: {blog.description}</h1>

                        <h1>videolink: {blog.videolink}</h1>

                        <h1>cpmment: {blog.comments}</h1>
                        
                        <h1>likecount: {blog.likecount}</h1>
    

                        <button
                        onClick={() => {
                            updateUser(user.id, user.likecount);
                        }}
                        >
                        {" "}
                        Increase Like
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
    );

}

export default getCreatPost
