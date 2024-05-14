import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

let container
test('renders content', () => {
  
  const blog = {
    title: 'Lord of the Tests',
    author: 'JRR Talking',
    url: 'test.com',
    likes: 5,
    user: {
      name: 'testUser'
    }
  }

  container = render(<Blog blog={blog} />).container

  screen.debug()

  const titleElement = screen.getByText('Lord of the Tests')
  expect(titleElement).toBeDefined()

  const authorElement = screen.getByText('JRR Talking')
  expect(authorElement).toBeDefined()
  const urlElement = screen.getByText('test.com')
  
  const div = container.querySelector('#moreInfoParent')
  expect(div).toHaveStyle('display: none')

})

 test('clicking the view more button makes additional information visible', async () => {
  const blog = {
    title: 'Lord of the Tests',
    author: 'JRR Talking',
    url: 'test.com',
    likes: 5,
    user: {
      name: 'testUser'
    }
  }

  const mockHandler = vi.fn()

  container = render(
    <Blog blog={blog} />
  ).container
  const div = container.querySelector('#moreInfoParent')
  const user = userEvent.setup()
  const button = screen.getByText('More info')
  await user.click(button)
  expect(div).not.toHaveStyle('display: none')
  
}) 

test('clicking the like button twice calls event handler twice', async () => {
  const blog = {
    title: 'Lord of the Tests',
    author: 'JRR Talking',
    url: 'test.com',
    likes: 5,
    user: {
      name: 'testUser'
    }
  }

  const mockHandler = vi.fn()

  render(
    <Blog blog={blog} handleLike={mockHandler} />
  )

  const user = userEvent.setup()
  const moreInfobutton = screen.getByText('More info')
  await user.click(moreInfobutton)

  const button = screen.getByText('Like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})