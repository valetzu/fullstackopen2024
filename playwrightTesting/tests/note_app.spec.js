const { test, describe, expect, beforeEach } = require('@playwright/test')
import { loginWith, createNote } from './helper.js'

describe('Note app', () => {
    beforeEach(async ({ page, request }) => { 
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
          data: {
            name: 'Valetzu Bob',
            username: 'valetzu',
            password: 'testi'
          }
        })
        await page.goto('/')
    })
    
        
    test('front page can be opened', async ({ page }) => {
        const locator = await page.getByText('Notes App')
        await expect(locator).toBeVisible()
    })

    test('user can log in', async ({ page }) => {
        await loginWith(page, 'valetzu', 'testi')
        await expect(page.getByText('valetzu is logged in')).toBeVisible()
      })

      test('login fails with wrong password', async ({ page }) => {
        await loginWith(page, 'wrongusername', 'wrongpassword')
        await expect(page.getByText('wrong credentials').first()).toBeVisible()
        await expect(page.getByText('mluukkai is logged in')).not.toBeVisible()
      })

    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'valetzu', 'testi')
      })

        test('a new note can be created', async ({ page }) => {
            await createNote(page, 'a note created by playwright')
            await expect(page.getByText('a note created by playwright')).toBeVisible()
      })

      describe('and a note exists', () => {
        beforeEach(async ({ page }) => {        
            await createNote(page, 'a note created by playwright')   
        })

        test('importance can be changed', async ({ page }) => {        
            await page.getByRole('button', { name: 'make not important' }).click()        
            await expect(page.getByRole('button', { name: 'make important' })).toBeVisible()      
        })
      })
    })

})