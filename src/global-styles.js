import { injectGlobal } from 'styled-components';
// import 'sweetalert-react/node_modules/sweetalert/dist/sweetalert.css';


/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    margin: 0 auto;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fff;
    min-height: 100%;
    min-width: 300px;
    overflow-x: hidden;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  .swal-title {
    margin: 0px;
    font-size: 16px;
    margin-bottom: 28px;
    border-bottom: 1px solid #E9EEF1;

  }

  .swal-content {
    margin-top: 0;
    padding: 0;
  }

  .swal-title:first-child {
    margin-top: 10px;
  }

  .swal-footer {
    background-color: rgb(245, 248, 250);
    margin-top: 32px;
    border-top: 1px solid #E9EEF1;
    overflow: hidden;
  }

  .swal-button {
    padding: 7px 19px;
    border-radius: 2px;
    background-color: #F48024;
    font-size: 12px;
    border: 1px solid #3e549a;
    text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.3);
    color: white;
  }

  .Select.is-focused > .Select-control {
    border-color: #F48024!important;
    box-shadow: none!important;
  }

  .Select-value {
    color: #F48024!important;
    background-color: #f3f1f1!important;
    border: 1px solid #F48024!important;
  }
`;
