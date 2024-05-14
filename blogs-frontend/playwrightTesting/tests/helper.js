const loginWith = async (page, username, password)  => {
  await page.getByRole('button', { name: 'log in' }).click()
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}


const createBlog = async (page, blog) => {
  await page.getByRole('button', { name: 'new blog' }).click()
  await page.getByTestId('titlebox').fill(blog.title)
  await page.getByTestId('authorbox').fill(blog.author)
  await page.getByTestId('urlbox').fill(blog.url)
  await page.getByRole('button', { name: 'save' }).click()
  await page.getByText(blog.title).waitFor()
}

export { loginWith, createBlog }