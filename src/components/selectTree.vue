<template>
<div class="tree-select">
  <div class="tree-select__nav">
    <div
      v-for="(item, index) in items"
      :key="key"
      class="tree-select__nitem van-ellipsis"
      @click="onClickNav"
      :class="{'tree-select__nitem--active': activeId === item.id}"
    >
      {{ item.text }}
    </div>
  </div>
  <div class="tree-select__content">
    <div
      v-for="subItems"
      :key="key"
      class="tree-select__item van-ellipsis"
      :class="{'tree-select__item--active': activeId === item.id}"
      @click="onSelectItem"
    >
      {{ item.text }}
      
    </div>
  </div>
</div>

</template>
<script>
export default {

}

</script>
<style lang="less"scoped>
.tree-select {
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  font-size: 16px
}

.tree-select__nav {
  width: 35%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  overflow: scroll;
  background-color: #fff;
  -webkit-overflow-scrolling: touch
}

.tree-select__nitem {
  line-height: 44px;
  padding: 0 15px;
  background-color: #fff
}

.tree-select__nitem--active,
.tree-select__nitem:active {
  background-color: #f8f8f8
}

.tree-select__nitem--active {
  font-weight: 500
}

.tree-select__content {
  padding: 0 15px;
  margin-left: 35%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch
}

.tree-select__item {
  position: relative;
  line-height: 44px;
  padding-left: 5px;
  padding-right: 18px
}

.tree-select__item--active,
.tree-select__item:active {
  color: #f44
}

.tree-select__selected {
  float: right;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  line-height: inherit
}

</style>
