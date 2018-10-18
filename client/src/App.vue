<template>
  <div id="app">
    <div id="nav">
      <div class='ui inverted vertical center aligned segment'>
        <div class='ui container'>
          <div class='ui large secondary inverted menu'>
            <router-link class='item' to='/'><img src='./assets/food-icon-min.png' width='50px' height='40px' alt='home'></router-link>
            <router-link class='item' to='/about'>About</router-link>
            <div class='right item'>
              <entry-modals :isLogin='isLogin'/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view :isLogin='isLogin'/>
  </div>
</template>

<script>
import EntryModals from '@/components/EntryModals.vue'

export default {
  name: 'home',
  components: {
    EntryModals
  },
  data () {
    return {
      isLogin: false
    }
  },
  created () {
    let token = localStorage.getItem('token')
    if (token) {
      this.isLogin = true
    }
  }
}
</script>

<style>
@font-face {
  font-family: 'Icons';
  src: url("https://semantic-ui.com/dist/themes/default/assets/fonts/icons.eot");
  src: url("https://semantic-ui.com/dist/themes/default/assets/fonts/icons.eot?#iefix") format('embedded-opentype'), url("https://semantic-ui.com/dist/themes/default/assets/fonts/icons.woff2") format('woff2'), url("https://semantic-ui.com/dist/themes/default/assets/fonts/icons.woff") format('woff'), url("https://semantic-ui.com/dist/themes/default/assets/fonts/icons.ttf") format('truetype'), url("https://semantic-ui.com/dist/themes/default/assets/fonts/icons.svg#icons") format('svg');
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  padding-top: 110px;
}

#nav {
  position: fixed;
  background: #34383c;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}

#nav a {
  font-weight: bold;
  color: white;
}

#nav a:hover, #nav a.router-link-exact-active {
  color: #03bb91!important;
}

#nav a.router-link-exact-active:first-child {
  background: #158b70;
}

.ui.inverted.segment, .ui.primary.inverted.segment {
  background: transparent;
}

.nav.segment {
  min-height: 700px;
  padding: 1em 0em;
}

.nav .logo.item img {
  margin-right: 1em;
}

.nav .ui.menu .ui.button {
  margin-left: 0.5em;
}

.nav h1.ui.header {
  margin-top: 3em;
  margin-bottom: 0em;
  font-size: 4em;
  font-weight: normal;
}

.nav h2 {
  font-size: 1.7em;
  font-weight: normal;
}

.ui.vertical.stripe {
  padding: 8em 0em;
}

.ui.vertical.stripe h3 {
  font-size: 2em;
}

.ui.vertical.stripe .button + h3,
.ui.vertical.stripe p + h3 {
  margin-top: 3em;
}

.ui.vertical.stripe .floated.image {
  clear: both;
}

.ui.vertical.stripe p {
  font-size: 1.33em;
}

.ui.vertical.stripe .horizontal.divider {
  margin: 3em 0em;
}

.quote.stripe.segment {
  padding: 0em;
}

.quote.stripe.segment .grid .column {
  padding-top: 5em;
  padding-bottom: 5em;
}

.footer.segment {
  padding: 5em 0em;
}

@media only screen and (max-width: 700px) {
  .ui.fixed.menu {
    display: none !important;
  }
  .secondary.pointing.menu .item,
  .secondary.pointing.menu .menu {
    display: none;
  }
  .nav.segment {
    min-height: 350px;
  }
  .nav h1.ui.header {
    font-size: 2em;
    margin-top: 1.5em;
  }
  .nav h2 {
    margin-top: 0.5em;
    font-size: 1.5em;
  }
}
</style>
