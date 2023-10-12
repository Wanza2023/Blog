import PostCard from "./PostCard";
import "../styles/PostList.css";

function PostList() {

    const data_list = [
        { id: 1, title: "Title1", content: "Content" },
        { id: 2, title: "Title2", content: "Content" },
        { id: 3, title: "Title3", content: "Content" }
    ];

    return (
        <div id="post-list">
            {data_list.map((post) => <PostCard key={post.id} title={post.title} content={post.content} />)}
        </div>
    )
}

export default PostList;
