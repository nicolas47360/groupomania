import axios from "axios";
import { useState } from "react";

function AllComments() {
    const [comments, setComments] = useState([])

    function Comments(data) {
        axios.get(
            `http://localhost:5000/api/comment`,
            data
        )
            .then(data => {
                console.log(data)
                setComments(data)
            })
            .catch((err) => { console.log(err) })
    }


    return (
        <div>{comments.message}</div>
    )

}

export default AllComments