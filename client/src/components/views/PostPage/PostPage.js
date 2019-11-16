import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Card, Icon, Avatar, Col, Typography } from 'antd';
const { Title } = Typography

function PostPage(props) {

    const [post, setPost] = useState([])
    const postId = props.match.params.postId;

    useEffect(() => {

        const variable = { postId: postId }

        axios.post('/api/blog/getPost', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.post)
                    setPost(response.data.post)
                } else {
                    alert('Couldnt get post')
                }
            })
    }, [])

    if (post.writer) {
        return (
            <div className="postPage" style={{ width: '80%', margin: '3rem auto' }}>
                <Title level={2}>{post.writer.name}`s Post</Title>
                <br />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Title level={4}>{post.createdAt}</Title>
                </div>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />

            </div>
        )
    } else {
        return (
            <div style={{ width: '80%', margin: '3rem auto' }}>loading...</div>
        )
    }

}

export default PostPage
