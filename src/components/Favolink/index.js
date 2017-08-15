import React from 'react'
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Chip from 'material-ui/Chip';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    chip: {
        margin: theme.spacing.unit / 2,
    },
    row: {
        display: 'flex',
        flexWrap: 'wrap',
    },
})

const Favolink = ({ bookmark, classes }) => (
    <Paper elevation={4}>
        <Typography type="headline" component="h3">
            {bookmark.title}
        </Typography>
        <div className={classes.row}>
        {
            bookmark.tags.map(tag => <Chip key={tag} label={tag} className={classes.chip} />)
        }
        </div>
    </Paper>
)

export default withStyles(styles)(Favolink)