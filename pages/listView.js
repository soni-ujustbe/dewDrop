import React from 'react'
import styles from '../styles/ListView.module.scss'
import Image from 'next/image'
import { BsChatLeft } from "react-icons/bs";
import { BsHandThumbsUp } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";







function listView() {
    return (
        <div>
    
            <div className={styles.container}>

            <div className={styles.CardWrapper}>
                <ul>
                    <li className={styles.listingCard}>
                        <div className={styles.listprofileimage}>
                            <img src="https://via.placeholder.com/150/0000FF/808080 ?Text=Digital.com C/O https://placeholder.com/" />

                        </div>

                        <div className={styles.listdescription} >
                            <h2>Name</h2>
                            <p>Short Descriprition</p>

                            

                        </div>

                        <div className={styles.iconActionbtn}>
                            <BsHandThumbsUp />

                            <BsChatLeft />
                            
                        </div>

                        <div className={styles.listactionbtn}>

                            <button>
                                like
                            </button>

                            <button>
                                comment
                            </button>

                        </div>

                    </li>
                    <li className={styles.listingCard}>
                        <div className={styles.listprofileimage}>
                            <img src="https://via.placeholder.com/150/0000FF/808080 ?Text=Digital.com C/O https://placeholder.com/" />

                        </div>

                        <div className={styles.listdescription} >
                            <h2>Name</h2>
                            <p>Short Descriprition</p>

                        </div>

                        <div className={styles.iconActionbtn}>
                            <BsHandThumbsUp />

                            <BsChatLeft />
                            
                        </div>

                        <div className={styles.listactionbtn}>

                            <button>
                                like
                            </button>

                            <button>
                                comment
                            </button>

                        </div>


                    </li>
                    <li className={styles.listingCard}>
                        <div className={styles.listprofileimage}>
                            <img src="https://via.placeholder.com/150/0000FF/808080 ?Text=Digital.com C/O https://placeholder.com/" />

                        </div>

                        <div className={styles.listdescription} >
                            <h2>Name</h2>
                            <p>Short Descriprition</p>

                        </div>

                        <div className={styles.iconActionbtn}>
                            <BsHandThumbsUp />

                            <BsChatLeft />
                            
                        </div>

                        <div className={styles.listactionbtn}>

                            <button>
                                like
                            </button>

                            <button>
                                comment
                            </button>

                        </div>

                    </li>
                    <li className={styles.listingCard}>
                        <div className={styles.listprofileimage}>
                            <img src="https://via.placeholder.com/150/0000FF/808080 ?Text=Digital.com C/O https://placeholder.com/" />

                        </div>

                        <div className={styles.listdescription} >
                            <h2>Name</h2>
                            <p>Short Descriprition</p>

                        </div>

                        <div className={styles.iconActionbtn}>
                            <BsHandThumbsUp />

                            <BsChatLeft />
                            
                        </div>

                        <div className={styles.listactionbtn}>

                            <button>
                                like
                            </button>

                            <button>
                                comment
                            </button>

                        </div>


                    </li>

                    <li className={styles.listingCard}>
                        <div className={styles.listprofileimage}>
                            <img src="https://via.placeholder.com/150/0000FF/808080 ?Text=Digital.com C/O https://placeholder.com/" />

                        </div>

                        <div className={styles.listdescription} >
                            <h2>Name</h2>
                            <p>Short Descriprition</p>

                        </div>

                        <div className={styles.iconActionbtn}>
                            <BsHandThumbsUp />

                            <BsChatLeft />
                            
                        </div>

                        <div className={styles.listactionbtn}>

                            <button>
                                like
                            </button>

                            <button>
                                comment
                            </button>

                        </div>


                    </li>


                    <li className={styles.listingCard}>
                        <div className={styles.listprofileimage}>
                            <img src="https://via.placeholder.com/150/0000FF/808080 ?Text=Digital.com C/O https://placeholder.com/" />

                        </div>

                        <div className={styles.listdescription} >
                            <h2>Name</h2>
                            <p>Short Descriprition</p>

                        </div>

                        <div className={styles.iconActionbtn}>
                          <div className={styles.imgSvg}>
                            <BsHandThumbsUp />
                            </div>

                            <div className={styles.imgSvg}>

                            <BsChatLeft />
                            </div>
                            
                        </div>

                        <div className={styles.listactionbtn}>

                            <button>
                                like
                            </button>

                            <button>
                                comment
                            </button>

                        </div>


                    </li>
                    
                </ul>

            </div>




            </div>

            
        </div>
    )
}

export default listView
