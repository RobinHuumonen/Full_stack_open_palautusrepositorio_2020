import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'


test('Blog form calls its callback with proper arguments', () => {
  const mockCallback = jest.fn()
  const component = render( <BlogForm createBlog={mockCallback} /> )

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')

  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, { 
    target: { value: 'BlogForm testBlog' } 
  })

  fireEvent.change(authorInput, { 
    target: { value: 'root' } 
  })

  fireEvent.change(urlInput, { 
    target: { value: 'www.superuser.root' } 
  })

  fireEvent.submit(form)

  const argumentBlog = mockCallback.mock.calls[0][0]

  expect(argumentBlog.title).toBe('BlogForm testBlog')
  expect(argumentBlog.author).toBe('root')
  expect(argumentBlog.url).toBe('www.superuser.root')
})