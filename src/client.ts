import * as sapper from '@sapper/app'
import { configureTheme } from './modules/configure-theme'

void configureTheme()

sapper
  .start({
    target: document.querySelector('#sapper'),
  })
  .catch(() => {
    console.log('Oops can not start sapper server')
  })
