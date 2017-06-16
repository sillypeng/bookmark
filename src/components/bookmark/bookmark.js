import React from 'react'

export const Bookmark = ({bookmark}) => (
    <div>
        {bookmark.title}
        {bookmark.tags.map(tag => <a key={tag} href="#">{tag}</a>)}
    </div>
)