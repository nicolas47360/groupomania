import React from "react";
import Banner from "../components/utils/Banner";
import Posts from "../components/Posts";

function Post() {
    return (
        <main className="post">
            <Banner />
            <section className="form-post">
                <Posts />
            </section>
        </main>
    );
};

export default Post;