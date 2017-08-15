import React from 'react'
import { Drawer, Chip } from 'material-ui'
import Autocomplete from '../Autocomplete'
import { withStyles } from 'material-ui/styles'

const suggestions = [
    'apple',
    'pear',
    'pie',
    'bear',
    'cat'
]

const tags = [
    'apple',
    'pear',
    'pie',
    'bear',
    'cat'
]

const styles = theme => ({
    chip: {
        margin: theme.spacing.unit / 2,
    },
    row: {
        display: 'flex',
        flexWrap: 'wrap',
    },
})

const Edit = ({classes}) => (
    <Drawer
        anchor="right"
        open={true}
    >
        <div className={classes.row}>
            {
                tags.map(tag => <Chip key={tag} label={tag} className={classes.chip} />)
            }
        </div>
        <Autocomplete suggestions={suggestions} />
    </Drawer>
)

export default withStyles(styles)(Edit);