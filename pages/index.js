import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import CreatePost from '../component/CreatePost';
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notification, setNotification] = useState('');

//  
 
  
  return (
    <div>
      <Head>
        <title>Blog App</title>
      </Head>
      <h1>Blog</h1>
      <CreatePost />
      
    </div>
  )
}

export default Home;