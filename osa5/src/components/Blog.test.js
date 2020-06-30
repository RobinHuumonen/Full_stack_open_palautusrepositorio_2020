import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('Blog component', () => {
  let component 
  const blog = {
    title: "From 'renders author and title' test",
    author: 'root',
    url: 'test.com',
    likes: 1054,
    user: {
      username: 'root',
      name: 'superuser',
      id: '5ef0ac2c7a463d33e8c6fb3'
    }
  }

  const user = {
    username: 'root',
    name: 'superuser'
  }

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} />
    )
  })

  test('renders author and title', () => {
    const div = component.container.querySelector('.showMore')

    expect(div).toHaveTextContent(
      `${blog.title} ${blog.author}`
    )

    expect(div).not.toHaveTextContent(
      `${blog.url} ${blog.likes}`
    )

    expect(div).not.toHaveTextContent(
      `${blog.likes}`
    )

    expect(div).not.toHaveStyle('display: none')
  })

  test('renders all fields, if view clicked', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.showLess')

    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent(
      `${blog.url}`
    )
    expect(div).toHaveTextContent(
      `${blog.likes}`
    )
  })
})