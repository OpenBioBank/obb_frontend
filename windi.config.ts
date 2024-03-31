import { defineConfig } from 'windicss/helpers'



export default defineConfig({
  extract: {
    include: ['src/**/*.{html,vue,jsx,tsx,svelte}']
  },
  shortcuts: {
    'flex-center': 'flex justify-center items-center',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex items-center',
    'flex-between': 'flex justify-between',
    'flex-around': 'flex justify-around',
    'flex-between-c': 'flex justify-between items-center',
    'flex-start-c': 'flex justify-start items-center',
    'button-border': 'border-1 border-solid rounded-full',
    'bottom-border': 'border-b-1 border-b-solid border-[#F5F5F5]',
    'top-border': 'border-0 border-t-1 border-solid border-[#F5F5F5]',
    'right-border': 'border-0 border-r-1 border-solid border-[#F5F5F5]',
    'bg-img-base': 'bg-contain bg-no-repeat bg-center'
  },
})
