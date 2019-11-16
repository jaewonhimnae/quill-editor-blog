import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Card, Icon, Avatar, Col, Typography, Row } from 'antd';

const { Title } = Typography
const { Meta } = Card;

function BlogPage() {

    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        axios.get('/api/blog/getBlogs')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.blogs)
                    setBlogs(response.data.blogs)
                } else {
                    alert('Couldnt get blog`s lists')
                }
            })
    }, [])

    const renderCards = blogs.map((blog, index) => {
        return <Col key={index} lg={8} md={12} xs={24}>
            <Card
                hoverable
                style={{ width: 370, marginTop: 16 }}
                actions={[
                    <Icon type="setting" key="setting" />,
                    <Icon type="edit" key="edit" />,
                    <a href={`/blog/post/${blog._id}`}> <Icon type="ellipsis" key="ellipsis" /></a>,
                ]}
            >
                <Meta
                    avatar={
                        <Avatar src={blog.writer.image} />
                    }
                    title={blog.writer.name}
                    description="This is the description"
                />
                <div style={{ height: 150, overflowY: 'scroll', marginTop: 10 }}>
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>
            </Card>
        </Col>
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2}> Blog Lists </Title>
            <Row gutter={[32, 16]}>
                {renderCards}
            </Row>
        </div>
    )
}

export default BlogPage
