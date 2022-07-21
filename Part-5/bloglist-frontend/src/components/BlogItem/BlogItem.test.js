/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-render-in-setup */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogItem from './BlogItem'

describe('BlogItem Component', () => {
    let container

    const blog = {
        title: 'test blog',
        author: 'nobody',
        likes: '69',
        url: 'https://does.not.exist/some-blog',
    }

    beforeEach(() => {
        container = render(<BlogItem blog={blog} />).container
    });

    test('should render the title', () => { 
        const title = container.querySelector('.title')
        
        expect(title).toHaveTextContent('test blog')
     })

     test('should render the author', () => {
        const author = container.querySelector('.author')

        expect(author).toHaveTextContent('nobody')
     });

     test('should not render the likes by default', () => {
        const likes = screen.queryByText('Likes')

        expect(likes).toBeNull()       
     });
     
     test('should not render the url by default', () => {
        const link = container.querySelector('a')
        
        expect(link).toBeNull()
     });
})
