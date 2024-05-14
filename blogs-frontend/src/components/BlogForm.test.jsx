import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

let container
test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  container = render(<BlogForm createBlog={createBlog} />).container

  const titleInput = container.querySelector('#titleTextBox')
  const sendButton = screen.getByText('save')

  await user.type(titleInput, 'Lord of the Tests')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Lord of the Tests')
})