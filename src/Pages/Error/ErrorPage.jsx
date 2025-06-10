import React from 'react'
import style from './Error.module.css'
import BlockIcon from '@mui/icons-material/Block';
function ErrorPage() {
  return (
   <>

    <div className={style.errorcont}>
   <h1 className={style.error}>Error , This Page is Not Found</h1>
   <span ><BlockIcon className={style.icon} /></span>
    </div> 

   </>
  )
}

export default ErrorPage