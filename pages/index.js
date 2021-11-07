import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import CreatePost from '../component/CreatePost';
// import CreatePost_suraj from '../component/CreatePost_suraj';



const Home = () => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notification, setNotification] = useState('');

//  
 
  
  return (
    <div>
      <Head>
        <title>Blog App</title>
      </Head>
     
      <CreatePost />
      
    </div>
  )
}

export default Home;