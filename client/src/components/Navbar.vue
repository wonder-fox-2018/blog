<template>

    <div>

        <nav class="navbar navbar-expand-lg navbar-light static-top sb-navbar">
            <div class="container">
                <a class="navbar-brand">Blog Warung Coffee</a>
                <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                    aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i class="fas fa-bars"></i>
                </button>
                <div class="collapse navbar-collapse">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <a class="nav-link">
                                <router-link to="/">Beranda</router-link>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link">
                                <router-link to="/articles">Artikel</router-link>
                                <!-- <router-link to="{nama}">Articles</router-link> -->

                            </a>
                        </li>
                        <li class="nav-item mr-3">
                            <a class="nav-link" style="position: relative;" target="blank" href="https://ecommerce-warungcofee.firebaseapp.com/"
                                onclick="ga('send','event','Product', 'click', 'SB Shop Navbar Link')">
                                <i class="fal fa-shopping-cart"></i>
                                <span>Shop</span>
                                <span class="badge badge-primary" style="position: absolute; top: -2px; right: -5px; font-size: 0.5rem">New!</span>
                            </a>
                        </li>
                    </ul>
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <modal-login :user="user" :setUser="setUser"></modal-login>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        


    </div>
</template>

<script>
    import ModalLogin from '@/components/Login.vue'

    export default {
        name: 'navbar',
        props: ['setUser', 'user'],
        data() {
            return {

            }
        },
        components: {
            ModalLogin
        }
    }
</script>