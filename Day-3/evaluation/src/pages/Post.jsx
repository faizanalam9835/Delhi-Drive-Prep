import React, { useEffect, useState } from 'react'

export default function Post() {
   const [Post, SetPost] = useState([])
   const [Users, SetUser] = useState([])
   const [User , setUs] = useState([])


   const fetchPost = async () => {
      try {
         const res = await fetch("https://jsonplaceholder.typicode.com/posts")
         const data = await res.json()
         let userid = data.map((ele) => {
            return ele.userId
         })
         console.log(data)
         SetUser(userid)
         SetPost(data)
      } catch (error) {
         console.log(error)
      }
   }


   const fetchuser = async (userId) => {
      try {
         const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
         const data = await res.json()
         console.log(data)
         setUs(data)
      } catch (error) {
         console.log(error)
      }
   }
   useEffect(() => {
      fetchPost()
      fetchuser(Users)
   }, [])
   return (
      <>
         <div style={{
            width: "100%", display: 'flex',
            flexWrap: "wrap", justifyContent: "center",
            alignItems: 'center',
            gap: "10px",
            backgroundColor:"antiquewhite"
         }}>

            {
               Post.map((ele) => {
                  return (
                     <>
                        <div key={ele.userId} style={{ border: "1px solid black", width: "400px", height: "200px", display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: 'center', borderRadius:"5px" , backgroundColor:"cyan"}}>
                           <h3>{ele.title}</h3>
                           <p>{ele.body}</p>
                           <p>{ele.userId === User[0].id ? User[0].name: "No name"}</p>
                        </div>
                       
                     </>
                  )
               })
            }
         </div>
      </>
   )
}
