import axios from "axios";
import { useState, useEffect } from "react";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState([]);


    function Posts() {
        axios.get(
            `http://localhost:5000/api/post`,
        )
            .then(res => {
                console.log(res.data)
                setPosts(res.data)
            })
    }

    function getUser() {
        axios.get(`http://localhost:5000/api/user/`)
            .then(res => {
                console.log(res.data)
                setUser(res.data)
            })

    }
    useEffect(() => {
        Posts();
        getUser();
    }, [])



    return (

        <section className="post-container">
            <h1>Les Posts</h1>
            <div className="user-post">

            </div>
            <div className="posts">{posts.map((post) => (
                <div key={post._id} className="post">
                    <p>{post.message}</p>
                    <img className="post-picture" src={post.imageUrl} alt="logo" />
                </div>
            ))}
            </div>
        </section>

    )
}

export default AllPosts