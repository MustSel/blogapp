import { Card, CardActions, CardContent, Button, Typography } from "@mui/material";

const BlogCard = ({ blog, isCurrentUser }) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardContent>
                <Typography variant="h6">{blog.title}</Typography>
                <Typography variant="body2" color="textSecondary">{blog.summary}</Typography>
            </CardContent>
            <CardActions>
                {isCurrentUser && (
                    <>
                        <Button size="small" color="primary">Düzenle</Button>
                        <Button size="small" color="secondary">Sil</Button>
                    </>
                )}
            </CardActions>
        </Card>
    );
};

export default BlogCard;
