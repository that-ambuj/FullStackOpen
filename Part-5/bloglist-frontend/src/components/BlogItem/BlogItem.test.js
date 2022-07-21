import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, renderHook, screen } from '@testing-library/react'
import BlogItem from './BlogItem'

describe('BlogItem Component', () => { 
    test('should render a blog', () => { 
        const blog = {
            title : 'test blog',
            author : 'nobody',
            likes : '69',
            url : 'https://does.not.exist/some-blog'
        }

        render(<BlogItem blog={blog} />)

        const title = screen.getByText('test blog')

        expect(title).toBeDefined()
     })
 })