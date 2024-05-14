const { test, describe, expect, beforeEach } = require('@playwright/test')
import { loginWith, createBlog } from './helper.js'

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => { 
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Valetzu Bob',
        username: 'valetzu',
        password: 'salis'
      }
    })
    await page.goto('/')
  })
  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('Blogs App')
    await expect(locator).toBeVisible()
  })

  test('user can log in', async ({ page }) => {
    await loginWith(page, 'valetzu', 'salis')
    await expect(page.getByText('valetzu is logged in')).toBeVisible()
  })

  test('login fails with wrong password', async ({ page }) => {
    await loginWith(page, 'wrongusername', 'wrongpassword')
    await expect(page.getByText('wrong credentials').first()).toBeVisible()
    await expect(page.getByText('wrongusername is logged in')).not.toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'valetzu', 'salis')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, {title:'Lord of tests', author:'JRR Trolling', url:'google'})
      await expect(page.getByText('Lord of tests')).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, {title:'Lord of tests', author:'JRR Trolling', url:'google'})
        await createBlog(page, {title:'Harry Tester', author:'JK Rofl', url:'google'})

        await createBlog(page, {title:'Tester Games', author:'Tim Tester', url:'google'})
      })

      /* test('importance can be changed', async ({ page }) => {
        const otherBlogText = await page.getByText('second blog')
        const otherBlogElement = await otherBlogText.locator('..')

        await otherBlogElement.getByRole('button', { name: 'make not important' }).click()
        await expect(otherBlogElement.getByText('make important')).toBeVisible()
      }) */
    })
  })
})