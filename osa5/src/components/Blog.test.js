import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('Blog component', () => {
  test('renders author and title', () => {
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

    const component = render(
      <Blog blog={blog} user={user} />
    )

    const div = component.container.querySelector('.showMore')
    
    expect(div).toHaveTextContent(
      "From 'renders author and title' test"
    )

    expect(div).toHaveTextContent(
      'root'
    )

    expect(div).not.toHaveValue(1054)

    expect(div).not.toHaveTextContent(
      'test.com'
    )

  })
})