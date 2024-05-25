import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import useBlogRequests from '../services/useBlogRequests';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import IconComp from '../components/IconComp';
import ScrollToTop from '../components/ScrollToTop';
import Comments from '../components/Comments';
import { setShowComments } from '../features/blogsSlice';

export default function BlogDetails() {
    const { id } = useParams();
    const defaultImage = "https://geekflare.com/wp-content/uploads/2016/04/featured-image-generator.jpg";
    const defaultAuthorImage = "https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png";
    
    const dispatch = useDispatch();
    const { getBlogDetails,getUsers } = useBlogRequests();
    const { blogDetails: blog, users,showComments } = useSelector(state => state.blogs);
    const [comment, setComment] = useState(false)
    const [redirectToDetails, setRedirectToDetails] = useState(false);
    const refreshBlogDetails = () => {
        getBlogDetails(id);
    };
// console.log(blog)
    useEffect(() => {
        getBlogDetails(id);
        getUsers()
    }, [id]);
 
    useEffect(() => {
        if (showComments) {
          setComment(true);
          console.log("first")
          dispatch(setShowComments())
        }
      }, [showComments]);
    
    if (!blog) return null;

    const author = users.find(user => user._id === blog?.userId?._id) || {};
    console.log(blog)

    return (
        <>
        <Container maxWidth="lg">
            <Box mt={12} display="flex" justifyContent="center">
                <Card sx={{ maxWidth: 800, width: '100%' }}>
                    <Box component="img"
                        src={blog.image || defaultImage}
                        alt={blog.title}
                        sx={{ width: '100%', height: 300, objectFit: 'cover' }}
                        onError={(e) => { e.target.src = defaultImage; }}
                    />
                    <CardContent>
                        <Box display="flex" alignItems="center" mb={2}>
                            <Avatar
                                src={author.image || defaultAuthorImage}
                                alt={author.username || "Unknown User"}
                                sx={{ width: 50, height: 50 }}
                            />
                            <Box ml={2}>
                                <Typography variant="h6" component="div">
                                    {author.username || "Unknown User"}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {new Date(blog.createdAt).toLocaleDateString()}
                                </Typography>
                            </Box>
                        </Box>
                        <Typography variant="h4" component="h1" gutterBottom>
                            {blog.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" paragraph>
                            {blog.content}
                        </Typography>
                       
                        <IconComp users={users} comment={comment} setComment={setComment} blog={blog} inBlog={true}/>
                    </CardContent>
                </Card>
            </Box>
            <ScrollToTop/>
        </Container>
        {comment && <Comments id={blog?._id} comments={blog?.comments} users={users} redirectToDetails={redirectToDetails} setRedirectToDetails={setRedirectToDetails} onCommentChange={refreshBlogDetails} />}
        </>
        
    );
}

