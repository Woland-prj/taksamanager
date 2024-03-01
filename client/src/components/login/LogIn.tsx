import React from "react"
import styles from "@/styles/login_and_register.module.css"
import Image from "next/image"
const LogIn = () =>{
    return (
        <div className={styles.login}>
            <Image className={styles.taksa} src="/taksa.svg" alt="taksa" width="809" height="456"/>
            <Image className={styles.right_part}src="/login_reg_vector.svg" alt="vector" width="0" height="0"/>
            <div className={styles.login_panel}></div>
        </div>
    )
}

export default LogIn