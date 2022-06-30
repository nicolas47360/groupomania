import React, { useState } from "react";
import CreatePost from "./CreatePost";
import UpdatePost from "./updatePost"
import DeletePost from "./DeletePost";

function Posts() {
    const [createPostModal, setCreatePostModal] = useState(true);
    const [updatePostModal, setupdatePostModal] = useState(false);
    const [deletePostModal, setDeletePostModal] = useState(false);
    function handleModals(event) {
        if (event.target.id === "createpost") {
            setCreatePostModal(true);
            setupdatePostModal(false);
            setDeletePostModal(false);
        }
        else if (event.target.id === "updatepost") {
            setCreatePostModal(false);
            setupdatePostModal(true);
            setDeletePostModal(false);
        }
        else if (event.target.id === "deletepost") {
            setCreatePostModal(false);
            setupdatePostModal(false);
            setDeletePostModal(true);
        }
    }
    return (
        <div className="pots-form">
            <div className="post-container">
                <ul className="post-list">
                    <li className="post-li" onClick={handleModals} id="createpost">Créer un Post</li>
                    <li className="post-li" onClick={handleModals} id="updatepost">Modifier votre Post</li>
                    <li className="post-li" onClick={handleModals} id="deletepost">Supprimer votre Post</li>
                </ul>
                {createPostModal && <CreatePost />}
                {updatePostModal && <UpdatePost />}
                {deletePostModal && < DeletePost />}
            </div>
        </div>
    )
}

export default Posts;