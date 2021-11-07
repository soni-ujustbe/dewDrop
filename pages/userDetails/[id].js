import React, { useEffect, useState } from 'react';
import { getFirestore, onSnapshot } from "firebase/firestore";
import { collection, addDoc, setDoc, doc, docs, getDocs, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import firebaseApp from '../../firebaseConfig';
const db = getFirestore();


function userDetails({ posts }) {
    const postid = posts.id;
    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db, "dewdropusers3");
    const [newLike, setNewLike] = useState(0);
    const [newView, setNewView] = useState(0);


    useEffect(() => {
        const getContent = async () => {
            console.log('serverside', postid);
            const docRef = doc(db, "dewdropusers3", postid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setUsers(docSnap.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }

        getContent();
       
    }, [])

    const likeUser = async () => {

        await addDoc(usersCollectionRef, { Like: {totalnumber:Number(newLike), } });
  
      };

      
    const updateUser = async (like) => {
        //console.log(id);
        const userDoc = doc(db, "dewdropusers3", postid);
        const newFields = { like: like + 1 };
        await updateDoc(userDoc, newFields);
      };
      
      const deleteUser = async (id) => {
          const userDoc = doc(db, "dewdropusers3", postid);
          await deleteDoc(userDoc);
        };

    return (

        console.log("users", users),
        <>

            {users ? <div>
                <div>
            <p>Name: {users.username}</p>
            </div>
            <div>
              <p>Video link: {users.videolink}</p>
            </div>
            <div>
              <p>ContentType: {users.contype}</p>
            </div>
            <div>
              <p>discription: {users.description}</p>
            </div>
            <div>
              <p>like: {users.like}</p>
            </div>
                 <img src={users.imageUrl} 
                     width="560px" height="300px"
                 />
                 <br/><br/>
            
                <iframe width="560" height="315" src={users.videolink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div> : null}

            <div>
        
            <button
               onClick={() => {
                      updateUser(users.like);
                    }}>💗 Heart
            </button>
            {/* <button >💔 Unheart</button> */}
      
            <button
                  onClick={() => {
                    deleteUser(users.id);
                }}  
                >
                {" "}
                Delete User
              </button>    
        
        </div>
        </>
    )
}
     {/* <div>

      {users.map(user=>
      {
        return(


      <div className="c">
      
       {" "}

        <div>
        <br/>
        
          <div>
               <p>Name: {user.username}</p>
          </div>

          <div>
              <p>Video link: {user.videolink}</p>
          </div>

          <div>
              <p>ContentType: {user.contype}</p>
          </div>

          <div>
              <p>discription: {user.description}</p>
          </div>

          <div>
              <p>Comment: {user.comments}</p>
          </div>
          
          <div>
              <p>like: {user.like}</p>
            </div>

          <div>
            <Link href={"/userDetails/[id]"} as={"/userDetails/" + user.id}>
                      <a >link</a>
            </Link>
        
         
            </div>    
        </div>
      </div>  

        )

      })}
    </div> */}
    
//         </>
//     )

    
// }

export default userDetails

export async function getServerSideProps({ query }) {
    // const db = getFirestore();
    //const  meetingid  = query.id;
    console.log("query", query.id);
    // const docRef = doc(db, "ujustcelebrate", meetingid);
    //const docSnap = await getDoc(docRef);

    // const res = await fetch("https://api.ujustbe.com/Meeting/details?meetingId=" + meetingid);
    // const posts = await res.json()
    //console.log("all details", meetingid);
    return {
        props: {
            //...docSnap.doc(),
            posts: query
        }
    }
}

