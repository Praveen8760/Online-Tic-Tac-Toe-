/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './components/**/*.{html,js}',
    './views/**/*.{html,js}',
    './index.html',
  ],
  theme: {
    extend: {
      fontFamily:{
        roboto:['roboto','sans'],
      },
      colors:{
        "black":'#000000',
        "white":'#ffffff',
        "asset-blue":"#1317DD",
        "asset-orange":'#FA5805',
        'alert-bg':'#FDDDE7',
        'alert-dark':"#F44336",
        "alert-success":"#E8F5E9",
        "alert-success-dark":"#43A047",
      },
      padding:{
        '10':"10px",
        'sm':'35px'
      },
      borderRadius:{
        'mobile':"38px"
      },
      fontSize:{
        'mobile-title':"40px",
        'mobile-form':"14px",
        'font-lg':"26px",
        'lg-title':"70px"
      }
    },
  },
  plugins: [],
}

