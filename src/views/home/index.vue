<template>
  <div class="flex-1 flex flex-col overflow-auto  bg-gradient-to-r from-[#000] to-[#000]">
    <main
      class="flex-between-c text-[#fff] flex-1  ml-180px bg-contain bg-no-repeat bg-right-top pb-100px relative -top-60px"
      :style="`background-image:url('${icon_dna}')`">
      <div class="mt-116px">
        <img class="h-46px mb-30px" src="@/assets/image/icon_year.png" alt="">
        <img class="w-360px h-168px mt-8px mb-12px" src="@/assets/image/logo_name2.png" alt="">
        <p class="mt-33px mb-27px text-24px leading-34px font-800">Discover OPEN BIOBANK, <br>a
          leading
          company in the
          Biotechnology, <br>Gene, and Blockchain industry</p>
        <!-- <div
          class=" cursor-pointer bg-[#FFB500] rounded-12px w-84px h-24px text-11px flex-center text-[#000]">
          CONNECT</div> -->
      </div>

    </main>
    <footer class="text-[#ffff]  footer-content relative px-180px py-16px">
      <div class="flex-between">
        <div>
          <p class="font-500 text-20px">Media</p>
          <img class="w-136px h-33px mt-8px mb-12px" src="@/assets/image/logo_name.png" alt="">
          <div class="flex-y-center mt-10px">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20">
              <path fill="currentColor"
                d="M17.316 6.246c.008.162.011.326.011.488c0 4.99-3.797 10.742-10.74 10.742c-2.133 0-4.116-.625-5.787-1.697a7.577 7.577 0 0 0 5.588-1.562a3.779 3.779 0 0 1-3.526-2.621a3.858 3.858 0 0 0 1.705-.065a3.779 3.779 0 0 1-3.028-3.703v-.047a3.766 3.766 0 0 0 1.71.473a3.775 3.775 0 0 1-1.168-5.041a10.716 10.716 0 0 0 7.781 3.945a3.813 3.813 0 0 1-.097-.861a3.773 3.773 0 0 1 3.774-3.773a3.77 3.77 0 0 1 2.756 1.191a7.602 7.602 0 0 0 2.397-.916a3.789 3.789 0 0 1-1.66 2.088a7.55 7.55 0 0 0 2.168-.594a7.623 7.623 0 0 1-1.884 1.953" />
            </svg>
            <a href="https://twitter.com/openbiobank" target="_blank">
              <span class="ml-10px">Twitter</span>
            </a>
          </div>
          <div class="flex-y-center mt-10px">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20">
              <path fill="currentColor"
                d="M10 2.3C.172 2.3 0 3.174 0 10s.172 7.7 10 7.7s10-.874 10-7.7s-.172-7.7-10-7.7m3.205 8.034l-4.49 2.096c-.393.182-.715-.022-.715-.456V8.026c0-.433.322-.638.715-.456l4.49 2.096c.393.184.393.484 0 .668" />
            </svg>
            <span class="ml-10px">youtube</span>
          </div>
          <div class="flex-y-center mt-10px">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path fill="currentColor"
                d="M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            <a href="https://github.com/OpenBioBank" target="_blank">
              <span class="ml-10px">GitHub</span>
            </a>
          </div>
        </div>
        <div>
          <p class="font-500 text-20px">Menu</p>
          <p class="mt-10px">About Us</p>
        </div>
      </div>
      <p class="text-center mt-20px">Copyright © 2024 </p>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { Icon } from '@iconify/vue'
import icon_dna from '@/assets/image/icon_dna.png'

const onSubmit = () => {
  console.log('submit!')
}
</script>
<style lang="less" scoped>
.footer-content::before {
  content: ' ';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 150px;
  height: 150px;
  filter: blur(50px);
  z-index: 9;
  background: linear-gradient(90deg, #000000 0%, #9c6e34 100%);
}
.footer-content::after {
  content: ' ';
  position: absolute;
  right: 0;
  bottom: 0;
  width: 150px;
  height: 150px;
  filter: blur(50px);
  background: inherit;
  z-index: 9;
  background: linear-gradient(90deg, #000000 0%, #9c6e34 100%);
}
</style>