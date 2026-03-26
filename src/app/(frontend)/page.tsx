'use client';

import React, { useEffect, useState } from 'react';
import './styles.css';
import { Container, Card, Text, Grid } from '@mantine/core';
import DOMPurify from 'dompurify';
import { blocks } from 'payload/shared';


interface Post {
  createdAt?:any;
  updatedAt?: any;
  id?: string;
  _id?: string;
  title: string;
  Content: string;
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [block, setBlock] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts on client
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('http://localhost:3000/api/posts');
        const data = await res.json();
        setPosts(data.docs || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

    useEffect(() => {
    async function fetchBlocks() {
      try {
        const res = await fetch('http://localhost:3000/api/block-collection');
        const data = await res.json();
        setBlock(data.docs);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchBlocks();
  }, []);

  return (
     <Container size="sm" py="md" style={{border: '1px solid white'}} >

      <h2>Recent Posts</h2>
      {/* Posts */}
      {loading ? (
        <Text >Loading posts...</Text>
      ) : posts.length > 0 ? (
        <Container>
        <Grid gutter="md">
          {posts.map((post: Post) => (
            <Grid.Col key={post.id || post._id} style={{border: '1px solid white',margin: '50px'}} >
              <Card shadow="sm" padding="md" style={{ height: '100%' }}>
                <Text size="xs">Created At: {post.createdAt}</Text>
                <Text>Updated At: {post.updatedAt}</Text>
                <Text fw={700} mb="sm">{post.title}</Text>
                <div
                  style={{ fontSize: '0.875rem' }}
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.Content) }}
                />
              </Card>
            </Grid.Col>
          ))}
        

        </Grid>
        </Container>
      ) : (
        <Text >No posts found.</Text>
      )}
      <h2>Blocks</h2>
        {loading ? (
        <Text >Loading Blocks...</Text>
      ) : block.length > 0 ? (
        <Container style={{margin:'50px'}}>
        <Grid gutter="md">
          {block.map((blo: any) => (
            <Grid key={blo.id} style={{border: '1px solid white',margin: '50px'}} >
              {
                blo['Personal Forms'].map((bl:any) => {
                  return(
                    <Grid.Col key={bl.id} style={{margin: '50px'}}  >
                      <Card>
                      <Text fw={1000} style={{border: '1px solid white',margin: '50px'}} >{bl.blockType}</Text>
                        {
                          Object.keys(bl).map(key => {
                              if (key === 'id' || key === 'blockType') return null;
                            return(
                                <Container key={key}>
                                <Text>{bl[key]}</Text>
                                </Container>                              
                            );
                          })
                        }
                      </Card>
                    </Grid.Col>

                  );
                  })
              }
            </Grid>
          ))}
        </Grid>
        </Container>
      ) : (
        <Text >No posts found.</Text>
      )}
      
    </Container>
  );
}