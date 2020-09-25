<template>
    <div class="menu-item" @mouseover="isOpen = true" @mouseleave="isOpen = false">
        <a href="#">
            {{ title }}
        </a>
        <transition name="fade" appear>
            <div class="sub-menu" v-show="isOpen">
                <div v-for="(item, i) in items" :key="i" class="menu-item">
                    <a :href="item.link">{{ item.title }}</a>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
  name: 'dropdown',
  props: [ 'title', 'items' ],
  data () {
    return {
      isOpen: false
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/nav/navbar.css';
@import "../../assets/css/nav/dropdown.css";
</style>
