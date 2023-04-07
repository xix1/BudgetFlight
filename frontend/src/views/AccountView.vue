<script setup>
import NavbarView from "@/components/NavbarView.vue"
import SearchArea from "../components/SearchArea.vue";
</script>

<template>
<NavbarView />
<SearchArea />
<div id="videoDarkOverlay"></div>
<video autoplay muted loop id="myVideo">
        <source src="../../../public/sea-30985.mp4" type="video/mp4">
    </video>
</template>
