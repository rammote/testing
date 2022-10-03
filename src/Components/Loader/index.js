import React from 'react'
import styles from './loader.module.css'
export default function index() {
    return (
       <div style={{
           width:'100%',
          display:'flex',
            justifyContent:'center',
            alignItems:'center',
            padding:   '1.3rem',
       }}>
            <div className={styles.loader}></div>
       </div>
    )
}
