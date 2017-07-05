import React from 'react'
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Chip from 'material-ui/Chip';

export const Bookmark = ({bookmark}) => (
    <Paper elevation={4}>
        <Typography type="headline" component="h3">
            {bookmark.title}
        </Typography>
        {bookmark.tags.map(tag => <Chip key={tag} label={tag}/>)}
    </Paper>
)