<template>
<nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
    <a class="navbar-brand" href="#"> <img class="logo" src="http://icons.iconarchive.com/icons/graphicloads/colorful-long-shadow/48/Pen-icon.png"
            height="40"> megalo-blog</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar1" aria-controls="navbarNav"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbar1">
        <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
                <a class="nav-link" href="http://bootstrap-ecommerce.com">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item"><a class="nav-link" href="html-components.html"> Documentation </a></li>
            <li class="nav-item dropdown">
                <a class="nav-link  dropdown-toggle" href="#" data-toggle="dropdown"> Dropdown </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#"> Menu item 1</a></li>
                    <li><a class="dropdown-item" href="#"> Menu item 2 </a></li>
                </ul>
            </li>
            <li class="nav-item">
                <a class="btn ml-2 btn-info" href="http://bootstrap-ecommerce.com">Login</a></li>
        </ul>
    </div>
</nav>
</template>
<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isLogin: false,
    };
  },
};
</script>
